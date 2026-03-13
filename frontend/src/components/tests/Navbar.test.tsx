import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Navbar from "../Navbar";
import { useAuth } from "../../context/AuthContext";

vi.mock("../../context/AuthContext", () => ({
  useAuth: vi.fn(),
}));

describe("Navbar", () => {
  test("renders logo and title", () => {
    vi.mocked(useAuth).mockReturnValue({
      user: null,
      loading: false,
    });

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
