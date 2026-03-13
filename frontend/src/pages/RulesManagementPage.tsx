import { useSearchParams } from "react-router-dom";
import Button from "@mui/material/Button";
import RuleTable from "../components/RuleTable";
import SelectProduct from "../components/SelectProduct";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Dialog } from "@mui/material";
import EditRulePage from "../pages/EditRulePage";
import CreateRulePage from "./CreateRulePage";

type ProductOption = {
  id: string;
  name: string;
};

type Rule = {
  id: string;
  order: number;
  ruleName: string;
  active: boolean;
  numberOfConditions: number;
  decision: string;
  premium: string;
};

type RuleResponseDto = {
  id: string;
  productId: string;
  name: string;
  priority: number;
  active: boolean;
  ruleConfig: {
    when: {
      conditions: unknown[];
    };
    then: {
      decision: string;
      premiumDelta: number | null;
      premiumOverride: number | null;
    };
  };
};

const mapRuleResponseToRule = (dto: RuleResponseDto): Rule => ({
  id: dto.id,
  order: dto.priority,
  ruleName: dto.name,
  active: dto.active,
  numberOfConditions: dto.ruleConfig.when.conditions.length,
  decision: dto.ruleConfig.then.decision,
  premium:
    dto.ruleConfig.then.decision === "DECLINE"
      ? "-"
      : dto.ruleConfig.then.premiumDelta
        ? `${dto.ruleConfig.then.premiumDelta > 0 ? "+" : ""}${(dto.ruleConfig.then.premiumDelta * 100).toFixed(0)}%`
        : dto.ruleConfig.then.premiumOverride
          ? `€${dto.ruleConfig.then.premiumOverride}`
          : "-",
});

const RulesManagementPage = () => {
  const [editRuleId, setEditRuleId] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedProduct = searchParams.get("product") ?? "";
  const [rules, setRules] = useState<Rule[]>([]);
  const [products, setProducts] = useState<ProductOption[]>([]);
  const [createRuleOpen, setCreateRuleOpen] = useState(false);

  const handleProductChange = (productId: string) => {
    setSearchParams({ product: productId });
  };
  useEffect(() => {
    fetch("/api/backoffice/products/options")
      .then((res) => res.json())
      .then((data: ProductOption[]) => setProducts(data))
      .catch((err) => console.error("Failed to fetch products:", err));
  }, []);

  useEffect(() => {
    if (!selectedProduct) return;

    fetch(`/api/backoffice/rules?product=${selectedProduct}`)
      .then((res) => res.json())
      .then((data: RuleResponseDto[]) => setRules(data.map(mapRuleResponseToRule)))
      .catch((err) => {
        console.error("Failed to fetch rules:", err);
        setRules([]);
      });
  }, [selectedProduct]);

  const fetchRules = () => {
    if (!selectedProduct) return;
    fetch(`/api/backoffice/rules?product=${selectedProduct}`)
      .then((res) => res.json())
      .then((data: RuleResponseDto[]) => setRules(data.map(mapRuleResponseToRule)))
      .catch((err) => console.error("Failed to fetch rules:", err));
  };

  const handleToggleRuleActive = async (order: number) => {
    const rule = rules.find((r) => r.order === order);
    if (!rule) return;

    try {
      await fetch(`/api/backoffice/rules/${rule.id}/active`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active: !rule.active }),
      });
      // only update local state if the backend call succeeded
      setRules((prevRules) =>
        prevRules.map((r) => (r.order === order ? { ...r, active: !r.active } : r))
      );
    } catch (err) {
      console.error("Failed to toggle rule active status:", err);
    }
  };

  const handleReorderRule = async (ruleId: string, newPriority: number) => {
    try {
      await fetch("/api/backoffice/rules/reorder", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product: selectedProduct,
          rule: ruleId,
          priority: newPriority,
        }),
      });
      fetchRules();
    } catch (err) {
      console.error("Failed to reorder rule:", err);
    }
  };
  const handleEditRule = (id: string) => {
    setEditRuleId(id);
  };

  const selectedProductName = products.find((p) => p.id === selectedProduct)?.name;
  const numberOfActiveRules = rules.filter((rule) => rule.active).length;
  const numberOfInactiveRules = rules.length - numberOfActiveRules;

  return (
    <>
      <Box sx={{ mx: 20, my: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              Rules Management
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
              Manage underwriting rules per product
            </Typography>
          </Box>
          <Box>
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              startIcon={<AddIcon />}
              onClick={() => setCreateRuleOpen(true)}
            >
              Create New Rule
            </Button>
            <Dialog
              open={createRuleOpen}
              onClose={() => setCreateRuleOpen(false)}
              maxWidth="md"
              fullWidth
            >
              <CreateRulePage
                products={products}
                selectedProduct={selectedProduct}
                onClose={() => setCreateRuleOpen(false)}
                onSave={fetchRules}
              />
            </Dialog>
          </Box>
        </Box>
        <Box sx={{ my: 4 }}>
          <SelectProduct
            products={products}
            selectedProduct={selectedProduct}
            onProductChange={handleProductChange}
          />
        </Box>
        <RuleTable
          rules={rules}
          activeProductName={selectedProductName}
          numberOfActiveRules={numberOfActiveRules}
          numberOfInactiveRules={numberOfInactiveRules}
          onToggleRuleActive={handleToggleRuleActive}
          onEditRule={handleEditRule}
          onReorderRule={handleReorderRule}
        />
      </Box>

      <Dialog
        open={editRuleId !== null}
        onClose={() => setEditRuleId(null)}
        maxWidth="md"
        fullWidth
      >
        <EditRulePage
          id={editRuleId}
          products={products}
          onClose={() => setEditRuleId(null)}
          onSave={fetchRules}
        />
      </Dialog>
    </>
  );
};

export default RulesManagementPage;
