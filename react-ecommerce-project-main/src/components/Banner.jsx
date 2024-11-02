import React from 'react';

const Banner = () => {
  return (
    <div style={styles.banner}>
      <div style={styles.scrollContainer}>
        <h2 style={styles.scrollText}>Special Promotion: Buy any item, Free Shipping cost only in November!!</h2>
      </div>
    </div>
  );
};

const styles = {
  banner: {
    width: '100%',
    padding: '20px',
    backgroundColor: '#ffcc00',
    overflow: 'hidden',
  },
  scrollContainer: {
    overflow: 'hidden',
    width: '100%',
  },
  scrollText: {
    display: 'inline-block',
    whiteSpace: 'nowrap',
    position: 'relative',
    animation: 'scroll 15s linear infinite',
  },
};

// CSS keyframes
const keyframes = `
@keyframes scroll {
  from {
    transform: translateX(100vw);
  }
  to {
    transform: translateX(-100%);
  }
}
`;

// Inject keyframes
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(keyframes, styleSheet.cssRules.length);


export default Banner;
