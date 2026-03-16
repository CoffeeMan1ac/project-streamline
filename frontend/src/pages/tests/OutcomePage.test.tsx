import "@testing-library/jest-dom/vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import OutcomePage from "../OutcomePage";

vi.mock("../assets/checkmark.png", () => ({ default: "checkmark.png" }));
vi.mock("../assets/decline.png", () => ({ default: "decline.png" }));

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

    test("renders proceed to purchase button", () => {
      renderWithState({ decision: "accept", premium: 29.99 });
      expect(screen.getByRole("button", { name: /Proceed to Purchase/i })).toBeInTheDocument();
    });

    test("renders back to home button", () => {
      renderWithState({ decision: "accept", premium: 29.99 });
      expect(screen.getByRole("button", { name: /Back to Home/i })).toBeInTheDocument();
    });

    test("proceed to purchase button shows loading state when clicked", async () => {
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

    test("renders common reasons section", () => {
      renderWithState({ decision: "decline" });
      expect(screen.getByText(/Common reasons for decline/i)).toBeInTheDocument();
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

    test("call us button shows loading state when clicked", async () => {
      renderWithState({ decision: "decline" });
      fireEvent.click(screen.getByRole("button", { name: /Call Us/i }));
      expect(screen.getByRole("button", { name: /Calling.../i })).toBeInTheDocument();
    });

    test("email support button shows loading state when clicked", async () => {
      renderWithState({ decision: "decline" });
      fireEvent.click(screen.getByRole("button", { name: /Email Support/i }));
      expect(screen.getByRole("button", { name: /Sending.../i })).toBeInTheDocument();
    });
  });
});