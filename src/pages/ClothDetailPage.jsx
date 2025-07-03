import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import AddToCartButton from "../components/AddToCartButton";

// prendere dati dal context

export default function ClothDetailPage() {
  const { slug } = useParams();
  const [cloth, setCloth] = useState({});
  const clothUrl = import.meta.env.VITE_BOOKS_API_URL + "/clothes/" + slug;

  if (!slug) return <p>Caricamento...</p>;

  const fetchClothes = () => {
    axios.get(clothUrl).then((res) => {
      console.log(res.data);

      setCloth(res.data);
    });
  };

  useEffect(fetchClothes, []);
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="text-center my-5">
              <h1>Dettagli del Prodotto</h1>
              <p>Informazioni dettagliate sul prodotto selezionato.</p>
            </div>

            <div className=" d-flex justify-content-center  align-items-strech my-5">
              <div className="  " style={{ width: "25rem" }}>
                <img
                  className="card-img-top"
                  src={cloth.img}
                  alt={cloth.name}
                />
              </div>
              <div className="text d-flex flex-column gap-3  p-3">
                <div>{cloth.name} </div>
                <div className="text-success">{cloth.price}€ </div>
                <div className="text-secondary">
                  Materiale: {cloth.material}
                </div>
                <div className="text-secondary">
                  Categoria: {cloth.category?.[0]?.name}
                </div>
                <div>componente selezione taglie</div>
                <AddToCartButton item={cloth} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
