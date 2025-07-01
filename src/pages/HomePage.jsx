import { useContext, useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import { ClothesContext } from "../contexts/ClothesContext";
import axios from "axios";

export default function HomePage() {
  const [mostSoldClothes, setMostSoldClothes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // chiamata axios per i più venduti

  useEffect(() => {
    axios
      .get("http://localhost:3000/most-sold")
      .then((res) => {
        setMostSoldClothes(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  const [promoClothes, setPromoClothes] = useState([]);

  // chiamata axios per in promo

  useEffect(() => {
    axios
      .get("http://localhost:3000/promo")
      .then((res) => {
        setPromoClothes(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Errore: {error.message}</p>;

  return (
    <div>
      <div className="hero-space">
        <div className="hero-content">
          <h1 className="hero-text">
            Nuovi outfit, stessa vibe. Scopri la tua prossima ossessione.
          </h1>
        </div>
      </div>
      <div className="container sections">
        <div className="d-flex flex-column gap-3 sections-container">
          <section>
            <h2>Top Seller</h2>
            <CardGroup>
              {mostSoldClothes.map((item) => {
                return (
                  <Card className="card-clothes" key={item.id}>
                    <Card.Img
                      className="card-img-fixed"
                      variant="top"
                      src={item.img}
                    />
                    <Card.Body>
                      <Card.Title>{item.name}</Card.Title>
                      <Card.Text>
                        <span>
                          Price: <span className="price">{item.price}</span>
                        </span>
                      </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                      <button className="btn add-button">Add to cart</button>
                    </Card.Footer>
                  </Card>
                );
              })}
            </CardGroup>
          </section>
          <div className="separetor"></div>
          <section>
            <h2>In promo</h2>
            <CardGroup>
              {promoClothes.map((item) => {
                const discountedPrice = (
                  parseFloat(item.price) *
                  (1 - item.promo / 100)
                ).toFixed(2);

                return (
                  <Card className="card-clothes" key={item.id}>
                    <div
                      style={{
                        position: "relative",
                        display: "inline-block",
                      }}>
                      <Card.Img
                        className="card-img-fixed"
                        variant="top"
                        src={item.img}
                      />
                      {item.promo > 0 && (
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
                    </div>

                    <Card.Body>
                      <Card.Title>{item.name}</Card.Title>
                      <Card.Text>
                        <span>
                          Price: <span className="old-price">{item.price}</span>
                          <span> </span>
                          <span className="price">{discountedPrice}</span>
                        </span>
                      </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                      <button className="btn add-button">Add to cart</button>
                    </Card.Footer>
                  </Card>
                );
              })}
            </CardGroup>
          </section>
        </div>
      </div>
    </div>
  );
}
