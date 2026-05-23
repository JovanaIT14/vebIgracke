import { Container, Nav, Navbar } from 'react-bootstrap';
import { FaHome, FaShoppingCart, FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <Navbar bg="primary" data-bs-theme="dark" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand as={NavLink} to="/" className="fw-bold">
            Toyland
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="main-navbar" />
          <Navbar.Collapse id="main-navbar">
            <Nav className="ms-auto">
              <Nav.Link as={NavLink} to="/" end>
                <FaHome className="me-1" />
                Početna
              </Nav.Link>
              <Nav.Link as={NavLink} to="/korpa">
                <FaShoppingCart className="me-1" />
                Korpa
              </Nav.Link>
              <Nav.Link as={NavLink} to="/prijava">
                <FaSignInAlt className="me-1" />
                Prijava
              </Nav.Link>
              <Nav.Link as={NavLink} to="/registracija">
                <FaUserPlus className="me-1" />
                Registracija
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
