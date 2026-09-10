import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";


function AdminLogin() {

    const { login, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");


    const handleSubmit = async (e) => {

        e.preventDefault();
        setMessage("");

        try {

            const user = await login(email, password);

            if (user.role !== "Admin") {
                logout();
                setMessage("This account is not an Admin account");
                return;
            }

            navigate("/admin/dashboard");

        } catch (error) {

            setMessage(
                error.response?.data?.message ||
                "Admin login failed"
            );
        }
    };


    return (
        <div className="min-h-screen bg-gray-100">

            <Navbar />

            <div className="max-w-md mx-auto px-6 py-10">

                <div className="bg-white rounded-lg shadow p-6">

                    <h1 className="text-2xl font-bold">
                        Admin Login
                    </h1>

                    <p className="text-gray-600 mt-2">
                        Login to manage menu items and users.
                    </p>

                    <form onSubmit={handleSubmit} className="mt-6">

                        <label>
                            Email
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="input-field"
                                required
                            />
                        </label>

                        <label>
                            Password
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="input-field"
                                required
                            />
                        </label>

                        {message && (
                            <p className="text-red-600 mb-4">
                                {message}
                            </p>
                        )}

                        <button className="w-full bg-slate-800 text-white py-2 rounded">
                            Admin Login
                        </button>

                    </form>
                </div>
            </div>
        </div>
    );
}


export default AdminLogin;
