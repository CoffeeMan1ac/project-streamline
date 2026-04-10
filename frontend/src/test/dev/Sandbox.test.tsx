import "@testing-library/jest-dom/vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { describe, test, expect, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Sandbox from "../../dev/Sandbox";

describe("Sandbox", () => {
  beforeEach(() => {
    cleanup();
  });

  test("renders sandbox heading", () => {
    render(
      <MemoryRouter>
        <Sandbox />
      </MemoryRouter>
    );
    expect(screen.getByText("Sandbox for viewing components")).toBeInTheDocument();
  });
});
