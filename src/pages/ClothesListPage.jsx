import { NavLink } from "react-router-dom";

import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";

import { useContext } from "react";
import AddToCartButton from "../components/AddToCartButton";
import { ClothesContext } from "../contexts/ClothesContext";

export default function ClothesListPage() {
  const { clothes } = useContext(ClothesContext);

  return (
    <>
      <div className="container">
        <h1 className="text-center ">Abbigliamento</h1>
        <div className="row gy-4 ">
          <CardGroup>
            {clothes.map((cloth) => {
              return (
                <div className="col-sm-12 col-md-6 col-lg-4">
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
                      <AddToCartButton item={cloth} />
                    </Card.Footer>
                  </Card>
                </div>
              );
            })}
          </CardGroup>

          {/* {clothes.map((cloth) => {
            return (
              <>
                <div key={cloth.id} className="col-sm-12 col-md-6 col-lg-4">
                  <div className="card h-100  ">
                    <img
                      src={cloth.img}
                      alt={cloth.name}
                      className="card-img-top h-100 "
                    />

                    <div className="card-body py-2">
                      <h6>{cloth.name}</h6>
                      <p>{cloth.price}€</p>
                      <div className="d-flex justify-content-between align-items-center">
                        <NavLink
                          to={`/clothes/${cloth.slug}`}
                          className="nav-item"
                        >
                          Vedi dettagli
                        </NavLink>
                        <AddToCartButton item={cloth} />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          })} */}
        </div>
      </div>
    </>
  );
}
