import "@testing-library/jest-dom/vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { describe, test, expect, vi, afterEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Sidebar from "../Sidebar";
import { useAuth } from "../../context/AuthContext";

vi.mock("../../context/AuthContext", () => ({
  useAuth: vi.fn(),
}));

afterEach(() => {
  cleanup();
});

describe("Sidebar", () => {
  test("renders sidebar buttons", () => {
    vi.mocked(useAuth).mockReturnValue({ user: null, loading: false });

    render(
      <MemoryRouter>
        <Sidebar toggleSidebar={vi.fn()} open={true} toggleTheme={vi.fn()} mode="light" />
      </MemoryRouter>
    );

    expect(screen.getByText(/Rules Management/i)).toBeInTheDocument();
    expect(screen.getByText(/Products Management/i)).toBeInTheDocument();
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
});
