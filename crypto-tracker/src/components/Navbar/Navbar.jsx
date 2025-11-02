import React, { useContext } from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import arrow_icon from "../../assets/arrow_icon.png";
import { CoinContext } from "../../context/CoinContext"; // ✅ ambil Context, bukan Provider

const Navbar = () => {
  const { setCurrency } = useContext(CoinContext); // ✅ pakai useContext, bukan use()

  const currencyHandler = (event) => {
    switch (event.target.value) {
      case "usd":
        setCurrency({ name: "usd", symbol: "$" });
        break;
      case "euro":
        setCurrency({ name: "euro", symbol: "€" });
        break;
      case "idr":
        setCurrency({ name: "idr", symbol: "Rp" });
        break;
      default:
        setCurrency({ name: "usd", symbol: "$" });
        break;
    }
  };

  return (
    <div className="navbar">
      <img src={logo} alt="logo" className="logo" />
      <ul>
        <li>Home</li>
        <li>Features</li>
        <li>Pricing</li>
        <li>Blog</li>
      </ul>
      <div className="nav-right">
        <select onChange={currencyHandler}>
          <option value="usd">USD</option>
          <option value="euro">EURO</option>
          <option value="idr">IDR</option>
        </select>
        <button>
          Sign Up <img src={arrow_icon} alt="arrow" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
