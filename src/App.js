// src/App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import HeroSection from './components/Hero/HeroSection';
import Footer from './components/Footer/Footer';
import ProductGrid from './components/Grid/ProductGrid';
import Cart from './components/Cart/Cart';
import DealsPage from './pages/deals';  // Import DealsPage component
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './App.css';
import CategoryPage from './components/Category/Category';
import ComboPage from './pages/combo';
import Payments from './components/Payment/Payment';
import OrderTracking from './components/Order/Order';
import ProductDetails from './components/Productdetail/Product';
import SearchResults from './components/SearchResult/Result';

function App() {
  const [cartItems, setCartItems] = useState([]);

  // Function to handle adding a product to the cart
  const handleAddToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  return (
    <Router>
      <div className="App">
        <Navbar cartCount={cartItems.length} />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HeroSection />
                <div className="container">
                  <ProductGrid onAddToCart={handleAddToCart} />
                </div>
              </>
            }
          />
          <Route
            path="/product/:id"
            element={<ProductDetails handleAddToCart={handleAddToCart} />}
          />
          <Route
            path="/Cart"
            element={<Cart cartItems={cartItems} />}
          />
          <Route
            path="/deals"
            element={<DealsPage />}
          />

          <Route
            path="/combo"
            element={<ComboPage />}
          />
          <Route
            path="/category/"  // New route for category page
            element={<CategoryPage onAddToCart={handleAddToCart} />}  // Add CategoryPage component
          />

          <Route
            path="/payment/"  // New route for category page
            element={<Payments />}  // Add CategoryPage component
          />

          <Route
            path="/order"  // New route for category page
            element={<OrderTracking />}  // Add CategoryPage component
          />

          <Route
            path="/productdetail"  // New route for category page
            element={<ProductDetails/>}  // Add CategoryPage component
          />

          <Route
            path="/result"  // New route for category page
            element={<SearchResults/>}  // Add CategoryPage component
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
