import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import AddToCartButton from "../components/AddToCartButton";
import FiltersSelect from "../components/FiltersSelect";
import axios from "axios";

export default function SearchPage() {
  const { query } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Stati filtri inizializzati dai parametri URL
  const searchParams = new URLSearchParams(location.search);
  const [size, setSize] = useState(searchParams.get("size") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [order, setOrder] = useState(searchParams.get("order") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("price") || "");

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Funzione per aggiornare l'URL con i filtri correnti
  const updateURLFilters = (newFilters) => {
    const params = new URLSearchParams(location.search);

    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });

    navigate({
      pathname: location.pathname,
      search: params.toString(),
    });
  };

  // Aggiorna stato e URL quando cambiano i filtri
  const onFiltersChange = (newFilters) => {
    if ("size" in newFilters) setSize(newFilters.size);
    if ("category" in newFilters) setCategory(newFilters.category);
    if ("order" in newFilters) setOrder(newFilters.order);
    if ("maxPrice" in newFilters) setMaxPrice(newFilters.maxPrice);

    updateURLFilters({
      size: newFilters.size ?? size,
      category: newFilters.category ?? category,
      order: newFilters.order ?? order,
      price: newFilters.maxPrice ?? maxPrice,
    });
  };

  // Funzione per chiamare API con query + filtri
  const fetchResults = async () => {
    setLoading(true);
    try {
      const params = {};
      if (size) params.size = size;
      if (category) params.category = category;
      if (order) params.order = order;
      if (maxPrice) params.price = maxPrice;

      const res = await axios.get(
        `http://localhost:3000/searchbar/${encodeURIComponent(query)}`,
        {
          params,
        }
      );
      setResults(res.data);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setResults([]);
      } else {
        console.error("Errore nella ricerca:", err);
      }
    } finally {
      setLoading(false);
    }
  };

  // Effettua la ricerca ogni volta che query o filtri cambiano
  useEffect(() => {
    if (query) fetchResults();
  }, [query, size, category, order, maxPrice]);

  return (
    <div className="container">
      <h1 className="my-3">Risultati per: {query}</h1>

      {/* FILTRI */}
      <FiltersSelect
        filters={{ size, category, order, maxPrice }}
        onFiltersChange={onFiltersChange}
        onResultsUpdate={setResults}
      />

      {loading && <p>Caricamento...</p>}

      {!loading && results.length === 0 && (
        <div className="text-center mt-4">
          <h5>Nessun risultato trovato.</h5>
        </div>
      )}

      {!loading && results.length > 0 && (
        <CardGroup className="d-flex justify-content-center gap-3">
          {results.map((item) => {
            const hasPromo = item.promo > 0;
            const discountedPrice = hasPromo
              ? (parseFloat(item.price) * (1 - item.promo / 100)).toFixed(2)
              : item.price;

            return (
              <div className="col" key={item.id}>
                <Card className="card-clothes position-relative">
                  {hasPromo && (
                    <span
                      className="badge bg-danger"
                      style={{
                        position: "absolute",
                        top: "10px",
                        left: "10px",
                        fontWeight: "bold",
                      }}>
                      -{item.promo}%
                    </span>
                  )}
                  <div onClick={() => navigate(`/clothes/${item.slug}`)}>
                    <Card.Img
                      className="card-img-fixed img-fluid"
                      variant="top"
                      src={item.img}
                    />
                    <Card.Body>
                      <Card.Title>{item.name}</Card.Title>
                      <Card.Text>
                        {hasPromo ? (
                          <>
                            <span className="old-price">{item.price} €</span>{" "}
                            <span className="price">{discountedPrice} €</span>
                          </>
                        ) : (
                          <span className="price">{item.price} €</span>
                        )}
                      </Card.Text>
                    </Card.Body>
                  </div>

                  <Card.Footer>
                    <AddToCartButton
                      item={{
                        ...item,
                        price: parseFloat(discountedPrice),
                      }}
                    />
                  </Card.Footer>
                </Card>
              </div>
            );
          })}
        </CardGroup>
      )}
    </div>
  );
}
