import "@testing-library/jest-dom/vitest";
import { render, screen, cleanup, fireEvent, waitFor } from "@testing-library/react";
import { describe, test, expect, vi, afterEach } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import QuoteDetailsPage from "../QuoteDetailsPage";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock("../../api/http", () => ({
  default: {
    get: vi.fn().mockResolvedValue({
      data: {
        id: "a0fc1934",
        reference: "967LXC",
        status: "ACCEPTED",
        reason: "All rules passed",
        rulesApplied: ["Apple Tax"],
        decisionTrace: [],
        customerInput: {
          firstName: "Josh",
          lastName: "Smith",
          emailAddress: "josh@gmail.com",
          phoneNumber: "123456",
          dateOfBirth: "01/01/1990",
          address1: "123 Main St",
          address2: "",
          city: "Dublin",
          postalCode: "D01",
          country: "ireland",
        },
        premium: 13.19,
        processingTimeMs: 18,
        createdAt: "2026-03-26T00:03:43.329944",
        productName: "Premium Shield",
      },
    }),
  },
}));

vi.mock("../../components/QuotationDetails", () => ({
  default: () => <div>QuotationDetailsComponent</div>,
}));

vi.mock("../../components/QuotePersonalDetails", () => ({
  default: () => <div>QuotePersonalDetailsComponent</div>,
}));

vi.mock("../../components/QuotationsProductDetails", () => ({
  default: () => <div>QuotationsProductDetailsComponent</div>,
}));

vi.mock("../../components/QuotationsPricingBreakdown", () => ({
  default: () => <div>QuotationsPricingBreakdownComponent</div>,
}));

const renderPage = () =>
  render(
    <MemoryRouter initialEntries={["/quotations/967LXC"]}>
      <Routes>
        <Route path="/quotations/:id" element={<QuoteDetailsPage />} />
      </Routes>
    </MemoryRouter>
  );

afterEach(() => {
  cleanup();
  mockNavigate.mockClear();
});

describe("QuoteDetailsPage", () => {
  test("renders back button", async () => {
    renderPage();
    await waitFor(() => {
      expect(screen.getByRole("button", { name: /back to quotations/i })).toBeInTheDocument();
    });
  });

  test("navigates when back button clicked", async () => {
    renderPage();
    await waitFor(() => {
      expect(screen.getByRole("button", { name: /back to quotations/i })).toBeInTheDocument();
    });
    fireEvent.click(screen.getByRole("button", { name: /back to quotations/i }));
    expect(mockNavigate).toHaveBeenCalledWith("/quotations");
  });

  test("renders quotation details component", async () => {
    renderPage();
    await waitFor(() => {
      expect(screen.getByText("QuotationDetailsComponent")).toBeInTheDocument();
    });
  });

  test("renders personal details component", async () => {
    renderPage();
    await waitFor(() => {
      expect(screen.getByText("QuotePersonalDetailsComponent")).toBeInTheDocument();
    });
  });

  test("renders product details component", async () => {
    renderPage();
    await waitFor(() => {
      expect(screen.getByText("QuotationsProductDetailsComponent")).toBeInTheDocument();
    });
  });

  test("renders pricing breakdown component", async () => {
    renderPage();
    await waitFor(() => {
      expect(screen.getByText("QuotationsPricingBreakdownComponent")).toBeInTheDocument();
    });
  });
});
