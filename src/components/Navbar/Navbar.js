import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import SearchBar from '../Searchbar/SearchBar';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo"><Link to="/">Trends 4 You</Link></div>
      <SearchBar />
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/deals">Deals</Link></li>
        <li><Link to="/combo">ComboOff</Link></li>
        <li><Link to="/cart">Cart</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
