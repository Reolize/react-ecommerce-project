import React from 'react';

const Banner = () => {
  return (
    <div style={styles.banner}>
      <h2>Special Promotion: 20% off on all items!</h2>
    </div>
  );
};

const styles = {
  banner: {
    width: '100%', // Full width
    padding: '20px',
    backgroundColor: '#ffcc00',
    textAlign: 'center',
    position: 'relative', // Ensure it's positioned correctly
    top: 0,
    left: 0,
    right: 0,
  },
};

export default Banner;
