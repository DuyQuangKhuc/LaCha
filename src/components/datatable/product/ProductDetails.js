/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectedProduct,
  removeSelectedProduct,
} from "../../../redux/productsActions";
import "./product.css"
import Sidebar from "../../sidebar/Sidebar";
import Navbar from "../../navbar/Navbar";
import "../../datatable/single.scss"

const ProductDetails = () => {

  const { productId } = useParams();
  let product = useSelector((state) => state.product);
  const { image, namePack, price, width, length, status } = product;
  const dispatch = useDispatch();
  const fetchProductDetail = async (id) => {
    const response = await axios
      .get(`/api/GardenPackage/${id}`)
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

  // async function deleteClass(id) {
    
  //     const response = await axios
  //       .post(
  //         `/api/GardenPackage/delete/${id}`
  //       );
  //     axios

  //       .get(`/api/GardenPackage/${id}`)

  //       .then((res) => {
  //         dispatch(selectedProduct(response.data));
  //       })
  //       .catch((err) => {
  //         console.error(err);
  //       });
   
    
  // }


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
                    {/* <div className="ui vertical animated button" tabIndex="0">
                      <div className="hidden content">
                        <i className="shop icon">
                        
                        </i>
                      </div>
                      <button className="visible content">Edit </button>                   
                    </div> */}
                    <br />
                    <div className="ui  vertical animated button bg-red-600" tabIndex="0">
                      <div className="hidden content  ">
                        <i className="shop icon ">

                        </i>
                      </div>
                      <button className="visible content ">Delete </button>
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