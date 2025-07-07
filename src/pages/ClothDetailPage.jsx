import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import AddToCartButton from "../components/AddToCartButton";
import { NavLink } from "react-router-dom";

export default function ClothDetailPage() {
  const { slug } = useParams();
  const [cloth, setCloth] = useState({});
  const clothUrl = import.meta.env.VITE_BOOKS_API_URL + "/clothes/" + slug;
  console.log(slug);
  console.log(clothUrl);
  const fetchClothes = () => {
    axios.get(clothUrl).then((res) => {
      setCloth(res.data[0]);
    });
  };

  function decrementStock(itemId) {
    setCloth((prev) =>
      prev.id === itemId ? { ...prev, stock: prev.stock - 1 } : prev
    );
  }

  useEffect(() => {
    fetchClothes();
  }, [slug]);
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
                  <div className="  " style={{ width: "25rem" }}>
                    <img
                      className="card-img-top"
                      src={cloth.img}
                      alt={cloth.name}
                    />
                  </div>
                  <div className="text d-flex flex-column gap-4 p-3">
                    <div>{cloth.name} </div>
                    <div className="text-success">{cloth.price}€ </div>
                    <div className="text-secondary">
                      <strong>Material:</strong> {cloth.material}
                    </div>
                    <div className="text-secondary">
                      <strong>Category:</strong> {cloth.category}
                    </div>

                    <AddToCartButton
                      item={cloth}
                      showSizeSelect={cloth.sizes && cloth.sizes.length > 0}
                      onDecrement={decrementStock}
                    />
                  </div>
                </div>

                <NavLink to="/clothes" className="nav-link">
                  Go back
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
