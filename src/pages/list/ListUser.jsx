import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import DataTable from "../../components/datatable/user/DataTable"
import { customers } from "../../formSource";

const ListUser = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <DataTable customers={customers} />
      </div>
    </div>
  )
}

export default ListUser