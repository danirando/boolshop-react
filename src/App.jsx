import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DefaultLayout from "./layouts/DefaultLayout";
import ClothDetailPage from "./pages/ClothDetailPage";
import ClothesListPage from "./pages/ClothesListPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/clothes" element={<ClothesListPage />}>
              <Route path="detail" element={<ClothDetailPage />}></Route>
            </Route>
            <Route path="/checkout" element={<CheckoutPage />}></Route>
            <Route path="/cart" element={<CartPage />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
