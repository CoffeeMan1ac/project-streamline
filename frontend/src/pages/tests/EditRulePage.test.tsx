import "@testing-library/jest-dom/vitest";
import { render, screen, fireEvent, within, cleanup, waitFor } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import EditRulePage from "../EditRulePage";
import http from "../../api/http";

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
        conditions: [{ field: "country", operator: "EQUALS", value: "ireland" }],
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
    vi.spyOn(http, "get").mockResolvedValue({ data: mockRule });
    vi.spyOn(http, "put").mockResolvedValue({ data: {} });
    cleanup();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const renderWithRouter = async () => {
    const utils = render(
      <MemoryRouter>
        <EditRulePage id="123" onClose={vi.fn()} />
      </MemoryRouter>
    );

    await screen.findByDisplayValue("Test Rule");

    const found = utils.container.querySelector("form");
    if (!found) throw new Error("Edit rule form not found");
    form = found as HTMLFormElement;

    return utils;
  };

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
    renderEmptyForm();
    const f = within(form);

    fireEvent.click(f.getByRole("button", { name: /Save Changes/i }));
    expect(f.getAllByText(/Required/i).length).toBeGreaterThan(0);
  });

  test("shows decline reason field when decline is selected", async () => {
    await renderWithRouter();
    const f = within(form);

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
    vi.spyOn(http, "get").mockResolvedValue({
      data: {
        ...mockRule,
        ruleConfig: {
          ...mockRule.ruleConfig,
          then: {
            decision: "ACCEPT",
            premiumOverride: null,
            premiumDelta: null,
          },
        },
      },
    });

    const utils = render(
      <MemoryRouter>
        <EditRulePage id="123" onClose={vi.fn()} />
      </MemoryRouter>
    );

    await screen.findByDisplayValue("Test Rule");

    const found = utils.container.querySelector("form");
    if (!found) throw new Error("Edit rule form not found");
    const f = within(found as HTMLFormElement);

    await waitFor(() => {
      expect(f.getByLabelText(/^Override$/i)).toBeInTheDocument();
      expect(f.getByLabelText(/^Delta$/i)).toBeInTheDocument();
    });
  });

  test("calls onClose when cancel is clicked", async () => {
    const onClose = vi.fn();
    render(
      <MemoryRouter>
        <EditRulePage id="123" onClose={onClose} />
      </MemoryRouter>
    );
    await screen.findByDisplayValue("Test Rule");
    fireEvent.click(screen.getByRole("button", { name: /Cancel/i }));
    expect(onClose).toHaveBeenCalled();
  });

  test("calls onClose when ✕ is clicked", async () => {
    const onClose = vi.fn();
    render(
      <MemoryRouter>
        <EditRulePage id="123" onClose={onClose} />
      </MemoryRouter>
    );
    await screen.findByDisplayValue("Test Rule");
    fireEvent.click(screen.getByText("✕"));
    expect(onClose).toHaveBeenCalled();
  });

  test("adds a condition row when + Add Condition is clicked", async () => {
    await renderWithRouter();
    const f = within(form);
    const before = f.getAllByText(/Field/i).length;
    fireEvent.click(f.getByText(/\+ Add Condition/i));
    expect(f.getAllByText(/Field/i).length).toBeGreaterThan(before);
  });

  test("removes a condition row when remove button is clicked", async () => {
    await renderWithRouter();
    const f = within(form);
    fireEvent.click(f.getByText(/\+ Add Condition/i));
    const before = f.getAllByText(/Field/i).length;
    fireEvent.click(f.getAllByText("✕")[1]);
    expect(f.getAllByText(/Field/i).length).toBeLessThan(before);
  });

  test("changes condition logic to any", async () => {
    await renderWithRouter();
    const f = within(form);
    fireEvent.click(f.getByLabelText(/At least one condition must be true/i));
    expect(f.getByLabelText(/At least one condition must be true/i)).toBeChecked();
  });

  test("shows condition error when submitting with empty condition fields", async () => {
    await renderWithRouter();
    const f = within(form);
    fireEvent.click(f.getByText(/\+ Add Condition/i));
    fireEvent.submit(form);
    expect(f.getAllByText(/All fields in this condition are required/i).length).toBeGreaterThan(0);
  });

  test("submits form and calls onSave and onClose on success", async () => {
    const onClose = vi.fn();
    const onSave = vi.fn();

    const { container } = render(
      <MemoryRouter>
        <EditRulePage id="123" onClose={onClose} onSave={onSave} />
      </MemoryRouter>
    );

    await screen.findByDisplayValue("Test Rule");
    const f = container.querySelector("form") as HTMLFormElement;

    fireEvent.submit(f);

    await waitFor(() => {
      expect(onSave).toHaveBeenCalled();
      expect(onClose).toHaveBeenCalled();
    });
  });

  test("shows override price field when accept with override is loaded", async () => {
    vi.spyOn(http, "get").mockResolvedValue({
      data: {
        ...mockRule,
        ruleConfig: {
          ...mockRule.ruleConfig,
          then: {
            decision: "ACCEPT",
            premiumOverride: 29.99,
            premiumDelta: null,
          },
        },
      },
    });

    const { container } = render(
      <MemoryRouter>
        <EditRulePage id="123" onClose={vi.fn()} />
      </MemoryRouter>
    );

    await screen.findByDisplayValue("Test Rule");
    const f = within(container.querySelector("form") as HTMLFormElement);
    expect(f.getByLabelText(/Override Price/i)).toBeInTheDocument();
  });

  test("shows delta percentage field when accept with delta is loaded", async () => {
    vi.spyOn(http, "get").mockResolvedValue({
      data: {
        ...mockRule,
        ruleConfig: {
          ...mockRule.ruleConfig,
          then: {
            decision: "ACCEPT",
            premiumOverride: null,
            premiumDelta: 0.1,
          },
        },
      },
    });

    const { container } = render(
      <MemoryRouter>
        <EditRulePage id="123" onClose={vi.fn()} />
      </MemoryRouter>
    );

    await screen.findByDisplayValue("Test Rule");
    const f = within(container.querySelector("form") as HTMLFormElement);
    expect(f.getByLabelText(/Delta Percentage/i)).toBeInTheDocument();
  });

  test("handles fetch error gracefully", async () => {
    vi.spyOn(http, "get").mockRejectedValueOnce(new Error("Network error"));
    vi.spyOn(console, "error").mockImplementation(() => {});

    render(
      <MemoryRouter>
        <EditRulePage id="123" onClose={vi.fn()} />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(console.error).toHaveBeenCalled();
    });
  });

  test("updates condition field value", async () => {
    await renderWithRouter();
    const nativeInputs = form.querySelectorAll("input.MuiSelect-nativeInput");
    fireEvent.change(nativeInputs[2], { target: { value: "occupation" } });
    expect(within(form).getAllByRole("combobox")[0]).toBeInTheDocument();
  });

  test("updates condition operator", async () => {
    await renderWithRouter();
    const nativeInputs = form.querySelectorAll("input.MuiSelect-nativeInput");
    fireEvent.change(nativeInputs[3], { target: { value: "notEquals" } });
    expect(within(form).getAllByRole("combobox")[0]).toBeInTheDocument();
  });

  test("shows override required error when accept with override and no value", async () => {
    vi.spyOn(http, "get").mockResolvedValue({
      data: {
        ...mockRule,
        ruleConfig: {
          ...mockRule.ruleConfig,
          then: { decision: "ACCEPT", premiumOverride: null, premiumDelta: null },
        },
      },
    });

    const { container } = render(
      <MemoryRouter>
        <EditRulePage id="123" onClose={vi.fn()} />
      </MemoryRouter>
    );

    await screen.findByDisplayValue("Test Rule");
    const f = container.querySelector("form") as HTMLFormElement;
    fireEvent.submit(f);

    await waitFor(() => {
      expect(within(f).getAllByText(/Required/i).length).toBeGreaterThan(0);
    });
  });

  test("switches from override to delta when delta radio is clicked", async () => {
    vi.spyOn(http, "get").mockResolvedValue({
      data: {
        ...mockRule,
        ruleConfig: {
          ...mockRule.ruleConfig,
          then: { decision: "ACCEPT", premiumOverride: 29.99, premiumDelta: null },
        },
      },
    });

    const { container } = render(
      <MemoryRouter>
        <EditRulePage id="123" onClose={vi.fn()} />
      </MemoryRouter>
    );

    await screen.findByDisplayValue("Test Rule");
    const f = within(container.querySelector("form") as HTMLFormElement);

    fireEvent.click(f.getByLabelText(/^Delta$/i));
    expect(f.getByLabelText(/Delta Percentage/i)).toBeInTheDocument();
  });

  test("switches from delta to override when override radio is clicked", async () => {
    vi.spyOn(http, "get").mockResolvedValue({
      data: {
        ...mockRule,
        ruleConfig: {
          ...mockRule.ruleConfig,
          then: { decision: "ACCEPT", premiumOverride: null, premiumDelta: 0.1 },
        },
      },
    });

    const { container } = render(
      <MemoryRouter>
        <EditRulePage id="123" onClose={vi.fn()} />
      </MemoryRouter>
    );

    await screen.findByDisplayValue("Test Rule");
    const f = within(container.querySelector("form") as HTMLFormElement);

    fireEvent.click(f.getByLabelText(/^Override$/i));
    expect(f.getByLabelText(/Override Price/i)).toBeInTheDocument();
  });

  test("handles submit error gracefully", async () => {
    vi.spyOn(http, "put").mockRejectedValueOnce(new Error("Save failed"));
    vi.spyOn(console, "error").mockImplementation(() => {});

    const { container } = render(
      <MemoryRouter>
        <EditRulePage id="123" onClose={vi.fn()} />
      </MemoryRouter>
    );

    await screen.findByDisplayValue("Test Rule");
    const f = container.querySelector("form") as HTMLFormElement;
    fireEvent.submit(f);

    await waitFor(() => {
      expect(console.error).toHaveBeenCalled();
    });
  });

  test("renders with no id provided", () => {
    const { container } = render(
      <MemoryRouter>
        <EditRulePage onClose={vi.fn()} />
      </MemoryRouter>
    );
    expect(container.querySelector("form")).toBeInTheDocument();
  });

  test("fills in override value and submits successfully", async () => {
    const onClose = vi.fn();
    const onSave = vi.fn();

    vi.spyOn(http, "get").mockResolvedValue({
      data: {
        ...mockRule,
        ruleConfig: {
          ...mockRule.ruleConfig,
          then: { decision: "ACCEPT", premiumOverride: 29.99, premiumDelta: null },
        },
      },
    });

    const { container } = render(
      <MemoryRouter>
        <EditRulePage id="123" onClose={onClose} onSave={onSave} />
      </MemoryRouter>
    );

    await screen.findByDisplayValue("Test Rule");
    const f = container.querySelector("form") as HTMLFormElement;

    fireEvent.change(within(f).getByLabelText(/Override Price/i), {
      target: { value: "29.99" },
    });

    fireEvent.submit(f);

    await waitFor(() => {
      expect(onSave).toHaveBeenCalled();
      expect(onClose).toHaveBeenCalled();
    });
  });

  test("fills in delta value and submits successfully", async () => {
    const onClose = vi.fn();
    const onSave = vi.fn();

    vi.spyOn(http, "get").mockResolvedValue({
      data: {
        ...mockRule,
        ruleConfig: {
          ...mockRule.ruleConfig,
          then: { decision: "ACCEPT", premiumOverride: null, premiumDelta: 0.1 },
        },
      },
    });

    const { container } = render(
      <MemoryRouter>
        <EditRulePage id="123" onClose={onClose} onSave={onSave} />
      </MemoryRouter>
    );

    await screen.findByDisplayValue("Test Rule");
    const f = container.querySelector("form") as HTMLFormElement;

    fireEvent.change(within(f).getByLabelText(/Delta Percentage/i), {
      target: { value: "10" },
    });

    fireEvent.submit(f);

    await waitFor(() => {
      expect(onSave).toHaveBeenCalled();
      expect(onClose).toHaveBeenCalled();
    });
  });

  test("shows delta required error when accept with delta and no value", async () => {
    vi.spyOn(http, "get").mockResolvedValue({
      data: {
        ...mockRule,
        ruleConfig: {
          ...mockRule.ruleConfig,
          then: { decision: "ACCEPT", premiumOverride: null, premiumDelta: null },
        },
      },
    });

    const { container } = render(
      <MemoryRouter>
        <EditRulePage id="123" onClose={vi.fn()} />
      </MemoryRouter>
    );

    await screen.findByDisplayValue("Test Rule");
    const f = container.querySelector("form") as HTMLFormElement;

    fireEvent.click(within(f).getByLabelText(/^Delta$/i));
    fireEvent.submit(f);

    await waitFor(() => {
      expect(within(f).getAllByText(/Required/i).length).toBeGreaterThan(0);
    });
  });

  test("clears override and delta values when premium radio changes", async () => {
    vi.spyOn(http, "get").mockResolvedValue({
      data: {
        ...mockRule,
        ruleConfig: {
          ...mockRule.ruleConfig,
          then: { decision: "ACCEPT", premiumOverride: 29.99, premiumDelta: null },
        },
      },
    });

    const { container } = render(
      <MemoryRouter>
        <EditRulePage id="123" onClose={vi.fn()} />
      </MemoryRouter>
    );

    await screen.findByDisplayValue("Test Rule");
    const f = within(container.querySelector("form") as HTMLFormElement);

    fireEvent.click(f.getByLabelText(/^Delta$/i));
    expect(f.getByLabelText(/Delta Percentage/i)).toHaveValue(null);

    fireEvent.click(f.getByLabelText(/^Override$/i));
    expect(f.getByLabelText(/Override Price/i)).toHaveValue(null);
  });
  test("renders accept outcome UI with override field on load", async () => {
    vi.spyOn(http, "get").mockResolvedValue({
      data: {
        ...mockRule,
        ruleConfig: {
          ...mockRule.ruleConfig,
          then: { decision: "ACCEPT", premiumOverride: 29.99, premiumDelta: null },
        },
      },
    });

    const { container } = render(
      <MemoryRouter>
        <EditRulePage id="123" onClose={vi.fn()} />
      </MemoryRouter>
    );

    await screen.findByDisplayValue("Test Rule");
    const f = within(container.querySelector("form") as HTMLFormElement);

    expect(f.getByText(/Premium/i)).toBeInTheDocument();
    expect(f.getByLabelText(/Override Price/i)).toBeInTheDocument();
    expect(f.getByLabelText(/^Override$/i)).toBeChecked();
  });

  test("renders accept outcome UI with delta field on load", async () => {
    vi.spyOn(http, "get").mockResolvedValue({
      data: {
        ...mockRule,
        ruleConfig: {
          ...mockRule.ruleConfig,
          then: { decision: "ACCEPT", premiumOverride: null, premiumDelta: 0.1 },
        },
      },
    });

    const { container } = render(
      <MemoryRouter>
        <EditRulePage id="123" onClose={vi.fn()} />
      </MemoryRouter>
    );

    await screen.findByDisplayValue("Test Rule");
    const f = within(container.querySelector("form") as HTMLFormElement);

    expect(f.getByLabelText(/Delta Percentage/i)).toBeInTheDocument();
    expect(f.getByLabelText(/^Delta$/i)).toBeChecked();
    expect(f.getByLabelText(/Delta Percentage/i)).toHaveValue(10);
  });

  test("submits accept with override value successfully", async () => {
    const onClose = vi.fn();
    const onSave = vi.fn();

    vi.spyOn(http, "get").mockResolvedValue({
      data: {
        ...mockRule,
        ruleConfig: {
          ...mockRule.ruleConfig,
          then: { decision: "ACCEPT", premiumOverride: 29.99, premiumDelta: null },
        },
      },
    });

    const { container } = render(
      <MemoryRouter>
        <EditRulePage id="123" onClose={onClose} onSave={onSave} />
      </MemoryRouter>
    );

    await screen.findByDisplayValue("Test Rule");
    const f = container.querySelector("form") as HTMLFormElement;

    fireEvent.submit(f);

    await waitFor(() => {
      expect(onSave).toHaveBeenCalled();
      expect(onClose).toHaveBeenCalled();
    });
  });

  test("submits accept with delta value successfully", async () => {
    const onClose = vi.fn();
    const onSave = vi.fn();

    vi.spyOn(http, "get").mockResolvedValue({
      data: {
        ...mockRule,
        ruleConfig: {
          ...mockRule.ruleConfig,
          then: { decision: "ACCEPT", premiumOverride: null, premiumDelta: 0.1 },
        },
      },
    });

    const { container } = render(
      <MemoryRouter>
        <EditRulePage id="123" onClose={onClose} onSave={onSave} />
      </MemoryRouter>
    );

    await screen.findByDisplayValue("Test Rule");
    const f = container.querySelector("form") as HTMLFormElement;

    fireEvent.submit(f);

    await waitFor(() => {
      expect(onSave).toHaveBeenCalled();
      expect(onClose).toHaveBeenCalled();
    });
  });

  test("shows saving state when form is submitting", async () => {
    vi.spyOn(http, "put").mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve({ data: {} }), 500))
    );

    const { container } = render(
      <MemoryRouter>
        <EditRulePage id="123" onClose={vi.fn()} />
      </MemoryRouter>
    );

    await screen.findByDisplayValue("Test Rule");
    const f = container.querySelector("form") as HTMLFormElement;

    fireEvent.submit(f);

    expect(screen.getByRole("button", { name: /Saving.../i })).toBeInTheDocument();
  });
  test("debug - check what http.put receives on accept submit", async () => {
    const putSpy = vi.spyOn(http, "put");

    vi.spyOn(http, "get").mockResolvedValue({
      data: {
        ...mockRule,
        ruleConfig: {
          ...mockRule.ruleConfig,
          then: { decision: "ACCEPT", premiumOverride: 29.99, premiumDelta: null },
        },
      },
    });

    const { container } = render(
      <MemoryRouter>
        <EditRulePage id="123" onClose={vi.fn()} onSave={vi.fn()} />
      </MemoryRouter>
    );

    await screen.findByDisplayValue("Test Rule");
    fireEvent.submit(container.querySelector("form")!);

    await waitFor(() => {
      console.log("put called:", putSpy.mock.calls.length);
      console.log("put args:", JSON.stringify(putSpy.mock.calls[0]));
    });
  });
});
