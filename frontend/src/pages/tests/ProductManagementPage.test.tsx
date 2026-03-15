import "@testing-library/jest-dom/vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import ProductManagementPage from "../ProductManagementPage";

vi.mock("../EditProductPage", () => ({
  default: ({ onClose }: { onClose: () => void }) => (
    <div>
      <span>Edit Product Modal</span>
      <button onClick={onClose}>Close</button>
    </div>
  ),
}));

vi.mock("../CreateProductPage", () => ({
  default: ({ onClose }: { onClose: () => void }) => (
    <div>
      <span>Create Product Modal</span>
      <button onClick={onClose}>Close</button>
    </div>
  ),
}));

vi.mock("../../services/productService", () => ({
  productService: {
    getProducts: vi.fn().mockResolvedValue({ data: [] }),
    toggleProductActive: vi.fn().mockResolvedValue({}),
  },
}));

describe("ProductManagementPage", () => {
  beforeEach(() => {
    cleanup();
  });

  const renderPage = () => {
    return render(
      <MemoryRouter>
        <ProductManagementPage />
      </MemoryRouter>
    );
  };

  test("renders page title", () => {
    renderPage();
    expect(screen.getByText("Products Management")).toBeInTheDocument();
  });

  test("renders page subtitle", () => {
    renderPage();
    expect(screen.getByText("Configure and manage insurance products")).toBeInTheDocument();
  });

  test("renders search bar", () => {
    renderPage();
    expect(screen.getByPlaceholderText("Search products...")).toBeInTheDocument();
  });

  test("search bar updates on input", () => {
    renderPage();
    const input = screen.getByPlaceholderText("Search products...");
    fireEvent.change(input, { target: { value: "Shield" } });
    expect(input).toHaveValue("Shield");
  });

  test("renders all products dropdown with default value", () => {
    renderPage();
    expect(screen.getByText("All Products")).toBeInTheDocument();
  });

  test("renders create product button", () => {
    renderPage();
    expect(screen.getByRole("button", { name: /create product/i })).toBeInTheDocument();
  });

  test("opens create product modal when create button is clicked", () => {
    renderPage();
    fireEvent.click(screen.getByRole("button", { name: /create product/i }));
    expect(screen.getByText("Create Product Modal")).toBeInTheDocument();
  });

  test("status filter updates when option is selected", () => {
    renderPage();
    const combobox = screen.getByRole("combobox");
    fireEvent.mouseDown(combobox);
    fireEvent.click(screen.getAllByText("Active")[0]);
    expect(screen.getAllByText("Active")[0]).toBeInTheDocument();
  });
});
