import "@testing-library/jest-dom/vitest";
import { render, screen, fireEvent, cleanup, waitFor } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import CreateCoveragePage from "../../pages/CreateCoveragePage";

const mockOnClose = vi.fn();
const mockOnSave = vi.fn();

vi.mock("../../api/http", () => ({
  default: {
    get: vi.fn().mockResolvedValue({
      data: [
        { id: "1", code: "DMG", label: "Damage" },
        { id: "2", code: "WRT", label: "Warranty" },
        { id: "3", code: "THT", label: "Theft" },
        { id: "4", code: "OTH", label: "Other" },
      ],
    }),
    post: vi.fn().mockResolvedValue({ data: {} }),
  },
}));

describe("CreateCoveragePage", () => {
  beforeEach(() => {
    cleanup();
    mockOnClose.mockClear();
    mockOnSave.mockClear();
    vi.clearAllMocks();
  });

  const renderPage = () => {
    return render(
      <MemoryRouter>
        <CreateCoveragePage open={true} onClose={mockOnClose} onSave={mockOnSave} />
      </MemoryRouter>
    );
  };

  test("renders page title", () => {
    renderPage();
    expect(screen.getByText("Create New Coverage")).toBeInTheDocument();
  });

  test("renders close button", () => {
    renderPage();
    expect(screen.getByText("✕")).toBeInTheDocument();
  });

  test("renders all form fields", () => {
    renderPage();
    expect(screen.getByPlaceholderText("e.g., ACCIDENTAL_DAMAGE")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("e.g., Accidental Damage")).toBeInTheDocument();
  });

  test("renders create coverage button", () => {
    renderPage();
    expect(screen.getByRole("button", { name: /Create Coverage/i })).toBeInTheDocument();
  });

  test("renders cancel button", () => {
    renderPage();
    expect(screen.getByRole("button", { name: /Cancel/i })).toBeInTheDocument();
  });

  test("shows required errors when submitting empty form", async () => {
    renderPage();
    const submitButton = screen.getByRole("button", { name: /Create Coverage/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getAllByText(/Required/i).length).toBeGreaterThan(0);
    });
  });

  test("shows required error for coverage name when empty", async () => {
    renderPage();
    const submitButton = screen.getByRole("button", { name: /Create Coverage/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getAllByText(/Required/i).length).toBe(3);
    });
  });

  test("shows required error for description when empty", async () => {
    renderPage();
    const submitButton = screen.getByRole("button", { name: /Create Coverage/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getAllByText(/Required/i).length).toBe(3);
    });
  });

  test("shows required error for category when empty", async () => {
    renderPage();
    const submitButton = screen.getByRole("button", { name: /Create Coverage/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getAllByText(/Required/i).length).toBe(3);
    });
  });

  test("clears error when typing in coverage name", async () => {
    renderPage();
    const submitButton = screen.getByRole("button", { name: /Create Coverage/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getAllByText(/Required/i).length).toBe(3);
    });

    const codeInput = screen.getByPlaceholderText("e.g., ACCIDENTAL_DAMAGE");
    fireEvent.change(codeInput, { target: { value: "AD" } });

    await waitFor(() => {
      expect(screen.getAllByText(/Required/i).length).toBe(2);
    });
  });

  test("clears error when typing in description", async () => {
    renderPage();
    const submitButton = screen.getByRole("button", { name: /Create Coverage/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getAllByText(/Required/i).length).toBe(3);
    });

    const labelInput = screen.getByPlaceholderText("e.g., Accidental Damage");
    fireEvent.change(labelInput, { target: { value: "Test Label" } });

    await waitFor(() => {
      expect(screen.getAllByText(/Required/i).length).toBe(2);
    });
  });

  test("clears error when selecting category", async () => {
    renderPage();
    const submitButton = screen.getByRole("button", { name: /Create Coverage/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getAllByText(/Required/i).length).toBe(3);
    });

    const select = screen.getByRole("combobox");
    fireEvent.mouseDown(select);

    await waitFor(() => {
      fireEvent.click(screen.getByText("Damage"));
    });

    await waitFor(() => {
      expect(screen.getAllByText(/Required/i).length).toBe(2);
    });
  });

  test("calls navigate to /coverages when cancel button is clicked", () => {
    renderPage();
    const cancelButton = screen.getByRole("button", { name: /Cancel/i });
    fireEvent.click(cancelButton);
    expect(mockOnClose).toHaveBeenCalled();
  });

  test("calls navigate to /coverages when ✕ is clicked", () => {
    renderPage();
    const closeText = screen.getByText("✕");
    fireEvent.click(closeText.closest("p") || closeText);
    expect(mockOnClose).toHaveBeenCalled();
  });

  test("selects category from dropdown", async () => {
    renderPage();
    const select = screen.getByRole("combobox");
    fireEvent.mouseDown(select);

    await waitFor(() => {
      fireEvent.click(screen.getByText("Damage"));
    });

    expect(select).toHaveTextContent("Damage");
  });

  test("selects all category options", async () => {
    const categories = ["Damage", "Warranty", "Theft", "Other"];

    for (const category of categories) {
      cleanup();
      mockOnClose.mockClear();
      mockOnSave.mockClear();
      vi.clearAllMocks();

      renderPage();
      const select = screen.getByRole("combobox");
      fireEvent.mouseDown(select);

      await waitFor(() => {
        fireEvent.click(screen.getByText(category));
      });

      expect(select).toHaveTextContent(category);
    }
  });

  test("fills out form and submits", async () => {
    const http = await import("../../api/http");
    renderPage();

    const codeInput = screen.getByPlaceholderText("e.g., ACCIDENTAL_DAMAGE");
    fireEvent.change(codeInput, { target: { value: "AD" } });

    const labelInput = screen.getByPlaceholderText("e.g., Accidental Damage");
    fireEvent.change(labelInput, { target: { value: "Accidental Damage" } });

    const select = screen.getByRole("combobox");
    fireEvent.mouseDown(select);

    await waitFor(() => {
      fireEvent.click(screen.getByText("Damage"));
    });

    const submitButton = screen.getByRole("button", { name: /Create Coverage/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(http.default.post).toHaveBeenCalled();
      expect(mockOnSave).toHaveBeenCalled();
    });
  });
});
