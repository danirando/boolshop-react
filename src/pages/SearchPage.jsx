import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import AddToCartButton from "../components/AddToCartButton";
import FiltersSelect from "../components/FiltersSelect";
import axios from "axios";

export default function SearchPage() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { query } = useParams();

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);

      const params = new URLSearchParams(location.search);
      const size = params.get("size") || "";
      const category = params.get("category") || "";
      const order = params.get("order") || "";
      const price = params.get("price") || "";

      try {
        const res = await axios.get("http://localhost:3000/clothes/f-all", {
          params: {
            query, // parola di ricerca dalla barra
            size,
            category,
            order,
            price,
          },
        });
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

    fetchResults();
  }, [query, location.search]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container">
      <h1 className="my-3">Risultati ricerca con filtri</h1>

      {/* Inserisci FiltersSelect e passa onResultsUpdate */}
      <FiltersSelect onResultsUpdate={setResults} searchQuery={query} />

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
