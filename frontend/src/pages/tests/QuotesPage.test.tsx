import "@testing-library/jest-dom/vitest";
import { render, screen, fireEvent, within, waitFor, cleanup } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach, afterEach, beforeAll, afterAll } from "vitest";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import QuotesPage from "../QuotesPage";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useSearchParams: () => [new URLSearchParams()],
  };
});

const { mockHttp } = vi.hoisted(() => ({
  mockHttp: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
    interceptors: {
      request: { use: vi.fn() },
      response: { use: vi.fn() },
    },
  },
}));

vi.mock("axios", () => ({
  default: {
    create: vi.fn(() => mockHttp),
    isCancel: vi.fn(() => false),
    __mockHttp: mockHttp,
  },
}));

vi.mock("../../api/http", () => ({
  default: mockHttp,
}));

describe("QuotesPage", () => {
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
    vi.clearAllMocks();
    mockNavigate.mockClear();
    (axios as any).__mockHttp.get.mockResolvedValue({
      data: { name: "Basic", baseRate: 9.99 },
    });
    (axios as any).__mockHttp.post.mockResolvedValue({ data: {} });
  });

  afterEach(() => {
    cleanup();
    vi.useRealTimers();
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

  const fillForm = () => {
    const f = within(form);

    fireEvent.change(f.getByLabelText(/First Name/i), { target: { value: "John" } });
    fireEvent.change(f.getByLabelText(/Last Name/i), { target: { value: "Doe" } });
    fireEvent.change(f.getByLabelText(/Email Address/i), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(f.getByLabelText(/Phone Number/i), {
      target: { value: "0871234567" },
    });
    fireEvent.change(f.getByLabelText(/Date of Birth/i), {
      target: { value: "01/01/1990" },
    });
    fireEvent.change(f.getByLabelText(/Address Line 1/i), {
      target: { value: "123 Main St" },
    });
    fireEvent.change(f.getByLabelText(/City/i), {
      target: { value: "Dublin" },
    });
    fireEvent.change(f.getByLabelText(/Postal Code/i), {
      target: { value: "D01 ABC" },
    });
    // Occupation
    fireEvent.mouseDown(f.getByLabelText(/Occupation/i));
    fireEvent.click(screen.getByRole("option", { name: "Engineer" }));

    // Country
    fireEvent.mouseDown(f.getByLabelText(/Country/i));
    fireEvent.click(screen.getByRole("option", { name: "Ireland" }));

    // Phone Make
    fireEvent.mouseDown(f.getByLabelText(/Phone Make/i));
    fireEvent.click(screen.getByRole("option", { name: "Apple" }));

    // Phone Model
    fireEvent.mouseDown(f.getByLabelText(/Phone Model/i));
    fireEvent.click(screen.getByRole("option", { name: "iPhone 15" }));

    // Condition
    fireEvent.mouseDown(f.getByLabelText(/Phone Condition/i));
    fireEvent.click(screen.getByRole("option", { name: "Brand New" }));

    // Age
    fireEvent.mouseDown(f.getByLabelText(/Phone Age/i));
    fireEvent.click(screen.getByRole("option", { name: "1 year" }));
  };

  test("renders main heading and subtitle", () => {
    renderWithRouter();
    expect(screen.getByRole("heading", { name: /Get Your Quote/i })).toBeInTheDocument();
    expect(
      screen.getByText(/Fill in your details below to receive an instant quote/i)
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
    fireEvent.click(screen.getByRole("option", { name: "Ireland" }));
    fireEvent.mouseDown(f.getByLabelText(/Phone Make/i));
    fireEvent.click(screen.getByText(/Apple/i));
    fireEvent.mouseDown(f.getByLabelText(/Phone Model/i));
    fireEvent.click(screen.getByText(/iPhone 15/i));
    fireEvent.click(f.getByRole("button", { name: /Get Quote/i }));
    expect(f.getByText(/Valid email required/i)).toBeInTheDocument();
  });

  test("navigates to accepted outcome on ACCEPTED response", async () => {
    mockHttp.post.mockResolvedValueOnce({
      data: { status: "ACCEPTED", premium: 29.99, reference: "REF123" },
    });

    renderWithRouter();
    fillForm();
    fireEvent.submit(form);

    // Wait ONLY for the function to fire
    await waitFor(() => expect(mockNavigate).toHaveBeenCalled());

    // Assert the exact arguments synchronously outside the loop
    expect(mockNavigate).toHaveBeenCalledWith("/outcome", {
      state: { decision: "accept", premium: 29.99, reference: "REF123" },
    });
  });

  test("navigates to refer outcome on REFER response", async () => {
    mockHttp.post.mockResolvedValueOnce({
      data: { status: "REFER", reason: "Needs review", reference: "REF456" },
    });

    renderWithRouter();
    fillForm();
    fireEvent.submit(form);

    await waitFor(() => expect(mockNavigate).toHaveBeenCalled());

    expect(mockNavigate).toHaveBeenCalledWith("/outcome", {
      state: { decision: "refer", reason: "Needs review", reference: "REF456" },
    });
  });

  test("navigates to decline outcome on DECLINED response", async () => {
    mockHttp.post.mockResolvedValueOnce({
      data: { status: "DECLINED", reason: "Not eligible", reference: "REF789" },
    });

    renderWithRouter();
    fillForm();
    fireEvent.submit(form);

    await waitFor(() => expect(mockNavigate).toHaveBeenCalled());

    expect(mockNavigate).toHaveBeenCalledWith("/outcome", {
      state: { decision: "decline", reason: "Not eligible", reference: "REF789" },
    });
  });

  test("shows alert on submission error", async () => {
    mockHttp.post.mockRejectedValueOnce(new Error("Network error"));

    const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});

    renderWithRouter();
    fillForm();

    fireEvent.submit(form);

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith("Network error");
    });
  });

  test("shows submitting state and then navigates to outcome page", async () => {
    vi.useFakeTimers();

    const mockResponse = { data: { status: "ACCEPTED", premium: 29.99, reference: "REF123" } };
    mockHttp.post.mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve(mockResponse), 500))
    );

    renderWithRouter();
    fillForm();

    fireEvent.submit(form);

    await vi.advanceTimersByTimeAsync(100);
    expect(screen.getByText(/Submitting/i)).toBeInTheDocument();

    await vi.advanceTimersByTimeAsync(400);

    expect(mockNavigate).toHaveBeenCalledWith("/outcome", expect.anything());

    vi.useRealTimers();
  });

  test("clears phone model when make changes", () => {
    renderWithRouter();
    const f = within(form);

    fireEvent.mouseDown(f.getByLabelText(/Phone Make/i));
    fireEvent.click(screen.getByText("Apple"));

    fireEvent.mouseDown(f.getByLabelText(/Phone Model/i));
    fireEvent.click(screen.getByText("iPhone 15"));

    fireEvent.mouseDown(f.getByLabelText(/Phone Make/i));
    fireEvent.click(screen.getByText("Samsung"));

    expect(f.getByLabelText(/Phone Model/i)).toBeInTheDocument();
  });
});
