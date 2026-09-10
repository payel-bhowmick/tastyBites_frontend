import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import MenuDetails from "./pages/MenuDetails";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AdminLogin from "./pages/AdminLogin";

import Dashboard from "./pages/admin/Dashboard";
import MenuItems from "./pages/admin/MenuItems";
import AddMenuItem from "./pages/admin/AddMenuItem";
import EditMenuItem from "./pages/admin/EditMenuItem";
import Users from "./pages/admin/Users";

import ProtectedRoute from "./components/ProtectedRoute";


function App() {

    return (
        <Routes>

            {/* Public pages */}

            <Route path="/" element={<Home />} />
            <Route path="/menu/:id" element={<MenuDetails />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin-login" element={<AdminLogin />} />


            {/* Admin pages */}

            <Route
                path="/admin/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/admin/menu-items"
                element={
                    <ProtectedRoute>
                        <MenuItems />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/admin/menu-items/add"
                element={
                    <ProtectedRoute>
                        <AddMenuItem />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/admin/menu-items/edit/:id"
                element={
                    <ProtectedRoute>
                        <EditMenuItem />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/admin/users"
                element={
                    <ProtectedRoute>
                        <Users />
                    </ProtectedRoute>
                }
            />

        </Routes>
    );
}


export default App;
