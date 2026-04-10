import "@testing-library/jest-dom/vitest";
import { render, screen, fireEvent, cleanup, waitFor } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import OutcomePage from "../../pages/OutcomePage";

const renderWithState = (state: object) => {
  return render(
    <MemoryRouter initialEntries={[{ pathname: "/outcome", state }]}>
      <Routes>
        <Route path="/outcome" element={<OutcomePage />} />
      </Routes>
    </MemoryRouter>
  );
};

describe("OutcomePage", () => {
  beforeEach(() => {
    cleanup();
  });

  describe("Accept outcome", () => {
    test("renders accepted title", () => {
      renderWithState({ decision: "accept", premium: 29.99 });
      expect(screen.getByText(/Accepted!/i)).toBeInTheDocument();
    });

    test("renders the premium amount", () => {
      renderWithState({ decision: "accept", premium: 29.99 });
      expect(screen.getByText(/29.99/)).toBeInTheDocument();
    });

    test("renders reference card when reference is provided", () => {
      renderWithState({ decision: "accept", premium: 29.99, reference: "ABC123" });
      expect(screen.getByText("ABC123")).toBeInTheDocument();
      expect(screen.getByText(/Decision Reference/i)).toBeInTheDocument();
    });

    test("renders proceed to purchase button", () => {
      renderWithState({ decision: "accept", premium: 29.99 });
      expect(screen.getByRole("button", { name: /Proceed to Purchase/i })).toBeInTheDocument();
    });

    test("renders back to home button", () => {
      renderWithState({ decision: "accept", premium: 29.99 });
      expect(screen.getByRole("button", { name: /Back to Home/i })).toBeInTheDocument();
    });

    test("proceed to purchase button shows loading state when clicked", () => {
      renderWithState({ decision: "accept", premium: 29.99 });
      fireEvent.click(screen.getByRole("button", { name: /Proceed to Purchase/i }));
      expect(screen.getByRole("button", { name: /Proceeding.../i })).toBeInTheDocument();
    });
  });

  describe("Decline outcome", () => {
    test("renders declined title", () => {
      renderWithState({ decision: "decline" });
      expect(screen.getByText(/Application Declined/i)).toBeInTheDocument();
    });

    test("renders reference card when reference is provided", () => {
      renderWithState({ decision: "decline", reference: "ABC123" });
      expect(screen.getByText("ABC123")).toBeInTheDocument();
      expect(screen.getByText(/Decision Reference/i)).toBeInTheDocument();
    });

    test("renders common reasons when no reason is provided", () => {
      renderWithState({ decision: "decline" });
      expect(screen.getByText(/Common reasons for decline/i)).toBeInTheDocument();
    });

    test("renders specific reason when reason is provided", () => {
      renderWithState({ decision: "decline", reason: "Device is too old" });
      expect(screen.getByText(/Device is too old/i)).toBeInTheDocument();
      expect(screen.queryByText(/Common reasons for decline/i)).not.toBeInTheDocument();
    });

    test("renders need help section", () => {
      renderWithState({ decision: "decline" });
      expect(screen.getByText(/Need help or have questions/i)).toBeInTheDocument();
    });

    test("renders call us button", () => {
      renderWithState({ decision: "decline" });
      expect(screen.getByRole("button", { name: /Call Us/i })).toBeInTheDocument();
    });

    test("renders email support button", () => {
      renderWithState({ decision: "decline" });
      expect(screen.getByRole("button", { name: /Email Support/i })).toBeInTheDocument();
    });

    test("renders back to home button", () => {
      renderWithState({ decision: "decline" });
      expect(screen.getByRole("button", { name: /Back to Home/i })).toBeInTheDocument();
    });

    test("call us button shows loading state when clicked", () => {
      renderWithState({ decision: "decline" });
      fireEvent.click(screen.getByRole("button", { name: /Call Us/i }));
      expect(screen.getByRole("button", { name: /Calling.../i })).toBeInTheDocument();
    });

    test("email support button shows loading state when clicked", () => {
      renderWithState({ decision: "decline" });
      fireEvent.click(screen.getByRole("button", { name: /Email Support/i }));
      expect(screen.getByRole("button", { name: /Sending.../i })).toBeInTheDocument();
    });
  });

  describe("Refer outcome", () => {
    test("renders referred title", () => {
      renderWithState({ decision: "refer" });
      expect(screen.getAllByText(/Application Referred/i)[0]).toBeInTheDocument();
    });

    test("renders reference card when reference is provided", () => {
      renderWithState({ decision: "refer", reference: "ABC123" });
      expect(screen.getByText("ABC123")).toBeInTheDocument();
      expect(screen.getByText(/Decision Reference/i)).toBeInTheDocument();
    });

    test("renders what happens next section", () => {
      renderWithState({ decision: "refer" });
      expect(screen.getByText(/What happens next/i)).toBeInTheDocument();
    });

    test("renders why was my application referred section", () => {
      renderWithState({ decision: "refer" });
      expect(screen.getByText(/Why was my application referred/i)).toBeInTheDocument();
    });

    test("renders call us button", () => {
      renderWithState({ decision: "refer" });
      expect(screen.getByRole("button", { name: /Call Us/i })).toBeInTheDocument();
    });

    test("renders email support button", () => {
      renderWithState({ decision: "refer" });
      expect(screen.getByRole("button", { name: /Email Support/i })).toBeInTheDocument();
    });

    test("renders back to home button", () => {
      renderWithState({ decision: "refer" });
      expect(screen.getByRole("button", { name: /Back to Home/i })).toBeInTheDocument();
    });

    test("call us button shows loading state when clicked", () => {
      renderWithState({ decision: "refer" });
      fireEvent.click(screen.getByRole("button", { name: /Call Us/i }));
      expect(screen.getByRole("button", { name: /Calling.../i })).toBeInTheDocument();
    });

    test("email support button shows loading state when clicked", () => {
      renderWithState({ decision: "refer" });
      fireEvent.click(screen.getByRole("button", { name: /Email Support/i }));
      expect(screen.getByRole("button", { name: /Sending.../i })).toBeInTheDocument();
    });
  });

  test("copy icon is rendered when reference is provided", () => {
    renderWithState({ decision: "accept", premium: 29.99, reference: "ABC123" });
    expect(screen.getByTestId("ContentCopyIcon")).toBeInTheDocument();
  });

  test("copies reference to clipboard when copy icon is clicked", () => {
    const writeTextMock = vi.fn();
    Object.assign(navigator, {
      clipboard: { writeText: writeTextMock },
    });

    renderWithState({ decision: "accept", premium: 29.99, reference: "ABC123" });
    fireEvent.click(screen.getByTestId("ContentCopyIcon"));
    expect(writeTextMock).toHaveBeenCalledWith("ABC123");
  });

  test("proceed to purchase button returns to normal after loading", async () => {
    renderWithState({ decision: "accept", premium: 29.99 });
    fireEvent.click(screen.getByRole("button", { name: /Proceed to Purchase/i }));
    expect(screen.getByRole("button", { name: /Proceeding.../i })).toBeInTheDocument();
    await waitFor(
      () => {
        expect(screen.getByRole("button", { name: /Proceed to Purchase/i })).toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  });

  test("call us button returns to normal after loading", async () => {
    renderWithState({ decision: "decline" });
    fireEvent.click(screen.getByRole("button", { name: /Call Us/i }));
    expect(screen.getByRole("button", { name: /Calling.../i })).toBeInTheDocument();
    await waitFor(
      () => {
        expect(screen.getByRole("button", { name: /Call Us/i })).toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  });

  test("email support button returns to normal after loading", async () => {
    renderWithState({ decision: "decline" });
    fireEvent.click(screen.getByRole("button", { name: /Email Support/i }));
    expect(screen.getByRole("button", { name: /Sending.../i })).toBeInTheDocument();
    await waitFor(
      () => {
        expect(screen.getByRole("button", { name: /Email Support/i })).toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  });
});
