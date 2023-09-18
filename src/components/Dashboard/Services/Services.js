import { useEffect, useState } from "react";
import classes from "./Services.module.css";

const Services = () => {
  const [serviceData, setServiceData] = useState([]);

  useEffect(() => {
    // Make the API request here
    fetch("https://take-home-test-api.nutech-integrasi.app/services", {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2OTUwMDY2NjAsImV4cCI6MTY5NTAyODI2MH0.CL23brOJE0kw_zm7f1mNKX4w4ykenU6YtHPAgvsHQ4M`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.data && Array.isArray(data.data)) {
          // Check if data.data is an array
          setServiceData(data.data); // Set the data to promoData
        } else {
          console.error("API response is not an array. Response:", data);
        }
      })
      .catch((error) => console.error("Error fetching promo data:", error));
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.services}>
        <div className={classes[`service-box`]}>
          <div className={classes.service}>
            {serviceData.map((service, index) => (
              <div key={index}>
                <img src={service.service_icon} alt={`Service ${index + 1}`} />
                <p className={classes[`service-title`]}>{service.service_name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
