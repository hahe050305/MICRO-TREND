import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Product.css';

const ProductDetails = () => {
  const navigate = useNavigate();

  const product = {
    name: "Boat Rockerz Headphones - Black Boosted",
    price: 609.99,
    originalPrice: 709.99,
    description:
      "Immerse yourself in music with Boat Rockerz. Equipped with Active Noise Cancellation (ANC) technology, a comfortable fit, and bass-boosted sound quality for an incredible listening experience.",
    features: [
      ["Connectivity", "Bluetooth 5.0"],
      ["Noise Cancellation", "Active Noise Cancellation (ANC)"],
      ["Driver Size", "40mm Dynamic Drivers"],
      ["Battery Life", "20-hour Battery Life"],
      ["Warranty", "1-Year Manufacturer Warranty"],
    ],
    reviews: [
      { user: "John-Doe", rating: 5, comment: "Excellent product with amazing sound quality!" },
      { user: "Xavier", rating: 4, comment: "Great value for money, highly recommended!" },
      { user: "Alex Johnson", rating: 5, comment: "Best Headphones I've ever used." },
    ],
    image: "/boathead.jpg",
    rating: 4.5,
    stock: 19,
  }
    {
    
  }

  const relevantProducts = [
    { name: "Purple Headphones -Ear Comforters", image: "/headphones.jpg" },
    { name: "Boat Earpods -Unleash the Beast", image: "/boat.jpg" },
    { name: "Ajio -Sound Bassed", image:'/ajio.jpg'}
  ];
  

  // Handle "Add to Cart" button click
  const handleAddToCart = () => {
    navigate('/cart'); // Navigate to the cart page
  };

  return (
    <div className="product-page">
      <div className="product-container">
        <div className="product-image">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="product-info">
          <h1>{product.name}</h1>
          <p className="price">
            <span className="discount-price">${product.price}</span>{' '}
            <span className="original-price">${product.originalPrice}</span>
          </p>
          <p className="description">{product.description}</p>
          <table className="features-table">
            <tbody>
              {product.features.map((feature, index) => (
                <tr key={index}>
                  <td>{feature[0]}</td>
                  <td>{feature[1]}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="stock">
            {product.stock > 0 ? `In Stock: ${product.stock}` : "Out of Stock"}
          </p>
          <button className="add-to-cart" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
      <h2 className="relevant-title">Relevant Products You May Also Like...</h2>
      <div className="relevant-products">
        {relevantProducts.map((item, index) => (
          <div key={index} className="product-card">
            <img src={item.image} alt={item.name} />
            <p>{item.name}</p>
          </div>
        ))}
      </div>
      <div className="reviews-section">
        <h2>Customer Reviews</h2>
        {product.reviews.map((review, index) => (
          <div key={index} className="review">
            <strong>{review.user}</strong>
            <span>{'★'.repeat(review.rating)}</span>
            <p>{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDetails;
