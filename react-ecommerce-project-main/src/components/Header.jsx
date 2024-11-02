import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = ({ loggedIn, onLogin, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout(); // Call the onLogout function passed as a prop
    navigate("/"); // Navigate to login after logout
  };

  return (
    <header style={styles.header}>
      <nav>
        <ul style={styles.navList}>
          <li style={{ ...styles.navItem, textAlign: "center" }}>
            <Link to="/" style={styles.link}>Home</Link>
          </li>
          <li style={{ ...styles.navItem, textAlign: "center" }}>
            <Link to="/products" style={styles.link}>Products</Link>
          </li>
          <li style={{ ...styles.navItem, textAlign: "center" }}>
            <Link to="/cart" style={styles.link}>Cart</Link>
          </li>
          <li style={{ ...styles.navItem, textAlign: "right", marginLeft: '500%' }}>
            <Link to="/login2" onClick={loggedIn ? handleLogout : () => navigate("/login")} style={styles.link}>
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
    alignItems: 'center', // Ensure vertical centering
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
