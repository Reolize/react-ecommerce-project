import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = ({ loggedIn, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout(); // Call the onLogout function passed as a prop
    navigate("/"); // Navigate to home after logout
  };

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
            <Link
              to={loggedIn ? "/" : "/login"}
              onClick={loggedIn ? handleLogout : null} // Log out when clicked if logged in
              style={styles.link}
            >
              {loggedIn ? "Logout" : "Login"}
            </Link>
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
