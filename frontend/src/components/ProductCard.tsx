import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import CompostIcon from "@mui/icons-material/Compost";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { Link as RouterLink } from "react-router-dom";

export interface Product {
  id: string;
  name: string;
  price: string;
  tags: ProductTag[];
  coverages: CoverageDetail[];
  exclusions: CoverageDetail[];
}

export interface CoverageDetail {
  id: string;
  label: string;
  category: CoverageCategory;
  green: boolean;
}

export interface CoverageCategory {
  id: string;
  code: string;
  label: string;
}

export interface ProductTag {
  id: string;
  code: string;
  label: string;
  color?: string;
}

interface ProductCardProps {
  product: Product;
}

const tagColorMap: Record<string, { border: string; chip: string; text: string }> = {
  green: { border: "#28A745", chip: "#28A745", text: "#28A745" },
  blue: { border: "primary.main", chip: "primary.main", text: "primary.main" },
  orange: { border: "#F59E0B", chip: "#F59E0B", text: "#F59E0B" },
  purple: { border: "#A855F7", chip: "#A855F7", text: "#A855F7" },
  red: { border: "#EF4444", chip: "#EF4444", text: "#EF4444" },
};

const defaultColors = { border: "primary.main", chip: "primary.main", text: "primary.main" };

const ProductCard = ({ product }: ProductCardProps) => {
  const primaryTag = product.tags?.[0];
  const isGreen = primaryTag?.color === "green";
  const isPopular = primaryTag?.color === "blue";
  const colors = (primaryTag?.color && tagColorMap[primaryTag.color]) || defaultColors;
  const hasHighlightedBorder = !!primaryTag;

  return (
    <Card
      elevation={hasHighlightedBorder ? 6 : 2}
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        borderRadius: 3,
        position: "relative",
        border: isPopular ? "2px solid" : "1px solid",
        borderColor: isGreen ? colors.border : isPopular ? colors.border : "grey.300",
        transition: "transform 0.2s ease-in-out",
        "&:hover": { transform: "translateY(-4px)" },
      }}
    >
      <CardContent sx={{ p: 4, display: "flex", flexDirection: "column", flex: 1 }}>
        <Box sx={{ display: "flex", justifyContent: "left", gap: 1, mb: 2, flexWrap: "wrap" }}>
          {product.tags?.map((tag) => {
            const chipColor = (tag.color && tagColorMap[tag.color]?.chip) || defaultColors.chip;
            return (
              <Chip
                key={tag.id}
                label={tag.label}
                size="small"
                sx={{ bgcolor: chipColor, color: "white", fontWeight: 600 }}
              />
            );
          })}
        </Box>

        <Typography fontWeight="bold" variant="h6" gutterBottom sx={{ mt: 0 }}>
          {product.name}
        </Typography>

        <Box display="flex" alignItems="baseline" mb={2}>
          <Typography variant="h4" component="span" fontWeight="bold" sx={{ color: colors.text }}>
            {product.price}
          </Typography>
          <Typography variant="subtitle2" component="span" sx={{ ml: 0.5 }}>
            /month
          </Typography>
        </Box>

        <List dense sx={{ mb: 3 }}>
          {product.coverages.map((coverage, index) => (
            <ListItem key={`coverage-${index}`} sx={{ py: 0.5 }}>
              <ListItemIcon sx={{ minWidth: 32 }}>
                {coverage.green ? (
                  <CompostIcon fontSize="small" sx={{ color: "success.main" }} />
                ) : (
                  <CheckCircleOutlineIcon fontSize="small" sx={{ color: "success.main" }} />
                )}
              </ListItemIcon>
              <ListItemText
                primary={coverage.label}
                primaryTypographyProps={{ variant: "body2", color: "text.primary" }}
              />
            </ListItem>
          ))}

          {product.exclusions.map((exclusion, index) => (
            <ListItem key={`exclusion-${index}`} sx={{ py: 0.5 }}>
              <ListItemIcon sx={{ minWidth: 32 }}>
                <CancelOutlinedIcon fontSize="small" sx={{ color: "text.secondary" }} />
              </ListItemIcon>
              <ListItemText
                primary={exclusion.label}
                primaryTypographyProps={{
                  variant: "body2",
                  color: "text.secondary",
                  sx: { textDecoration: "line-through", opacity: 0.7 },
                }}
              />
            </ListItem>
          ))}
        </List>

        <Button
          fullWidth
          variant="contained"
          size="large"
          sx={{
            mt: "auto",
            bgcolor: colors.chip,
            "&:hover": { bgcolor: colors.chip, filter: "brightness(0.9)", color: "white" },
          }}
          component={RouterLink}
          to={`/quote?productId=${product.id}`}
        >
          Get a {isGreen ? "Green " : ""}Quote
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
