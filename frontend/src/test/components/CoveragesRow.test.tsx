import "@testing-library/jest-dom/vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import { Table, TableBody } from "@mui/material";
import CoverageRow from "../../components/CoveragesRow";

const defaultProps = {
  code: "ACC_DMG",
  label: "Accidental Damage",
  categoryLabel: "Damage",
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

  test("renders coverage label", () => {
    renderRow();
    expect(screen.getByText("Accidental Damage")).toBeInTheDocument();
  });

  test("renders coverage code", () => {
    renderRow();
    expect(screen.getByText("ACC_DMG")).toBeInTheDocument();
  });

  test("renders category chip", () => {
    renderRow();
    expect(screen.getByText("Damage")).toBeInTheDocument();
  });

  test("renders Warranty category chip", () => {
    renderRow({ categoryLabel: "Warranty" });
    expect(screen.getByText("Warranty")).toBeInTheDocument();
  });

  test("renders Theft category chip", () => {
    renderRow({ categoryLabel: "Theft" });
    expect(screen.getByText("Theft")).toBeInTheDocument();
  });

  test("renders Other category chip", () => {
    renderRow({ categoryLabel: "Other" });
    expect(screen.getByText("Other")).toBeInTheDocument();
  });

  test("renders unknown category with default styling", () => {
    renderRow({ categoryLabel: "Unknown" });
    expect(screen.getByText("Unknown")).toBeInTheDocument();
  });

  test("renders edit button", () => {
    renderRow();
    expect(screen.getByTestId("edit-button")).toBeInTheDocument();
  });

  test("calls onEdit when edit button is clicked", () => {
    const onEdit = vi.fn();
    renderRow({ onEdit });
    fireEvent.click(screen.getByTestId("edit-button"));
    expect(onEdit).toHaveBeenCalledTimes(1);
  });

  test("renders shield icon", () => {
    renderRow();
    expect(screen.getByTestId("ShieldOutlinedIcon")).toBeInTheDocument();
  });
});
