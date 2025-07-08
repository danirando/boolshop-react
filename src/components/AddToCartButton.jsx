import { useState, useEffect } from "react";
import { useCart } from "../contexts/CartContext";

export default function AddToCartButton({
  item,
  onDecrement,
  showSizeSelect = true,
}) {
  const { cart, addToCart, removeFromCart } = useCart();
  const [selectedSize, setSelectedSize] = useState(item.sizes?.[0] || "");
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    setSelectedSize(item.sizes?.[0] || "");
  }, [item.sizes]);

  useEffect(() => {
    const existingItem = cart.find(
      (i) => i.id === item.id && i.size === selectedSize
    );
    setQuantity(existingItem ? existingItem.quantity : 0);
  }, [cart, item.id, selectedSize]);

  if (item.stock <= 0) {
    return <div>Out of stock</div>;
  }

  const handleAdd = (e) => {
    e.stopPropagation();
    if (quantity < item.stock) {
      setQuantity(quantity + 1);
      addToCart({
        ...item,
        size: selectedSize,
        finalPrice:
          item.promo && item.promo > 0
            ? parseFloat(
                (item.price - (item.price * item.promo) / 100).toFixed(2)
              )
            : item.price,
      });
    }
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    if (quantity > 1) {
      setQuantity(quantity - 1);
      removeFromCart(item.id, selectedSize);
    } else if (quantity === 1) {
      setQuantity(0);
      removeFromCart(item.id, selectedSize);
    }
  };

  return (
    <div className="d-flex flex-column gap-2">
      {Array.isArray(item.sizes) && item.sizes.length > 0 && showSizeSelect && (
        <select
          className="form-select"
          style={{ maxWidth: 90 }}
          value={selectedSize}
          onChange={(e) => setSelectedSize(e.target.value)}
          onClick={(e) => e.stopPropagation()}
        >
          {[...new Set(item.sizes)].map((sz) => (
            <option key={`${item.id}-${sz}`} value={sz}>
              {sz}
            </option>
          ))}
        </select>
      )}

      {quantity > 0 ? (
        <div className="d-flex align-items-center gap-2">
          <button className="btn btn-secondary" onClick={handleRemove}>
            –
          </button>
          <span>{quantity}</span>
          <button
            className="btn btn-secondary"
            onClick={handleAdd}
            disabled={quantity >= item.stock}
          >
            +
          </button>
        </div>
      ) : (
        <button
          className="btn add-button"
          onClick={(e) => {
            e.stopPropagation();
            setQuantity(1);
            addToCart({
              ...item,
              size: selectedSize,
              quantity: 1,
              finalPrice:
                item.promo && item.promo > 0
                  ? parseFloat(
                      (item.price - (item.price * item.promo) / 100).toFixed(2)
                    )
                  : item.price,
            });
            if (onDecrement) onDecrement(item.id);
          }}
        >
          Add to cart
        </button>
      )}
    </div>
  );
}
