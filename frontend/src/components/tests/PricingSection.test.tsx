import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import PricingSection from "../PricingSection";

describe("PricingSection", () => {
  test("renders section heading and subtitle", () => {
    render(<PricingSection />);
    expect(screen.getByRole("heading", { name: /Choose Your Protection Plan/i })).toBeInTheDocument();
    expect(screen.getByText(/Select the coverage that best fits your lifestyle/i)).toBeInTheDocument();
  });

  test("renders three pricing cards", () => {
    render(<PricingSection />);
    const cards = screen.getAllByText(/Get a Quote/i);
    expect(cards.length).toBe(3);
  });

  test("renders at least one 'Most Popular' chip", () => {
    render(<PricingSection />);
    expect(screen.getAllByText(/Most Popular/i).length).toBeGreaterThanOrEqual(1);
  });
});