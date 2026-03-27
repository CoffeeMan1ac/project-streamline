import "@testing-library/jest-dom/vitest";
import { render, screen, fireEvent, within, cleanup, waitFor } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import CreateCoveragePage from "../CreateCoveragePage";

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
    post: vi.fn().mockResolvedValue({ data: {} }),
  },
}));

describe("CreateCoveragePage", () => {
  let form: HTMLFormElement;

  beforeEach(() => {
    cleanup();
    mockNavigate.mockClear();
    vi.clearAllMocks();
  });

  const renderWithRouter = () => {
    const utils = render(
      <MemoryRouter>
        <CreateCoveragePage />
      </MemoryRouter>
    );

    const found = utils.container.querySelector("form");
    if (!found) throw new Error("Create coverage form not found");
    form = found as HTMLFormElement;

    return utils;
  };

  test("renders page title", () => {
    renderWithRouter();
    expect(screen.getByText("Create New Coverage")).toBeInTheDocument();
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

  test("renders create coverage button", () => {
    renderWithRouter();
    const f = within(form);
    expect(f.getByRole("button", { name: /Create Coverage/i })).toBeInTheDocument();
  });

  test("renders cancel button", () => {
    renderWithRouter();
    const f = within(form);
    expect(f.getByRole("button", { name: /Cancel/i })).toBeInTheDocument();
  });

  test("shows required errors when submitting empty form", () => {
    renderWithRouter();
    const f = within(form);
    fireEvent.click(f.getByRole("button", { name: /Create Coverage/i }));
    const requiredErrors = f.getAllByText(/Required/i);
    expect(requiredErrors.length).toBeGreaterThan(0);
  });

  test("shows required error for coverage name when empty", () => {
    renderWithRouter();
    const f = within(form);
    fireEvent.click(f.getByRole("button", { name: /Create Coverage/i }));
    const requiredErrors = f.getAllByText(/Required/i);
    expect(requiredErrors.length).toBe(3);
  });

  test("shows required error for description when empty", () => {
    renderWithRouter();
    const f = within(form);
    fireEvent.click(f.getByRole("button", { name: /Create Coverage/i }));
    const requiredErrors = f.getAllByText(/Required/i);
    expect(requiredErrors.length).toBe(3);
  });

  test("shows required error for category when empty", () => {
    renderWithRouter();
    const f = within(form);
    fireEvent.click(f.getByRole("button", { name: /Create Coverage/i }));
    const requiredErrors = f.getAllByText(/Required/i);
    expect(requiredErrors.length).toBe(3);
  });

  test("clears error when typing in coverage name", () => {
    renderWithRouter();
    const f = within(form);
    fireEvent.click(f.getByRole("button", { name: /Create Coverage/i }));

    let requiredErrors = f.getAllByText(/Required/i);
    expect(requiredErrors.length).toBe(3);

    const coverageNameInput = f.getByPlaceholderText("e.g., Accidental Damage");
    fireEvent.change(coverageNameInput, { target: { value: "Test Coverage" } });

    requiredErrors = f.getAllByText(/Required/i);
    expect(requiredErrors.length).toBe(2);
  });

  test("clears error when typing in description", () => {
    renderWithRouter();
    const f = within(form);
    fireEvent.click(f.getByRole("button", { name: /Create Coverage/i }));

    let requiredErrors = f.getAllByText(/Required/i);
    expect(requiredErrors.length).toBe(3);

    const descriptionInput = f.getByPlaceholderText(
      "e.g., Coverage for unintentional physical damage to the device"
    );
    fireEvent.change(descriptionInput, { target: { value: "Test description" } });

    requiredErrors = f.getAllByText(/Required/i);
    expect(requiredErrors.length).toBe(2);
  });

  test("clears error when selecting category", () => {
    renderWithRouter();
    const f = within(form);
    fireEvent.click(f.getByRole("button", { name: /Create Coverage/i }));

    let requiredErrors = f.getAllByText(/Required/i);
    expect(requiredErrors.length).toBe(3);

    const select = f.getByRole("combobox");
    fireEvent.mouseDown(select);
    fireEvent.click(screen.getByText("Damage"));

    requiredErrors = f.getAllByText(/Required/i);
    expect(requiredErrors.length).toBe(2);
  });

  test("calls navigate to /coverages when cancel button is clicked", () => {
    renderWithRouter();
    const f = within(form);
    fireEvent.click(f.getByRole("button", { name: /Cancel/i }));
    expect(mockNavigate).toHaveBeenCalledWith("/coverages");
  });

  test("calls navigate to /coverages when ✕ is clicked", () => {
    renderWithRouter();
    fireEvent.click(screen.getByText("✕"));
    expect(mockNavigate).toHaveBeenCalledWith("/coverages");
  });

  test("selects category from dropdown", () => {
    renderWithRouter();
    const f = within(form);

    const select = f.getByRole("combobox");
    fireEvent.mouseDown(select);
    fireEvent.click(screen.getByText("Damage"));

    expect(f.getByText("Damage")).toBeInTheDocument();
  });

  test("selects all category options", () => {
    renderWithRouter();
    const f = within(form);

    const categories = ["Damage", "Warranty", "Theft", "Other"];
    const select = f.getByRole("combobox");

    categories.forEach((category) => {
      fireEvent.mouseDown(select);
      fireEvent.click(screen.getByText(category));
      expect(f.getByText(category)).toBeInTheDocument();
    });
  });

  test("fills out form and submits", async () => {
    const http = await import("../../api/http");
    renderWithRouter();
    const f = within(form);

    const coverageNameInput = f.getByPlaceholderText("e.g., Accidental Damage");
    fireEvent.change(coverageNameInput, { target: { value: "Test Coverage" } });

    const descriptionInput = f.getByPlaceholderText(
      "e.g., Coverage for unintentional physical damage to the device"
    );
    fireEvent.change(descriptionInput, { target: { value: "Test description" } });

    const select = f.getByRole("combobox");
    fireEvent.mouseDown(select);
    fireEvent.click(screen.getByText("Damage"));

    await waitFor(() => {
      expect(f.getByText("Damage")).toBeInTheDocument();
    });

    const submitButton = f.getByRole("button", { name: /Create Coverage/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(http.default.post).toHaveBeenCalledWith("/backoffice/coverages", {
        coverageName: "Test Coverage",
        description: "Test description",
        category: "Damage",
      });
    });
  });
});
