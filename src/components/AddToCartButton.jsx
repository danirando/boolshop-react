import { useCart } from "../contexts/CartContext";

export default function AddToCartButton({ item }) {
  const { cart, addToCart } = useCart();

  return (
    <button className="btn add-button" onClick={() => addToCart(item)}>
      Add to cart
    </button>
  );
}
