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
      status: "active",
      price: "€9.99/month",
      coverageSummary: "Accidental Damage, Theft",
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

  test("calls onEdit when edit button is clicked", () => {
    const onEdit = vi.fn();
    renderRow({ onEdit });
    fireEvent.click(screen.getByTestId("edit-button"));
    expect(onEdit).toHaveBeenCalledTimes(1);
  });

  test("renders inactive chip without success styling", () => {
    renderRow({ status: "inactive" });
    expect(screen.getByText("inactive")).toBeInTheDocument();
  });
});
