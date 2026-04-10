import "@testing-library/jest-dom/vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import { Table, TableBody } from "@mui/material";
import QuotesRow from "../../components/QuotesRow";

const defaultProps = {
  reference: "PS-2024-001234",
  customerName: "John Smith",
  customerEmail: "john.smith@email.com",
  product: "Premium Shield",
  status: "ACCEPTED" as const,
  premium: "€12.50",
  date: "2024-03-15 14:30",
  onViewDetails: vi.fn(),
};

const renderRow = (overrides = {}) =>
  render(
    <Table>
      <TableBody>
        <QuotesRow {...defaultProps} {...overrides} />
      </TableBody>
    </Table>
  );

describe("QuotesRow", () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  test("renders reference", () => {
    renderRow();
    expect(screen.getByText("PS-2024-001234")).toBeInTheDocument();
  });

  test("renders customer name", () => {
    renderRow();
    expect(screen.getByText("John Smith")).toBeInTheDocument();
  });

  test("renders customer email", () => {
    renderRow();
    expect(screen.getByText("john.smith@email.com")).toBeInTheDocument();
  });

  test("renders product", () => {
    renderRow();
    expect(screen.getByText("Premium Shield")).toBeInTheDocument();
  });

  test("renders premium", () => {
    renderRow();
    expect(screen.getByText("€12.50")).toBeInTheDocument();
  });

  test("renders dash when premium is null", () => {
    renderRow({ premium: null });
    expect(screen.getByText("—")).toBeInTheDocument();
  });

  test("renders date", () => {
    renderRow();
    expect(screen.getByText("2024-03-15 14:30")).toBeInTheDocument();
  });

  test("renders accepted status chip", () => {
    renderRow();
    expect(screen.getByTestId("status-chip-ACCEPTED")).toBeInTheDocument();
  });

  test("renders declined status chip", () => {
    renderRow({ status: "DECLINED" as const });
    expect(screen.getByTestId("status-chip-DECLINED")).toBeInTheDocument();
  });

  test("renders refer status chip", () => {
    renderRow({ status: "REFER" as const });
    expect(screen.getByTestId("status-chip-REFER")).toBeInTheDocument();
  });

  test("renders check circle icon for accepted", () => {
    renderRow();
    expect(screen.getByTestId("CheckCircleOutlineIcon")).toBeInTheDocument();
  });

  test("renders cancel icon for declined", () => {
    renderRow({ status: "DECLINED" as const });
    expect(screen.getByTestId("CancelOutlinedIcon")).toBeInTheDocument();
  });

  test("renders view details button", () => {
    renderRow();
    expect(screen.getByTestId("view-details-button")).toBeInTheDocument();
  });

  test("calls onViewDetails when view details button is clicked", () => {
    const onViewDetails = vi.fn();
    renderRow({ onViewDetails });
    fireEvent.click(screen.getByTestId("view-details-button"));
    expect(onViewDetails).toHaveBeenCalledTimes(1);
  });
});
