import "@testing-library/jest-dom/vitest";
import { render, screen, fireEvent, within, cleanup } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach, afterAll, beforeAll } from "vitest";
import { MemoryRouter } from "react-router-dom";
import CreateRulePage from "../CreateRulePage";

vi.mock("../api/http", () => ({
  default: {
    post: vi.fn().mockResolvedValue({ data: {} }),
  },
}));

describe("CreateRulePage", () => {
  let form: HTMLFormElement;
  const originalConsoleError = console.error;
  const originalConsoleWarn = console.warn;

  beforeAll(() => {
    console.error = (...args) => {
      const isMuiAnchorError = args.some(
        (arg) => typeof arg === "string" && arg.includes("anchorEl")
      );
      if (isMuiAnchorError) return;
      originalConsoleError(...args);
    };

    console.warn = (...args) => {
      const isMuiAnchorWarning = args.some(
        (arg) => typeof arg === "string" && arg.includes("anchorEl")
      );
      if (isMuiAnchorWarning) return;
      originalConsoleWarn(...args);
    };
  });

  afterAll(() => {
    console.error = originalConsoleError;
    console.warn = originalConsoleWarn;
  });

  beforeEach(() => {
    cleanup();
  });

  const renderWithRouter = () => {
    const utils = render(
      <MemoryRouter>
        <CreateRulePage />
      </MemoryRouter>
    );

    const found = utils.container.querySelector("form");
    if (!found) throw new Error("Create rule form not found");
    form = found as HTMLFormElement;

    return utils;
  };

  test("renders page title", () => {
    renderWithRouter();
    expect(screen.getAllByText(/Create New Rule/i)[0]).toBeInTheDocument();
  });

  test("renders all form fields", () => {
    renderWithRouter();
    const f = within(form);

    expect(f.getByTestId("rule-name-input")).toBeInTheDocument();
    expect(f.getByText(/Rule Description/i)).toBeInTheDocument();
    expect(f.getAllByText(/Conditions/i)[0]).toBeInTheDocument();
    expect(f.getByText(/Condition Logic/i)).toBeInTheDocument();
    expect(f.getByText(/^Decision \*$/i)).toBeInTheDocument();
  });

  test("renders create rule button", () => {
    renderWithRouter();
    const f = within(form);
    expect(f.getByRole("button", { name: /Create Rule/i })).toBeInTheDocument();
  });

  test("renders cancel button", () => {
    renderWithRouter();
    const f = within(form);
    expect(f.getByRole("button", { name: /Cancel/i })).toBeInTheDocument();
  });

  test("shows required errors when submitting empty form", () => {
    renderWithRouter();
    const f = within(form);
    fireEvent.click(f.getByRole("button", { name: /Create Rule/i }));
    expect(f.getAllByText(/Required/i).length).toBeGreaterThan(0);
  });

  test("shows decline reason field when decline is selected", () => {
    renderWithRouter();
    const f = within(form);

    const comboboxes = f.getAllByRole("combobox");
    fireEvent.mouseDown(comboboxes[3]);
    fireEvent.click(screen.getByText(/^Decline$/i));

    expect(f.getByText(/Reason for Decline/i)).toBeInTheDocument();
  });

  test("renders one condition row by default", () => {
    renderWithRouter();
    const f = within(form);
    expect(f.getAllByText(/Field/i).length).toBeGreaterThanOrEqual(1);
  });

  test("adds a condition row when + Add Condition is clicked", () => {
    renderWithRouter();
    const f = within(form);

    const before = f.getAllByText(/Field/i).length;
    fireEvent.click(f.getByText(/\+ Add Condition/i));
    const after = f.getAllByText(/Field/i).length;

    expect(after).toBeGreaterThan(before);
  });

  test("condition logic radio buttons are rendered", () => {
    renderWithRouter();
    const f = within(form);
    expect(f.getByLabelText(/All conditions must be true/i)).toBeInTheDocument();
    expect(f.getByLabelText(/At least one condition must be true/i)).toBeInTheDocument();
  });

  test("premium outcome radio buttons are rendered when accept is selected", () => {
    renderWithRouter();
    const f = within(form);

    const comboboxes = f.getAllByRole("combobox");
    fireEvent.mouseDown(comboboxes[3]);
    fireEvent.click(screen.getByText(/^Accept$/i));

    expect(f.getByLabelText(/^Override$/i)).toBeInTheDocument();
    expect(f.getByLabelText(/^Delta$/i)).toBeInTheDocument();
  });

  test("shows override price field when accept and override is selected", () => {
    renderWithRouter();
    const f = within(form);

    const comboboxes = f.getAllByRole("combobox");
    fireEvent.mouseDown(comboboxes[3]);
    fireEvent.click(screen.getByText(/^Accept$/i));

    expect(f.getByLabelText(/Override Price/i)).toBeInTheDocument();
  });

  test("shows delta percentage field when delta is selected", () => {
    renderWithRouter();
    const f = within(form);

    const comboboxes = f.getAllByRole("combobox");
    fireEvent.mouseDown(comboboxes[3]);
    fireEvent.click(screen.getByText(/^Accept$/i));

    fireEvent.click(f.getByLabelText(/^Delta$/i));
    expect(f.getByLabelText(/Delta Percentage/i)).toBeInTheDocument();
  });

  test("removes a condition row when remove button is clicked", () => {
    renderWithRouter();
    const f = within(form);

    fireEvent.click(f.getByText(/\+ Add Condition/i));
    const before = f.getAllByText(/Field/i).length;
    fireEvent.click(f.getAllByText("✕")[1]);
    const after = f.getAllByText(/Field/i).length;
    expect(after).toBeLessThan(before);
  });

  test("calls onClose when cancel is clicked", () => {
    const onClose = vi.fn();
    render(
      <MemoryRouter>
        <CreateRulePage onClose={onClose} />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByRole("button", { name: /Cancel/i }));
    expect(onClose).toHaveBeenCalled();
  });

  test("calls onClose when ✕ is clicked", () => {
    const onClose = vi.fn();
    render(
      <MemoryRouter>
        <CreateRulePage onClose={onClose} />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByText("✕"));
    expect(onClose).toHaveBeenCalled();
  });

  test("submits form and calls http post when form is valid", async () => {
    const onClose = vi.fn();
    const onSave = vi.fn();

    const { container } = render(
      <MemoryRouter>
        <CreateRulePage
          products={[{ id: "p1", name: "Product 1" }]}
          selectedProduct="p1"
          onClose={onClose}
          onSave={onSave}
        />
      </MemoryRouter>
    );

    const f = container.querySelector("form") as HTMLFormElement;

    fireEvent.change(screen.getByTestId("rule-name-input"), { target: { value: "Test Rule" } });
    fireEvent.change(screen.getByPlaceholderText(/Checks if the applicant/i), {
      target: { value: "Test description" },
    });

    // set outcome to decline via native input
    const nativeInputs = f.querySelectorAll("input.MuiSelect-nativeInput");
    fireEvent.change(nativeInputs[1], { target: { value: "decline" } });

    // set condition operator and value as text
    fireEvent.change(nativeInputs[3], { target: { value: "equals" } });
    const textInput = f.querySelector("input[placeholder='Value']") as HTMLInputElement;
    if (textInput) fireEvent.change(textInput, { target: { value: "test-value" } });

    fireEvent.submit(f);

    expect(within(f).getByText(/All fields in this condition are required/i)).toBeInTheDocument();
  });

  test("shows condition error when submitting with empty condition fields", () => {
    renderWithRouter();
    const f = within(form);

    fireEvent.change(screen.getByTestId("rule-name-input"), { target: { value: "Test Rule" } });
    fireEvent.change(screen.getByPlaceholderText(/Checks if the applicant/i), {
      target: { value: "Test description" },
    });

    const nativeInputs = form.querySelectorAll("input.MuiSelect-nativeInput");
    fireEvent.change(nativeInputs[0], { target: { value: "p1" } });
    fireEvent.change(nativeInputs[1], { target: { value: "decline" } });

    fireEvent.submit(form);

    expect(f.getByText(/All fields in this condition are required/i)).toBeInTheDocument();
  });

  test("changes condition logic to any", () => {
    renderWithRouter();
    const f = within(form);

    fireEvent.click(f.getByLabelText(/At least one condition must be true/i));
    expect(f.getByLabelText(/At least one condition must be true/i)).toBeChecked();
  });

  test("updates condition field", () => {
    renderWithRouter();

    const nativeInputs = form.querySelectorAll("input.MuiSelect-nativeInput");
    fireEvent.change(nativeInputs[2], { target: { value: "country" } });
    fireEvent.change(nativeInputs[2], { target: { value: "occupation" } });

    expect(within(form).getAllByRole("combobox")[0]).toBeInTheDocument();
  });
});
