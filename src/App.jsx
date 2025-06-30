import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DefaultLayout from "./layouts/DefaultLayout";
import ClothDetailPage from "./pages/ClothDetailPage";
import ClothesListPage from "./pages/ClothesListPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* ROTTE CON IN COMUNE IL LAYOUT */}
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/checkout" element={<CheckoutPage />}></Route>
            <Route path="/cart" element={<CartPage />}></Route>

            {/* ROTTE CON IN COMUNE IL PREFISSO  */}
            <Route path="/clothes">
              <Route path="" element={<ClothesListPage />}></Route>
              <Route path=":id" element={<ClothDetailPage />}></Route>
            </Route>

            <Route path="*" element={<NotFoundPage />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
