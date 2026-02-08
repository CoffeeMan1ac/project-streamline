import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import Navbar from "../Navbar";

describe("Navbar", () => {
  test("renders logo and title", () => {
    render(<Navbar />);
    expect(screen.getByAltText(/Phone Shield logo/i)).toBeInTheDocument();
    expect(screen.getByText(/Phone Shield/i)).toBeInTheDocument();
  });

  test("renders navigation buttons", () => {
    render(<Navbar />);
    expect(screen.getByRole("button", { name: /Home/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Get a Quote/i })).toBeInTheDocument();
  });
});