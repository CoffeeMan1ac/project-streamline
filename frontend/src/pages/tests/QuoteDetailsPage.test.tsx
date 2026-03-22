import "@testing-library/jest-dom/vitest";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi, afterEach } from "vitest";
import QuoteDetailsPage from "../QuoteDetailsPage";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock("../../components/QuotationDetails", () => ({
  default: () => <div>QuotationDetailsComponent</div>,
}));

vi.mock("../../components/QuotePersonalDetails", () => ({
  default: () => <div>QuotePersonalDetailsComponent</div>,
}));

vi.mock("../../components/QuotationsProductDetails", () => ({
  default: () => <div>QuotationsProductDetailsComponent</div>,
}));

vi.mock("../../components/QuotationsPricingBreakdown", () => ({
  default: () => <div>QuotationsPricingBreakdownComponent</div>,
}));

afterEach(() => {
  cleanup();
  mockNavigate.mockClear();
});

describe("QuoteDetailsPage", () => {
  test("renders back button", () => {
    render(<QuoteDetailsPage />);

    expect(screen.getByRole("button", { name: /back to quotations/i })).toBeInTheDocument();
  });

  test("navigates when back button clicked", () => {
    render(<QuoteDetailsPage />);

    fireEvent.click(screen.getByRole("button", { name: /back to quotations/i }));

    expect(mockNavigate).toHaveBeenCalledWith("/quotes");
  });

  test("renders quotation details component", () => {
    render(<QuoteDetailsPage />);

    expect(screen.getByText("QuotationDetailsComponent")).toBeInTheDocument();
  });

  test("renders personal details component", () => {
    render(<QuoteDetailsPage />);

    expect(screen.getByText("QuotePersonalDetailsComponent")).toBeInTheDocument();
  });

  test("renders product details component", () => {
    render(<QuoteDetailsPage />);

    expect(screen.getByText("QuotationsProductDetailsComponent")).toBeInTheDocument();
  });

  test("renders pricing breakdown component", () => {
    render(<QuoteDetailsPage />);

    expect(screen.getByText("QuotationsPricingBreakdownComponent")).toBeInTheDocument();
  });
});
