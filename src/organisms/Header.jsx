import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <Link to="/">
        <h2 className="header--link">RTK BLOG</h2>
      </Link>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/post">Add Post</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
