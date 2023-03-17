/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import axios from 'axios';
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";

import { useNavigate } from 'react-router-dom';



const AddPlants = () => {

    const navigate = useNavigate()
    const [item, setItem] = useState({
        nameTree: '',
        image: '',
        description: '',
        treeTypeId: '',
        price: '',
        status: '',
        gardenPackageId: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        // setItem({
        //     ...item,
        //     [name]: value
        // });
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



    const handleSubmit = (event) => {
        event.preventDefault();



        const formData1 = new FormData();
        formData1.append('image', item.image);

        const token = localStorage.getItem("accessToken");
        // axios.post('https://lacha.s2tek.net/api/Tree/create', formData)
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
                formData.append('nameTree', item.nameTree);
                formData.append('description', item.description);
                formData.append('price', item.price);
                formData.append('image', item.image = postData);
                formData.append('treeTypeId', item.treeTypeId);
                formData.append('status', item.status);
                formData.append('gardenPackageId', item.gardenPackageId);
                
                axios({
                    method: "POST",
                    url: `https://lacha.s2tek.net/api/Tree/create`,
                    data: formData, postData,
                    headers: {
                        'Accept': '/',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                })
                    .then((response) => {
                        console.log(response.data);

                        navigate('/plants')

                    })
                    .catch((error) => {
                        console.log(error);


                    });

            })
            .catch((error) => {
                console.log(error);


            });



    };

    // const handleSubmitImg = (event) => {
    //     event.preventDefault();

    //     const formData = new FormData();   
    //     formData.append('image', item.image);


    //     const token = localStorage.getItem("accessToken");




    // };

    return (
        <div className="new">
            <Sidebar />
            <div className="newContainer">
                <Navbar />
                <div className="top">
                    {/* <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <input type="text" name="nameTree" value={item.nameTree} onChange={handleChange} />cxxzcz
                        <input type="text" name="description" value={item.description} onChange={handleChange} />hfdgdf
                        <input type="text" name="price" value={item.price} onChange={handleChange} />fdsdf
                        <input type="file" name="image" onChange={handleImageChange} />fsdfs
                        <button type="submit">Add Item</button>
                    </form> */}

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

                                <div className="formInput" >
                                    <div className="mb-10">
                                        <label
                                            htmlFor="nameTree"
                                            className="block text-sm font-semibold text-gray-800"
                                        >
                                            ▷ Name Tree
                                        </label>
                                        <input className="block w-full px-4 py-2 mt-2 text-green-700 bg-white border rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                            type="text"
                                            // id="nameTree"
                                            name="nameTree"
                                            value={item.nameTree}
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
                                            htmlFor="treeTypeId"
                                            className="block text-sm font-semibold text-gray-800"
                                        >
                                            ▷TreeType
                                            <select className="block w-full px-4 py-2 mt-2 text-green-700 bg-white border rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                                type="text"
                                                // id="width"
                                                name="treeTypeId"
                                                value={item.treeTypeId}
                                                onChange={handleChange} >
                                                <option value="">--Please Select--</option>
                                                <option value="2">Cây thích mát</option>
                                                <option value="1">Cây thích nắng</option>
                                            </select>
                                        </label>
                                        
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
                                            ▷ gardenPackageId
                                            <select className="block w-full px-4 py-2 mt-2 text-green-700 bg-white border rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                                type="text"
                                                // id="price"
                                                name="gardenPackageId"
                                                value={item.gardenPackageId}
                                                onChange={handleChange} >
                                                <option value="">--Please Select--</option>
                                                <option value="1">Sân vườn cổ điển Đức</option>
                                                <option value="2">Sân vườn Truyền thống Hàn</option>
                                                <option value="3">Sân vườn Truyền thống Anh</option>
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

export default AddPlants