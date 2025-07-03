import { NavLink } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

// import {useCount} from "../context/ClothesContext";

export default function ClothesListPage() {
  // const {clothes, setClothes} = useCount()
  const [clothes, setClothes] = useState([]);
  const clothesUrl = import.meta.env.VITE_BOOKS_API_URL + "/clothes";

  const fetchClothes = () => {
    axios.get(clothesUrl).then((res) => {
      console.log(res.data);
      setClothes(res.data);
    });
  };

  useEffect(fetchClothes, []);

  return (
    <>
      <div className="container">
        <h1 className="text-center ">Abbigliamento</h1>
        <div className="row gy-4 ">
          {clothes.map((cloth) => {
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
                      <NavLink to="/clothes/:id" className="nav-item">
                        Vedi dettagli
                      </NavLink>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}
