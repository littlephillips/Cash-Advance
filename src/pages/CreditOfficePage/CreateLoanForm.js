import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import LoanTable from './LoanTable';

const endpoint = process.env.REACT_APP_API_URL;

// Fixed loan product parameters per company policy
const INTEREST_RATE = 3;        // 3% per month
const LOAN_TENURE = 2;          // 2 months
const PROCESSING_FEE = 300;     // KES 300 upfront
const MINIMUM_LOAN = 7000;      // KES 7,000

const CreateLoanForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    loanAmount: '',
  });

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('');

  // Calculate loan breakdown whenever loanAmount changes
  const loanAmount = parseFloat(formData.loanAmount) || 0;
  const totalInterest = (INTEREST_RATE / 100) * loanAmount * LOAN_TENURE;
  const totalRepayable = loanAmount + totalInterest;
  const amountDisbursed = loanAmount - PROCESSING_FEE;

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Enforce minimum loan amount
    if (loanAmount < MINIMUM_LOAN) {
      setAlertVariant('danger');
      setAlertMessage(`Minimum loan amount is KES ${MINIMUM_LOAN.toLocaleString()}`);
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      return;
    }

    const payload = {
      fullName: formData.fullName,
      loanAmount: loanAmount,
      interestRate: INTEREST_RATE,
      loanTenure: LOAN_TENURE,
      processingFee: PROCESSING_FEE,
      totalInterest: totalInterest,
      totalRepayable: totalRepayable,
      amountDisbursed: amountDisbursed,
      loanStatus: 'Pending',
      loanDisbursed: 'No',
    };

    try {
      const response = await fetch(`${endpoint}/loans`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Network response was not ok');

      setAlertVariant('success');
      setAlertMessage('Loan created successfully!');
      setShowAlert(true);
    } catch (error) {
      setAlertVariant('danger');
      setAlertMessage('Loan creation failed. Please try again.');
      setShowAlert(true);
    }

    setFormData({ fullName: '', loanAmount: '' });
    setTimeout(() => setShowAlert(false), 3000);
  };

  return (
    <Container id="form">
      <Row className="justify-content-start mt-3">
        <Col md={6}>
          <a href='#loans'>
            <Button variant="info" className="mb-3">View Loans</Button>
          </a>
        </Col>
      </Row>

      {showAlert && (
        <Alert variant={alertVariant}>{alertMessage}</Alert>
      )}

      <Row>
        <Col md={6}>
          <Form onSubmit={handleSubmit}>

            <Form.Group controlId="fullNameInput" className="mt-3">
              <Form.Label>Client Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter client full name"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group controlId="loanAmountInput" className="mt-3">
              <Form.Label>Loan Amount (KES)</Form.Label>
              <Form.Control
                type="number"
                placeholder={`Minimum KES ${MINIMUM_LOAN.toLocaleString()}`}
                value={formData.loanAmount}
                min={MINIMUM_LOAN}
                onChange={(e) => setFormData({ ...formData, loanAmount: e.target.value })}
                required
              />
              <Form.Text muted>Minimum amount: KES {MINIMUM_LOAN.toLocaleString()}</Form.Text>
            </Form.Group>

            {/* Locked fields - shown for transparency but not editable */}
            <Form.Group className="mt-3">
              <Form.Label>Interest Rate</Form.Label>
              <Form.Control type="text" value={`${INTEREST_RATE}% per month`} disabled />
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Loan Tenure</Form.Label>
              <Form.Control type="text" value={`${LOAN_TENURE} months`} disabled />
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Processing Fee</Form.Label>
              <Form.Control type="text" value={`KES ${PROCESSING_FEE.toLocaleString()}`} disabled />
            </Form.Group>

            {/* Live loan summary */}
            {loanAmount >= MINIMUM_LOAN && (
              <div className="mt-4 p-3 bg-light border rounded">
                <h6 className="mb-2">Loan Summary</h6>
                <table className="table table-sm mb-0">
                  <tbody>
                    <tr>
                      <td>Principal</td>
                      <td>KES {loanAmount.toLocaleString()}</td>
                    </tr>
                    <tr>
                      <td>Total Interest ({INTEREST_RATE}% × {LOAN_TENURE} months)</td>
                      <td>KES {totalInterest.toLocaleString()}</td>
                    </tr>
                    <tr>
                      <td>Total Repayable</td>
                      <td><strong>KES {totalRepayable.toLocaleString()}</strong></td>
                    </tr>
                    <tr>
                      <td>Processing Fee (deducted upfront)</td>
                      <td>- KES {PROCESSING_FEE.toLocaleString()}</td>
                    </tr>
                    <tr className="table-success">
                      <td>Amount to be Disbursed</td>
                      <td><strong>KES {amountDisbursed.toLocaleString()}</strong></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            <Button variant="primary" type="submit" className="mt-3">
              Create Loan
            </Button>
          </Form>
        </Col>
      </Row>

      <div className="mt-3" id="loans">
        <LoanTable />
        <a href='#form'>
          <Button variant="info" className="mb-3">🔝 Top</Button>
        </a>
      </div>
    </Container>
  );
};

export default CreateLoanForm;