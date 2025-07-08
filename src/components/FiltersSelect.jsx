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
    console.log("stato attuale filtro", order);
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

    let endpoint = "http://localhost:3000/clothes/f-all";
    if (params.order === "asc") {
      endpoint = "http://localhost:3000/clothes/f-p-ascendant";
    }
    if (params.order === "desc") {
      endpoint = "http://localhost:3000/clothes/f-p-descendant";
    }

    // Aggiorna URL
    navigate(
      {
        pathname: location.pathname,
        search: currentParams.toString(),
      },
      { replace: true }
    );
    // Scegli dinamicamente l'endpoint in base al filtro "order"

    axios
      .get(endpoint, { params })
      .then((res) => {
        console.log(res.data);
        onResultsUpdate(res.data);
      })
      .catch((err) => {
        // console.error(" Errore nella richiesta:", err);
        // if (err.response) {
        //   console.error(" Risposta errore:", err.response.data);
        // }

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
      <div className="d-flex flex-column g-3 gap-3 select-container">
        <div className="d-flex gap-3 select-content">
          <label className="me-2">Order by:</label>
          <label htmlFor="size">Size</label>
          <select
            id="size"
            name="size"
            value={size}
            onChange={(e) => updateFilters({ size: e.target.value })}
          >
            <option value="">---</option>
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
          </select>
          <label htmlFor="price">Price</label>
          <select
            id="price"
            name="price"
            value={order}
            onChange={(e) => updateFilters({ order: e.target.value })}
          >
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
              value={category}
              onChange={(e) => updateFilters({ category: e.target.value })}
            >
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
              value={maxPrice}
              onChange={(e) => updateFilters({ price: e.target.value })}
              aria-label="Filtra per prezzo massimo"
            >
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
              checked={inPromo}
              onChange={(e) =>
                updateFilters({ promo: e.target.checked ? "1" : "" })
              }
            />
            <label className="form-check-label" htmlFor="inPromo">
              On Sale
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
            }
          >
            Reset Filtri
          </button>
        </div>
      </div>
    </>
  );
}
