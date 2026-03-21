import "@testing-library/jest-dom/vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { describe, test, expect, afterEach } from "vitest";
import QuotationsProductDetails from "../QuotationsProductDetails";

describe("QuotationsProductDetails", () => {
  const mockProps = {
    productName: "Premium Shield",
  };

  afterEach(() => {
    cleanup();
  });

  test("renders the Product Details heading", () => {
    render(<QuotationsProductDetails {...mockProps} />);
    expect(screen.getByText("Product Details")).toBeInTheDocument();
  });

  test("renders the product label", () => {
    render(<QuotationsProductDetails {...mockProps} />);
    expect(screen.getByText("Product")).toBeInTheDocument();
  });

  test("renders the product name value", () => {
    render(<QuotationsProductDetails {...mockProps} />);
    expect(screen.getByText("Premium Shield")).toBeInTheDocument();
  });

  test("renders the passed productName prop correctly", () => {
    render(<QuotationsProductDetails productName="Screen Protection Plan" />);
    expect(screen.getByText("Screen Protection Plan")).toBeInTheDocument();
  });
});
