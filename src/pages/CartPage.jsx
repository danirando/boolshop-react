import { useContext } from "react";
import { useCart } from "../contexts/CartContext";

export default function CartPage() {
  const cart = useCart();
  return <h1>cart</h1>;
}
