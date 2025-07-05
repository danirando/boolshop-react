import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import AddToCartButton from "../components/AddToCartButton";
import axios from "axios";

export default function SearchPage() {
  const { query } = useParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:3000/searchbar/${query}`);
        setResults(res.data);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          // Imposta risultati vuoti per mostrare "nessun risultato"
          setResults([]);
        } else {
          console.error("Errore nella ricerca:", err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container">
      <h1 className="my-3">Risultati per: {query}</h1>

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
