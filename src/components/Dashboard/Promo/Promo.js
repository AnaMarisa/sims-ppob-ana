import React, { useEffect, useState } from "react";
import classes from "./Promo.module.css";

function Promo() {
  const [promoData, setPromoData] = useState([]); // Initialize with an empty array

  useEffect(() => {
    // Make the API request here
    fetch("https://take-home-test-api.nutech-integrasi.app/banner", {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2OTUwMDY2NjAsImV4cCI6MTY5NTAyODI2MH0.CL23brOJE0kw_zm7f1mNKX4w4ykenU6YtHPAgvsHQ4M`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.data && Array.isArray(data.data)) {
          // Check if data.data is an array
          setPromoData(data.data); // Set the data to promoData
        } else {
          console.error("API response is not an array. Response:", data);
        }
      })
      .catch((error) => console.error("Error fetching promo data:", error));
  }, []);

  return (
    <div className={`${classes.container} ${classes["promo-section"]}`}>
      <div className={classes[`promo-header`]}>Temukan promo menarik</div>
      <div className={classes[`promo-wrapper`]}>
        <div className={classes.promo}>
          {promoData.map((banner, index) => (
            <div key={index}>
              <img src={banner.banner_image} alt={`Banner ${index + 1}`} />
              {/* <p>{banner.banner_name}</p>
              <p>{banner.description}</p> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Promo;
