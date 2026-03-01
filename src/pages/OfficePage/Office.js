import React, { useState, useEffect } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import {  useNavigate } from 'react-router-dom';

import { useMediaQuery } from 'react-responsive';

import Dashboard from '../AdministrationPage/Dashboard';
import withAuth from '../../components/withAuth/withAuth';
import LoanDashboard from './LoanDashboard';
import CustomerStatement from './CustomerStatement';
import UnallocatedReceipts from './UnallocatedReceipts';
import { getLoans, updateLoan } from '../../services/firestoreService';

function Office({ isAuthenticated, onLogout}) {
  const [loanRequests, setLoanRequests] = useState([]);
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
        const data = await getLoans();
        setLoanRequests(data);
    };
    fetchData();
}, []);

  const handleDisburse = (id, loanDisbursed) => {
      updateLoan(id, { loanDisbursed });
  };

  const handleDisburseLoan = (id) => {
    handleDisburse(id, 'Yes');
  };

  const handleLogout = () => {
    onLogout();
    navigate('/')
  };

  return (
    <Container className="my-3" id="disburse">
      <h1 className="text-center">Loan Disbursement | Receipt Issuance</h1>
      <div className="d-flex justify-content-evenly mb-3 mt-5">
  {isAuthenticated && (
    <a href='#receipt' className="float-left mr-2">
      <Button variant="info" className="mb-3">
        Receipt
      </Button>
    </a>
  )}
  {isAuthenticated && (
    <Button variant="danger" className="mb-3" style={{marginRight: '10px'}} onClick={handleLogout}>
      Logout
    </Button>
  )}
</div>

<LoanDashboard/>
<CustomerStatement/>
<UnallocatedReceipts/>

<div className="table-responsive">
  <Table striped bordered hover>
    <thead>
      <tr>
        <th>ID</th>
        <th>Client Name</th>
        <th>Amount</th>
        <th>Interest rate</th>
        <th>Status</th>
        <th>Disbursed</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {loanRequests.map((request) => (
        <tr key={request.id}>
          <td>{request.id}</td>
          <td>{request.fullName}</td>
          <td>{request.loanAmount}</td>
          <td>{request.interestRate}</td>
          <td>{request.loanStatus}</td>
          <td>
            {request.loanDisbursed === "Yes" ? "Disbursed" : request.loanDisbursed}
          </td>
          <td>
            {request.loanStatus === "Approved" && (
              <>
                {request.loanDisbursed === "Yes" ? null : (
                  <Button
                    variant="info"
                    className="mr-3"
                    onClick={() => handleDisburseLoan(request.id)}
                  >
                    Disburse
                  </Button>
                )}
              </>
            )}
            {request.loanStatus === "Rejected" && (
              <Button variant="secondary" disabled>
                Rejected
              </Button>
            )}
            {request.loanStatus === "Pending" && (
              <Button variant="warning" disabled>
                Pending
              </Button>
            )} 
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
</div>



        {!isMobile && (
        <div className="d-flex justify-content-end mt-3">
        </div>
        )}
        <div className="mt-5" id="receipt">
          <hr/>
        <Dashboard/>
        {isAuthenticated && (
          <a href='#disburse'>
            <Button variant="info" className="mb-3 ml-2">
            🔝 Top
            </Button>
          </a>
        )}
        </div>
        </Container>
        );
        }

        export default withAuth(Office, 'Office Staff', 'Administration Staff');