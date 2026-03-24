import "@testing-library/jest-dom/vitest";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { describe, test, expect, afterEach } from "vitest";
import TagsToolBar from "../../components/TagsToolBar";

afterEach(() => {
  cleanup();
});

describe("TagsToolBar", () => {
  test("renders toolbar content", () => {
    render(<TagsToolBar totalTags={4} showingTags={4} />);

    expect(screen.getByPlaceholderText(/search tags/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /create tag/i })).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();

    expect(screen.getByText(/total tags:/i)).toBeInTheDocument();
    expect(screen.getByText(/showing:/i)).toBeInTheDocument();
  });

  test("displays totalTags and showingTags values", () => {
    render(<TagsToolBar totalTags={12} showingTags={7} />);

    expect(screen.getByText("12")).toBeInTheDocument();
    expect(screen.getByText("7")).toBeInTheDocument();
  });

  test("has default select value visible", () => {
    render(<TagsToolBar totalTags={4} showingTags={4} />);

    expect(screen.getByRole("combobox")).toHaveTextContent(/name \(a-z\)/i);
  });

  test("changes selected sort option", async () => {
    render(<TagsToolBar totalTags={4} showingTags={4} />);

    const select = screen.getByRole("combobox");
    fireEvent.mouseDown(select);

    const newestOption = await screen.findByRole("option", { name: /newest first/i });
    fireEvent.click(newestOption);

    expect(screen.getByRole("combobox")).toHaveTextContent(/newest first/i);
  });
});
