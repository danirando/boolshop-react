import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import AddToCartButton from "../components/AddToCartButton";

export default function SearchPage() {
  const { query } = useParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortOption, setSortOption] = useState("");

  function sortResults(results, option) {
    const sorted = [...results];
    switch (option) {
      case "prezzo":
        sorted.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      case "nome":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }
    return sorted;
  }

  function handleSortChange(e) {
    setSortOption(e.target.value);
  }

  useEffect(() => {
    setLoading(true);
    setError("");
    fetch(`http://localhost:3000/searchbar/${query}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Nessun risultato trovato o errore server.");
        }
        return res.json();
      })
      .then((data) => {
        setResults(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [query]);

  return (
    <div className="container">
      <div className="my-3 d-flex align-items-center gap-2">
        <label htmlFor="sort">Ordina per:</label>
        <select
          id="sort"
          className="form-select"
          style={{ maxWidth: "200px" }}
          value={sortOption}
          onChange={handleSortChange}>
          <option value="">-- Seleziona --</option>
          <option value="prezzo">Prezzo</option>
          <option value="nome">Nome</option>
        </select>
      </div>
      <h1 className="my-3">Risultati per: {query}</h1>
      {loading && <p>Caricamento...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && results.length === 0 && (
        <p>Nessun risultato trovato.</p>
      )}
      {!loading && !error && results.length > 0 && (
        <div>
          {" "}
          <CardGroup className="d-flex justify-content-center gap-3">
            {sortResults(results, sortOption).map((item) => {
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
        </div>
      )}
    </div>
  );
}
