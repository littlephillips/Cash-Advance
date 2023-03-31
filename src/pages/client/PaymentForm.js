import React, { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function PaymentForm() {
const [formData, setFormData] = useState({
    amount: '',
    payment_means: '',
    fullName: '',
});
const [showSuccessModal, setShowSuccessModal] = useState(false);
const [showErrorModal, setShowErrorModal] = useState(false);
const navigate = useNavigate();

const handleSubmit = async (event) => {
    event.preventDefault();
    try {
    const response = await fetch('http://127.0.0.1:3000/payment', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
        'Content-Type': 'application/json',
        },
    });
    const data = await response.json();
    console.log(data);
    if (response.ok) {
        setShowSuccessModal(true);
        setTimeout(() => {
        setShowSuccessModal(false);
        setFormData({
            amount: '',
            payment_means: '',
            fullName: '',
        });
        navigate('/client');
        }, 2000);
    } else {
        throw new Error(data.message || 'There was an error submitting your payment.');
    }
    } catch (error) {
    console.error(error);
    setShowErrorModal(true);
    setTimeout(() => {
        setShowErrorModal(false);
    }, 10000);
    }
};

const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
};

return (
    <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '20px' }}>
    <Form style={{ padding: '20px', maxWidth: '500px', width: '100%', margin: 'auto' }} onSubmit={handleSubmit}>
        <Form.Group controlId="formFullName">
        <Form.Label>Full Name</Form.Label>
        <Form.Control
            type="text"
            placeholder="Enter your full name"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
        />
        <Form.Text muted>as registered in the application</Form.Text>
        </Form.Group>
        <Form.Group controlId="formAmount">
        <Form.Label>Payment Amount</Form.Label>
        <Form.Control
            type="number"
            min="7000"
            placeholder="Enter payment amount"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
        />
        </Form.Group>
        <Form.Group controlId="formPaymentMeans">
        <Form.Label>Payment Means</Form.Label>
        <Form.Control
            type="text"
            placeholder="Enter payment"
            name="payment_means"
            value={formData.payment_means}
            onChange={handleInputChange}
        />
        </Form.Group>
        <Button variant="primary" type="submit" style={{ margin: '10px' }}>
        Submit Payment
        </Button>
    </Form>
        <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
            <Modal.Header closeButton>
            <Modal.Title>Success!</Modal.Title>
            </Modal.Header>
            <Modal.Body>Your payment has been submitted successfully.</Modal.Body>
        </Modal>
        <Modal show={showErrorModal} onHide={() => setShowErrorModal(false)}>
        <Modal.Header closeButton>
            <Modal.Title>Error!</Modal.Title>
        </Modal.Header>
        <Modal.Body>There was an error submitting your payment. Please try again later.</Modal.Body>
        </Modal>
        </div>
        );
    }

    export default PaymentForm;
