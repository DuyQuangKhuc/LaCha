import React, { useEffect, useState } from "react";
import styles from "./Table.css";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { useTable, usePagination } from "react-table";
import axios from "axios";
import moment from "moment";
import Pagination from "./Pagination";
import {
    NumberOneIcon,
    NumberTwoIcon,
    NumberThreeIcon,
    PreviousIcon,
    NextIcon,
    DoubleNextIcon,
    NumberTenIcon,
    DotIcon,
    SortIcon,
} from "../../Icons/Icon";
import styled from "styled-components";
const cx = classNames.bind(styles);

function OrderTable({ columns, data, keywords }) {
    const Label = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2d3748;
  color: #fff;
  padding: 0 !important;
  margin: 0 3px;
  font-weight: 400 !important;
  padding: 5px 15px;
  border-radius: 50px;
  padding-top: 6px;
  width: 72px;
  height: 27px;
`;
    const LabelAct = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2f903f;
  color: #fff;
  padding: 0 !important;
  margin: 0 3px;
  font-weight: 400 !important;
  padding: 5px 15px;
  border-radius: 50px;
  padding-top: 6px;
  width: 72px;
  height: 27px;
`;
    const LabelDra = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #94a3b8;
  color: #fff;
  padding: 0 !important;
  margin: 0 3px;
  font-weight: 400 !important;
  padding: 5px 15px;
  border-radius: 50px;
  padding-top: 6px;
  width: 72px;
  height: 27px;
`;
    const {
        canPreviousPage,
        canNextPage,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageSize },
    } = useTable(
        { columns, data, initialState: { pageIndex: 0 } },
        usePagination
    );
    const [OrderList, setOrderList] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const token = localStorage.getItem("accessToken");
    useEffect(() => {
        axios({
            method: "GET",
            url: `http://s2tek.net:7100/api/Garden`,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                setOrderList(res.data.data);
                setTotalPage(res.data.pagination.totalPage)
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
                            <td>{item.gardenPackageId}</td>
                            <td>
                                {moment(item.dateTime).format('YYYY-MM-DD')}
                            </td>

                            <td>{item.roomId}</td>
                            <td>{item.status === "1" ? <LabelAct>Active</LabelAct> : <LabelDra>Inactive</LabelDra>}</td>

                            <td className=" whitespace-nowrap">
                                <div className="dropdown relative">
                                    <button className="dropdown-toggle pb-3 pl-6 text-black font-medium text-2xl leading-tight transition duration-150 ease-in-out flex items-center whitespace-nowrap"
                                        type="button"
                                        id="dropdownMenuButton1h"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        ...
                                    </button>
                                    <ul
                                        className=" dropdown-menu min-w-max absolute hidden bg-white text-base z-50 float-left py-2 list-none text-left rounded-lg shadow-lg mt-1 m-0 bg-clip-padding border-none"
                                        aria-labelledby="dropdownMenuButton1h"
                                    >
                                        <h6
                                            className=" text-gray-700 font-bold text-base py-1 px-4 block w-full whitespace-nowrap bg-transparent border-b border-black "
                                        >
                                            Manage
                                        </h6>
                                        <li>
                                            <button type="button"  >
                                                <p className="dropdown-item text-base py-1 px-4 font-medium block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100 cursor-pointer">
                                                    <span><i className="icon icon-delete_forever text-xl mr-4" ></i></span>
                                                    <span>Delete Program</span>
                                                </p>
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </td>


                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination page={page} setPage={setPage} totalPage={totalPage} />
        </div>
    );
}

export default OrderTable;

