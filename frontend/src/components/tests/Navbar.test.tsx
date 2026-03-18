import "@testing-library/jest-dom/vitest";
import { render, screen, fireEvent, waitFor, cleanup } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Navbar from "../Navbar";
import { useAuth } from "../../context/AuthContext";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => ({ pathname: "/", hash: "" }),
  };
});

vi.mock("../../context/AuthContext", () => ({
  useAuth: vi.fn(),
}));

vi.mock("firebase/auth", async (importOriginal) => {
  const actual = (await importOriginal()) as Record<string, unknown>;
  return {
    ...actual,
    signOut: vi.fn(),
    getAuth: vi.fn(() => ({})),
  };
});

vi.mock("../../config/firebase", () => ({ auth: {} }));

describe("Navbar", () => {
  beforeEach(() => {
    cleanup();
    mockNavigate.mockClear();
    vi.mocked(useAuth).mockReturnValue({ user: null, loading: false });
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("renders logo and title", () => {
    render(
      <MemoryRouter>
        <Navbar mode="light" toggleTheme={vi.fn()} />
      </MemoryRouter>
    );

    expect(screen.getByAltText(/Phone Shield logo/i)).toBeInTheDocument();
    expect(screen.getByText(/Phone Shield/i)).toBeInTheDocument();
  });

  test("renders login icon when user is not logged in", () => {
    render(
      <MemoryRouter>
        <Navbar mode="light" toggleTheme={vi.fn()} />
      </MemoryRouter>
    );

    expect(screen.getByTestId("LoginIcon")).toBeInTheDocument();
  });

  test("renders logout icon when user is logged in", () => {
    vi.mocked(useAuth).mockReturnValue({
      user: { email: "admin@test.com" } as any,
      loading: false,
    });

    render(
      <MemoryRouter>
        <Navbar mode="light" toggleTheme={vi.fn()} />
      </MemoryRouter>
    );

    expect(screen.getByTestId("LogoutIcon")).toBeInTheDocument();
  });

  test("navigates to home when logo is clicked", () => {
    render(
      <MemoryRouter>
        <Navbar mode="light" toggleTheme={vi.fn()} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByAltText(/Phone Shield logo/i));
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  test("navigates to login when login icon is clicked", () => {
    render(
      <MemoryRouter>
        <Navbar mode="light" toggleTheme={vi.fn()} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByTestId("LoginIcon"));
    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });

  test("calls toggleTheme when theme button is clicked", () => {
    const toggleTheme = vi.fn();

    render(
      <MemoryRouter>
        <Navbar mode="light" toggleTheme={toggleTheme} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByTestId("Brightness4Icon"));
    expect(toggleTheme).toHaveBeenCalled();
  });

  test("calls signOut and navigates to login on logout", async () => {
    vi.mocked(useAuth).mockReturnValue({
      user: { email: "admin@test.com" } as any,
      loading: false,
    });

    const { signOut } = await import("firebase/auth");
    vi.mocked(signOut).mockResolvedValueOnce();

    render(
      <MemoryRouter>
        <Navbar mode="light" toggleTheme={vi.fn()} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByTestId("LogoutIcon"));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/login");
    });
  });

  test("handles logout error gracefully", async () => {
    vi.mocked(useAuth).mockReturnValue({
      user: { email: "admin@test.com" } as any,
      loading: false,
    });

    const { signOut } = await import("firebase/auth");
    vi.mocked(signOut).mockRejectedValueOnce(new Error("Logout failed"));

    render(
      <MemoryRouter>
        <Navbar mode="light" toggleTheme={vi.fn()} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByTestId("LogoutIcon"));

    await waitFor(() => {
      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });

  test("navigates to home with quotes hash when get a quote is clicked", () => {
    render(
      <MemoryRouter>
        <Navbar mode="light" toggleTheme={vi.fn()} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: /get a quote/i }));

    expect(mockNavigate).toHaveBeenCalledWith({
      pathname: "/",
      hash: "#quotes",
    });
  });
});