import "@testing-library/jest-dom/vitest";
import { render, screen, fireEvent, cleanup, waitFor } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import CoveragesManagementPage from "../CoveragesManagementPage";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock("../../components/CoveragesSearchBar", () => ({
  default: ({
    searchQuery,
    onSearchChange,
    categoryFilter,
    onCategoryFilterChange,
    totalCoverages,
    showingCoverages,
    onCreateCoverage,
  }: {
    searchQuery: string;
    onSearchChange: (value: string) => void;
    categoryFilter: string;
    onCategoryFilterChange: (value: string) => void;
    totalCoverages: number;
    showingCoverages: number;
    onCreateCoverage: () => void;
  }) => (
    <div>
      <input
        placeholder="Search coverages..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        data-testid="search-input"
      />
      <select
        value={categoryFilter}
        onChange={(e) => onCategoryFilterChange(e.target.value)}
        data-testid="category-filter"
      >
        <option value="all">All Categories</option>
        <option value="Damage">Damage</option>
        <option value="Warranty">Warranty</option>
        <option value="Theft">Theft</option>
        <option value="Other">Other</option>
      </select>
      <button onClick={onCreateCoverage} data-testid="create-coverage-button">
        Create Coverage
      </button>
      <span>Total: {totalCoverages}</span>
      <span>Showing: {showingCoverages}</span>
    </div>
  ),
}));

vi.mock("../../components/CoveragesTable", () => ({
  default: ({
    coverages,
    onEdit,
    onDelete,
  }: {
    coverages: { id: string; coverageName: string; category: string }[];
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
  }) => (
    <div>
      <span>Coverages Table</span>
      {coverages.map((c) => (
        <div key={c.id} data-testid={`coverage-row-${c.id}`}>
          <span data-testid={`coverage-name-${c.id}`}>{c.coverageName}</span>
          <span data-testid={`coverage-category-${c.id}`}>{c.category}</span>
          <button onClick={() => onEdit(c.id)}>Edit {c.id}</button>
          <button onClick={() => onDelete(c.id)}>Delete {c.id}</button>
        </div>
      ))}
    </div>
  ),
}));

vi.mock("../../api/http", () => ({
  default: {
    get: vi.fn().mockResolvedValue({ data: [] }),
    delete: vi.fn().mockResolvedValue({}),
  },
}));

const mockCoverages = [
  {
    id: "1",
    coverageName: "Accidental Damage",
    description: "Coverage for unintentional physical damage to the device",
    category: "Damage",
    usedInProducts: 5,
  },
  {
    id: "2",
    coverageName: "Battery Replacement",
    description: "Coverage for battery degradation and replacement",
    category: "Warranty",
    usedInProducts: 0,
  },
  {
    id: "3",
    coverageName: "Theft",
    description: "Protection against theft or robbery of the device",
    category: "Theft",
    usedInProducts: 6,
  },
];

describe("CoveragesManagementPage", () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
    mockNavigate.mockClear();
  });

  const renderPage = () =>
    render(
      <MemoryRouter>
        <CoveragesManagementPage />
      </MemoryRouter>
    );

  test("renders page title", () => {
    renderPage();
    expect(screen.getByText("Coverages Management")).toBeInTheDocument();
  });

  test("renders page subtitle", () => {
    renderPage();
    expect(
      screen.getByText("Manage insurance coverage types and descriptions")
    ).toBeInTheDocument();
  });

  test("renders search bar", () => {
    renderPage();
    expect(screen.getByTestId("search-input")).toBeInTheDocument();
  });

  test("renders category filter", () => {
    renderPage();
    expect(screen.getByTestId("category-filter")).toBeInTheDocument();
  });

  test("renders create coverage button", () => {
    renderPage();
    expect(screen.getByTestId("create-coverage-button")).toBeInTheDocument();
  });

  test("fetches coverages on mount", async () => {
    const http = await import("../../api/http");
    renderPage();
    await waitFor(() => {
      expect(http.default.get).toHaveBeenCalledWith("/backoffice/coverages");
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

  test("renders coverages after fetch", async () => {
    const http = await import("../../api/http");
    vi.mocked(http.default.get).mockResolvedValueOnce({ data: mockCoverages });
    renderPage();
    await waitFor(() => {
      expect(screen.getByTestId("coverage-name-1")).toBeInTheDocument();
      expect(screen.getByTestId("coverage-name-2")).toBeInTheDocument();
      expect(screen.getByTestId("coverage-name-3")).toBeInTheDocument();
    });
    expect(screen.getByTestId("coverage-name-1")).toHaveTextContent("Accidental Damage");
    expect(screen.getByTestId("coverage-name-2")).toHaveTextContent("Battery Replacement");
    expect(screen.getByTestId("coverage-name-3")).toHaveTextContent("Theft");
  });

  test("filters coverages by search query", async () => {
    const http = await import("../../api/http");
    vi.mocked(http.default.get).mockResolvedValueOnce({ data: mockCoverages });
    renderPage();
    await waitFor(() => {
      expect(screen.getByTestId("coverage-name-1")).toBeInTheDocument();
    });
    fireEvent.change(screen.getByTestId("search-input"), {
      target: { value: "Accidental" },
    });
    await waitFor(() => {
      expect(screen.getByTestId("coverage-name-1")).toBeInTheDocument();
      expect(screen.queryByTestId("coverage-name-2")).not.toBeInTheDocument();
      expect(screen.queryByTestId("coverage-name-3")).not.toBeInTheDocument();
    });
  });

  test("filters coverages by category", async () => {
    const http = await import("../../api/http");
    vi.mocked(http.default.get).mockResolvedValueOnce({ data: mockCoverages });
    renderPage();
    await waitFor(() => {
      expect(screen.getByTestId("coverage-name-1")).toBeInTheDocument();
    });
    fireEvent.change(screen.getByTestId("category-filter"), {
      target: { value: "Damage" },
    });
    await waitFor(() => {
      expect(screen.getByTestId("coverage-name-1")).toBeInTheDocument();
      expect(screen.queryByTestId("coverage-name-2")).not.toBeInTheDocument();
      expect(screen.queryByTestId("coverage-name-3")).not.toBeInTheDocument();
    });
  });

  test("calls onEdit with correct id when edit is clicked", async () => {
    const http = await import("../../api/http");
    vi.mocked(http.default.get).mockResolvedValueOnce({ data: mockCoverages });
    renderPage();
    await waitFor(() => {
      expect(screen.getByRole("button", { name: /edit 1/i })).toBeInTheDocument();
    });
    fireEvent.click(screen.getByRole("button", { name: /edit 1/i }));
    expect(mockNavigate).toHaveBeenCalledWith("/coverages/1");
  });

  test("calls onDelete with correct id when delete is clicked", async () => {
    const http = await import("../../api/http");
    vi.mocked(http.default.get).mockResolvedValueOnce({ data: mockCoverages });
    renderPage();
    await waitFor(() => {
      expect(screen.getByRole("button", { name: /delete 1/i })).toBeInTheDocument();
    });
    fireEvent.click(screen.getByRole("button", { name: /delete 1/i }));
    await waitFor(() => {
      expect(http.default.delete).toHaveBeenCalledWith("/backoffice/coverages/1");
    });
  });

  test("shows error alert when delete fails", async () => {
    const http = await import("../../api/http");
    vi.mocked(http.default.get).mockResolvedValueOnce({ data: mockCoverages });
    vi.mocked(http.default.delete).mockRejectedValueOnce(new Error("Delete failed"));
    renderPage();
    await waitFor(() => {
      expect(screen.getByRole("button", { name: /delete 1/i })).toBeInTheDocument();
    });
    fireEvent.click(screen.getByRole("button", { name: /delete 1/i }));
    await waitFor(() => {
      expect(screen.getByText("Failed to delete coverage. Please try again.")).toBeInTheDocument();
    });
  });

  test("shows error alert when fetching coverages fails", async () => {
    const http = await import("../../api/http");
    vi.mocked(http.default.get).mockRejectedValueOnce(new Error("Network error"));
    renderPage();
    await waitFor(() => {
      expect(screen.getByText("Failed to load coverages. Please try again.")).toBeInTheDocument();
    });
  });

  test("dismisses error alert when close is clicked", async () => {
    const http = await import("../../api/http");
    vi.mocked(http.default.get).mockRejectedValueOnce(new Error("Network error"));
    renderPage();
    await waitFor(() => {
      expect(screen.getByText("Failed to load coverages. Please try again.")).toBeInTheDocument();
    });
    fireEvent.click(screen.getByTitle("Close"));
    await waitFor(() => {
      expect(
        screen.queryByText("Failed to load coverages. Please try again.")
      ).not.toBeInTheDocument();
    });
  });

  test("opens create coverage page when create button is clicked", async () => {
    const http = await import("../../api/http");
    vi.mocked(http.default.get).mockResolvedValueOnce({ data: mockCoverages });
    renderPage();
    await waitFor(() => {
      expect(screen.getByTestId("create-coverage-button")).toBeInTheDocument();
    });
    fireEvent.click(screen.getByTestId("create-coverage-button"));
    expect(mockNavigate).toHaveBeenCalledWith("/coverages/create");
  });
});
