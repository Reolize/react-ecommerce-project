import { useState } from "react";
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Navigation from "./Navigation/Nav";
import Navigationnosearch from "./Navigation/Navnosearch";
import Products from "./Products/Products";
import products from "./db/data";
import Recommended from "./Recommended/Recommended";
import Sidebars from "./Sidebar/Sidebars";
import Card from "./components/Card";

import './styles.css';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  // ----------- Input Filter -----------
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState([])

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const filteredItems = products.filter(
    (product) => product.title.toLowerCase().indexOf(query.toLowerCase()) !== -1
  );

  // ----------- Radio Filtering -----------
  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  // ------------ Button Filtering -----------
  const handleClick = (event) => {
    setSelectedCategory(event.target.value);
  };

  const addToCart = (product) => {
    setCart((prevCart) => {
      console.log("Current cart:", prevCart);
      if (!Array.isArray(prevCart)) {
        console.error("prevCart is not an array:", prevCart);
        return [product];
      }
      return [...prevCart, product];
    });
    toast.success(`${product.title} has been added to your cart!`);
  };

  const updateQuantity = (index, change) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart];
      const newQuantity = updatedCart[index].quantity + change;

      // Ensure quantity doesn't go below 1
      if (newQuantity > 0) {
        updatedCart[index].quantity = newQuantity;
      }

      return updatedCart;
    });
  };

  function filteredData(products, selected, query) {
    let filteredProducts = products;

    // Filtering Input Items
    if (query) {
      filteredProducts = filteredItems;
    }

    // Applying selected filter
    if (selected) {
      filteredProducts = filteredProducts.filter(
        ({ category, color, company, newPrice, title }) =>
          category === selected ||
          color === selected ||
          company === selected ||
          newPrice === selected ||
          title === selected
      );
    }

    return filteredProducts.map(
      ({ img, title, star, reviews, prevPrice, newPrice, quantity }) => (
        <Card
          key={Math.random()}
          img={img}
          title={title}
          star={star}
          reviews={reviews}
          prevPrice={prevPrice}
          newPrice={newPrice}
          addToCart={() => addToCart({ img, title, star, reviews, prevPrice, newPrice ,quantity })}
        />
      )
    );
  }

  const result = filteredData(products, selectedCategory, query);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<><Sidebars handleChange={handleChange} />
        <Navigation query={query} handleInputChange={handleInputChange} />
        <Recommended handleClick={handleClick} />
        <Products result={result} /></>} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/cart" element={
        <>
        <Navigationnosearch />
        <CartPage cart={cart} updateQuantity={updateQuantity} />
        
        </>
        } />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
      <ToastContainer />
      <Footer />
    </Router>
  );
}

export default App;
