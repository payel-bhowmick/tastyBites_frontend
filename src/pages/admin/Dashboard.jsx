import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../../components/Navbar";
import api from "../../services/api";


function Dashboard() {

    const [totalMenuItems, setTotalMenuItems] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalOrders, setTotalOrders] = useState(0);


    useEffect(() => {
        getDashboard();
    }, []);


    const getDashboard = async () => {

        try {

            const response = await api.get("/dashboard");
            const data = response.data.data;

            setTotalMenuItems(data.totalMenuItems);
            setTotalUsers(data.totalUsers);
            setTotalOrders(data.totalOrders);

        } catch (error) {
            console.log(error);
        }
    };


    return (
        <div className="min-h-screen bg-gray-100">

            <Navbar />

            <div className="max-w-6xl mx-auto px-6 py-10">

                <h1 className="text-3xl font-bold">
                    Admin Dashboard
                </h1>

                <div className="grid md:grid-cols-3 gap-6 mt-8">

                    <div className="bg-white shadow rounded-lg p-6">
                        <p className="text-gray-600">Total Menu Items</p>
                        <p className="text-3xl font-bold mt-2">{totalMenuItems}</p>
                    </div>

                    <div className="bg-white shadow rounded-lg p-6">
                        <p className="text-gray-600">Total Users</p>
                        <p className="text-3xl font-bold mt-2">{totalUsers}</p>
                    </div>

                    <div className="bg-white shadow rounded-lg p-6">
                        <p className="text-gray-600">Total Orders</p>
                        <p className="text-3xl font-bold mt-2">{totalOrders}</p>
                    </div>

                </div>


                <div className="mt-8 flex gap-4">

                    <Link
                        to="/admin/menu-items"
                        className="bg-sky-600 text-white px-4 py-2 rounded"
                    >
                        Manage Menu
                    </Link>

                    <Link
                        to="/admin/users"
                        className="bg-slate-800 text-white px-4 py-2 rounded"
                    >
                        Manage Users
                    </Link>

                </div>

            </div>
        </div>
    );
}


export default Dashboard;
