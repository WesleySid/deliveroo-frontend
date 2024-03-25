import React, { useState, useEffect } from "react";
import logo from "./images/logo.png";
import axios from "axios";

const Header = () => {
  const [restaurantInfo, setRestaurantInfo] = useState(null);

  useEffect(() => {
    const fetchRestaurantInfo = async () => {
      try {
        const response = await axios.get("http://localhost:3200");
        setRestaurantInfo(response.data.restaurant);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchRestaurantInfo();
  }, []);

  return (
    <>
      <header>
        <img src={logo} alt="" />
        <h1 className="deli">Deliveroo</h1>
      </header>

      <div className="restauInfo">
        {restaurantInfo && (
          <>
            <div className="infoText">
              <h1>{restaurantInfo.name}</h1>
              <p>{restaurantInfo.description}</p>
            </div>
            <img src={restaurantInfo.picture} alt={restaurantInfo.name} />
          </>
        )}
      </div>
    </>
  );
};
export default Header;
