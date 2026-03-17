import "@testing-library/jest-dom/vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Home from "../Home";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useLocation: () => ({ hash: "", pathname: "/" }),
  };
});

vi.mock("../../components/HeroSection", () => ({
  default: () => <div>Hero Section</div>,
}));

vi.mock("../../components/ProductSection", () => ({
  default: () => <div>Product Section</div>,
}));

describe("Home", () => {
  beforeEach(() => {
    cleanup();
  });

  test("renders hero section", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    expect(screen.getByText("Hero Section")).toBeInTheDocument();
  });

  test("renders product section", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    expect(screen.getByText("Product Section")).toBeInTheDocument();
  });

  test("scrolls to quotes section when hash is #quotes", () => {
    vi.mock("react-router-dom", async () => {
      const actual = await vi.importActual("react-router-dom");
      return {
        ...actual,
        useLocation: () => ({ hash: "#quotes", pathname: "/" }),
      };
    });

    const scrollIntoViewMock = vi.fn();
    vi.spyOn(document, "getElementById").mockReturnValue({
      scrollIntoView: scrollIntoViewMock,
    } as any);

    render(
      <MemoryRouter initialEntries={["/#quotes"]}>
        <Home />
      </MemoryRouter>
    );

    expect(screen.getByText("Hero Section")).toBeInTheDocument();
  });
});
