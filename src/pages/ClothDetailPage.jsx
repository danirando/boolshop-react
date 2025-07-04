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
  const clothUrl = import.meta.env.VITE_BOOKS_API_URL + "/clothes/" + slug;
  const navigate = useNavigate();

  const fetchClothes = () => {
    axios.get(clothUrl).then((res) => {
      console.log(res.data);
      setCloth(res.data);
    });
  };

  useEffect(fetchClothes, []);

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
  // const [relatedClothes, setRelatedClothes] = useState([]);
  //     const relatedUrl = import.meta.env.VITE_BOOKS_API_URL + `/clothes?categories_id=${cloth.categories_id}`;

  // const fetchRelatedClothes = () => {

  //   axios.get(relatedUrl).then((res) => {
  //     console.log("Risposta correlati:", res.data);

  //     const filtered = res.data.filter((item) => item.id !== currentProductId);
  //     setRelatedClothes(filtered);
  //   });
  // };

  // useEffect(() => {

  //     fetchRelatedClothes();

  // }, []);

  return (
    <>
      <div className="container-sm container-md">
        <div className="row">
          <div className="col-12">
            <div className="text-center my-5">
              <h1>Dettagli del Prodotto</h1>
              <p>Informazioni dettagliate sul prodotto selezionato.</p>
            </div>

            <div className="">
              <div className="d-flex justify-content-center flex-column align-items-center my-5">
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
                      Categoria: {cloth.category?.[0]?.name}
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

            {/* <CardGroup>
            {relatedClothes.map((cloth) => {
              return (
                <div
                  key={cloth.id}
                  className="col-sm-12 col-md-6 col-lg-4"
                  onClick={() => navigate(`/clothes/${cloth.slug}`)}
                >
                  <Card className="card-clothes h-100" key={cloth.id}>
                    <Card.Img
                      className="card-img-fixed"
                      variant="top"
                      src={cloth.img}
                    />
                    {renderPromoBadge(cloth.promo)}

                    <Card.Body>
                      <Card.Title>{cloth.name}</Card.Title>
                      <Card.Text>
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
                      </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                      <div className="d-flex justify-content-between align-items-center">
                        <AddToCartButton
                          item={cloth}
                          showSizeSelect={cloth.sizes && cloth.sizes.length > 0}
                          onDecrement={decrementStock}
                        />
                      </div>
                    </Card.Footer>
                  </Card>
                </div>
              );
            })}
          </CardGroup> */}
          </div>
        </div>
      </div>
    </>
  );
}
