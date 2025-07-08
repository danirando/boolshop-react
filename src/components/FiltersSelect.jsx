import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function FiltersSelect({ onResultsUpdate }) {
  const [filters, setFilters] = useState({
    size: "",
    category: "",
    order: "",
    price: "",
    promo: "",
  });

  const navigate = useNavigate();
  const location = useLocation();

  // Sincronizza filtri da URL all'avvio o cambio
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setFilters({
      size: params.get("size") || "",
      category: params.get("category") || "",
      order: params.get("order") || "",
      price: params.get("price") || "",
      promo: params.get("promo") || "",
    });
  }, [location.search]);

  const updateFilters = (newFilters) => {
    const updated = { ...filters, ...newFilters };

    // ✅ Conversioni coerenti se necessarie
    const filtersToSend = { ...updated };
    filtersToSend.promo = filtersToSend.promo === "1";
    if (filtersToSend.price) {
      filtersToSend.price = parseFloat(filtersToSend.price);
    }

    setFilters(updated);

    // Aggiorna URL
    const params = new URLSearchParams();
    Object.entries(updated).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });

    navigate(
      { pathname: location.pathname, search: params.toString() },
      { replace: true }
    );

    // 🔧 Endpoint in base a order
    const endpoint = "http://localhost:3000/clothes/f-all";

    axios
      .get(endpoint, { params: filtersToSend })
      .then((res) => onResultsUpdate(res.data))
      .catch((err) => {
        if (err.response && err.response.status === 404) {
          onResultsUpdate([]);
        } else {
          console.error("Errore filtri:", err);
        }
      });
  };

  const resetFilters = () => {
    const reset = {
      size: "",
      category: "",
      order: "",
      price: "",
      promo: "",
    };
    setFilters(reset);

    navigate({ pathname: location.pathname, search: "" }, { replace: true });

    axios
      .get("http://localhost:3000/clothes/f-all")
      .then((res) => onResultsUpdate(res.data))
      .catch((err) => console.error("Errore reset filtri:", err));
  };

  return (
    <div className="d-flex flex-column g-3 gap-3 select-container">
      <div className="d-flex gap-3 select-content">
        <label className="me-2">Order by:</label>
        <label htmlFor="size">Size</label>
        <select
          id="size"
          name="size"
          value={filters.size}
          onChange={(e) => updateFilters({ size: e.target.value })}>
          <option value="">---</option>
          <option value="XS">XS</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
        </select>

        <label htmlFor="price">Price</label>
        <select
          id="order"
          name="order"
          value={filters.order}
          onChange={(e) => updateFilters({ order: e.target.value })}>
          <option value="">---</option>
          <option value="asc">Increasing price</option>
          <option value="desc">Decreasing price</option>
        </select>
      </div>

      <div className="d-flex gap-3 select-content-bottom">
        <div className="d-flex gap-3">
          <label>Filter by:</label>
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={filters.category}
            onChange={(e) => updateFilters({ category: e.target.value })}>
            <option value="">---</option>
            <option value="Tops">Tops</option>
            <option value="Dresses">Dresses</option>
            <option value="Bottoms">Bottoms</option>
            <option value="Outerwear">Outerwear</option>
            <option value="Accessories">Accessories</option>
          </select>

          <label htmlFor="max-price">Max price</label>
          <select
            id="max-price"
            name="max-price"
            value={filters.price}
            onChange={(e) => updateFilters({ price: e.target.value })}>
            <option value="">---</option>
            <option value="10">Up to 10 €</option>
            <option value="20">Up to 20 €</option>
            <option value="30">Up to 30 €</option>
          </select>
        </div>

        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="inPromo"
            checked={filters.promo === "1"}
            onChange={(e) =>
              updateFilters({ promo: e.target.checked ? "1" : "" })
            }
          />
          <label className="form-check-label" htmlFor="inPromo">
            On Sale
          </label>
        </div>

        <button className="btn btn-secondary" onClick={resetFilters}>
          Reset Filtri
        </button>
      </div>
    </div>
  );
}
