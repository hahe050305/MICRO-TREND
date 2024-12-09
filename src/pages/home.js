import React from 'react';
import ProductGrid from '../components/Grid/ProductGrid';

function Home() {
  return (
    <div className="home-page">
      <h2>Trending Products</h2>
      <ProductGrid />
    </div>
  );
}

export default Home;
