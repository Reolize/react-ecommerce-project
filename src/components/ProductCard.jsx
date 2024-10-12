import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div style={styles.card}>
      <h3>{product.name}</h3>
      <p>{product.price}</p>
      <Link to={`/products/${product.id}`} style={styles.link}>View Details</Link>
    </div>
  );
};

const styles = {
  card: {
    border: '1px solid #000000',
    padding: '20px',
    textAlign: 'center',
    transition: 'transform 0.3s',
  },
  link: {
    display: 'inline-block',
    marginTop: '10px',
    color: '#000000',
    textDecoration: 'none',
    border: '1px solid #000000',
    padding: '5px 10px',
  },
  linkHover: {
    backgroundColor: '#000000',
    color: '#ffffff',
  }
};

export default ProductCard;
