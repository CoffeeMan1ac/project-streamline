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

afterEach(() => {
  cleanup();
  mockNavigate.mockClear();
});

describe("QuoteDetailsPage", () => {
  test("renders the back button", () => {
    render(<QuoteDetailsPage />);

    expect(screen.getByRole("button", { name: /back to quotations/i })).toBeInTheDocument();
  });

  test("navigates to /quotes when back button is clicked", () => {
    render(<QuoteDetailsPage />);

    fireEvent.click(screen.getByRole("button", { name: /back to quotations/i }));

    expect(mockNavigate).toHaveBeenCalledWith("/quotes");
  });

  test("renders quotation details data", () => {
    render(<QuoteDetailsPage />);

    expect(screen.getByText("PS-2024-001234")).toBeInTheDocument();
    expect(screen.getByText("2024-03-15 14:30")).toBeInTheDocument();
    expect(screen.getByText("ACCEPTED")).toBeInTheDocument();
  });

  test("renders personal details data", () => {
    render(<QuoteDetailsPage />);

    expect(screen.getByText("John Smith")).toBeInTheDocument();
    expect(screen.getByText("john.smith@email.com")).toBeInTheDocument();
    expect(screen.getByText("+353 87 123 4567")).toBeInTheDocument();
    expect(screen.getByText("15 May 1992")).toBeInTheDocument();
    expect(screen.getByText("123 Main Street, Dublin 2, Ireland")).toBeInTheDocument();
  });

  test("renders product details data", () => {
    render(<QuoteDetailsPage />);

    expect(screen.getAllByText("Premium Shield").length).toBeGreaterThan(0);
  });

  test("renders pricing breakdown data", () => {
    render(<QuoteDetailsPage />);

    expect(screen.getAllByText("€10.00").length).toBeGreaterThan(0);
    expect(screen.getAllByText("€12.50").length).toBeGreaterThan(0);
  });

  test("renders all rules", () => {
    render(<QuoteDetailsPage />);

    expect(screen.getByText("Age Limit Check")).toBeInTheDocument();
    expect(screen.getByText("Customer age 32 within acceptable range")).toBeInTheDocument();
    expect(screen.getByText("€0.00")).toBeInTheDocument();

    expect(screen.getAllByText("Device Age Validation").length).toBeGreaterThan(0);
    expect(screen.getByText("Device age 18 months - premium loading applied")).toBeInTheDocument();
    expect(screen.getAllByText("+€1.50").length).toBeGreaterThan(0);

    expect(screen.getAllByText("Loyalty Discount").length).toBeGreaterThan(0);
    expect(screen.getByText("Returning customer discount applied")).toBeInTheDocument();
    expect(screen.getAllByText("-€1.00").length).toBeGreaterThan(0);
  });
});
