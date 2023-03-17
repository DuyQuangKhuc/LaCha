import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import axios from "axios";

const List = () => {
  // const rows = [
  //   {
  //     id: 1143155,
  //     product: "Acer Nitro 5",
  //     img: "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg",
  //     customer: "John Smith",
  //     date: "1 March",
  //     amount: 785,
  //     method: "Cash on Delivery",
  //     status: "Approved",
  //   },
  //   {
  //     id: 2235235,
  //     product: "Playstation 5",
  //     img: "https://m.media-amazon.com/images/I/31JaiPXYI8L._AC_UY327_FMwebp_QL65_.jpg",
  //     customer: "Michael Doe",
  //     date: "1 March",
  //     amount: 900,
  //     method: "Online Payment",
  //     status: "Pending",
  //   },
  //   {
  //     id: 2342353,
  //     product: "Redragon S101",
  //     img: "https://m.media-amazon.com/images/I/71kr3WAj1FL._AC_UY327_FMwebp_QL65_.jpg",
  //     customer: "John Smith",
  //     date: "1 March",
  //     amount: 35,
  //     method: "Cash on Delivery",
  //     status: "Pending",
  //   },
  //   {
  //     id: 2357741,
  //     product: "Razer Blade 15",
  //     img: "https://m.media-amazon.com/images/I/71wF7YDIQkL._AC_UY327_FMwebp_QL65_.jpg",
  //     customer: "Jane Smith",
  //     date: "1 March",
  //     amount: 920,
  //     method: "Online",
  //     status: "Approved",
  //   },
  //   {
  //     id: 2342355,
  //     product: "ASUS ROG Strix",
  //     img: "https://m.media-amazon.com/images/I/81hH5vK-MCL._AC_UY327_FMwebp_QL65_.jpg",
  //     customer: "Harold Carol",
  //     date: "1 March",
  //     amount: 2000,
  //     method: "Online",
  //     status: "Pending",
  //   },
  const [RoomList, setRoomList] = useState(null);

  const token = localStorage.getItem("accessToken");
  useEffect(() => {
    axios({
      method: "GET",
      url: `https://lacha.s2tek.net/api/Room`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setRoomList(res.data);
        // setTotalPage(res.data.pagination.totalPage)
      })
      .catch((err) => {
        console.error(err);
      });
    // eslint-disable-next-line
  }, []);

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell "><span className="font-bold">ID</span></TableCell>
            <TableCell className="tableCell"><span className="font-bold">Room</span></TableCell>
            <TableCell className="tableCell"><span className="font-bold">Customer</span></TableCell>
            <TableCell className="tableCell"><span className="font-bold">Phone</span></TableCell>
            <TableCell className="tableCell"><span className="font-bold">Gmail</span></TableCell>
            <TableCell className="tableCell"><span className="font-bold">Building</span></TableCell>
            {/* <TableCell className="tableCell">Status</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {RoomList && RoomList.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="tableCell">{item.id}</TableCell>
              {/* <TableCell className="tableCell">
                <div className="cellWrapper">
                  <img src={item.img} alt="" className="image" />
                  {item.product}
                </div>
              </TableCell> */}
              <TableCell className="tableCell">{item.roomNumber}</TableCell>
              <TableCell className="tableCell">{item.customer.fullName}</TableCell>
              <TableCell className="tableCell">{item.customer.phone}</TableCell>
              <TableCell className="tableCell">{item.customer.gmail}</TableCell>
              <TableCell className="tableCell">{item.building.nameBuilding}</TableCell>
              {/* <TableCell className="tableCell">
                <span className={`status ${item.status}`}>{item.status}</span>
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
