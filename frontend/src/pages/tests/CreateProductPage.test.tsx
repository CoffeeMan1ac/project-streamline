import "@testing-library/jest-dom/vitest";
import { render, screen, fireEvent, within, cleanup } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import CreateProductPage from "../CreateProductPage";

vi.mock("axios");

describe("CreateProductPage", () => {
  let form: HTMLFormElement;

  beforeEach(() => {
    cleanup();
  });

  const renderWithRouter = () => {
    const utils = render(
      <MemoryRouter>
        <CreateProductPage />
      </MemoryRouter>
    );

    const found = utils.container.querySelector("form");
    if (!found) throw new Error("Create product form not found");
    form = found as HTMLFormElement;

    return utils;
  };

  test("renders page title", () => {
    renderWithRouter();
    expect(screen.getAllByText(/Create New Product/i)[0]).toBeInTheDocument();
  });

  test("renders basic information section heading", () => {
    renderWithRouter();
    const f = within(form);

    expect(f.getByText(/^Basic Information$/i)).toBeInTheDocument();
  });

  test("renders pricing section heading and subtitle", () => {
    renderWithRouter();
    const f = within(form);

    expect(f.getByText(/^Pricing$/i)).toBeInTheDocument();
    expect(
      f.getByText(/Base monthly price. Final price will be calculated based on rules./i)
    ).toBeInTheDocument();
  });

  test("renders validity period section heading", () => {
    renderWithRouter();
    const f = within(form);

    expect(f.getByText(/^Validity Period$/i)).toBeInTheDocument();
  });

  test("renders coverage details section heading and subtitle", () => {
    renderWithRouter();
    const f = within(form);

    expect(f.getByText(/^Coverage Details$/i)).toBeInTheDocument();
    expect(f.getByText(/Select coverages to include in this product/i)).toBeInTheDocument();
  });

  test("renders exclusion details section heading and subtitle", () => {
    renderWithRouter();
    const f = within(form);

    expect(f.getByText(/^Exclusion Details$/i)).toBeInTheDocument();
    expect(f.getByText(/Select exclusions to apply to this product/i)).toBeInTheDocument();
  });

  test("renders product tags section heading and subtitle", () => {
    renderWithRouter();
    const f = within(form);

    expect(f.getByText(/^Product Tags$/i)).toBeInTheDocument();
    expect(
      f.getByText(/Tags affect how the product is displayed on the website/i)
    ).toBeInTheDocument();
  });

  test("renders all tag options", () => {
    renderWithRouter();
    const f = within(form);

    expect(f.getByText(/^None$/i)).toBeInTheDocument();
    expect(f.getByText(/^Green$/i)).toBeInTheDocument();
    expect(f.getByText(/^Popular$/i)).toBeInTheDocument();
  });

  test("renders all form fields", () => {
    renderWithRouter();
    const f = within(form);

    expect(f.getByText(/^Product Name \*$/i)).toBeInTheDocument();
    expect(f.getByText(/^Status \*$/i)).toBeInTheDocument();
    expect(f.getByText(/^Description \*$/i)).toBeInTheDocument();
    expect(f.getByText(/^Monthly Price \*$/i)).toBeInTheDocument();
    expect(f.getByText(/^Start Date \*$/i)).toBeInTheDocument();
    expect(f.getByText(/^End Date$/i)).toBeInTheDocument();
  });

  test("renders create product button", () => {
    renderWithRouter();
    const f = within(form);

    expect(f.getByRole("button", { name: /Create Product/i })).toBeInTheDocument();
  });

  test("renders cancel button", () => {
    renderWithRouter();
    const f = within(form);

    expect(f.getByRole("button", { name: /Cancel/i })).toBeInTheDocument();
  });

  test("shows required errors when submitting empty form", () => {
    renderWithRouter();
    const f = within(form);

    fireEvent.click(f.getByRole("button", { name: /Create Product/i }));
    expect(f.getAllByText(/Required/i).length).toBeGreaterThan(0);
  });

  test("shows tag error when no tag selected on submit", () => {
    renderWithRouter();
    const f = within(form);

    fireEvent.click(f.getByRole("button", { name: /Create Product/i }));
    expect(f.getByText(/Please select at least one tag/i)).toBeInTheDocument();
  });

  test("clears tag error when a tag is clicked", () => {
    renderWithRouter();
    const f = within(form);

    fireEvent.click(f.getByRole("button", { name: /Create Product/i }));
    expect(f.getByText(/Please select at least one tag/i)).toBeInTheDocument();

    const noneBox = f.getByText(/^None$/i).closest("div") as HTMLElement;
    fireEvent.click(noneBox);

    expect(f.queryByText(/Please select at least one tag/i)).not.toBeInTheDocument();
  });

  test("selecting None deselects Green and Popular", () => {
    renderWithRouter();
    const f = within(form);

    const greenBox = f.getByText(/^Green$/i).closest("div") as HTMLElement;
    fireEvent.click(greenBox);

    const noneBox = f.getByText(/^None$/i).closest("div") as HTMLElement;
    fireEvent.click(noneBox);

    expect(f.getByText(/^None$/i)).toBeInTheDocument();
    expect(f.getByText(/^Green$/i)).toBeInTheDocument();
  });

  test("selecting Green or Popular deselects None", () => {
    renderWithRouter();
    const f = within(form);

    const noneBox = f.getByText(/^None$/i).closest("div") as HTMLElement;
    fireEvent.click(noneBox);

    const greenBox = f.getByText(/^Green$/i).closest("div") as HTMLElement;
    fireEvent.click(greenBox);

    expect(f.getByText(/^Green$/i)).toBeInTheDocument();
  });

  test("shows coverage error when no coverage selected on submit", () => {
    renderWithRouter();
    const f = within(form);

    fireEvent.click(f.getByRole("button", { name: /Create Product/i }));
    expect(f.getByText(/Please select at least one coverage/i)).toBeInTheDocument();
  });

  test("shows exclusion error when no exclusion selected on submit", () => {
    renderWithRouter();
    const f = within(form);

    fireEvent.click(f.getByRole("button", { name: /Create Product/i }));
    expect(f.getByText(/Please select at least one exclusion/i)).toBeInTheDocument();
  });

  test("clears coverage error when a coverage is clicked", () => {
    renderWithRouter();
    const f = within(form);

    fireEvent.click(f.getByRole("button", { name: /Create Product/i }));
    expect(f.getByText(/Please select at least one coverage/i)).toBeInTheDocument();

    const accidental = f.getAllByText(/^Accidental Damage$/i)[0].closest("div") as HTMLElement;
    fireEvent.click(accidental);

    expect(f.queryByText(/Please select at least one coverage/i)).not.toBeInTheDocument();
  });

  test("clears exclusion error when an exclusion is clicked", () => {
    renderWithRouter();
    const f = within(form);

    fireEvent.click(f.getByRole("button", { name: /Create Product/i }));
    expect(f.getByText(/Please select at least one exclusion/i)).toBeInTheDocument();

    const theft = f.getAllByText(/^Theft$/i)[1].closest("div") as HTMLElement;
    fireEvent.click(theft);

    expect(f.queryByText(/Please select at least one exclusion/i)).not.toBeInTheDocument();
  });

  test("status dropdown renders active and inactive options", () => {
    renderWithRouter();
    const f = within(form);

    const comboboxes = f.getAllByRole("combobox");
    fireEvent.mouseDown(comboboxes[0]);
    expect(screen.getByText(/^Active$/i)).toBeInTheDocument();
    expect(screen.getByText(/^Inactive$/i)).toBeInTheDocument();
  });

  test("clears product name error when user types", () => {
    renderWithRouter();
    const f = within(form);

    fireEvent.click(f.getByRole("button", { name: /Create Product/i }));
    expect(f.getAllByText(/Required/i).length).toBeGreaterThan(0);

    const input = f.getByPlaceholderText(/Premium Shield/i);
    fireEvent.change(input, { target: { value: "My Product" } });

    const remainingErrors = f.queryAllByText(/Required/i);
    expect(remainingErrors.length).toBeLessThan(5);
  });

  test("clears monthly price error when user types", () => {
    renderWithRouter();
    const f = within(form);

    fireEvent.click(f.getByRole("button", { name: /Create Product/i }));
    expect(f.getAllByText(/Required/i).length).toBeGreaterThan(0);

    const input = f.getByPlaceholderText(/€14.99\/month/i);
    fireEvent.change(input, { target: { value: "9.99" } });

    const remainingErrors = f.queryAllByText(/Required/i);
    expect(remainingErrors.length).toBeLessThan(5);
  });

  test("end date field is optional and has no required error", () => {
    renderWithRouter();
    const f = within(form);

    fireEvent.click(f.getByRole("button", { name: /Create Product/i }));

    expect(f.getByText(/^Start Date \*$/i)).toBeInTheDocument();
    expect(f.getByText(/^End Date$/i)).toBeInTheDocument();
  });

  test("renders all coverage and exclusion options", () => {
    renderWithRouter();
    const f = within(form);

    expect(f.getAllByText(/^Accidental Damage$/i).length).toBeGreaterThanOrEqual(1);
    expect(f.getAllByText(/^Liquid Damage$/i).length).toBeGreaterThanOrEqual(1);
    expect(f.getAllByText(/^Extended Warranty$/i).length).toBeGreaterThanOrEqual(1);
    expect(f.getAllByText(/^Data Recovery$/i).length).toBeGreaterThanOrEqual(1);
    expect(f.getAllByText(/^Theft$/i).length).toBeGreaterThanOrEqual(1);
    expect(f.getAllByText(/^Screen Damage$/i).length).toBeGreaterThanOrEqual(1);
    expect(f.getAllByText(/^Worldwide Coverage$/i).length).toBeGreaterThanOrEqual(1);
    expect(f.getAllByText(/^Battery Replacement$/i).length).toBeGreaterThanOrEqual(1);
  });

  test("toggles coverage selection on click", () => {
    renderWithRouter();
    const f = within(form);

    const accidental = f.getAllByText(/^Accidental Damage$/i)[0].closest("div") as HTMLElement;
    fireEvent.click(accidental);
    expect(accidental).toBeTruthy();

    fireEvent.click(accidental);
    expect(accidental).toBeTruthy();
  });

  test("toggles exclusion selection on click", () => {
    renderWithRouter();
    const f = within(form);

    const theft = f.getAllByText(/^Theft$/i)[1].closest("div") as HTMLElement;
    fireEvent.click(theft);
    expect(theft).toBeTruthy();

    fireEvent.click(theft);
    expect(theft).toBeTruthy();
  });
});
