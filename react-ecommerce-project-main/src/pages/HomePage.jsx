import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HomePage.css'; 
import Banner from '../components/Banner'; 
import ImageSlider from '../components/ImageSlider';

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:4000/products/fetch');
        const products = response.data || [];
        
        const productsWithDiscount = products.map(product => {
          const prevPriceNum = parseFloat(product.prevprice.replace(/[$,]/g, '')) || 0;
          const newPriceNum = parseFloat(product.newprice.replace(/[$,]/g, '')) || 0;
          const discountPercentage = prevPriceNum > 0 ? ((prevPriceNum - newPriceNum) / prevPriceNum) * 100 : 0;
          
          return { ...product, discountPercentage };
        });

        const sortedProducts = productsWithDiscount.sort((a, b) => b.discountPercentage - a.discountPercentage).slice(0, 5);
        setFeaturedProducts(sortedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    // Instead of adding to cart, navigate to products page with the search query
    const searchQuery = product.title; // You can customize this to what you want to search
    window.location.href = `/products?query=${encodeURIComponent(searchQuery)}`;
  };

  return (
    <div className="homepage">
      <ImageSlider />
      <Banner />
      <h1 className='text'>Top 5 Products with Highest Discounts</h1>
      <div className="product-grid">
        {featuredProducts.map((product) => (
          <div className="product-card" key={product._id}>
            <img src={product.img} alt={product.title} className="product-image" />
            <h2 className="product-title">{product.title}</h2>
            <p className="product-price">
              Previous Price: <span className="prev-price">${product.prevprice}</span>
            </p>
            <p className="product-price">
              New Price: <span className="new-price">${product.newprice}</span>
            </p>
            <p className="discount-percentage">
              {product.discountPercentage.toFixed(2)}% off
            </p>
            <button className="add-to-cart-btn" onClick={() => handleAddToCart(product)}>
              Shop Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
