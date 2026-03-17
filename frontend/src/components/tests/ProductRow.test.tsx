import "@testing-library/jest-dom/vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import { Table, TableBody } from "@mui/material";
import ProductRow from "../ProductRow";

describe("ProductRow", () => {
  beforeEach(() => {
    cleanup();
  });

  const renderRow = (overrides = {}) => {
    const props = {
      productName: "Standard Shield",
      modifiedBy: "Michael Brown",
      status: "active",
      active: true,
      price: "€9.99/month",
      coverageSummary: "Accidental Damage, Theft",
      tags: [],
      onToggleActive: vi.fn(),
      onEdit: vi.fn(),
      ...overrides,
    };

    return render(
      <Table>
        <TableBody>
          <ProductRow {...props} />
        </TableBody>
      </Table>
    );
  };

  test("renders product name", () => {
    renderRow();
    expect(screen.getByText("Standard Shield")).toBeInTheDocument();
  });

  test("renders modified by text", () => {
    renderRow();
    expect(screen.getByText("Modified by Michael Brown")).toBeInTheDocument();
  });

  test("renders status chip", () => {
    renderRow();
    expect(screen.getAllByText("active")[0]).toBeInTheDocument();
  });

  test("renders price", () => {
    renderRow();
    expect(screen.getAllByText("€9.99/month")[0]).toBeInTheDocument();
  });

  test("renders coverage summary", () => {
    renderRow();
    expect(screen.getAllByText("Accidental Damage, Theft")[0]).toBeInTheDocument();
  });

  test("calls onToggleActive when power button is clicked", () => {
    const onToggleActive = vi.fn();
    renderRow({ onToggleActive });
    fireEvent.click(screen.getByTestId("toggle-button"));
    expect(onToggleActive).toHaveBeenCalledTimes(1);
  });

  test("calls onEdit when edit button is clicked", () => {
    const onEdit = vi.fn();
    renderRow({ onEdit });
    fireEvent.click(screen.getByTestId("edit-button"));
    expect(onEdit).toHaveBeenCalledTimes(1);
  });

  test("renders inactive chip without success styling", () => {
    renderRow({ status: "inactive", active: false });
    expect(screen.getByText("inactive")).toBeInTheDocument();
  });

  test("renders green tag when tags includes Green", () => {
    renderRow({ tags: ["Green"] });
    expect(screen.getByText("Green")).toBeInTheDocument();
  });

  test("renders retired tag when tags includes Retired", () => {
    renderRow({ tags: ["Retired"] });
    expect(screen.getByText("Retired")).toBeInTheDocument();
  });

  test("renders no tags when tags is empty", () => {
    renderRow({ tags: [] });
    expect(screen.queryByText("Green")).not.toBeInTheDocument();
    expect(screen.queryByText("Retired")).not.toBeInTheDocument();
  });

  test("renders multiple tags", () => {
    renderRow({ tags: ["Green", "Retired"] });
    expect(screen.getByText("Green")).toBeInTheDocument();
    expect(screen.getByText("Retired")).toBeInTheDocument();
  });

  test("renders nothing for unknown tags", () => {
    renderRow({ tags: ["UnknownTag"] });
    expect(screen.queryByText("UnknownTag")).not.toBeInTheDocument();
  });
});
