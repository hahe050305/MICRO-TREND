import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Searchbar.css";

function SearchResults() {
  const location = useLocation();
  const navigate = useNavigate();

  // State to manage query and filters
  const [query, setQuery] = useState(location.state?.query || "");
  const [priceFilter, setPriceFilter] = useState(location.state?.priceFilter || "");
  const [categoryFilter, setCategoryFilter] = useState(location.state?.categoryFilter || "");

  // Product data (static for now)
  const productData = [
    { name: "Boat Rockerz Headphones", price: 1300, categories: ["Electronics"], image: '/boathead.jpg' },
    { name: "Asus Vivobook Series", price: 50000, categories: ["Electronics"], image: '/azuz.jpg' },
    { name: "Apple Macbook Air", price: 65000, categories: ["Electronics"], image: '/deal1.jpg' },
    { name: "Epson Natural Black Printer", price: 34000, categories: ["Electronics"], image: '/epson.jpg' },
    { name: "Sony Bravia O-LED Curved Display", price: 55000, categories: ["Electronics"], image: '/sony.jpg' },
    { name: "Nike Running Shoes", price: 1400, categories: ["Fashion"], image: '/nike.jpg' },
    { name: "Levi’s Denim Jacket", price: 350, categories: ["Fashion"], image: '/levis.jpg' },
    { name: "Roadster Blue Boys", price: 540, categories: ["Fashion"], image: '/roadster.jpg' },
    { name: "Here and How -Kids Edition", price: 450, categories: ["Fashion"], image: '/here.jpg' },
    { name: "Dyson V11 Vacuum Cleaner", price: 3400, categories: ["Home & Office"], image: '/vaccum.jpg' },
    { name: "Instant Pot Duo", price: 2700, categories: ["Home & Office"], image: '/pot.jpg' },
    { name: "Ikea Office Desk", price: 2500, categories: ["Home & Office"], image: '/ikea.jpg' },
    { name: "Trek Mountain Bike", price: 27000, categories: ["Sports"], image: '/bike.jpg' },
    { name: "Wilson Tennis Racket", price: 2400, categories: ["Sports"], image: '/yonex.jpg' },
    { name: "MRF Cricket Bat - Genius Edition", price: 1800, categories: ["Sports"], image: '/mrf.jpg' },
    { name: "Boat Rockerz -650Hz Bass Boosted", price: 2200, categories: ["Earpods"], image: '/boat.jpg' },
    { name: "Boat Purple Headphones -Ear Comforters", price: 1500, categories: ["Earpods"], image: '/headphones.jpg' },
    { name: "JBL tunes -Bass Boosted", price: 880, categories: ["Earpods"], image: '/jbltune.jpg' },
    { name: "Asus Vivobook -16S", price: 45000, categories: ["Laptops"], image: '/azuz.jpg' },
    { name: "Apple Mackbook Air Series", price: 67000, categories: ["Laptops"], image: '/deal1.jpg' },
    { name: "Hp Student series", price: 47000, categories: ["Laptops"], image: '/hp.jpg' },
    { name: "Apple Smartwatch -Waterproof", price: 3400, categories: ["SmartWatches"], image: '/water.jpg' },
    { name: "Apple Watch Series-9", price: 3200, categories: ["SmartWatches"], image: '/apple.jpg' },
    { name: "NoiseFit Colourfit Pro-2", price: 2300, categories: ["SmartWatches"], image: '/noise.jpg' },
    { name: "Addixon Black Bags", price: 880, categories: ["Backpacks"], image: '/bag.jpg' },
    { name: "American Tourister Classic", price: 567, categories: ["Backpacks"], image: '/america.jpg' },
    { name: "Roadster Black Backbags", price: 800, categories: ["Backpacks"], image: '/roadsterbag.jpg' },
  ];

  // Filtered results based on query, price, and category
  const filteredResults = productData.filter((item) => {
    const priceLimit = parseInt(priceFilter);
    return (
      (!query || item.name.toLowerCase().includes(query.toLowerCase())) &&
      (!priceFilter || item.price <= priceLimit) &&
      (!categoryFilter || item.categories.includes(categoryFilter))
    );
  });

  // Handle filter changes
  const handlePriceFilterChange = (event) => {
    setPriceFilter(event.target.value);
  };

  const handleCategoryFilterChange = (event) => {
    setCategoryFilter(event.target.value);
  };

  // Sync with the main search bar query when location.state changes
  useEffect(() => {
    setQuery(location.state?.query || "");
    setPriceFilter(location.state?.priceFilter || "");
    setCategoryFilter(location.state?.categoryFilter || "");
  }, [location.state]);

  // Update query and filters when search bar changes
  useEffect(() => {
    if (location.state) {
      setQuery(location.state.query || "");
      setPriceFilter(location.state.priceFilter || "");
      setCategoryFilter(location.state.categoryFilter || "");
    }
  }, [location]);

  return (
    <div className="search-results-container">
      <h2>Search Results {query ? `for: "${query}"` : ""}</h2>

      {/* Filters Section */}
      <div className="filters">
        <select className="filter-dropdown" value={priceFilter} onChange={handlePriceFilterChange}>
          <option value="">All Prices</option>
          <option value="1000">Under $1000</option>
          <option value="2000">Under $2000</option>
          <option value="5000">Under $5000</option>
        </select>

        <select className="filter-dropdown" value={categoryFilter} onChange={handleCategoryFilterChange}>
          <option value="">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Fashion">Fashion</option>
          <option value="Home & Office">Home & Office</option>
          <option value="Sports">Sports</option>
          <option value="Beauty">Beauty</option>
          <option value="Laptops">Laptops</option>
          <option value="SmartWatches">SmartWatches</option>
          <option value="Earpods">Earpods</option>
          <option value="Backpacks">Backpacks</option>
        </select>
      </div>

      <div className="results">
        {filteredResults.length > 0 ? (
          filteredResults.map((item) => (
            <div key={item.name} className="product-card">
              <img src={item.image} alt={item.name} />
              <div>
                <h3>{item.name}</h3>
                <p>${item.price}</p>
                <p>Categories: {item.categories.join(", ")}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No results found {query ? `for "${query}"` : ""}.</p>
        )}
      </div>
    </div>
  );
}

export default SearchResults;
