import "@testing-library/jest-dom/vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { describe, test, expect, afterEach } from "vitest";
import TagsManagementPage from "../TagsManagementPage";

afterEach(() => {
  cleanup();
});

describe("TagsManagementPage", () => {
  test("renders page header", () => {
    render(<TagsManagementPage />);

    expect(screen.getByText(/tags management/i)).toBeInTheDocument();

    expect(
      screen.getByText(/manage product tags that determine how products are rendered/i)
    ).toBeInTheDocument();
  });

  test("renders toolbar", () => {
    render(<TagsManagementPage />);

    // text inside TagsToolBar
    expect(screen.getByPlaceholderText(/search tags/i)).toBeInTheDocument();

    expect(screen.getByRole("button", { name: /create tag/i })).toBeInTheDocument();
  });

  test("renders table section", () => {
    render(<TagsManagementPage />);

    expect(screen.getByText("Tag Name")).toBeInTheDocument();
  });
});
