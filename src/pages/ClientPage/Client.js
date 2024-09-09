import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Card, Modal } from 'react-bootstrap';
import withAuth from '../../components/withAuth/withAuth';
import LoanForm from '../ClientPage/LoanForm';
import PaymentForm from '../ClientPage/PaymentForm'; 

const Client = ({ isAuthenticated, onLogout }) => {
  const navigate = useNavigate();
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [showRepayModal, setShowRepayModal] = useState(false);

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  const handleCloseApply = () => setShowApplyModal(false);
  const handleShowApply = () => setShowApplyModal(true);

  const handleCloseRepay = () => setShowRepayModal(false);
  const handleShowRepay = () => setShowRepayModal(true);

  return (
    <Container className="mt-4">
      <Row className="justify-content-end mb-3">
        {isAuthenticated && (
          <Col xs="auto">
            <Button variant="danger" onClick={handleLogout}>
              Logout
            </Button>
          </Col>
        )}
      </Row>

      <Row className="mt-5">
        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Apply for a Loan</Card.Title>
              <Card.Text>
                Fill out the application form to apply for a loan.
              </Card.Text>
              <Button variant="primary" onClick={handleShowApply}>
                Go to Application
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Repay a Loan</Card.Title>
              <Card.Text>
                Click below to proceed with your loan repayment.
              </Card.Text>
              <Button variant="secondary" onClick={handleShowRepay}>
                Go to Repayment
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Apply Loan Modal */}
      <Modal show={showApplyModal} onHide={handleCloseApply} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Loan Application</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LoanForm onSuccess={handleCloseApply} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseApply}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>


      {/* Repay Loan Modal */}
      <Modal show={showRepayModal} onHide={handleCloseRepay}>
        <Modal.Header closeButton>
          <Modal.Title>Loan Repayment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PaymentForm onSuccess={handleCloseRepay} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseRepay}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default withAuth(Client, 'Loan Applicant (Customer)');
