import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function FiltersSelect({ onResultsUpdate, searchQuery }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Stato filtri
  const [size, setSize] = useState("");
  const [category, setCategory] = useState("");
  const [order, setOrder] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // Sincronizza stato filtri con query params all'avvio
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSize(params.get("size") || "");
    setCategory(params.get("category") || "");
    setOrder(params.get("order") || "");
    setMaxPrice(params.get("price") || "");
  }, [location.search]);

  // Funzione per aggiornare filtri e URL
  const updateFilters = (newFilters) => {
    const filters = {
      size,
      category,
      order,
      price: maxPrice,
      query: searchQuery || "",
      ...newFilters,
    };

    // Aggiorna stato locale
    if ("size" in newFilters) setSize(newFilters.size);
    if ("category" in newFilters) setCategory(newFilters.category);
    if ("order" in newFilters) setOrder(newFilters.order);
    if ("price" in newFilters) setMaxPrice(newFilters.price);

    // Crea query string solo con parametri non vuoti
    const query = new URLSearchParams();
    if (filters.size) query.set("size", filters.size);
    if (filters.category) query.set("category", filters.category);
    if (filters.order) query.set("order", filters.order);
    if (filters.price) query.set("price", filters.price);
    if (filters.query) query.set("query", filters.query);

    // Aggiorna URL senza ricaricare pagina
    navigate(
      { pathname: location.pathname, search: query.toString() },
      { replace: true }
    );

    // Chiamata al backend con i filtri combinati
    axios
      .get(`http://localhost:3000/clothes/f-all`, { params: filters })
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
    <div className="d-flex align-items-center my-3 gap-3">
      <label className="me-2">Ordina per:</label>

      <select
        value={size}
        onChange={(e) => updateFilters({ size: e.target.value })}>
        <option value="">Filtra per taglia</option>
        <option value="XS">XS</option>
        <option value="S">S</option>
        <option value="M">M</option>
        <option value="L">L</option>
      </select>

      <select
        value={category}
        onChange={(e) => updateFilters({ category: e.target.value })}>
        <option value="">Filtra per categoria</option>
        <option value="Tops">Tops</option>
        <option value="Dresses">Dresses</option>
        <option value="Bottoms">Bottoms</option>
        <option value="Outerwear">Outerwear</option>
        <option value="Accessories">Accessories</option>
      </select>

      <select
        value={order}
        onChange={(e) => updateFilters({ order: e.target.value })}>
        <option value="">Ordina per prezzo</option>
        <option value="asc">Prezzo crescente</option>
        <option value="desc">Prezzo decrescente</option>
      </select>

      <select
        value={maxPrice}
        onChange={(e) => updateFilters({ price: e.target.value })}
        aria-label="Filtra per prezzo massimo">
        <option value="">Filtra per prezzo</option>
        <option value="10">Fino a 10 €</option>
        <option value="20">Fino a 20 €</option>
        <option value="30">Fino a 30 €</option>
      </select>

      <button
        className="btn btn-secondary"
        onClick={() =>
          updateFilters({ size: "", category: "", order: "", price: "" })
        }>
        Reset Filtri
      </button>
    </div>
  );
}
