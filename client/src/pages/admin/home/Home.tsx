import { useNavigate } from "react-router-dom";

import Navbar from "@/components/admin/navbar/Navbar";
import Sidebar from "@/components/admin/sidebar/Sidebar";
import Widget from "@/components/admin/widget/Widget";
import Featured from "@/components/admin/featured/Featured";

const AdminHome = () => {
  const navigate = useNavigate();
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="user" />
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" />
        </div>
        <div className="charts">
          <Featured />
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
