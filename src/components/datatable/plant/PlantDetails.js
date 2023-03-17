/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectedProduct,
  removeSelectedProduct,
} from "../../../redux/productsActions";

import Sidebar from "../../sidebar/Sidebar";
import Navbar from "../../navbar/Navbar";
import "../../datatable/single.scss"
import { toast } from "react-toastify";

const PlantDetails = () => {

  const { plantId } = useParams();
  let product = useSelector((state) => state.product);
  const { image, nameTree, price, status, description } = product;
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

  const navitage = useNavigate()

  const deleteItem = (id) => {
    axios.post(`https://lacha.s2tek.net/api/Tree/delete/${id}`)
      .then(response => {
        // Handle success
        toast.success("Delete successfully!");
        navitage("/plants");
        console.log(response);
      })
      .catch(error => {
        // Handle error
        console.log(error);
      });
  }

  const handleDelete = (plantId) => {
    if (window.confirm("Are you sure to delete this tree?")) {
      deleteItem(plantId);
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
                      <a className="ui teal tag label">{price}$</a>
                    </h2>
                    <h3 className="ui brown block header">{nameTree}</h3>
                    <p>{description}</p>
                    <br />
                    <p>▻ Status : {status}</p>
                    <br />
                    {/* <Link to={`/plants/edit/${plantId}`} >
                      <div className="ui vertical animated button ">
                        <button className="visible content " >  Edit </button>
                      </div>
                    </Link> */}
                    <br />
                    <div className="ui vertical animated button" onClick={() => handleDelete(plantId)}>
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

export default PlantDetails;