import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Container, Table, Button } from "react-bootstrap";

import withAuth from "../../components/withAuth/withAuth";

const endpoint = process.env.REACT_APP_API_URL;

const Supervisor = ({ isAuthenticated, onLogout }) => {
  const [loanRequests, setLoanRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${endpoint}/loans`)
      .then(response => response.json())
      .then(data => setLoanRequests(data))
      .catch(error => console.error(error));
  }, []);

  const updateLoanStatus = (id, loanStatus) => {
    fetch(`${endpoint}/loans/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ loan: { loanStatus } })
    })
      .then(response => response.json())
      .then(data => {
        const updatedRequests = loanRequests.map(request => {
          if (request.id === id) {
            return { ...request, loanStatus };
          }
          return request;
        });
        setLoanRequests(updatedRequests);
      })
      .catch(error => console.error(error));
  };

  const handleApproveLoan = (id) => {
    updateLoanStatus(id, 'Approved');
  };

  const handleRejectLoan = (id) => {
    updateLoanStatus(id, 'Rejected');
  };

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <>
      <Container className="p-3">
        <h1 className="mb-3">Loan Requests</h1>
        {isAuthenticated && (
          <Button variant="danger" className="mb-3 float-end" onClick={handleLogout}>
            Logout
          </Button>

        )}
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Client Name</th>
              <th>Loan Amount</th>
              <th>Interest Rate</th>
              <th>Loan Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loanRequests.map((request, index) => (
              <tr key={request.id}>
                <td>{index += 1}</td>
                <td>{request.fullName}</td>
                <td>{request.loanAmount}</td>
                <td>{request.interestRate}%</td>
                <td>{request.loanStatus}</td>
                <td>
                  {request.loanStatus === "Pending" && (
                    <>
                    <Button
                    variant="success"
                    className="mr-3 "
                    onClick={() => handleApproveLoan(request.id)}
                  >
                    Approve
                  </Button>
                  <Button
                    style={{ marginLeft: "10px" }}
                    variant="danger"
                    onClick={() => handleRejectLoan(request.id)}
                  >
                    Reject
                  </Button>
                    </>
                  )}
                    {request.loanStatus === "Approved" && (
                    <Button variant="info" disabled>
                      Approved
                    </Button>
                  )}
                  {request.loanStatus === "Rejected" && (
                    <Button variant="danger" disabled>
                      Rejected
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
};
export default withAuth(Supervisor, 'Supervisor');


