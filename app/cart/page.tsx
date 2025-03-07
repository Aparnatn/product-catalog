"use client";

import { useCart } from "./cartStore";
import { useRouter } from "next/navigation";
import {
  Container,
  Typography,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ShoppingCart() {
  const router = useRouter();
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = useCart();

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Shopping Cart
      </Typography>

      {cart.length === 0 ? (
        <Typography variant="h6" align="center">
          Your cart is empty.
        </Typography>
      ) : (
        <>
          <List>
            {cart.map((item) => (
              <ListItem key={item.id}>
                <ListItemAvatar>
                  <Avatar src={item.image} />
                </ListItemAvatar>
                <ListItemText
                  primary={item.title}
                  secondary={`$${item.price} x ${item.quantity} = $${(item.price * item.quantity).toFixed(2)}`}
                />
                <IconButton color="primary" onClick={() => decreaseQuantity(item.id)}>
                  <RemoveIcon />
                </IconButton>
                <Typography>{item.quantity}</Typography>
                <IconButton color="primary" onClick={() => increaseQuantity(item.id)}>
                  <AddIcon />
                </IconButton>
                <IconButton edge="end" color="error" onClick={() => removeFromCart(item.id)}>
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>

          <Typography variant="h5" fontWeight="bold" sx={{ mt: 3 }}>
            Total: ${totalPrice.toFixed(2)}
          </Typography>

          <Button variant="contained" color="error" sx={{ mt: 2, mr: 2 }} onClick={clearCart}>
            Clear Cart
          </Button>
          <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={() => router.push("/checkout")}>
            Proceed to Checkout
          </Button>
        </>
      )}
    </Container>
  );
}
