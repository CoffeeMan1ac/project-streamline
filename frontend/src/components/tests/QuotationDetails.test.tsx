import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import QuotationDetails from "../QuotationDetails";

describe("QuotationDetails", () => {
  test("renders quotation details content", () => {
    render(
      <QuotationDetails
        quotationId="PS-2024-001234"
        timeStamp="2024-03-15 14:30"
        status="ACCEPTED"
      />
    );

    expect(screen.getByText("PS-2024-001234")).toBeInTheDocument();
    expect(screen.getByText("2024-03-15 14:30")).toBeInTheDocument();
    expect(screen.getByText("ACCEPTED")).toBeInTheDocument();
  });

  test("renders pending status", () => {
    render(
      <QuotationDetails
        quotationId="PS-2024-001235"
        timeStamp="2024-03-16 09:00"
        status="PENDING"
      />
    );

    expect(screen.getByText("PENDING")).toBeInTheDocument();
  });

  test("renders rejected status", () => {
    render(
      <QuotationDetails
        quotationId="PS-2024-001236"
        timeStamp="2024-03-17 11:45"
        status="REJECTED"
      />
    );

    expect(screen.getByText("REJECTED")).toBeInTheDocument();
  });
});
