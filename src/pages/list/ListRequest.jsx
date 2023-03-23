import "./list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import TaskTable from "../../components/datatable/tasks/TaskTable";
import { taskColumns, data } from "../../formSource";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const ListRequest = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        {currentUser.roleId === 3 ? (
          <TaskTable taskColumns={taskColumns} isAd={true} data={data} />
        ) : (
          <TaskTable taskColumns={taskColumns} data={data} />
        )}
      </div>
    </div>
  );
};

export default ListRequest;
