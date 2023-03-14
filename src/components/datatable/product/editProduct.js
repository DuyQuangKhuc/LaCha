/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react'
import Sidebar from "../../sidebar/Sidebar";
import Navbar from "../../navbar/Navbar";
import axios from 'axios';
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";


import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';


function EditProduct(props) {

    const [namePack, setNamePack] = useState(props.item.namePack);
    const [description, setDescription] = useState(props.item.description);
    const [length, setLength] = useState(props.item.length);
    const [width, setWidth] = useState(props.item.width);
    const [packageTypeId, setPackageTypeId] = useState(props.item.packageTypeId);
    const [image, setImage] = useState(props.item.image);
    const [price, setPrice] = useState(props.item.price);
    const [status, setStatus] = useState(props.item.status);


    const navitage = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('namePack', namePack);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('image', image);
        formData.append('length', length);
        formData.append('width', width);
        formData.append('status', status);
        formData.append('packageTypeId', packageTypeId);
        // const formData = {
        //     namePack: item.namePack,
        //     image: item.image,
        //     description: item.description,
        //     length: item.length,
        //     width: item.width,
        //     packageTypeId: item.packageTypeId,
        //     price: item.price,
        //     status: item.status,
        // }


        // const token = localStorage.getItem("accessToken");
        axios
            .put(`https://lacha.s2tek.net/api/GardenPackage/edit/${props.item.id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            .then((response) => {
                console.log(response.data);
                if (response.status === 200) {
                    toast("Success Notification!", {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                    navitage('/products')
                }
            })
            .catch((error) => {
                console.log(error);


            });


    };

    return (
        <div className="new">
            <Sidebar />
            <div className="newContainer">
                <Navbar />
                <div className="top">
                    {/* <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <input type="text" name="namePack" value={item.namePack} onChange={handleChange} />cxxzcz
                        <input type="text" name="description" value={item.description} onChange={handleChange} />hfdgdf
                        <input type="text" name="price" value={item.price} onChange={handleChange} />fdsdf
                        <input type="file" name="image" onChange={handleImageChange} />fsdfs
                        <button type="submit">Add Item</button>
                    </form> */}

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