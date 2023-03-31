import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';

const ReceivePayment = () => {
  const [payments, setPayments] = useState([    { customerId: 1, amount: 100.0, status: 'Paid' },    { customerId: 2, amount: 50.0, status: 'Pending' },    { customerId: 3, amount: 200.0, status: 'Paid' },  ]);
  const [unallocated, setUnallocated] = useState([    { id: 1, amount: 75.0 },    { id: 2, amount: 150.0 },    { id: 3, amount: 100.0 },  ]);

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    // Submit payment details to external source/gateway
    // Update payment history table
    const amount = e.target.elements.amount.value;
    // const paymentLink = e.target.elements.paymentLink.value;
    const customerId = payments.length + 1;
    const payment = { customerId, amount, status: 'Pending' };
    setPayments([...payments, payment]);
  }

  const handleUpdateReceipt = (receiptId) => {
    // Update receipt for specific customer
    const updatedUnallocated = unallocated.filter(receipt => receipt.id !== receiptId);
    setUnallocated(updatedUnallocated);
  }

  return (
    <Container style={{ maxWidth: "80%", margin: "auto", padding: "20px" }}>
      <Row>
        <Col>
          <h2>Receive Payment</h2>
          <Form onSubmit={handlePaymentSubmit}>
            <Form.Group>
              <Form.Label>Amount</Form.Label>
              <Form.Control type="number" placeholder="Enter amount" name="amount" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Payment Link</Form.Label>
              <Form.Control type="text" placeholder="Enter payment link" name="paymentLink" />
            </Form.Group>
            <Button type="submit" variant="primary" className="btn-hover" style={{margin: "15px"}}>Submit</Button>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>Payment History</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Customer ID</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.customerId}>
                  <td>{payment.customerId}</td>
                  <td>{payment.amount}</td>
                  <td>{payment.status}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row style={{marginTop: "20px"}}>
        <Col>
          <h2>Unallocated Receipts</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Receipt ID</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {unallocated.map((receipt) => (
                <tr key={receipt.id}>
                  <td>{receipt.id}</td>
                  <td>{receipt.amount}</td>
                  <td>
                  <Button onClick={() => handleUpdateReceipt(receipt.id)} variant="primary" className="btn-hover" style={{marginTop: "10px"}}>Allocate</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default ReceivePayment;
