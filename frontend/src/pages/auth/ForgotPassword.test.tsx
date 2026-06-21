import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import ForgotPassword from "./ForgotPassword";

const mockForgotPassword = vi.fn();

vi.mock("../../utils/apiService", () => ({
  userApi: {
    forgotPassword: (...args: unknown[]) => mockForgotPassword(...args),
  },
}));

describe("ForgotPassword", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows validation error for invalid email or phone", async () => {
    render(
      <MemoryRouter>
        <ForgotPassword />
      </MemoryRouter>,
    );

    await userEvent.type(
      screen.getByLabelText(/email id or phone number/i),
      "bad-input",
    );
    await userEvent.click(
      screen.getByRole("button", { name: /send password/i }),
    );

    expect(
      await screen.findByText(/please enter a valid email address or phone/i),
    ).toBeInTheDocument();
    expect(mockForgotPassword).not.toHaveBeenCalled();
  });

  it("calls forgot password API and shows success message", async () => {
    mockForgotPassword.mockResolvedValue("Reset link sent");
    render(
      <MemoryRouter>
        <ForgotPassword />
      </MemoryRouter>,
    );

    await userEvent.type(
      screen.getByLabelText(/email id or phone number/i),
      "demo@example.com",
    );
    await userEvent.click(
      screen.getByRole("button", { name: /send password/i }),
    );

    expect(mockForgotPassword).toHaveBeenCalledWith({
      emailOrPhone: "demo@example.com",
    });
    expect(await screen.findByText(/reset link sent/i)).toBeInTheDocument();
  });
});
