import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';

const endpoint = process.env.REACT_APP_API_URL;

const CollectLoanForm = () => {
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
            const response = await fetch(`${endpoint}/datums`, {
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

        // Hide alert after 3 seconds
        setTimeout(() => {
            setShowAlert(false);
        }, 3000);
    };

    return (
        <Container fluid className="d-flex align-items-center justify-content-center vh-100">
            <Row className="w-100">
                <Col md={6} className="mx-auto">
                    {showAlert && (
                        <Alert variant={alertVariant} onClose={() => setShowAlert(false)} dismissible>
                            {alertMessage}
                        </Alert>
                    )}
                    <h2 className="text-center mb-3">Loan Application Form</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="fullNameInput" className="mb-2">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Client full name"
                                value={formData.fullName}
                                onChange={(event) =>
                                    setFormData({ ...formData, fullName: event.target.value })
                                }
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="emailInput" className="mb-2">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter Client email"
                                value={formData.email}
                                onChange={(event) =>
                                    setFormData({ ...formData, email: event.target.value })
                                }
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="phoneInput" className="mb-2">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                                type="tel"
                                placeholder="Enter Client phone number"
                                value={formData.phone}
                                onChange={(event) =>
                                    setFormData({ ...formData, phone: event.target.value })
                                }
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="businessHistoryInput" className="mb-2">
                            <Form.Label>Business History</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Describe Client business history"
                                value={formData.businessHistory}
                                onChange={(event) =>
                                    setFormData({ ...formData, businessHistory: event.target.value })
                                }
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="businessLocationInput" className="mb-2">
                            <Form.Label>Business Location</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Cient business location"
                                value={formData.businessLocation}
                                onChange={(event) =>
                                    setFormData({ ...formData, businessLocation: event.target.value })
                                }
                                required
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="w-100 mt-3">
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default CollectLoanForm;
