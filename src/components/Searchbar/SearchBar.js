import React, { useState } from "react";
import "./Searchbar.css";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [priceFilter, setPriceFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const navigate = useNavigate();

  const productData = [
    { name: "iPhone 14", price: 1000, categories: ["Electronics", "Mobiles"] },
    { name: "Samsung Galaxy S23", price: 2000, categories: ["Electronics", "Mobiles"] },
    { name: "OnePlus 11", price: 1500, categories: ["Electronics", "Mobiles"] },
    { name: "MacBook Pro", price: 3000, categories: ["Electronics", "Laptops"] },
    { name: "Dell XPS 13", price: 2500, categories: ["Electronics", "Laptops"] },
    { name: "Nike Running Shoes", price: 150, categories: ["Fashion", "Footwear"] },
    { name: "Levi’s Denim Jacket", price: 200, categories: ["Fashion", "Men", "Clothing"] },
    { name: "Zara Floral Dress", price: 100, categories: ["Fashion", "Women", "Clothing"] },
    { name: "Instant Pot Duo", price: 100, categories: ["Home & Kitchen", "Appliances"] },
    { name: "Dyson V11 Vacuum Cleaner", price: 600, categories: ["Home & Kitchen", "Appliances"] },
    { name: "Ikea Office Desk", price: 200, categories: ["Home & Kitchen", "Furniture"] },
    { name: "Trek Mountain Bike", price: 1000, categories: ["Sports", "Outdoor Gear"] },
    { name: "Wilson Tennis Racket", price: 120, categories: ["Sports", "Outdoor Gear"] },
    { name: "Neutrogena Face Wash", price: 15, categories: ["Beauty", "Skincare"] },
    { name: "Olay Regenerist Moisturizer", price: 25, categories: ["Beauty", "Skincare"] },
    { name: "iPad Pro", price: 1200, categories: ["Electronics", "Tablets"] },
    { name: "Samsung Galaxy Tab S8", price: 900, categories: ["Electronics", "Tablets"] },
    { name: 'Apple Watch Series 8', price: 400, categories: ['Electronics', 'Smartwatches', 'Apple'] },
    { name: 'Fitbit Charge 5', price: 150, categories: ['Electronics', 'Smartwatches', 'Fitbit'] },

    { name: "Boat Airpods -Beast Edition", price: 58000, categories: ["Electronics", "Airpods"]},
    { name: "Ajio Airpods -Belgium Black", price: 68000, categories: ["Electronics", "Airpods"]},
    { name: "Boat Black Airpods -Low Latency", price: 47000, categories: ["Electronics", "Airpods"]},
    { name: "Boult Audio Airpods -Matt Green", price: 54000, categories: ["Electronics", "Airpods"]},

    { name: "Asuz Vivobook -16S", price: 58000, categories: ["Electronics", "Laptops"], image: '/asuz.jpg'},
    { name: "Apple Macbook Air Series", price: 68000, categories: ["Electronics", "Laptops"], image:'/deal_1.jpg' },
    { name: "Hp Laptop -Student Series", price: 47000, categories: ["Electronics", "Laptops"], image: '/hp.jpg' },
    { name: "Dell Inspiron I3-Gen", price: 54000, categories: ["Electronics", "Laptops"], image: "/dell.jpg" },

  ];

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Search Query:", query, "Price Filter:", priceFilter, "Category Filter:", categoryFilter);
  };

  const handleInputChange = (e) => {
    const input = e.target.value;
    setQuery(input);

    if (input) {
      const filteredSuggestions = productData.filter((item) => {
        const priceLimit = parseInt(priceFilter);

        return (
          item.name.toLowerCase().includes(input.toLowerCase()) &&
          (!priceFilter || item.price <= priceLimit) &&
          (!categoryFilter || item.categories.includes(categoryFilter))
        );
      });
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handlePriceFilterChange = (e) => {
    const newPriceFilter = e.target.value;
    setPriceFilter(newPriceFilter);

    if (query || categoryFilter) {
      const priceLimit = parseInt(newPriceFilter);

      const filteredSuggestions = productData.filter((item) => {
        return (
          item.name.toLowerCase().includes(query.toLowerCase()) &&
          (!newPriceFilter || item.price <= priceLimit) &&
          (!categoryFilter || item.categories.includes(categoryFilter))
        );
      });
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleCategoryFilterChange = (e) => {
    const newCategoryFilter = e.target.value;
    setCategoryFilter(newCategoryFilter);

    if (query || priceFilter) {
      const filteredSuggestions = productData.filter((item) => {
        const priceLimit = parseInt(priceFilter);

        return (
          item.name.toLowerCase().includes(query.toLowerCase()) &&
          (!priceFilter || item.price <= priceLimit) &&
          (!newCategoryFilter || item.categories.includes(newCategoryFilter))
        );
      });
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (item) => {
    setSuggestions([]); // Clear suggestions to hide the dropdown
    navigate("/result", {
      state: { query, priceFilter, categoryFilter },
    });
  };

  return (
    <div className="search-bar-container">
      <form className="search-bar" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for products, categories..."
          value={query}
          onChange={handleInputChange}
        />
        <select className="price-filter" value={priceFilter} onChange={handlePriceFilterChange}>
          <option value="">All Prices</option>
          <option value="500">Up to $500</option>
          <option value="1000">Up to $1000</option>
          <option value="2000">Up to $2000</option>
          <option value="3000">Up to $3000</option>
        </select>
        <select className="category-filter" value={categoryFilter} onChange={handleCategoryFilterChange}>
          <option value="">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Fashion">Fashion</option>
          <option value="Home & Kitchen">Home & Kitchen</option>
          <option value="Sports">Sports</option>
          <option value="Beauty">Beauty</option>
          <option value="Laptops">Laptops</option>
          <option value="Airpods">Airpods</option>
        </select>
        <button type="submit">Search</button>
      </form>
      {suggestions.length > 0 && (
        <ul className="dropdown">
          {suggestions.map((item, index) => (
            <li key={index} onClick={() => handleSuggestionClick(item)}>
              <strong>{item.name}</strong>
              {item.price && ` - $${item.price}`}
              {item.categories && (
                <span className="category"> ({item.categories.join(" > ")})</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;
