import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import TaskTable from "../../components/datatable/tasks/TaskTable"
import { taskColumns, data } from "../../formSource";

const ListTask = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <TaskTable taskColumns={taskColumns} data={data}/>
      </div>
    </div>
  )
}

export default ListTask