import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import api from "../services/api";


function Register() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");


    const handleSubmit = async (e) => {

        e.preventDefault();
        setMessage("");

        if (password !== confirmPassword) {
            setMessage("Passwords do not match");
            return;
        }

        try {

            await api.post(
                "/auth/register",
                {
                    name: name,
                    email: email,
                    password: password,
                    confirmPassword: confirmPassword
                }
            );

            alert("Registration successful");
            navigate("/login");

        } catch (error) {

            setMessage(
                error.response?.data?.message ||
                "Registration failed"
            );
        }
    };


    return (
        <div className="min-h-screen bg-gray-100">

            <Navbar />

            <div className="max-w-md mx-auto px-6 py-10">

                <div className="bg-white rounded-lg shadow p-6">

                    <h1 className="text-2xl font-bold">
                        Register
                    </h1>

                    <form onSubmit={handleSubmit} className="mt-6">

                        <label>
                            Full Name
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="input-field"
                                required
                            />
                        </label>

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

                        <label>
                            Confirm Password
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
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
                            Register
                        </button>

                        <p className="text-sm mt-4">
                            Already have an account?{" "}
                            <Link to="/login" className="text-sky-600">
                                Login
                            </Link>
                        </p>

                    </form>
                </div>
            </div>
        </div>
    );
}


export default Register;
