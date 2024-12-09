import React, { useState } from 'react';
import './Category.css';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa'; // For the cart icon

function CategoryPage({ onAddToCart }) {
  const navigate = useNavigate();

  const [categoryNotifications, setCategoryNotifications] = useState({}); // Notifications per category
  const [cartItems, setCartItems] = useState([]); // Cart items state

  const categories = [
    {
      name: 'Electronics',
      products: [
        { id: 1, name: 'Boat Rockerz Headphones', price: 1300, image: '/boathead.jpg' },
        { id: 2, name: 'Asuz Vivobook Series', price: 50000, image: '/azuz.jpg' },
        { id: 3, name: 'Apple Macbook Air', price: 65000, image: '/deal1.jpg' },
        { id: 4, name: 'Epson Natural Black Printer', price: 34000, image: '/epson.jpg' },
        { id: 5, name: 'Sony Bravia O-LED Curved Display', price: 55000, image: '/sony.jpg' },
      ],
    },
    {
      name: 'Fashion',
      products: [
        { id: 6, name: 'Nike Running Shoes', price: 1400, image: '/nike.jpg' },
        { id: 7, name: 'Levi’s Denim Jacket', price: 350, image: '/levis.jpg' },
        { id: 8, name: 'Roadster Blue Boys', price: 540, image: '/roadster.jpg' },
        { id: 9, name: 'Here and How -Kids Edition', price: 450, image: '/here.jpg' },
      ],
    },
    
    {
      name: 'Home & Office',
      products: [
        { id:10, name: 'Dyson V11 Vacuum Cleaner', price: 3400, image: '/vaccum.jpg' },
        { id:11, name: 'Instant Pot Duo', price: 2700, image: '/pot.jpg' },
        { id:12 , name: 'Ikea Office Desk', price: 2500, image: '/ikea.jpg' },
      ],
    },
    {
      name: 'Sports',
      products: [
        { id:13, name: 'Trek Mountain Bike', price: 27000, image: '/bike.jpg' },
        { id: 14, name: 'Wilson Tennis Racket', price: 2400, image: '/yonex.jpg' },
        { id: 16, name: 'MRF Cricket Bat - Genius Edition', price: 1800, image: '/mrf.jpg'}
      ],
    },

    {
      name: 'Earpods',
      products: [
        { id:17, name: 'Boat Rockerz -650Hz Bass Boosted', price: 2200, image: '/boat.jpg' },
        { id:18, name: 'Boat Purple Headphones -Ear Comforters', price: 1500, image: '/headphones.jpg' },
        { id:19, name: 'JBL tunes -Bass Boosted', price: 880, image:'/jbltune.jpg'}
      ],
    },

    {
      name: 'Laptops',
      products: [
        { id:20, name: 'Asuz Vivobook -16S', price: 45000, image: '/azuz.jpg' },
        { id:21, name: 'Apple Mackbook Air Series', price: 67000, image: '/deal1.jpg' },
        { id:22, name: 'Hp Student series', price: 47000, image:'/hp.jpg'}
      ],
    },

    {
      name: 'SmartWatches',
      products: [
        { id:23, name: 'Apple Smartwatch -Waterproof', price: 3400, image: '/water.jpg' },
        { id:24, name: 'Apple Watch Series-9', price: 3200, image: '/apple.jpg' },
        { id:25, name: 'NoiseFit Colourfit Pro-2', price: 2300, image:'/noise.jpg'}
      ],
    },

    {
      name: ' Backpacks',
      products: [
        { id:26,name: 'Addixon Black Bags', price: 880, image: '/bag.jpg' },
        { id:27, name: 'American Tourister Classic', price: 567, image: '/america.jpg' },
        { id:28, name: 'Roadster Black Backbags', price: 800, image:'/roadsterbag.jpg'}
      ],
    },
  ];

  const handleProductClick = (product) => {
    navigate('/productdetail', { state: { product } });
  };
  

  const handleAddToCart = (product, categoryName) => {
    // Update cart items
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });

    // Update notifications for the respective category
    setCategoryNotifications((prev) => ({
      ...prev,
      [categoryName]: `${product.name} has been added to the cart!`,
    }));

    // Remove the notification after 3 seconds
    setTimeout(() => {
      setCategoryNotifications((prev) => ({
        ...prev,
        [categoryName]: null,
      }));
    }, 3000);
  };

  return (
    <div className="category-container">
      <div className="category-header">
        <h1>Categories</h1>
        <button className="view-cart-btn" onClick={() => navigate('/cart', { state: { cartItems } })}>
          <FaShoppingCart /> View Cart
        </button>
      </div>

      {categories.map((category, index) => (
        <div key={index} className="category-section">
          <h2>{category.name}</h2>

          {/* Display notification only for this category */}
          {categoryNotifications[category.name] && (
            <div className="notification">{categoryNotifications[category.name]}</div>
          )}

          <div className="category-cards">
            {category.products.map((product) => (
              <div className="category-card" key={product.id}>
                <img src={product.image} alt={product.name} onClick={() => handleProductClick (product)} />
                <h3>{product.name}</h3>
                <p>${product.price}</p>
                <button
                  className="add-to-cart-btn"
                  onClick={() => handleAddToCart(product, category.name)}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default CategoryPage;
