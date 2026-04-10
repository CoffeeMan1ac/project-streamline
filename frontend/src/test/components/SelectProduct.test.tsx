import "@testing-library/jest-dom/vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach, afterAll, beforeAll } from "vitest";
import SelectProduct from "../../components/SelectProduct";

const mockProducts = [
  { id: "1", name: "Premium Shield" },
  { id: "2", name: "Standard Shield" },
];

const defaultProps = {
  products: mockProducts,
  selectedProduct: "",
  onProductChange: vi.fn(),
};

describe("SelectProduct", () => {
  const originalConsoleError = console.error;
  const originalConsoleWarn = console.warn;

  beforeAll(() => {
    console.error = (...args) => {
      const isMuiAnchorError = args.some(
        (arg) => typeof arg === "string" && arg.includes("anchorEl")
      );
      if (isMuiAnchorError) return;
      originalConsoleError(...args);
    };

    console.warn = (...args) => {
      const isMuiAnchorWarning = args.some(
        (arg) => typeof arg === "string" && arg.includes("anchorEl")
      );
      if (isMuiAnchorWarning) return;
      originalConsoleWarn(...args);
    };
  });

  afterAll(() => {
    console.error = originalConsoleError;
    console.warn = originalConsoleWarn;
  });

  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  test("renders select product label", () => {
    render(<SelectProduct {...defaultProps} />);
    expect(screen.getByText("Select Product")).toBeInTheDocument();
  });

  test("renders product dropdown", () => {
    render(<SelectProduct {...defaultProps} />);
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  test("renders all product options", () => {
    render(<SelectProduct {...defaultProps} />);
    fireEvent.mouseDown(screen.getByRole("combobox"));
    expect(screen.getByText("Premium Shield")).toBeInTheDocument();
    expect(screen.getByText("Standard Shield")).toBeInTheDocument();
  });

  test("calls onProductChange when a product is selected", () => {
    const onProductChange = vi.fn();
    render(<SelectProduct {...defaultProps} onProductChange={onProductChange} />);
    fireEvent.mouseDown(screen.getByRole("combobox"));
    fireEvent.click(screen.getByText("Premium Shield"));
    expect(onProductChange).toHaveBeenCalledWith("1");
  });

  test("renders with selected product", () => {
    render(<SelectProduct {...defaultProps} selectedProduct="1" />);
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  test("renders empty dropdown when no products", () => {
    render(<SelectProduct {...defaultProps} products={[]} />);
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });
});
