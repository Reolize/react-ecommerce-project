import { useState, useEffect } from "react";
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
import products from "./pages/Warehouse";
import Recommended from "./Recommended/Recommended";
import Sidebars from "./Sidebar/Sidebars";
import Card from "./components/Card";
import Cards from "./pages/Cards";
import Register from './pages/Register';
import Login from './pages/Login';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import AuthButtons from "./components/LoginCheck";
import { useCookies } from "react-cookie";
import './styles.css';
import Warehouse from "./pages/Warehouse";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);

  const logOut = () => {
    removeCookie("jwt");
    setLoggedIn(false);
    navigate("/login");
  };

  useEffect(() => {
    const verifyUser = async () => {
      if (cookies.jwt) {
        try {
          const { data } = await axios.post("http://localhost:4000", {}, { withCredentials: true });
          if (data.status) {
            setLoggedIn(true);
            toast(`Hi ${data.user} 🦄`, { theme: "dark" });
          } else {
            removeCookie("jwt");
            setLoggedIn(false);
          }
        } catch (error) {
          console.error("Error verifying user:", error);
          removeCookie("jwt");
          setLoggedIn(false);
        }
      }
    };
    verifyUser();
  }, [cookies, removeCookie]);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleClick = (event) => {
    setSelectedCategory(event.target.value);
  };
  // Fetch products on app load
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:4000/fetch');
        setProducts(response.data); // Set products state with fetched data
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex(item => item.title === product.title);
      if (existingProductIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingProductIndex].quantity += 1; // Increment quantity
        return updatedCart;
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    toast.success(`${product.title} has been added to your cart!`);
  };

  const updateQuantity = (index, change) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart];
      const newQuantity = updatedCart[index].quantity + change;

      if (newQuantity > 0) {
        updatedCart[index].quantity = newQuantity;
      }
      return updatedCart;
    });
  };

  const removeItem = (index) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  };

  const filterProducts = (products, query, selectedCategory) => {
    let filteredProducts = products || []; // Ensure products is an array

    if (query) {
      filteredProducts = filteredProducts.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (selectedCategory) {
      filteredProducts = filteredProducts.filter(
        ({ category, color, company, newprice, title }) =>
          category === selectedCategory ||
          color === selectedCategory ||
          company === selectedCategory ||
          newprice === selectedCategory ||
          title === selectedCategory
      );
    }

    return filteredProducts; // This should always be an array
  };

  const renderProductCards = (filteredProducts) => {
    console.log("Filtered Products:", filteredProducts); // Debugging log
    if (!Array.isArray(filteredProducts)) {
      console.error("filteredProducts is not an array:", filteredProducts);
      return null; // Return null or a fallback UI
    }

    return filteredProducts.map(
      ({ img, title, prevprice, newprice, quantity }) => (
        <Card
          key={Math.random()}
          img={img}
          title={title}
          prevprice={prevprice}
          newprice={newprice}
          addToCart={() => addToCart({ img, title, prevprice, newprice, quantity })}
        />
      )
    );
  };
  
  function filteredData() {
    const filteredProducts = filterProducts(products, query, selectedCategory);
    return renderProductCards(filteredProducts);
  }

  const result = filteredData();

  return (
    <Router>
      <Header loggedIn={loggedIn} onLogout={logOut} />
      <Footer />
      <Routes>
        <Route path='/warehouse' element={<Warehouse />} />
        <Route path='/register' element={<Register />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path='/login2' element={<Cards />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<>
          <Sidebars handleChange={handleChange} />
          <Navigation query={query} handleInputChange={handleInputChange} />
          <Recommended handleClick={handleClick} />
          <Products result={result} />
        </>} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/cart" element={
          <>
            <Navigationnosearch />
            <CartPage cart={cart} updateQuantity={updateQuantity} removeItem={removeItem} />
          </>
        } />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
      
      <ToastContainer />
     
    </Router>
  );
}

export default App;
