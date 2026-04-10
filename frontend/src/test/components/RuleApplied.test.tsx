import "@testing-library/jest-dom/vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { describe, test, expect, afterEach } from "vitest";
import RuleApplied from "../../components/RuleApplied";

afterEach(() => {
  cleanup();
});

describe("RuleApplied", () => {
  const baseProps = {
    ruleName: "Device Age Validation",
    ruleDescription: "Device age 18 months - premium loading applied",
    ruleAmount: "+€1.50",
    type: "negative" as const,
  };

  test("renders rule name, description and amount", () => {
    render(<RuleApplied {...baseProps} />);

    expect(screen.getByText("Device Age Validation")).toBeInTheDocument();
    expect(screen.getByText("Device age 18 months - premium loading applied")).toBeInTheDocument();
    expect(screen.getByText("+€1.50")).toBeInTheDocument();
  });

  test("renders negative rule icon", () => {
    render(<RuleApplied {...baseProps} />);

    expect(screen.getByTestId("TrendingUpOutlinedIcon")).toBeInTheDocument();
  });

  test("renders positive rule icon", () => {
    render(
      <RuleApplied
        ruleName="Loyalty Discount"
        ruleDescription="Returning customer discount applied"
        ruleAmount="-€1.00"
        type="positive"
      />
    );

    expect(screen.getByTestId("TrendingDownOutlinedIcon")).toBeInTheDocument();
  });

  test("renders neutral rule icon", () => {
    render(
      <RuleApplied
        ruleName="Age Limit Check"
        ruleDescription="Customer age 32 within acceptable range"
        ruleAmount="€0.00"
        type="neutral"
      />
    );

    expect(screen.getByTestId("HorizontalRuleOutlinedIcon")).toBeInTheDocument();
  });

  test("renders positive rule content correctly", () => {
    render(
      <RuleApplied
        ruleName="Loyalty Discount"
        ruleDescription="Returning customer discount applied"
        ruleAmount="-€1.00"
        type="positive"
      />
    );

    expect(screen.getByText("Loyalty Discount")).toBeInTheDocument();
    expect(screen.getByText("Returning customer discount applied")).toBeInTheDocument();
    expect(screen.getByText("-€1.00")).toBeInTheDocument();
  });

  test("renders neutral rule content correctly", () => {
    render(
      <RuleApplied
        ruleName="Age Limit Check"
        ruleDescription="Customer age 32 within acceptable range"
        ruleAmount="€0.00"
        type="neutral"
      />
    );

    expect(screen.getByText("Age Limit Check")).toBeInTheDocument();
    expect(screen.getByText("Customer age 32 within acceptable range")).toBeInTheDocument();
    expect(screen.getByText("€0.00")).toBeInTheDocument();
  });
});
