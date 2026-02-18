import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Navbar from "../Navbar";

describe("Navbar", () => {
  test("renders logo and title", () => {
    render(
      <MemoryRouter>
        <Navbar
          mode={"light"}
          toggleTheme={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      </MemoryRouter>
    );
    expect(screen.getByAltText(/Phone Shield logo/i)).toBeInTheDocument();
    expect(screen.getByText(/Phone Shield/i)).toBeInTheDocument();
  });
});
