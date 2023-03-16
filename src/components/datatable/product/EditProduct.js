/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react'
import Sidebar from "../../sidebar/Sidebar";
import Navbar from "../../navbar/Navbar";
import axios from 'axios';
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";


import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';


function EditProduct({id, onUpdate }) {

    const [namePack, setNamePack] = useState('');
    const [description, setDescription] = useState('');
    const [length, setLength] = useState('');
    const [width, setWidth] = useState('');
    const [packageTypeId, setPackageTypeId] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState('');
    const [status, setStatus] = useState('');


    const navitage = useNavigate()

    function handleSubmit(event) {
        event.preventDefault();
        axios.put(`https://lacha.s2tek.net/api/GardenPackage/edit/${id}`, { namePack, description, length, width, packageTypeId, image, price, status })
            .then(response => {
                onUpdate(response.data);
                navitage('/products')
            })
            .catch(error => {
                console.log(error)
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
                                    image
                                        ? URL.createObjectURL(image)
                                        : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                                }
                                alt=""
                            />
                        </div>
                        <div className="right">
                            <form onSubmit={handleSubmit} encType="multipart/form-data">
                                <div className="formInput">
                                    <label htmlFor="file">
                                        Image: <DriveFolderUploadOutlinedIcon className="icon" />
                                    </label>
                                    <input
                                        type="file"
                                        id="file"
                                        value={image}
                                        onChange={(event) => setImage(event.target.value)}
                                        style={{ display: "none" }}
                                    />
                                </div>

                                <div className="formInput" >
                                    <div className="mb-10">
                                        <label
                                            htmlFor="namePack"
                                            className="block text-sm font-semibold text-gray-800"
                                        >
                                            ▷ Name Pack
                                        </label>
                                        <input className="block w-full px-4 py-2 mt-2 text-green-700 bg-white border rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                            type="text"
                                            // id="namePack"
                                            value={namePack}
                                            onChange={(event) => setNamePack(event.target.value)} />
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
                                            value={description}
                                            onChange={(event) => setDescription(event.target.value)} />
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
                                            value={length}
                                            onChange={(event) => setLength(event.target.value)} />
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
                                            value={width}
                                            onChange={(event) => setWidth(event.target.value)} />
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
                                                value={status}
                                                onChange={(event) => setStatus(event.target.value)} >
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
                                            value={price}
                                            onChange={(event) => setPrice(event.target.value)} />
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
                                                value={packageTypeId}
                                                onChange={(event) => setPackageTypeId(event.target.value)}
                                            >
                                                <option value="">--Please Select--</option>
                                                <option value="1">Traditional</option>
                                                <option value="2">Classic</option>
                                                <option value="3">Morden</option>
                                            </select>
                                        </label>

                                    </div>
                                </div>

                                <button type="submit">
                                    Save
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default EditProduct
