import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import QuotesPage from "../QuotesPage";

describe("QuotesPage", () => {
  test("renders form heading", () => {
    render(<QuotesPage />);
    expect(screen.getByText(/Get Your Quote/i)).toBeInTheDocument();
  });

  test("renders submit button", () => {
    render(<QuotesPage />);
    expect(screen.getByRole("button", { name: /Get Quote/i })).toBeInTheDocument();
  });
});