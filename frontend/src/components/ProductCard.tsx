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
  ListItemText 
} from "@mui/material";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { Link as RouterLink } from "react-router-dom";


export interface Product {
  id: string;
  name: string;
  price: string;
  mostPopular?: boolean;
  coverages: String[];
  exclusions: String[];
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
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
        border: product.mostPopular ? "2px solid" : "1px solid",
        borderColor: product.mostPopular ? "primary.main" : "grey.300",
        transition: "transform 0.2s ease-in-out",
        "&:hover": {
          transform: "translateY(-4px)", // Subtle hover effect
        },
      }}
    >
      <CardContent sx={{ p: 4, display: "flex", flexDirection: "column", flex: 1 }}>
        
        {product.mostPopular && (
          <Chip
            label="Most Popular"
            color="primary"
            size="small"
            sx={{
              position: "absolute",
              top: 16,
              left: "50%",
              transform: "translateX(-50%)",
            }}
          />
        )}

        <Typography variant="h6" gutterBottom sx={{ mt: product.mostPopular ? 4 : 0 }}>
          {product.name}
        </Typography>

        <Box display="flex" alignItems="baseline" mb={2}>
          <Typography variant="h4" component="span" fontWeight="bold">
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
                  <CheckCircleOutlineIcon fontSize="small" sx={{ color: "success.main" }} />
              </ListItemIcon>

              <ListItemText
                primary={coverage}
                primaryTypographyProps={{
                variant: "body2",
                color: "text.primary"
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
                primary={exclusion}
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
          color="primary"
          size="large"
          sx={{ mt: "auto" }}
          component={RouterLink}
          to={`/quote?productId=${product.id}`}
        >
        Get a Quote
        </Button>


      </CardContent>
    </Card>
  );
};

export default ProductCard;