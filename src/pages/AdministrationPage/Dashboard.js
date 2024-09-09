import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';

const endpoint = process.env.REACT_APP_API_URL;

const Dashboard = () => {
    const [customers, setCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [customerReceipts, setCustomerReceipts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`${endpoint}/payment`);
            const jsonData = await response.json();
            setCustomers(jsonData);
        };
        fetchData();
    }, []);

    // Create a receipt if user is selected
    const handleSelectCustomer = (customer) => {
        setSelectedCustomer(customer);

        // Create a new receipt
        const newReceipt = {
            customerId: customer.id,
            payment: customer.payment_means,
            amount: customer.amount,
        };

        // Check if the customer already has a receipt
        const existingReceiptIndex = customerReceipts.findIndex(
            (receipt) => receipt.customerId === customer.id
        );

        if (existingReceiptIndex !== -1) {
            // Update the existing receipt
            const updatedReceipts = [...customerReceipts];
            updatedReceipts[existingReceiptIndex] = newReceipt;
            setCustomerReceipts(updatedReceipts);
        } else {
            // Add receipt to the customerReceipts array
            setCustomerReceipts((prevReceipts) => [...prevReceipts, newReceipt]);
        }
    };

    const handleReceiptClick = () => {
        alert('Receipt created');
    };

    return (
        <Container>
            <Row>
                <Col>
                    <h1>Receipt Issuance</h1>
                    <h3 className='mt-5'>Loan Payments</h3>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Amount (ksh)</th>
                                <th>Payment means</th>
                                <th>Create receipt</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers.map((customer) => (
                                <tr key={customer.id}>
                                    <td>{customer.fullName}</td>
                                    <td>{customer.amount}</td>
                                    <td>{customer.payment_means}</td>
                                    <td>
                                        <Form.Check
                                            type="radio"
                                            name="customer"
                                            value={customer.id}
                                            onChange={() => handleSelectCustomer(customer)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>

                <Col>
                    {selectedCustomer && (
                        <>
                            <h3>{selectedCustomer.fullName}, Receipt</h3>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Payment</th>
                                        <th>Amount</th>
                                        <th>Receipt State</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {customerReceipts.length > 0 ? (
                                        customerReceipts.map((receipt, index) => (
                                            <tr key={index}>
                                                <td>{receipt.payment}</td>
                                                <td>{receipt.amount}</td>
                                                <td>
                                                    <Button onClick={handleReceiptClick}>
                                                        Receipt Created
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="3">No receipts found for this customer</td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                        </>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default Dashboard;
