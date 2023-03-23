import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import TaskTable from "../../components/datatable/tasks/TaskTable"
import { taskColumns, taskColumnTech, data } from "../../formSource";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import TaskTableTech from "../../components/datatable/tasks/TaskTableTech";

const ListTask = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        {currentUser.role_ID === 3 && (
          <TaskTableTech taskColumns={taskColumnTech} data={data} />
        )}
        {currentUser.role_ID === 2 && (
          <TaskTable taskColumns={taskColumns} data={data} />
        )}
      </div>
    </div>
  );
}

export default ListTask