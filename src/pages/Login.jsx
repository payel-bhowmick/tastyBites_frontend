import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";


function Login() {

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");


    const handleSubmit = async (e) => {

        e.preventDefault();
        setMessage("");

        try {

            const user = await login(email, password);

            if (user.role === "Admin") {
                navigate("/admin/dashboard");
            } else {
                navigate("/");
            }

        } catch (error) {

            setMessage(
                error.response?.data?.message ||
                "Login failed"
            );
        }
    };


    return (
        <div className="min-h-screen bg-gray-100">

            <Navbar />

            <div className="max-w-md mx-auto px-6 py-10">

                <div className="bg-white rounded-lg shadow p-6">

                    <h1 className="text-2xl font-bold">
                        User Login
                    </h1>

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

                        <button className="w-full bg-sky-600 text-white py-2 rounded">
                            Login
                        </button>

                        <p className="text-sm mt-4">
                            Don't have an account?{" "}
                            <Link to="/register" className="text-sky-600">
                                Register
                            </Link>
                        </p>

                    </form>
                </div>
            </div>
        </div>
    );
}


export default Login;
