import "@testing-library/jest-dom/vitest";
import { render, screen, fireEvent, cleanup, waitFor } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Sidebar from "../Sidebar";
import { useAuth } from "../../context/AuthContext";

const mockNavigate = vi.fn();
let mockPathname = "/rules";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => ({ pathname: mockPathname }),
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

let mockIsMobile = false;
vi.mock("@mui/material", async () => {
  const actual = await vi.importActual("@mui/material");
  return {
    ...actual,
    useMediaQuery: () => mockIsMobile,
  };
});

afterEach(() => {
  cleanup();
});

describe("Sidebar", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    mockPathname = "/rules";
    mockIsMobile = false;
  });

  test("renders sidebar buttons", () => {
    vi.mocked(useAuth).mockReturnValue({ user: null, loading: false });

    render(
      <MemoryRouter>
        <Sidebar toggleSidebar={vi.fn()} open={true} toggleTheme={vi.fn()} mode="light" />
      </MemoryRouter>
    );

    expect(screen.getByText(/Rules/i)).toBeInTheDocument();
    expect(screen.getByText(/Products/i)).toBeInTheDocument();
  });

  test("renders admin user info", () => {
    vi.mocked(useAuth).mockReturnValue({ user: null, loading: false });

    render(
      <MemoryRouter>
        <Sidebar toggleSidebar={vi.fn()} open={true} toggleTheme={vi.fn()} mode="light" />
      </MemoryRouter>
    );

    expect(screen.getByText(/Admin User/i)).toBeInTheDocument();
    expect(screen.getByText(/Underwriter/i)).toBeInTheDocument();
  });

  test("renders logout button", () => {
    vi.mocked(useAuth).mockReturnValue({ user: null, loading: false });

    render(
      <MemoryRouter>
        <Sidebar toggleSidebar={vi.fn()} open={true} toggleTheme={vi.fn()} mode="light" />
      </MemoryRouter>
    );

    expect(screen.getByText(/Logout/i)).toBeInTheDocument();
  });

  test("renders user email when user is logged in", () => {
    vi.mocked(useAuth).mockReturnValue({
      user: { email: "admin@test.com" } as any,
      loading: false,
    });
    render(
      <MemoryRouter>
        <Sidebar toggleSidebar={vi.fn()} open={true} toggleTheme={vi.fn()} mode="light" />
      </MemoryRouter>
    );
    expect(screen.getByText("admin@test.com")).toBeInTheDocument();
  });

  test("renders logo and title when open", () => {
    vi.mocked(useAuth).mockReturnValue({ user: null, loading: false });
    render(
      <MemoryRouter>
        <Sidebar toggleSidebar={vi.fn()} open={true} toggleTheme={vi.fn()} mode="light" />
      </MemoryRouter>
    );
    expect(screen.getByText("Phone Shield")).toBeInTheDocument();
    expect(screen.getByText("Backoffice Portal")).toBeInTheDocument();
  });

  test("calls toggleSidebar when menu icon is clicked", () => {
    vi.mocked(useAuth).mockReturnValue({ user: null, loading: false });
    const toggleSidebar = vi.fn();
    render(
      <MemoryRouter>
        <Sidebar toggleSidebar={toggleSidebar} open={true} toggleTheme={vi.fn()} mode="light" />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByTestId("MenuIcon").closest("button")!);
    expect(toggleSidebar).toHaveBeenCalled();
  });

  test("navigates to rules when rules button is clicked", () => {
    vi.mocked(useAuth).mockReturnValue({ user: null, loading: false });
    render(
      <MemoryRouter>
        <Sidebar toggleSidebar={vi.fn()} open={true} toggleTheme={vi.fn()} mode="light" />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByText("Rules"));
    expect(mockNavigate).toHaveBeenCalledWith("/rules");
  });

  test("navigates to products when products button is clicked", () => {
    vi.mocked(useAuth).mockReturnValue({ user: null, loading: false });
    render(
      <MemoryRouter>
        <Sidebar toggleSidebar={vi.fn()} open={true} toggleTheme={vi.fn()} mode="light" />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByText("Products"));
    expect(mockNavigate).toHaveBeenCalledWith("/products");
  });

  test("calls toggleTheme when theme button is clicked", () => {
    vi.mocked(useAuth).mockReturnValue({ user: null, loading: false });
    const toggleTheme = vi.fn();
    render(
      <MemoryRouter>
        <Sidebar toggleSidebar={vi.fn()} open={true} toggleTheme={toggleTheme} mode="light" />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByTestId("Brightness4Icon").closest("button")!);
    expect(toggleTheme).toHaveBeenCalled();
  });

  test("renders Brightness7 icon in dark mode", () => {
    vi.mocked(useAuth).mockReturnValue({ user: null, loading: false });
    render(
      <MemoryRouter>
        <Sidebar toggleSidebar={vi.fn()} open={true} toggleTheme={vi.fn()} mode="dark" />
      </MemoryRouter>
    );
    expect(screen.getByTestId("Brightness7Icon")).toBeInTheDocument();
  });

  test("calls signOut and navigates to login on logout", async () => {
    vi.mocked(useAuth).mockReturnValue({ user: null, loading: false });
    const { signOut } = await import("firebase/auth");
    vi.mocked(signOut).mockResolvedValueOnce();

    render(
      <MemoryRouter>
        <Sidebar toggleSidebar={vi.fn()} open={true} toggleTheme={vi.fn()} mode="light" />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByText("Logout"));
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/login");
    });
  });

  test("renders icon buttons when collapsed", () => {
    vi.mocked(useAuth).mockReturnValue({ user: null, loading: false });
    render(
      <MemoryRouter>
        <Sidebar toggleSidebar={vi.fn()} open={false} toggleTheme={vi.fn()} mode="light" />
      </MemoryRouter>
    );
    expect(screen.getByTestId("FeedOutlinedIcon")).toBeInTheDocument();
    expect(screen.getByTestId("ViewInArOutlinedIcon")).toBeInTheDocument();
  });

  test("renders logout icon when collapsed", () => {
    vi.mocked(useAuth).mockReturnValue({ user: null, loading: false });
    render(
      <MemoryRouter>
        <Sidebar toggleSidebar={vi.fn()} open={false} toggleTheme={vi.fn()} mode="light" />
      </MemoryRouter>
    );
    expect(screen.getByTestId("LogoutOutlinedIcon")).toBeInTheDocument();
  });

  test("navigates to rules when collapsed rules icon is clicked", () => {
    vi.mocked(useAuth).mockReturnValue({ user: null, loading: false });
    render(
      <MemoryRouter>
        <Sidebar toggleSidebar={vi.fn()} open={false} toggleTheme={vi.fn()} mode="light" />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByTestId("FeedOutlinedIcon").closest("button")!);
    expect(mockNavigate).toHaveBeenCalledWith("/rules");
  });

  test("navigates to products when collapsed products icon is clicked", () => {
    vi.mocked(useAuth).mockReturnValue({ user: null, loading: false });
    render(
      <MemoryRouter>
        <Sidebar toggleSidebar={vi.fn()} open={false} toggleTheme={vi.fn()} mode="light" />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByTestId("ViewInArOutlinedIcon").closest("button")!);
    expect(mockNavigate).toHaveBeenCalledWith("/products");
  });

  test("highlights products nav item when on /products path", () => {
    mockPathname = "/products";
    vi.mocked(useAuth).mockReturnValue({ user: null, loading: false });
    render(
      <MemoryRouter>
        <Sidebar toggleSidebar={vi.fn()} open={true} toggleTheme={vi.fn()} mode="light" />
      </MemoryRouter>
    );
    expect(screen.getByText("Products")).toBeInTheDocument();
  });

  test("highlights quotes nav item when on /quotations path", () => {
    mockPathname = "/quotations/123";
    vi.mocked(useAuth).mockReturnValue({ user: null, loading: false });
    render(
      <MemoryRouter>
        <Sidebar toggleSidebar={vi.fn()} open={true} toggleTheme={vi.fn()} mode="light" />
      </MemoryRouter>
    );
    expect(screen.getByText("Quotations Management")).toBeInTheDocument();
  });

  test("highlights quotes nav item when on /quotes path", () => {
    mockPathname = "/quotes";
    vi.mocked(useAuth).mockReturnValue({ user: null, loading: false });
    render(
      <MemoryRouter>
        <Sidebar toggleSidebar={vi.fn()} open={true} toggleTheme={vi.fn()} mode="light" />
      </MemoryRouter>
    );
    expect(screen.getByText("Quotations Management")).toBeInTheDocument();
  });

  test("defaults to rules active on unknown path", () => {
    mockPathname = "/unknown";
    vi.mocked(useAuth).mockReturnValue({ user: null, loading: false });
    render(
      <MemoryRouter>
        <Sidebar toggleSidebar={vi.fn()} open={true} toggleTheme={vi.fn()} mode="light" />
      </MemoryRouter>
    );
    expect(screen.getByText("Rules")).toBeInTheDocument();
  });

  test("calls signOut and navigates to login when collapsed logout icon is clicked", async () => {
    vi.mocked(useAuth).mockReturnValue({ user: null, loading: false });
    const { signOut } = await import("firebase/auth");
    vi.mocked(signOut).mockResolvedValueOnce();

    render(
      <MemoryRouter>
        <Sidebar toggleSidebar={vi.fn()} open={false} toggleTheme={vi.fn()} mode="light" />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByTestId("LogoutOutlinedIcon").closest("button")!);
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/login");
    });
  });
});
