import React from "react";

/* BOOTSTRAP */
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

/* COMPONENTS */
import CartWidget from './CartWidget';

const Header = () => {
  return (
    <section className="container-fluid header">
      <CartWidget />
      <Navbar bg="dark" expand="lg" variant="dark">
        <Container>
          <Navbar.Brand href="#home">PC-Store</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Notebooks</Nav.Link>
              <Nav.Link href="#link">Auriculares</Nav.Link>
              <Nav.Link href="#sillas">Sillas</Nav.Link>
              <NavDropdown title="Componentes" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">
                  Memoria-RAM
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Discos</NavDropdown.Item>
                {/*                         <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item> */}
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </section>
  );
};

export default Header;