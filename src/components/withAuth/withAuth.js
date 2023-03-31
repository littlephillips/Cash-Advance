    import { useEffect } from "react";
    import { useNavigate } from "react-router-dom";
    import jwtDecode from "jwt-decode";

    function withAuth(Component, allowedUserType) {
    function Auth(props) {
        const navigate = useNavigate();

        useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        const decodedToken = jwtDecode(token);
        const userRole = decodedToken.user_type;

        if (userRole !== allowedUserType) {
            navigate("/unauthorized");
        }
        }, [navigate]);

        return <Component {...props} />;
    }

    return Auth;
    }

    export default withAuth;
