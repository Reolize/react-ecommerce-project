import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p>&copy; 2024 Your E-Commerce Website</p>
    </footer>
  );
};

const styles = {
  footer: {
    padding: '20px 0',
    backgroundColor: '#000000',
    color: '#ffffff',
    textAlign: 'center',
    marginTop: '30px',
  },
};

export default Footer;
