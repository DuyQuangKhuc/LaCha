/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, useNavigate, redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectedProduct,
  removeSelectedProduct,
} from "../../../redux/productsActions";
import "./product.css"
import Sidebar from "../../sidebar/Sidebar";
import Navbar from "../../navbar/Navbar";
import "../../datatable/single.scss"
import EditProduct from "./EditProduct";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ProductDetails = () => {

  const { productId } = useParams();
  let product = useSelector((state) => state.product);
  const { image, namePack, price, width, length, status } = product;
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

  const navitage = useNavigate()

  const deleteItem = (id) => {
    axios.post(`https://lacha.s2tek.net/api/GardenPackage/delete/${id}`)
      .then(response => {
        // Handle success
        toast.success("Delete successfully!");
        navitage("/products");
        console.log(response);
      })
      .catch(error => {
        // Handle error
        console.log(error);
      });
  }

  const handleDelete = (productId) => {
    if (window.confirm("Are you sure to delete this tree?")) {
      deleteItem(productId);      
    }
    
  }


  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="ui grid container">
          {Object.keys(product).length === 0 ? (
            <div>...Loading</div>
          ) : (
            <div className="ui placeholder segment">
              <div className="ui two column stackable center aligned grid">
                <div className="ui vertical divider">AND</div>
                <div className="middle aligned row">
                  <div className="column lp">
                    <img className="ui fluid image" src={image} />
                  </div>
                  <div className="column rp">

                    <h2>
                      <a className="ui teal tag label">${price}</a>
                    </h2>
                    <h3 className="ui brown block header">{namePack}</h3>
                    <p>▻ Length: {length}</p>
                    <p>▻ Width : {width}</p>
                    <p>▻ Status : {status}</p>
                    <br />

                    <div className="ui vertical animated button  ">
                      <Link to={`/products/edit/${productId}`}>
                        <button className="visible content " >  Edit </button>
                      </Link>
                    </div>

                    <br />
                    <div className="ui vertical animated button" onClick={() => handleDelete(productId)}>
                      <button className="visible content " >Delete </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;