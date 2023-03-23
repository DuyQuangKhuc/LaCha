import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="user" />
          <Widget type="product" />
          {/* <Widget type="order" />
          <Widget type="earning" /> */}
        </div>
        {/* <div className="charts">
          <Featured />
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div> */}
        <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <iframe className="absolute top-0  w-screen h-screen object-cover bg-black bg-opacity-50" src="https://lookerstudio.google.com/embed/reporting/56f61380-d272-40c1-b41c-517bdc2d446d/page/ggaJD" ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
