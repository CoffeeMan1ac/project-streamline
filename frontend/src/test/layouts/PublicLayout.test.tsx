import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PublicLayout from "../../layouts/PublicLayout";

vi.mock("../../components/Navbar", () => ({
  default: ({ mode }: { mode: string }) => <div data-testid="navbar">Navbar {mode}</div>,
}));

vi.mock("../../components/Footer", () => ({
  default: () => <div data-testid="footer">Footer</div>,
}));

vi.mock("../../context/AuthContext", () => ({
  useAuth: () => ({ user: null }),
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    Outlet: () => <div data-testid="outlet">Outlet</div>,
  };
});

afterEach(() => cleanup());

const renderLayout = (mode: "light" | "dark" = "light") =>
  render(
    <MemoryRouter>
      <PublicLayout mode={mode} toggleTheme={vi.fn()} />
    </MemoryRouter>
  );

describe("PublicLayout", () => {
  it("renders Navbar, Outlet and Footer", () => {
    renderLayout();
    expect(screen.getByTestId("navbar")).toBeDefined();
    expect(screen.getByTestId("outlet")).toBeDefined();
    expect(screen.getByTestId("footer")).toBeDefined();
  });

  it("passes mode prop to Navbar", () => {
    renderLayout("dark");
    expect(screen.getByTestId("navbar").textContent).toContain("dark");
  });
});
