import "@testing-library/jest-dom/vitest";
import { render, screen, cleanup } from "@testing-library/react";
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
      lastModified: "2024-06-01",
      modifiedBy: "Emma Thompson",
    },
    {
      id: "2",
      tagName: "Popular",
      tagKey: "popular",
      lastModified: "2024-06-02",
      modifiedBy: "Sarah Mitchell",
    },
  ];

  test("renders table header and summary", () => {
    render(
      <TagsTable
        tags={mockTags}
        onEditTag={vi.fn()}
        onDeleteTag={vi.fn()}
      />
    );

    expect(screen.getByText("Tags")).toBeInTheDocument();
    expect(screen.getByText("Showing 2 tags")).toBeInTheDocument();

    expect(screen.getByText("Tag Name")).toBeInTheDocument();
    expect(screen.getByText("Tag Key")).toBeInTheDocument();
    expect(screen.getByText("Last Modified")).toBeInTheDocument();
    expect(screen.getByText("Actions")).toBeInTheDocument();
  });

  test("renders all tag rows", () => {
    render(
      <TagsTable
        tags={mockTags}
        onEditTag={vi.fn()}
        onDeleteTag={vi.fn()}
      />
    );

    expect(screen.getByText("Best Value")).toBeInTheDocument();
    expect(screen.getByText("best-value")).toBeInTheDocument();
    expect(screen.getByText("2024-06-01")).toBeInTheDocument();
    expect(screen.getByText(/by: Emma Thompson/i)).toBeInTheDocument();

    expect(screen.getByText("Popular")).toBeInTheDocument();
    expect(screen.getByText("popular")).toBeInTheDocument();
    expect(screen.getByText("2024-06-02")).toBeInTheDocument();
    expect(screen.getByText(/by: Sarah Mitchell/i)).toBeInTheDocument();
  });

  test("renders singular summary when there is one tag", () => {
    render(
      <TagsTable
        tags={[mockTags[0]]}
        onEditTag={vi.fn()}
        onDeleteTag={vi.fn()}
      />
    );

    expect(screen.getByText("Showing 1 tag")).toBeInTheDocument();
  });

  test("calls onEditTag with the correct id", async () => {
    const user = userEvent.setup();
    const onEditTag = vi.fn();

    render(
      <TagsTable
        tags={mockTags}
        onEditTag={onEditTag}
        onDeleteTag={vi.fn()}
      />
    );

    const buttons = screen.getAllByRole("button");
    await user.click(buttons[0]);

    expect(onEditTag).toHaveBeenCalledTimes(1);
    expect(onEditTag).toHaveBeenCalledWith("1");
  });

  test("calls onDeleteTag with the correct id", async () => {
    const user = userEvent.setup();
    const onDeleteTag = vi.fn();

    render(
      <TagsTable
        tags={mockTags}
        onEditTag={vi.fn()}
        onDeleteTag={onDeleteTag}
      />
    );

    const buttons = screen.getAllByRole("button");
    await user.click(buttons[1]);

    expect(onDeleteTag).toHaveBeenCalledTimes(1);
    expect(onDeleteTag).toHaveBeenCalledWith("1");
  });
});