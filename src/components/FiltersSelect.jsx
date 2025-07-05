import axios from "axios";
import { useState } from "react";

export default function FiltersSelect({ onResultsUpdate }) {
  const [size, setSize] = useState("");
  const [category, setCategory] = useState("");
  const [order, setOrder] = useState("");
  const [loading, setLoading] = useState(false);
  const [maxPrice, setMaxPrice] = useState("50");

  // Chiamata per filtrare taglie
  const fetchBySize = (size) => {
    axios
      .get(`http://localhost:3000/clothes/f-sizes/${size}`)
      .then((res) => onResultsUpdate(res.data))
      .catch((err) => console.error("Errore taglie:", err));
  };

  // Chiamata per filtrare categorie
  const fetchByCategory = (category) => {
    axios
      .get(`http://localhost:3000/clothes/f-categories/${category}`)
      .then((res) => onResultsUpdate(res.data))
      .catch((err) => console.error("Errore categorie:", err));
  };

  // Chiamata per ordinare prezzi ascendente
  const fetchPriceAscendant = () => {
    axios
      .get("http://localhost:3000/clothes/f-p-ascendant")
      .then((res) => onResultsUpdate(res.data))
      .catch((err) => console.error("Errore ordine ascendente:", err));
  };

  // Chiamata per ordinare prezzi discendente
  const fetchPriceDescendant = () => {
    axios
      .get("http://localhost:3000/clothes/f-p-descendant")
      .then((res) => onResultsUpdate(res.data))
      .catch((err) => console.error("Errore ordine discendente:", err));
  };
  const handleFilterPrice = (maxPrice) => {
    if (!maxPrice) return;

    axios
      .get(`http://localhost:3000/clothes/f-prices/${maxPrice}`)
      .then((res) => {
        onResultsUpdate(res.data);
      })
      .catch((err) => {
        if (err.response && err.response.status === 404) {
          // Se il backend restituisce 404 quando non trova nulla
          onResultsUpdate([]); // svuota risultati senza errori console
        } else {
          console.error(err);
        }
      });
  };
  return (
    <div className="d-flex align-items-center my-3 gap-3">
      <label className="me-2">Ordina per:</label>
      {/* Select taglie */}
      <select
        value={size}
        onChange={(e) => {
          setSize(e.target.value);
          fetchBySize(e.target.value);
        }}>
        <option value="">Filtra per taglia</option>
        <option value="XS">XS</option>
        <option value="S">S</option>
        <option value="M">M</option>
        <option value="L">L</option>
      </select>

      {/* Select categorie */}
      <select
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
          fetchByCategory(e.target.value);
        }}>
        <option value="">Filtra per categoria</option>
        <option value="Tops">Tops</option>
        <option value="Dresses">Dresses</option>
        <option value="Bottoms">Bottoms</option>
        <option value="Outerwear">Outerwear</option>
        <option value="Accessories">Accessories</option>
      </select>

      {/* Select ordinamento prezzo */}
      <select
        value={order}
        onChange={(e) => {
          setOrder(e.target.value);
          if (e.target.value === "asc") fetchPriceAscendant();
          else if (e.target.value === "desc") fetchPriceDescendant();
        }}>
        <option value="">Ordina per prezzo</option>
        <option value="asc">Prezzo crescente</option>
        <option value="desc">Prezzo decrescente</option>
      </select>

      <select
        value={maxPrice}
        onChange={(e) => {
          const value = e.target.value;
          setMaxPrice(value);
          handleFilterPrice(value);
        }}
        aria-label="Filtra per prezzo massimo">
        <option value="">Filtra per prezzo</option>
        <option value="10">Fino a 10 €</option>
        <option value="20">Fino a 20 €</option>
        <option value="30">Fino a 30 €</option>
      </select>
    </div>
  );
}
