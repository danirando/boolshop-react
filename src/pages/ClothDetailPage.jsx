import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

// import {useCount} from "../context/ClothesContext";

export default function ClothDetailPage() {
  // const {clothes, setClothes} = useCount()
  const { id } = useParams;
  const [clothes, setClothes] = useState([]);
  const clothesUrl = import.meta.env.VITE_BOOKS_API_URL + "/clothes" + id;

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
        <h1>Dettagli del Prodotto</h1>
        <p>Informazioni dettagliate sul prodotto selezionato.</p>

        <div className="d-flex justify-content-around align-items-center">
          <div>immagine</div>
          <div>
            <div>Dettagli:</div>
            <div>Nome </div>
            <div>Prezzo: </div>
            <div>Materiale:</div>
            <div>Categoria: </div>
          </div>
        </div>
      </div>
    </>
  );
}
