import "@testing-library/jest-dom/vitest";
import { render, screen, within } from "@testing-library/react";
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
    expect(f.getByText(/Conditions/i)).toBeInTheDocument();
    expect(f.getByText(/Condition Logic/i)).toBeInTheDocument();
    expect(f.getByText(/Outcome/i)).toBeInTheDocument();
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
});
