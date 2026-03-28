import "@testing-library/jest-dom/vitest";
import { render, screen, cleanup, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, expect, vi, afterEach } from "vitest";
import TagsTable from "../TagsTable";

afterEach(() => {
  cleanup();
});

describe("TagsTable", () => {
  const mockTags = [
    {
      id: "1",
      tagName: "Best Value",
      tagKey: "best-value",
      color: "green",
    },
    {
      id: "2",
      tagName: "Popular",
      tagKey: "popular",
      color: "blue",
    },
  ];

  test("renders table header and summary", () => {
    render(<TagsTable tags={mockTags} onEditTag={vi.fn()} onDeleteTag={vi.fn()} />);
    expect(screen.getByText("Tag Name")).toBeInTheDocument();
    expect(screen.getByText("Tag Key")).toBeInTheDocument();
    expect(screen.getByText("Colour")).toBeInTheDocument();
    expect(screen.getByText("Actions")).toBeInTheDocument();
  });

  test("renders all tag rows", () => {
    render(<TagsTable tags={mockTags} onEditTag={vi.fn()} onDeleteTag={vi.fn()} />);

    expect(screen.getByText("Best Value")).toBeInTheDocument();
    expect(screen.getByText("best-value")).toBeInTheDocument();

    expect(screen.getByText("Popular")).toBeInTheDocument();
    expect(screen.getByText("popular")).toBeInTheDocument();
  });

  test("calls onEditTag with the correct id", async () => {
    const user = userEvent.setup();
    const onEditTag = vi.fn();

    render(<TagsTable tags={mockTags} onEditTag={onEditTag} onDeleteTag={vi.fn()} />);

    const buttons = screen.getAllByRole("button");
    // Click the edit button for the first tag
    await user.click(buttons[0]);

    // Wait for dialog to appear and click save
    await waitFor(() => {
      const dialogButtons = screen.getAllByRole("button");
      if (dialogButtons.length > 2) {
        // Save button is usually the last button in the dialog
        user.click(dialogButtons[dialogButtons.length - 1]);
      }
    });

    await waitFor(() => {
      expect(onEditTag).toHaveBeenCalledTimes(1);
      expect(onEditTag).toHaveBeenCalledWith(
        "1",
        expect.any(String),
        expect.any(String),
        expect.any(String)
      );
    });
  });

  test("calls onDeleteTag with the correct id", async () => {
    const user = userEvent.setup();
    const onDeleteTag = vi.fn();

    render(<TagsTable tags={mockTags} onEditTag={vi.fn()} onDeleteTag={onDeleteTag} />);

    const buttons = screen.getAllByRole("button");
    await user.click(buttons[1]);

    expect(onDeleteTag).toHaveBeenCalledTimes(1);
    expect(onDeleteTag).toHaveBeenCalledWith("1");
  });
});
