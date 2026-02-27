import Button from "@mui/material/Button";
import RuleTable from "../components/RuleTable";
import SelectProduct from "../components/SelectProduct";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { Dialog } from "@mui/material";
import EditRulePage from "../pages/EditRulePage";

type ProductOption = {
  id: string;
  name: string;
};

const testRules: {
  order: number;
  ruleName: string;
  active: boolean;
  numberOfConditions: number;
  decision: string;
  premium: string;
}[] = [
  {
    order: 1,
    ruleName: "Age Limit Check",
    active: true,
    numberOfConditions: 1,
    decision: "accept",
    premium: "+10%",
  },
  {
    order: 2,
    ruleName: "Device Age Validation",
    active: true,
    numberOfConditions: 1,
    decision: "accept",
    premium: "+5%",
  },
  {
    order: 3,
    ruleName: "Premium Adjustment",
    active: false,
    numberOfConditions: 1,
    decision: "accept",
    premium: "+15%",
  },
];

const RulesManagementPage = () => {
  const [editRuleId, setEditRuleId] = useState<number | null>(null);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [rules, setRules] = useState(testRules);
  const [products, setProducts] = useState<ProductOption[]>([]);

  useEffect(() => {
    fetch("/api/backoffice/products/options")
      .then((res) => res.json())
      .then((data: ProductOption[]) => setProducts(data))
      .catch((err) => console.error("Failed to fetch products:", err));
  }, []);

  const handleToggleRuleActive = (order: number) => {
    setRules((prevRules) =>
      prevRules.map((rule) =>
        rule.order === order
          ? {
              ...rule,
              active: !rule.active,
            }
          : rule
      )
    );
  };

  const handleEditRule = (order: number) => {
    setEditRuleId(order);
  };

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
            <Button variant="contained" color="primary" sx={{ mt: 2 }}>
              + Create New Rule
            </Button>
          </Box>
        </Box>
        <Box sx={{ my: 4 }}>
          <SelectProduct
            products={products}
            selectedProduct={selectedProduct}
            onProductChange={setSelectedProduct}
          />
        </Box>
        <RuleTable
          rules={rules}
          activeProductName={selectedProduct || undefined}
          numberOfActiveRules={numberOfActiveRules}
          numberOfInactiveRules={numberOfInactiveRules}
          onToggleRuleActive={handleToggleRuleActive}
          onEditRule={handleEditRule}
        />
      </Box>

      <Dialog
        open={editRuleId !== null}
        onClose={() => setEditRuleId(null)}
        maxWidth="md"
        fullWidth
      >
        <EditRulePage id={editRuleId} onClose={() => setEditRuleId(null)} />
      </Dialog>
    </>
  );
};

export default RulesManagementPage;
