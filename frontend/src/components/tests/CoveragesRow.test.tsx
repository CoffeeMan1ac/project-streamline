import "@testing-library/jest-dom/vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import { Table, TableBody } from "@mui/material";
import CoverageRow from "../CoveragesRow";

const defaultProps = {
  coverageName: "Accidental Damage",
  description: "Coverage for unintentional physical damage to the device",
  category: "Damage",
  usedInProducts: 5,
  onEdit: vi.fn(),
  onDelete: vi.fn(),
};

const renderRow = (overrides = {}) =>
  render(
    <Table>
      <TableBody>
        <CoverageRow {...defaultProps} {...overrides} />
      </TableBody>
    </Table>
  );

describe("CoverageRow", () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  test("renders coverage name", () => {
    renderRow();
    expect(screen.getByText("Accidental Damage")).toBeInTheDocument();
  });

  test("renders description", () => {
    renderRow();
    expect(
      screen.getByText("Coverage for unintentional physical damage to the device")
    ).toBeInTheDocument();
  });

  test("renders category chip", () => {
    renderRow();
    expect(screen.getByText("Damage")).toBeInTheDocument();
  });

  test("renders used in products count (plural)", () => {
    renderRow();
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("products")).toBeInTheDocument();
  });

  test("renders singular product text when count is 1", () => {
    renderRow({ usedInProducts: 1 });
    expect(screen.getByText("product")).toBeInTheDocument();
  });

  test("renders 0 products", () => {
    renderRow({ usedInProducts: 0 });
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  test("renders Warranty category chip", () => {
    renderRow({ category: "Warranty" });
    expect(screen.getByText("Warranty")).toBeInTheDocument();
  });

  test("renders Theft category chip", () => {
    renderRow({ category: "Theft" });
    expect(screen.getByText("Theft")).toBeInTheDocument();
  });

  test("renders Other category chip", () => {
    renderRow({ category: "Other" });
    expect(screen.getByText("Other")).toBeInTheDocument();
  });

  test("renders unknown category with default styling", () => {
    renderRow({ category: "Unknown" });
    expect(screen.getByText("Unknown")).toBeInTheDocument();
  });

  test("renders edit button", () => {
    renderRow();
    expect(screen.getByTestId("edit-button")).toBeInTheDocument();
  });

  test("renders delete button", () => {
    renderRow();
    expect(screen.getByTestId("delete-button")).toBeInTheDocument();
  });

  test("calls onEdit when edit button is clicked", () => {
    const onEdit = vi.fn();
    renderRow({ onEdit });
    fireEvent.click(screen.getByTestId("edit-button"));
    expect(onEdit).toHaveBeenCalledTimes(1);
  });

  test("calls onDelete when delete button is clicked", () => {
    const onDelete = vi.fn();
    renderRow({ onDelete });
    fireEvent.click(screen.getByTestId("delete-button"));
    expect(onDelete).toHaveBeenCalledTimes(1);
  });

  test("renders shield icon", () => {
    renderRow();
    expect(screen.getByTestId("ShieldOutlinedIcon")).toBeInTheDocument();
  });
});
