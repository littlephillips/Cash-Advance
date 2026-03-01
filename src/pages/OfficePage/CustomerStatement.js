import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Table, Badge, Button } from 'react-bootstrap';
import {
    getLoans,
    getPayments,
    getUnallocatedPayments,
    allocatePayment
} from '../../services/firestoreService';

const INTEREST_RATE = 3;
const LOAN_TENURE = 2;
const PROCESSING_FEE = 300;
const LATE_PENALTY_RATE = 5; 

const CustomerStatement = () => {
    const [loans, setLoans] = useState([]);
    const [payments, setPayments] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState('');

    useEffect(() => {
        const fetchLoans = async () => {
            const data = await getLoans();
            setLoans(data);
        };

        const fetchPayments = async () => {
            const payments = await getPayments();
            setPayments(payments);
          };

        fetchLoans();
        fetchPayments();
    }, []);

    // Get unique customer names from disbursed loans
    const disbursedLoans = loans.filter((loan) => loan.loanDisbursed === 'Yes');
    const uniqueCustomers = [...new Set(disbursedLoans.map((loan) => loan.fullName))];

    // Get selected customer's loan
    const customerLoan = disbursedLoans.find(
        (loan) => loan.fullName === selectedCustomer
    );

    // Get selected customer's payments
    const customerPayments = payments.filter(
        (payment) => payment.fullName === selectedCustomer
    );

    // Calculations
    const principal = parseFloat(customerLoan?.loanAmount || 0);
    const totalInterest = (INTEREST_RATE / 100) * principal * LOAN_TENURE;
    const totalRepayable = principal + totalInterest;
    const totalPaid = customerPayments.reduce(
        (sum, p) => sum + parseFloat(p.amount || 0), 0
    );
    const outstandingBalance = totalRepayable - totalPaid;
    const latePenalty = outstandingBalance > 0
        ? (LATE_PENALTY_RATE / 100) * outstandingBalance
        : 0;

    // Status badge
    const getStatusBadge = () => {
        if (outstandingBalance <= 0) return <Badge bg="success">Fully Paid</Badge>;
        if (outstandingBalance < totalRepayable) return <Badge bg="warning">Partially Paid</Badge>;
        return <Badge bg="danger">Unpaid</Badge>;
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <Container className="my-4">
            <h2 className="mb-4">Customer Statement</h2>

            {/* Customer selector */}
            <Row className="mb-4">
                <Col md={4}>
                    <Form.Group>
                        <Form.Label>Select Customer</Form.Label>
                        <Form.Control
                            as="select"
                            value={selectedCustomer}
                            onChange={(e) => setSelectedCustomer(e.target.value)}
                        >
                            <option value="">-- Select a customer --</option>
                            {uniqueCustomers.map((name, index) => (
                                <option key={index} value={name}>{name}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                </Col>
            </Row>

            {/* Statement */}
            {customerLoan && (
                <>
                    {/* Header */}
                    <Row className="mb-3">
                        <Col>
                            <h4>{customerLoan.fullName}</h4>
                            <p className="text-muted mb-1">
                                Loan Status: {customerLoan.loanStatus} &nbsp;|&nbsp;
                                Payment Status: {getStatusBadge()}
                            </p>
                        </Col>
                        <Col xs="auto">
                            <Button variant="outline-secondary" onClick={handlePrint}>
                                🖨️ Print Statement
                            </Button>
                        </Col>
                    </Row>

                    {/* Loan Summary */}
                    <Row className="mb-4">
                        <Col>
                            <h6 className="text-uppercase text-muted mb-3">Loan Summary</h6>
                            <Table bordered size="sm">
                                <tbody>
                                    <tr>
                                        <td>Principal Amount</td>
                                        <td>KES {principal.toLocaleString()}</td>
                                    </tr>
                                    <tr>
                                        <td>Interest ({INTEREST_RATE}% × {LOAN_TENURE} months)</td>
                                        <td>KES {totalInterest.toLocaleString()}</td>
                                    </tr>
                                    <tr>
                                        <td>Processing Fee</td>
                                        <td>KES {PROCESSING_FEE.toLocaleString()}</td>
                                    </tr>
                                    <tr className="table-primary">
                                        <td><strong>Total Repayable</strong></td>
                                        <td><strong>KES {totalRepayable.toLocaleString()}</strong></td>
                                    </tr>
                                    <tr className="table-success">
                                        <td><strong>Total Paid</strong></td>
                                        <td><strong>KES {totalPaid.toLocaleString()}</strong></td>
                                    </tr>
                                    <tr className={outstandingBalance > 0 ? 'table-danger' : 'table-success'}>
                                        <td><strong>Outstanding Balance</strong></td>
                                        <td><strong>KES {outstandingBalance.toLocaleString()}</strong></td>
                                    </tr>
                                    {outstandingBalance > 0 && (
                                        <tr className="table-warning">
                                            <td>Late Payment Penalty ({LATE_PENALTY_RATE}% of outstanding)</td>
                                            <td>KES {latePenalty.toLocaleString()}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>

                    {/* Payment History */}
                    <Row>
                        <Col>
                            <h6 className="text-uppercase text-muted mb-3">Payment History</h6>
                            {customerPayments.length > 0 ? (
                                <Table striped bordered hover size="sm">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Amount Paid (KES)</th>
                                            <th>Payment Method</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {customerPayments.map((payment, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>KES {parseFloat(payment.amount).toLocaleString()}</td>
                                                <td>{payment.payment_means}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            ) : (
                                <p className="text-muted">No payments recorded for this customer yet.</p>
                            )}
                        </Col>
                    </Row>
                </>
            )}
        </Container>
    );
};

export default CustomerStatement;