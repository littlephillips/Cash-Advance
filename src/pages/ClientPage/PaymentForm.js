import React, { useState } from 'react';
import { Form, Button, Modal, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const endpoint = process.env.REACT_APP_API_URL;

function PaymentForm() {
    const [formData, setFormData] = useState({
        amount: '',
        payment_means: '',
        fullName: '',
    });
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [isUnallocated, setIsUnallocated] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`${endpoint}/payment`, {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: { 'Content-Type': 'application/json' },
            });
            const data = await response.json();

            if (response.ok) {
                // Backend tells us if payment was unallocated
                setIsUnallocated(data.unallocated === true);
                setShowSuccessModal(true);
                setTimeout(() => {
                    setShowSuccessModal(false);
                    setFormData({ amount: '', payment_means: '', fullName: '' });
                    navigate('/client');
                }, 3000);
            } else {
                throw new Error(data.message || 'Error submitting payment.');
            }
        } catch (error) {
            console.error(error);
            setShowErrorModal(true);
            setTimeout(() => setShowErrorModal(false), 5000);
        }
    };

    const handleInputChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '20px' }}>
            <Form
                style={{ padding: '20px', maxWidth: '500px', width: '100%', margin: 'auto' }}
                onSubmit={handleSubmit}
            >
                <Form.Group controlId="formFullName" className="mb-3">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your full name"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                    />
                    <Form.Text muted>As registered in the application</Form.Text>
                </Form.Group>

                <Form.Group controlId="formAmount" className="mb-3">
                    <Form.Label>Payment Amount (KES)</Form.Label>
                    <Form.Control
                        type="number"
                        min="1"
                        placeholder="Enter payment amount"
                        name="amount"
                        value={formData.amount}
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formPaymentMeans" className="mb-3">
                    <Form.Label>Payment Method</Form.Label>
                    <Form.Control
                        as="select"
                        name="payment_means"
                        value={formData.payment_means}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Select payment method</option>
                        <option value="M-Pesa">M-Pesa</option>
                        <option value="Bank Transfer">Bank Transfer</option>
                        <option value="Cash">Cash</option>
                    </Form.Control>
                </Form.Group>

                <Button variant="primary" type="submit" className="mt-2 w-100">
                    Submit Payment
                </Button>
            </Form>

            {/* Success Modal - shows different message if unallocated */}
            <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {isUnallocated ? '⚠️ Payment Received' : '✅ Payment Successful'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {isUnallocated ? (
                        <Alert variant="warning" className="mb-0">
                            Your payment was received but could not be matched to an 
                            existing customer. It has been stored as an 
                            <strong> unallocated receipt</strong> and will be reviewed 
                            by our team.
                        </Alert>
                    ) : (
                        <p>Your payment has been submitted successfully.</p>
                    )}
                </Modal.Body>
            </Modal>

            {/* Error Modal */}
            <Modal show={showErrorModal} onHide={() => setShowErrorModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>❌ Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    There was an error submitting your payment. Please try again.
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default PaymentForm;