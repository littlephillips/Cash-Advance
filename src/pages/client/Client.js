import React, { useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Modal } from 'react-bootstrap';

// payment page
import PaymentForm from './PaymentForm';
import withAuth from '../../components/withAuth/withAuth';

const Client = ({ isAuthenticated, onLogout }) => {
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
      const response = await fetch('http://127.0.0.1:3000/clients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 201) {
        // Show success alert
        setAlertVariant('success');
        setAlertMessage('Loan Application successfully!');
        setShowAlert(true);

        // Show thank you modal
        setShowThankYouModal(true);
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      // Show error alert
      setAlertVariant('danger');
      setAlertMessage('Loan Application Failed! Try Again');
      setShowAlert(true);
    }

    // Reset form data
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

    // Hide alert after 1 second
    setTimeout(() => {
      setShowAlert(false);
    }, 1000);
  };

  const handleLogout = () => {
    onLogout();
    navigate("/")
  }

  const handleCloseThankYouModal = () => {
    setShowThankYouModal(false);
    onLogout();
    navigate('/');
  };

  return (
    <Container>
      <Row className="justify-content-end">
        <Col md={6}>
          {showAlert && (
            <div className={`alert alert-${alertVariant}`} role="alert">
              {alertMessage}
            </div>
          )}
        </Col>

        <div className="d-flex justify-content-evenly  mt-3" id="top">
          {isAuthenticated && (
          <a href='#pay' className="float-left mr-2">
          <Button variant="info" className="mb-3">
          Pay Loan
          </Button>
          </a>
          )}

        {isAuthenticated && (
            <Button variant="danger" className="mb-3" 
            style={{marginRight: '10px'}} onClick={handleLogout}>
              Logout
            </Button>
          )}
          </div>
      </Row>
      <Row>
        <Col>
          <h1 className="mt-3"  >Welcome to Loan Application Form</h1>
          <Form onSubmit={handleSubmit} id="top">
            <Form.Group controlId="fullNameInput" className="mt-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter full name"
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
                placeholder="Enter email"
                value={formData.email}
                onChange={(event) =>
                setFormData({ ...formData, email: event.target.value })
                }
                />
                </Form.Group>

                <Form.Group controlId="phoneInput" className="mt-3">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter phone number"
                    value={formData.phone}
                    onChange={(event) =>
                      setFormData({ ...formData, phone: event.target.value })
                    }
                  />
                </Form.Group>
        
                <Form.Group controlId="ageInput" className="mt-3">
                  <Form.Label>Age</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter age"
                    value={formData.age}
                    onChange={(event) =>
                      setFormData({ ...formData, age: event.target.value })
                    }
                  />
                </Form.Group>
        
                <Form.Group controlId="genderInput" className="mt-3">
                  <Form.Label>Gender</Form.Label>
                  <Form.Control
                    as="select"
                    value={formData.gender}
                    onChange={(event) =>
                      setFormData({ ...formData, gender: event.target.value })
                    }
                  >
                    <option>Select Gender</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </Form.Control>
                </Form.Group>
        
                <Form.Group controlId="loanAmountInput" className="mt-3">
                  <Form.Label>Loan Amount</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter loan amount"
                    value={formData.loanAmount}
                    onChange={(event) =>
                      setFormData({ ...formData, loanAmount: event.target.value })
                    }
                  />
                </Form.Group>
        
                <Form.Group controlId="businessHistoryInput" className="mt-3">
                  <Form.Label>Business History</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Enter business history"
                    value={formData.businessHistory}
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        businessHistory: event.target.value,
                      })
                    }
                  />
                </Form.Group>
        
                <Form.Group controlId="businessLocationInput" className="mt-3">
                  <Form.Label>Business Location</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter business location"
                    value={formData.businessLocation}
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        businessLocation: event.target.value,
                      })
                    }
                  />
                </Form.Group>
        
                <Button variant="primary" type="submit" className="mt-3">
                  Submit
                </Button>
              </Form>
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
          <div id="pay">
            <hr/>
          <h1 className="text-center mt-3">Pay Loan </h1>
          <PaymentForm/> 
          </div>
          <a href="#top">
          <Button variant="warning" style={{ margin: '10px' }} >
            🔝 Top
            </Button>
            </a>       
      </Container>
    );
  };
  
  export default withAuth(Client, 'Loan Applicant (Customer)');
