import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Dashboard/Navbar/Navbar";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";

import "../../assets/css/style.css";
import "../../assets/css/form.css";
import "../../assets/css/account.css";
import profilePhoto from "../../assets/ProfilePhoto.png";

const Akun = () => {
  const [akun, setAkun] = useState({
    email: "",
    first_name: "",
    last_name: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    fetch("https://take-home-test-api.nutech-integrasi.app/profile", {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFuYUBtYXJpc2EuY29tIiwibWVtYmVyQ29kZSI6IkxNTFI0ODBYIiwiaWF0IjoxNjk0OTA2MjU3LCJleHAiOjE2OTQ5NDk0NTd9.jpwIJys9bEfV7TN8KeJIO9zwG9jM_VHsCYWLJ1NFTR4`,
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

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = "/login";
  };

  return (
    <>
      <Navbar />
      <div className="container account-wrapper">
        <div className="user">
          <div className="avatar">
            <img src={profilePhoto} alt="" width="130px" height="130px" />
            <div className="edit-btn">
              <i className="fa-solid fa-pencil"></i>
            </div>
          </div>
          <div className="username">Ana Marisa</div>
        </div>
        <form className="account-form">
          <div>
            <div className="label-input">Email</div>
            <div className="input-group">
              <i className="fa-solid fa-at inner-icon"></i>
              <input type="text" className="input-box" placeholder="Masukkan email Anda" value={akun.email} readOnly />
              <div className="error-msg"></div>
            </div>
          </div>
          <div>
            <div className="label-input">Nama Depan</div>
            <div className="input-group">
              <i className="fa-regular fa-user inner-icon"></i>
              <input type="text" className="input-box" placeholder="Masukkan nama depan Anda" value={akun.first_name} onChange={(e) => setAkun({ ...akun, first_name: e.target.value })} />
              <div className="error-msg"></div>
            </div>
          </div>
          <div>
            <div className="label-input">Nama Belakang</div>
            <div className="input-group">
              <i className="fa-regular fa-user inner-icon"></i>
              <input type="text" className="input-box" placeholder="Masukkan nama belakang Anda" value={akun.last_name} onChange={(e) => setAkun({ ...akun, last_name: e.target.value })} />
              <div className="error-msg"></div>
            </div>
          </div>
          <div className="btn-primary">
            <Link to="/edit-profile">Edit Profile</Link>
          </div>
          <div className="btn-outlined mt-6">
            <a onClick={handleLogout}>Logout</a>
          </div>
        </form>
      </div>
    </>
  );
};

export default Akun;
