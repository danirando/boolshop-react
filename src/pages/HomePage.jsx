import { useContext, useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import { ClothesContext } from "../contexts/ClothesContext";
import axios from "axios";

import { useNavigate } from "react-router-dom";

import { useCart } from "../contexts/CartContext";
import AddToCartButton from "../components/AddToCartButton";

export default function HomePage() {
  const [selectedSizes, setSelectedSizes] = useState({});
  const [mostSoldClothes, setMostSoldClothes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { addToCart } = useCart();

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

  function decrementQuantity(itemId, fromPromo = false) {
    if (fromPromo) {
      setPromoClothes((prev) =>
        prev.map((item) =>
          item.id === itemId ? { ...item, stock: item.stock - 1 } : item
        )
      );
    } else {
      setMostSoldClothes((prev) =>
        prev.map((item) =>
          item.id === itemId ? { ...item, stock: item.stock - 1 } : item
        )
      );
    }
  }

  return (
    <div>
      <div className="hero-space">
        <div className="hero-content">
          <h1 className="hero-text">
            New outfits, same vibe. Discover your next obsession.
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
                    <div onClick={() => navigate(`/clothes/${item.slug}`)}>
                      <Card.Img
                        className="card-img-fixed img-fluid"
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
                    </div>

                    <Card.Footer className="d-flex flex-column gap-3">
                      {item.stock > 0 ? (
                        <>
                          {item.sizes && item.sizes.length > 0 && (
                            <select
                              className="form-select"
                              style={{ maxWidth: 90 }}
                              value={selectedSizes[item.id] || item.sizes[0]}
                              onChange={(e) =>
                                setSelectedSizes((prev) => ({
                                  ...prev,
                                  [item.id]: e.target.value,
                                }))
                              }
                              onClick={(e) => e.stopPropagation()}
                            >
                              {item.sizes.map((sz) => (
                                <option key={sz} value={sz}>
                                  {sz}
                                </option>
                              ))}
                            </select>
                          )}
                          <button
                            className="btn add-button"
                            onClick={(e) => {
                              e.stopPropagation();
                              addToCart({
                                ...item,
                                size: selectedSizes[item.id] || item.sizes[0],
                              });
                              decrementQuantity(item.id, false); // <-- qui
                            }}
                          >
                            Add to cart
                          </button>
                        </>
                      ) : (
                        <div>Out of stock</div>
                      )}
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

                const cartDiscount = {
                  ...item,
                  price: parseFloat(discountedPrice),
                };

                return (
                  <Card className="card-clothes" key={item.id}>
                    <div onClick={() => navigate(`/clothes/${item.slug}`)}>
                      <Card.Img
                        className="card-img-fixed img-fluid"
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
                          }}
                        >
                          -{item.promo}%
                        </span>
                      )}

                      <Card.Body>
                        <Card.Title>{item.name}</Card.Title>
                        <Card.Text>
                          <span>
                            Price:{" "}
                            <span className="old-price">{item.price}</span>
                            <span> </span>
                            <span className="price">{discountedPrice}</span>
                          </span>
                        </Card.Text>
                      </Card.Body>
                    </div>

                    <Card.Footer className="d-flex flex-column gap-3">
                      {item.stock > 0 ? (
                        <>
                          {item.sizes && item.sizes.length > 0 && (
                            <select
                              className="form-select"
                              style={{ maxWidth: 90 }}
                              value={selectedSizes[item.id] || item.sizes[0]}
                              onChange={(e) =>
                                setSelectedSizes((prev) => ({
                                  ...prev,
                                  [item.id]: e.target.value,
                                }))
                              }
                              onClick={(e) => e.stopPropagation()}
                            >
                              {item.sizes.map((sz) => (
                                <option key={sz} value={sz}>
                                  {sz}
                                </option>
                              ))}
                            </select>
                          )}
                          <button
                            className="btn add-button"
                            onClick={(e) => {
                              e.stopPropagation();
                              addToCart({
                                ...cartDiscount,
                                size: selectedSizes[item.id] || item.sizes[0],
                              });
                              decrementQuantity(item.id, true); // <-- qui
                            }}
                          >
                            Add to cart
                          </button>
                        </>
                      ) : (
                        <div>Out of stock</div>
                      )}
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
