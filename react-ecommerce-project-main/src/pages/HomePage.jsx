import React from 'react';
import ProductCard from '../components/ProductCard';
import Banner from '../components/Banner'; // Adjust the path as necessary
import ImageSlider from '../components/ImageSlider';

const HomePage = () => {
  const featuredProducts = [
    { id: 1, name: 'Product 1', price: '$10' },
    { id: 2, name: 'Product 2', price: '$20' },
  ];

  return (
    <div className="container2">
      <ImageSlider />
      <Banner />
      <h1 style={{ textAlign: 'center' }}>Featured Products</h1>
      <div className="product-grid">
        {featuredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
    </div>
  );
};

export default HomePage;
