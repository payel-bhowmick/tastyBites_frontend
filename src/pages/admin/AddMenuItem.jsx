import {
    useState
} from "react";


import {
    useNavigate
} from "react-router-dom";


import Navbar from "../../components/Navbar";


import api from "../../services/api";


function AddMenuItem() {

    const navigate = useNavigate();


    const [name, setName] =
        useState("");

    const [description, setDescription] =
        useState("");

    const [category, setCategory] =
        useState("Starter");

    const [price, setPrice] =
        useState("");

    const [availability, setAvailability] =
        useState(true);

    const [image, setImage] =
        useState(null);


    // Image preview
    const [imagePreview, setImagePreview] =
        useState("");


    const [message, setMessage] =
        useState("");


    // Handle image selection
    const handleImageChange = (e) => {

        const selectedImage =
            e.target.files[0];


        if (selectedImage) {

            setImage(
                selectedImage
            );


            // Create preview URL
            const previewURL =
                URL.createObjectURL(
                    selectedImage
                );


            setImagePreview(
                previewURL
            );

        }

    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        setMessage("");


        try {

            const formData =
                new FormData();


            formData.append(
                "name",
                name
            );


            formData.append(
                "description",
                description
            );


            formData.append(
                "category",
                category
            );


            formData.append(
                "price",
                price
            );


            formData.append(
                "availability",
                availability
            );


            if (image) {

                formData.append(
                    "image",
                    image
                );

            }


            await api.post(
                "/menu-items",
                formData
            );


            alert(
                "Menu item added successfully"
            );


            navigate(
                "/admin/menu-items"
            );


        } catch (error) {

            setMessage(
                error.response?.data?.message ||
                "Failed to add menu item"
            );

        }

    };


    return (

        <div className="min-h-screen bg-gray-100">

            <Navbar />


            <div className="max-w-2xl mx-auto px-6 py-10">

                <div className="bg-white shadow rounded-lg p-6">

                    <h1 className="text-2xl font-bold">
                        Add Menu Item
                    </h1>


                    <form
                        onSubmit={handleSubmit}
                        className="mt-6"
                    >

                        <label>
                            Item Name

                            <input
                                type="text"
                                value={name}
                                onChange={(e) =>
                                    setName(
                                        e.target.value
                                    )
                                }
                                className="w-full border rounded px-3 py-2 mt-1 mb-4"
                                required
                            />

                        </label>


                        <label>
                            Description

                            <textarea
                                value={description}
                                onChange={(e) =>
                                    setDescription(
                                        e.target.value
                                    )
                                }
                                className="w-full border rounded px-3 py-2 mt-1 mb-4"
                                required
                            />

                        </label>


                        <label>
                            Category

                            <select
                                value={category}
                                onChange={(e) =>
                                    setCategory(
                                        e.target.value
                                    )
                                }
                                className="w-full border rounded px-3 py-2 mt-1 mb-4"
                            >

                                <option value="Starter">
                                    Starter
                                </option>

                                <option value="Main Course">
                                    Main Course
                                </option>

                                <option value="Dessert">
                                    Dessert
                                </option>

                                <option value="Beverage">
                                    Beverage
                                </option>

                            </select>

                        </label>


                        <label>
                            Price

                            <input
                                type="number"
                                value={price}
                                onChange={(e) =>
                                    setPrice(
                                        e.target.value
                                    )
                                }
                                className="w-full border rounded px-3 py-2 mt-1 mb-4"
                                required
                            />

                        </label>


                        <label>
                            Availability

                            <select
                                value={availability}
                                onChange={(e) =>
                                    setAvailability(
                                        e.target.value === "true"
                                    )
                                }
                                className="w-full border rounded px-3 py-2 mt-1 mb-4"
                            >

                                <option value="true">
                                    In Stock
                                </option>

                                <option value="false">
                                    Out of Stock
                                </option>

                            </select>

                        </label>


                        <label>
                            Item Image

                            <input
                                type="file"
                                accept="image/*"
                                onChange={
                                    handleImageChange
                                }
                                className="mt-2 block"
                            />

                        </label>


                        {/* Image Preview */}

                        {imagePreview && (

                            <div className="mt-4">

                                <p className="text-sm text-gray-600 mb-2">
                                    Image Preview
                                </p>


                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="w-48 h-48 object-cover rounded border"
                                />

                            </div>

                        )}


                        {message && (

                            <p className="text-red-600 mt-4">
                                {message}
                            </p>

                        )}


                        <button
                            className="mt-6 bg-sky-600 text-white px-5 py-2 rounded"
                        >
                            Add Menu Item
                        </button>

                    </form>

                </div>

            </div>

        </div>

    );
}


export default AddMenuItem;