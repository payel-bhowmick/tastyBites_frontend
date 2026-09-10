import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import MenuCard from "../components/MenuCard";

import api from "../services/api";


function Home() {

    const [menuItems, setMenuItems] = useState([]);
    const [search, setSearch] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        getMenuItems();
    }, []);


    const getMenuItems = async () => {

        try {

            const response = await api.get("/menu-items");

            setMenuItems(response.data.data);

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Failed to load menu items"
            );
        }

        setLoading(false);
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

                <h1 className="text-3xl font-bold text-slate-800">
                    TastyBites Menu
                </h1>

                <p className="text-gray-600 mt-2">
                    Browse our menu.
                </p>


                <input
                    type="text"
                    placeholder="Search menu..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="mt-6 w-full md:w-80 border rounded px-4 py-2"
                />


                {loading && (
                    <p className="mt-8">
                        Loading menu...
                    </p>
                )}


                {error && (
                    <p className="mt-8 text-red-600">
                        {error}
                    </p>
                )}


                {!loading && !error && (
                    <div className="grid md:grid-cols-3 gap-6 mt-8">

                        {filteredItems.map(function (item) {
                            return (
                                <MenuCard
                                    key={item._id}
                                    item={item}
                                />
                            );
                        })}

                    </div>
                )}

            </div>
        </div>
    );
}


export default Home;
