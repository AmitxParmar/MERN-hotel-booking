import './home.scss'

import Navbar from "@/components/admin/navbar/Navbar";
import Sidebar from "@/components/admin/sidebar/Sidebar";
import Widget from "@/components/admin/widget/Widget";
import Featured from "@/components/admin/featured/Featured";
import Table from "@/components/admin/table/Table";
import Chart from "@/components/admin/chart/Chart";

const AdminHome = () => {
  
  return (
    <div className="adminHome">
      <Sidebar />
      <div className="adminHomeContainer">
        <Navbar />
        <div className="adminWidgets">
          <Widget type="user" />
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" />
        </div>
        <div className="adminCharts">
          <Featured />
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div>
        <div className="adminListContainer">
          <div className="adminListTitle">Latest Transactions</div>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
