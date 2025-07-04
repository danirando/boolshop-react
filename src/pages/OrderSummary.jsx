import { useCart } from "../contexts/CartContext";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function OrderSummary() {
  const { cart, clearCart } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const validCodes = {
    SAVE10: 0.1,
    SAVE20: 0.2,
    SAVE30: 0.3,
  };
  const location = useLocation();
  const formData = location.state?.formData;

  const totalWithoutShipping = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const discount = validCodes[promoCode.toUpperCase()] || 0;
  const discountedTotal = totalWithoutShipping * (1 - discount);
  const shippingCost = discountedTotal > 70 ? 0 : 5;
  const totalPrice = discountedTotal + shippingCost;

  const handleConfirm = () => {
    const promoCodeIds = {
      SAVE10: 1,
      SAVE20: 2,
      SAVE30: 3,
    };

    const promoCodeUpper = promoCode.toUpperCase();
    const promo_code_id = promoCodeIds[promoCodeUpper] || null;

    const data = {
      promo_code_id,
      name: formData.name,
      surname: formData.surname,
      mail: formData.mail,
      address: formData.address,
      cell_number: formData.cell_number,
      city: formData.city,
      cap: formData.cap,
      total_price: parseFloat(totalPrice.toFixed(2)),
      shipping_cost: parseFloat(shippingCost.toFixed(2)),
      cart,
    };

    axios
      .post("http://localhost:3000/guest/checkout", data)
      .then(() => {
        clearCart();
        setConfirmed(true);
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  };

  if (!formData) {
    return <p>Error: wrong data saved</p>;
  }

  if (confirmed) {
    return <h2>Order confirmed!</h2>;
  }

  return (
    <div>
      <h2>Your order</h2>
      <ul>
        {cart.map((item) => (
          <li key={`${item.id}-${item.size}`}>
            {item.name} ({item.size}) x {item.quantity} = €
            {(item.price * item.quantity).toFixed(2)}
          </li>
        ))}
      </ul>

      <p>Total (without shipping): €{totalWithoutShipping.toFixed(2)}</p>
      <p>Discount: {discount * 100}%</p>

      <div>
        <label>Promo code: </label>
        <input
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
        />
      </div>

      <p>Shipping: €{shippingCost.toFixed(2)}</p>
      <p>
        <strong>Total: €{totalPrice.toFixed(2)}</strong>
      </p>

      <button className="btn btn-success" onClick={handleConfirm}>
        Confirm order
      </button>
    </div>
  );
}
