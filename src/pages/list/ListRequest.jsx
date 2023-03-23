import "./list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import TaskTable from "../../components/datatable/tasks/TaskTable";
import { taskColumns, taskColumnTech, data } from "../../formSource";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const ListRequest = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <TaskTable taskColumns={taskColumns} isAd={true} data={data} />
      </div>
    </div>
  );
};

export default ListRequest;
