import Navbar from "@/components/admin/navbar/Navbar";
import Sidebar from "@/components/admin/sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Widget from "@/components/admin/widget/Widget";

const AdminHome = () => {
  /*  const getData = async (): Promise<void> => {
    await axios
      .get("https://pokeapi.co/api/v2/pokemon/ditto")
      .then((data) => console.log(data, "pokemon"));
  };

  */ const navigate = useNavigate();
  return (
    <div className="home">
      {/* <button onClick={() => void getData()}>getData</button> */}
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="user"/>
          <Widget type="order"/>
          <Widget type="earning"/>
          <Widget type="balance"/>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
