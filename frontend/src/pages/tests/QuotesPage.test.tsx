import "@testing-library/jest-dom/vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import QuotesPage from "../QuotesPage";

// branch 71
describe("QuotesPage", () => {
  test("renders main heading and subtitle", () => {
    render(<QuotesPage />);
    expect(screen.getByRole("heading", { name: /Get Your Quote/i })).toBeInTheDocument();
    expect(screen.getByText(/Fill in your details below to receive an instant quote/i)).toBeInTheDocument();
  });

  test("renders section headings", () => {
    render(<QuotesPage />);
    expect(screen.getByRole("heading", { name: /Personal Details/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Phone Details/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Coverage Type/i })).toBeInTheDocument();
  });

  test("renders all personal detail form fields", () => {
    render(<QuotesPage />);
    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone Number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Date of Birth/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Address Line 1/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Address Line 2/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/City/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Postal Code/i)).toBeInTheDocument();
  });

  test("renders dropdown selects with labels", () => {
    render(<QuotesPage />);
    expect(screen.getByLabelText(/Country/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone Make/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone Model/i)).toBeInTheDocument();
    expect(screen.getByRole("combobox", { name: /Select Coverage/i })).toBeInTheDocument();  });

  test("renders submit button with correct text", () => {
    render(<QuotesPage />);
    expect(screen.getByRole("button", { name: /Get Quote/i })).toBeInTheDocument();
  });

  test("renders coverage options with pricing", () => {
    render(<QuotesPage />);
    expect(screen.getByText(/Premium Shield - €14\.99\/month/i)).toBeInTheDocument();
    expect(screen.getByText(/Basic Cover - €9\.99\/month/i)).toBeInTheDocument();
    expect(screen.getByText(/Ultimate Protection - €24\.99\/month/i)).toBeInTheDocument();
  });

  // branch 72 testing
  test("shows required errors when submitting empty form", () => {
    render(<QuotesPage />);
    fireEvent.click(screen.getByRole("button", { name: /Get Quote/i }));
    expect(screen.getAllByText(/Required/i).length).toBeGreaterThan(0);
  });

  test("shows email validation error for invalid email", () => {
    render(<QuotesPage />);

    fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: "Test" } });
    fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: "User" } });
    fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: "invalid" } });
    fireEvent.change(screen.getByLabelText(/Phone Number/i), { target: { value: "1234567890" } });
    fireEvent.change(screen.getByLabelText(/Date of Birth/i), { target: { value: "01/01/2000" } });
    fireEvent.change(screen.getByLabelText(/Address Line 1/i), { target: { value: "123 Street" } });
    fireEvent.change(screen.getByLabelText(/City/i), { target: { value: "Dublin" } });
    fireEvent.change(screen.getByLabelText(/Postal Code/i), { target: { value: "D01 ABC" } });
    

    fireEvent.mouseDown(screen.getByLabelText(/Country/i));
    fireEvent.click(screen.getByText(/Ireland/i));
    fireEvent.mouseDown(screen.getByLabelText(/Phone Make/i));
    fireEvent.click(screen.getByText(/Apple/i));
    fireEvent.mouseDown(screen.getByLabelText(/Phone Model/i));
    fireEvent.click(screen.getByText(/iPhone 15/i));
    fireEvent.mouseDown(screen.getByRole("combobox", { name: /Select Coverage/i }));
    fireEvent.click(screen.getByText(/Premium Shield/i));
    
    fireEvent.click(screen.getByRole("button", { name: /Get Quote/i }));
    
    expect(screen.getByText(/Valid email required/i)).toBeInTheDocument();
});

  // branch 75
  test("shows loading text when form is submitted", async () => {
    render(<QuotesPage />);
    fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: "Joe" } });
    fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: "Mama" } });
    fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: "joe@example.com" } });
    fireEvent.change(screen.getByLabelText(/Phone Number/i), { target: { value: "1234567890" } });
    fireEvent.change(screen.getByLabelText(/Date of Birth/i), { target: { value: "01/01/1790" } });
    fireEvent.change(screen.getByLabelText(/Address Line 1/i), { target: { value: "123 o'connell st" } });
    fireEvent.change(screen.getByLabelText(/City/i), { target: { value: "Dublin" } });
    fireEvent.change(screen.getByLabelText(/Postal Code/i), { target: { value: "12345" } });
    fireEvent.mouseDown(screen.getByLabelText(/Country/i));
    fireEvent.click(screen.getByText(/Ireland/i));
    fireEvent.mouseDown(screen.getByLabelText(/Phone Make/i));
    fireEvent.click(screen.getByText(/Apple/i));
    fireEvent.mouseDown(screen.getByLabelText(/Phone Model/i));
    fireEvent.click(screen.getByText(/iPhone 15/i));
    fireEvent.mouseDown(screen.getByRole("combobox", { name: /Select Coverage/i }));
    fireEvent.click(screen.getByText(/Premium Shield/i));
    
    fireEvent.click(screen.getByRole("button", { name: /Get Quote/i }));
    
    await waitFor(() => {
      expect(screen.getByText(/Submitting.../i)).toBeInTheDocument();
    });
  });

  test("disables form fields during submission", async () => {
    render(<QuotesPage />);
    
    fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: "Test" } });
    fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: "User" } });
    fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: "test@test.com" } });
    fireEvent.change(screen.getByLabelText(/Phone Number/i), { target: { value: "1234567890" } });
    fireEvent.change(screen.getByLabelText(/Date of Birth/i), { target: { value: "01/01/2000" } });
    fireEvent.change(screen.getByLabelText(/Address Line 1/i), { target: { value: "123 Street" } });
    fireEvent.change(screen.getByLabelText(/City/i), { target: { value: "Dublin" } });
    fireEvent.change(screen.getByLabelText(/Postal Code/i), { target: { value: "D01 ABC" } });
    
    fireEvent.mouseDown(screen.getByLabelText(/Country/i));
    fireEvent.click(screen.getByText(/Ireland/i));
    fireEvent.mouseDown(screen.getByLabelText(/Phone Make/i));
    fireEvent.click(screen.getByText(/Apple/i));
    fireEvent.mouseDown(screen.getByLabelText(/Phone Model/i));
    fireEvent.click(screen.getByText(/iPhone 15/i));
    fireEvent.mouseDown(screen.getByRole("combobox", { name: /Select Coverage/i }));    
    fireEvent.click(screen.getByText(/Premium Shield/i));
  
    fireEvent.click(screen.getByRole("button", { name: /Get Quote/i }));
    
    await waitFor(() => {
        expect(screen.getByRole("button", { name: /Submitting.../i })).toBeDisabled();
    }, { timeout: 2000 });
});
});
