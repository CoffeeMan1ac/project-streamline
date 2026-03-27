import "@testing-library/jest-dom/vitest";
import { render, screen, fireEvent, within, cleanup, waitFor } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import EditCoveragePage from "../EditCoveragePage";

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
    get: vi.fn(),
    patch: vi.fn().mockResolvedValue({ data: {} }),
  },
}));

const mockCoverage = {
  id: "1",
  coverageName: "Accidental Damage",
  description: "Coverage for unintentional physical damage to the device",
  category: "Damage",
  usedInProducts: 5,
};

describe("EditCoveragePage", () => {
  let form: HTMLFormElement;

  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
    mockNavigate.mockClear();
  });

  const renderWithRouter = (id = "1") => {
    const utils = render(
      <MemoryRouter>
        <EditCoveragePage id={id} />
      </MemoryRouter>
    );

    const found = utils.container.querySelector("form");
    if (!found) throw new Error("Edit coverage form not found");
    form = found as HTMLFormElement;

    return utils;
  };

  test("renders page title", () => {
    renderWithRouter();
    expect(screen.getByText("Edit Coverage")).toBeInTheDocument();
  });

  test("renders close button", () => {
    renderWithRouter();
    expect(screen.getByText("✕")).toBeInTheDocument();
  });

  test("renders all form fields", () => {
    renderWithRouter();
    const f = within(form);

    expect(f.getByText(/Coverage Name \*/i)).toBeInTheDocument();
    expect(f.getByPlaceholderText("e.g., Accidental Damage")).toBeInTheDocument();
    expect(f.getByText(/Description \*/i)).toBeInTheDocument();
    expect(
      f.getByPlaceholderText("e.g., Coverage for unintentional physical damage to the device")
    ).toBeInTheDocument();
    expect(f.getByText(/Category \*/i)).toBeInTheDocument();
  });

  test("renders update coverage button", () => {
    renderWithRouter();
    const f = within(form);
    expect(f.getByRole("button", { name: /Update Coverage/i })).toBeInTheDocument();
  });

  test("renders cancel button", () => {
    renderWithRouter();
    const f = within(form);
    expect(f.getByRole("button", { name: /Cancel/i })).toBeInTheDocument();
  });

  test("renders usage info box", async () => {
    const http = await import("../../api/http");
    vi.mocked(http.default.get).mockResolvedValueOnce({ data: mockCoverage });
    renderWithRouter();

    await waitFor(() => {
      expect(
        screen.getByText(/This coverage is currently used in 5 products/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Changes will affect all products using this coverage/i)
      ).toBeInTheDocument();
      expect(screen.getByTestId("CheckCircleOutlineIcon")).toBeInTheDocument();
    });
  });

  test("renders usage info box with singular product text when usedInProducts is 1", async () => {
    const http = await import("../../api/http");
    vi.mocked(http.default.get).mockResolvedValueOnce({
      data: { ...mockCoverage, usedInProducts: 1 },
    });
    renderWithRouter();

    await waitFor(() => {
      expect(screen.getByText(/This coverage is currently used in 1 product/i)).toBeInTheDocument();
    });
  });

  test("fetches coverage data on mount", async () => {
    const http = await import("../../api/http");
    vi.mocked(http.default.get).mockResolvedValueOnce({ data: mockCoverage });
    renderWithRouter();
    await waitFor(() => {
      expect(http.default.get).toHaveBeenCalledWith("/backoffice/coverages/1");
    });
  });

  test("populates form fields with fetched data", async () => {
    const http = await import("../../api/http");
    vi.mocked(http.default.get).mockResolvedValueOnce({ data: mockCoverage });
    renderWithRouter();

    await waitFor(() => {
      expect(screen.getByDisplayValue("Accidental Damage")).toBeInTheDocument();
      expect(
        screen.getByDisplayValue("Coverage for unintentional physical damage to the device")
      ).toBeInTheDocument();
      expect(screen.getByText("Damage")).toBeInTheDocument();
    });
  });

  test("shows required errors when submitting empty form", async () => {
    const http = await import("../../api/http");
    vi.mocked(http.default.get).mockResolvedValueOnce({ data: mockCoverage });
    renderWithRouter();

    await waitFor(() => {
      expect(screen.getByDisplayValue("Accidental Damage")).toBeInTheDocument();
    });

    const f = within(form);
    const coverageNameInput = f.getByPlaceholderText("e.g., Accidental Damage");
    fireEvent.change(coverageNameInput, { target: { value: "" } });

    const descriptionInput = f.getByPlaceholderText(
      "e.g., Coverage for unintentional physical damage to the device"
    );
    fireEvent.change(descriptionInput, { target: { value: "" } });

    fireEvent.click(f.getByRole("button", { name: /Update Coverage/i }));

    const requiredErrors = f.getAllByText(/Required/i);
    expect(requiredErrors.length).toBeGreaterThan(0);
  });

  test("calls onClose when cancel button is clicked", async () => {
    const onClose = vi.fn();
    const http = await import("../../api/http");
    vi.mocked(http.default.get).mockResolvedValueOnce({ data: mockCoverage });
    render(
      <MemoryRouter>
        <EditCoveragePage id="1" onClose={onClose} />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByDisplayValue("Accidental Damage")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole("button", { name: /Cancel/i }));
    expect(onClose).toHaveBeenCalled();
  });

  test("calls onClose when ✕ is clicked", async () => {
    const onClose = vi.fn();
    const http = await import("../../api/http");
    vi.mocked(http.default.get).mockResolvedValueOnce({ data: mockCoverage });
    render(
      <MemoryRouter>
        <EditCoveragePage id="1" onClose={onClose} />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByDisplayValue("Accidental Damage")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("✕"));
    expect(onClose).toHaveBeenCalled();
  });

  test("selects category from dropdown", async () => {
    const http = await import("../../api/http");
    vi.mocked(http.default.get).mockResolvedValueOnce({ data: mockCoverage });
    renderWithRouter();

    await waitFor(() => {
      expect(screen.getByText("Damage")).toBeInTheDocument();
    });

    const select = screen.getByRole("combobox");
    fireEvent.mouseDown(select);

    const warrantyOption = await screen.findByRole("option", { name: "Warranty" });
    fireEvent.click(warrantyOption);

    // The selected value should now be "Warranty" in the combobox
    expect(screen.getByRole("combobox")).toHaveTextContent("Warranty");
  });

  test("submits form with updated data", async () => {
    const onSave = vi.fn();
    const onClose = vi.fn();
    const http = await import("../../api/http");
    vi.mocked(http.default.get).mockResolvedValueOnce({ data: mockCoverage });

    render(
      <MemoryRouter>
        <EditCoveragePage id="1" onSave={onSave} onClose={onClose} />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByDisplayValue("Accidental Damage")).toBeInTheDocument();
    });

    const coverageNameInput = screen.getByPlaceholderText("e.g., Accidental Damage");
    fireEvent.change(coverageNameInput, { target: { value: "Updated Coverage" } });

    const descriptionInput = screen.getByPlaceholderText(
      "e.g., Coverage for unintentional physical damage to the device"
    );
    fireEvent.change(descriptionInput, { target: { value: "Updated description" } });

    const select = screen.getByRole("combobox");
    fireEvent.mouseDown(select);

    const warrantyOption = await screen.findByRole("option", { name: "Warranty" });
    fireEvent.click(warrantyOption);

    const submitButton = screen.getByRole("button", { name: /Update Coverage/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(http.default.patch).toHaveBeenCalledWith("/backoffice/coverages/1", {
        coverageName: "Updated Coverage",
        description: "Updated description",
        category: "Warranty",
      });
      expect(onSave).toHaveBeenCalled();
      expect(onClose).toHaveBeenCalled();
    });
  });
});
