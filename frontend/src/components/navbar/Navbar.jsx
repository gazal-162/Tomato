import React, { useState, useContext } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");

  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
  };

  return (
    <div className="navbar">
      {/* Logo */}
      <Link to="/">
        <img className="logo" src={assets.logo} alt="Logo" />
      </Link>

      {/* Navbar Menu */}
      <ul className="navbar-menu">
        <li>
          <Link
            to="/"
            onClick={() => setMenu("home")}
            className={menu === "home" ? "active" : ""}
          >
            Home
          </Link>
        </li>

        <li>
          <a
            href="#explore-menu"
            onClick={() => setMenu("menu")}
            className={menu === "menu" ? "active" : ""}
          >
            Menu
          </a>
        </li>

        {/* My Orders */}
        {token && (
          <li>
            <Link
              to="/myorders"
              onClick={() => setMenu("orders")}
              className={menu === "orders" ? "active" : ""}
            >
              My Orders
            </Link>
          </li>
        )}

        <li>
          <a
            href="#app-download"
            onClick={() => setMenu("mobile-app")}
            className={menu === "mobile-app" ? "active" : ""}
          >
            Mobile App
          </a>
        </li>

        <li>
          <a
            href="#footer"
            onClick={() => setMenu("contact-us")}
            className={menu === "contact-us" ? "active" : ""}
          >
            Contact Us
          </a>
        </li>
      </ul>

      {/* Right Side */}
      <div className="navbar-right">
        <img src={assets.search_icon} alt="Search" />

        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="Basket" />
          </Link>

          {getTotalCartAmount() > 0 && (
            <span className="cart-count">
              {Object.values(
                JSON.parse(localStorage.getItem("cartItems") || "{}"),
              ).reduce((a, b) => a + b, 0)}
            </span>
          )}
        </div>

        {!token ? (
          <button onClick={() => setShowLogin(true)}>Sign In</button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="Profile" />

            <ul className="nav-profile-dropdown">
              <li>
                <Link to="/myorders">📦 My Orders</Link>
              </li>

              <hr />

              <li onClick={logout}>🚪 Logout</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
