import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  return (

    <nav className="premium-navbar">

      <div className="premium-navbar-container">

        {/* ================= LOGO ================= */}

        <div
          className="premium-navbar-logo"
          onClick={() => navigate("/")}
        >

          <div className="premium-logo-image">

            <img
              src="/reallogo.jpeg"
              alt="Silva Tech Computers"
            />

          </div>

          <div className="premium-logo-text">

            <h1>
              <span className="black-text">SILVA</span>
              <span className="blue-text">TECH</span>
              <span className="blue-text">COMPUTERS</span>
            </h1>

            <p>
              YOUR VISION OUR TECH
            </p>

          </div>
        </div>

        {/* ================= HAMBURGER ================= */}

        <div
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </div>

        {/* ================= NAV LINKS ================= */}

        <div className={`premium-navbar-links ${menuOpen ? "active" : ""}`}>

          <span onClick={() => navigate("/desktops")}>
            Desktops
          </span>

          <span onClick={() => navigate("/laptops")}>
            Laptops
          </span>

          <span onClick={() => navigate("/products/apple")}>
            Apple
          </span>

          <span onClick={() => navigate("/accessories")}>
            Accessories
          </span>

          <span onClick={() => navigate("/services")}>
            Services
          </span>

          <span onClick={() => navigate("/about")}>
            About
          </span>

          <span onClick={() => navigate("/contact")}>
            Contact
          </span>

        </div>

        {/* ================= CART ================= */}

        <button
          className="premium-cart-btn"
          onClick={() => navigate("/cart")}
        >
          🛒 Cart
        </button>

      </div>

    </nav>

  );
}

export default Navbar;