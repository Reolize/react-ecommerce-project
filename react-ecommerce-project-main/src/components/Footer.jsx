import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p>&copy; E-Commerce 6430300200's PROJECT Website</p>
    </footer>
  );
};

const styles = {
  footer: {
    padding: '20px 0',
    backgroundColor: '#000000',
    color: '#ffffff',
    textAlign: 'center',
    position: 'fixed', // Fixes the footer at the bottom
    bottom: 0,         // Aligns to the bottom of the viewport
    left: 0,
    right: 0,
    zIndex: 10,        // Corrected to camelCase
  },
};


export default Footer;