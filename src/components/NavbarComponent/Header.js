import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="p-3">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          Cash Advance
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">

            <Nav.Link
              as={NavLink}
              to="/signup"
              style={({ isActive }) => ({
                fontWeight: isActive ? 'bold' : 'normal',
                color: isActive ? 'white' : 'lightgray',
                textDecoration: 'none'
              })}
            >
              <Button variant="outline-primary">
                Signup
              </Button>
            </Nav.Link>

            <Nav.Link
              as={NavLink}
              to="/login"
              style={({ isActive }) => ({
                fontWeight: isActive ? 'bold' : 'normal',
                color: isActive ? 'white' : 'lightgray',
                textDecoration: 'none'
              })}
            >
              <Button variant="primary">
                Login
              </Button>
            </Nav.Link>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;