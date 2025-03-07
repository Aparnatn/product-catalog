"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "./utils/fetchProduct";
import { fetchCategories } from "./utils/fetchCategories";
import { Product } from "./styles/types";
import { useRouter } from "next/navigation";
import {
  Grid,
  CircularProgress,
  Container,
  FormControl,
  InputLabel,
  Select,
  Button,
  MenuItem,
  Typography,
} from "@mui/material";
import ProductCard from "./components/ProductCard"; // Import the new component
import { relative } from "path";

export default function HomePage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Fetch products & categories
  const { data: products = [], isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const { data: categories = [], isLoading: isCategoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  if (isLoading) return <CircularProgress sx={{ display: "block", mx: "auto", mt: 5 }} />;
  if (error) return <Typography color="error">Failed to load products</Typography>;

  // Filter products based on selected category
  const filteredProducts =
    selectedCategory === "All" ? products : products.filter((p: Product) => p.category === selectedCategory);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Product Listing
      </Typography>

      {/* Category Filter */}
      <FormControl sx={{ mb: 3, minWidth: 200, }} >
        <InputLabel shrink>Category</InputLabel>
        <Select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          {categories?.map((category) => (
            <MenuItem key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Product Grid */}
      <Grid container spacing={3}>
        {filteredProducts.map((product: Product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
