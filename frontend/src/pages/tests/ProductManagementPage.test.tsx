import "@testing-library/jest-dom/vitest";
import { render, screen, fireEvent, cleanup, waitFor } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach, afterAll, beforeAll } from "vitest";
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
    getProducts: vi.fn().mockResolvedValue({ data: [] } as any),
    toggleProductActive: vi.fn().mockResolvedValue({} as any),
  },
}));

vi.mock("../../components/ProductTable", () => ({
  default: ({
    onEditProduct,
    onToggleProductActive,
    products,
  }: {
    onEditProduct: (id: string) => void;
    onToggleProductActive: (id: string) => void;
    products: { id: string }[];
  }) => (
    <div>
      <span>Product Table</span>
      {products.map((p) => (
        <div key={p.id}>
          <button onClick={() => onEditProduct(p.id)}>Edit {p.id}</button>
          <button onClick={() => onToggleProductActive(p.id)}>Toggle {p.id}</button>
        </div>
      ))}
    </div>
  ),
}));

const mockProduct = {
  id: "product-1",
  name: "Premium Shield",
  active: true,
  baseRate: 10,
  description: "Test",
  startDate: null,
  endDate: null,
  tags: [],
  type: { id: "1", code: "TYPE", label: "Type" },
  coverages: [],
  exclusions: [],
  productFields: [],
};

describe("ProductManagementPage", () => {
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

  test("closes create product modal when close is clicked", async () => {
    renderPage();
    fireEvent.click(screen.getByRole("button", { name: /create product/i }));
    expect(screen.getByText("Create Product Modal")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /close/i }));
    await waitFor(() => {
      expect(screen.queryByText("Create Product Modal")).not.toBeInTheDocument();
    });
  });

  test("status filter updates when option is selected", () => {
    renderPage();
    const combobox = screen.getByRole("combobox");
    fireEvent.mouseDown(combobox);
    fireEvent.click(screen.getAllByText("Active")[0]);
    expect(screen.getAllByText("Active")[0]).toBeInTheDocument();
  });

  test("fetches products on mount", async () => {
    const { productService } = await import("../../services/productService");
    renderPage();
    await waitFor(() => {
      expect(productService.getProducts).toHaveBeenCalled();
    });
  });

  test("shows error alert when fetching products fails", async () => {
    const { productService } = await import("../../services/productService");
    vi.mocked(productService.getProducts).mockRejectedValueOnce(new Error("Network error"));
    renderPage();
    await waitFor(() => {
      expect(screen.getByText("Failed to load products. Please try again.")).toBeInTheDocument();
    });
  });

  test("dismisses error alert when close is clicked", async () => {
    const { productService } = await import("../../services/productService");
    vi.mocked(productService.getProducts).mockRejectedValueOnce(new Error("Network error"));
    renderPage();
    await waitFor(() => {
      expect(screen.getByText("Failed to load products. Please try again.")).toBeInTheDocument();
    });
    fireEvent.click(screen.getByTitle("Close"));
    await waitFor(() => {
      expect(
        screen.queryByText("Failed to load products. Please try again.")
      ).not.toBeInTheDocument();
    });
  });

  test("opens edit product modal when edit is clicked", async () => {
    const { productService } = await import("../../services/productService");
    vi.mocked(productService.getProducts).mockResolvedValueOnce({
      data: [mockProduct],
    } as any);

    renderPage();

    await waitFor(() => {
      expect(screen.getByRole("button", { name: /edit product-1/i })).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole("button", { name: /edit product-1/i }));
    expect(screen.getByText("Edit Product Modal")).toBeInTheDocument();
  });

  test("closes edit product modal when close is clicked", async () => {
    const { productService } = await import("../../services/productService");
    vi.mocked(productService.getProducts).mockResolvedValueOnce({
      data: [mockProduct],
    } as any);

    renderPage();

    await waitFor(() => {
      expect(screen.getByRole("button", { name: /edit product-1/i })).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole("button", { name: /edit product-1/i }));
    expect(screen.getByText("Edit Product Modal")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /close/i }));
    await waitFor(() => {
      expect(screen.queryByText("Edit Product Modal")).not.toBeInTheDocument();
    });
  });

  test("calls toggleProductActive when toggle is clicked", async () => {
    const { productService } = await import("../../services/productService");
    vi.mocked(productService.getProducts).mockResolvedValueOnce({
      data: [mockProduct],
    } as any);

    renderPage();

    await waitFor(() => {
      expect(screen.getByRole("button", { name: /toggle product-1/i })).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole("button", { name: /toggle product-1/i }));

    await waitFor(() => {
      expect(productService.toggleProductActive).toHaveBeenCalledWith("product-1");
    });
  });

  test("shows error when toggle fails", async () => {
    const { productService } = await import("../../services/productService");
    vi.mocked(productService.getProducts).mockResolvedValueOnce({
      data: [mockProduct],
    } as any);
    vi.mocked(productService.toggleProductActive).mockRejectedValueOnce(new Error("Toggle failed"));

    renderPage();

    await waitFor(() => {
      expect(screen.getByRole("button", { name: /toggle product-1/i })).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole("button", { name: /toggle product-1/i }));

    await waitFor(() => {
      expect(screen.getByText("Failed to update product. Please try again.")).toBeInTheDocument();
    });
  });

  test("filters products by active status", async () => {
    const { productService } = await import("../../services/productService");
    vi.mocked(productService.getProducts).mockResolvedValueOnce({
      data: [
        { ...mockProduct, id: "p1", active: true },
        { ...mockProduct, id: "p2", active: false },
      ],
    } as any);

    renderPage();

    await waitFor(() => {
      expect(screen.getByRole("button", { name: /edit p1/i })).toBeInTheDocument();
    });

    const combobox = screen.getByRole("combobox");
    fireEvent.mouseDown(combobox);
    fireEvent.click(screen.getAllByText("Active")[0]);

    await waitFor(() => {
      expect(screen.getByRole("button", { name: /edit p1/i })).toBeInTheDocument();
      expect(screen.queryByRole("button", { name: /edit p2/i })).not.toBeInTheDocument();
    });
  });

  test("filters products by inactive status", async () => {
    const { productService } = await import("../../services/productService");
    vi.mocked(productService.getProducts).mockResolvedValueOnce({
      data: [
        { ...mockProduct, id: "p1", active: true },
        { ...mockProduct, id: "p2", active: false },
      ],
    } as any);

    renderPage();

    await waitFor(() => {
      expect(screen.getByRole("button", { name: /edit p2/i })).toBeInTheDocument();
    });

    const combobox = screen.getByRole("combobox");
    fireEvent.mouseDown(combobox);
    fireEvent.click(screen.getByText("Inactive"));

    await waitFor(() => {
      expect(screen.getByRole("button", { name: /edit p2/i })).toBeInTheDocument();
      expect(screen.queryByRole("button", { name: /edit p1/i })).not.toBeInTheDocument();
    });
  });

  test("refetches products after edit dialog closes", async () => {
    const { productService } = await import("../../services/productService");
    vi.mocked(productService.getProducts).mockResolvedValueOnce({
      data: [mockProduct],
    } as any);

    renderPage();

    await waitFor(() => {
      expect(screen.getByRole("button", { name: /edit product-1/i })).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole("button", { name: /edit product-1/i }));
    fireEvent.click(screen.getByRole("button", { name: /close/i }));

    await waitFor(() => {
      expect(productService.getProducts).toHaveBeenCalledTimes(2);
    });
  });

  test("filters products by retired status shows all non-active/inactive", async () => {
    const { productService } = await import("../../services/productService");
    vi.mocked(productService.getProducts).mockResolvedValueOnce({
      data: [
        { ...mockProduct, id: "p1", active: true },
        { ...mockProduct, id: "p2", active: false },
      ],
    } as any);

    renderPage();

    await waitFor(() => {
      expect(screen.getByRole("button", { name: /edit p1/i })).toBeInTheDocument();
    });

    const combobox = screen.getByRole("combobox");
    fireEvent.mouseDown(combobox);
    fireEvent.click(screen.getByText("Retired"));

    await waitFor(() => {
      expect(screen.getByRole("button", { name: /edit p1/i })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /edit p2/i })).toBeInTheDocument();
    });
  });

  test("renders products with tags", async () => {
    const { productService } = await import("../../services/productService");
    vi.mocked(productService.getProducts).mockResolvedValueOnce({
      data: [
        {
          ...mockProduct,
          id: "p1",
          tags: [{ id: "t1", code: "POPULAR", label: "Most Popular" }],
        },
      ],
    } as any);

    renderPage();

    await waitFor(() => {
      expect(screen.getByRole("button", { name: /edit p1/i })).toBeInTheDocument();
    });
  });

  test("closes edit dialog via onClose (backdrop/escape)", async () => {
    const { productService } = await import("../../services/productService");
    vi.mocked(productService.getProducts).mockResolvedValueOnce({
      data: [mockProduct],
    } as any);

    renderPage();

    await waitFor(() => {
      expect(screen.getByRole("button", { name: /edit product-1/i })).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole("button", { name: /edit product-1/i }));
    expect(screen.getByText("Edit Product Modal")).toBeInTheDocument();

    fireEvent.click(document.querySelector(".MuiBackdrop-root")!);

    await waitFor(() => {
      expect(screen.queryByText("Edit Product Modal")).not.toBeInTheDocument();
    });
  });
});
