import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("axios", () => {
  const mockedAxios = {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    patch: vi.fn(),
    interceptors: {
      request: { use: vi.fn() },
      response: { use: vi.fn() },
    },
    create: vi.fn(),
  };
  mockedAxios.create.mockReturnValue(mockedAxios);
  return { default: mockedAxios };
});

vi.mock("../config/firebase", () => ({
  auth: { currentUser: null },
}));

import { productService } from "../productService";
import axios from "axios";

const mockedHttp = axios.create() as any;

// Shared fixtures
const mockProduct = {
  id: "prod-1",
  baseRate: 100,
  name: "Test Product",
  description: "A test product",
  active: true,
  startDate: "2024-01-01",
  endDate: null,
  tags: [],
  type: { id: "t1", code: "HOME", label: "Home" },
  coverages: [],
  exclusions: [],
  productFields: [],
};

const mockCoverages = [
  { id: "c1", code: "FIRE", label: "Fire" },
  { id: "c2", code: "FLOOD", label: "Flood" },
];

const mockTags = [
  { id: "tag1", code: "NEW", label: "New" },
  { id: "tag2", code: "PROMO", label: "Promo" },
];

const createPayload = {
  name: "New Product",
  description: "Desc",
  baseRate: 50,
  type: "HOME",
  startDate: "2024-01-01",
  endDate: null,
  coverages: ["c1"],
  exclusions: [],
  tags: ["tag1"],
};

const updatePayload = {
  name: "Updated Product",
  description: "Updated desc",
  baseRate: 75,
  startDate: "2024-01-01",
  endDate: "2025-01-01",
  coverages: ["c1", "c2"],
  exclusions: ["c2"],
  tags: ["tag2"],
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe("productService.getProducts", () => {
  it("calls GET /backoffice/products with no params when active is undefined", () => {
    mockedHttp.get.mockResolvedValueOnce({ data: [mockProduct] });

    productService.getProducts();

    expect(mockedHttp.get).toHaveBeenCalledWith("/backoffice/products", { params: {} });
  });

  it("calls GET /backoffice/products with active=true", () => {
    mockedHttp.get.mockResolvedValueOnce({ data: [mockProduct] });

    productService.getProducts(true);

    expect(mockedHttp.get).toHaveBeenCalledWith("/backoffice/products", {
      params: { active: true },
    });
  });

  it("calls GET /backoffice/products with active=false", () => {
    mockedHttp.get.mockResolvedValueOnce({ data: [] });

    productService.getProducts(false);

    expect(mockedHttp.get).toHaveBeenCalledWith("/backoffice/products", {
      params: { active: false },
    });
  });

  it("returns the resolved data", async () => {
    mockedHttp.get.mockResolvedValueOnce({ data: [mockProduct] });

    const result = await productService.getProducts();

    expect(result).toEqual({ data: [mockProduct] });
  });

  it("propagates errors", async () => {
    mockedHttp.get.mockRejectedValueOnce(new Error("Network error"));

    await expect(productService.getProducts()).rejects.toThrow("Network error");
  });
});

describe("productService.toggleProductActive", () => {
  it("calls PATCH /backoffice/products/:id/active", () => {
    mockedHttp.patch.mockResolvedValueOnce({ data: undefined });

    productService.toggleProductActive("prod-1");

    expect(mockedHttp.patch).toHaveBeenCalledWith("/backoffice/products/prod-1/active");
  });

  it("uses the provided id in the URL", () => {
    mockedHttp.patch.mockResolvedValueOnce({ data: undefined });

    productService.toggleProductActive("abc-123");

    expect(mockedHttp.patch).toHaveBeenCalledWith("/backoffice/products/abc-123/active");
  });

  it("propagates errors", async () => {
    mockedHttp.patch.mockRejectedValueOnce(new Error("Server error"));

    await expect(productService.toggleProductActive("prod-1")).rejects.toThrow("Server error");
  });
});

describe("productService.createProduct", () => {
  it("calls POST /backoffice/products with the payload", () => {
    mockedHttp.post.mockResolvedValueOnce({ data: mockProduct });

    productService.createProduct(createPayload);

    expect(mockedHttp.post).toHaveBeenCalledWith("/backoffice/products", createPayload);
  });

  it("returns the created product", async () => {
    mockedHttp.post.mockResolvedValueOnce({ data: mockProduct });

    const result = await productService.createProduct(createPayload);

    expect(result).toEqual({ data: mockProduct });
  });

  it("sends null endDate correctly", () => {
    mockedHttp.post.mockResolvedValueOnce({ data: mockProduct });

    productService.createProduct({ ...createPayload, endDate: null });

    expect(mockedHttp.post).toHaveBeenCalledWith("/backoffice/products", expect.objectContaining({ endDate: null }));
  });

  it("propagates errors", async () => {
    mockedHttp.post.mockRejectedValueOnce(new Error("Validation error"));

    await expect(productService.createProduct(createPayload)).rejects.toThrow("Validation error");
  });
});

describe("productService.getCoverages", () => {
  it("calls GET /backoffice/products/coverages", () => {
    mockedHttp.get.mockResolvedValueOnce({ data: mockCoverages });

    productService.getCoverages();

    expect(mockedHttp.get).toHaveBeenCalledWith("/backoffice/products/coverages");
  });

  it("returns coverage options", async () => {
    mockedHttp.get.mockResolvedValueOnce({ data: mockCoverages });

    const result = await productService.getCoverages();

    expect(result).toEqual({ data: mockCoverages });
  });

  it("propagates errors", async () => {
    mockedHttp.get.mockRejectedValueOnce(new Error("Not found"));

    await expect(productService.getCoverages()).rejects.toThrow("Not found");
  });
});

describe("productService.getTags", () => {
  it("calls GET /backoffice/products/tags", () => {
    mockedHttp.get.mockResolvedValueOnce({ data: mockTags });

    productService.getTags();

    expect(mockedHttp.get).toHaveBeenCalledWith("/backoffice/products/tags");
  });

  it("returns tag options", async () => {
    mockedHttp.get.mockResolvedValueOnce({ data: mockTags });

    const result = await productService.getTags();

    expect(result).toEqual({ data: mockTags });
  });

  it("propagates errors", async () => {
    mockedHttp.get.mockRejectedValueOnce(new Error("Unauthorized"));

    await expect(productService.getTags()).rejects.toThrow("Unauthorized");
  });
});

describe("productService.getProduct", () => {
  it("calls GET /backoffice/products/:id", () => {
    mockedHttp.get.mockResolvedValueOnce({ data: mockProduct });

    productService.getProduct("prod-1");

    expect(mockedHttp.get).toHaveBeenCalledWith("/backoffice/products/prod-1");
  });

  it("uses the provided id in the URL", () => {
    mockedHttp.get.mockResolvedValueOnce({ data: mockProduct });

    productService.getProduct("xyz-999");

    expect(mockedHttp.get).toHaveBeenCalledWith("/backoffice/products/xyz-999");
  });

  it("returns the product", async () => {
    mockedHttp.get.mockResolvedValueOnce({ data: mockProduct });

    const result = await productService.getProduct("prod-1");

    expect(result).toEqual({ data: mockProduct });
  });

  it("propagates errors", async () => {
    mockedHttp.get.mockRejectedValueOnce(new Error("Not found"));

    await expect(productService.getProduct("bad-id")).rejects.toThrow("Not found");
  });
});

describe("productService.updateProduct", () => {
  it("calls PUT /backoffice/products/:id with the payload", () => {
    mockedHttp.put.mockResolvedValueOnce({ data: undefined });

    productService.updateProduct("prod-1", updatePayload);

    expect(mockedHttp.put).toHaveBeenCalledWith("/backoffice/products/prod-1", updatePayload);
  });

  it("uses the provided id in the URL", () => {
    mockedHttp.put.mockResolvedValueOnce({ data: undefined });

    productService.updateProduct("abc-456", updatePayload);

    expect(mockedHttp.put).toHaveBeenCalledWith("/backoffice/products/abc-456", updatePayload);
  });

  it("sends a non-null endDate correctly", () => {
    mockedHttp.put.mockResolvedValueOnce({ data: undefined });

    productService.updateProduct("prod-1", updatePayload);

    expect(mockedHttp.put).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({ endDate: "2025-01-01" })
    );
  });

  it("sends null endDate correctly", () => {
    mockedHttp.put.mockResolvedValueOnce({ data: undefined });

    productService.updateProduct("prod-1", { ...updatePayload, endDate: null });

    expect(mockedHttp.put).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({ endDate: null })
    );
  });

  it("propagates errors", async () => {
    mockedHttp.put.mockRejectedValueOnce(new Error("Conflict"));

    await expect(productService.updateProduct("prod-1", updatePayload)).rejects.toThrow("Conflict");
  });
});