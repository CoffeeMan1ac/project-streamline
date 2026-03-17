import "@testing-library/jest-dom/vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, expect, vi, afterEach } from "vitest";
import AuthCard from "../AuthCard";

afterEach(() => {
  cleanup();
});

describe("AuthCard", () => {
  test("renders email, password fields and login button", () => {
    const mockSubmit = vi.fn();

    render(<AuthCard onSubmit={mockSubmit} />);

    expect(screen.getByPlaceholderText(/admin@phone-shield.com/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter your password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  test("allows user to type email and password", async () => {
    const mockSubmit = vi.fn();
    const user = userEvent.setup();

    render(<AuthCard onSubmit={mockSubmit} />);

    const emailInput = screen.getByPlaceholderText(/admin@phone-shield.com/i);
    const passwordInput = screen.getByPlaceholderText(/enter your password/i);

    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "mypassword");

    expect(emailInput).toHaveValue("test@example.com");
    expect(passwordInput).toHaveValue("mypassword");
  });

  test("toggles password visibility", async () => {
    const mockSubmit = vi.fn();
    const user = userEvent.setup();

    render(<AuthCard onSubmit={mockSubmit} />);

    const passwordInput = screen.getByPlaceholderText(/enter your password/i);
    const toggleButton = screen.getByRole("button", {
      name: /toggle password visibility/i,
    });

    expect(passwordInput).toHaveAttribute("type", "password");

    await user.click(toggleButton);

    expect(passwordInput).toHaveAttribute("type", "text");
  });

  test("calls onSubmit with email and password", async () => {
    const mockSubmit = vi.fn();
    const user = userEvent.setup();

    render(<AuthCard onSubmit={mockSubmit} />);

    const emailInput = screen.getByPlaceholderText(/admin@phone-shield.com/i);
    const passwordInput = screen.getByPlaceholderText(/enter your password/i);
    const loginButton = screen.getByRole("button", { name: /login/i });

    await user.type(emailInput, "admin@test.com");
    await user.type(passwordInput, "password123");
    await user.click(loginButton);

    expect(mockSubmit).toHaveBeenCalledTimes(1);
    expect(mockSubmit).toHaveBeenCalledWith("admin@test.com", "password123");
  });

  test("displays error message when error prop is provided", () => {
    const mockSubmit = vi.fn();

    render(
      <AuthCard onSubmit={mockSubmit} error="Incorrect email or password. Please try again." />
    );

    expect(screen.getByText(/Incorrect email or password/i)).toBeInTheDocument();
  });

  test("does not display error message when error prop is not provided", () => {
    const mockSubmit = vi.fn();

    render(<AuthCard onSubmit={mockSubmit} />);

    expect(screen.queryByText(/Incorrect email or password/i)).not.toBeInTheDocument();
  });
});
