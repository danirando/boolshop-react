import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useState } from "react";

export default function Header() {
  const { cart } = useCart(); // prendi il carrello dal context
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const location = useLocation();

  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (search.trim()) {
      // Leggi parametri esistenti
      const params = new URLSearchParams(location.search);

      // Aggiorna query di ricerca
      params.set("query", search.trim());

      // Naviga mantenendo i filtri + query aggiornata
      navigate(`/clothes?${params.toString()}`);

      setSearch("");
    }
  };

  return (
    <>
      <Navbar expand="md" className="navbar d-flex align-items-center">
        <Container className="d-flex flex-column header-container">
          <Navbar.Brand href="/">
            <img
              src="../../logo.png"
              className="img-fluid logo logo-img"
              alt="Logo"
            />
          </Navbar.Brand>

          <div className="second-row">
            <Link to="/clothes" className="nav-link clothes">
              Clothes
            </Link>

            <form className="d-flex" onSubmit={handleSubmit}>
              <input
                type="search"
                className="form-control me-2 search-input"
                placeholder="Search"
                aria-label="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button type="submit" className="btn search-button">
                Search
              </button>
            </form>

            <Nav navbarScroll>
              <Link to="/cart" className="nav-link position-relative">
                <i className="bi bi-cart" style={{ fontSize: "1.5rem" }}></i>
                {cartCount > 0 && (
                  <span className="badge rounded-pill bg-danger">
                    {cartCount}
                  </span>
                )}
              </Link>
            </Nav>
          </div>
        </Container>
      </Navbar>
      <div
        className="w-100 text-center py-2"
        style={{ backgroundColor: "#f8f9fa" }}>
        <span style={{ fontSize: "0.95rem" }}>
          Spedizione gratuita: ordine minimo 70€. Codici promo: SAVE10, SAVE20,
          SAVE30. Validi dal 07-07-25 al 20-07-25
        </span>
      </div>
    </>
  );
}
