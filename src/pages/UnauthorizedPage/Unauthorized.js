import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate} from 'react-router-dom';

import { useMediaQuery } from 'react-responsive';
function Unauthorized() {

const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
const navigate = useNavigate();

const handleClick = (e) => {
    navigate("/login")
}

return (
    <Container className="mt-5">
    <Row>
        <Col>
        <h2>You are not authorized to view this page</h2>
        {isMobile ? (
            <Button variant="primary" size="sm" className="mt-3" onClick={handleClick}>
            Login
            </Button>
        ) : (
            <Button variant="primary" className="mt-3" onClick={handleClick}>
            Login
            </Button>
        )}
        </Col>
    </Row>
    </Container>
);
}
export default Unauthorized;
