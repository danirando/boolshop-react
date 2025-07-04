import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

export default function Header() {
  const { cart } = useCart(); // prendi il carrello dal context
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  return (
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

        <Nav
          className="me-auto my-2 my-lg-0"
          style={{ maxHeight: "100px" }}
          navbarScroll>
          <Link to="/cart" className="nav-link position-relative">
            <i className="bi bi-cart" style={{ fontSize: "1.5rem" }}></i>
            {cartCount > 0 && (
              <span
                className="start-100 translate-middle badge rounded-pill bg-danger"
                style={{ fontSize: "0.75rem" }}>
                {cartCount}
              </span>
            )}
          </Link>
        </Nav>

        <form className="d-flex">
          <input
            type="search"
            className="form-control me-2 search-input"
            placeholder="Search"
            aria-label="Search"
          />
          <button type="submit" className="btn search-button">
            Search
          </button>
        </form>
      </Container>
    </Navbar>
  );
}
