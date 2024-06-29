import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import { Fragment, Suspense } from "react";

const RequireAuth = ({ allowedRole }) => {
    const { getRole, getUser, getToken, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    // Function to verify JWT token against backend API
    const verifyToken = async () => {
        try {
            const response = await axios.get("/api/verifyToken", {
                headers: {
                    Authorization: `Bearer ${getToken()}` 
                }
            });
            return response.data.valid;
        } catch (error) {
            if (error.response?.status === 401) {
                logout();
                navigate('/login');
            }
            console.error("Error verifying token:", error);
            return false;
        }
    };

    // Check token validity before rendering protected content
    const isTokenValid = async () => {
        const tokenValid = await verifyToken();
        const userRole = getRole();
        return tokenValid && allowedRole?.includes(userRole);
    };

    return (
        <Fragment>
            {getUser() ? (
                <Suspense fallback={<div>Loading...</div>}>
                    {isTokenValid() ? (
                        <Outlet />
                    ) : (
                        <Navigate
                            to="/unauthorized"
                            state={{ from: location }}
                            replace
                        />
                    )}
                </Suspense>
            ) : (
                <Navigate to="/login" state={{ from: location }} replace />
            )}
        </Fragment>
    );
};

export default RequireAuth;