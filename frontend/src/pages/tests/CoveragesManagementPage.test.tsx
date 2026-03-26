import "@testing-library/jest-dom/vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { describe, test, expect, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import CoveragesManagementPage from "../CoveragesManagementPage";

describe("CoveragesManagementPage", () => {
  beforeEach(() => {
    cleanup();
  });

  const renderPage = () => {
    return render(
      <MemoryRouter>
        <CoveragesManagementPage />
      </MemoryRouter>
    );
  };

  test("renders page title", () => {
    renderPage();
    expect(screen.getByText("Coverages Management")).toBeInTheDocument();
  });

  test("renders page subtitle", () => {
    renderPage();
    expect(
      screen.getByText("Manage insurance coverage types and descriptions")
    ).toBeInTheDocument();
  });

  test("renders all coverage names", () => {
    renderPage();
    expect(screen.getByText("Accidental Damage")).toBeInTheDocument();
    expect(screen.getByText("Battery Replacement")).toBeInTheDocument();
    expect(screen.getByText("Data Recovery")).toBeInTheDocument();
    expect(screen.getByText("Extended Warranty")).toBeInTheDocument();
    expect(screen.getByText("Liquid Damage")).toBeInTheDocument();
    expect(screen.getByText("Screen Damage")).toBeInTheDocument();
    expect(screen.getAllByText("Theft").length).toBeGreaterThan(0);
    expect(screen.getByText("Worldwide Coverage")).toBeInTheDocument();
  });

  test("renders coverage descriptions", () => {
    renderPage();
    const descriptions = screen.getAllByText(/coverage for/i);
    expect(descriptions.length).toBeGreaterThan(0);
  });

  test("renders category chips", () => {
    renderPage();
    const categories = ["Damage", "Warranty", "Theft", "Other"];
    categories.forEach((category) => {
      const chips = screen.getAllByText(category);
      expect(chips.length).toBeGreaterThan(0);
    });
  });

  test("renders used in products counts", () => {
    renderPage();
    const numbers = screen.getAllByText(/\d+/);
    const hasProductNumbers = numbers.some((number) => {
      const row = number.closest("tr");
      return row && row.textContent?.includes("products");
    });
    expect(hasProductNumbers).toBe(true);
  });
});
