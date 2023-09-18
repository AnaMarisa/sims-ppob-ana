import React, { useState, useEffect } from "react";
import classes from "./Akun.module.css";
import styles from "../Auth/Form.module.css";
import Navbar from "../Dashboard/Navbar/Navbar";
import profilePhoto from "../../assets/ProfilePhoto.png";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const [akun, setAkun] = useState({
    email: "",
    first_name: "",
    last_name: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://take-home-test-api.nutech-integrasi.app/profile", {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2OTUwMDY2NjAsImV4cCI6MTY5NTAyODI2MH0.CL23brOJE0kw_zm7f1mNKX4w4ykenU6YtHPAgvsHQ4M`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.data) {
          setAkun(data.data);
        } else {
          console.error("API response does not contain data:", data);
        }
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, []);

  const updateProfileHandler = () => {
    const updatedData = {
      email: akun.email,
      first_name: akun.first_name,
      last_name: akun.last_name,
    };

    fetch("https://take-home-test-api.nutech-integrasi.app/profile/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFuYUBtYXJpc2EuY29tIiwibWVtYmVyQ29kZSI6IkxNTFI0ODBYIiwiaWF0IjoxNjk0OTA2MjU3LCJleHAiOjE2OTQ5NDk0NTd9.jpwIJys9bEfV7TN8KeJIO9zwG9jM_VHsCYWLJ1NFTR4`,
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.data) {
          console.log("Data berhasil diperbarui:", data.data);
        } else {
          console.error("API response does not contain updated data:", data);
        }
      })
      .catch((error) => console.error("Error updating user data:", error));
  };

  return (
    <>
      <Navbar />
      <div className={`${classes.container} ${classes["account-wrapper"]}`}>
        <div className={classes.user}>
          <div className={classes.avatar}>
            <img src={profilePhoto} alt="" width="130px" height="130px" />
            <div className={classes["edit-btn"]}>
              <i className="fa-solid fa-pencil"></i>
            </div>
          </div>
          <div className={classes.username}>Ana Marisa</div>
        </div>
        <form className={classes["account-form"]}>
          <div>
            <div className={styles["label-input"]}>Email</div>
            <div className={styles["input-group"]}>
              <i className={`fa-solid fa-at ${styles["inner-icon"]}`}></i>
              <input type="email" id="email" name="email" className={styles["input-box"]} placeholder="Masukkan email Anda" value={akun.email} readOnly />
              <div className={styles["error-msg"]}></div>
            </div>
          </div>
          <div>
            <div className={styles["label-input"]}>Nama Depan</div>
            <div className={styles["input-group"]}>
              <i className={`fa-regular fa-user ${styles["inner-icon"]}`}></i>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className={styles["input-box"]}
                placeholder="Masukkan nama depan Anda"
                value={akun.first_name}
                onChange={(e) => setAkun({ ...akun, first_name: e.target.value })}
                autoComplete="off"
              />
              <div className={styles["error-msg"]}></div>
            </div>
          </div>
          <div>
            <div className={styles["label-input"]}>Nama Belakang</div>
            <div className={styles["input-group"]}>
              <i className={`fa-regular fa-user ${styles["inner-icon"]}`}></i>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className={styles["input-box"]}
                placeholder="Masukkan nama belakang Anda"
                value={akun.last_name}
                onChange={(e) => setAkun({ ...akun, last_name: e.target.value })}
                autoComplete="off"
              />
              <div className={styles["error-msg"]}></div>
            </div>
          </div>
          <button className={classes["button-primary"]} onClick={updateProfileHandler}>
            Simpan
          </button>
        </form>
      </div>
    </>
  );
};

export default EditProfile;
