import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import UserTable from "../../components/datatable/user/UserTable"
import { userColumns , data1} from "../../formSource";

const ListUser = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <UserTable userColumns = {userColumns} data1={data1}/>
      </div>
    </div>
  )
}

export default ListUser