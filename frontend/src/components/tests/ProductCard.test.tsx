import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import { MemoryRouter } from "react-router-dom"; // Fix 1: Add Router
import ProductCard, { type Product } from "../ProductCard";

const plan: Product = {
  id: "uuid-123",
  name: "Basic",
  price: "€9.00",
  mostPopular: false,
  coverages: [
    {
      id: "",
      label: "Accidental Damage",
      category: {
        id: "",
        code: "",
        label: "",
      },
      green: false,
    },
  ],
  exclusions: [
    {
      id: "",
      label: "Screen Replacement",
      category: {
        id: "",
        code: "",
        label: "",
      },
      green: false,
    },
  ],
  green: false,
  tags: [],
};

const popularPlan: Product = {
  ...plan,
  name: "Pro",
  price: "€19.00",
  mostPopular: true,
  tags: [{ id: "1", code: "POPULAR", label: "Most Popular" }],
};

const greenPlan: Product = {
  ...plan,
  name: "Green",
  green: true,
  tags: [{ id: "1", code: "GREEN", label: "Eco Friendly" }],
};

describe("ProductCard", () => {
  test("renders plan name, price and month text", () => {
    render(
      <MemoryRouter>
        <ProductCard product={plan} />
      </MemoryRouter>
    );
    expect(screen.getByText(/Basic/i)).toBeInTheDocument();
    expect(screen.getByText(/€9.00/i)).toBeInTheDocument();
    expect(screen.getByText(/\/month/i)).toBeInTheDocument();
  });

  // test("renders included and excluded features (excluded is struck-through)", () => {
  //   render(
  //     <MemoryRouter>
  //       <ProductCard product={plan} />
  //     </MemoryRouter>
  //   );
  //   const included = screen.getByText(/Accidental Damage/i);
  //   const excluded = screen.getByText(/Screen Replacement/i);

  //   expect(included).toBeInTheDocument();
  //   expect(excluded).toBeInTheDocument();
  //   expect(excluded).toHaveStyle({ textDecoration: "line-through" });
  // });

  // test("renders the action button", () => {
  //   render(
  //     <MemoryRouter>
  //       <ProductCard product={plan} />
  //     </MemoryRouter>
  //   );
  //   expect(screen.getByText(/Get a Quote/i)).toBeInTheDocument();
  // });

  test("shows 'Most Popular' chip when product.mostPopular is true", () => {
    render(
      <MemoryRouter>
        <ProductCard product={popularPlan} />
      </MemoryRouter>
    );
    expect(screen.getByText(/Most Popular/i)).toBeInTheDocument();
  });

  test("shows 'Eco Friendly' chip when product.ecoFriendly is true", () => {
    render(
      <MemoryRouter>
        <ProductCard product={greenPlan} />
      </MemoryRouter>
    );
    expect(screen.getByText(/Eco Friendly/i)).toBeInTheDocument();
  });
});
