import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <h2>Redux Toolkit Blog</h2>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/post">New Post</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
