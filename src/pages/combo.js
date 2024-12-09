import React from "react";
import "./combo.css";

function ComboPage() {
  const combos = [
    {
      name: "Mobile + Case + Screen Protector",
      images: ["/realme.jpg", "/case.jpg", "/screen.jpg"],
      discount: "15%",
      price: "Rs.27340",
    },
    {
      name: "Asuz Laptop + Laptop Bag + Wireless Mouse",
      images: ["/azus.jpg", "/dyazo.jpg", "/mouse.jpg"],
      discount: "25%",
      price: "Rs.69000",
    },
    {
      name: "Rainy Protector: 3-foldable umbrella + Raincoat + RainCap",
      images: ["/3fold.jpg", "/raincoat.jpg", "/cap.jpg"],
      discount: "20%",
      price: "Rs.500",
    },
    {
      name: "Kitchen Set: Blender + Mixer + Juicer",
      images: ["/blender.jpg", "/mixer.jpg", "/juicer.jpg"],
      discount: "30%",
      price: "Rs.12000",
    },

    {
        name: "Winter Non-Negotiables: Sweater + Muffler + Ear protectors",
        images : ["/sweater.jpg", "/muffler.jpg", "protect.jpg"],
        discount: "35%",
        price: "Rs. 600"
    }
  ];

  return (
    <div className="combo-page-container">
      <h2>🎅 Unwrap Joy with These Irresistible Combos! 🎁</h2>
      <div className="combo-cards">
        {combos.map((combo, index) => (
          <div className="combo-card" key={index}>
            <div className="combo-images">
              {combo.images.map((image, i) => (
                <img
                  key={i}
                  src={image}
                  alt={`${combo.name} - ${i}`}
                  className="combo-image"
                />
              ))}
            </div>
            <div className="discount-banner">{combo.discount} Off</div>
            <p>{combo.name}</p>
            <p className="price">{combo.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ComboPage;
