import { useCart } from "../contexts/CartContext";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";

export default function CartPage() {
  const { cart, removeFromCart } = useCart();
  return (
    <div className="container mt-5">
      <div className="my-5">
        <h1>My cart</h1>
      </div>

      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <CardGroup className="gap-3 d-flex flex-wrap">
          {cart.map((item) => (
            <Card key={item.id} className="card-clothes">
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
      )}
    </div>
  );
}
