import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// components
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import AddToCartButton from "../components/AddToCartButton";

import { use, useContext, useEffect, useState } from "react";
import { ClothesContext } from "../contexts/ClothesContext";

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
  console.log(clothes);

  return (
    <>
      <div className="container">
        <h1 className="text-center ">Clothes</h1>
        <div className="row gy-4 py-3">
          <CardGroup>
            {localClothes.map((cloth) => {
              return (
                <div
                  key={cloth.id}
                  className="col-sm-12 col-md-6 col-lg-4"
                  onClick={() => navigate(`/clothes/${cloth.slug}`)}>
                  <Card className="card-clothes h-100" key={cloth.id}>
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
