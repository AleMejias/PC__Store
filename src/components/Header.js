import React from "react";

/* BOOTSTRAP */
import { Container, Nav, Navbar } from "react-bootstrap";

/* COMPONENTS */
import CartWidget from './CartWidget';

/* ROOUTER */
import { NavLink , Link } from "react-router-dom";

/* LOGO */
import logo from '../assets/img/logoCopia.png';

const Header = () => {
  return (
    <section className="container-fluid header">
      <CartWidget />
      <Navbar expand="lg" variant="dark">
        <Container>
          <Navbar.Brand>
            <Link to="/"><img src={logo} alt ="PC-STORE" style={{width:"180px"}}/></Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto navBar">
              <NavLink to="/producto/notebook">Notebooks</NavLink>
              <NavLink to="/producto/auriculares">Auriculares</NavLink>
              <NavLink to="/producto/sillas">Sillas</NavLink>
              <NavLink to="/producto/discos">Discos</NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </section>
  );
};

export default Header;