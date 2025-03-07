"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { fetchProductById } from "../../utils/fetchProductId";
import { Product } from "../../styles/types";
import { useRouter } from "next/navigation";

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CircularProgress,
  Container,
} from "@mui/material";
import { useCart } from "../../cart/cartStore"; // Zustand cart store

export default function ProductDetails() {
  const router = useRouter();
  const { id } = useParams(); // Get product ID from URL
  const { addToCart } = useCart();

  // Fetch product by ID
  const { data: product, isLoading, error } = useQuery<Product>({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id as string),
    enabled: !!id, // Ensure query runs only when id is available
  });

  if (isLoading) return <CircularProgress sx={{ display: "block", mx: "auto", mt: 5 }} />;
  if (error || !product) return <Typography color="error">Failed to load product</Typography>;

  const handleAddToCart = () => {
    console.log("Cart before:", useCart.getState().cart);

    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
    
    console.log("Cart after:", useCart.getState().cart);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Card sx={{ display: "flex", flexDirection: "column", alignItems: "center", p: 3 }}>
        <CardMedia component="img" height="300" image={product.image} alt={product.title} />
        <CardContent>
          <Typography variant="h5" fontWeight="bold">{product.title}</Typography>
          <Typography variant="body1" color="text.secondary">{product.description}</Typography>
          <Typography variant="h6" sx={{ mt: 2 }}>Category: {product.category}</Typography>
          <Typography variant="h6" sx={{ mt: 1 }}>Price: ${product.price}</Typography>
          <Typography variant="h6" sx={{ mt: 1 }}>Rating: {product.rating?.rate} ⭐</Typography>
        </CardContent>

        {/* Add to Cart Button */}
        <Button variant="contained" color="primary" sx={{ mb: 2 }} onClick={handleAddToCart}>
          Add to Cart
        </Button>

        {/* Go to Cart Button */}
        <Button variant="contained" color="secondary" onClick={() => router.push("/cart")}>
          Go to Cart
        </Button>
      </Card>
    </Container>
  );
}
