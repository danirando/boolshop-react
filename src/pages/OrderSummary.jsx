import { useCart } from "../contexts/CartContext";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function OrderSummary() {
  const { cart, clearCart } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const [promoData, setPromoData] = useState(null);
  const [isInvalidCode, setIsInvalidCode] = useState(false);
  const [isCodeValidated, setIsCodeValidated] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const location = useLocation();
  const formData = location.state?.formData;
  const navigate = useNavigate();

  const totalWithoutShipping = cart.reduce(
    (sum, item) => sum + (item.finalPrice ?? item.price) * item.quantity,
    0
  );

  const discount = promoData ? promoData.value / 100 : 0;
  const discountedTotal = totalWithoutShipping * (1 - discount);
  const shippingCost = discountedTotal > 70 ? 0 : 5;
  const totalPrice = discountedTotal + shippingCost;

  const validatePromoCode = () => {
    if (!promoCode.trim()) {
      setPromoData(null);
      setIsInvalidCode(false);
      setIsCodeValidated(true);
      return;
    }

    axios
      .post("http://localhost:3000/guest/validate-code", { code: promoCode })
      .then((res) => {
        if (res.data.valid) {
          setPromoData({
            id: res.data.promo_code_id,
            value: res.data.discount,
          });
          setIsInvalidCode(false);
        } else {
          setPromoData(null);
          setIsInvalidCode(true);
        }
        setIsCodeValidated(true);
      })
      .catch((err) => {
        console.error("Validation error:", err);
        setPromoData(null);
        setIsInvalidCode(true);
        setIsCodeValidated(true);
      });
  };

  const handleConfirm = () => {
    const data = {
      promo_code_id: promoData ? promoData.id : null,
      discount: promoData ? promoData.value : 0,
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
    return (
      <>
        <div className="container text-center">
          <div className="row justify-content-center">
            <h1 className="my-5">Order confirmed!</h1>
            <h3 className="my-3">
              Thank you for choosing us, we have sent you an email with all the
              details regarding your purchase! Hope to see you soon!
            </h3>
            <button
              className="add-button btn mt-3 col-2 confirm"
              onClick={() => navigate("/")}
            >
              Back to Homepage
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="container my-3">
      <h2>Your order</h2>
      <ul>
        {cart.map((item) => (
          <li key={`${item.id}-${item.size}`}>
            {item.name} ({item.size}) x {item.quantity} = €
            {((item.finalPrice ?? item.price) * item.quantity).toFixed(2)}
          </li>
        ))}
      </ul>

      <p>Total (without shipping): €{totalWithoutShipping.toFixed(2)}</p>
      <p>Discount: {discount * 100}%</p>

      <div>
        <label>Promo code: </label>
        <input
          value={promoCode}
          onChange={(e) => {
            setPromoCode(e.target.value);
            setIsCodeValidated(false);
            setIsInvalidCode(false);
          }}
        />
        <button className="btn btn-secondary ms-2" onClick={validatePromoCode}>
          Check promo code
        </button>
        {isInvalidCode && <p style={{ color: "red" }}>Invalid promo code</p>}
        {promoData && (
          <p style={{ color: "green" }}>
            Valid promo code: discount: {promoData.value}%
          </p>
        )}
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
