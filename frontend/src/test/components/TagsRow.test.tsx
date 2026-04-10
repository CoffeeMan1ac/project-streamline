import "@testing-library/jest-dom/vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, expect, vi, afterEach } from "vitest";
import TagsRow from "../../components/TagsRow";

afterEach(() => {
  cleanup();
});

describe("TagsRow", () => {
  const defaultProps = {
    id: "1",
    tagName: "Best Value",
    tagKey: "best-value",
    color: "green",
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
    // Click the edit button (first button)
    await user.click(buttons[0]);

    // Wait for the dialog to appear and find the save button
    const dialogButtons = await screen.findAllByRole("button");
    // The save button should be one of the dialog buttons
    if (dialogButtons.length > 2) {
      await user.click(dialogButtons[dialogButtons.length - 1]);
    }

    expect(onEdit).toHaveBeenCalled();
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
