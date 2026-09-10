import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Navbar from "../../components/Navbar";
import api from "../../services/api";


function EditMenuItem() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("Starter");
    const [price, setPrice] = useState("");
    const [availability, setAvailability] = useState(true);
    const [image, setImage] = useState(null);
    const [oldImage, setOldImage] = useState("");
    const [message, setMessage] = useState("");


    useEffect(() => {
        getMenuItem();
    }, [id]);


    const getMenuItem = async () => {

        try {

            const response = await api.get(
                "/menu-items/" + id
            );

            const item = response.data.data;

            setName(item.name);
            setDescription(item.description);
            setCategory(item.category);
            setPrice(item.price);
            setAvailability(item.availability);
            setOldImage(item.image || "");

        } catch (error) {

            setMessage(
                error.response?.data?.message ||
                "Failed to load menu item"
            );
        }
    };


    const handleSubmit = async (e) => {

        e.preventDefault();
        setMessage("");

        const formData = new FormData();

        formData.append("name", name);
        formData.append("description", description);
        formData.append("category", category);
        formData.append("price", price);
        formData.append("availability", availability);

        if (image) {
            formData.append("image", image);
        }

        try {

            await api.put(
                "/menu-items/" + id,
                formData
            );

            alert("Menu item updated successfully");
            navigate("/admin/menu-items");

        } catch (error) {

            setMessage(
                error.response?.data?.message ||
                "Failed to update menu item"
            );
        }
    };


    return (
        <div className="min-h-screen bg-gray-100">

            <Navbar />

            <div className="max-w-2xl mx-auto px-6 py-10">

                <div className="bg-white shadow rounded-lg p-6">

                    <h1 className="text-2xl font-bold">
                        Edit Menu Item
                    </h1>

                    <form onSubmit={handleSubmit} className="mt-6">

                        <label>
                            Item Name
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="input-field"
                                required
                            />
                        </label>

                        <label>
                            Description
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="input-field"
                                required
                            />
                        </label>

                        <label>
                            Category
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="input-field"
                            >
                                <option value="Starter">Starter</option>
                                <option value="Main Course">Main Course</option>
                                <option value="Dessert">Dessert</option>
                                <option value="Beverage">Beverage</option>
                            </select>
                        </label>

                        <label>
                            Price
                            <input
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className="input-field"
                                required
                            />
                        </label>

                        <label>
                            Availability
                            <select
                                value={availability}
                                onChange={(e) => setAvailability(e.target.value === "true")}
                                className="input-field"
                            >
                                <option value="true">In Stock</option>
                                <option value="false">Out of Stock</option>
                            </select>
                        </label>

                        {oldImage && (
                            <div className="mt-4">
                                <p className="text-sm mb-2">Current Image</p>
                                <img
                                    src={oldImage}
                                    alt={name}
                                    className="w-40 h-40 object-cover rounded"
                                />
                            </div>
                        )}

                        <label className="block mt-4">
                            Update Image
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setImage(e.target.files[0])}
                                className="mt-2 block"
                            />
                        </label>

                        {message && (
                            <p className="text-red-600 mt-4">
                                {message}
                            </p>
                        )}

                        <button className="mt-6 bg-sky-600 text-white px-5 py-2 rounded">
                            Update Menu Item
                        </button>

                    </form>
                </div>
            </div>
        </div>
    );
}


export default EditMenuItem;
