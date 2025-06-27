import { Link, Outlet } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function DefaultLayout() {
  return (
    <>
      <header>
        <Navbar expand="lg" className="navbar d-flex align-items-center">
          <Container fluid>
            <Navbar.Brand href="/">
              <img src="../../logo.png" className="img-fluid logo" alt="" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: "100px" }}
                navbarScroll
              >
                <Link to="#" className="nav-link">
                  <i className="bi bi-cart" style={{ fontSize: "1.5rem" }}></i>
                </Link>
              </Nav>
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button className="search-button">Cerca</Button>
              </Form>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </>
  );
}
