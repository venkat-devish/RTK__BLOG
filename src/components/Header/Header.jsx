import React from "react";
import "./Header.scss";
import { Link } from "react-router-dom";
import user from "../../images/user.png";

const Header = () => {
  return (
    <div className="header">
      <Link to="/">
        <div className="logo">JuTs Watch</div>
      </Link>
      <div className="user-img">
        <img src={user} alt="user-logo" />
      </div>
    </div>
  );
};

export default Header;
