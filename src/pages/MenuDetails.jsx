import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import api from "../services/api";


function MenuDetails() {

    const { id } = useParams();

    const [item, setItem] = useState(null);
    const [error, setError] = useState("");


    useEffect(() => {
        getMenuItem();
    }, [id]);


    const getMenuItem = async () => {

        try {

            const response = await api.get(
                "/menu-items/" + id
            );

            setItem(response.data.data);

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Menu item not found"
            );
        }
    };


    return (
        <div className="min-h-screen bg-gray-100">

            <Navbar />


            <div className="max-w-4xl mx-auto px-6 py-10">

                {error && (
                    <p className="text-red-600">
                        {error}
                    </p>
                )}


                {!item && !error && (
                    <p>Loading...</p>
                )}


                {item && (
                    <div className="bg-white rounded-lg shadow overflow-hidden">

                        {item.image && (
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-80 object-cover"
                            />
                        )}


                        <div className="p-6">

                            <p className="text-sky-600">
                                {item.category}
                            </p>

                            <h1 className="text-3xl font-bold mt-2">
                                {item.name}
                            </h1>

                            <p className="text-gray-600 mt-4">
                                {item.description}
                            </p>

                            <p className="text-sky-600 font-bold text-xl mt-4">
                                ₹{item.price}
                            </p>

                            <p className="mt-3">
                                {item.availability
                                    ? "In Stock"
                                    : "Out of Stock"}
                            </p>

                            <Link
                                to="/"
                                className="inline-block mt-6 bg-slate-800 text-white px-4 py-2 rounded"
                            >
                                Back
                            </Link>

                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}


export default MenuDetails;
