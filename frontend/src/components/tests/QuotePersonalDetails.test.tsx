import "@testing-library/jest-dom/vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { describe, test, expect, afterEach } from "vitest";
import QuotePersonalDetails from "../QuotePersonalDetails";

describe("QuotePersonalDetails", () => {
  const mockProps = {
    fullName: "John Smith",
    email: "john.smith@email.com",
    phone: "+353 87 123 4567",
    dateOfBirth: "15 May 1992",
    address: "123 Main Street, Dublin 2, Ireland",
  };

  afterEach(() => {
    cleanup();
  });

  test("renders the Personal Details heading", () => {
    render(<QuotePersonalDetails {...mockProps} />);
    expect(screen.getByText("Personal Details")).toBeInTheDocument();
  });

  test("renders the full name label and value", () => {
    render(<QuotePersonalDetails {...mockProps} />);
    expect(screen.getByText("FULL NAME")).toBeInTheDocument();
    expect(screen.getByText("John Smith")).toBeInTheDocument();
  });

  test("renders the email label and value", () => {
    render(<QuotePersonalDetails {...mockProps} />);
    expect(screen.getByText("EMAIL")).toBeInTheDocument();
    expect(screen.getByText("john.smith@email.com")).toBeInTheDocument();
  });

  test("renders the phone label and value", () => {
    render(<QuotePersonalDetails {...mockProps} />);
    expect(screen.getByText("PHONE")).toBeInTheDocument();
    expect(screen.getByText("+353 87 123 4567")).toBeInTheDocument();
  });

  test("renders the date of birth label and value", () => {
    render(<QuotePersonalDetails {...mockProps} />);
    expect(screen.getByText("DATE OF BIRTH")).toBeInTheDocument();
    expect(screen.getByText("15 May 1992")).toBeInTheDocument();
  });

  test("renders the address label and value", () => {
    render(<QuotePersonalDetails {...mockProps} />);
    expect(screen.getByText("ADDRESS")).toBeInTheDocument();
    expect(screen.getByText("123 Main Street, Dublin 2, Ireland")).toBeInTheDocument();
  });

  test("renders all passed props correctly", () => {
    render(<QuotePersonalDetails {...mockProps} />);
    expect(screen.getByText(mockProps.fullName)).toBeInTheDocument();
    expect(screen.getByText(mockProps.email)).toBeInTheDocument();
    expect(screen.getByText(mockProps.phone)).toBeInTheDocument();
    expect(screen.getByText(mockProps.dateOfBirth)).toBeInTheDocument();
    expect(screen.getByText(mockProps.address)).toBeInTheDocument();
  });
});
