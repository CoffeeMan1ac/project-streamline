import "@testing-library/jest-dom/vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import { AuthContext, useAuth } from "../../context/AuthContext";

vi.mock("firebase/auth", async (importOriginal) => {
  const actual = (await importOriginal()) as Record<string, unknown>;
  return {
    ...actual,
    getAuth: vi.fn(() => ({})),
  };
});

vi.mock("../config/firebase", () => ({ auth: {} }));

const TestComponent = () => {
  const { user, loading } = useAuth();
  return (
    <div>
      <span data-testid="user">{user ? user.email : "no user"}</span>
      <span data-testid="loading">{loading ? "loading" : "not loading"}</span>
    </div>
  );
};

describe("AuthContext", () => {
  beforeEach(() => {
    cleanup();
  });

  test("provides user and loading values via context", () => {
    render(
      <AuthContext.Provider value={{ user: { email: "admin@test.com" } as any, loading: false }}>
        <TestComponent />
      </AuthContext.Provider>
    );
    expect(screen.getByTestId("user")).toHaveTextContent("admin@test.com");
    expect(screen.getByTestId("loading")).toHaveTextContent("not loading");
  });

  test("provides null user when not logged in", () => {
    render(
      <AuthContext.Provider value={{ user: null, loading: false }}>
        <TestComponent />
      </AuthContext.Provider>
    );
    expect(screen.getByTestId("user")).toHaveTextContent("no user");
  });

  test("provides loading state", () => {
    render(
      <AuthContext.Provider value={{ user: null, loading: true }}>
        <TestComponent />
      </AuthContext.Provider>
    );
    expect(screen.getByTestId("loading")).toHaveTextContent("loading");
  });

  test("throws error when useAuth is used outside AuthProvider", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<TestComponent />)).toThrow("useAuth must be used within an AuthProvider");
  });
});
