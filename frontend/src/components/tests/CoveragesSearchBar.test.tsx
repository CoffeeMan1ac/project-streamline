import "@testing-library/jest-dom/vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { describe, test, expect, vi, afterEach } from "vitest";
import CoveragesSearchBar from "../CoveragesSearchBar";

afterEach(() => {
  cleanup();
});

describe("CoveragesSearchBar", () => {
  const defaultProps = {
    searchQuery: "",
    onSearchChange: vi.fn(),
    categoryFilter: "all",
    onCategoryFilterChange: vi.fn(),
    totalCoverages: 8,
    showingCoverages: 5,
    onCreateCoverage: vi.fn(),
  };

  test("renders search input with correct placeholder", () => {
    render(<CoveragesSearchBar {...defaultProps} />);
    expect(screen.getByPlaceholderText("Search coverages...")).toBeInTheDocument();
  });

  test("renders category filter dropdown", () => {
    render(<CoveragesSearchBar {...defaultProps} />);
    expect(screen.getByText("All Categories")).toBeInTheDocument();
  });

  test("renders create coverage button", () => {
    render(<CoveragesSearchBar {...defaultProps} />);
    expect(screen.getByText("Create Coverage")).toBeInTheDocument();
  });

  test("calls onCreateCoverage when button is clicked", () => {
    const onCreateCoverage = vi.fn();
    render(<CoveragesSearchBar {...defaultProps} onCreateCoverage={onCreateCoverage} />);

    fireEvent.click(screen.getByText("Create Coverage"));
    expect(onCreateCoverage).toHaveBeenCalled();
  });

  test("calls onSearchChange when search input changes", () => {
    const onSearchChange = vi.fn();
    render(<CoveragesSearchBar {...defaultProps} onSearchChange={onSearchChange} />);

    fireEvent.change(screen.getByPlaceholderText("Search coverages..."), {
      target: { value: "damage" },
    });

    expect(onSearchChange).toHaveBeenCalledWith("damage");
  });

  test("displays the current search query value", () => {
    render(<CoveragesSearchBar {...defaultProps} searchQuery="battery" />);
    expect(screen.getByDisplayValue("battery")).toBeInTheDocument();
  });

  test("displays the current category filter value", () => {
    render(<CoveragesSearchBar {...defaultProps} categoryFilter="Damage" />);
    expect(screen.getByText("Damage")).toBeInTheDocument();
  });

  test("renders all category filter options", async () => {
    render(<CoveragesSearchBar {...defaultProps} />);

    fireEvent.mouseDown(screen.getByText("All Categories"));

    expect(await screen.findByText("Damage")).toBeInTheDocument();
    expect(await screen.findByText("Warranty")).toBeInTheDocument();
    expect(await screen.findByText("Theft")).toBeInTheDocument();
    expect(await screen.findByText("Other")).toBeInTheDocument();
  });

  test("calls onCategoryFilterChange when category filter changes", async () => {
    const onCategoryFilterChange = vi.fn();
    render(
      <CoveragesSearchBar {...defaultProps} onCategoryFilterChange={onCategoryFilterChange} />
    );

    fireEvent.mouseDown(screen.getByText("All Categories"));
    fireEvent.click(await screen.findByText("Warranty"));

    expect(onCategoryFilterChange).toHaveBeenCalledWith("Warranty");
  });

  test("renders search icon", () => {
    render(<CoveragesSearchBar {...defaultProps} />);
    expect(screen.getByTestId("SearchIcon")).toBeInTheDocument();
  });

  test("displays total and showing coverages counts", () => {
    render(<CoveragesSearchBar {...defaultProps} totalCoverages={8} showingCoverages={5} />);
    expect(screen.getByText(/Total Coverages:/)).toBeInTheDocument();
    expect(screen.getByText("8")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
  });
});
