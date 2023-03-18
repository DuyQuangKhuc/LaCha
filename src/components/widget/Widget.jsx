import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

const Widget = ({ type }) => {
  const [amount, setAmount] = useState(null);
  const [diff, setDiff] = useState(null);
  let data;

  const [totalOrders, setTotalOrders] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://lacha.s2tek.net/api/Garden', {
          params: {
            id: type,
          }
        });
        setTotalOrders(response.data.length);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [type]);


  const [totalGardenPackage, setTotalGardenPackage] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://lacha.s2tek.net/api/GardenPackage', {
          params: {
            id: type,
          }
        });
        setTotalGardenPackage(response.data.length);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [type]);

  const [totalTree, setTotalTree] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://lacha.s2tek.net/api/Tree', {
          params: {
            id: type,
          }
        });
        setTotalTree(response.data.length);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [type]);


  const [totalCustomer, setTotalCustomer] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://lacha.s2tek.net/api/Customer', {
          params: {
            id: type,
          }
        });
        setTotalCustomer(response.data.length);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [type]);

  const [totalGarden, setTotalGarden] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://lacha.s2tek.net/api/Garden', {
          params: {
            id: type,
          }
        });   
        setTotalGarden(response.data)
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();

  }, [type]);

  const totalPrice = totalGarden.reduce((acc, item) => acc + item.gardenPackage.price, 0);

  switch (type) {
    case "user":
      data = {
        title: "USERS",
        isMoney: false,
        link: <Link to = "/users"> See all users</Link>,
        query: totalCustomer,
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "order":
      data = {
        title: "ORDERS",
        isMoney: false,
        link: <Link to = "/orders"> View all orders</Link>,
        query: totalOrders,
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "earning":
      data = {
        title: "EARNINGS",
        isMoney: true,
        query: totalPrice,
        link: <Link to = "/orders"> View net earnings</Link>,
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "product":
      data = {
        title: "PRODUCTS",
        query: (totalGardenPackage + totalTree),
        link: <Link to = "/products"> See details </Link> ,
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && "$"} {data.query}
        </span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        <div className={`percentage ${diff < 0 ? "negative" : "positive"}`}>
          {diff < 0 ? <KeyboardArrowDownIcon/> : <KeyboardArrowUpIcon/> }
          {diff} %
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
