import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function FiltersSelect({ onResultsUpdate }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Stati filtri
  const [size, setSize] = useState("");
  const [category, setCategory] = useState("");
  const [order, setOrder] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [inPromo, setInPromo] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    const filters = {
      size: params.get("size") || "",
      category: params.get("category") || "",
      order: params.get("order") || "",
      price: params.get("price") || "",
      query: params.get("query") || "",
      promo: params.get("promo") === "1" ? "1" : "",
    };

    setSize(filters.size);
    setCategory(filters.category);
    setOrder(filters.order);
    setMaxPrice(filters.price);
    setSearchQuery(filters.query);
    setInPromo(filters.promo === "1");

    const filteredParams = {};
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== "" && value !== null) {
        filteredParams[key] = value;
      }
    });

    axios
      .get("http://localhost:3000/clothes/f-all", { params: filteredParams })
      .then((res) => {
        onResultsUpdate(res.data);
      })
      .catch((err) => {
        console.error("Errore caricamento vestiti:", err);
        onResultsUpdate([]);
      });
  }, [location.search]);

  const updateFilters = (newFilters) => {
    const currentParams = new URLSearchParams(location.search);

    Object.entries(newFilters).forEach(([key, value]) => {
      if (value !== "" && value !== null && value !== undefined) {
        currentParams.set(key, value);
      } else {
        currentParams.delete(key);
      }
    });

    // Rimuovi eventuali parametri vuoti rimasti
    const cleanedParams = new URLSearchParams();
    currentParams.forEach((value, key) => {
      if (value !== "" && value !== null && value !== undefined) {
        cleanedParams.set(key, value);
      }
    });

    navigate(
      {
        pathname: location.pathname,
        search: cleanedParams.toString(),
      },
      { replace: true }
    );
  };

  return (
    <div className="container-fluid select-container">
      <div className="row g-3">
        <div className="col-12 col-sm-6 col-md-4">
          <label htmlFor="price" className="form-label">
            Order by price
          </label>
          <select
            id="price"
            name="price"
            value={order}
            onChange={(e) => updateFilters({ order: e.target.value })}
            className="form-select">
            <option value="">---</option>
            <option value="asc">Increasing price</option>
            <option value="desc">Decreasing price</option>
          </select>
        </div>

        <div className="col-12 col-sm-6 col-md-4">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={category}
            onChange={(e) => updateFilters({ category: e.target.value })}
            className="form-select">
            <option value="">---</option>
            <option value="Tops">Tops</option>
            <option value="Dresses">Dresses</option>
            <option value="Bottoms">Bottoms</option>
            <option value="Outerwear">Outerwear</option>
            <option value="Accessories">Accessories</option>
          </select>
        </div>

        <div className="col-12 col-sm-6 col-md-4">
          <label htmlFor="max-price" className="form-label">
            Max price
          </label>
          <select
            id="max-price"
            name="max-price"
            value={maxPrice}
            onChange={(e) => updateFilters({ price: e.target.value })}
            className="form-select">
            <option value="">---</option>
            <option value="10">Up to 10 €</option>
            <option value="20">Up to 20 €</option>
            <option value="30">Up to 30 €</option>
          </select>
        </div>

        <div className="col-12 col-sm-6 col-md-4">
          <label htmlFor="size" className="form-label">
            Size
          </label>
          <select
            id="size"
            name="size"
            value={size}
            onChange={(e) => updateFilters({ size: e.target.value })}
            className="form-select">
            <option value="">---</option>
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
          </select>
        </div>

        <div className="col-12 col-sm-6 col-md-4 d-flex align-items-center">
          <div className="form-check mt-4">
            <input
              className="form-check-input"
              type="checkbox"
              id="inPromo"
              checked={inPromo}
              onChange={(e) =>
                updateFilters({ promo: e.target.checked ? "1" : "" })
              }
            />
            <label className="form-check-label" htmlFor="inPromo">
              On Sale
            </label>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-md-4 d-flex align-items-center">
          <button
            className="btn btn-secondary w-100 mt-3 mt-sm-4"
            onClick={() =>
              updateFilters({
                size: "",
                category: "",
                order: "",
                price: "",
                promo: "",
              })
            }>
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  );
}
