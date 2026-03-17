import "@testing-library/jest-dom/vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import RuleTable from "../RuleTable";

vi.mock("@dnd-kit/core", () => ({
  DndContext: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  closestCenter: vi.fn(),
  PointerSensor: vi.fn(),
  useSensor: vi.fn(),
  useSensors: vi.fn(() => []),
}));

vi.mock("@dnd-kit/sortable", () => ({
  SortableContext: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  verticalListSortingStrategy: vi.fn(),
  useSortable: () => ({
    attributes: {},
    listeners: {},
    setNodeRef: vi.fn(),
    transform: null,
    transition: null,
  }),
}));

vi.mock("@dnd-kit/utilities", () => ({
  CSS: { Transform: { toString: () => "" } },
}));

const mockRules = [
  {
    id: "1",
    order: 1,
    ruleName: "Rule One",
    active: true,
    numberOfConditions: 2,
    decision: "ACCEPT",
    premium: "€10.00",
  },
  {
    id: "2",
    order: 2,
    ruleName: "Rule Two",
    active: false,
    numberOfConditions: 1,
    decision: "DECLINE",
    premium: "-",
  },
];

const defaultProps = {
  rules: mockRules,
  activeProductName: "Premium Shield",
  numberOfActiveRules: 1,
  numberOfInactiveRules: 1,
  onToggleRuleActive: vi.fn(),
  onEditRule: vi.fn(),
  onReorderRule: vi.fn(),
};

describe("RuleTable", () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  test("renders product name in header", () => {
    render(<RuleTable {...defaultProps} />);
    expect(screen.getByText("Rules for Premium Shield")).toBeInTheDocument();
  });

  test("renders active and inactive count", () => {
    render(<RuleTable {...defaultProps} />);
    expect(screen.getByText("1 active, 1 inactive")).toBeInTheDocument();
  });

  test("renders fallback when no product name", () => {
    render(<RuleTable {...defaultProps} activeProductName={undefined} />);
    expect(screen.getByText("Rules for ...")).toBeInTheDocument();
  });

  test("renders table headers", () => {
    render(<RuleTable {...defaultProps} />);
    expect(screen.getByText("Rule Name")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
    expect(screen.getByText("Decision")).toBeInTheDocument();
    expect(screen.getByText("Premium")).toBeInTheDocument();
    expect(screen.getByText("Actions")).toBeInTheDocument();
  });

  test("renders all rules", () => {
    render(<RuleTable {...defaultProps} />);
    expect(screen.getByText("Rule One")).toBeInTheDocument();
    expect(screen.getByText("Rule Two")).toBeInTheDocument();
  });

  test("renders zero counts when not provided", () => {
    render(
      <RuleTable
        {...defaultProps}
        numberOfActiveRules={undefined}
        numberOfInactiveRules={undefined}
      />
    );
    expect(screen.getByText("0 active, 0 inactive")).toBeInTheDocument();
  });

  test("renders empty table when no rules", () => {
    render(<RuleTable {...defaultProps} rules={[]} />);
    expect(screen.getByText("Rules for Premium Shield")).toBeInTheDocument();
    expect(screen.queryByText("Rule One")).not.toBeInTheDocument();
  });

  test("renders drag header", () => {
    render(<RuleTable {...defaultProps} />);
    expect(screen.getByText("Drag")).toBeInTheDocument();
  });

  test("renders order header", () => {
    render(<RuleTable {...defaultProps} />);
    expect(screen.getByText("Order")).toBeInTheDocument();
  });

  test("renders conditions header", () => {
    render(<RuleTable {...defaultProps} />);
    expect(screen.getByText("Conditions")).toBeInTheDocument();
  });
});
