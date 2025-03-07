"use client";

import { useRouter } from "next/navigation";
import { Product } from "../styles/types";
import { useCart } from "../cart/cartStore"; // Import Zustand cart store
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const { addToCart, cart } = useCart(); // Zustand cart store

  // Function to handle adding to cart
  const handleAddToCart = () => {
    console.log("Cart before:", cart);

    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1, // Ensure quantity is set
    });

    console.log("Cart after:", useCart.getState().cart);
  };

  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column", p: 2 }}>
      <CardMedia component="img" height="200" image={product.image} alt={product.title} />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" noWrap>{product.title}</Typography>
        <Typography variant="body1" fontWeight="bold">${product.price}</Typography>
      </CardContent>

      {/* Buttons Section */}
      <Button variant="contained" color="primary" sx={{ mt: 1 }} onClick={() => router.push(`/product/${product.id}`)}>
        View Details
      </Button>

      {/* <Button variant="contained" color="secondary" sx={{ mt: 1 }} onClick={handleAddToCart}>
        Add to Cart
      </Button> */}
    </Card>
  );
}
