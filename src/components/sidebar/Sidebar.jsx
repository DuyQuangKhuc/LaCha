import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import GrassIcon from '@mui/icons-material/Grass';
import InsertChartIcon from "@mui/icons-material/InsertChart";
import AssignmentIcon from '@mui/icons-material/Assignment';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Sidebar = () => {

  const { dispatch, currentUser } = useContext(AuthContext);
  const logout = () => {
    localStorage.clear();

    dispatch({ type: "LOGOUT" })
  }
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">LaCha</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          {currentUser.role_ID === 3 || 2 && (
            <>
              <p className="title">MAIN</p>
              <li>
                <Link to="/" style={{ textDecoration: "none" }}>
                  <DashboardIcon className="icon" />
                  <span>Dashboard</span>
                </Link>
              </li>
            </>
          )}
          {currentUser.role_ID === 3 && (
            <>
              <p className="title">PRODUCTS</p>
              <Link to="/products" style={{ textDecoration: "none" }}>
                <li>
                  <StoreIcon className="icon" />
                  <span>Garden</span>
                </li>
              </Link>
              <Link to="/plants" style={{ textDecoration: "none" }}>
                <li>
                  <GrassIcon className="icon" />
                  <span>Plants</span>
                </li>
              </Link>
            </>
          )}

          {currentUser.role_ID === 3 && (
            <>
              <p className="title">LISTS</p>
              <Link to="/users" style={{ textDecoration: "none" }}>
                <li>
                  <PersonOutlineIcon className="icon" />
                  <span>Users</span>
                </li>
              </Link>
            </>
          )}

          {currentUser.role_ID === 3 && (
            <>
              <Link to="/orders" style={{ textDecoration: "none" }}>
                <li>
                  <CreditCardIcon className="icon" />
                  <span>Orders</span>
                </li>
              </Link>
            </>
          )}

          {/* {currentUser.role_ID === 2 && (
            <>
              <p className="title">SERVICE TECH</p>
              <Link to="/request" style={{ textDecoration: "none" }}>
                <li>
                  <AssignmentIcon className="icon" />
                  <span>Request</span>
                </li>
              </Link>
            </>
          )} */}

          {currentUser.role_ID === 3 || 2 && (
            <>
              <p className="title">SERVICE ADMIN</p>
            </>
          )}
          {currentUser.role_ID === 3 && (
            <>
              <Link to="/request" style={{ textDecoration: "none" }}>
                <li>
                  <AssignmentIcon className="icon" />
                  <span>Request</span>
                </li>
              </Link>
            </>
          )}
          {currentUser.role_ID === 3 || 2 && (
            <>
              <Link to="/tasks" style={{ textDecoration: "none" }}>
                <li>
                  <AssignmentTurnedInIcon className="icon" />
                  <span>Tasks</span>
                </li>
              </Link>
            </>
          )}
          <p className="title">USER</p>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Profile</span>
          </li>
          <li onClick={logout}>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
