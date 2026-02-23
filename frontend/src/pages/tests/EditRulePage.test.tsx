import "@testing-library/jest-dom/vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import EditRulePage from "../EditRulePage";

vi.mock("axios");

describe("EditRulePage", () => {
  let form: HTMLFormElement;

  const renderWithRouter = () => {
    const utils = render(
      <MemoryRouter initialEntries={["/editRule/123"]}>
        <Routes>
          <Route path="/editRule/:id" element={<EditRulePage />} />
        </Routes>
      </MemoryRouter>
    );

    const found = utils.container.querySelector("form");
    if (!found) throw new Error("Edit rule form not found");
    form = found as HTMLFormElement;

    return utils;
  };

  test("renders page title", () => {
    renderWithRouter();
    expect(screen.getAllByText(/Edit Rule/i)[0]).toBeInTheDocument();
  });

  test("renders all form fields", () => {
    renderWithRouter();
    const f = within(form);

    expect(f.getByTestId("rule-name-input")).toBeInTheDocument();
    expect(f.getByText(/Rule Description/i)).toBeInTheDocument();
    expect(f.getAllByText(/Conditions/i)[0]).toBeInTheDocument();
    expect(f.getByText(/Condition Logic/i)).toBeInTheDocument();
    expect(f.getByText(/^Outcome \*$/i)).toBeInTheDocument();
    expect(f.getByText(/Premium Outcome/i)).toBeInTheDocument();
  });

  test("renders save changes button", () => {
    renderWithRouter();
    const f = within(form);

    expect(f.getByRole("button", { name: /Save Changes/i })).toBeInTheDocument();
  });

  test("renders cancel button", () => {
    renderWithRouter();
    const f = within(form);

    expect(f.getByRole("button", { name: /Cancel/i })).toBeInTheDocument();
  });

  test("shows required errors when submitting empty form", () => {
    renderWithRouter();
    const f = within(form);

    fireEvent.click(f.getByRole("button", { name: /Save Changes/i }));
    expect(f.getAllByText(/Required/i).length).toBeGreaterThan(0);
  });

  test("shows decline reason field when decline is selected", () => {
    renderWithRouter();
    const f = within(form);

    const comboboxes = f.getAllByRole("combobox");
    fireEvent.mouseDown(comboboxes[4]); // outcome dropdown is the 5th combobox
    fireEvent.click(screen.getByText(/^Decline$/i));

    expect(f.getByText(/Customer Facing Reason for Decline/i)).toBeInTheDocument();
  });
});