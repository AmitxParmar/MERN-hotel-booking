import Navbar from "@/components/admin/navbar/Navbar";
import Sidebar from "@/components/admin/sidebar/Sidebar";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminHome = () => {
  const navigate = useNavigate();
  return (
    <div className="adminHome">
      <Sidebar />
      <div className="adminHomeContainer">
        <Navbar />
      </div>
    </div>
  );
};

export default AdminHome;
