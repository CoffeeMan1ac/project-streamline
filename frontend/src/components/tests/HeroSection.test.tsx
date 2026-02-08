import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import HeroSection from "../HeroSection";
import { describe, expect, test } from "vitest";

describe("HeroSection", () => {
  test("renders heading and subtitle", () => {
    render(<HeroSection />);
    expect(screen.getByRole("heading", { name: /Protect Your Phone, Protect Your World/i })).toBeInTheDocument();
    expect(screen.getByText(/Comprehensive phone insurance coverage/i)).toBeInTheDocument();
  });

  test("renders logo image with alt text", () => {
    render(<HeroSection />);
    expect(screen.getByAltText(/Phone Shield logo/i)).toBeInTheDocument();
  });
});