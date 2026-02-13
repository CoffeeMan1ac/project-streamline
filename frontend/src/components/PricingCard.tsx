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


export interface Feature {
  label: string;
  included: boolean;
}

export interface PricingPlan {
  name: string;
  price: string;
  popular?: boolean;
  features: Feature[];
}

interface PricingCardProps {
  plan: PricingPlan;
}

const PricingCard = ({ plan }: PricingCardProps) => {
  return (
    <Card
      elevation={plan.popular ? 6 : 2}
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        borderRadius: 3,
        position: "relative",
        border: plan.popular ? "2px solid" : "1px solid",
        borderColor: plan.popular ? "primary.main" : "grey.300",
      }}
    >
      <CardContent sx={{ p: 4, display: "flex", flexDirection: "column", flex: 1 }}>
        
        {plan.popular && (
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

        <Typography variant="h6" gutterBottom sx={{ mt: plan.popular ? 4 : 0 }}>
          {plan.name}
        </Typography>

        <Box display="flex" alignItems="baseline" mb={2}>
          <Typography variant="h4" component="span" fontWeight="bold">
            {plan.price}
          </Typography>
          <Typography variant="subtitle2" component="span" sx={{ ml: 0.5 }}>
            /month
          </Typography>
        </Box>

        <List dense sx={{ mb: 3 }}>
          {plan.features.map((feature, index) => (
            <ListItem key={index} sx={{ py: 0.5 }}>
              <ListItemIcon sx={{ minWidth: 32 }}>
                {feature.included ? (
                  <CheckCircleOutlineIcon fontSize="small" sx={{ color: "success.main" }} />
                ) : (
                  <CancelOutlinedIcon fontSize="small" sx={{ color: "text.secondary" }} />
                )}
              </ListItemIcon>

              <ListItemText
                primary={feature.label}
                primaryTypographyProps={{
                variant: "body2",
                color: feature.included ? "text.primary" : "text.secondary",
                sx: feature.included ? {} : { textDecoration: "line-through", opacity: 0.7 },
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
          to="/quote"
        >
        Get a Quote
        </Button>


      </CardContent>
    </Card>
  );
};

export default PricingCard;