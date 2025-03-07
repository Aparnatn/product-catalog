"use client"; // Required for client components

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "./utils/fetchProduct";
import { useRouter } from "next/navigation";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CircularProgress,
  Container,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

// Define the Product type
type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
};

export default function HomePage() {
  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const [category, setCategory] = useState("all");
  const router = useRouter();

  // Handle category change
  const handleCategoryChange = (event: any) => {
    setCategory(event.target.value);
  };

  // Filter products by category
  const filteredProducts =
    category === "all" ? products : products?.filter((p) => p.category === category);

  if (isLoading) return <CircularProgress sx={{ display: "block", mx: "auto", mt: 5 }} />;
  if (error) return <Typography color="error">Failed to load products</Typography>;

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Product Listing
      </Typography>

      {/* Category Filter Dropdown */}
      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Filter by Category</InputLabel>
        <Select value={category} onChange={handleCategoryChange}>
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="electronics">Electronics</MenuItem>
          <MenuItem value="jewelery">Jewelry</MenuItem>
          <MenuItem value="men's clothing">Men's Clothing</MenuItem>
          <MenuItem value="women's clothing">Women's Clothing</MenuItem>
        </Select>
      </FormControl>

      {/* Product Grid */}
      <Grid container spacing={3}>
        {filteredProducts?.map((product: Product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
              <CardMedia component="img" height="200" image={product.image} alt={product.title} />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" noWrap>
                  {product.title}
                </Typography>
                <Typography variant="body1" fontWeight="bold">
                  ${product.price}
                </Typography>
              </CardContent>
              <Button
                variant="contained"
                color="primary"
                sx={{ m: 1 }}
                onClick={() => router.push(`/product/${product.id}`)} // Navigate to Product Details
              >
                View Details
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
