import "@testing-library/jest-dom/vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, expect, vi, afterEach } from "vitest";
import TagsRow from "../TagsRow";

afterEach(() => {
  cleanup();
});

describe("TagsRow", () => {
  const defaultProps = {
    tagName: "Best Value",
    tagKey: "best-value",
    lastModified: "2024-06-01",
    modifiedBy: "Emma Thompson",
    onEdit: vi.fn(),
    onDelete: vi.fn(),
  };

  test("renders row content", () => {
    render(
      <table>
        <tbody>
          <TagsRow {...defaultProps} />
        </tbody>
      </table>
    );

    expect(screen.getByText("Best Value")).toBeInTheDocument();
    expect(screen.getByText("best-value")).toBeInTheDocument();
    expect(screen.getByText("2024-06-01")).toBeInTheDocument();
    expect(screen.getByText(/by: Emma Thompson/i)).toBeInTheDocument();
  });

  test("renders edit and delete buttons", () => {
    render(
      <table>
        <tbody>
          <TagsRow {...defaultProps} />
        </tbody>
      </table>
    );

    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(2);
  });

  test("calls onEdit when edit button is clicked", async () => {
    const user = userEvent.setup();
    const onEdit = vi.fn();

    render(
      <table>
        <tbody>
          <TagsRow {...defaultProps} onEdit={onEdit} />
        </tbody>
      </table>
    );

    const buttons = screen.getAllByRole("button");
    await user.click(buttons[0]);

    expect(onEdit).toHaveBeenCalledTimes(1);
  });

  test("calls onDelete when delete button is clicked", async () => {
    const user = userEvent.setup();
    const onDelete = vi.fn();

    render(
      <table>
        <tbody>
          <TagsRow {...defaultProps} onDelete={onDelete} />
        </tbody>
      </table>
    );

    const buttons = screen.getAllByRole("button");
    await user.click(buttons[1]);

    expect(onDelete).toHaveBeenCalledTimes(1);
  });
});