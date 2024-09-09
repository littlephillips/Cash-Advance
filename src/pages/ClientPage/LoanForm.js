import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Modal, Card } from 'react-bootstrap';
import withAuth from '../../components/withAuth/withAuth';

const endpoint = process.env.REACT_APP_API_URL;

const LoanForm = ({ isAuthenticated, onLogout }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    age: '',
    gender: '',
    loanAmount: '',
    businessHistory: '',
    businessLocation: '',
  });

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('');
  const [showThankYouModal, setShowThankYouModal] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${endpoint}/clients`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 201) {
        setAlertVariant('success');
        setAlertMessage('Loan Application submitted successfully!');
        setShowAlert(true);
        setShowThankYouModal(true);
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      setAlertVariant('danger');
      setAlertMessage('Loan Application Failed! Try Again');
      setShowAlert(true);
    }

    setFormData({
      fullName: '',
      email: '',
      phone: '',
      age: '',
      gender: '',
      loanAmount: '',
      businessHistory: '',
      businessLocation: '',
    });

    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };


  const handleCloseThankYouModal = () => {
    setShowThankYouModal(false);
    navigate('/');
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8}>
          {showAlert && (
            <div className={`alert alert-${alertVariant}`} role="alert">
              {alertMessage}
            </div>
          )}
          <h1 className="text-center mb-4">Loan Application Form</h1>
          
          <Card className="p-4 shadow-sm">
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="fullNameInput">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter full name"
                      value={formData.fullName}
                      onChange={(event) => setFormData({ ...formData, fullName: event.target.value })}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="emailInput">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={formData.email}
                      onChange={(event) => setFormData({ ...formData, email: event.target.value })}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group controlId="phoneInput" className="mt-3">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter phone number"
                      value={formData.phone}
                      onChange={(event) => setFormData({ ...formData, phone: event.target.value })}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="ageInput" className="mt-3">
                    <Form.Label>Age</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter age"
                      value={formData.age}
                      onChange={(event) => setFormData({ ...formData, age: event.target.value })}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group controlId="genderInput" className="mt-3">
                    <Form.Label>Gender</Form.Label>
                    <Form.Control
                      as="select"
                      value={formData.gender}
                      onChange={(event) => setFormData({ ...formData, gender: event.target.value })}
                      required
                    >
                      <option>Select Gender</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="loanAmountInput" className="mt-3">
                    <Form.Label>Loan Amount</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter loan amount"
                      value={formData.loanAmount}
                      onChange={(event) => setFormData({ ...formData, loanAmount: event.target.value })}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group controlId="businessHistoryInput" className="mt-3">
                <Form.Label>Business History</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Enter business history"
                  value={formData.businessHistory}
                  onChange={(event) => setFormData({ ...formData, businessHistory: event.target.value })}
                  rows={2} // Reduced height by limiting rows
                  required
                />
              </Form.Group>

              <Form.Group controlId="businessLocationInput" className="mt-3">
                <Form.Label>Business Location</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter business location"
                  value={formData.businessLocation}
                  onChange={(event) => setFormData({ ...formData, businessLocation: event.target.value })}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="mt-3">
                Submit
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>

      <Modal show={showThankYouModal} onHide={handleCloseThankYouModal}>
        <Modal.Header closeButton>
          <Modal.Title>Thank You!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Your loan application has been successfully submitted.</p>
          <p>We will review your application and get back to you soon.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseThankYouModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {isAuthenticated && (
        <div className="text-center mt-4">
          <Button variant="info" className="mr-2" onClick={() => navigate('#pay')}>
            Pay Loan
          </Button>
        </div>
      )}
    </Container>
  );
};


export default withAuth(LoanForm, 'Loan Applicant (Customer)');