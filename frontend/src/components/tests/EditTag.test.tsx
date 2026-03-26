import "@testing-library/jest-dom/vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, expect, vi, afterEach } from "vitest";
import EditTag from "../EditTag";

afterEach(() => {
  cleanup();
});

describe("EditTag", () => {
  test("renders dialog content when open", () => {
    render(<EditTag open={true} onClose={vi.fn()} onUpdate={vi.fn()} />);

    expect(screen.getByText(/edit tag/i)).toBeInTheDocument();
    expect(screen.getByText(/tag name/i)).toBeInTheDocument();
    expect(screen.getByText(/tag key/i)).toBeInTheDocument();

    expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /update tag/i })).toBeInTheDocument();

    expect(screen.getByText(/green/i)).toBeInTheDocument();
    expect(screen.getByText(/blue/i)).toBeInTheDocument();
    expect(screen.getByText(/orange/i)).toBeInTheDocument();
    expect(screen.getByText(/purple/i)).toBeInTheDocument();
    expect(screen.getByText(/red/i)).toBeInTheDocument();
  });

  test("does not render when open is false", () => {
    render(<EditTag open={false} onClose={vi.fn()} onUpdate={vi.fn()} />);

    expect(screen.queryByText(/edit tag/i)).not.toBeInTheDocument();
  });

  test("prefills values from initialValues", () => {
    render(
      <EditTag
        open={true}
        onClose={vi.fn()}
        onUpdate={vi.fn()}
        initialValues={{
          name: "Priority",
          key: "priority",
          color: "blue",
        }}
      />
    );

    const inputs = screen.getAllByRole("textbox");

    expect(inputs[0]).toHaveValue("Priority");
    expect(inputs[1]).toHaveValue("priority");
  });

  test("allows typing into fields", async () => {
    const user = userEvent.setup();

    render(<EditTag open={true} onClose={vi.fn()} onUpdate={vi.fn()} />);

    const inputs = screen.getAllByRole("textbox");

    await user.type(inputs[0], "Urgent");
    await user.type(inputs[1], "urgent-tag");

    expect(inputs[0]).toHaveValue("Urgent");
    expect(inputs[1]).toHaveValue("urgent-tag");
  });

  test("calls onClose when cancel clicked", async () => {
    const user = userEvent.setup();
    const mockClose = vi.fn();

    render(<EditTag open={true} onClose={mockClose} onUpdate={vi.fn()} />);

    await user.click(screen.getByRole("button", { name: /cancel/i }));

    expect(mockClose).toHaveBeenCalledTimes(1);
  });

  test("calls onClose when close icon clicked", async () => {
    const user = userEvent.setup();
    const mockClose = vi.fn();

    render(<EditTag open={true} onClose={mockClose} onUpdate={vi.fn()} />);

    await user.click(screen.getByRole("button", { name: /close dialog/i }));

    expect(mockClose).toHaveBeenCalledTimes(1);
  });

  test("shows validation errors when submitting empty form", async () => {
    const user = userEvent.setup();
    const mockUpdate = vi.fn();

    render(<EditTag open={true} onClose={vi.fn()} onUpdate={mockUpdate} />);

    await user.click(screen.getByRole("button", { name: /update tag/i }));

    expect(screen.getByText(/tag name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/tag key is required/i)).toBeInTheDocument();

    expect(mockUpdate).not.toHaveBeenCalled();
  });

  test("submits valid form", async () => {
    const user = userEvent.setup();
    const mockUpdate = vi.fn();

    render(<EditTag open={true} onClose={vi.fn()} onUpdate={mockUpdate} />);

    const inputs = screen.getAllByRole("textbox");

    await user.type(inputs[0], "Urgent");
    await user.type(inputs[1], "urgent");

    await user.click(screen.getByRole("button", { name: /update tag/i }));

    expect(mockUpdate).toHaveBeenCalledTimes(1);

    expect(mockUpdate).toHaveBeenCalledWith({
      name: "Urgent",
      key: "urgent",
      color: "green",
    });
  });

  test("changes color selection", async () => {
    const user = userEvent.setup();
    const mockUpdate = vi.fn();

    render(<EditTag open={true} onClose={vi.fn()} onUpdate={mockUpdate} />);

    const inputs = screen.getAllByRole("textbox");

    await user.type(inputs[0], "Review");
    await user.type(inputs[1], "review");

    await user.click(screen.getByText("Purple"));

    await user.click(screen.getByRole("button", { name: /update tag/i }));

    expect(mockUpdate).toHaveBeenCalledWith({
      name: "Review",
      key: "review",
      color: "purple",
    });
  });
});
