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

  const [errors, setErrors] = useState({});

  const { cart } = useCart();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    const error = validateField(name, value);

    setErrors((prev) => {
      const updatedErrors = { ...prev };
      if (error) {
        updatedErrors[name] = error;
      } else {
        delete updatedErrors[name];
      }
      return updatedErrors;
    });
  };

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "name":
      case "surname":
        if (!/^[a-zA-Z\s]+$/.test(value)) {
          error = `${name} must contain only letters.`;
        }
        break;
      case "mail":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = "Please enter a valid email address.";
        }
        break;
      case "cap":
        if (value.length !== 5 || !/^\d+$/.test(value)) {
          error = "Postal code must be 5 digits.";
        }
        break;
      case "cell_number":
        if (!/^\d{10}$/.test(value)) {
          error = "Cell number must be 10 digits.";
        }
        break;
      default:
        break;
    }

    return error;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      navigate("/order-summary", { state: { formData, cart } });
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="row g-3">
          <div className="col-6 mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            {errors.name && <div className="text-danger">{errors.name}</div>}
          </div>

          <div className="col-6 mb-3">
            <label className="form-label">Surname</label>
            <input
              type="text"
              className="form-control"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
              required
            />
            {errors.surname && (
              <div className="text-danger">{errors.surname}</div>
            )}
          </div>

          <div className="col-12 mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              name="mail"
              value={formData.mail}
              onChange={handleChange}
              required
            />
            {errors.mail && <div className="text-danger">{errors.mail}</div>}
          </div>

          <div className="col-6 mb-3">
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

          <div className="col-4 mb-3">
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

          <div className="col-2 mb-3">
            <label className="form-label">Postal Code</label>
            <input
              type="number"
              className="form-control"
              name="cap"
              value={formData.cap}
              onChange={handleChange}
              required
            />
            {errors.cap && <div className="text-danger">{errors.cap}</div>}
          </div>

          <div className="col-6 mb-3">
            <label className="form-label">Cell Number</label>
            <input
              type="number"
              className="form-control"
              name="cell_number"
              value={formData.cell_number}
              onChange={handleChange}
              required
            />
            {errors.cell_number && (
              <div className="text-danger">{errors.cell_number}</div>
            )}
          </div>

          <div className="col-6 mb-3">
            <label className="form-label">Payment method</label>
            <select
              className="form-select"
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}>
              <option value="card">Credit Card</option>
              <option value="paypal">PayPal</option>
            </select>
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-success">
              Confirm
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
