import React, { useEffect, useState } from "react";
import styles from "../orders/Table.css";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { useTable, usePagination } from "react-table";
import axios from "axios";
import moment from "moment";

import {
    SortIcon,
} from "../../Icons/Icon";
import styled from "styled-components";
const cx = classNames.bind(styles);



function TaskTable({ taskColumns }) {
    const LabelAct = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2f903f;
  color: #fff;
  padding: 0 !important;
  margin: auto;
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
  margin: auto;
  font-weight: 400 !important;
  padding: 5px 15px;
  border-radius: 50px;
  padding-top: 6px;
  width: 72px;
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
width: 120px;
height: 27px;
`;
    const [TaskList, setTaskList] = useState(null);
    const token = localStorage.getItem("accessToken");
    useEffect(() => {
        axios({
            method: "GET",
            url: `https://lacha.s2tek.net/api/Request`,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                setTaskList(res.data);

            })
            .catch((err) => {
                console.error(err);
            });
        // eslint-disable-next-line
    }, []);
    return (
        <div className={cx("wrapper")}>
            <table className={cx("tables")}>
                <thead className={cx("table-header")}>
                    <tr>
                        {taskColumns.map((item, index) => (
                            <th key={index}>
                                {item.Header}

                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className={cx("table-body")}>
                    {TaskList && TaskList.map((item, index) => (
                        <tr key={index}>
                            <td>{item.id}</td>
                            <td>{item.description}</td>
                            <td>{item.status = "1" ? <LabelDra>Đang chờ</LabelDra> :
                                item.status = "2" ? <LabelAct >Đang xử lý</LabelAct> :
                                    item.status = "3" ? <LabelDr >Đã hoàn thành</LabelDr> : null}
                            </td>
                            {/* <td >
                                <Link to={`/products/${item.gardenPackageId}`} >
                                    {item.gardenPackage.namePack}
                                </Link>
                            </td> */}
                            <td>{item.gardenId}</td>
                            <td>
                                <LabelDr >Change Status</LabelDr>
                            </td>
                            <td>
                                <LabelAct >
                                    <Link to={`/results`} >
                                    <LabelAct style={{ marginRight: '30px' }}>Result</LabelAct>
                                    </Link>
                                </LabelAct>

                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
}

export default TaskTable;

