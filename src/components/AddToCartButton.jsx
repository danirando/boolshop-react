import { useState, useEffect } from "react";
import { useCart } from "../contexts/CartContext";

export default function AddToCartButton({
  item,
  onDecrement,
  showSizeSelect = true,
}) {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState(item.sizes?.[0]?.name || "");

  useEffect(() => {
    setSelectedSize(item.sizes?.[0]?.name || "");
  }, [item.sizes]);

  if (item.stock <= 0) {
    return <div>Out of stock</div>;
  }

  return (
    <div className="d-flex flex-column gap-2">
      {Array.isArray(item.sizes) && item.sizes.length > 0 && (
        <select
          className="form-select"
          style={{ maxWidth: 90 }}
          value={selectedSize}
          onChange={(e) => setSelectedSize(e.target.value)}
          onClick={(e) => e.stopPropagation()}>
          {[...new Set(item.sizes)].map((sz) => (
            <option key={`${item.id}-${sz}`} value={sz}>
              {sz}
            </option>
          ))}
        </select>
      )}
      <button
        className="btn add-button"
        onClick={(e) => {
          e.stopPropagation();
          addToCart({
            ...item,
            size: selectedSize,
          });
          if (onDecrement) onDecrement(item.id);
        }}>
        Add to cart
      </button>
    </div>
  );
}
