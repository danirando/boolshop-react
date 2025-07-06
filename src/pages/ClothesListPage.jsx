import { useNavigate, useSearchParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ClothesContext } from "../contexts/ClothesContext";
import FiltersSelect from "../components/FiltersSelect";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import AddToCartButton from "../components/AddToCartButton";

export default function ClothesListPage() {
  const { clothes } = useContext(ClothesContext);
  const [filteredClothes, setFilteredClothes] = useState(clothes);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Extract filters from URL params
  const categoryFromUrl = searchParams.get("category") || "";
  const sizeFromUrl = searchParams.get("size") || "";

  // Filter clothes whenever clothes data or URL params change
  useEffect(() => {
    let filtered = clothes;

    if (categoryFromUrl) {
      filtered = filtered.filter((item) => item.category === categoryFromUrl);
    }
    if (sizeFromUrl) {
      filtered = filtered.filter(
        (item) => item.sizes && item.sizes.includes(sizeFromUrl)
      );
    }

    setFilteredClothes(filtered);
  }, [clothes, categoryFromUrl, sizeFromUrl]);

  // Called from FiltersSelect on change
  function onFiltersChange({ category, size }) {
    // Aggiorna URL params senza ricaricare la pagina
    const params = {};
    if (category) params.category = category;
    if (size) params.size = size;

    setSearchParams(params);

    // Filtra anche localmente senza aspettare useEffect (più reattivo)
    let filtered = clothes;
    if (category)
      filtered = filtered.filter((item) => item.category === category);
    if (size)
      filtered = filtered.filter(
        (item) => item.sizes && item.sizes.includes(size)
      );

    setFilteredClothes(filtered);
  }

  function decrementStock(itemId) {
    setFilteredClothes((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, stock: item.stock - 1 } : item
      )
    );
  }

  return (
    <div className="container">
      <h1 className="text-center">Clothes</h1>
      <FiltersSelect
        defaultFilters={{ category: categoryFromUrl, size: sizeFromUrl }}
        onFiltersChange={onFiltersChange}
      />
      <div className="row gy-4 py-3">
        <CardGroup>
          {filteredClothes.map((cloth) => (
            <div
              key={cloth.id}
              className="col-sm-12 col-md-6 col-lg-4 my-3"
              onClick={() => navigate(`/clothes/${cloth.slug}`)}>
              <Card className="card-clothes h-100">
                <Card.Img
                  className="card-img-fixed"
                  variant="top"
                  src={cloth.img}
                />
                {cloth.promo > 0 && (
                  <span
                    className="badge bg-danger"
                    style={{
                      position: "absolute",
                      top: "10px",
                      left: "10px",
                      fontWeight: "bold",
                    }}>
                    -{cloth.promo}%
                  </span>
                )}
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
          ))}
        </CardGroup>
      </div>
    </div>
  );
}
