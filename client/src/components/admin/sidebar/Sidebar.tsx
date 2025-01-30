import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
// import LocalShippingIcon from "@mui/icons-material/LocalShipping";
// import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
// import InsertChartIcon from "@mui/icons-material/InsertChart";
// import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
// import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
// import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
// import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
// import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

import { Link } from "react-router-dom";

import { useTheme } from "@/common/general.store";
const Sidebar: React.FC = () => {
  const setTheme = useTheme((store) => store.setTheme);

  return (
    <div className="adminSidebar">
      <div className="adminTop">
        <Link to="/admin/home" style={{ textDecoration: "none" }}>
          <span className="adminLogo">JK Rooms</span>
        </Link>
      </div>
      <hr />
      <div className="adminCenter">
        <ul>
          <p className="adminTitle">MAIN</p>
          <li>
            <DashboardIcon className="adminIcon" />
            <span>Dashboard</span>
          </li>
          <p className="adminTitle">LISTS</p>

          <Link to="/admin/userslist" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="adminIcon" />
              <span>Users</span>
            </li>
          </Link>

          <Link to="/products" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="adminIcon" />
              <span>Hotels</span>
            </li>
          </Link>
          <li>
            <ExitToAppIcon className="adminIcon" />
            <button
              className="logoutButn"
              onClick={() => console.log("logOut")}
            >
              <span>Logout</span>
            </button>
          </li>
        </ul>
      </div>
      <div className="adminBottom">
        <div className="adminColorOption" onClick={() => setTheme(false)}></div>
        <div className="adminColorOption" onClick={() => setTheme(true)}></div>
      </div>
    </div>
  );
};

export default Sidebar;
