import "@testing-library/jest-dom/vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import { Table, TableBody } from "@mui/material";
import RuleRow from "../RuleRow";

vi.mock("@dnd-kit/sortable", () => ({
  useSortable: () => ({
    attributes: {},
    listeners: {},
    setNodeRef: vi.fn(),
    transform: null,
    transition: null,
  }),
}));

vi.mock("@dnd-kit/utilities", () => ({
  CSS: { Transform: { toString: () => "" } },
}));

const defaultProps = {
  id: "rule-1",
  order: 1,
  ruleName: "Test Rule",
  active: true,
  numberOfConditions: 2,
  decision: "ACCEPT",
  premium: "€10.00",
  onToggleActive: vi.fn(),
  onEdit: vi.fn(),
};

const renderRow = (props = {}) =>
  render(
    <Table>
      <TableBody>
        <RuleRow {...defaultProps} {...props} />
      </TableBody>
    </Table>
  );

describe("RuleRow", () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  test("renders rule name", () => {
    renderRow();
    expect(screen.getByText("Test Rule")).toBeInTheDocument();
  });

  test("renders order number", () => {
    renderRow();
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  test("renders active chip when rule is active", () => {
    renderRow();
    expect(screen.getByText("active")).toBeInTheDocument();
  });

  test("renders inactive chip when rule is inactive", () => {
    renderRow({ active: false });
    expect(screen.getByText("inactive")).toBeInTheDocument();
  });

  test("renders correct condition count for plural", () => {
    renderRow();
    expect(screen.getByText("2 conditions")).toBeInTheDocument();
  });

  test("renders correct condition count for singular", () => {
    renderRow({ numberOfConditions: 1 });
    expect(screen.getByText("1 condition")).toBeInTheDocument();
  });

  test("renders decision", () => {
    renderRow();
    expect(screen.getByText("ACCEPT")).toBeInTheDocument();
  });

  test("renders premium", () => {
    renderRow();
    expect(screen.getByText("€10.00")).toBeInTheDocument();
  });

  test("calls onToggleActive when power button is clicked", () => {
    const onToggleActive = vi.fn();
    renderRow({ onToggleActive });
    fireEvent.click(screen.getByTestId("PowerSettingsNewIcon").closest("button")!);
    expect(onToggleActive).toHaveBeenCalled();
  });

  test("calls onEdit when edit button is clicked", () => {
    const onEdit = vi.fn();
    renderRow({ onEdit });
    fireEvent.click(screen.getByTestId("EditIcon").closest("button")!);
    expect(onEdit).toHaveBeenCalled();
  });

  test("renders drag indicator icon", () => {
    renderRow();
    expect(screen.getByTestId("DragIndicatorIcon")).toBeInTheDocument();
  });

  test("renders delete button", () => {
    renderRow();
    expect(screen.getByTestId("DeleteIcon")).toBeInTheDocument();
  });
});
