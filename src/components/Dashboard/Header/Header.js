import classes from "./Header.module.css";
import profilePhoto from "../../../assets/ProfilePhoto.png";
import { useState, useEffect } from "react";

const Header = () => {
  const [saldo, setSaldo] = useState(0);

  useEffect(() => {
    fetch("https://take-home-test-api.nutech-integrasi.app/balance", {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2OTUwMDY2NjAsImV4cCI6MTY5NTAyODI2MH0.CL23brOJE0kw_zm7f1mNKX4w4ykenU6YtHPAgvsHQ4M`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Set saldo berdasarkan data yang diterima dari API
        setSaldo(data.balance);
      })
      .catch((error) => {
        console.error("Error fetching balance:", error);
      });
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div className={classes["user-wrapper"]}>
          <div className={classes.avatar}>
            <img src={profilePhoto} alt="avatar" width="68px" height="68px" />
          </div>
          <div className={classes["welcome-txt"]}>Selamat datang,</div>
          <div className={classes["user-name"]}>Ana Marisa</div>
        </div>
        <div className={classes["saldo-bg"]}>
          <div className={classes["saldo-wrapper"]}>
            <div className={classes["saldo-txt"]}>Saldo anda</div>
            <div className={classes["saldo-amount"]}>Rp. {saldo}</div>
            <div className={classes["btn-saldo"]}>Lihat Saldo</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
