import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// css
import '../../styles/landingPage.css'

const LandingPage = () => {

return (
    <div className="landing-page">
    <Container>
        <Row>
        <Col xs={12} md={6}>
            <h1 className="text-center">Welcome to Cash Advance App</h1>
            <p className="text-center">
            Our app helps you to seamlesly apply for a loan and keep your business afloat!.
            </p>
            <div className="button-container">
            <Link to="/login">
                <Button variant="primary" className="hover-link">
                Get Started
                </Button>
            </Link>
            </div>
        </Col>
        </Row>
    </Container>
    </div>
);
};

export default LandingPage;



