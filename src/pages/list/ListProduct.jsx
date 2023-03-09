import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import ProductTable from "../../components/datatable/product/ProductTable"


const ListProduct = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <ProductTable />
      </div>
    </div>
  )
}

export default ListProduct