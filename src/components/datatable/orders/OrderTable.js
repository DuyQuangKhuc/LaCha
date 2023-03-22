import React, { useEffect, useState } from "react";
import styles from "./Table.css";
import classNames from "classnames/bind";
import { Link, useParams } from "react-router-dom";
import { useTable, usePagination } from "react-table";
import axios from "axios";
import moment from "moment";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux'
import {
    selectedProduct,
    removeSelectedProduct,
} from "../../../redux/productsActions";
import {
    SortIcon,
} from "../../Icons/Icon";
import styled from "styled-components";
const cx = classNames.bind(styles);
function OrderTable({ columns, data, keywords }) {
    const LabelAct = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2A713E;
  color: #fff;
  padding: 0 !important;
  margin: auto;
  font-weight: 400 !important;
  padding: 5px 15px;
  border-radius: 50px;
  padding-top: 6px;
  width: 92px;
  height: 27px;
`;
    const LabelDra = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #78150e;
  color: #fff;
  padding: 0 !important;
  margin: auto;
  font-weight: 400 !important;
  padding: 5px 15px;
  border-radius: 50px;
  padding-top: 6px;
  width: 92px;
  height: 27px;
`;
    const LabelDrx = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #256a39;
  color: #fff;
  padding: 0 !important;
  margin: auto;
  font-weight: 400 !important;
  padding: 5px 15px;
  border-radius: 50px;
  padding-top: 6px;
  width: 92px;
  height: 27px;
`;
    const LabelDr = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #615e61;
  color: #fff;
  padding: 0 !important;
  margin: auto;
  font-weight: 400 !important;
  padding: 5px 15px;
  border-radius: 50px;
  padding-top: 6px;
  width: 92px;
  height: 27px;
`;
const LabelDrc = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #3C78A8;
  color: #fff;
  padding: 0 !important;
  margin: auto;
  font-weight: 400 !important;
  border-radius: 50px;
  width: 105px;
  height: 27px;
`;
    const LabelDz = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #615e61;
  color: #fff;
  padding: 0 !important;
  margin: auto;
  font-weight: 400 !important;
  padding: 5px 15px;
  border-radius: 50px;
  padding-top: 6px;
  width: 92px;
  height: 27px;
`;
    const {
        state: { pageSize },
    } = useTable(
        { columns, data, initialState: { pageIndex: 0 } },
        usePagination
    );

    const { orderId } = useParams();

    const [item, setItem] = useState({
        id: orderId,
        status: '',
    });
    const [errors, setErrors] = useState({
        status: '',
    });
    const [OrderList, setOrderList] = useState(null);
    const [page, setPage] = useState(1);
    const handleChange = (event) => {
        console.log("hihi", event.target)
        const { name, value } = event.target;

        setItem((prevItem) => ({
            ...prevItem,
            [name]: value
        }));
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validate()) {
            const formData1 = new FormData();
            const token = localStorage.getItem("accessToken");
            const formData = new FormData();

            formData.append('id', item.id);
            formData.append('status', item.status);


            axios({
                method: "PUT",
                url: `https://lacha.s2tek.net/api/Garden/editStatus/${orderId}`,
                data: formData,
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
                        text: `Update status ${orderId} succcess`,
                        showConfirmButton: false,
                        timer: 1500

                    })
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            // show error message
        }
    };
    const validate = () => {
        let isValid = true;
        const errorsCopy = { ...errors };
        if (!errors.status) {
            errorsCopy.status = 'Please select Status';
            isValid = false;
        }

        setErrors(errorsCopy);
        return isValid;
    };
    const token = localStorage.getItem("accessToken");
    useEffect(() => {
        axios({
            method: "GET",
            url: `https://lacha.s2tek.net/api/Garden`,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                setOrderList(res.data);
                // setTotalPage(res.data.pagination.totalPage)
            })
            .catch((err) => {
                console.error(err);
            });
        // eslint-disable-next-line
    }, [page, keywords]);
    return (
        <div className={cx("wrapper")}>
            <table className={cx("tables")}>
                <thead className={cx("table-header")}>
                    <tr>
                        {columns.map((item, index) => (
                            <th key={index}>
                                {item.Header}
                                <span className={cx("sort-icon")}>
                                    {item.Header !== "" && <SortIcon />}
                                </span>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className={cx("table-body")}>
                    {OrderList && OrderList.map((item, index) => (
                        <tr key={index}>
                            {/* <td>
                                  <Link to={"/"}>{item.name}</Link>
                                </td> */}
                            <td>{item.id}</td>

                            <td >
                                <Link to={`/products/${item.gardenPackageId}`} >
                                    {item.gardenPackage.namePack}
                                </Link>
                            </td>


                            <td>{item.room.roomNumber}</td>
                            <td>{item.gardenPackage.price}</td>
                            <td>
                                {moment(item.dateTime).format('YYYY-MM-DD')}
                            </td>
                            <td>
                                {item.status == "1" ? <LabelDra>Đang xử lí</LabelDra> :
                                    item.status == "2" ? <LabelAct >Đang thuê</LabelAct> :
                                        item.status == "3" ? <LabelDr >Đã hủy</LabelDr> : null}
                            </td>
                            <td>
                                <Popup trigger=
                                    {<LabelDrc ><button type="button" style={{paddingLeft: "20px", paddingRight: "20px"}} >
                                        Update
                                    </button></LabelDrc>}
                                    modal nested>
                                    {
                                        close => (
                                            <div className='modal'>
                                                <form onSubmit={handleSubmit} >
                                                    <div className='content'>
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
                                                            <option value="1">Đang xử lí</option>
                                                            <option value="2">Đang thuê</option>
                                                            <option value="3">Đã hủy</option>
                                                        </select>
                                                    </div>
                                                    {errors.status && <p className="text-red-500">{errors.status}</p>}
                                                    <div style={{display: "flex", marginTop: "90px"}}>
                                                        <LabelDrx >
                                                            <button type="submit">
                                                                Change
                                                            </button>
                                                        </LabelDrx>
                                                        <LabelDz >
                                                            <button onClick=
                                                                {() => close()}>
                                                                Cancel
                                                            </button>
                                                        </LabelDz>
                                                    </div>
                                                </form>
                                            </div>
                                        )
                                    }
                                </Popup>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* <Pagination page={page} setPage={setPage} totalPage={totalPage} /> */}
        </div>
    );
}

export default OrderTable;

