import { useParams } from "react-router-dom";
import { useContext } from "react";
import { ClothesContext } from "../contexts/ClothesContext";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import AddToCartButton from "../components/AddToCartButton";

export default function SearchPage() {
  const { query } = useParams();
  const { clothes } = useContext(ClothesContext);

  // Filtra i prodotti per nome o altre proprietà
  const filtered = clothes.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <h1>Risultati per: {query}</h1>
      {filtered.length === 0 ? (
        <p>Nessun risultato trovato.</p>
      ) : (
        <CardGroup>
          {filtered.map((item) => (
            <div className="col" key={item.id}>
              <Card className="card-clothes h-100 small-card">
                <Card.Img variant="top" src={item.img} />
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>{item.price} €</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <AddToCartButton item={item} />
                </Card.Footer>
              </Card>
            </div>
          ))}
        </CardGroup>
      )}
    </div>
  );
}
