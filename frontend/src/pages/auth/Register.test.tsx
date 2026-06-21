import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Register from "./Register";

const mockNavigate = vi.fn();
const mockRegister = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof import("react-router-dom")>(
    "react-router-dom",
  );
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock("../../utils/apiService", () => ({
  userApi: {
    register: (...args: unknown[]) => mockRegister(...args),
  },
}));

describe("Register", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("blocks submit and alerts when passwords do not match", async () => {
    const alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {});
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>,
    );

    await userEvent.type(screen.getByLabelText(/first name/i), "A");
    await userEvent.type(screen.getByLabelText(/^username/i), "user");
    await userEvent.type(screen.getByLabelText(/^password/i), "Secret123");
    await userEvent.type(
      screen.getByLabelText(/re-enter password/i),
      "Other1234",
    );
    await userEvent.type(screen.getByLabelText(/email id/i), "a@b.com");
    await userEvent.type(screen.getByLabelText(/phone number/i), "9876543210");
    await userEvent.click(screen.getByRole("button", { name: /register/i }));

    expect(alertSpy).toHaveBeenCalledWith("Passwords do not match");
    expect(mockRegister).not.toHaveBeenCalled();
    alertSpy.mockRestore();
  });

  it("calls register API for valid form input", async () => {
    mockRegister.mockResolvedValue("ok");
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>,
    );

    await userEvent.type(screen.getByLabelText(/first name/i), "A");
    await userEvent.type(screen.getByLabelText(/last name/i), "B");
    await userEvent.type(screen.getByLabelText(/^username/i), "user");
    await userEvent.type(screen.getByLabelText(/^password/i), "Secret123");
    await userEvent.type(
      screen.getByLabelText(/re-enter password/i),
      "Secret123",
    );
    await userEvent.type(screen.getByLabelText(/email id/i), "a@b.com");
    await userEvent.type(screen.getByLabelText(/phone number/i), "9876543210");
    await userEvent.click(screen.getByRole("button", { name: /register/i }));

    expect(mockRegister).toHaveBeenCalledWith({
      firstName: "A",
      lastName: "B",
      username: "user",
      password: "Secret123",
      email: "a@b.com",
      phone: "9876543210",
    });
    expect(
      await screen.findByText(/registration successful/i),
    ).toBeInTheDocument();
  });
});
