import { describe, expect, test, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
import HeroSection from "../HeroSection";

expect.extend(matchers);

afterEach(() => {
  cleanup();
});

describe("HeroSection", () => {
  test("renders heading and subtitle", () => {
    render(<HeroSection />);

    expect(
      screen.getByRole("heading", { name: /Protect Your Phone, Protect Your World/i })
    ).toBeInTheDocument();

    // Using a partial match for the text
    expect(screen.getByText(/Comprehensive phone insurance coverage/i)).toBeInTheDocument();
  });

  test("renders logo image with alt text", () => {
    render(<HeroSection />);

    // We use getAllBy...[0] or ensure the DOM is clean to avoid the "Found multiple" error
    const logos = screen.getAllByAltText(/Phone Shield logo/i);
    expect(logos[0]).toBeInTheDocument();
  });
});
