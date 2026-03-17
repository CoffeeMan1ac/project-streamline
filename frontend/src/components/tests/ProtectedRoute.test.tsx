import "@testing-library/jest-dom/vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute";

vi.mock("../../context/AuthContext", () => ({
  useAuth: vi.fn(),
}));

import { useAuth } from "../../context/AuthContext";

describe("ProtectedRoute", () => {
  beforeEach(() => {
    cleanup();
  });

  const renderProtectedRoute = () =>
    render(
      <MemoryRouter initialEntries={["/protected"]}>
        <Routes>
          <Route path="/login" element={<div>Login Page</div>} />
          <Route element={<ProtectedRoute />}>
            <Route path="/protected" element={<div>Protected Content</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

  test("renders loading spinner when loading and no user", () => {
    vi.mocked(useAuth).mockReturnValue({ user: null, loading: true });
    renderProtectedRoute();
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  test("redirects to login when user is not authenticated", () => {
    vi.mocked(useAuth).mockReturnValue({ user: null, loading: false });
    renderProtectedRoute();
    expect(screen.getByText("Login Page")).toBeInTheDocument();
  });

  test("renders protected content when user is authenticated", () => {
    vi.mocked(useAuth).mockReturnValue({
      user: { email: "admin@test.com" } as any,
      loading: false,
    });
    renderProtectedRoute();
    expect(screen.getByText("Protected Content")).toBeInTheDocument();
  });

  test("does not render protected content when not authenticated", () => {
    vi.mocked(useAuth).mockReturnValue({ user: null, loading: false });
    renderProtectedRoute();
    expect(screen.queryByText("Protected Content")).not.toBeInTheDocument();
  });

  test("does not redirect when user is authenticated", () => {
    vi.mocked(useAuth).mockReturnValue({
      user: { email: "admin@test.com" } as any,
      loading: false,
    });
    renderProtectedRoute();
    expect(screen.queryByText("Login Page")).not.toBeInTheDocument();
  });
});
