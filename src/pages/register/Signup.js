import { Form, Button, Alert } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Signup() {
const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
    userType: ''
});

const [showSuccess, setShowSuccess] = useState(false);
const [showError, setShowError] = useState(false);

const navigate = useNavigate();

const handleInputChange = (e) => {
    setFormData((prevFormData) => ({
    ...prevFormData,
    [e.target.name]: e.target.value
    }));
};

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    const response = await fetch('http://127.0.0.1:3000/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: formData }),
    });

    if (response.ok) {
        setShowSuccess(true);
        setShowError(false);
        setFormData({ fullname: '', email: '', password: '', userType: '' }); // resetting form input to empty
        setTimeout(() => {
        setShowSuccess(false);
        navigate('/login'); 
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
        <h1>Cash Advance Signup</h1>
        <hr />

        <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formFullName" style={{ marginBottom: '10px' }}>
            <Form.Label>Full name</Form.Label>
            <Form.Control
            type="text"
            placeholder="Enter your Full name"
            name="fullname"
            value={formData.fullname}
            onChange={handleInputChange}
            required
            />
        </Form.Group>

        <Form.Group controlId="formEmail" style={{ marginBottom: '10px' }}>
            <Form.Label>Email address</Form.Label>
            <Form.Control
            type="email"
            placeholder="Enter email"
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
            required
            >
        <option value="">Select User Type</option>
        <option value="fieldCreditOfficer">Field Credit Officer</option>
        <option value="supervisor">Supervisor</option>
        <option value="loanApplicant">Loan Applicant (Customer)</option>
        <option value="officeStaff">Office Staff</option>
        <option value="adminStaff">Administration Staff</option>
        </Form.Control>
    </Form.Group>

    <Form.Group controlId="formPassword" style={{ marginBottom: '10px' }}>
        <Form.Label>Password</Form.Label>
        <Form.Control
        type="password"
        placeholder="Password"
        name="password"
        value={formData.password}
        onChange={handleInputChange}
        required
        />
    </Form.Group>

    <Button variant="primary" type="submit">
        Sign Up
    </Button>
    </Form>

    {showSuccess && (
    <Alert variant="success" style={{ marginTop: '10px' }}>
        Registration successful!
    </Alert>
    )}

    {showError && (
    <Alert variant="danger" style={{ marginTop: '10px' }}>
        Registration failed. Please try again later.
    </Alert>
    )}
    <div style={{ marginTop: '10px' }}>
        Already have an account?{' '}
        <Link to="/" style={{ marginRight: '22px' }}>Login</Link>
    </div>


</div>

</div>
);
}

export default Signup;
