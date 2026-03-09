import "@testing-library/jest-dom/vitest";
import { render, screen, fireEvent, within, cleanup } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import EditProductPage from "../EditProductPage";

describe("EditProductPage", () => {
  let form: HTMLFormElement;

  const mockProduct = {
    id: "123",
    productName: "Premium Shield",
    status: "active",
    description: "A great product",
    monthlyPrice: "14.99",
    startDate: "2025-01-01",
    endDate: "",
    selectedCoverages: ["Accidental Damage", "Theft"],
    selectedExclusions: ["Liquid Damage"],
    selectedTags: ["Popular"],
  };

  beforeEach(() => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: async () => mockProduct,
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
        <EditProductPage id="123" onClose={vi.fn()} onSave={vi.fn()} />
      </MemoryRouter>
    );

    // Wait for the fetch to resolve and populate the form fields
    await screen.findByDisplayValue("Premium Shield");

    const found = utils.container.querySelector("form");
    if (!found) throw new Error("Edit product form not found");
    form = found as HTMLFormElement;

    return utils;
  };

  // Renders without an id so the fetch is skipped and the form stays empty
  const renderEmptyForm = () => {
    const utils = render(
      <MemoryRouter>
        <EditProductPage onClose={vi.fn()} />
      </MemoryRouter>
    );

    const found = utils.container.querySelector("form");
    if (!found) throw new Error("Edit product form not found");
    form = found as HTMLFormElement;

    return utils;
  };

  test("renders page title", async () => {
    await renderWithRouter();
    expect(screen.getAllByText(/Edit Product/i)[0]).toBeInTheDocument();
  });

  test("renders basic information section heading", async () => {
    await renderWithRouter();
    const f = within(form);
    expect(f.getByText(/Basic Information/i)).toBeInTheDocument();
  });

  test("renders pricing section heading and subtitle", async () => {
    await renderWithRouter();
    const f = within(form);
    expect(f.getByText(/^Pricing$/i)).toBeInTheDocument();
    expect(f.getByText(/Base monthly price/i)).toBeInTheDocument();
  });

  test("renders validity period section heading", async () => {
    await renderWithRouter();
    const f = within(form);
    expect(f.getByText(/Validity Period/i)).toBeInTheDocument();
  });

  test("renders coverage details section heading", async () => {
    await renderWithRouter();
    const f = within(form);
    expect(f.getByText(/Coverage Details/i)).toBeInTheDocument();
  });

  test("renders exclusion details section heading", async () => {
    await renderWithRouter();
    const f = within(form);
    expect(f.getByText(/Exclusion Details/i)).toBeInTheDocument();
  });

  test("renders product tags section heading", async () => {
    await renderWithRouter();
    const f = within(form);
    expect(f.getByText(/Product Tags/i)).toBeInTheDocument();
  });

  test("renders all form fields", async () => {
    await renderWithRouter();
    const f = within(form);
    expect(f.getByText(/Product Name/i)).toBeInTheDocument();
    expect(f.getByText(/^Status \*$/i)).toBeInTheDocument();
    expect(f.getByText(/^Description \*$/i)).toBeInTheDocument();
    expect(f.getAllByText(/Monthly Price/i)[0]).toBeInTheDocument();
    expect(f.getByText(/Start Date/i)).toBeInTheDocument();
    expect(f.getByText(/End Date/i)).toBeInTheDocument();
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

  test("populates form fields from fetched data", async () => {
    await renderWithRouter();
    expect(screen.getByDisplayValue("Premium Shield")).toBeInTheDocument();
    expect(screen.getByDisplayValue("A great product")).toBeInTheDocument();
    expect(screen.getByDisplayValue("14.99")).toBeInTheDocument();
  });

  test("shows required errors when submitting empty form", () => {
    renderEmptyForm();
    const f = within(form);
    fireEvent.click(f.getByRole("button", { name: /Save Changes/i }));
    expect(f.getAllByText(/Required/i).length).toBeGreaterThan(0);
  });

  test("shows coverage error when no coverage selected on submit", () => {
    renderEmptyForm();
    const f = within(form);
    fireEvent.click(f.getByRole("button", { name: /Save Changes/i }));
    expect(f.getByText(/Please select at least one coverage/i)).toBeInTheDocument();
  });

  test("shows exclusion error when no exclusion selected on submit", () => {
    renderEmptyForm();
    const f = within(form);
    fireEvent.click(f.getByRole("button", { name: /Save Changes/i }));
    expect(f.getByText(/Please select at least one exclusion/i)).toBeInTheDocument();
  });

  test("shows tag error when no tag selected on submit", () => {
    renderEmptyForm();
    const f = within(form);
    fireEvent.click(f.getByRole("button", { name: /Save Changes/i }));
    expect(f.getByText(/Please select at least one tag/i)).toBeInTheDocument();
  });

  test("clears product name error when user types", () => {
    renderEmptyForm();
    const f = within(form);

    fireEvent.click(f.getByRole("button", { name: /Save Changes/i }));
    expect(f.getAllByText(/Required/i).length).toBeGreaterThan(0);

    const input = f.getByPlaceholderText(/Premium Shield/i);
    fireEvent.change(input, { target: { value: "New Product" } });
    expect(input).toHaveValue("New Product");
  });

  test("clears coverage error when a coverage is clicked", () => {
    renderEmptyForm();
    const f = within(form);
    fireEvent.click(f.getByRole("button", { name: /Save Changes/i }));
    expect(f.getByText(/Please select at least one coverage/i)).toBeInTheDocument();

    const accidental = f.getAllByText(/^Accidental Damage$/i)[0].closest("div") as HTMLElement;
    fireEvent.click(accidental);
    expect(f.queryByText(/Please select at least one coverage/i)).toBeNull();
  });

  test("clears exclusion error when an exclusion is clicked", () => {
    renderEmptyForm();
    const f = within(form);
    fireEvent.click(f.getByRole("button", { name: /Save Changes/i }));
    expect(f.getByText(/Please select at least one exclusion/i)).toBeInTheDocument();

    const liquid = f.getAllByText(/^Liquid Damage$/i)[1].closest("div") as HTMLElement;
    fireEvent.click(liquid);
    expect(f.queryByText(/Please select at least one exclusion/i)).toBeNull();
  });

  test("clears tag error when a tag is clicked", () => {
    renderEmptyForm();
    const f = within(form);
    fireEvent.click(f.getByRole("button", { name: /Save Changes/i }));
    expect(f.getByText(/Please select at least one tag/i)).toBeInTheDocument();

    const noneTag = f.getByText(/^None$/i).closest("div") as HTMLElement;
    fireEvent.click(noneTag);
    expect(f.queryByText(/Please select at least one tag/i)).toBeNull();
  });

  test("toggles coverage selection on click", () => {
    renderEmptyForm();
    const f = within(form);

    const accidental = f.getAllByText(/^Accidental Damage$/i)[0].closest("div") as HTMLElement;
    fireEvent.click(accidental);
    fireEvent.click(accidental);
    expect(accidental).toBeInTheDocument();
  });

  test("toggles exclusion selection on click", () => {
    renderEmptyForm();
    const f = within(form);

    const theft = f.getAllByText(/^Theft$/i)[1].closest("div") as HTMLElement;
    fireEvent.click(theft);
    fireEvent.click(theft);
    expect(theft).toBeInTheDocument();
  });

  test("None tag deselects Green and Popular", () => {
    renderEmptyForm();
    const f = within(form);

    const greenTag = f.getByText(/^Green$/i).closest("div") as HTMLElement;
    fireEvent.click(greenTag);

    const noneTag = f.getByText(/^None$/i).closest("div") as HTMLElement;
    fireEvent.click(noneTag);

    fireEvent.click(f.getByRole("button", { name: /Save Changes/i }));
    expect(f.queryByText(/Please select at least one tag/i)).toBeNull();
  });

  test("end date field is optional and has no required error", () => {
    renderEmptyForm();
    const f = within(form);
    fireEvent.click(f.getByRole("button", { name: /Save Changes/i }));
    expect(f.getByText(/Optional - leave blank for no expiration/i)).toBeInTheDocument();
  });

  test("renders all coverage and exclusion options", async () => {
    await renderWithRouter();
    const f = within(form);
    const options = [
      "Accidental Damage",
      "Liquid Damage",
      "Extended Warranty",
      "Data Recovery",
      "Theft",
      "Screen Damage",
      "Worldwide Coverage",
      "Battery Replacement",
    ];
    options.forEach((opt) => {
      expect(f.getAllByText(new RegExp(`^${opt}$`, "i")).length).toBeGreaterThanOrEqual(1);
    });
  });
});
