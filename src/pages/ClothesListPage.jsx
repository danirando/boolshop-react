import { useLocation, useNavigate } from "react-router-dom";

// components
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import AddToCartButton from "../components/AddToCartButton";

import { useContext, useEffect, useState } from "react";
import { ClothesContext } from "../contexts/ClothesContext";
import FiltersSelect from "../components/FiltersSelect";
import axios from "axios";
export default function ClothesListPage() {
  const { clothes } = useContext(ClothesContext);
  const [localClothes, setLocalClothes] = useState(clothes);
  const [searchQuery, setSearchQuery] = useState(""); // per mostrare la query attuale
  const [isSearching, setIsSearching] = useState(false); // per sapere se si sta effettuando una ricerca
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    const filters = {
      size: params.get("size") || "",
      category: params.get("category") || "",
      order: params.get("order") || "",
      price: params.get("price") || "",
      query: params.get("query") || "",
      promo: params.get("promo") || "",
    };

    setSearchQuery(filters.query);
    setIsSearching(!!filters.query);

    // Se non ci sono filtri, mostra i clothes dal context
    if (
      !filters.size &&
      !filters.category &&
      !filters.order &&
      !filters.price &&
      !filters.query &&
      !filters.promo
    ) {
      setLocalClothes(clothes);
      return;
    }

    // Pulisci parametri vuoti
    const filteredParams = {};
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== "" && value !== null) {
        filteredParams[key] = value;
      }
    });

    // Unica chiamata all'endpoint completo
    axios
      .get("http://localhost:3000/clothes/f-all", { params: filteredParams })
      .then((res) => setLocalClothes(res.data))
      .catch((err) => {
        if (err.response && err.response.status === 404) {
          setLocalClothes([]);
        } else {
          console.error("Errore caricamento vestiti:", err);
        }
      });
  }, [location.search, clothes]);

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
        {isSearching && (
          <h4 className="my-3">
            {localClothes.length > 0 ? (
              <>Results for: "{searchQuery}"</>
            ) : (
              <>No results for: "{searchQuery}"</>
            )}
          </h4>
        )}

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
                              {Number(
                                cloth.final_price ??
                                  cloth.price -
                                    (cloth.price * cloth.promo) / 100
                              ).toFixed(2)}{" "}
                              €
                            </span>
                          </>
                        ) : (
                          <span>{Number(cloth.price).toFixed(2)} €</span>
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
