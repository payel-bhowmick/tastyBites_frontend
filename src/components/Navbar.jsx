import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";


function Navbar() {

    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();


    const handleLogout = () => {
        logout();
        navigate("/");
    };


    return (
        <nav className="bg-slate-800 text-white px-6 py-4">

            <div className="max-w-6xl mx-auto flex justify-between items-center">

                <Link to="/" className="text-2xl font-bold">
                    TastyBites
                </Link>


                <div className="flex items-center gap-4">

                    <Link to="/">Home</Link>


                    {!user && (
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/register">Register</Link>
                            <Link to="/admin-login">Admin</Link>
                        </>
                    )}


                    {user && user.role === "User" && (
                        <>
                            <span>Hi, {user.name}</span>

                            <button
                                onClick={handleLogout}
                                className="bg-white text-slate-800 px-3 py-1 rounded"
                            >
                                Logout
                            </button>
                        </>
                    )}


                    {user && user.role === "Admin" && (
                        <>
                            <Link to="/admin/dashboard">Dashboard</Link>
                            <Link to="/admin/menu-items">Menu</Link>
                            <Link to="/admin/users">Users</Link>

                            <button
                                onClick={handleLogout}
                                className="bg-white text-slate-800 px-3 py-1 rounded"
                            >
                                Logout
                            </button>
                        </>
                    )}

                </div>
            </div>
        </nav>
    );
}


export default Navbar;
