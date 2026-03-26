import "@testing-library/jest-dom/vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { describe, test, expect, vi, afterEach } from "vitest";
import QuotationsSearchBar from "../QuotesSearchBar";

afterEach(() => {
  cleanup();
});

describe("QuotationsSearchBar", () => {
  const defaultProps = {
    searchQuery: "",
    onSearchChange: vi.fn(),
    statusFilter: "all",
    onStatusFilterChange: vi.fn(),
  };

  test("renders search input with correct placeholder", () => {
    render(<QuotationsSearchBar {...defaultProps} />);

    expect(
      screen.getByPlaceholderText("Search by reference, customer name, email, or product...")
    ).toBeInTheDocument();
  });

  test("renders status filter dropdown", () => {
    render(<QuotationsSearchBar {...defaultProps} />);

    expect(screen.getByText("All Quotations")).toBeInTheDocument();
  });

  test("calls onSearchChange when search input changes", () => {
    const onSearchChange = vi.fn();
    render(<QuotationsSearchBar {...defaultProps} onSearchChange={onSearchChange} />);

    fireEvent.change(
      screen.getByPlaceholderText("Search by reference, customer name, email, or product..."),
      { target: { value: "john" } }
    );

    expect(onSearchChange).toHaveBeenCalledWith("john");
  });

  test("displays the current search query value", () => {
    render(<QuotationsSearchBar {...defaultProps} searchQuery="PS-2024-001234" />);

    expect(screen.getByDisplayValue("PS-2024-001234")).toBeInTheDocument();
  });

  test("displays the current status filter value", () => {
    render(<QuotationsSearchBar {...defaultProps} statusFilter="accepted" />);

    expect(screen.getByText("Accepted")).toBeInTheDocument();
  });

  test("renders both status filter options", async () => {
    render(<QuotationsSearchBar {...defaultProps} />);

    fireEvent.mouseDown(screen.getByText("All Quotations"));

    expect(await screen.findByText("Accepted")).toBeInTheDocument();
    expect(await screen.findByText("Declined")).toBeInTheDocument();
    expect(await screen.findByText("Refer")).toBeInTheDocument();
  });

  test("calls onStatusFilterChange when status filter changes", async () => {
    const onStatusFilterChange = vi.fn();
    render(<QuotationsSearchBar {...defaultProps} onStatusFilterChange={onStatusFilterChange} />);

    fireEvent.mouseDown(screen.getByText("All Quotations"));
    fireEvent.click(await screen.findByText("Declined"));

    expect(onStatusFilterChange).toHaveBeenCalledWith("declined");
  });
});
