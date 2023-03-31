    import React from 'react';
    import { Navbar, Container, Nav, Button } from 'react-bootstrap';

function Header() {
    const activeStyle = { fontWeight: 'bold', color: 'white' };
    const visitedStyle = { color: 'lightgray' };
    
    return (
        <Navbar bg="dark" variant="dark" expand="lg" style={{ padding: '1rem', color: 'white' }}>
        <Container>
            <Navbar.Brand href="/">Cash Advance</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link href="/signup" style={visitedStyle} activeStyle={activeStyle}>
                        <Button variant="outline-primary">Signup</Button>
                        </Nav.Link>
                        <Nav.Link href="/login" style={visitedStyle} activeStyle={activeStyle}>
                        <Button variant="primary">Login</Button>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
        </Container>
        </Navbar>
    );
}

    export default Header;
