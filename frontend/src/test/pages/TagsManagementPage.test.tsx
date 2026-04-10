import "@testing-library/jest-dom/vitest";
import { render, screen, cleanup, waitFor } from "@testing-library/react";
import { describe, test, expect, afterEach, vi, beforeEach } from "vitest";
import TagsManagementPage from "../../pages/TagsManagementPage";
import * as httpModule from "../../api/http";

vi.mock("../../api/http");

afterEach(() => {
  cleanup();
});

beforeEach(() => {
  vi.mocked(httpModule.default.get).mockResolvedValue({
    data: [
      {
        id: "1",
        code: "best-value",
        label: "Best Value",
        color: "green",
      },
    ],
  });
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

  test("renders table section", async () => {
    render(<TagsManagementPage />);

    await waitFor(() => {
      expect(screen.getByText("Tag Name")).toBeInTheDocument();
    });
  });
});
