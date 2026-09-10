import { useEffect, useState } from "react";

import Navbar from "../../components/Navbar";
import api from "../../services/api";


function Users() {

    const [users, setUsers] = useState([]);


    useEffect(() => {
        getUsers();
    }, []);


    const getUsers = async () => {

        try {

            const response = await api.get("/users");
            setUsers(response.data.data);

        } catch (error) {
            alert("Failed to load users");
        }
    };


    const deleteUser = async (id) => {

        const answer = window.confirm(
            "Are you sure you want to delete this user?"
        );

        if (!answer) {
            return;
        }

        try {

            await api.delete("/users/" + id);
            getUsers();

        } catch (error) {
            alert("Delete failed");
        }
    };


    return (
        <div className="min-h-screen bg-gray-100">

            <Navbar />

            <div className="max-w-6xl mx-auto px-6 py-10">

                <h1 className="text-3xl font-bold">
                    Users
                </h1>


                <div className="bg-white shadow rounded-lg mt-6 overflow-x-auto">

                    <table className="w-full">

                        <thead className="bg-gray-200">
                            <tr>
                                <th className="p-3 text-left">Name</th>
                                <th className="p-3 text-left">Email</th>
                                <th className="p-3 text-left">Role</th>
                                <th className="p-3 text-left">Registration Date</th>
                                <th className="p-3 text-left">Action</th>
                            </tr>
                        </thead>


                        <tbody>

                            {users.map(function (user) {

                                return (
                                    <tr key={user._id} className="border-t">

                                        <td className="p-3">
                                            {user.name}
                                        </td>

                                        <td className="p-3">
                                            {user.email}
                                        </td>

                                        <td className="p-3">
                                            {user.role}
                                        </td>

                                        <td className="p-3">
                                            {user.createdAt
                                                ? new Date(user.createdAt).toLocaleDateString()
                                                : ""}
                                        </td>

                                        <td className="p-3">
                                            <button
                                                onClick={() => deleteUser(user._id)}
                                                className="bg-red-600 text-white px-3 py-1 rounded"
                                            >
                                                Delete
                                            </button>
                                        </td>

                                    </tr>
                                );
                            })}

                        </tbody>
                    </table>

                </div>

            </div>
        </div>
    );
}


export default Users;
