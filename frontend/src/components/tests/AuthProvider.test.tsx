import "@testing-library/jest-dom/vitest";
import { render, screen, cleanup, act } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import { AuthProvider } from "../AuthProvider";

const mockUnsubscribe = vi.fn();
const mockOnAuthStateChanged = vi.fn();

vi.mock("firebase/auth", async (importOriginal) => {
  const actual = (await importOriginal()) as Record<string, unknown>;
  return {
    ...actual,
    onAuthStateChanged: (...args: unknown[]) => mockOnAuthStateChanged(...args),
    getAuth: vi.fn(() => ({})),
  };
});

vi.mock("../config/firebase", () => ({ auth: {} }));

vi.mock("../context/AuthContext", () => ({
  AuthContext: {
    Provider: ({ children, value }: { children: React.ReactNode; value: unknown }) => (
      <div data-testid="auth-context" data-value={JSON.stringify(value)}>
        {children}
      </div>
    ),
  },
}));

describe("AuthProvider", () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
    mockOnAuthStateChanged.mockReturnValue(mockUnsubscribe);
  });

  test("does not render children while loading", () => {
    mockOnAuthStateChanged.mockImplementation(() => mockUnsubscribe);

    render(
      <AuthProvider>
        <div>Child Content</div>
      </AuthProvider>
    );

    expect(screen.queryByText("Child Content")).not.toBeInTheDocument();
  });

  test("renders children after auth state resolves", async () => {
    mockOnAuthStateChanged.mockImplementation((_auth, callback) => {
      callback(null);
      return mockUnsubscribe;
    });

    await act(async () => {
      render(
        <AuthProvider>
          <div>Child Content</div>
        </AuthProvider>
      );
    });

    expect(screen.getByText("Child Content")).toBeInTheDocument();
  });

  test("renders children when user is logged in", async () => {
    mockOnAuthStateChanged.mockImplementation((_auth, callback) => {
      callback({ email: "admin@test.com", uid: "123" });
      return mockUnsubscribe;
    });

    await act(async () => {
      render(
        <AuthProvider>
          <div>Child Content</div>
        </AuthProvider>
      );
    });

    expect(screen.getByText("Child Content")).toBeInTheDocument();
  });

  test("calls unsubscribe on unmount", async () => {
    mockOnAuthStateChanged.mockImplementation((_auth, callback) => {
      callback(null);
      return mockUnsubscribe;
    });

    let unmount: () => void;

    await act(async () => {
      const result = render(
        <AuthProvider>
          <div>Child Content</div>
        </AuthProvider>
      );
      unmount = result.unmount;
    });

    act(() => {
      unmount();
    });

    expect(mockUnsubscribe).toHaveBeenCalled();
  });

  test("registers auth state change listener on mount", async () => {
    mockOnAuthStateChanged.mockImplementation((_auth, callback) => {
      callback(null);
      return mockUnsubscribe;
    });

    await act(async () => {
      render(
        <AuthProvider>
          <div>Child Content</div>
        </AuthProvider>
      );
    });

    expect(mockOnAuthStateChanged).toHaveBeenCalled();
  });
});
