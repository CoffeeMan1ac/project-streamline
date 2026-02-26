import "@testing-library/jest-dom/vitest";
import { render, screen, fireEvent, within, cleanup } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import CreateRulePage from "../CreateRulePage";

vi.mock("axios");

describe("CreateRulePage", () => {
  let form: HTMLFormElement;

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
});
