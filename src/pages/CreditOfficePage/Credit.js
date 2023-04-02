    import React, {useState } from 'react';
    import { Button, NavLink, Nav, Navbar, Container, Row, Col } from 'react-bootstrap';
    import { useNavigate } from 'react-router-dom';
    import { useMediaQuery } from 'react-responsive';
    
    // pages
    import CreateLoanForm from './CreateLoanForm';
    import CollectLoanForm from './CollectLoanForm';
    import Loanee from './Loanee';

    import withAuth from '../../components/withAuth/withAuth';

    function Credit({ isAuthenticated, onLogout}) {
    const [formType, setFormType] = useState('');
    const navigate = useNavigate();


    const handleLinkClick = (type) => {
        setFormType(type);
    };

    const handleLogoutClick = () => {
        onLogout();
        navigate('/');
    };

    const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

    const showForm = formType !== null;

    return (
        <Container style={{ marginTop: '20px' }}>
        {isAuthenticated && (
            <Row>
            <Col>
                <h1>Welcome to the Credit Portal!</h1>
            </Col>
            </Row>
        )}

        <Navbar bg="light" expand="lg" className="justify-content-between">
            <Container fluid>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className={isMobile ? 'flex-column' : 'me-auto'}>
                <NavLink
                    exact
                    to="/loanee"
                    activeClassName="active"
                    className="nav-link"
                    onClick={() => handleLinkClick('loanee')}
                >
                    Loanee details
                </NavLink>
                <NavLink
                    exact
                    to="/createLoan"
                    activeClassName="active"
                    className="nav-link"
                    onClick={() => handleLinkClick('createLoan')}
                >
                    Create Loan
                </NavLink>
                <NavLink
                    exact
                    to="/collectData"
                    activeClassName="active"
                    className="nav-link"
                    onClick={() => handleLinkClick('collectData')}
                >
                    Collect Data
                </NavLink>
                </Nav>
            </Navbar.Collapse>
            {isAuthenticated && (
            <Button variant="danger" className="float-end ms-auto" onClick={handleLogoutClick}>
            Logout
            </Button>
        )} 
            </Container>
        </Navbar>

        <Row>
            <Col className="mt-4">
            {showForm && (
                <div>
                {formType === 'loanee' ? (
                    <Loanee />
                ) : (
                    <div>
                    <h2>{formType === 'createLoan' ? 'Create Loan' : 'Collect Data'}</h2>
                    {formType === 'createLoan' ? <CreateLoanForm /> : <CollectLoanForm />}
                    </div>
                )}
                </div>
            )}
            </Col>
        </Row>
        </Container>
    );
    }


    // Credit.allowedUserType = 'Field Credit Officer';
    export default withAuth(Credit, 'Field Credit Officer');

