import { useContext } from "react";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import { ClothesContext } from "../contexts/ClothesContext";

export default function HomePage() {
  const { clothes, loading, error } = useContext(ClothesContext);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Errore: {error.message}</p>;

  console.log(clothes);

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
            <h2>Più venduti</h2>
            <CardGroup>
              <Card>
                <Card.Img
                  className="card-img-fixed"
                  variant="top"
                  src="/img/a-line-skirt-black.jpg"
                />
                <Card.Body>
                  <Card.Title>Card title</Card.Title>
                  <Card.Text>
                    <span>Prezzo:</span>
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <button className="btn add-button">
                    Aggiungi al carrello
                  </button>
                </Card.Footer>
              </Card>
              <Card>
                <Card.Img
                  className="card-img-fixed"
                  variant="top"
                  src="/img/a-line-skirt-black.jpg"
                />
                <Card.Body>
                  <Card.Title>Card title</Card.Title>
                  <Card.Text>
                    <span>Prezzo:</span>
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <button className="btn add-button">
                    Aggiungi al carrello
                  </button>
                </Card.Footer>
              </Card>
              <Card>
                <Card.Img
                  className="card-img-fixed"
                  variant="top"
                  src="/img/a-line-skirt-black.jpg"
                />
                <Card.Body>
                  <Card.Title>Card title</Card.Title>
                  <Card.Text>
                    <span>Prezzo:</span>
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <button className="btn add-button">
                    Aggiungi al carrello
                  </button>
                </Card.Footer>
              </Card>
            </CardGroup>
          </section>
          <div className="separetor"></div>
          <section>
            <h2>In promo</h2>
            <CardGroup>
              <Card>
                <Card.Img
                  className="card-img-fixed"
                  variant="top"
                  src="/img/a-line-skirt-black.jpg"
                />
                <Card.Body>
                  <Card.Title>Card title</Card.Title>
                  <Card.Text>
                    <span>Prezzo:</span>
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <button className="btn add-button">
                    Aggiungi al carrello
                  </button>
                </Card.Footer>
              </Card>
              <Card>
                <Card.Img
                  className="card-img-fixed"
                  variant="top"
                  src="/img/a-line-skirt-black.jpg"
                />
                <Card.Body>
                  <Card.Title>Card title</Card.Title>
                  <Card.Text>
                    <span>Prezzo:</span>
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <button className="btn add-button">
                    Aggiungi al carrello
                  </button>
                </Card.Footer>
              </Card>
              <Card>
                <Card.Img
                  className="card-img-fixed"
                  variant="top"
                  src="/img/a-line-skirt-black.jpg"
                />
                <Card.Body>
                  <Card.Title>Card title</Card.Title>
                  <Card.Text>
                    <span>Prezzo:</span>
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <button className="btn add-button">
                    Aggiungi al carrello
                  </button>
                </Card.Footer>
              </Card>
            </CardGroup>
          </section>
        </div>
      </div>
    </div>
  );
}
