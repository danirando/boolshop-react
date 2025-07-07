import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import AddToCartButton from "../components/AddToCartButton";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";

export default function ClothDetailPage() {
  const { slug } = useParams();
  const [cloth, setCloth] = useState({});
  const [relatedClothes, setRelatedClothes] = useState([]);
  const clothUrl = import.meta.env.VITE_BOOKS_API_URL + "/clothes/" + slug;
  const navigate = useNavigate();

  console.log("slug:", slug);
  console.log("clothUrl:", clothUrl);

  const fetchClothes = () => {
    axios
      .get(clothUrl)
      .then((res) => {
        const fetchedCloth = res.data[0];
        console.log("Prodotto:", fetchedCloth);
        console.log("Categoria:", fetchedCloth.category);
        setCloth(fetchedCloth);
      })
      .catch((err) => {
        console.error("Errore nel caricamento del prodotto:", err);
      });
  };

  useEffect(fetchClothes, [slug]);

  function decrementStock(itemId) {
    setCloth((prev) =>
      prev.id === itemId ? { ...prev, stock: prev.stock - 1 } : prev
    );
  }

  function renderPromoBadge(clothPromo) {
    if (clothPromo > 0) {
      return (
        <span
          className="badge bg-danger"
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            fontWeight: "bold",
          }}
        >
          -{clothPromo}%
        </span>
      );
    }

    return null;
  }

  // #  prodotti correlati

  const fetchRelatedClothes = () => {
    if (cloth.category && cloth.id) {
      // Da controllare l'endpoint
      const category = cloth.category;
      const relatedUrl = `http://localhost:3000/clothes/f-categories/${category}`;

      console.log("url correlati", relatedUrl);

      axios.get(relatedUrl).then((res) => {
        console.log("Categoria per correlati:", cloth.category);
        console.log("ID prodotto corrente:", cloth.id);

        const filtered = res.data.filter((item) => item.id !== cloth.id);
        setRelatedClothes(filtered);
      });
    }
  };

  useEffect(() => {
    if (cloth.category && cloth.id) {
      fetchRelatedClothes();
    }
  }, [cloth.category, cloth.id]);

  if (!cloth.id) {
    return <div className="text-center my-5">Caricamento in corso...</div>;
  }

  return (
    <>
      <div className="container-sm container-md">
        <div className="row">
          <div className="col-12">
            <div className="text-center my-3">
              <h1>Details</h1>
            </div>

            <div className="">
              <div className="d-flex justify-content-center flex-column align-items-center my-3">
                <div className=" d-flex justify-content-center flex-column flex-md-row align-items-stretch my-5">
                  <div
                    className="  "
                    style={{ width: "25rem", position: "relative" }}
                  >
                    <img
                      className="card-img-top"
                      src={cloth.img}
                      alt={cloth.name}
                    />
                    {renderPromoBadge(cloth.promo)}
                  </div>
                  <div className="text d-flex flex-column gap-4 p-3">
                    <div>{cloth.name} </div>
                    <div className="text-success">
                      {cloth.promo > 0 ? (
                        <div className="d-flex flex-column gap-2">
                          <span className="text-muted text-decoration-line-through">
                            {cloth.price} €
                          </span>
                          <span className="text-danger fw-bold">
                            {(
                              cloth.price -
                              (cloth.price * cloth.promo) / 100
                            ).toFixed(2)}{" "}
                            €
                          </span>
                        </div>
                      ) : (
                        <span className="">{cloth.price} €</span>
                      )}
                    </div>
                    <div className="text-secondary">
                      Materiale: {cloth.material}
                    </div>
                    <div className="text-secondary">
                      Categoria: {cloth.category}
                      Categoria: {cloth.category}
                    </div>

                    <AddToCartButton
                      item={cloth}
                      showSizeSelect={cloth.sizes && cloth.sizes.length > 0}
                      onDecrement={decrementStock}
                    />
                  </div>
                </div>

                <NavLink to="/clothes" className="nav-link">
                  Torna indietro
                </NavLink>
              </div>
            </div>
            {/* # prodotti correlati */}

            <section className="my-5">
              <h4 className="text-center my-5">Related Products</h4>
              {(!relatedClothes || relatedClothes.length === 0) && (
                <div className="text-center">No related products found.</div>
              )}

              <CardGroup>
                {relatedClothes.slice(0, 3).map((relatedCloth) => {
                  return (
                    <div
                      key={relatedCloth.id}
                      className="col-sm-12 col-md-6 col-lg-4"
                      onClick={() => navigate(`/clothes/${relatedCloth.slug}`)}
                    >
                      <Card
                        className="card-clothes related-card h-100"
                        key={relatedCloth.id}
                      >
                        <Card.Img
                          className="card-img-fixed"
                          variant="top"
                          src={relatedCloth.img}
                        />
                        {renderPromoBadge(relatedCloth.promo)}

                        <Card.Body>
                          <Card.Title>{relatedCloth.name}</Card.Title>
                          <Card.Text>
                            {relatedCloth.promo > 0 ? (
                              <div className="d-flex flex-column gap-2">
                                <span className="text-muted text-decoration-line-through">
                                  {relatedCloth.price} €
                                </span>
                                <span className="text-danger fw-bold">
                                  {(
                                    relatedCloth.price -
                                    (relatedCloth.price * relatedCloth.promo) /
                                      100
                                  ).toFixed(2)}{" "}
                                  €
                                </span>
                              </div>
                            ) : (
                              <span className="">{relatedCloth.price} €</span>
                            )}
                          </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                          <div className="d-flex justify-content-between align-items-center">
                            <AddToCartButton
                              item={relatedCloth}
                              showSizeSelect={
                                relatedCloth.sizes &&
                                relatedCloth.sizes.length > 0
                              }
                              onDecrement={decrementStock}
                            />
                          </div>
                        </Card.Footer>
                      </Card>
                    </div>
                  );
                })}
              </CardGroup>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
