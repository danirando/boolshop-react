import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ClothesContext = createContext();

export const ClothesProvider = ({ children }) => {
  const [clothes, setClothes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/clothes")
      .then((res) => {
        setClothes(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  return (
    <ClothesContext.Provider value={{ clothes, loading, error }}>
      {children}
    </ClothesContext.Provider>
  );
};
