import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

export default function CheckoutPage() {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    mail: "",
    address: "",
    city: "",
    cap: "",
    cell_number: "",
    paymentMethod: "card",
  });

  const { cart } = useCart();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/order-summary", { state: { formData, cart } });
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
      <div className="mb-3">
        <label className="form-label">Name</label>
        <input
          type="text"
          className="form-control"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Surname</label>
        <input
          type="text"
          className="form-control"
          name="surname"
          value={formData.surname}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">mail</label>
        <input
          type="email"
          className="form-control"
          name="mail"
          value={formData.mail}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Address</label>
        <input
          type="text"
          className="form-control"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">City</label>
        <input
          type="text"
          className="form-control"
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Postal Code</label>
        <input
          type="number"
          className="form-control"
          name="cap"
          value={formData.cap}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">cell_number</label>
        <input
          type="number"
          className="form-control"
          name="cell_number"
          value={formData.cell_number}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Payment method</label>
        <select
          className="form-select"
          name="paymentMethod"
          value={formData.paymentMethod}
          onChange={handleChange}
        >
          <option value="card">Credit Card</option>
          <option value="paypal">PayPal</option>
        </select>
      </div>

      <button type="submit" className="btn btn-success">
        Confirm
      </button>
    </form>
  );
}
