import "@testing-library/jest-dom/vitest";
import { render, screen, fireEvent, within, cleanup, waitFor } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import EditRulePage from "../EditRulePage";

describe("EditRulePage", () => {
  let form: HTMLFormElement;

  const mockRule = {
    id: "123",
    productId: "abc",
    name: "Test Rule",
    description: "Test Description",
    reason: "Test Reason",
    priority: 1,
    active: true,
    ruleConfig: {
      when: {
        match: "all",
        conditions: [{ field: "age", operator: "EQUALS", value: "18" }],
      },
      then: {
        decision: "DECLINE",
        premiumOverride: null,
        premiumDelta: null,
      },
      stop: false,
    },
  };

  beforeEach(() => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: async () => mockRule,
    } as Response);
    cleanup();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  // Renders the component and waits for the async fetch to populate the form
  const renderWithRouter = async () => {
    const utils = render(
      <MemoryRouter>
        <EditRulePage id="123" onClose={vi.fn()} />
      </MemoryRouter>
    );

    // Wait for the fetch to resolve and populate the form fields
    await screen.findByDisplayValue("Test Rule");

    const found = utils.container.querySelector("form");
    if (!found) throw new Error("Edit rule form not found");
    form = found as HTMLFormElement;

    return utils;
  };

  // Renders without an id so the fetch is skipped and the form stays empty
  const renderEmptyForm = () => {
    const utils = render(
      <MemoryRouter>
        <EditRulePage onClose={vi.fn()} />
      </MemoryRouter>
    );

    const found = utils.container.querySelector("form");
    if (!found) throw new Error("Edit rule form not found");
    form = found as HTMLFormElement;

    return utils;
  };

  test("renders page title", async () => {
    await renderWithRouter();
    expect(screen.getAllByText(/Edit Rule/i)[0]).toBeInTheDocument();
  });

  test("renders all form fields", async () => {
    await renderWithRouter();
    const f = within(form);

    expect(f.getByTestId("rule-name-input")).toBeInTheDocument();
    expect(f.getByText(/Rule Description/i)).toBeInTheDocument();
    expect(f.getAllByText(/Conditions/i)[0]).toBeInTheDocument();
    expect(f.getByText(/Condition Logic/i)).toBeInTheDocument();
    expect(f.getByText(/^Decision \*$/i)).toBeInTheDocument();
  });

  test("renders save changes button", async () => {
    await renderWithRouter();
    const f = within(form);

    expect(f.getByRole("button", { name: /Save Changes/i })).toBeInTheDocument();
  });

  test("renders cancel button", async () => {
    await renderWithRouter();
    const f = within(form);

    expect(f.getByRole("button", { name: /Cancel/i })).toBeInTheDocument();
  });

  test("shows required errors when submitting empty form", () => {
    // Use renderEmptyForm so no fetch fires and all fields stay blank
    renderEmptyForm();
    const f = within(form);

    fireEvent.click(f.getByRole("button", { name: /Save Changes/i }));
    expect(f.getAllByText(/Required/i).length).toBeGreaterThan(0);
  });

  test("shows decline reason field when decline is selected", async () => {
    await renderWithRouter();
    const f = within(form);

    // Mock data pre-sets outcome to "decline", so the field is already visible after fetch.
    expect(f.getByText(/Reason for Decline/i)).toBeInTheDocument();
  });

  test("renders one condition row by default", async () => {
    await renderWithRouter();
    const f = within(form);

    expect(f.getAllByText(/Field/i).length).toBeGreaterThanOrEqual(1);
  });

  test("adds a condition row when + Add Condition is clicked", async () => {
    await renderWithRouter();
    const f = within(form);

    const before = f.getAllByText(/Field/i).length;
    fireEvent.click(f.getByText(/\+ Add Condition/i));
    const after = f.getAllByText(/Field/i).length;

    expect(after).toBeGreaterThan(before);
  });

  test("condition logic radio buttons are rendered", async () => {
    await renderWithRouter();
    const f = within(form);

    expect(f.getByLabelText(/All conditions must be true/i)).toBeInTheDocument();
    expect(f.getByLabelText(/At least one condition must be true/i)).toBeInTheDocument();
  });

  test("premium outcome radio buttons are rendered when accept is selected", async () => {
    await renderWithRouter();
    const f = within(form);

    const comboboxes = f.getAllByRole("combobox");
    const decisionSelect = comboboxes[2];

    fireEvent.mouseDown(decisionSelect);
    fireEvent.click(screen.getByText(/^Accept$/i));

    await waitFor(() => {
      expect(f.getByLabelText(/^Override$/i)).toBeInTheDocument();
      expect(f.getByLabelText(/^Delta$/i)).toBeInTheDocument();
    });
  });
});
