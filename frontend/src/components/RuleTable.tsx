import React from "react";
import RuleRow from "./RuleRow";
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  Box,
  Typography,
} from "@mui/material";

interface RuleTableProps {
  rules: {
    id: string;
    order: number;
    ruleName: string;
    active: boolean;
    numberOfConditions: number;
    decision: string;
    premium: string;
  }[];
  activeProductName?: string;
  numberOfActiveRules?: number;
  numberOfInactiveRules?: number;
  onToggleRuleActive: (order: number) => void;
  onEditRule: (id: string) => void;
  onReorderRule: (ruleId: string, newPriority: number) => void;
}

const RuleTable: React.FC<RuleTableProps> = ({
  rules,
  activeProductName,
  numberOfActiveRules,
  numberOfInactiveRules,
  onToggleRuleActive,
  onEditRule,
  onReorderRule,
}) => {
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const overRule = rules.find((r) => r.id === String(over.id));
    if (!overRule) return;
    onReorderRule(String(active.id), overRule.order);
  };

  return (
    <Box border={1} borderColor="divider" borderRadius={2} bgcolor={"background.paper"}>
      <Box sx={{ p: 2, borderBottom: 1, borderColor: "divider" }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Rules for {activeProductName || "Standard Shield"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {numberOfActiveRules || 0} active, {numberOfInactiveRules || 0} inactive
        </Typography>
      </Box>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "background.default" }}>
                <TableCell>Drag</TableCell>
                <TableCell>Order</TableCell>
                <TableCell>Rule Name</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Conditions</TableCell>
                <TableCell>Decision</TableCell>
                <TableCell>Premium</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <SortableContext items={rules.map((r) => r.id)} strategy={verticalListSortingStrategy}>
              <TableBody>
                {rules.map((rule) => (
                  <RuleRow
                    key={rule.id}
                    {...rule}
                    onToggleActive={() => onToggleRuleActive(rule.order)}
                    onEdit={() => onEditRule(rule.id)}
                  />
                ))}
              </TableBody>
            </SortableContext>
          </Table>
        </TableContainer>
      </DndContext>
    </Box>
  );
};

export default RuleTable;
