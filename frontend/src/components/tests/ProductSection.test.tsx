import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import ProductSection from "../ProductSection";

vi.mock("axios");

const mockProducts = [
  {
    id: "uuid-1",
    name: "Standard Shield",
    baseRate: 9.99,
    mostPopular: false,
    coverages: [{ label: "Covered 1" }],
    exclusions: [{ label: "Excluded 1" }],
  },
  {
    id: "uuid-2",
    name: "Premium Shield",
    baseRate: 14.99,
    mostPopular: true,
    coverages: [{ label: "Covered 2" }],
    exclusions: [{ label: "Excluded 2" }],
  },
  {
    id: "uuid-3",
    name: "Global Shield",
    baseRate: 19.99,
    mostPopular: false,
    coverages: [{ label: "Covered 3" }],
    exclusions: [{ label: "Excluded 3" }],
  },
];

describe("ProductSection", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    (axios.get as any).mockResolvedValue({ data: mockProducts });
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
