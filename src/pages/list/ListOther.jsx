import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import OrderTable from "../../components/datatable/orders/OrderTable"
import { columns, data } from "../../formSource";

const ListOther = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <OrderTable columns={columns} data={data}/>
      </div>
    </div>
  )
}

export default ListOther