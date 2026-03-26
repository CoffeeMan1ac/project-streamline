import "@testing-library/jest-dom/vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { describe, test, expect, afterEach } from "vitest";
import QuotationsPricingBreakdown from "../QuotationsPricingBreakdown";

afterEach(() => {
  cleanup();
});

describe("QuotationsPricingBreakdown", () => {
  const mockProps = {
    basePrice: "€10.00",
    premiumName: "Premium Shield",
    finalPremium: "€12.50",
    rules: [
      {
        ruleName: "Age Limit Check",
        ruleDescription: "Customer age 32 within acceptable range",
        ruleAmount: "€0.00",
        isOverride: false,
        type: "neutral" as const,
      },
      {
        ruleName: "Device Age Validation",
        ruleDescription: "Device age 18 months - premium loading applied",
        ruleAmount: "+€1.50",
        isOverride: false,
        type: "negative" as const,
      },
      {
        ruleName: "Loyalty Discount",
        ruleDescription: "Returning customer discount applied",
        ruleAmount: "-€1.00",
        isOverride: false,
        type: "positive" as const,
      },
    ],
  };

  test("renders the Pricing Breakdown heading", () => {
    render(<QuotationsPricingBreakdown {...mockProps} />);
    expect(screen.getByText("Pricing Breakdown")).toBeInTheDocument();
  });

  test("renders the base price section", () => {
    render(<QuotationsPricingBreakdown {...mockProps} />);

    expect(screen.getAllByText("Base Price").length).toBeGreaterThan(0);
    expect(screen.getByText("Starting premium for Premium Shield")).toBeInTheDocument();
  });

  test("renders the rules applied heading", () => {
    render(<QuotationsPricingBreakdown {...mockProps} />);
    expect(screen.getByText("RULES APPLIED")).toBeInTheDocument();
  });

  test("renders all rule cards", () => {
    render(<QuotationsPricingBreakdown {...mockProps} />);

    expect(screen.getByText("Age Limit Check")).toBeInTheDocument();
    expect(screen.getAllByText("Device Age Validation").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Loyalty Discount").length).toBeGreaterThan(0);
  });

  test("renders the Final Premium section", () => {
    render(<QuotationsPricingBreakdown {...mockProps} />);

    expect(screen.getByText("Final Premium")).toBeInTheDocument();
    expect(screen.getByText("Monthly payment")).toBeInTheDocument();
  });

  test("renders the summary box values", () => {
    render(<QuotationsPricingBreakdown {...mockProps} />);

    expect(screen.getAllByText("€10.00").length).toBeGreaterThan(0);
    expect(screen.getAllByText("€12.50").length).toBeGreaterThan(0);
    expect(screen.getAllByText("+€1.50").length).toBeGreaterThan(0);
    expect(screen.getAllByText("-€1.00").length).toBeGreaterThan(0);
  });

  test("renders neutral rule amount in the rules list", () => {
    render(<QuotationsPricingBreakdown {...mockProps} />);
    expect(screen.getByText("€0.00")).toBeInTheDocument();
  });

  test("renders total in the summary section", () => {
    render(<QuotationsPricingBreakdown {...mockProps} />);

    expect(screen.getByText("Total")).toBeInTheDocument();
    expect(screen.getAllByText("€12.50").length).toBeGreaterThan(0);
  });
});
