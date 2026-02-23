import "@testing-library/jest-dom/vitest";
import { render } from "@testing-library/react";
import { describe, vi } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import EditRulePage from "../EditRulePage";

vi.mock("axios");

describe("EditRulePage", () => {
  let form: HTMLFormElement;

  const renderWithRouter = () => {
    const utils = render(
      <MemoryRouter initialEntries={["/editRule/123"]}>
        <Routes>
          <Route path="/editRule/:id" element={<EditRulePage />} />
        </Routes>
      </MemoryRouter>
    );

    const found = utils.container.querySelector("form");
    if (!found) throw new Error("Edit rule form not found");
    form = found as HTMLFormElement;

    return utils;
  };

});