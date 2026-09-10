import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../../components/Navbar";
import api from "../../services/api";


function MenuItems() {

    const [menuItems, setMenuItems] = useState([]);
    const [search, setSearch] = useState("");


    useEffect(() => {
        getMenuItems();
    }, []);


    const getMenuItems = async () => {

        try {
            const response = await api.get("/menu-items");
            setMenuItems(response.data.data);
        } catch (error) {
            alert("Failed to load menu items");
        }
    };


    const deleteMenuItem = async (id) => {

        const answer = window.confirm(
            "Are you sure you want to delete this item?"
        );

        if (!answer) {
            return;
        }

        try {

            await api.delete("/menu-items/" + id);
            getMenuItems();

        } catch (error) {
            alert("Delete failed");
        }
    };


    const filteredItems = menuItems.filter(function (item) {

        return item.name
            .toLowerCase()
            .includes(search.toLowerCase());
    });


    return (
        <div className="min-h-screen bg-gray-100">

            <Navbar />

            <div className="max-w-6xl mx-auto px-6 py-10">

                <div className="flex justify-between items-center">

                    <h1 className="text-3xl font-bold">
                        Manage Menu Items
                    </h1>

                    <Link
                        to="/admin/menu-items/add"
                        className="bg-sky-600 text-white px-4 py-2 rounded"
                    >
                        Add Menu Item
                    </Link>

                </div>


                <input
                    type="text"
                    placeholder="Search menu..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="mt-6 w-full border rounded px-4 py-2"
                />


                <div className="bg-white shadow rounded-lg mt-6 overflow-x-auto">

                    <table className="w-full">

                        <thead className="bg-gray-200">
                            <tr>
                                <th className="p-3 text-left">Name</th>
                                <th className="p-3 text-left">Category</th>
                                <th className="p-3 text-left">Price</th>
                                <th className="p-3 text-left">Availability</th>
                                <th className="p-3 text-left">Actions</th>
                            </tr>
                        </thead>


                        <tbody>

                            {filteredItems.map(function (item) {

                                return (
                                    <tr key={item._id} className="border-t">

                                        <td className="p-3">
                                            {item.name}
                                        </td>

                                        <td className="p-3">
                                            {item.category}
                                        </td>

                                        <td className="p-3">
                                            ₹{item.price}
                                        </td>

                                        <td className="p-3">
                                            {item.availability
                                                ? "In Stock"
                                                : "Out of Stock"}
                                        </td>

                                        <td className="p-3">

                                            <Link
                                                to={`/admin/menu-items/edit/${item._id}`}
                                                className="bg-slate-700 text-white px-3 py-1 rounded mr-2"
                                            >
                                                Edit
                                            </Link>

                                            <button
                                                onClick={() => deleteMenuItem(item._id)}
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


                    {filteredItems.length === 0 && (
                        <p className="p-6 text-center text-gray-500">
                            No menu items found.
                        </p>
                    )}

                </div>

            </div>
        </div>
    );
}


export default MenuItems;
