import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";

const endpoint = process.env.REACT_APP_API_URL;

const LoanTable = () => {
const [loans, setLoans] = useState([]);

const isSmallScreen = useMediaQuery({ maxWidth: 768 });

useEffect(() => {
const fetchData = async () => {
const response = await fetch(`${endpoint}/loans`);
const data = await response.json();
setLoans(data);
};
fetchData();
}, []);

return (
<>
<hr />
<h1 className="text-center mt-4 mb-3" > Available Loans</h1>
<Table striped bordered hover responsive={isSmallScreen}>
<thead>
<tr>
<th>Full Name</th>
<th>Loan Amount</th>
<th>Interest Rate</th>
<th>Loan Tenure</th>
<th>Loan Status</th>
<th>Loan Disbursed</th>
</tr>
</thead>
<tbody>
{loans.map((loan, index) => (
<tr key={index}>
<td>{loan.fullName}</td>
<td>{loan.loanAmount}</td>
<td>{loan.interestRate}</td>
<td>{loan.loanTenure}</td>
<td>
<Button
variant={
loan.loanStatus === "Approved"
? "info"
: loan.loanStatus === "Pending"
? "warning"
: "danger"
}
>
{loan.loanStatus}
</Button>
</td>
<td>
<Button
variant={
loan.loanDisbursed === "Yes"
? "info"
: loan.loanDisbursed === "N/A"
? "warning"
: "danger"
}
>
{loan.loanDisbursed}
</Button>
</td>
</tr>
))}
</tbody>
</Table>
</>
);
};

export default LoanTable;