import { useCart } from "../contexts/CartContext";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import { Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function CartPage() {
  const [quantity, setQuantity] = useState(0);
  const { cart, removeFromCart, updateQuantity, clearCart, addToCart } =
    useCart();
  // const totalPrice = cart.reduce(
  //   (total, item) => total + item.price * item.quantity,
  //   0
  // );
  const totalPrice = cart.reduce(
    (total, item) => total + (item.finalPrice ?? item.price) * item.quantity,
    0
  );
  const navigate = useNavigate();

  return (
    <div className="container mt-5">
      <div className="my-5">
        <h1>My cart</h1>
      </div>

      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <Container>
          <Row xs={1} md={3} className="g-4">
            {cart.map((item) => (
              <Col key={`${item.id}-${item.size}`}>
                <Card className="card-clothes" style={{ width: "100%" }}>
                  <Card.Img
                    variant="top"
                    src={item.img}
                    className="card-img-fixed"
                    onClick={() => navigate(`/clothes/${item.slug}`)}
                  />
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>

                    <Card.Text>
                      Price:{" "}
                      {item.promo > 0 ? (
                        <>
                          <span className="text-muted text-decoration-line-through me-2">
                            {item.price} €
                          </span>
                          <span className="text-danger fw-bold">
                            {item.finalPrice} €
                          </span>
                        </>
                      ) : (
                        <span className="price">{item.price} €</span>
                      )}
                    </Card.Text>
                    {/* Price: <span className="price">{item.price} €</span> */}

                    {/* <div className="d-flex align-items-center gap-2 mb-2">
                      <label htmlFor={`${item.id}`}>Pieces:</label>
                      <input
                        id={`${item.id}`}
                        type="number"
                        min="1"
                        max={item.stock}
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(
                            item.id,
                            parseInt(e.target.value) || 1,
                            item.size
                          )
                        }
                        style={{ width: "60px" }}
                      />
                    </div> */}
                    <div className="d-flex align-items-center gap-2">
                      <button
                        className="btn btn-secondary"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (item.quantity > 1) {
                            updateQuantity(
                              item.id,
                              item.quantity - 1,
                              item.size
                            );
                          } else {
                            removeFromCart(item.id, item.size);
                          }
                        }}>
                        –
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="btn btn-secondary"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (item.quantity < item.stock) {
                            updateQuantity(
                              item.id,
                              item.quantity + 1,
                              item.size
                            );
                          }
                        }}
                        disabled={item.quantity >= item.stock}>
                        +
                      </button>
                    </div>

                    <Card.Text>
                      Size: <strong>{item.size}</strong>
                    </Card.Text>

                    <Card.Text>
                      Total:{" "}
                      <strong>
                        {(
                          (item.finalPrice ?? item.price) * item.quantity
                        ).toFixed(2)}{" "}
                        €
                      </strong>
                    </Card.Text>

                    {/* <Card.Text>
                      Total:{" "}
                      <strong>
                        {(item.price * item.quantity).toFixed(2)} €
                      </strong>
                    </Card.Text> */}
                  </Card.Body>
                  <Card.Footer>
                    <button
                      className="btn btn-danger"
                      onClick={() => removeFromCart(item.id, item.size)}>
                      Remove
                    </button>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
          <div className="mt-4">
            <h3>Total: {totalPrice.toFixed(2)} €</h3>
            <button className="btn btn-danger my-3 mx-2" onClick={clearCart}>
              Clear cart
            </button>
            <Link to="/checkout" className="btn btn-primary my-3">
              Checkout{" "}
            </Link>
          </div>
        </Container>
      )}
    </div>
  );
}
