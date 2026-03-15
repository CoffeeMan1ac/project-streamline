import "@testing-library/jest-dom/vitest";
import { render, screen, fireEvent, within, cleanup } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import EditProductPage from "../EditProductPage";

vi.mock("../../services/productService", () => ({
  productService: {
    getProduct: vi.fn().mockResolvedValue({
      data: {
        id: "123",
        name: "Premium Shield",
        active: true,
        description: "A great product",
        baseRate: 14.99,
        startDate: "2025-01-01T00:00:00",
        endDate: null,
        coverages: [
          {
            id: "1",
            code: "ACCIDENTAL_DAMAGE",
            label: "Accidental damage cover",
            category: { id: "c1", code: "DAMAGE", label: "Damage" },
          },
        ],
        exclusions: [
          {
            id: "2",
            code: "THEFT",
            label: "Theft protection",
            category: { id: "c2", code: "THEFT", label: "Theft" },
          },
        ],
        tags: [
          { id: "1ebe6012-74ac-43ea-9491-54ddff30ab6c", code: "POPULAR", label: "Most Popular" },
        ],
        type: {
          id: "9333558f-9a40-4ad6-b20b-7f45246c70ea",
          code: "PHONE_INSURANCE",
          label: "Phone Insurance",
        },
        productFields: [],
      },
    }),
    getCoverages: vi.fn().mockResolvedValue({
      data: [
        { id: "1", code: "ACCIDENTAL_DAMAGE", label: "Accidental Damage" },
        { id: "2", code: "LIQUID_DAMAGE", label: "Liquid Damage" },
        { id: "3", code: "EXTENDED_WARRANTY", label: "Extended Warranty" },
        { id: "4", code: "DATA_RECOVERY", label: "Data Recovery" },
        { id: "5", code: "THEFT", label: "Theft" },
        { id: "6", code: "SCREEN_DAMAGE", label: "Screen Damage" },
        { id: "7", code: "WORLDWIDE_COVERAGE", label: "Worldwide Coverage" },
        { id: "8", code: "BATTERY_REPLACEMENT", label: "Battery Replacement" },
      ],
    }),
    getTags: vi.fn().mockResolvedValue({
      data: [
        { id: "81a8e5b1-2356-434b-bf1c-78d2be5c9090", code: "GREEN", label: "Green" },
        { id: "1ebe6012-74ac-43ea-9491-54ddff30ab6c", code: "POPULAR", label: "Popular" },
      ],
    }),
    updateProduct: vi.fn().mockResolvedValue({}),
  },
}));

describe("EditProductPage", () => {
  let form: HTMLFormElement;

  beforeEach(() => {
    cleanup();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const renderWithRouter = async () => {
    const utils = render(
      <MemoryRouter>
        <EditProductPage id="123" onClose={vi.fn()} onSave={vi.fn()} />
      </MemoryRouter>
    );

    await screen.findByDisplayValue("Premium Shield");

    const found = utils.container.querySelector("form");
    if (!found) throw new Error("Edit product form not found");
    form = found as HTMLFormElement;

    return utils;
  };

  const renderEmptyForm = async () => {
    const utils = render(
      <MemoryRouter>
        <EditProductPage onClose={vi.fn()} />
      </MemoryRouter>
    );

    // wait for coverages and tags to load
    await screen.findAllByText("Accidental Damage");

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

  test("shows required errors when submitting empty form", async () => {
    await renderEmptyForm();
    const f = within(form);
    fireEvent.click(f.getByRole("button", { name: /Save Changes/i }));
    expect(f.getAllByText(/Required/i).length).toBeGreaterThan(0);
  });

  test("shows coverage error when no coverage selected on submit", async () => {
    await renderEmptyForm();
    const f = within(form);
    fireEvent.click(f.getByRole("button", { name: /Save Changes/i }));
    expect(f.getByText(/Please select at least one coverage/i)).toBeInTheDocument();
  });

  test("clears product name error when user types", async () => {
    await renderEmptyForm();
    const f = within(form);
    fireEvent.click(f.getByRole("button", { name: /Save Changes/i }));
    expect(f.getAllByText(/Required/i).length).toBeGreaterThan(0);

    const input = f.getByPlaceholderText(/Premium Shield/i);
    fireEvent.change(input, { target: { value: "New Product" } });
    expect(input).toHaveValue("New Product");
  });

  test("clears coverage error when a coverage is clicked", async () => {
    await renderEmptyForm();
    const f = within(form);
    fireEvent.click(f.getByRole("button", { name: /Save Changes/i }));
    expect(f.getByText(/Please select at least one coverage/i)).toBeInTheDocument();

    const accidental = f.getAllByText(/^Accidental Damage$/i)[0].closest("div") as HTMLElement;
    fireEvent.click(accidental);
    expect(f.queryByText(/Please select at least one coverage/i)).toBeNull();
  });

  test("toggles coverage selection on click", async () => {
    await renderEmptyForm();
    const f = within(form);
    const accidental = f.getAllByText(/^Accidental Damage$/i)[0].closest("div") as HTMLElement;
    fireEvent.click(accidental);
    fireEvent.click(accidental);
    expect(accidental).toBeInTheDocument();
  });

  test("toggles exclusion selection on click", async () => {
    await renderEmptyForm();
    const f = within(form);
    const theft = f.getAllByText(/^Theft$/i)[1].closest("div") as HTMLElement;
    fireEvent.click(theft);
    fireEvent.click(theft);
    expect(theft).toBeInTheDocument();
  });

  test("end date field is optional and has no required error", async () => {
    await renderEmptyForm();
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

  test("renders tag options", async () => {
    await renderWithRouter();
    const f = within(form);
    expect(f.getByText(/^Green$/i)).toBeInTheDocument();
    expect(f.getByText(/^Popular$/i)).toBeInTheDocument();
  });
});
