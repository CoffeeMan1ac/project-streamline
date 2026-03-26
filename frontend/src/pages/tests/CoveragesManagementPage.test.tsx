import "@testing-library/jest-dom/vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { describe, test, expect, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import CoveragesManagementPage from "../CoveragesManagementPage";

describe("CoveragesManagementPage", () => {
  beforeEach(() => {
    cleanup();
  });

  const renderPage = () => {
    return render(
      <MemoryRouter>
        <CoveragesManagementPage />
      </MemoryRouter>
    );
  };

  test("renders page title", () => {
    renderPage();
    expect(screen.getByText("Coverages Management")).toBeInTheDocument();
  });

  test("renders page subtitle", () => {
    renderPage();
    expect(
      screen.getByText("Manage insurance coverage types and descriptions")
    ).toBeInTheDocument();
  });
});
