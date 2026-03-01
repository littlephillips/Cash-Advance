import { Form, Button, Alert } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../../firebase';

function Signup() {
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        password: '',
        userType: ''
    });

    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
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
            // Create user in Firebase Auth
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                formData.email,
                formData.password
            );

            // Save user profile to Firestore users collection
            await addDoc(collection(db, 'users'), {
                fullname: formData.fullname,
                email: formData.email,
                userType: formData.userType,
                uid: userCredential.user.uid,
            });

            setShowSuccess(true);
            setShowError(false);
            setFormData({ fullname: '', email: '', password: '', userType: '' });

            setTimeout(() => {
                setShowSuccess(false);
                navigate('/login');
            }, 1500);

        } catch (error) {
            console.error(error);
            setShowError(true);
            setErrorMessage(
                error.code === 'auth/email-already-in-use'
                    ? 'This email is already registered. Please login.'
                    : 'Registration failed. Please try again.'
            );
        }
    };

    return (
        <div className="d-flex justify-content-center mt-5">
            <div className="col-lg-6">
                <h1>Cash Advance Signup</h1>
                <hr />

                {showSuccess && (
                    <Alert variant="success">
                        Registration successful! Redirecting to login...
                    </Alert>
                )}
                {showError && (
                    <Alert variant="danger">{errorMessage}</Alert>
                )}

                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formFullName" style={{ marginBottom: '10px' }}>
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your full name"
                            name="fullname"
                            value={formData.fullname}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formEmail" style={{ marginBottom: '10px' }}>
                        <Form.Label>Email Address</Form.Label>
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
                            <option value="Field Credit Officer">Field Credit Officer</option>
                            <option value="Supervisor">Supervisor</option>
                            <option value="Loan Applicant (Customer)">Loan Applicant (Customer)</option>
                            <option value="Office Staff">Office Staff</option>
                            <option value="Administration Staff">Administration Staff</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="formPassword" style={{ marginBottom: '10px' }}>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Minimum 6 characters"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="mt-2">
                        Sign Up
                    </Button>
                </Form>

                <div style={{ marginTop: '10px' }}>
                    Already have an account?{' '}
                    <Link to="/login">Login</Link>
                </div>
            </div>
        </div>
    );
}

export default Signup;