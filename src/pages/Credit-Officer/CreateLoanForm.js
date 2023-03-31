import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const CreateLoanForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    loanAmount: '',
    interestRate: '',
    loanTenure: '',
    loanStatus: ''
    });

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/loans', {
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
      setAlertMessage('Loan created successfully!');
      setShowAlert(true);
    } catch (error) {
      // Show error alert
      setAlertVariant('danger');
      setAlertMessage('Loan creation failed');
      setShowAlert(true);
    }

    // Reset form data
    setFormData({
      fullName: '',
      loanAmount: '',
      interestRate: '',
      loanTenure: '',
      loanStatus: ''
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
          placeholder="Enter full name"
          value={formData.fullName}
          onChange={(event) =>
          setFormData({ ...formData, fullName: event.target.value })
          }
          />
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

          <Form.Group controlId="interestRateInput" className="mt-3">
          <Form.Label>Interest Rate (monthly)</Form.Label>
          <Form.Control
          type="number"
          placeholder="Enter interest rate"
          value={formData.interestRate}
          onChange={(event) =>
            setFormData({ ...formData, interestRate: event.target.value })
          }
          />
          </Form.Group>

          <Form.Group controlId="loanTenureInput" className="mt-3">
            <Form.Label>Loan Tenure</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter loan tenure"
              value={formData.loanTenure}
              onChange={(event) =>
                setFormData({ ...formData, loanTenure: event.target.value })
              }
            />
          </Form.Group>

            <Form.Group controlId="loanStatusInput" className="mt-3">
            <Form.Label>Loan Status</Form.Label>
            <Form.Control
            type="text"
            placeholder="Enter loan status"
            value={formData.loanStatus}
            onChange={(event) =>
              setFormData({ ...formData, loanStatus: event.target.value })
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

export default CreateLoanForm;



// using react bootstrap and react-responsive modify this component to be fully repsonsive 



