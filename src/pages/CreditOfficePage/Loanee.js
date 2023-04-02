import React, { useState, useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';

const endpoint = process.env.REACT_APP_API_URL;

const Loanee = () => {
const [data, setData] = useState([]);

useEffect(() => {
    const fetchData = async () => {
    const response = await fetch(`${endpoint}/clients`);
    const jsonData = await response.json();
    setData(jsonData);
    };
    fetchData();
}, []);

return (
    <Container>
    <h1>Loanee application details </h1>
    <Table striped bordered hover>
        <thead>
        <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Loan Amount</th>
            <th>Business history</th>
            <th>Business Location</th>
        </tr>
        </thead>
        <tbody>
        {data.map((item) => (
            <tr key={item.id}>
            <td>{item.fullName}</td>
            <td>{item.email}</td>
            <td>{item.phone}</td>
            <td>{item.age}</td>
            <td>{item.gender}</td>
            <td>{item.loanAmount}</td>
            <td>{item.businessHistory}</td>
            <td>{item.businessLocation}</td>
            </tr>
        ))}
        </tbody>
    </Table>
    </Container>
);
};

export default Loanee;










