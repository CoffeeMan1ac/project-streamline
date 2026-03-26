import "@testing-library/jest-dom/vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import CoveragesTable from "../CoveragesTable";

const testCoverages = [
  {
    id: "1",
    coverageName: "Test Coverage 1",
    description: "Test description 1",
    category: "Damage",
    usedInProducts: 5,
  },
  {
    id: "2",
    coverageName: "Test Coverage 2",
    description: "Test description 2",
    category: "Warranty",
    usedInProducts: 0,
  },
  {
    id: "3",
    coverageName: "Test Coverage 3",
    description: "Test description 3",
    category: "Theft",
    usedInProducts: 1,
  },
];

describe("CoveragesTable", () => {
  beforeEach(() => {
    cleanup();
  });

  const renderTable = (overrides = {}) => {
    const props = {
      coverages: testCoverages,
      onEdit: vi.fn(),
      onDelete: vi.fn(),
      ...overrides,
    };

    return render(
      <MemoryRouter>
        <CoveragesTable {...props} />
      </MemoryRouter>
    );
  };

  test("renders table headings", () => {
    renderTable();
    expect(screen.getByText("COVERAGE NAME")).toBeInTheDocument();
    expect(screen.getByText("CATEGORY")).toBeInTheDocument();
    expect(screen.getByText("USED IN PRODUCTS")).toBeInTheDocument();
    expect(screen.getByText("ACTIONS")).toBeInTheDocument();
  });

  test("renders all coverage rows", () => {
    renderTable();
    expect(screen.getByText("Test Coverage 1")).toBeInTheDocument();
    expect(screen.getByText("Test Coverage 2")).toBeInTheDocument();
    expect(screen.getByText("Test Coverage 3")).toBeInTheDocument();
  });

  test("renders coverage descriptions", () => {
    renderTable();
    expect(screen.getByText("Test description 1")).toBeInTheDocument();
    expect(screen.getByText("Test description 2")).toBeInTheDocument();
    expect(screen.getByText("Test description 3")).toBeInTheDocument();
  });

  test("renders category chips", () => {
    renderTable();
    expect(screen.getByText("Damage")).toBeInTheDocument();
    expect(screen.getByText("Warranty")).toBeInTheDocument();
    expect(screen.getByText("Theft")).toBeInTheDocument();
  });

  test("renders used in products counts with correct pluralization", () => {
    renderTable();
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("0")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  test("calls onEdit with correct id when edit is clicked", () => {
    const onEdit = vi.fn();
    renderTable({ onEdit });
    const editButtons = screen.getAllByTestId("edit-button");
    fireEvent.click(editButtons[0]);
    expect(onEdit).toHaveBeenCalledWith("1");
  });

  test("calls onDelete with correct id when delete is clicked", () => {
    const onDelete = vi.fn();
    renderTable({ onDelete });
    const deleteButtons = screen.getAllByTestId("delete-button");
    fireEvent.click(deleteButtons[0]);
    expect(onDelete).toHaveBeenCalledWith("1");
  });
});
