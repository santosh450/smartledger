import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Login from "./Login";

const mockNavigate = vi.fn();
const mockLogin = vi.fn();

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
    login: (...args: unknown[]) => mockLogin(...args),
  },
}));

describe("Login", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("submits credentials and navigates to dashboard on success", async () => {
    mockLogin.mockResolvedValue("ok");
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    );

    await userEvent.type(screen.getByLabelText(/username/i), "demo");
    await userEvent.type(screen.getByLabelText(/password/i), "Secret123");
    await userEvent.click(screen.getByRole("button", { name: /login/i }));

    expect(mockLogin).toHaveBeenCalledWith({
      username: "demo",
      password: "Secret123",
    });
    expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
  });

  it("shows API error message on failed login", async () => {
    mockLogin.mockRejectedValue(new Error("Invalid credentials"));
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    );

    await userEvent.type(screen.getByLabelText(/username/i), "demo");
    await userEvent.type(screen.getByLabelText(/password/i), "wrong");
    await userEvent.click(screen.getByRole("button", { name: /login/i }));

    expect(
      await screen.findByText(/invalid credentials/i),
    ).toBeInTheDocument();
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
