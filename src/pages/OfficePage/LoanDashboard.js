import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const endpoint = process.env.REACT_APP_API_URL;

const LoanDashboard = () => {
    const [loans, setLoans] = useState([]);
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        const fetchLoans = async () => {
            const response = await fetch(`${endpoint}/loans`);
            const data = await response.json();
            setLoans(data);
        };

        const fetchPayments = async () => {
            const response = await fetch(`${endpoint}/payment`);
            const data = await response.json();
            setPayments(data);
        };

        fetchLoans();
        fetchPayments();
    }, []);

    // --- Calculations ---
    const totalDisbursed = loans.filter(
        (loan) => loan.loanDisbursed === 'Yes'
    ).length;

    const totalAmountDisbursed = loans
        .filter((loan) => loan.loanDisbursed === 'Yes')
        .reduce((sum, loan) => sum + parseFloat(loan.loanAmount || 0), 0);

    const totalAmountPaid = payments
        .reduce((sum, payment) => sum + parseFloat(payment.amount || 0), 0);

    const totalActiveCustomers = loans.filter(
        (loan) => loan.loanStatus === 'Approved' && loan.loanDisbursed === 'Yes'
    ).length;

    // A loan is defaulted if disbursed but outstanding balance > 0
    // For now we flag disbursed loans with no matching payment as defaulted
    const paidCustomerNames = payments.map((p) => p.fullName);
    const totalDefaulted = loans.filter(
        (loan) =>
            loan.loanDisbursed === 'Yes' &&
            !paidCustomerNames.includes(loan.fullName)
    ).length;

    // --- Metric card config ---
    const metrics = [
        {
            title: 'Total Loans Disbursed',
            value: totalDisbursed,
            sub: `KES ${totalAmountDisbursed.toLocaleString()} total value`,
            color: '#0d6efd',
            icon: '🏦',
        },
        {
            title: 'Total Amount Paid',
            value: `KES ${totalAmountPaid.toLocaleString()}`,
            sub: `Across ${payments.length} payment(s)`,
            color: '#198754',
            icon: '💰',
        },
        {
            title: 'Total Active Customers',
            value: totalActiveCustomers,
            sub: 'Disbursed & approved loans',
            color: '#0dcaf0',
            icon: '👥',
        },
        {
            title: 'Total Defaulted Loans',
            value: totalDefaulted,
            sub: 'Disbursed with no payment',
            color: '#dc3545',
            icon: '⚠️',
        },
    ];

    return (
        <Container className="my-4">
            <h2 className="mb-4">Dashboard Overview</h2>
            <Row>
                {metrics.map((metric, index) => (
                    <Col key={index} xs={12} sm={6} lg={3} className="mb-4">
                        <Card
                            className="h-100 shadow-sm text-white"
                            style={{ backgroundColor: metric.color, borderRadius: '12px' }}
                        >
                            <Card.Body>
                                <div style={{ fontSize: '2rem' }}>{metric.icon}</div>
                                <Card.Title className="mt-2" style={{ fontSize: '0.95rem' }}>
                                    {metric.title}
                                </Card.Title>
                                <div style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>
                                    {metric.value}
                                </div>
                                <Card.Text style={{ fontSize: '0.8rem', opacity: 0.85 }}>
                                    {metric.sub}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default LoanDashboard;