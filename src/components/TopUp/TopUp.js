import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Navbar from "../Dashboard/Navbar/Navbar";
import Header from "../Dashboard/Header/Header";
import "../../assets/css/topup.css";
import "../../assets/css/form.css";
import "../../assets/css/style.css";

const TopUp = () => {
  const [nominal, setNominal] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const inputChangeHandler = (event) => {
    const newValue = event.target.value;
    setNominal(newValue);

    setIsButtonDisabled(newValue < 10000 || newValue > 1000000);
  };

  useEffect(() => {
    if (nominal >= 10000 && nominal <= 1000000) {
      const apiUrl = "https://take-home-test-api.nutech-integrasi.app/topup";

      fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2OTUwMDY2NjAsImV4cCI6MTY5NTAyODI2MH0.CL23brOJE0kw_zm7f1mNKX4w4ykenU6YtHPAgvsHQ4M`,
        },
        body: JSON.stringify({ amount: nominal }),
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle the API response data here
          console.log("API Response:", data);

          Swal.fire({
            icon: "success",
            title: "Top-up Successful",
            text: "Your top-up was successful!",
          });

          setNominal("");
          setIsButtonDisabled(true);
        })
        .catch((error) => {
          console.error("API Error:", error);

          Swal.fire({
            icon: "error",
            title: "API Error",
            text: "An error occurred while processing your top-up request. Please try again later.",
          });
        });
    }
  }, [nominal]);

  const handleTopUpButtonClick = (amount) => {
    setNominal(amount);
    setIsButtonDisabled(false);
  };

  const generateTopUpButtonClickHandler = (amount) => {
    return () => handleTopUpButtonClick(amount);
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <Header />
        <p>Silakan masukkan</p>
        <div className="text-h1 mt-1">Nominal Top Up</div>

        <div className="topup-wrapper">
          <div className="topup-val">
            <div className="input-group">
              <i className="fa-solid fa-money-bill inner-icon"></i>
              <input type="number" min="10000" max="1000000" className="input-box" placeholder="Masukkan nominal Top Up" value={nominal} onChange={inputChangeHandler} />
            </div>
            <div className="btn-primary">
              <a type="submit" disabled={isButtonDisabled}>
                Top Up
              </a>
            </div>
          </div>
          <div className="topup-options">
            <div className="d-flex input-group">
              <button onClick={generateTopUpButtonClickHandler(10000)} className="btn-outlined grey btn-topup">
                Rp. 10.000
              </button>

              <button onClick={generateTopUpButtonClickHandler(20000)} className="btn-outlined grey btn-topup">
                Rp. 20.000
              </button>

              <button onClick={generateTopUpButtonClickHandler(50000)} className="btn-outlined grey btn-topup">
                Rp. 50.000
              </button>
            </div>
            <div className="d-flex">
              <button onClick={generateTopUpButtonClickHandler(100000)} className="btn-outlined grey btn-topup">
                Rp. 100.000
              </button>

              <button onClick={generateTopUpButtonClickHandler(250000)} className="btn-outlined grey btn-topup">
                Rp. 250.000
              </button>

              <button onClick={generateTopUpButtonClickHandler(500000)} className="btn-outlined grey btn-topup">
                Rp. 500.000
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopUp;
