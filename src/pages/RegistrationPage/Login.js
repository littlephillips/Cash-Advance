import { Form, Button, Alert } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import withAuth from '../../components/withAuth/withAuth';

const endpoint = process.env.REACT_APP_API_URL;

function Login( {setIsAuthenticated}) {
const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: ''
});
const [showSuccess, setShowSuccess] = useState(false);
const [showError, setShowError] = useState(false);
const navigate = useNavigate();

const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
};

const handleSubmit = async (e) => {
    e.preventDefault();

    try {
    const response = await fetch(`${endpoint}/sessions`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });

    if (response.ok) {
        setShowSuccess(true);
        setShowError(false);
        setFormData({ email: '', password: '', userType: '' }); // resetting form input to empty

        const data = await response.json();
        const token = data.token;
        localStorage.setItem('token', token);
        setIsAuthenticated(true);
        

        const decodedToken = jwtDecode(token);
        const userRole = decodedToken.user_type;

        setTimeout(() => {
        setShowSuccess(false);

        // Navigate the user to the appropriate page based on their user type
        if (userRole === 'Supervisor') {
            navigate('/supervisor');
        } else if (userRole === 'Field Credit Officer') {
            navigate('/credit');
        } else if (userRole === 'Loan Applicant (Customer)') {
            navigate('/client');
        } else if (userRole === 'Office Staff' || userRole === 'Administration Staff') {
            navigate('/office');
        }
        }, 1000);
    } else {
        setShowSuccess(false);
        setShowError(true);
    }
    } catch (error) {
    console.error(error);
    setShowSuccess(false);
    setShowError(true);
    }
};

return (
    <div className="d-flex justify-content-center">
    <div className="col-lg-6">
        <h1>Cash Advance Login</h1>
        <hr />

        <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formEmail" style={{ marginBottom: '10px' }}>
            <Form.Label>Email</Form.Label>
            <Form.Control
            type="email"
            placeholder="Enter your email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            />
        </Form.Group>

        <Form.Group controlId="formUserType" style={{ marginBottom: '10px' }}>
            <Form.Label>User Type</Form.Label>
            <Form.Control
            as="select"
            name="userType"
            value={formData.userType}
            onChange={handleInputChange}
            >
            <option value="">Select User Type</option>
            <option value="Supervisor">Supervisor</option>
            <option value="Field Credit Officer">Field Credit Officer</option>
            <option value="Loan Applicant (Customer)">Loan Applicant (Customer)</option>
            <option value="Office Staff">Office Staff</option>
            <option value="Administration Staff">Administration Staff</option>
            </Form.Control>
        </Form.Group>

        <Form.Group controlId="formPassword" style={{ marginBottom: '10px' }}>
            <Form.Label>Password</Form.Label>
            <Form.Control
            type="password"
            placeholder="Enter your password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
            />
        </Form.Group>

        {showSuccess && (
            <Alert variant="success">
            Login successful...
            </Alert>
        )}

        {showError && (
            <Alert variant="danger">
            Incorrect email or password. Please try again.
            </Alert>
        )}

        <Button variant="primary" type="submit">
            Login
        </Button>
        </Form>
        <hr />
        <p>
        Don't have an account? <Link to="/signup">Signup</Link>
        </p>
    </div>
    </div>
    );
    }

    export default withAuth(Login);

