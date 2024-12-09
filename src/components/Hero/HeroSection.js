import React, { useEffect, useState } from 'react';
import './Hero.css';
import { useNavigate } from 'react-router-dom';

function HeroSection() {
  const navigate = useNavigate();

  const [showAdCard, setShowAdCard] = useState(false); // State for Sponsored Ad
  const [showCornerImages, setShowCornerImages] = useState(false); // State for Corner Images
  const [currentCard, setCurrentCard] = useState(0); // State for carousel control

  const carouselData =
   [

    {
      text: "Explore our deals section",
      bannerText: "Checkout our Deals page, to know our deals!",
      imgSrc: "/best.jpg",
      navigateTo: "/deals"
    },
    {
      text: "Winter Sale is Coming! Get Ready for Exclusive Combo Offers.",
      bannerText: "Prepare Early and Save Big!",
      imgSrc: "/winter.jpg",
      navigateTo: "/combo"
    },
    {
      text: "Check Out Our Exclusive Deals! Surprise Santa, or He'll Grab Them All!",
      bannerText: "Catch the Deals Before They're Gone!",
      imgSrc: "/christmas.jpg",
      navigateTo: "/deals"
    }

    
  ];

  const handleShopNow = () => {
    navigate('/Category'); // Navigates to the Category Page
  };

  useEffect(() => {
    // Change carousel cards every 5 seconds
    const interval = setInterval(() => {
      setCurrentCard((prev) => (prev + 1) % carouselData.length);
    }, 5000); // 5-second delay between card changes

    return () => clearInterval(interval);
  }, []);


  useEffect(() => {
    // Delay for showing corner images (3 seconds)
    setTimeout(() => {
      setShowCornerImages(true);
    }, 3000);

    // Observer for Sponsored Ad Section
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Delay for showing the ad card (3 seconds after the section is visible)
          setTimeout(() => {
            setShowAdCard(true);
          }, 2000);
        }
      });
    });

    const adSection = document.querySelector('.ad-section');
    if (adSection) {
      observer.observe(adSection);
    }

    return () => {
      if (adSection) {
        observer.unobserve(adSection);
      }
    };
  }, []);

  return (
    <div className="hero-container">
      {/* Hero Carousel Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1>Shop the Future, Today!</h1>
          <p>Explore trending products and unbeatable deals curated just for you.</p>
          <button className="shop-now" onClick={handleShopNow}>
            Shop Now
          </button>
        </div>
      </div>

      {/* Promotional Carousel */}
      <div className="promo-carousel">
        <div className="promo-card" onClick={() => navigate(carouselData[currentCard].navigateTo)}>
          <img src={carouselData[currentCard].imgSrc} alt="Promo" />
          <div className="promo-text">
            <h3>{carouselData[currentCard].bannerText}</h3>
            <p>{carouselData[currentCard].text}</p>
          </div>
        </div>
      </div>

      {/* Trending Now Section */}
      <div className="trending-section">
        <h2>Trending Now...</h2>
        <div className="trending-cards">
          {[ 
            { name: 'Boat Earpods', image: '/boats.jpg' },
            { name: 'Addixon Black Backpack', image: '/bag.jpg' },
            { name: 'Asuz VivoBook', image: '/azuz.jpg' },
            { name: 'Apple Watch Series-9', image: '/apple.jpg' },
            { name: 'Motorola Edge-50 Fusion', image: '/moto.jpg' },
          ].map((category, index) => (
            <div
              className="trending-card"
              key={index}
              onClick={() =>
                (window.location.href = `/Category`)
              }
            >
              <img src={category.image} alt={category.name} />
              <h3>{category.name}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations Section */}
      <div className="recommendations-section">
        <h2>Your Recommendations...</h2>
        <div className="trending-cards">
          {[ 
            { name: 'Philips Electric Tooth Brush', image: '/electric.jpg' },
            { name: 'Ninja Airfryer Black Blush', image: '/airfryer.jpg' },
            { name: 'JBL tunes - Bass Boosted', image: '/jbltune.jpg' },
            { name: 'Instant Ice Cream Maker - ServeIt', image: '/icecream.jpg' },
            { name: 'Dyazo Office Protective Laptop Sleeve', image: '/dyazo.jpg' }
          ].map((category, index) => (
            <div
              className="trending-card"
              key={index}
              onClick={() =>
                (window.location.href = `/Category`)
              }
            >
              <img src={category.image} alt={category.name} />
              <h3>{category.name}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Sponsored Ad Section */}
      <div className="ad-section">
        <h2>Sponsored Advertisement</h2>
        {!showAdCard ? (
          <p className="ad-loader">Loading Ad...</p>
        ) : (
          <div className="ad-card"
              onClick={() =>
                (window.location.href = `/Category`)
              }>
            <img src="/boat.jpg" alt="Sponsored Product" />
            <div className="sponser">
              <p>Discover the best deals from BOAT Brand!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default HeroSection;
