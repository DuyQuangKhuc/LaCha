import React, { useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../../../redux/productsActions";
import PlantComponent from "./PlantComponent";

import { Link } from "react-router-dom";
import "../../datatable/datatable.scss"


const PlantTable = () => {
  const products = useSelector((state) => state.allProducts.products);
  const dispatch = useDispatch();
  // const fetchProducts = async () => {
  //   const response = await axios
  //     .get(`https://lacha.s2tek.net/api/GardenPackage`)
  //     .catch((err) => {
  //       console.log("Err: ", err);
  //     });
  //   dispatch(setProducts(response.data));
  // };
  const token = localStorage.getItem("accessToken");
  useEffect(() => {
    //fetchProducts();
    axios({
      method: "GET",
      url: `/api/Tree`,
      headers: {
        "access-control-allow-origin": "*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        dispatch(setProducts(res.data));
      })
      .catch((err) => {
        console.error(err);
      });
    // eslint-disable-next-line
  }, []);

  console.log("Products :", products);
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Plants
        <Link to="/plants/new" className="link">
          Add New
        </Link>
      </div>
      <div className="ui grid container">
        <PlantComponent />
      </div>
    </div>
  );
};

export default PlantTable;