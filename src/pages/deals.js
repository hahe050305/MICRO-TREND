import React from "react";
import { useNavigate } from "react-router-dom";
import "./deals.css";

function DealsPage() 
{
  const navigate = useNavigate();
  
  return (
    <div className="deals-page-container">
      {/* Existing Deals Section */}
      <h2>Deals of the Day</h2>
      <div className="deal-cards">
        {[
          { name: "Apple Macbook Air Series-Z", image: "/deal1.jpg" },
          { name: "Realme Narzo 70-X Flash Series", image: "/realme.jpg" },
          { name: "Boat Rockerz HeadPhones", image: "/boathead.jpg" },
          { name: "Sony Bravia O-LED Curved Display", image: "/sony.jpg" },
          { name: "Epson Natural Black Printer", image: "/epson.jpg" },
        ].map((deal, index) => (
          <div
            className="deal-card"
            key={index}
            onClick={() =>
              navigate('/category')
            }
          >
           
            <img src={deal.image} alt={deal.name} />
            <div className="discount-banner">20% Off</div>
            <p>{deal.name}</p>
            <p className="price">Starting From: Rs.1078</p>
          </div>
        ))}
      </div>

    </div>
  );
}

export default DealsPage;
