import { useCart } from "../contexts/CartContext";

export default function AddToCartButton({ item }) {
  const { cart, addToCart } = useCart();

  return (
    <button
      className="btn add-button"
      onClick={(e) => {
        e.stopPropagation();
        addToCart({
          ...item,
          size: selectedSizes[item.id] || item.sizes[0],
        });
      }}>
      Add to cart
    </button>
  );
}
