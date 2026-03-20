import "@testing-library/jest-dom/vitest";
import { render, screen, cleanup, waitFor } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import QuotesManagementPage from "../QuotesManagementPage";

vi.mock("../../api/http", () => ({
  default: {
    get: vi.fn().mockResolvedValue({ data: [] }),
  },
}));

describe("QuotesManagementPage", () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
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
});
