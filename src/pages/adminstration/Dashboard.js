
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';

const Dashboard = () => {
const [customers, setCustomers] = useState([]);
const [selectedCustomer, setSelectedCustomer] = useState(null);
const [customerReceipts, setCustomerReceipts] = useState([]);
const [unallocatedReceipts, setUnallocatedReceipts] = useState([]);

useEffect(() => {
    const fetchData = async () => {
    const response = await fetch('http://127.0.0.1:3000/payment');
    const jsonData = await response.json();
    setCustomers(jsonData);
    };
    fetchData();
}, []);

// create a receipt if user is selected
const handleSelectCustomer = (customer) => {
    setSelectedCustomer(customer);

    // create a new receipt
    const newReceipt = {
    customerId: customer.id,
    payment: customer.payment_means,
    amount: customer.amount,
    };

    // check if the customer already has a receipt
    const existingReceiptIndex = customerReceipts.findIndex(
    (receipt) => receipt.customerId === customer.id
    );

    if (existingReceiptIndex !== -1) {
    // update the existing receipt
    const updatedReceipts = [...customerReceipts];
    updatedReceipts[existingReceiptIndex] = newReceipt;
    setCustomerReceipts(updatedReceipts);
    } else {
    // add receipt to the customerReceipts array
    const updatedReceipts = [...customerReceipts, newReceipt];
    setCustomerReceipts(updatedReceipts);
    }
};

// handle click event on receipt button
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
            {customers &&
                customers.map((customer) => (
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
            <h3>Unallocated Receipts</h3>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Payment</th>
                    <th>Amount</th>
                </tr>
                </thead>
                <tbody>
                {unallocatedReceipts.length > 0 ? (
                    unallocatedReceipts.map((receipt, index) => (
                    <tr key={index}>
                        <td>{receipt.payment}</td>
                        <td>{receipt.amount}</td>
                    </tr>
                    ))
                ) : (
                    <tr>
                    <td colSpan="2">No unallocated receipts found</td>
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