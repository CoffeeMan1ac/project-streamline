import "@testing-library/jest-dom/vitest";
import { render, screen, fireEvent, cleanup, waitFor } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import RulesManagementPage from "../RulesManagementPage";

vi.mock("../EditRulePage", () => ({
  default: ({ onClose }: { onClose: () => void }) => (
    <div>
      <span>Edit Rule Modal</span>
      <button onClick={onClose}>Close</button>
    </div>
  ),
}));

vi.mock("../CreateRulePage", () => ({
  default: ({ onClose }: { onClose: () => void }) => (
    <div>
      <span>Create Rule Modal</span>
      <button onClick={onClose}>Close</button>
    </div>
  ),
}));

vi.mock("../../components/RuleTable", () => ({
  default: ({
    onToggleRuleActive,
    onEditRule,
    onReorderRule,
  }: {
    onToggleRuleActive: (order: number) => void;
    onEditRule: (id: string) => void;
    onReorderRule: (ruleId: string, newPriority: number) => void;
  }) => (
    <div>
      <span>Rule Table</span>
      <button onClick={() => onToggleRuleActive(1)}>Toggle Rule</button>
      <button onClick={() => onEditRule("rule-1")}>Edit Rule</button>
      <button onClick={() => onReorderRule("rule-1", 2)}>Reorder Rule</button>
    </div>
  ),
}));

vi.mock("../../components/SelectProduct", () => ({
  default: ({ onProductChange }: { onProductChange: (id: string) => void }) => (
    <div>
      <span>Select Product</span>
      <button onClick={() => onProductChange("product-1")}>Select Product 1</button>
    </div>
  ),
}));

vi.mock("../../api/http", () => ({
  default: {
    get: vi.fn().mockResolvedValue({ data: [] }),
    patch: vi.fn().mockResolvedValue({}),
    put: vi.fn().mockResolvedValue({}),
  },
}));

describe("RulesManagementPage", () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  const renderPage = (initialEntries = ["/rules"]) =>
    render(
      <MemoryRouter initialEntries={initialEntries}>
        <RulesManagementPage />
      </MemoryRouter>
    );

  test("renders page title", () => {
    renderPage();
    expect(screen.getByText("Rules Management")).toBeInTheDocument();
  });

  test("renders page subtitle", () => {
    renderPage();
    expect(screen.getByText("Manage underwriting rules per product")).toBeInTheDocument();
  });

  test("renders create new rule button", () => {
    renderPage();
    expect(screen.getByRole("button", { name: /create new rule/i })).toBeInTheDocument();
  });

  test("renders select product component", () => {
    renderPage();
    expect(screen.getByText("Select Product")).toBeInTheDocument();
  });

  test("renders rule table", () => {
    renderPage();
    expect(screen.getByText("Rule Table")).toBeInTheDocument();
  });

  test("opens create rule modal when create button is clicked", () => {
    renderPage();
    fireEvent.click(screen.getByRole("button", { name: /create new rule/i }));
    expect(screen.getByText("Create Rule Modal")).toBeInTheDocument();
  });

  test("closes create rule modal when close is clicked", async () => {
    renderPage();
    fireEvent.click(screen.getByRole("button", { name: /create new rule/i }));
    expect(screen.getByText("Create Rule Modal")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /close/i }));
    await waitFor(() => {
      expect(screen.queryByText("Create Rule Modal")).not.toBeInTheDocument();
    });
  });

  test("opens edit rule modal when edit rule is clicked", () => {
    renderPage();
    fireEvent.click(screen.getByRole("button", { name: /edit rule/i }));
    expect(screen.getByText("Edit Rule Modal")).toBeInTheDocument();
  });

  test("closes edit rule modal when close is clicked", async () => {
    renderPage();
    fireEvent.click(screen.getByRole("button", { name: /edit rule/i }));
    expect(screen.getByText("Edit Rule Modal")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /close/i }));
    await waitFor(() => {
      expect(screen.queryByText("Edit Rule Modal")).not.toBeInTheDocument();
    });
  });

  test("fetches products on mount", async () => {
    const http = await import("../../api/http");
    renderPage();
    await waitFor(() => {
      expect(http.default.get).toHaveBeenCalledWith("/backoffice/products/options");
    });
  });

  test("fetches rules when product is selected", async () => {
    const http = await import("../../api/http");
    renderPage(["/rules?product=product-1"]);
    await waitFor(() => {
      expect(http.default.get).toHaveBeenCalledWith("/backoffice/rules?product=product-1");
    });
  });

  test("opens create rule modal when create=true in URL", () => {
    renderPage(["/rules?create=true"]);
    expect(screen.getByText("Create Rule Modal")).toBeInTheDocument();
  });

  test("calls toggle rule active when toggle is clicked", async () => {
    const http = await import("../../api/http");
    vi.mocked(http.default.get)
      .mockResolvedValueOnce({ data: [] })
      .mockResolvedValueOnce({
        data: [
          {
            id: "rule-1",
            productId: "product-1",
            name: "Test Rule",
            priority: 1,
            active: true,
            ruleConfig: {
              when: { conditions: [] },
              then: { decision: "ACCEPT", premiumDelta: null, premiumOverride: null },
            },
          },
        ],
      });

    renderPage(["/rules?product=product-1"]);
    await waitFor(() => {
      fireEvent.click(screen.getByRole("button", { name: /toggle rule/i }));
    });
  });

  test("calls reorder rule when reorder is clicked", async () => {
    const http = await import("../../api/http");
    renderPage(["/rules?product=product-1"]);
    await waitFor(() => {
      fireEvent.click(screen.getByRole("button", { name: /reorder rule/i }));
    });
    await waitFor(() => {
      expect(http.default.put).toHaveBeenCalledWith("/backoffice/rules/reorder", {
        product: "product-1",
        rule: "rule-1",
        priority: 2,
      });
    });
  });

  test("handles error when fetching products fails", async () => {
    const http = await import("../../api/http");
    vi.mocked(http.default.get).mockRejectedValueOnce(new Error("Network error"));
    vi.spyOn(console, "error").mockImplementation(() => {});
    renderPage();
    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith("Failed to fetch products:", expect.any(Error));
    });
  });

  test("handles error when fetching rules fails", async () => {
    const http = await import("../../api/http");
    vi.mocked(http.default.get)
      .mockResolvedValueOnce({ data: [] })
      .mockRejectedValueOnce(new Error("Network error"));
    vi.spyOn(console, "error").mockImplementation(() => {});
    renderPage(["/rules?product=product-1"]);
    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith("Failed to fetch rules:", expect.any(Error));
    });
  });

  test("handles error when toggling rule active fails", async () => {
    const http = await import("../../api/http");
    vi.mocked(http.default.get)
      .mockResolvedValueOnce({ data: [] })
      .mockResolvedValueOnce({
        data: [
          {
            id: "rule-1",
            productId: "product-1",
            name: "Test Rule",
            priority: 1,
            active: true,
            ruleConfig: {
              when: { conditions: [] },
              then: { decision: "ACCEPT", premiumDelta: null, premiumOverride: null },
            },
          },
        ],
      });
    vi.mocked(http.default.patch).mockRejectedValueOnce(new Error("Toggle failed"));
    vi.spyOn(console, "error").mockImplementation(() => {});

    renderPage(["/rules?product=product-1"]);

    await waitFor(() => {
      expect(http.default.get).toHaveBeenCalledWith("/backoffice/rules?product=product-1");
    });

    fireEvent.click(screen.getByRole("button", { name: /toggle rule/i }));

    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith(
        "Failed to toggle rule active status:",
        expect.any(Error)
      );
    });
  });

  test("handles error when reordering rule fails", async () => {
    const http = await import("../../api/http");
    vi.mocked(http.default.put).mockRejectedValueOnce(new Error("Reorder failed"));
    vi.spyOn(console, "error").mockImplementation(() => {});

    renderPage(["/rules?product=product-1"]);
    fireEvent.click(screen.getByRole("button", { name: /reorder rule/i }));
    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith("Failed to reorder rule:", expect.any(Error));
    });
  });

  test("updates search params when product is changed", async () => {
    renderPage();
    fireEvent.click(screen.getByRole("button", { name: /select product 1/i }));
    await waitFor(() => {
      expect(screen.getByText("Rule Table")).toBeInTheDocument();
    });
  });

  // After
  test("closes create rule dialog via backdrop click", async () => {
    renderPage();
    fireEvent.click(screen.getByRole("button", { name: /create new rule/i }));
    expect(screen.getByText("Create Rule Modal")).toBeInTheDocument();
    fireEvent.click(document.querySelector(".MuiBackdrop-root")!);
    await waitFor(() => {
      expect(screen.queryByText("Create Rule Modal")).not.toBeInTheDocument();
    });
  });

  test("closes edit rule dialog via backdrop click", async () => {
    renderPage();
    fireEvent.click(screen.getByRole("button", { name: /edit rule/i }));
    expect(screen.getByText("Edit Rule Modal")).toBeInTheDocument();
    fireEvent.click(document.querySelector(".MuiBackdrop-root")!);
    await waitFor(() => {
      expect(screen.queryByText("Edit Rule Modal")).not.toBeInTheDocument();
    });
  });

  test("updates rules state after successful toggle", async () => {
    const http = await import("../../api/http");
    vi.mocked(http.default.get)
      .mockResolvedValueOnce({ data: [] })
      .mockResolvedValueOnce({
        data: [
          {
            id: "rule-1",
            productId: "product-1",
            name: "Test Rule",
            priority: 1,
            active: true,
            ruleConfig: {
              when: { conditions: [] },
              then: { decision: "ACCEPT", premiumDelta: null, premiumOverride: null },
            },
          },
        ],
      });

    renderPage(["/rules?product=product-1"]);

    await waitFor(() => {
      expect(http.default.get).toHaveBeenCalledWith("/backoffice/rules?product=product-1");
    });

    fireEvent.click(screen.getByRole("button", { name: /toggle rule/i }));

    await waitFor(() => {
      expect(http.default.patch).toHaveBeenCalledWith("/backoffice/rules/rule-1", {
        active: false,
      });
    });
  });
});
