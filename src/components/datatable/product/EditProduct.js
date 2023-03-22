/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from 'react'
import Sidebar from "../../sidebar/Sidebar";
import Navbar from "../../navbar/Navbar";
import {
    selectedProduct,
    removeSelectedProduct,
} from "../../../redux/productsActions";
import axios from 'axios';
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
const EditProduct = () => {

    const navitage = useNavigate()

    const [item, setItem] = useState({
        id: '',
        namePack: '',
        image: '',
        description: '',
        length: '',
        width: '',
        packageTypeId: '',
        price: '',
        status: '',
    });
    const [errors, setErrors] = useState({
        namePack: '',
        description: '',
        length: '',
        width: '',
        price: '',
        status: '',
        packageTypeId: '',
        image: ''
    });

    const validate = () => {
        let isValid = true;
        const errorsCopy = { ...errors };

        if (!item.namePack) {
            errorsCopy.namePack = 'Please fill Name Pack';
            isValid = false;
        }

        if (!item.description || item.description.trim().length < 15 || item.description.trim().length > 200) {
            errorsCopy.description = 'Description must be 15-200 characters';
            isValid = false;
        }

        if (!item.length || isNaN(item.length) || parseFloat(item.length) <= 0) {
            errorsCopy.length = 'Length must be a number greater than 0';
            isValid = false;
        }

        if (!item.width || isNaN(item.width) || parseFloat(item.width) <= 0) {
            errorsCopy.width = 'Width must be a number greater than 0';
            isValid = false;
        }

        if (!item.price || isNaN(item.price) || parseFloat(item.price) <= 0) {
            errorsCopy.price = 'Price must be a number greater than 0';
            isValid = false;
        }

        if (!item.status) {
            errorsCopy.status = 'Please select Status';
            isValid = false;
        }

        if (!item.packageTypeId) {
            errorsCopy.packageTypeId = 'Please select Package Type';
            isValid = false;
        }

        if (!item.image) {
            errorsCopy.image = 'Please upload an image';
            isValid = false;
        }

        setErrors(errorsCopy);
        return isValid;
    };
    
    const { productId } = useParams();

    const dispatch = useDispatch();
    const fetchProductDetail = async (id) => {
        const response = await axios
            .get(`https://lacha.s2tek.net/api/GardenPackage/${id}`)
            .catch((err) => {
                console.log("Err: ", err);
            });
        dispatch(selectedProduct(response.data));


    };

    useEffect(() => {
        if (productId && productId !== "") fetchProductDetail(productId);
        return () => {
            dispatch(removeSelectedProduct());
        };
    }, [productId]);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setItem((prevItem) => ({
            ...prevItem,
            [name]: value
        }));
    };


    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setItem((prevItem,) => ({
            ...prevItem,
            image: file
        }));
    };



    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validate()) {
            const formData1 = new FormData();
            formData1.append('image', item.image);

            const token = localStorage.getItem("accessToken");

            axios({
                method: "POST",
                url: `https://lacha.s2tek.net/api/UploadFile`,
                data: formData1,
                headers: {
                    'Accept': '/',
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((response) => {
                    console.log(response.data);

                    const postData = response.data;


                    const formData = new FormData();

                    formData.append('id', item.id);
                    formData.append('image', item.image = postData);
                    formData.append('namePack', item.namePack);
                    formData.append('description', item.description);
                    formData.append('price', item.price);
                    formData.append('length', item.length);
                    formData.append('width', item.width);
                    formData.append('status', item.status);
                    formData.append('packageTypeId', item.packageTypeId);


                    axios({
                        method: "PUT",
                        url: `https://lacha.s2tek.net/api/GardenPackage/edit/${productId}`,
                        data: formData, postData,
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                    })
                        .then((response) => {
                            console.log(response.data);
                            Swal.fire({
                                position: 'center',
                                icon: 'success',
                                text: `Edit item ${productId} succcess`,
                                showConfirmButton: false,
                                timer: 2000
                            
                            })
                            navitage('/products')
                        })
                        .catch((error) => {
                            console.log(error);
                        });

                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            // show error message
        }
    };

    return (
        <div className="new">
            <Sidebar />
            <div className="newContainer">
                <Navbar />
                <div className="top">
                    <div className="bottom">
                        <div className="left">
                            <img
                                src={
                                    item.image
                                        ? URL.createObjectURL(item.image)
                                        : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                                }
                                alt=""
                            />
                        </div>
                        <div className="right">
                            <form onSubmit={handleSubmit} encType="multipart/form-data">
                                <div className="formInput">
                                    <label htmlFor="image">
                                        Image: <DriveFolderUploadOutlinedIcon className="icon" />
                                    </label>
                                    <input className={`block w-full px-4 py-2 mt-2 text-green-700 
                                            bg-white border rounded-md focus:border-green-400 
                                            focus:ring-green-300 focus:outline-none focus:ring 
                                            focus:ring-opacity-40 ${errors.image ? 'border-red-500' : ''
                                        }`}
                                        type="file"
                                        id="image"
                                        name="image"

                                        onChange={handleImageChange}
                                        style={{ display: "none" }}
                                    />
                                    {errors.image && <p className="text-red-500">{errors.image}</p>}
                                </div>

                                <label
                                    htmlFor="description"
                                    className="block text-sm font-semibold text-gray-800"
                                >
                                    ▷ ID
                                    <input className="block w-full px-4 py-2 mt-2 text-green-700 bg-white border rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                        type="text"

                                        name="id"
                                        value={item.id = productId}
                                        onChange={handleChange}
                                    />
                                </label>

                                <div className="formInput" >
                                    <div className="mb-10">
                                        <div className="mb-10">

                                        </div>
                                        <label
                                            htmlFor="namePack"
                                            className="block text-sm font-semibold text-gray-800"
                                        >
                                            ▷ Name Pack
                                        </label>
                                        <input
                                            type="text"
                                            name="namePack"
                                            value={item.namePack}
                                            onChange={handleChange}
                                            className={`block w-full px-4 py-2 mt-2 text-green-700 
                                            bg-white border rounded-md focus:border-green-400 
                                            focus:ring-green-300 focus:outline-none focus:ring 
                                            focus:ring-opacity-40 ${errors.namePack ? 'border-red-500' : ''
                                                }`}
                                        />
                                        {errors.namePack && <p className="text-red-500">{errors.namePack}</p>}
                                    </div>

                                    <div className="mb-10">
                                        <label
                                            htmlFor="description"
                                            className="block text-sm font-semibold text-gray-800"
                                        >
                                            ▷ Description
                                        </label>
                                        <input
                                            type="text"
                                            name="description"
                                            value={item.description}
                                            onChange={handleChange}
                                            className={`block w-full px-4 py-2 mt-2 text-green-700 bg-white border rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40 ${errors.description ? 'border-red-500' : ''
                                                }`}
                                        />
                                        {errors.description && <p className="text-red-500">{errors.description}</p>}
                                    </div>

                                    <div className="mb-10">
                                        <label
                                            htmlFor="length"
                                            className="block text-sm font-semibold text-gray-800"
                                        >
                                            ▷ Length
                                        </label>
                                        <input
                                            type="number"
                                            min={0}
                                            name="length"
                                            value={item.length}
                                            onChange={handleChange}
                                            className={`block w-full px-4 py-2 mt-2 text-green-700 bg-white border rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40 ${errors.length ? 'border-red-500' : ''
                                                }`}
                                        />
                                        {errors.length && <p className="text-red-500">{errors.length}</p>}
                                    </div>

                                    <div className="mb-10">
                                        <label
                                            htmlFor="width"
                                            className="block text-sm font-semibold text-gray-800"
                                        >
                                            ▷ Width
                                        </label>
                                        <input
                                            type="number"
                                            min={0}
                                            name="width"
                                            value={item.width}
                                            onChange={handleChange}
                                            className={`block w-full px-4 py-2 mt-2 text-green-700 bg-white border rounded-md 
                                            focus:border-green-400 focus:ring-green-300 focus:outline-none 
                                            focus:ring focus:ring-opacity-40 ${errors.width ? 'border-red-500' : ''
                                                }`}
                                        />
                                        {errors.width && <p className="text-red-500">{errors.width}</p>}
                                    </div>

                                    <div className="mb-10">
                                        <label
                                            htmlFor="status"
                                            className="block text-sm font-semibold text-gray-800"
                                        >
                                            ▷Status
                                            <select className={`block w-full px-4 py-2 mt-2 text-green-700 bg-white border rounded-md 
                                            focus:border-green-400 focus:ring-green-300 focus:outline-none 
                                            focus:ring focus:ring-opacity-40 ${errors.status ? 'border-red-500' : ''
                                                }`}
                                                type="text"
                                                // id="status"
                                                name="status"
                                                value={item.status}
                                                onChange={handleChange} >
                                                <option value="">--Please Select--</option>
                                                <option value="1">Active</option>
                                                <option value="0">Inactive</option>
                                            </select>
                                        </label>
                                        {errors.status && <p className="text-red-500">{errors.status}</p>}
                                    </div>

                                    <div className="mb-10">
                                        <label
                                            htmlFor="password"
                                            className="block text-sm font-semibold text-gray-800"
                                        >
                                            ▷ Price
                                        </label>
                                        <input className={`block w-full px-4 py-2 mt-2 text-green-700 bg-white border rounded-md 
                                            focus:border-green-400 focus:ring-green-300 focus:outline-none 
                                            focus:ring focus:ring-opacity-40 ${errors.price ? 'border-red-500' : ''
                                            }`}
                                            type="number"
                                            min={0}
                                            name="price"
                                            value={item.price}
                                            onChange={handleChange} />
                                        {errors.price && <p className="text-red-500">{errors.price}</p>}
                                    </div>

                                    <div className="mb-10">
                                        <label
                                            htmlFor="password"
                                            className="block text-sm font-semibold text-gray-800"
                                        >
                                            ▷PackageTypeId
                                            <select className={`block w-full px-4 py-2 mt-2 text-green-700 bg-white border rounded-md 
                                            focus:border-green-400 focus:ring-green-300 focus:outline-none 
                                            focus:ring focus:ring-opacity-40 ${errors.packageTypeId ? 'border-red-500' : ''
                                                }`}
                                                type="text"
                                                // id="packageTypeId"
                                                name="packageTypeId"
                                                value={item.packageTypeId}
                                                onChange={handleChange}
                                            >
                                                <option value="">--Please Select--</option>
                                                <option value="1">Traditional</option>
                                                <option value="2">Classic</option>
                                                <option value="3">Morden</option>
                                            </select>
                                        </label>
                                        {errors.packageTypeId && <p className="text-red-500">{errors.packageTypeId}</p>}

                                    </div>

                                    <button type="submit">
                                        Send
                                    </button>
                                </div>


                            </form>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default EditProduct