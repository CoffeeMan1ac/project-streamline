import "@testing-library/jest-dom/vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, expect, vi, afterEach } from "vitest";
import CreateTag from "../CreateTag";

afterEach(() => {
  cleanup();
});

describe("CreateTag", () => {
  test("renders dialog content when open", () => {
    render(<CreateTag open={true} onClose={vi.fn()} onCreate={vi.fn()} />);

    expect(screen.getByText(/create new tag/i)).toBeInTheDocument();
    expect(screen.getByText(/tag name/i)).toBeInTheDocument();
    expect(screen.getByText(/tag key/i)).toBeInTheDocument();

    expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /create tag/i })).toBeInTheDocument();

    expect(screen.getByText(/green/i)).toBeInTheDocument();
    expect(screen.getByText(/blue/i)).toBeInTheDocument();
    expect(screen.getByText(/orange/i)).toBeInTheDocument();
    expect(screen.getByText(/purple/i)).toBeInTheDocument();
    expect(screen.getByText(/red/i)).toBeInTheDocument();
  });

  test("does not render when open is false", () => {
    render(<CreateTag open={false} onClose={vi.fn()} onCreate={vi.fn()} />);

    expect(screen.queryByText(/create new tag/i)).not.toBeInTheDocument();
  });

  test("allows typing into fields", async () => {
    const user = userEvent.setup();

    render(<CreateTag open={true} onClose={vi.fn()} onCreate={vi.fn()} />);

    const inputs = screen.getAllByRole("textbox");

    await user.type(inputs[0], "Urgent");
    await user.type(inputs[1], "urgent-tag");

    expect(inputs[0]).toHaveValue("Urgent");
    expect(inputs[1]).toHaveValue("URGENTTAG");
  });

  test("calls onClose when cancel clicked", async () => {
    const user = userEvent.setup();
    const mockClose = vi.fn();

    render(<CreateTag open={true} onClose={mockClose} onCreate={vi.fn()} />);

    await user.click(screen.getByRole("button", { name: /cancel/i }));

    expect(mockClose).toHaveBeenCalledTimes(1);
  });

  test("calls onClose when close icon clicked", async () => {
    const user = userEvent.setup();
    const mockClose = vi.fn();

    render(<CreateTag open={true} onClose={mockClose} onCreate={vi.fn()} />);

    await user.click(screen.getByRole("button", { name: /close dialog/i }));

    expect(mockClose).toHaveBeenCalledTimes(1);
  });

  test("shows validation errors when submitting empty form", async () => {
    const user = userEvent.setup();
    const mockCreate = vi.fn();

    render(<CreateTag open={true} onClose={vi.fn()} onCreate={mockCreate} />);

    await user.click(screen.getByRole("button", { name: /create tag/i }));

    expect(screen.getByText(/tag name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/tag key is required/i)).toBeInTheDocument();

    expect(mockCreate).not.toHaveBeenCalled();
  });

  test("submits valid form", async () => {
    const user = userEvent.setup();
    const mockCreate = vi.fn();

    render(<CreateTag open={true} onClose={vi.fn()} onCreate={mockCreate} />);

    const inputs = screen.getAllByRole("textbox");

    await user.type(inputs[0], "Urgent");
    await user.type(inputs[1], "urgent");

    await user.click(screen.getByRole("button", { name: /create tag/i }));

    expect(mockCreate).toHaveBeenCalledTimes(1);

    expect(mockCreate).toHaveBeenCalledWith({
      name: "Urgent",
      key: "URGENT",
      color: "green",
    });
  });

  test("changes color selection", async () => {
    const user = userEvent.setup();
    const mockCreate = vi.fn();

    render(<CreateTag open={true} onClose={vi.fn()} onCreate={mockCreate} />);

    const inputs = screen.getAllByRole("textbox");

    await user.type(inputs[0], "Review");
    await user.type(inputs[1], "review");

    await user.click(screen.getByText("Purple"));

    await user.click(screen.getByRole("button", { name: /create tag/i }));

    expect(mockCreate).toHaveBeenCalledWith({
      name: "Review",
      key: "REVIEW",
      color: "purple",
    });
  });
});
