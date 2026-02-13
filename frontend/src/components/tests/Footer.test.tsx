import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import Footer from "../Footer";

describe("Footer", () => {
  test("renders footer element", () => {
    render(<Footer />);
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  // test("shows copyright and underwriting text", () => {
  //   render(<Footer />);
  //   expect(
  //     screen.getByText(/©\s*2026\s*Phone Shield\. Underwritten by leading global insurers\./i)
  //   ).toBeInTheDocument();
  // });
});
