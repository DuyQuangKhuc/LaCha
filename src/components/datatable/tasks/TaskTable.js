import React, { useContext, useEffect, useState } from "react";
import styles from "../orders/Table.css";
import classNames from "classnames/bind";
import { Link, useParams } from "react-router-dom";
import { useTable, usePagination } from "react-table";
import axios from "axios";
import moment from "moment";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { SortIcon } from "../../Icons/Icon";
import styled from "styled-components";
import Swal from "sweetalert2";
import { AuthContext } from "../../../context/AuthContext";
const cx = classNames.bind(styles);

function TaskTable({ taskColumns, isAd }) {
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
    width: 120px;
    height: 27px;
  `;
  const LabelDrc = styled.label`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #3c78a8;
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
  const { taskId } = useParams();
  const [TaskList, setTaskList] = useState(null);
  const token = localStorage.getItem("accessToken");
  const [TechList, setTechList] = useState(null);
  const [load, setLoad] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const [state, setState] = useState({
    id: taskId,
    status: "0",
  });
  const handleChange = (event) => {
    console.log("hihi", event.target);
    const { name, value } = event.target;

    setState((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  const [errors, setErrors] = useState({
    status: "",
  });

  const handleSubmit = async (event, id) => {
    event.preventDefault();
    if (validate()) {
      const formData1 = new FormData();
      const token = localStorage.getItem("accessToken");
      const formData = new FormData();

      //   formData.append("id", item.id);
      //   formData.append("status", item.status);

      axios({
        method: "PUT",
        url: `https://lacha.s2tek.net/api/TreeCare/editStatus/${id}`,
        data: {
          status: parseInt(state.status),
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          console.log(response.data);
          setLoad(!load);
          Swal.fire({
            position: "center",
            icon: "success",
            text: `Update status ${taskId} succcess`,
            showConfirmButton: false,
            timer: 1500,
          });
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
    // const errorsCopy = { ...errors };
    // if (!errors.status) {
    //   errorsCopy.status = "Please select Status";
    //   isValid = false;
    // }

    // setErrors(errorsCopy);
    return isValid;
  };
  useEffect(() => {
    axios({
      method: "GET",
      url: `https://lacha.s2tek.net/api/Technical`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        const y = res.data.filter((x) => x.gmail === currentUser.email);
        setTechList(y[0]);
      })
      .catch((err) => {
        console.error(err);
      });
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    axios({
      method: "GET",
      url: isAd
        ? "https://lacha.s2tek.net/api/TreeCare"
        : `https://lacha.s2tek.net/api/TreeCare/search/UserID?userID=${TechList?.id}`,
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
  }, [TechList, load]);
  return (
    <div className={cx("wrapper")}>
      <table className={cx("tables")}>
        <thead className={cx("table-header")}>
          <tr>
            {taskColumns.map((item, index) => (
              <th key={index}>{item.Header}</th>
            ))}
          </tr>
        </thead>
        <tbody className={cx("table-body")}>
          {TaskList &&
            TaskList.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.requestId}</td>
                <td>{item.userId}</td>
                <td>
                  {item.status == "1" ? (
                    <LabelDra>Đang chờ</LabelDra>
                  ) : item.status == "2" ? (
                    <LabelAct>Đang xử lý</LabelAct>
                  ) : item.status == "3" ? (
                    <LabelDr>Đã hoàn thành</LabelDr>
                  ) : null}
                </td>
                {/* <td >
                                <Link to={`/products/${item.gardenPackageId}`} >
                                    {item.gardenPackage.namePack}
                                </Link>
                            </td> */}
                {/* <td>{item.gardenId}</td> */}
                {/* <td>
                                <Popup trigger=
                                    {<LabelDrc ><button type="button" style={{ paddingLeft: "20px", paddingRight: "20px" }} >
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
                                                            <option value="1">Đang chờ</option>
                                                            <option value="2">Đang xử lý</option>
                                                            <option value="3">Đã hoàn thành</option>
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
                            </td> */}
                <td>
                  <Popup
                    trigger={
                      <LabelDrc>
                        <button
                          type="button"
                          style={{ paddingLeft: "20px", paddingRight: "20px" }}
                        >
                          Update
                        </button>
                      </LabelDrc>
                    }
                    modal
                    nested
                  >
                    {(close) => (
                      <div className="modal">
                        <form onSubmit={(e) => handleSubmit(e, item.id)}>
                          <div
                            className="content"
                            style={{ width: "50%", margin: "auto" }}
                          >
                            ▷ Status
                            <select
                              className={`block w-full px-4 py-2 mt-2 text-green-700 bg-white border rounded-md 
                                                            focus:border-green-400 focus:ring-green-300 focus:outline-none 
                                                            focus:ring focus:ring-opacity-40 ${
                                                              errors.status
                                                                ? "border-red-500"
                                                                : ""
                                                            }`}
                              id="status"
                              name="status"
                              value={
                                state.status !== "0"
                                  ? state.status
                                  : item.status
                              }
                              onChange={handleChange}
                            >
                              <option value="0">--Please Select--</option>
                              <option value="1">Đang chờ</option>
                              <option value="2">Đang xử lý</option>
                              <option value="3">Đã hoàn thành</option>
                            </select>
                          </div>
                          {errors.status && (
                            <p className="text-red-500">{errors.status}</p>
                          )}

                          <div style={{ display: "flex", marginTop: "90px" }}>
                            <LabelDrx>
                              <button type="submit">Change</button>
                            </LabelDrx>
                            <LabelDz>
                              <button onClick={() => close()}>Cancel</button>
                            </LabelDz>
                          </div>
                        </form>
                      </div>
                    )}
                  </Popup>
                </td>
                {/* <td>
                  <LabelAct>
                    <Link to={`/results`}>
                      <LabelAct style={{ marginRight: "30px" }}>
                        Result
                      </LabelAct>
                    </Link>
                  </LabelAct>
                </td> */}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default TaskTable;
