import "@testing-library/jest-dom/vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import QuotesTable from "../QuotesTable";

const mockQuotations = [
  {
    reference: "PS-2024-001234",
    customerName: "John Smith",
    customerEmail: "john.smith@email.com",
    product: "Premium Shield",
    status: "ACCEPTED" as const,
    premium: "€12.50",
    createdAt: "2024-03-15T14:30:00",
    reason: null,
  },
  {
    reference: "PS-2024-001235",
    customerName: "Sarah O'Connor",
    customerEmail: "sarah.oconnor@email.com",
    product: "Standard Shield",
    status: "DECLINED" as const,
    premium: null,
    createdAt: "2024-03-15T13:15:00",
    reason: "Not eligible",
  },
];

const defaultProps = {
  quotations: mockQuotations,
  onViewDetails: vi.fn(),
};

describe("QuotesTable", () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  test("renders table headers", () => {
    render(<QuotesTable {...defaultProps} />);
    expect(screen.getByText("REFERENCE")).toBeInTheDocument();
    expect(screen.getByText("CUSTOMER")).toBeInTheDocument();
    expect(screen.getByText("PRODUCT")).toBeInTheDocument();
    expect(screen.getByText("STATUS")).toBeInTheDocument();
    expect(screen.getByText("PREMIUM")).toBeInTheDocument();
    expect(screen.getByText("DATE")).toBeInTheDocument();
    expect(screen.getByText("ACTIONS")).toBeInTheDocument();
  });

  test("renders all quotation rows", () => {
    render(<QuotesTable {...defaultProps} />);
    expect(screen.getByText("PS-2024-001234")).toBeInTheDocument();
    expect(screen.getByText("PS-2024-001235")).toBeInTheDocument();
  });

  test("renders showing count", () => {
    render(<QuotesTable {...defaultProps} />);
    expect(screen.getByText("Showing 2 of 2 quotations")).toBeInTheDocument();
  });

  test("renders showing count of zero when no quotations", () => {
    render(<QuotesTable {...defaultProps} quotations={[]} />);
    expect(screen.getByText("Showing 0 of 0 quotations")).toBeInTheDocument();
  });

  test("renders empty table when no quotations", () => {
    render(<QuotesTable {...defaultProps} quotations={[]} />);
    expect(screen.queryByText("PS-2024-001234")).not.toBeInTheDocument();
  });

  test("renders customer emails", () => {
    render(<QuotesTable {...defaultProps} />);
    expect(screen.getByText("john.smith@email.com")).toBeInTheDocument();
    expect(screen.getByText("sarah.oconnor@email.com")).toBeInTheDocument();
  });

  test("calls onViewDetails with correct reference when view details is clicked", () => {
    const onViewDetails = vi.fn();
    render(<QuotesTable {...defaultProps} onViewDetails={onViewDetails} />);
    const buttons = screen.getAllByTestId("view-details-button");
    fireEvent.click(buttons[0]);
    expect(onViewDetails).toHaveBeenCalledWith("PS-2024-001234");
  });

  test("calls onViewDetails with correct reference for second row", () => {
    const onViewDetails = vi.fn();
    render(<QuotesTable {...defaultProps} onViewDetails={onViewDetails} />);
    const buttons = screen.getAllByTestId("view-details-button");
    fireEvent.click(buttons[1]);
    expect(onViewDetails).toHaveBeenCalledWith("PS-2024-001235");
  });

  test("renders correct number of view details buttons", () => {
    render(<QuotesTable {...defaultProps} />);
    expect(screen.getAllByTestId("view-details-button")).toHaveLength(2);
  });
});
