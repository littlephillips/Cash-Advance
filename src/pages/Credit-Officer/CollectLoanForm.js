import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const CollectLoanForm= () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        businessHistory: '',
        businessLocation: '',
    });

const [showAlert, setShowAlert] = useState(false);
const [alertMessage, setAlertMessage] = useState('');
const [alertVariant, setAlertVariant] = useState('');

const handleSubmit = async (event) => {
    event.preventDefault();
    try {
    const response = await fetch('http://localhost:3000/datums', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    // Show success alert
    setAlertVariant('success');
    setAlertMessage('Form submitted successfully!');
    setShowAlert(true);
    } catch (error) {
    // Show error alert
    setAlertVariant('danger');
    setAlertMessage('Error submitting form');
    setShowAlert(true);
    }

    // Reset form data
    setFormData({
        fullName: '',
        email: '',
        phone: '',
        businessHistory: '',
        businessLocation: '',
        });

    // Hide alert after 1 second
    setTimeout(() => {
    setShowAlert(false);
    }, 1000);
};


return (
    <Container>
    <Row className="justify-content-end mt-3">
        <Col md={6}>
        {showAlert && (
            <div className={`alert alert-${alertVariant}`} role="alert">
            {alertMessage}
            </div>
        )}
        </Col>
    </Row>
    <Row>
        <Col>
        <Form onSubmit={handleSubmit}>
        <Form.Group controlId="fullNameInput" className="mt-3">
        
        <Form.Label>Full Name</Form.Label>
        <Form.Control
        type="text"
        placeholder="Enter Client full name"
        value={formData.fullName}
        onChange={(event) =>
        setFormData({ ...formData, fullName: event.target.value })
        }
        />
        </Form.Group>

            <Form.Group controlId="emailInput" className="mt-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
            type="email"
            placeholder="Enter Client Your Email"
            value={formData.email}
            onChange={(event) =>
                setFormData({ ...formData, email: event.target.value })
            }
            />
        </Form.Group>

        <Form.Group controlId="phoneInput" className="mt-3">
        <Form.Label>Phone</Form.Label>
        <Form.Control
        type="phone"
        placeholder="Enter Client Phone"
        value={formData.phone}
        onChange={(event) =>
            setFormData({ ...formData, phone: event.target.value })
        }
        />
        </Form.Group>

        <Form.Group controlId="businessHistoryInput" className="mt-3">
            <Form.Label>Business History</Form.Label>
            <Form.Control
            type="text"
            placeholder="Enter Business History"
            value={formData.businessHistory}
            onChange={(event) =>
                setFormData({ ...formData, businessHistory: event.target.value })
            }
            />
        </Form.Group>

            <Form.Group controlId="businessLocationInput" className="mt-3">
            <Form.Label>Business Location</Form.Label>
            <Form.Control
            type="text"
            placeholder="Enter Business Location"
            value={formData.businessLocation}
            onChange={(event) =>
            setFormData({ ...formData, businessLocation: event.target.value })
            }
            />
            </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
        Submit
        </Button>
    </Form>
    </Col>
</Row>
</Container>
);
};

export default CollectLoanForm;



