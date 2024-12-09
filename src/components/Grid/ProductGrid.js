import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Grid.css';
import ProductCard from '../Card/ProductCard';

// Example mock data with categories for testing
const mockProducts = [
  {
    id: 1,
    title: 'Purple Wireless Headphones',
    price: 299.99,
    image: '/headphones.jpg',
    category: 'electronics',
  },
  {
    id: 2,
    title: 'Samsung smartphone A-72 5G',
    price: 14000.99,
    image: '/smartphones.jpg',
    category: 'electronics',
  },
  {
    id: 3,
    title: 'Smartwatch',
    price: 1999.99,
    image: '/smartwatch.jpg',
    category: 'electronics',
  },
  {
    id: 4,
    title: 'Henly Summer Collections',
    price: 188.88,
    image: '/dress.jpg',
    category: 'fashion',
  }
];

function ProductGrid({ filter }) {
  const navigate = useNavigate(); // Get the navigate function from React Router

  // Filter products based on category if filter is provided
  const filteredProducts = filter
    ? mockProducts.filter((product) => product.category === filter)
    : mockProducts;

  // Function to handle category click
  const handleCategoryClick = (category) => {
    navigate(`/category`); // Navigate to the category page
  };

}

export default ProductGrid;
