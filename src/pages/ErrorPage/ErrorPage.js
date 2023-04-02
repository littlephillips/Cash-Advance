import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';

const background = "https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-1932.jpg?size=626&ext=jpg&ga=GA1.2.1180731975.1677176510&semt=ais";

const ErrorPage = () => {
const isMobile = useMediaQuery({ maxWidth: 767 });

return (
    <Container>
    <Row>
        <Col xs={12} md={6}>
        <img src={background} alt="Error" style={{ maxWidth: '100%' }} />
        </Col>
        <Col xs={12} md={6} className="mt-5">
        <h1>{isMobile ? 'Oops!' : '404 Error: Page Not Found'}</h1>
        <p>We're sorry, but the page you're looking for cannot be found.</p>
        <Button href="/" variant="primary" className="mt-5">Return to Home</Button>
        </Col>
    </Row>
    </Container>
);
};

export default ErrorPage;
