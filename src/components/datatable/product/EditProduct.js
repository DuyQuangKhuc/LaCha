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
import { toast } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux';


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



    // useEffect(() => {
    //     const fetchItemData = async () => {
    //         try {
    //             const response = await axios.get(`https://lacha.s2tek.net/api/GardenPackage/${id}`);
    //             setItem(response.data);
    //         } catch (error) {
    //             console.error(error.response.data);
    //             // Handle error response
    //         }
    //     };
    //     fetchItemData();
    // }, [id]);

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
                        navitage('/products')
                    })
                    .catch((error) => {
                        console.log(error);
                        window.confirm("errror")
                    });

            })
            .catch((error) => {
                console.log(error);
                window.confirm("Value cannot be empty")
            });

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
                                    <input
                                        type="file"
                                        id="image"
                                        name="image"

                                        onChange={handleImageChange}
                                        style={{ display: "none" }}
                                    />
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
                                        <input className="block w-full px-4 py-2 mt-2 text-green-700 bg-white border rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                            type="text"
                                            // id="namePack"
                                            name="namePack"
                                            value={item.namePack}
                                            onChange={handleChange} />
                                    </div>

                                    <div className="mb-10">
                                        <label
                                            htmlFor="description"
                                            className="block text-sm font-semibold text-gray-800"
                                        >
                                            ▷ Description
                                        </label>
                                        <input className="block w-full px-4 py-2 mt-2 text-green-700 bg-white border rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                            type="text"
                                            // id="description"
                                            name="description"
                                            value={item.description}
                                            onChange={handleChange} />
                                    </div>

                                    <div className="mb-10">
                                        <label
                                            htmlFor="length"
                                            className="block text-sm font-semibold text-gray-800"
                                        >
                                            ▷ Length
                                        </label>
                                        <input className="block w-full px-4 py-2 mt-2 text-green-700 bg-white border rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                            type="text"
                                            // id="length"
                                            name="length"
                                            value={item.length}
                                            onChange={handleChange} />
                                    </div>

                                    <div className="mb-10">
                                        <label
                                            htmlFor="width"
                                            className="block text-sm font-semibold text-gray-800"
                                        >
                                            ▷ Width
                                        </label>
                                        <input className="block w-full px-4 py-2 mt-2 text-green-700 bg-white border rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                            type="text"
                                            // id="width"
                                            name="width"
                                            value={item.width}
                                            onChange={handleChange} />
                                    </div>

                                    <div className="mb-10">
                                        <label
                                            htmlFor="status"
                                            className="block text-sm font-semibold text-gray-800"
                                        >
                                            ▷Status
                                            <select className="block w-full px-4 py-2 mt-2 text-green-700 bg-white border rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
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

                                    </div>

                                    <div className="mb-10">
                                        <label
                                            htmlFor="password"
                                            className="block text-sm font-semibold text-gray-800"
                                        >
                                            ▷ Price
                                        </label>
                                        <input className="block w-full px-4 py-2 mt-2 text-green-700 bg-white border rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                            type="text"
                                            // id="price"
                                            name="price"
                                            value={item.price}
                                            onChange={handleChange} />
                                    </div>

                                    <div className="mb-10">
                                        <label
                                            htmlFor="password"
                                            className="block text-sm font-semibold text-gray-800"
                                        >
                                            ▷PackageTypeId
                                            <select className="block w-full px-4 py-2 mt-2 text-green-700 bg-white border rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
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