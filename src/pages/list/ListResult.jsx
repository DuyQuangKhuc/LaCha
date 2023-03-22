import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"

const ListResult= () => {
    return (
        <div className="list">
          <Sidebar/>
          <div className="listContainer">
            <Navbar/>
            {/* <TaskTable taskColumns={taskColumns} data={data}/> */}
            <h5>This is Result Page</h5>
          </div>
        </div>
      )
}

export default ListResult;