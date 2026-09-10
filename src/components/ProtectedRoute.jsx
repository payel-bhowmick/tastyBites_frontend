import { useContext } from "react";
import { Navigate } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";


function ProtectedRoute({ children }) {

    const { user } = useContext(AuthContext);


    if (!user) {
        return <Navigate to="/admin-login" />;
    }


    if (user.role !== "Admin") {
        return <Navigate to="/" />;
    }


    return children;
}


export default ProtectedRoute;
