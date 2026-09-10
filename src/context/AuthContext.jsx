import { createContext, useState } from "react";

import api from "../services/api";


export const AuthContext = createContext();


function AuthContextProvider({ children }) {

    const savedUser = localStorage.getItem("user");


    const [user, setUser] = useState(
        savedUser ? JSON.parse(savedUser) : null
    );


    // Login
    const login = async (email, password) => {

        const response = await api.post(
            "/auth/login",
            {
                email: email,
                password: password
            }
        );


        const token = response.data.token;
        const loggedInUser = response.data.user;


        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(loggedInUser));


        setUser(loggedInUser);


        return loggedInUser;
    };


    // Logout
    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setUser(null);
    };


    return (
        <AuthContext.Provider
            value={{
                user: user,
                login: login,
                logout: logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}


export default AuthContextProvider;
