"use client";

import { useCart } from "../cart/cartStore";
import { useRouter } from "next/navigation";
import {
  Container,
  Typography,
  Button,
  TextField,
  Box,
  Card,
  CardContent,
} from "@mui/material";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const router = useRouter();

  if (cart.length === 0) {
    return (
      <Container sx={{ mt: 4, textAlign: "center" }}>
        <Typography variant="h5">Your cart is empty</Typography>
        <Button variant="contained" sx={{ mt: 2 }} onClick={() => router.push("/")}>
          Go Shopping
        </Button>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Checkout
      </Typography>

      {/* Shipping Form */}
      <Card sx={{ p: 3, mb: 3 }}>
        <CardContent>
          <Typography variant="h6">Shipping Details</Typography>
          <Box sx={{ mt: 2 }}>
            <TextField fullWidth label="Full Name" sx={{ mb: 2 }} required />
            <TextField fullWidth label="Email Address" type="email" sx={{ mb: 2 }} required />
            <TextField fullWidth label="Shipping Address" sx={{ mb: 2 }} required />
            <TextField fullWidth label="City" sx={{ mb: 2 }} required />
            <TextField fullWidth label="Postal Code" sx={{ mb: 2 }} required />
          </Box>
        </CardContent>
      </Card>

      {/* Order Summary */}
      <Card sx={{ p: 3 }}>
        <CardContent>
          <Typography variant="h6">Order Summary</Typography>
          {cart.map((item) => (
            <Typography key={item.id}>
              {item.title} - ${item.price} x {item.quantity} = $
              {(item.price * item.quantity).toFixed(2)}
            </Typography>
          ))}
          <Typography variant="h6" sx={{ mt: 2 }}>
            Total: $
            {cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
          </Typography>
        </CardContent>
      </Card>

      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 3 }}
        fullWidth
        onClick={() => {
          clearCart();
          alert("Order Placed Successfully!");
          router.push("/");
        }}
      >
        Place Order
      </Button>
    </Container>
  );
}
