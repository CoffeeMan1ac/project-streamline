import "@testing-library/jest-dom/vitest";
import { render, screen, fireEvent, cleanup, waitFor } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import QuotesManagementPage from "../QuotesManagementPage";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock("../../components/QuotesSearchBar", () => ({
  default: ({
    searchQuery,
    onSearchChange,
    onStatusFilterChange,
  }: {
    searchQuery: string;
    onSearchChange: (value: string) => void;
    statusFilter: string;
    onStatusFilterChange: (value: string) => void;
  }) => (
    <div>
      <input
        placeholder="Search by reference, customer name, email, or product..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        data-testid="search-input"
      />
      <button onClick={() => onStatusFilterChange("accepted")}>Filter Accepted</button>
      <button onClick={() => onStatusFilterChange("all")}>Filter All</button>
    </div>
  ),
}));

vi.mock("../../components/QuotesTable", () => ({
  default: ({
    quotations,
    onViewDetails,
  }: {
    quotations: { id: string; reference: string }[];
    onViewDetails: (id: string) => void;
  }) => (
    <div>
      <span>Quotes Table</span>
      {quotations.map((q) => (
        <div key={q.id}>
          <span>{q.reference}</span>
          <button onClick={() => onViewDetails(q.id)}>View {q.id}</button>
        </div>
      ))}
    </div>
  ),
}));

vi.mock("../../api/http", () => ({
  default: {
    get: vi.fn().mockResolvedValue({ data: [] }),
  },
}));

const mockQuotations = [
  {
    id: "1",
    reference: "PS-2024-001234",
    customerName: "John Smith",
    customerEmail: "john.smith@email.com",
    product: "Premium Shield",
    status: "accepted",
    premium: "€12.50",
    date: "2024-03-15 14:30",
  },
  {
    id: "2",
    reference: "PS-2024-001235",
    customerName: "Sarah O'Connor",
    customerEmail: "sarah.oconnor@email.com",
    product: "Standard Shield",
    status: "rejected",
    premium: null,
    date: "2024-03-15 13:15",
  },
];

describe("QuotesManagementPage", () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
    mockNavigate.mockClear();
  });

  const renderPage = () =>
    render(
      <MemoryRouter>
        <QuotesManagementPage />
      </MemoryRouter>
    );

  test("renders page title", () => {
    renderPage();
    expect(screen.getByText("Quotations Management")).toBeInTheDocument();
  });

  test("renders page subtitle", () => {
    renderPage();
    expect(screen.getByText("Search and review quote applications")).toBeInTheDocument();
  });

  test("renders search bar", () => {
    renderPage();
    expect(screen.getByTestId("search-input")).toBeInTheDocument();
  });

  test("renders quotes table after fetch", async () => {
    renderPage();
    await waitFor(() => {
      expect(screen.getByText("Quotes Table")).toBeInTheDocument();
    });
  });

  test("fetches quotations on mount", async () => {
    const http = await import("../../api/http");
    renderPage();
    await waitFor(() => {
      expect(http.default.get).toHaveBeenCalledWith("/backoffice/quotations");
    });
  });

  test("shows error alert when fetching quotations fails", async () => {
    const http = await import("../../api/http");
    vi.mocked(http.default.get).mockRejectedValueOnce(new Error("Network error"));
    renderPage();
    await waitFor(() => {
      expect(screen.getByText("Failed to load quotations. Please try again.")).toBeInTheDocument();
    });
  });

  test("dismisses error alert when close is clicked", async () => {
    const http = await import("../../api/http");
    vi.mocked(http.default.get).mockRejectedValueOnce(new Error("Network error"));
    renderPage();
    await waitFor(() => {
      expect(screen.getByText("Failed to load quotations. Please try again.")).toBeInTheDocument();
    });
    screen.getByTitle("Close").click();
    await waitFor(() => {
      expect(
        screen.queryByText("Failed to load quotations. Please try again.")
      ).not.toBeInTheDocument();
    });
  });

  test("shows loading spinner on mount", () => {
    renderPage();
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  test("hides loading spinner after fetch completes", async () => {
    const http = await import("../../api/http");
    vi.mocked(http.default.get).mockResolvedValueOnce({ data: [] });
    renderPage();
    await waitFor(() => {
      expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
    });
  });

  test("renders quotations after fetch", async () => {
    const http = await import("../../api/http");
    vi.mocked(http.default.get).mockResolvedValueOnce({ data: mockQuotations });
    renderPage();
    await waitFor(() => {
      expect(screen.getByText("PS-2024-001234")).toBeInTheDocument();
      expect(screen.getByText("PS-2024-001235")).toBeInTheDocument();
    });
  });

  test("filters quotations by search query", async () => {
    const http = await import("../../api/http");
    vi.mocked(http.default.get).mockResolvedValueOnce({ data: mockQuotations });
    renderPage();
    await waitFor(() => {
      expect(screen.getByText("PS-2024-001234")).toBeInTheDocument();
    });
    fireEvent.change(screen.getByTestId("search-input"), {
      target: { value: "John" },
    });
    await waitFor(() => {
      expect(screen.getByText("PS-2024-001234")).toBeInTheDocument();
      expect(screen.queryByText("PS-2024-001235")).not.toBeInTheDocument();
    });
  });

  test("filters quotations by status", async () => {
    const http = await import("../../api/http");
    vi.mocked(http.default.get).mockResolvedValueOnce({ data: mockQuotations });
    renderPage();
    await waitFor(() => {
      expect(screen.getByText("PS-2024-001234")).toBeInTheDocument();
    });
    fireEvent.click(screen.getByRole("button", { name: /filter accepted/i }));
    await waitFor(() => {
      expect(screen.getByText("PS-2024-001234")).toBeInTheDocument();
      expect(screen.queryByText("PS-2024-001235")).not.toBeInTheDocument();
    });
  });

  test("calls onViewDetails with correct id", async () => {
    const http = await import("../../api/http");
    vi.mocked(http.default.get).mockResolvedValueOnce({ data: mockQuotations });
    renderPage();
    await waitFor(() => {
      expect(screen.getByRole("button", { name: /view 1/i })).toBeInTheDocument();
    });
    fireEvent.click(screen.getByRole("button", { name: /view 1/i }));
    expect(mockNavigate).toHaveBeenCalledWith("/quotations/1");
  });
});
