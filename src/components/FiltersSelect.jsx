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

  // Sincronizza stato filtri + query con URL all'avvio e quando location.search cambia
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSize(params.get("size") || "");
    setCategory(params.get("category") || "");
    setOrder(params.get("order") || "");
    setMaxPrice(params.get("price") || "");
    setSearchQuery(params.get("query") || "");
    setInPromo(params.get("promo") === "1");
  }, [location.search]);

  const updateFilters = (newFilters) => {
    const currentParams = new URLSearchParams(location.search);

    // Aggiorna currentParams con i nuovi filtri ricevuti
    Object.entries(newFilters).forEach(([key, value]) => {
      if (key === "promo") {
        const isPromo = value === "1";
        setInPromo(isPromo);
        if (isPromo) {
          currentParams.set("promo", "1");
        } else {
          currentParams.delete("promo");
        }
      } else {
        if (value) {
          currentParams.set(key, value);
        } else {
          currentParams.delete(key);
        }
      }
    });

    // Aggiorna stati locali coerenti
    if ("size" in newFilters) setSize(newFilters.size);
    if ("category" in newFilters) setCategory(newFilters.category);
    if ("order" in newFilters) setOrder(newFilters.order);
    if ("price" in newFilters) setMaxPrice(newFilters.price);

    // Prepara i params per axios DOPO aver aggiornato currentParams
    const params = {};
    currentParams.forEach((value, key) => {
      params[key] = value;
    });

    // Aggiorna URL
    navigate(
      {
        pathname: location.pathname,
        search: currentParams.toString(),
      },
      { replace: true }
    );
    console.log("PARAMS PER AXIOS:", params);
    // Chiamata axios al backend
    axios
      .get(`http://localhost:3000/clothes/f-all`, { params })
      .then((res) => onResultsUpdate(res.data))
      .catch((err) => {
        if (err.response && err.response.status === 404) {
          onResultsUpdate([]);
        } else {
          console.error("Errore filtri:", err);
        }
      });
  };

  return (
    <>
      {" "}
      <div className="d-flex flex-column g-3 gap-3">
        <div className="d-flex gap-3">
          <label className="me-2">Order by:</label>
          <label htmlFor="size">Taglia</label>
          <select
            name="size"
            value={size}
            onChange={(e) => updateFilters({ size: e.target.value })}>
            <option value="">---</option>
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
          </select>
          <label htmlFor="price">Price</label>
          <select
            name="price"
            value={order}
            onChange={(e) => updateFilters({ order: e.target.value })}>
            <option value="">---</option>
            <option value="asc">Prezzo crescente</option>
            <option value="desc">Prezzo decrescente</option>
          </select>
        </div>
        <div className="d-flex gap-3">
          <label>Filter by:</label>
          <label htmlFor="Category">Category</label>
          <select
            name="category"
            value={category}
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
            name="max-price"
            value={maxPrice}
            onChange={(e) => updateFilters({ price: e.target.value })}
            aria-label="Filtra per prezzo massimo">
            <option value="">---</option>
            <option value="10">Fino a 10 €</option>
            <option value="20">Fino a 20 €</option>
            <option value="30">Fino a 30 €</option>
          </select>
          <div className="form-check">
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
              In Promo
            </label>
          </div>

          <button
            className="btn btn-secondary"
            onClick={() =>
              updateFilters({
                size: "",
                category: "",
                order: "",
                price: "",
                promo: "",
              })
            }>
            Reset Filtri
          </button>
        </div>
      </div>
    </>
  );
}
