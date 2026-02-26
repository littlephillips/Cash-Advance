import React, { useState, useEffect } from 'react';
import { Container, Table, Badge, Button, Alert } from 'react-bootstrap';

const endpoint = process.env.REACT_APP_API_URL;

const UnallocatedReceipts = () => {
    const [unallocated, setUnallocated] = useState([]);
    const [loans, setLoans] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        fetchUnallocated();
        fetchLoans();
    }, []);

    const fetchUnallocated = async () => {
        const response = await fetch(`${endpoint}/payment?unallocated=true`);
        const data = await response.json();
        setUnallocated(data);
    };

    const fetchLoans = async () => {
        const response = await fetch(`${endpoint}/loans`);
        const data = await response.json();
        setLoans(data);
    };

    // Office staff can manually allocate a receipt to a customer
    const handleAllocate = async (paymentId, fullName) => {
        try {
            const response = await fetch(`${endpoint}/payment/${paymentId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ fullName, unallocated: false }),
            });

            if (response.ok) {
                setSuccessMessage(`Payment successfully allocated to ${fullName}`);
                fetchUnallocated(); // refresh the list
                setTimeout(() => setSuccessMessage(''), 3000);
            }
        } catch (error) {
            console.error(error);
        }
    };

    // Get customer names from loans for the allocation dropdown
    const customerNames = [...new Set(loans.map((loan) => loan.fullName))];

    return (
        <Container className="my-4">
            <h2 className="mb-2">Unallocated Receipts</h2>
            <p className="text-muted mb-4">
                Payments received that could not be matched to a customer.
            </p>

            {successMessage && (
                <Alert variant="success">{successMessage}</Alert>
            )}

            {unallocated.length === 0 ? (
                <Alert variant="info">No unallocated receipts at this time.</Alert>
            ) : (
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name Provided</th>
                            <th>Amount (KES)</th>
                            <th>Payment Method</th>
                            <th>Allocate To</th>
                        </tr>
                    </thead>
                    <tbody>
                        {unallocated.map((receipt, index) => (
                            <tr key={receipt.id}>
                                <td>{index + 1}</td>
                                <td>
                                    {receipt.fullName || 'Unknown'}{' '}
                                    <Badge bg="warning" text="dark">Unallocated</Badge>
                                </td>
                                <td>KES {parseFloat(receipt.amount).toLocaleString()}</td>
                                <td>{receipt.payment_means}</td>
                                <td>
                                    <select
                                        className="form-select form-select-sm"
                                        defaultValue=""
                                        onChange={(e) => {
                                            if (e.target.value) {
                                                handleAllocate(receipt.id, e.target.value);
                                            }
                                        }}
                                    >
                                        <option value="">-- Assign to customer --</option>
                                        {customerNames.map((name, i) => (
                                            <option key={i} value={name}>{name}</option>
                                        ))}
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </Container>
    );
};

export default UnallocatedReceipts;