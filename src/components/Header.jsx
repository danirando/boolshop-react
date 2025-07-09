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
        <Container className="d-flex header-container">
          <Navbar.Brand href="/">
            <img
              src="../../logo.png"
              className="img-fluid logo logo-img"
              alt="Logo"
            />
          </Navbar.Brand>
          <Link to="/clothes" className="nav-link clothes">
            Clothes
          </Link>

          <form
            className="d-flex align-items-center gap-3 form-search"
            onSubmit={handleSubmit}
          >
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <div className="dropdown position-relative">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="bi bi-cart" style={{ fontSize: "1.5rem" }}></i>
                  {cartCount > 0 && (
                    <span
                      className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                      style={{ fontSize: "0.75rem" }}
                    >
                      {cartCount}
                    </span>
                  )}
                </a>

                <ul
                  className="dropdown-menu dropdown-menu-end p-2"
                  style={{ minWidth: "250px" }}
                >
                  {cart.length === 0 ? (
                    <li className="dropdown-item text-muted">Cart is empty</li>
                  ) : (
                    <>
                      {cart.map((item) => (
                        <li
                          key={`${item.id}-${item.size}`}
                          className="dropdown-item p-0"
                        >
                          <Link
                            to={`/clothes/${item.slug}`}
                            className="d-flex justify-content-between align-items-center px-3 py-2 text-decoration-none text-dark"
                          >
                            <span>
                              {item.name} ({item.size})
                            </span>
                            <span>
                              × {item.quantity} -{" "}
                              {item.finalPrice ?? item.price}€
                            </span>
                          </Link>
                        </li>
                      ))}
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li className="px-3 py-1 d-flex justify-content-between fw-bold">
                        <span>Total:</span>
                        <span>
                          {cart
                            .reduce(
                              (sum, item) =>
                                sum +
                                (item.finalPrice ?? item.price) * item.quantity,
                              0
                            )
                            .toFixed(2)}
                          €
                        </span>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <Link
                          to="/cart"
                          className="dropdown-item text-center text-primary fw-bold"
                        >
                          Go to cart
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </Nav>
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
        </Container>
      </Navbar>
      <div
        className="w-100 text-center py-2"
        style={{ backgroundColor: "#f8f9fa" }}
      >
        <span style={{ fontSize: "0.95rem" }}>
          Free shipping: minimum order 70€. Promo codes: SAVE10, SAVE20, SAVE30.
          Valid from 07-07-25 to 20-07-25
        </span>
      </div>
    </>
  );
}
