import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// components
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import AddToCartButton from "../components/AddToCartButton";

import { useContext } from "react";
import { ClothesContext } from "../contexts/ClothesContext";

export default function ClothesListPage() {
  const { clothes } = useContext(ClothesContext);
  const navigate = useNavigate();

  return (
    <>
      <div className="container">
        <h1 className="text-center ">Abbigliamento</h1>
        <div className="row gy-4 ">
          <CardGroup>
            {clothes.map((cloth) => {
              return (
                <div
                  className="col-sm-12 col-md-6 col-lg-4"
                  onClick={() => navigate(`/clothes/${cloth.slug}`)}
                >
                  <Card className="card-clothes " key={cloth.id}>
                    <Card.Img
                      className="card-img-fixed"
                      variant="top"
                      src={cloth.img}
                    />
                    <Card.Body>
                      <Card.Title>{cloth.name}</Card.Title>
                      <Card.Text>
                        <span>
                          Price: <span className="price">{cloth.price}</span>
                        </span>
                      </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                      <div className="d-flex justify-content-between align-items-center">
                        <AddToCartButton item={cloth} />
                        {/* <NavLink
                          to={`/clothes/${cloth.slug}`}
                          className="nav-item"
                        >
                          Vedi dettagli
                        </NavLink> */}
                      </div>
                    </Card.Footer>
                  </Card>
                </div>
              );
            })}
          </CardGroup>
        </div>
      </div>
    </>
  );
}
