import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function withAuth(Component, ...allowedUserTypes) {
    function Auth(props) {
        const navigate = useNavigate();

        useEffect(() => {
            const userRole = localStorage.getItem('userRole');

            if (!userRole) {
                navigate("/login");
                return;
            }

            if (!allowedUserTypes.includes(userRole)) {
                navigate("/unauthorized");
            }
        }, [navigate]);

        return <Component {...props} />;
    }

    return Auth;
}

export default withAuth;