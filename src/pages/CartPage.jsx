import { useCart } from "../contexts/CartContext";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  return (
    <div className="container mt-5">
      <div className="my-5">
        <h1>My cart</h1>
      </div>

      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          <CardGroup className="gap-3 d-flex flex-wrap">
            {cart.map((item) => (
              <Card
                key={item.id}
                className="card-clothes"
                style={{ width: "18rem" }}
              >
                <Card.Img
                  variant="top"
                  src={item.img}
                  className="card-img-fixed"
                />
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>
                    Price: <span className="price">{item.price} €</span>
                  </Card.Text>

                  <div className="d-flex align-items-center gap-2 mb-2">
                    <label htmlFor={`qty-${item.id}`}>Pieces:</label>
                    <input
                      id={`qty-${item.id}`}
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item.id, parseInt(e.target.value) || 1)
                      }
                      style={{ width: "60px" }}
                    />
                  </div>

                  <Card.Text>
                    Total:{" "}
                    <strong>{(item.price * item.quantity).toFixed(2)} €</strong>
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </Card.Footer>
              </Card>
            ))}
          </CardGroup>

          <div className="mt-4">
            <h3>Total: {totalPrice.toFixed(2)} €</h3>
            <button className="btn btn-primary mt-3">Checkout</button>
          </div>
        </>
      )}
    </div>
  );
}
