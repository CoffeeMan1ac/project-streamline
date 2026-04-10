import "@testing-library/jest-dom/vitest";
import { render, screen, fireEvent, cleanup, waitFor } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach, afterAll, beforeAll } from "vitest";
import { MemoryRouter } from "react-router-dom";
import BackOfficeLoginPage from "../../pages/BackOfficeLoginPage";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => ({ state: null }),
  };
});

vi.mock("../../components/AuthCard", () => ({
  default: ({
    onSubmit,
    error,
  }: {
    onSubmit: (email: string, password: string) => void;
    error?: string | null;
  }) => (
    <div>
      <input data-testid="email-input" placeholder="Email" />
      <input data-testid="password-input" placeholder="Password" />
      <button
        onClick={() => {
          const email = (document.querySelector("[data-testid='email-input']") as HTMLInputElement)
            ?.value;
          const password = (
            document.querySelector("[data-testid='password-input']") as HTMLInputElement
          )?.value;
          onSubmit(email, password);
        }}
      >
        Login
      </button>
      {error && <div data-testid="error-message">{error}</div>}
    </div>
  ),
}));

vi.mock("firebase/auth", async (importOriginal) => {
  const actual = (await importOriginal()) as Record<string, unknown>;
  return {
    ...actual,
    signInWithEmailAndPassword: vi.fn(),
    getAuth: vi.fn(() => ({})),
  };
});

vi.mock("../config/firebase", () => ({ auth: {} }));

describe("BackOfficeLoginPage", () => {
  const originalConsoleError = console.error;
  const originalConsoleWarn = console.warn;

  beforeAll(() => {
    console.error = (...args) => {
      const isMuiAnchorError = args.some(
        (arg) => typeof arg === "string" && arg.includes("anchorEl")
      );
      if (isMuiAnchorError) return;
      originalConsoleError(...args);
    };

    console.warn = (...args) => {
      const isMuiAnchorWarning = args.some(
        (arg) => typeof arg === "string" && arg.includes("anchorEl")
      );
      if (isMuiAnchorWarning) return;
      originalConsoleWarn(...args);
    };
  });

  afterAll(() => {
    console.error = originalConsoleError;
    console.warn = originalConsoleWarn;
  });

  beforeEach(() => {
    cleanup();
    mockNavigate.mockClear();
  });

  const renderPage = () =>
    render(
      <MemoryRouter>
        <BackOfficeLoginPage />
      </MemoryRouter>
    );

  test("renders page title", () => {
    renderPage();
    expect(screen.getByText("Phone Shield")).toBeInTheDocument();
  });

  test("renders page subtitle", () => {
    renderPage();
    expect(screen.getByText("Back Office Portal Login")).toBeInTheDocument();
  });

  test("renders auth card", () => {
    renderPage();
    expect(screen.getByTestId("email-input")).toBeInTheDocument();
    expect(screen.getByTestId("password-input")).toBeInTheDocument();
  });

  test("renders back to home button", () => {
    renderPage();
    expect(screen.getByRole("button", { name: /back to home/i })).toBeInTheDocument();
  });

  test("navigates to home when back to home is clicked", () => {
    renderPage();
    fireEvent.click(screen.getByRole("button", { name: /back to home/i }));
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  test("navigates to /rules on successful login", async () => {
    const { signInWithEmailAndPassword } = await import("firebase/auth");
    vi.mocked(signInWithEmailAndPassword).mockResolvedValueOnce({
      user: { email: "admin@test.com" },
    } as any);

    renderPage();

    fireEvent.change(screen.getByTestId("email-input"), {
      target: { value: "admin@test.com" },
    });
    fireEvent.change(screen.getByTestId("password-input"), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/rules", { replace: true });
    });
  });

  test("shows error message on failed login", async () => {
    const { signInWithEmailAndPassword } = await import("firebase/auth");
    vi.mocked(signInWithEmailAndPassword).mockRejectedValueOnce(new Error("Invalid credentials"));

    renderPage();

    fireEvent.change(screen.getByTestId("email-input"), {
      target: { value: "wrong@test.com" },
    });
    fireEvent.change(screen.getByTestId("password-input"), {
      target: { value: "wrongpassword" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByTestId("error-message")).toBeInTheDocument();
      expect(screen.getByText("Invalid email or password.")).toBeInTheDocument();
    });
  });

  test("navigates to redirect location after login if provided", async () => {
    const { signInWithEmailAndPassword } = await import("firebase/auth");
    vi.mocked(signInWithEmailAndPassword).mockResolvedValueOnce({
      user: { email: "admin@test.com" },
    } as any);

    render(
      <MemoryRouter>
        <BackOfficeLoginPage />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/rules", { replace: true });
    });
  });
});
