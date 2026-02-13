import { Box, Container, Typography, Grid, Skeleton } from "@mui/material";
import ProductCard, { type Product } from "./ProductCard";
import { useEffect, useState } from "react";
import axios from "axios";

const ProductSection = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchProducts = async () => {
      try {
        setLoading(true);

        const response = await axios.get("api/products", {
          signal: controller.signal,
        });

        const fetchedProducts: Product[] = response.data.map(
          (product: any) => ({
            id: product.id,
            name: product.name,
            price: `€${product.baseRate.toFixed(2)}`,
            mostPopular: product.mostPopular,
            coverages: product.coverages.map((coverage: any) => coverage.label),
            exclusions: product.exclusions.map(
              (exclusion: any) => exclusion.label,
            ),
          }),
        );

        setProducts(fetchedProducts);
        setError(null);
      } catch (err: any) {
        if (!axios.isCancel(err)) {
          setError(err.response?.data?.message || "Failed to load products.");
          console.error("API Error:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();

    return () => controller.abort();
  }, []);

  return (
    <Box component="section" sx={{ py: { xs: 6, md: 8 }, minHeight: '60vh', display: 'flex', flexDirection: 'column' }}>
      <Container maxWidth="lg">
        {/* stuff above the 3 cards */}
        <Box textAlign="center" mb={5}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Choose Your Protection Plan
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Select the coverage that best fits your lifestyle. All plans include
            fast claims processing and expert support.
          </Typography>
        </Box>

        {/* iterates through the 3 pricing plans and creates the cards*/}
        <Grid
          container
          spacing={4}
          justifyContent="center"
          alignItems="stretch"
        >
          {loading
            ?
              Array.from(new Array(3)).map((_, index) => (
                <Grid key={index} size={{ xs: 12, md: 4 }}>
                  <Skeleton
                    variant="rectangular"
                    height={500}
                    sx={{ borderRadius: 3 }}
                    animation="wave"
                  />
                </Grid>
              ))
            : products.map((product) => (
                <Grid
                  key={product.name}
                  size={{ xs: 12, md: 4 }}
                  sx={{ display: "flex" }}
                >
                  <ProductCard product={product} />
                </Grid>
              ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default ProductSection;
