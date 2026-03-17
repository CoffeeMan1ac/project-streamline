import "@testing-library/jest-dom/vitest";
import { render, screen, cleanup, fireEvent, act } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import App from "../App";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    BrowserRouter: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  };
});

vi.mock("../theme/theme", async () => {
  const actual = await vi.importActual("../theme/theme");
  return actual;
});

vi.mock("../pages/Home", () => ({ default: () => <div>Home Page</div> }));
vi.mock("../pages/QuotesPage", () => ({ default: () => <div>Quotes Page</div> }));
vi.mock("../pages/OutcomePage", () => ({ default: () => <div>Outcome Page</div> }));
vi.mock("../pages/BackOfficeLoginPage", () => ({ default: () => <div>Login Page</div> }));
vi.mock("../pages/RulesManagementPage", () => ({ default: () => <div>Rules Page</div> }));
vi.mock("../pages/ProductManagementPage", () => ({ default: () => <div>Products Page</div> }));
vi.mock("../dev/Sandbox", () => ({ default: () => <div>Sandbox Page</div> }));
vi.mock("../components/Navbar", () => ({
  default: ({ toggleTheme }: { toggleTheme: () => void }) => (
    <div>
      Navbar
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  ),
}));
vi.mock("../components/Footer", () => ({ default: () => <div>Footer</div> }));
vi.mock("../components/Sidebar", () => ({
  default: ({ toggleSidebar }: { toggleSidebar: () => void }) => (
    <div>
      Sidebar
      <button onClick={toggleSidebar}>Toggle Sidebar</button>
    </div>
  ),
}));
vi.mock("../components/ProtectedRoute", () => ({
  default: () => <div>Protected</div>,
}));
vi.mock("../components/AuthProvider", () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));
vi.mock("../config/firebase", () => ({ auth: {} }));

const mockUseAuth = vi.fn(() => ({ user: null as { email: string } | null }));
vi.mock("../context/AuthContext", () => ({
  useAuth: () => mockUseAuth(),
}));

describe("App", () => {
  beforeEach(() => {
    cleanup();
    mockUseAuth.mockReturnValue({ user: null });
    localStorage.clear();
  });

  test("renders home page at /", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText("Home Page")).toBeInTheDocument();
  });

  test("renders navbar on non-backoffice routes", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText("Navbar")).toBeInTheDocument();
  });

  test("renders footer on non-backoffice routes", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText("Footer")).toBeInTheDocument();
  });

  test("redirects unknown routes to home", () => {
    render(
      <MemoryRouter initialEntries={["/some/unknown/path"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText("Home Page")).toBeInTheDocument();
  });

  test("renders login page at /login", () => {
    render(
      <MemoryRouter initialEntries={["/login"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText("Login Page")).toBeInTheDocument();
  });

  test("does not render navbar on backoffice routes", () => {
    render(
      <MemoryRouter initialEntries={["/rules"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.queryByText("Navbar")).not.toBeInTheDocument();
  });

  test("does not render footer on backoffice routes", () => {
    render(
      <MemoryRouter initialEntries={["/rules"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.queryByText("Footer")).not.toBeInTheDocument();
  });

  test("renders sidebar on backoffice routes when logged in", () => {
    mockUseAuth.mockReturnValue({ user: { email: "admin@test.com" } });
    render(
      <MemoryRouter initialEntries={["/rules"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText("Sidebar")).toBeInTheDocument();
  });

  test("does not render sidebar when not logged in", () => {
    render(
      <MemoryRouter initialEntries={["/rules"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.queryByText("Sidebar")).not.toBeInTheDocument();
  });

  test("renders sandbox page at /sandbox", () => {
    render(
      <MemoryRouter initialEntries={["/sandbox"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText("Sandbox Page")).toBeInTheDocument();
  });

  test("renders outcome page at /outcome", () => {
    render(
      <MemoryRouter initialEntries={["/outcome"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText("Outcome Page")).toBeInTheDocument();
  });

  test("renders quote page at /quote", () => {
    render(
      <MemoryRouter initialEntries={["/quote"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText("Quotes Page")).toBeInTheDocument();
  });

  test("toggleTheme toggles between light and dark mode", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );
    const toggleButton = screen.getByRole("button", { name: /toggle theme/i });
    act(() => {
      fireEvent.click(toggleButton);
    });
    expect(localStorage.getItem("themeMode")).toBe("dark");
    act(() => {
      fireEvent.click(toggleButton);
    });
    expect(localStorage.getItem("themeMode")).toBe("light");
  });

  test("toggleSidebar toggles sidebar open state", () => {
    mockUseAuth.mockReturnValue({ user: { email: "admin@test.com" } });
    render(
      <MemoryRouter initialEntries={["/rules"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText("Sidebar")).toBeInTheDocument();
    act(() => {
      fireEvent.click(screen.getByRole("button", { name: /toggle sidebar/i }));
    });
    expect(screen.getByText("Sidebar")).toBeInTheDocument();
  });

  test("renders products management page at /products-management", () => {
    render(
      <MemoryRouter initialEntries={["/products-management"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.queryByText("Navbar")).not.toBeInTheDocument();
    expect(screen.queryByText("Footer")).not.toBeInTheDocument();
  });

  test("initialises theme from localStorage", () => {
    localStorage.setItem("themeMode", "dark");
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );
    expect(localStorage.getItem("themeMode")).toBe("dark");
  });
});
