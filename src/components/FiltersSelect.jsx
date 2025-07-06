import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function FiltersSelect({ onResultsUpdate }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [size, setSize] = useState("");
  const [category, setCategory] = useState("");
  const [order, setOrder] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [loading, setLoading] = useState(false);

  const [syncedFromUrl, setSyncedFromUrl] = useState(false);

  const readFiltersFromUrl = () => {
    const params = new URLSearchParams(location.search);
    return {
      size: params.get("size") || "",
      category: params.get("category") || "",
      order: params.get("order") || "",
      maxPrice: params.get("price") || "",
    };
  };

  useEffect(() => {
    if (!syncedFromUrl) {
      const filters = readFiltersFromUrl();
      setSize(filters.size);
      setCategory(filters.category);
      setOrder(filters.order);
      setMaxPrice(filters.maxPrice);
      setSyncedFromUrl(true);
    }
  }, [location.search, syncedFromUrl]);

  useEffect(() => {
    if (!syncedFromUrl) return;

    const params = new URLSearchParams();
    if (size) params.set("size", size);
    if (category) params.set("category", category);
    if (order) params.set("order", order);
    if (maxPrice) params.set("price", maxPrice);

    navigate({ search: params.toString() }, { replace: true });

    setLoading(true);
    axios
      .get("http://localhost:3000/clothes/f-all", {
        params: { size, category, order, price: maxPrice },
      })
      .then((res) => onResultsUpdate(res.data))
      .catch((err) => {
        if (err.response && err.response.status === 404) {
          onResultsUpdate([]);
        } else {
          console.error("Errore filtri:", err);
        }
      })
      .finally(() => setLoading(false));
  }, [
    size,
    category,
    order,
    maxPrice,
    syncedFromUrl,
    navigate,
    onResultsUpdate,
  ]);

  const handleChange = (setter) => (e) => {
    setter(e.target.value);
  };

  // Nuova funzione per resettare i filtri
  const resetFilters = () => {
    setSize("");
    setCategory("");
    setOrder("");
    setMaxPrice("");
  };

  return (
    <div className="d-flex align-items-center my-3 gap-3">
      <label className="me-2">Filtri:</label>

      <select value={size} onChange={handleChange(setSize)}>
        <option value="">Filtra per taglia</option>
        <option value="XS">XS</option>
        <option value="S">S</option>
        <option value="M">M</option>
        <option value="L">L</option>
      </select>

      <select value={category} onChange={handleChange(setCategory)}>
        <option value="">Filtra per categoria</option>
        <option value="Tops">Tops</option>
        <option value="Dresses">Dresses</option>
        <option value="Bottoms">Bottoms</option>
        <option value="Outerwear">Outerwear</option>
        <option value="Accessories">Accessories</option>
      </select>

      <select value={order} onChange={handleChange(setOrder)}>
        <option value="">Ordina per prezzo</option>
        <option value="asc">Prezzo crescente</option>
        <option value="desc">Prezzo decrescente</option>
      </select>

      <select
        value={maxPrice}
        onChange={handleChange(setMaxPrice)}
        aria-label="Filtra per prezzo massimo">
        <option value="">Filtra per prezzo</option>
        <option value="10">Fino a 10 €</option>
        <option value="20">Fino a 20 €</option>
        <option value="30">Fino a 30 €</option>
        <option value="50">Fino a 50 €</option>
      </select>

      {/* Bottone reset */}
      <button className="btn btn-secondary" onClick={resetFilters}>
        Reset filtri
      </button>
    </div>
  );
}
