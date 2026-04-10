import "@testing-library/jest-dom/vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import CoveragesTable from "../../components/CoveragesTable";

const testCoverages = [
  {
    id: "1",
    code: "COV_1",
    label: "Test Coverage 1",
    categoryCode: "Damage",
    categoryLabel: "Damage",
  },
  {
    id: "2",
    code: "COV_2",
    label: "Test Coverage 2",
    categoryCode: "Warranty",
    categoryLabel: "Warranty",
  },
  {
    id: "3",
    code: "COV_3",
    label: "Test Coverage 3",
    categoryCode: "Theft",
    categoryLabel: "Theft",
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
    expect(screen.getByText("COVERAGE")).toBeInTheDocument();
    expect(screen.getByText("CATEGORY")).toBeInTheDocument();
    expect(screen.getByText("ACTIONS")).toBeInTheDocument();
  });

  test("renders all coverage rows", () => {
    renderTable();
    expect(screen.getByText("Test Coverage 1")).toBeInTheDocument();
    expect(screen.getByText("Test Coverage 2")).toBeInTheDocument();
    expect(screen.getByText("Test Coverage 3")).toBeInTheDocument();
  });

  test("renders category chips", () => {
    renderTable();
    expect(screen.getByText("Damage")).toBeInTheDocument();
    expect(screen.getByText("Warranty")).toBeInTheDocument();
    expect(screen.getByText("Theft")).toBeInTheDocument();
  });

  test("calls onEdit with correct id when edit is clicked", () => {
    const onEdit = vi.fn();
    renderTable({ onEdit });
    const editButtons = screen.getAllByTestId("edit-button");
    fireEvent.click(editButtons[0]);
    expect(onEdit).toHaveBeenCalledWith("1");
  });
});
