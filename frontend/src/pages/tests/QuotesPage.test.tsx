import "@testing-library/jest-dom/vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import QuotesPage from "../QuotesPage";

vi.mock("axios", () => {
  const mockHttp = {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
    interceptors: {
      response: {
        use: vi.fn(),
      },
    },
  };

  return {
    default: {
      create: vi.fn(() => mockHttp),
      isCancel: vi.fn(() => false),
      __mockHttp: mockHttp,
    },
  };
});

describe("QuotesPage", () => {
  let form: HTMLFormElement;

  beforeEach(() => {
    vi.clearAllMocks();
    (axios as any).__mockHttp.get.mockResolvedValue({
      data: { name: "Basic", baseRate: 9.99 },
    });
    (axios as any).__mockHttp.post.mockResolvedValue({ data: {} });
  });

  const renderWithRouter = () => {
    const utils = render(
      <MemoryRouter>
        <QuotesPage />
      </MemoryRouter>
    );

    const found = utils.container.querySelector("form");
    if (!found) throw new Error("Quotes form not found");
    form = found as HTMLFormElement;

    return utils;
  };

  test("renders main heading and subtitle", () => {
    renderWithRouter();

    expect(screen.getAllByRole("heading", { name: /Get Your Quote/i })[0]).toBeInTheDocument();

    expect(
      screen.getAllByText(/Fill in your details below to receive an instant quote/i)[0]
    ).toBeInTheDocument();
  });

  test("renders section headings", () => {
    renderWithRouter();
    const f = within(form);

    expect(f.getByRole("heading", { name: /Personal Details/i })).toBeInTheDocument();
    expect(f.getByRole("heading", { name: /Phone Details/i })).toBeInTheDocument();
  });

  test("renders all personal detail form fields", () => {
    renderWithRouter();
    const f = within(form);

    expect(f.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(f.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(f.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(f.getByLabelText(/Phone Number/i)).toBeInTheDocument();
    expect(f.getByLabelText(/Date of Birth/i)).toBeInTheDocument();
    expect(f.getByLabelText(/Address Line 1/i)).toBeInTheDocument();
    expect(f.getByLabelText(/Address Line 2/i)).toBeInTheDocument();
    expect(f.getByLabelText(/City/i)).toBeInTheDocument();
    expect(f.getByLabelText(/Postal Code/i)).toBeInTheDocument();
  });

  test("renders dropdown selects with labels", () => {
    renderWithRouter();
    const f = within(form);

    expect(f.getByLabelText(/Country/i)).toBeInTheDocument();
    expect(f.getByLabelText(/Phone Make/i)).toBeInTheDocument();
    expect(f.getByLabelText(/Phone Model/i)).toBeInTheDocument();
  });

  test("renders submit button with correct text", () => {
    renderWithRouter();
    const f = within(form);

    expect(f.getByRole("button", { name: /Get Quote/i })).toBeInTheDocument();
  });

  test("shows required errors when submitting empty form", () => {
    renderWithRouter();
    const f = within(form);

    fireEvent.click(f.getByRole("button", { name: /Get Quote/i }));
    expect(f.getAllByText(/Required/i).length).toBeGreaterThan(0);
  });

  test("shows email validation error for invalid email", () => {
    renderWithRouter();
    const f = within(form);

    fireEvent.change(f.getByLabelText(/First Name/i), { target: { value: "Test" } });
    fireEvent.change(f.getByLabelText(/Last Name/i), { target: { value: "User" } });
    fireEvent.change(f.getByLabelText(/Email Address/i), { target: { value: "invalid" } });
    fireEvent.change(f.getByLabelText(/Phone Number/i), { target: { value: "1234567890" } });
    fireEvent.change(f.getByLabelText(/Date of Birth/i), { target: { value: "01/01/2000" } });
    fireEvent.change(f.getByLabelText(/Address Line 1/i), { target: { value: "123 Street" } });
    fireEvent.change(f.getByLabelText(/City/i), { target: { value: "Dublin" } });
    fireEvent.change(f.getByLabelText(/Postal Code/i), { target: { value: "D01 ABC" } });

    fireEvent.mouseDown(f.getByLabelText(/Country/i));
    fireEvent.click(screen.getByText(/Ireland/i));

    fireEvent.mouseDown(f.getByLabelText(/Phone Make/i));
    fireEvent.click(screen.getByText(/Apple/i));

    fireEvent.mouseDown(f.getByLabelText(/Phone Model/i));
    fireEvent.click(screen.getByText(/iPhone 15/i));

    fireEvent.click(f.getByRole("button", { name: /Get Quote/i }));

    expect(f.getByText(/Valid email required/i)).toBeInTheDocument();
  });
});

// test("shows loading text when form is submitted", async () => {
//   renderWithRouter();
//   const f = within(form);

//   fireEvent.change(f.getByLabelText(/First Name/i), { target: { value: "Joe" } });
//   fireEvent.change(f.getByLabelText(/Last Name/i), { target: { value: "Mama" } });
//   fireEvent.change(f.getByLabelText(/Email Address/i), { target: { value: "joe@example.com" } });
//   fireEvent.change(f.getByLabelText(/Phone Number/i), { target: { value: "1234567890" } });
//   fireEvent.change(f.getByLabelText(/Date of Birth/i), { target: { value: "01/01/1790" } });
//   fireEvent.change(f.getByLabelText(/Address Line 1/i), { target: { value: "123 o'connell st" } });
//   fireEvent.change(f.getByLabelText(/City/i), { target: { value: "Dublin" } });
//   fireEvent.change(f.getByLabelText(/Postal Code/i), { target: { value: "12345" } });

//   fireEvent.mouseDown(f.getByLabelText(/Country/i));
//   fireEvent.click(f.getByText(/Ireland/i));

//   fireEvent.mouseDown(f.getByLabelText(/Phone Make/i));
//   fireEvent.click(f.getByText(/Apple/i));

//   fireEvent.mouseDown(f.getByLabelText(/Phone Model/i));
//   fireEvent.click(f.getByText(/iPhone 15/i));

//   fireEvent.click(f.getByRole("button", { name: /Get Quote/i }));

//   await waitFor(() => {
//     // depends on your UI; if button text changes, keep it scoped
//     expect(f.getByText(/Submitting.../i)).toBeInTheDocument();
//   });
// });

// test("disables form fields during submission", async () => {
//   renderWithRouter();
//   const f = within(form);

//   fireEvent.change(f.getByLabelText(/First Name/i), { target: { value: "Test" } });
//   fireEvent.change(f.getByLabelText(/Last Name/i), { target: { value: "User" } });
//   fireEvent.change(f.getByLabelText(/Email Address/i), { target: { value: "test@test.com" } });
//   fireEvent.change(f.getByLabelText(/Phone Number/i), { target: { value: "1234567890" } });
//   fireEvent.change(f.getByLabelText(/Date of Birth/i), { target: { value: "01/01/2000" } });
//   fireEvent.change(f.getByLabelText(/Address Line 1/i), { target: { value: "123 Street" } });
//   fireEvent.change(f.getByLabelText(/City/i), { target: { value: "Dublin" } });
//   fireEvent.change(f.getByLabelText(/Postal Code/i), { target: { value: "D01 ABC" } });

//   fireEvent.mouseDown(f.getByLabelText(/Country/i));
//   fireEvent.click(screen.getByText(/Ireland/i));

//   fireEvent.mouseDown(f.getByLabelText(/Phone Make/i));
//   fireEvent.click(screen.getByText(/Apple/i));

//   fireEvent.mouseDown(f.getByLabelText(/Phone Model/i));
//   fireEvent.click(screen.getByText(/iPhone 15/i));

//   fireEvent.click(f.getByRole("button", { name: /Get Quote/i }));

//   await waitFor(() => {
//     expect(f.getByRole("button", { name: /Submitting.../i })).toBeDisabled();
//   });
// });
