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
  mostPopular: boolean;
  green: boolean;
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
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const hasHighlightedBorder = product.mostPopular || product.green;
  const cardBorderColor = product.green
    ? "success.light"
    : product.mostPopular
      ? "primary.main"
      : "grey.300";
  return (
    <Card
      elevation={product.mostPopular ? 6 : 2}
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        borderRadius: 3,
        position: "relative",
        border: hasHighlightedBorder ? "2px solid" : "1px solid",
        borderColor: cardBorderColor,
        transition: "transform 0.2s ease-in-out",
        "&:hover": {
          transform: "translateY(-4px)", // Subtle hover effect
        },
      }}
    >
      <CardContent sx={{ p: 4, display: "flex", flexDirection: "column", flex: 1 }}>
        <Box sx={{ display: "flex", justifyContent: "left", gap: 1, mb: 2, flexWrap: "wrap" }}>
          {product.tags?.map((tag) => (
            <Chip
              key={tag.id}
              label={tag.label}
              size="small"
              color="primary"
              sx={{ bgcolor: product.green ? "success.main" : "primary.main" }}
            />
          ))}
        </Box>

        <Typography fontWeight="bold" variant="h6" gutterBottom sx={{ mt: 0 }}>
          {product.name}
        </Typography>

        <Box display="flex" alignItems="baseline" mb={2}>
          <Typography
            variant="h4"
            component="span"
            fontWeight="bold"
            color={product.green ? "success.main" : "primary.main"}
          >
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
                primaryTypographyProps={{
                  variant: "body2",
                  color: "text.primary",
                }}
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
          color="primary" // keep a valid palette color
          size="large"
          sx={{
            mt: "auto",
            textDecoration: "none",
            bgcolor: product.green ? "success.main" : "primary.main",
            "&:hover": {
              bgcolor: product.green ? "success.main" : "primary.dark",
              color: "white",
            },
          }}
          component={RouterLink}
          to={`/quote?productId=${product.id}`}
        >
          Get a {product.green ? "Green" : ""} Quote
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
