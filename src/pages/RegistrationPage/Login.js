import { Form, Button, Alert } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { getDocs, collection, query, where } from 'firebase/firestore';
import { auth, db } from '../../firebase';

function Login({ setIsAuthenticated }) {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        userType: ''
    });
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Sign in with Firebase Auth
            const userCredential = await signInWithEmailAndPassword(
                auth,
                formData.email,
                formData.password
            );

            const user = userCredential.user;

            // Get user role from Firestore users collection
            const q = query(
                collection(db, 'users'),
                where('email', '==', formData.email)
            );
            const snapshot = await getDocs(q);

            if (snapshot.empty) {
                setErrorMessage('User profile not found. Please sign up again.');
                setShowError(true);
                return;
            }

            const userData = snapshot.docs[0].data();
            const userRole = userData.userType;

            // Store role in localStorage for withAuth
            localStorage.setItem('userRole', userRole);
            localStorage.setItem('userEmail', formData.email);
            setIsAuthenticated(true);

            setShowSuccess(true);
            setFormData({ email: '', password: '', userType: '' });

            // Role-to-route mapping
            const roleRoutes = {
                'Supervisor': '/supervisor',
                'Field Credit Officer': '/credit',
                'Loan Applicant (Customer)': '/client',
                'Office Staff': '/office',
                'Administration Staff': '/office',
            };

            setTimeout(() => {
                setShowSuccess(false);
                const route = roleRoutes[userRole];
                if (route) {
                    navigate(route);
                } else {
                    setErrorMessage('Unknown user role. Please contact support.');
                    setShowError(true);
                }
            }, 1000);

        } catch (error) {
            console.error(error);
            setShowError(true);
            setErrorMessage('Login failed. Check your email and password.');
        }
    };

    return (
        <div className="d-flex justify-content-center mt-5">
            <div className="col-lg-6">
                <h1>Cash Advance Login</h1>
                <hr />
                {showSuccess && <Alert variant="success">Login successful!</Alert>}
                {showError && <Alert variant="danger">{errorMessage}</Alert>}

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

                    <Button type="submit" className="mt-2">Login</Button>
                </Form>
                <div style={{ marginTop: '10px' }}>
                    Don't have an account?{' '}
                    <Link to="/signup">Sign Up</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;