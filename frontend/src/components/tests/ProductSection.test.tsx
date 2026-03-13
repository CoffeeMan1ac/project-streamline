import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import ProductSection, { type ApiProduct } from "../ProductSection";

const mockHttp = {
  get: vi.fn(),
  post: vi.fn(),
  put: vi.fn(),
  patch: vi.fn(),
  delete: vi.fn(),
  interceptors: {
    response: {
      use: vi.fn(),
    },
  },
};

vi.mock("axios", () => ({
  default: {
    create: vi.fn(() => mockHttp),
    isCancel: vi.fn(() => false),
  },
}));

const mockProducts: ApiProduct[] = [
  {
    id: "uuid-1",
    name: "Standard Shield",
    baseRate: 9.99,
    tags: [],
    coverages: [],
    exclusions: [],
  },
  {
    id: "uuid-2",
    name: "Premium Shield",
    baseRate: 14.99,
    tags: [
      {
        label: "Most Popular",
        id: "",
        code: "POPULAR",
      },
    ],
    coverages: [],
    exclusions: [],
  },
  {
    id: "uuid-3",
    name: "Global Shield",
    baseRate: 19.99,
    tags: [],
    coverages: [],
    exclusions: [],
  },
];

describe("ProductSection", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockHttp.get.mockResolvedValue({ data: mockProducts });
  });

  test("renders section heading and subtitle", async () => {
    render(
      <MemoryRouter>
        <ProductSection />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("heading", { name: /Choose Your Protection Plan/i })
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Select the coverage that best fits your lifestyle/i)
    ).toBeInTheDocument();

    await screen.findAllByText(/Get a Quote/i);
  });

  test("renders three pricing cards after loading", async () => {
    render(
      <MemoryRouter>
        <ProductSection />
      </MemoryRouter>
    );

    const cards = await screen.findAllByText(/Get a Quote/i);
    expect(cards.length).toBe(3);
  });

  test("renders 'Most Popular' chip", async () => {
    render(
      <MemoryRouter>
        <ProductSection />
      </MemoryRouter>
    );

    const popularChip = await screen.findAllByText(/Most Popular/i);
    expect(popularChip.length).toBeGreaterThanOrEqual(1);
  });
});