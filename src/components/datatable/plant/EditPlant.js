import React, { useEffect, useState } from 'react'
import Navbar from '../../navbar/Navbar'
import Sidebar from '../../sidebar/Sidebar'
import axios from 'axios';
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useNavigate, useParams } from 'react-router-dom';
import {
    selectedProduct,
    removeSelectedProduct,
} from "../../../redux/productsActions";
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';

const EditPlant = () => {

    const navigate = useNavigate()

    const [item, setItem] = useState({
        id: '',
        nameTree: '',
        image: '',
        description: '',
        treeTypeId: '',
        price: '',
        status: '',
        gardenPackageId: '',
    });

    const [errors, setErrors] = useState({
        nameTree: '',
        image: '',
        description: '',
        treeTypeId: '',
        price: '',
        status: '',
        gardenPackageId: '',
    });

    const validate = () => {
        let isValid = true;
        const errorsCopy = { ...errors };

        if (!item.nameTree ) {
            errorsCopy.nameTree = 'Please fill Name Tree';
            isValid = false;
        }

        if (!item.description || item.description.trim().length < 15 || item.description.trim().length > 200) {
            errorsCopy.description = 'Description must be 15-200 characters';
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

        if (!item.treeTypeId) {
            errorsCopy.treeTypeId = 'Please select Tree Type';
            isValid = false;
        }

        if (!item.gardenPackageId) {
            errorsCopy.gardenPackageId = 'Please select Package Type';
            isValid = false;
        }

        if (!item.image) {
            errorsCopy.image = 'Please upload an image';
            isValid = false;
        }

        setErrors(errorsCopy);
        return isValid;
    };

    const { plantId } = useParams();
    
    const dispatch = useDispatch();
    const fetchProductDetail = async (id) => {
        const response = await axios
            .get(`https://lacha.s2tek.net/api/Tree/${id}`)
            .catch((err) => {
                console.log("Err: ", err);
            });
        dispatch(selectedProduct(response.data));
        

    };

    useEffect(() => {
        if (plantId && plantId !== "") fetchProductDetail(plantId);
        return () => {
            dispatch(removeSelectedProduct());
        };
    }, [plantId]);

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

    const handleSubmit = (event) => {
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
                    formData.append('nameTree', item.nameTree);
                    formData.append('description', item.description);
                    formData.append('price', item.price);
                    formData.append('image', item.image = postData);
                    formData.append('treeTypeId', item.treeTypeId);
                    formData.append('status', item.status);
                    formData.append('gardenPackageId', item.gardenPackageId);

                    axios({
                        method: "PUT",
                        url: `https://lacha.s2tek.net/api/Tree/edit/${plantId}`,
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
                                text: `Edit item ${plantId} succcess`,
                                showConfirmButton: false,
                                timer: 2000
                            
                            })
                            navigate('/plants')

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
                                        value={item.id = plantId}
                                        onChange={handleChange}
                                    />
                                </label>

                                <div className="formInput" >
                                    <div className="mb-10">
                                        <label
                                            htmlFor="nameTree"
                                            className="block text-sm font-semibold text-gray-800"
                                        >
                                            ▷ Name Tree
                                        </label>
                                        <input
                                            type="text"
                                            name="nameTree"
                                            value={item.nameTree}
                                            onChange={handleChange}
                                            className={`block w-full px-4 py-2 mt-2 text-green-700 
                                            bg-white border rounded-md focus:border-green-400 
                                            focus:ring-green-300 focus:outline-none focus:ring 
                                            focus:ring-opacity-40 ${errors.nameTree ? 'border-red-500' : ''
                                                }`}
                                        />
                                        {errors.nameTree && <p className="text-red-500">{errors.nameTree}</p>}
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
                                            htmlFor="treeTypeId"
                                            className="block text-sm font-semibold text-gray-800"
                                        >
                                            ▷TreeType
                                            <select className={`block w-full px-4 py-2 mt-2 text-green-700 bg-white border rounded-md 
                                            focus:border-green-400 focus:ring-green-300 focus:outline-none 
                                            focus:ring focus:ring-opacity-40 ${errors.treeTypeId ? 'border-red-500' : ''
                                                }`}
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
                                        {errors.treeTypeId && <p className="text-red-500">{errors.treeTypeId}</p>}
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
                                            ▷GardenPackage
                                            <select className={`block w-full px-4 py-2 mt-2 text-green-700 bg-white border rounded-md 
                                            focus:border-green-400 focus:ring-green-300 focus:outline-none 
                                            focus:ring focus:ring-opacity-40 ${errors.gardenPackageId ? 'border-red-500' : ''
                                                }`}
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
                                        {errors.gardenPackageId && <p className="text-red-500">{errors.gardenPackageId}</p>}
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

export default EditPlant