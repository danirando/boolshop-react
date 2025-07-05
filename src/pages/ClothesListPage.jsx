import { useNavigate } from "react-router-dom";

// components
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import AddToCartButton from "../components/AddToCartButton";

import { useContext, useEffect, useState } from "react";
import { ClothesContext } from "../contexts/ClothesContext";
import FiltersSelect from "../components/FiltersSelect";

export default function ClothesListPage() {
  const { clothes } = useContext(ClothesContext);
  const [localClothes, setLocalClothes] = useState(clothes);
  const navigate = useNavigate();

  useEffect(() => {
    setLocalClothes(clothes);
  }, [clothes]);

  function decrementStock(itemId) {
    setLocalClothes((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, stock: item.stock - 1 } : item
      )
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
          }}>
          -{clothPromo}%
        </span>
      );
    }

    return null;
  }

  return (
    <>
      <div className="container">
        <h1 className="text-center ">Clothes</h1>
        <FiltersSelect onResultsUpdate={setLocalClothes} />
        <div className="row gy-4 py-3">
          <CardGroup>
            {localClothes.map((cloth) => {
              return (
                <div
                  key={cloth.id}
                  className="col-sm-12 col-md-6 col-lg-4 my-3"
                  onClick={() => navigate(`/clothes/${cloth.slug}`)}>
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
                          <>
                            <span className="text-muted text-decoration-line-through d-block">
                              {cloth.price} €
                            </span>
                            <span className="text-danger fw-bold d-block">
                              {(
                                cloth.price -
                                (cloth.price * cloth.promo) / 100
                              ).toFixed(2)}{" "}
                              €
                            </span>
                          </>
                        ) : (
                          <span>{cloth.price} €</span>
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
          </CardGroup>
        </div>
      </div>
    </>
  );
}
