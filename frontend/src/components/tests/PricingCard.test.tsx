import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import PricingCard, { type PricingPlan } from "../PricingCard";

const plan: PricingPlan = {
  name: "Basic",
  price: "$9",
  popular: false,
  features: [
    { label: "Accidental Damage", included: true },
    { label: "Screen Replacement", included: false },
  ],
};

const popularPlan: PricingPlan = {
  ...plan,
  name: "Pro",
  price: "$19",
  popular: true,
};

describe("PricingCard", () => {
  test("renders plan name, price and month text", () => {
    render(<PricingCard plan={plan} />);
    expect(screen.getByText(/Basic/i)).toBeInTheDocument();
    expect(screen.getByText(/\$9/i)).toBeInTheDocument();
    expect(screen.getByText(/\/month/i)).toBeInTheDocument();
  });

  test("renders included and excluded features (excluded is struck-through)", () => {
    render(<PricingCard plan={plan} />);
    const included = screen.getByText(/Accidental Damage/i);
    const excluded = screen.getByText(/Screen Replacement/i);

    expect(included).toBeInTheDocument();
    expect(excluded).toBeInTheDocument();

    expect(included).not.toHaveStyle("text-decoration: line-through");
    expect(excluded).toHaveStyle("text-decoration: line-through");
  });

  test("renders the action button", () => {
    render(<PricingCard plan={plan} />);
    expect(screen.getByRole("button", { name: /Get a Quote/i })).toBeInTheDocument();
  });

  test("shows 'Most Popular' chip when plan.popular is true", () => {
    render(<PricingCard plan={popularPlan} />);
    expect(screen.getByText(/Most Popular/i)).toBeInTheDocument();
  });
});