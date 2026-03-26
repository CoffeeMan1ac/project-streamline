import { Box, Button, CircularProgress } from "@mui/material";
import QuotationDetails from "../components/QuotationDetails";
import QuotationsPricingBreakdown from "../components/QuotationsPricingBreakdown";
import QuotationsProductDetails from "../components/QuotationsProductDetails";
import QuotePersonalDetails from "../components/QuotePersonalDetails";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import http from "../api/http";

type DecisionTraceEntry = {
  ruleName: string;
  ruleDescription: string;
  isOverride: boolean;
  adjustmentAmount: number | null;
  outcome: string | null;
};

type QuoteDetailDto = {
  id: string;
  reference: string;
  status: "ACCEPTED" | "DECLINED" | "REFER";
  reason: string | null;
  rulesApplied: string[];
  decisionTrace: DecisionTraceEntry[];
  customerInput: Record<string, string>;
  premium: number | null;
  processingTimeMs: number;
  createdAt: string;
  productName: string | null;
  baseRate: number | null;
};

const QuoteDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [quote, setQuote] = useState<QuoteDetailDto | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    http
      .get<QuoteDetailDto>(`/backoffice/quote/${id}`)
      .then((res) => setQuote(res.data))
      .catch((err) => console.error("Failed to fetch quote:", err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" py={8}>
        <CircularProgress />
      </Box>
    );
  }

  if (!quote) return null;

  const fullName =
    `${quote.customerInput?.firstName ?? ""} ${quote.customerInput?.lastName ?? ""}`.trim();
  const address = [
    quote.customerInput?.address1,
    quote.customerInput?.address2,
    quote.customerInput?.city,
    quote.customerInput?.postalCode,
    quote.customerInput?.country,
  ]
    .filter(Boolean)
    .join(", ");

  const rules = (quote.decisionTrace ?? []).map((entry) => ({
    ruleName: entry.ruleName,
    ruleDescription: entry.ruleDescription ?? "",
    isOverride: entry.isOverride ?? false,
    ruleAmount:
      entry.adjustmentAmount !== null
        ? entry.isOverride
          ? `€${entry.adjustmentAmount.toFixed(2)}`
          : entry.adjustmentAmount > 0
            ? `+€${entry.adjustmentAmount.toFixed(2)}`
            : entry.adjustmentAmount < 0
              ? `-€${Math.abs(entry.adjustmentAmount).toFixed(2)}`
              : "€0.00"
        : (entry.outcome ?? ""),
    type:
      entry.outcome === "DECLINE" || entry.outcome === "REFER"
        ? ("neutral" as const)
        : entry.adjustmentAmount && entry.adjustmentAmount > 0
          ? ("negative" as const)
          : entry.adjustmentAmount && entry.adjustmentAmount < 0
            ? ("positive" as const)
            : ("neutral" as const),
  }));

  return (
    <Box display="flex" flexDirection="column" alignItems="center" sx={{ p: 3 }}>
      <Box width="100%" maxWidth="1200px">
        <Button
          onClick={() => navigate("/quotes")}
          variant="text"
          size="small"
          sx={{ color: "text.secondary", mb: 2 }}
        >
          <NavigateBeforeIcon />
          Back to Quotations
        </Button>
      </Box>

      <Box width="100%">
        <QuotationDetails
          quotationId={quote.reference}
          timeStamp={new Date(quote.createdAt).toLocaleString()}
          status={
            quote.status === "DECLINED"
              ? "REJECTED"
              : quote.status === "REFER"
                ? "PENDING"
                : "ACCEPTED"
          }
        />

        <Box
          sx={{
            display: "flex",
            gap: 3,
            mt: 3,
            alignItems: "flex-start",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
              width: { xs: "100%", md: "40%" },
            }}
          >
            <QuotePersonalDetails
              fullName={fullName}
              email={quote.customerInput?.emailAddress ?? ""}
              phone={quote.customerInput?.phoneNumber ?? ""}
              dateOfBirth={quote.customerInput?.dateOfBirth ?? ""}
              address={address}
            />
            <QuotationsProductDetails productName={quote.productName ?? "—"} />
          </Box>

          <Box sx={{ width: { xs: "100%", md: "60%" } }}>
            <QuotationsPricingBreakdown
              basePrice={quote.baseRate !== null ? `€${quote.baseRate.toFixed(2)}` : "—"}
              premiumName={quote.productName ?? ""}
              finalPremium={quote.premium !== null ? `€${quote.premium.toFixed(2)}` : "—"}
              rules={rules}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default QuoteDetailsPage;
