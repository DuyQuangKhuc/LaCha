import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import PlantTable from "../../components/datatable/plant/PlantTable"


const ListProduct = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <PlantTable />
      </div>
    </div>
  )
}

export default ListProduct