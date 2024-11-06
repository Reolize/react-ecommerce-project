import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";

const Header = ({ isLoggedIn }) => {

  return (
    <header style={styles.header}>
      <nav>
        <ul style={styles.navList}>
          <li style={styles.navItem}>
            <Link to="/" style={styles.link}>Home</Link>
          </li>
          <li style={styles.navItem}>
            <Link to="/products" style={styles.link}>Products</Link>
          </li>
          <li style={styles.navItem}>
            <Link to="/cart" style={styles.link}>Cart</Link>
          </li>
          <li style={{ ...styles.navItem, marginLeft: 'auto' }}>
            <button onClick={isLoggedIn ? handleLogout : () => window.location.href = '/login'}>
              {isLoggedIn ? 'Logout' : 'Login'}
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

const styles = {
  header: {
    padding: '10px 0',
    backgroundColor: '#000000',
    color: '#ffffff',
  },
  navList: {
    listStyle: 'none',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navItem: {
    margin: '0 15px',
  },
  link: {
    color: '#ffffff',
    textDecoration: 'none',
    fontSize: '18px',
  },
};

export default Header;
