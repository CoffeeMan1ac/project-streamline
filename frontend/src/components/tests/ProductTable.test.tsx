import "@testing-library/jest-dom/vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import ProductTable from "../ProductTable";

const testProducts = [
  {
    id: "1",
    productName: "Standard Shield",
    modifiedBy: "Michael Brown",
    status: "active",
    price: "€9.99/month",
    coverageSummary: "Accidental Damage, Theft",
  },
  {
    id: "2",
    productName: "Premium Shield",
    modifiedBy: "Sarah Mitchell",
    status: "inactive",
    price: "€14.99/month",
    coverageSummary: "Accidental Damage, Theft, Liquid Damage",
  },
];

describe("ProductTable", () => {
  beforeEach(() => {
    cleanup();
  });

  const renderTable = (overrides = {}) => {
    const props = {
      products: testProducts,
      onEditProduct: vi.fn(),
      onToggleProductActive: vi.fn(),
      ...overrides,
    };

    return render(
      <MemoryRouter>
        <ProductTable {...props} />
      </MemoryRouter>
    );
  };

  test("renders table headings", () => {
    renderTable();
    expect(screen.getByText("PRODUCT NAME")).toBeInTheDocument();
    expect(screen.getByText("STATUS")).toBeInTheDocument();
    expect(screen.getByText("PRICE")).toBeInTheDocument();
    expect(screen.getByText("COVERAGE SUMMARY")).toBeInTheDocument();
    expect(screen.getByText("ACTIONS")).toBeInTheDocument();
  });

  test("renders all product rows", () => {
    renderTable();
    expect(screen.getByText("Standard Shield")).toBeInTheDocument();
    expect(screen.getByText("Premium Shield")).toBeInTheDocument();
  });

  test("renders modified by text", () => {
    renderTable();
    expect(screen.getByText("Modified by Michael Brown")).toBeInTheDocument();
    expect(screen.getByText("Modified by Sarah Mitchell")).toBeInTheDocument();
  });

  test("calls onEditProduct with correct id when edit is clicked", () => {
    const onEditProduct = vi.fn();
    renderTable({ onEditProduct });
    const editButtons = screen.getAllByTestId("edit-button");
    fireEvent.click(editButtons[0]);
    expect(onEditProduct).toHaveBeenCalledWith("1");
  });
});
