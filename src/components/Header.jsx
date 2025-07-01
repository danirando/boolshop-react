import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <Navbar expand="md" className="navbar d-flex align-items-center">
      <Container fluid>
        <Navbar.Brand href="/">
          <img src="../../logo.png" className="img-fluid logo" alt="Logo" />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll" />

        <Navbar.Collapse style={{ height: "90px" }} id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll>
            <Link to="#" className="nav-link">
              <i className="bi bi-cart" style={{ fontSize: "1.5rem" }}></i>
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
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
