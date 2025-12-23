import { MdHome, MdWork, MdLogout } from "react-icons/md";
import { Link, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

import "./index.css";
const Navbar = () => {
  const logout = () => {
    Cookies.remove("jwt-token");
    <Navigate to="/login" />;
  };

  return (
    <div className="navbar-con">
      <Link to="/" className="link_logo">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          className="logo"
        />
      </Link>

      <div className="nav-con">
        <Link to="/">
          <MdHome size={35} color="white" />
        </Link>
        <Link to="/jobs">
          <MdWork size={35} color="white" />
        </Link>
        <Link to="/login" onClick={logout}>
          <MdLogout size={35} color="white" />
        </Link>
      </div>

      <div className="tab-con-nav">
        <Link to="/" className="features-names">
          Home
        </Link>
        <Link to="/jobs" className="features-names">
          Jobs
        </Link>
      </div>

      <Link to="/login" className="button-logout" onClick={logout}>
        Logout
      </Link>
    </div>
  );
};

export default Navbar;
