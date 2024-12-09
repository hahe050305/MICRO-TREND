import React from 'react';
import { Link } from 'react-router-dom';
import './Card.css';

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`}>
        <img src={product.image} alt={product.title} />
        <div className="product-info">
          <h3>{product.title}</h3>
          <p>${product.price}</p>
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;
