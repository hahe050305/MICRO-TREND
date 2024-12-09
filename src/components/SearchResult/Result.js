import React from "react";
import { useLocation } from "react-router-dom";
import "./Result.css";

function SearchResults() {
  const location = useLocation();
  const { query, priceFilter, categoryFilter } = location.state || {};
  
  const productData = [
    { name: "iPhone 14", price: 1000, categories: ["Electronics", "Mobiles"], image: '/iphone.jpg'},
    { name: "Samsung Galaxy S23", price: 2000, categories: ["Electronics", "Mobiles"], image:'/realme.jpg' },
    { name: "OnePlus 11", price: 1500, categories: ["Electronics", "Mobiles"], image: '/oneplus.jpg' },
    { name: "Realme Narzo 70-X Flash Series", price: 27000, categories: ["Electronics", "Mobiles"], image: "/realme.jpg" },

    { name: "Asuz Vivobook -16S", price: 58000, categories: ["Electronics", "Laptops"], image: '/azus.jpg'},
    { name: "Apple Macbook Air Series", price: 68000, categories: ["Electronics", "Laptops"], image:'/deal1.jpg' },
    { name: "Hp Laptop -Student Series", price: 47000, categories: ["Electronics", "Laptops"], image: '/hp.jpg' },
    { name: "Dell Inspiron I3-Gen", price: 54000, categories: ["Electronics", "Laptops"], image: "/dell.jpg" },

    { name: "Boat Airpods -Beast Edition", price: 58000, categories: ["Electronics", "Airpods"], image: '/boat.jpg'},
    { name: "Ajio Airpods -Belgium Black", price: 68000, categories: ["Electronics", "Airpods"], image:'/ajio.jpg' },
    { name: "Boat Black Airpods -Low Latency", price: 47000, categories: ["Electronics", "Airpods"], image: '/boats.jpg' },
    { name: "Boult Audio Airpods -Matt Green", price: 54000, categories: ["Electronics", "Airpods"], image: "/boult.jpg" },

    // ...other products
  ];

  const filteredResults = productData.filter((item) => {
    const priceLimit = parseInt(priceFilter);
    return (
      item.name.toLowerCase().includes(query.toLowerCase()) &&
      (!priceFilter || item.price <= priceLimit) &&
      (!categoryFilter || item.categories.includes(categoryFilter))
    );
  });

  return (
    <div className="search-results-container">
      <h2>Search Results for: {query}</h2>
      <div className="results">
        {filteredResults.length > 0 ? (
          filteredResults.map((item) => (
            <div key={item.name} className="product-card">
              <img src={item.image} alt={item.name} />
              <div>
                <h3>{item.name}</h3>
                <p>${item.price}</p>
                <p>Category: {item.categories.join(", ")}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
}

export default SearchResults;
