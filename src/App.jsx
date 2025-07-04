import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DefaultLayout from "./layouts/DefaultLayout";
import ClothDetailPage from "./pages/ClothDetailPage";
import ClothesListPage from "./pages/ClothesListPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import NotFoundPage from "./pages/NotFoundPage";
import OrderSummary from "./pages/OrderSummary";
import { ClothesProvider } from "./contexts/ClothesContext";
import { CartProvider } from "./contexts/CartContext";
import SearchPage from "./pages/SearchPage";

export default function App() {
  return (
    <>
      <CartProvider>
        <ClothesProvider>
          <BrowserRouter>
            <Routes>
              {/* ROTTE CON IN COMUNE IL LAYOUT */}
              <Route element={<DefaultLayout />}>
                <Route path="/" element={<HomePage />}></Route>
                <Route path="/checkout" element={<CheckoutPage />}></Route>
                <Route path="/order-summary" element={<OrderSummary />}></Route>
                <Route path="/cart" element={<CartPage />}></Route>

                <Route path="/search/:query" element={<SearchPage />} />

                {/* ROTTE CON IN COMUNE IL PREFISSO  */}
                <Route path="/clothes">
                  <Route path="" element={<ClothesListPage />}></Route>
                  <Route path=":slug" element={<ClothDetailPage />}></Route>
                </Route>

                <Route path="*" element={<NotFoundPage />}></Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </ClothesProvider>
      </CartProvider>
    </>
  );
}
