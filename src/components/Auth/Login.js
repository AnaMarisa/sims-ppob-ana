import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/Logo.png";
import "../../assets/css/style.css";
import "../../assets/css/auth.css";
import "../../assets/css/form.css";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setEmail, setPassword, setValid } from "../../store/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { email, password, isValid } = useSelector((state) => state.auth);
  const [passwordError, setPasswordError] = useState(false);

  const isValidEmail = (value) => {
    return value.includes("@");
  };

  const isValidPassword = (value) => {
    return value.length > 6;
  };

  const emailChangeHandler = (event) => {
    dispatch(setEmail(event.target.value));
    const validEmail = isValidEmail(event.target.value);
    dispatch(setValid(validEmail && isValidPassword(password)));
  };

  const passwordChangeHandler = (event) => {
    dispatch(setPassword(event.target.value));
    const validPassword = isValidPassword(event.target.value);
    dispatch(setValid(validPassword && isValidEmail(email)));

    setPasswordError(!validPassword);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (isValid) {
      const loginData = {
        email,
        password,
      };

      // Check if there's a token in localStorage
      const storedToken = localStorage.getItem("token");

      if (storedToken) {
        // Include the token in your request headers for authentication
        fetch("http://localhost:3000/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2OTUwMDY2NjAsImV4cCI6MTY5NTAyODI2MH0.CL23brOJE0kw_zm7f1mNKX4w4ykenU6YtHPAgvsHQ4M`,
          },
          body: JSON.stringify(loginData),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.token) {
              // Authentication was successful, you can redirect to the dashboard or handle it as needed.
              console.log("Login successful");
              // Redirect to the dashboard page
              navigate("/dashboard");
            } else {
              // Handle authentication failure
              console.error("Login failed");
              // Display an error message to the user
              setPasswordError(true);
            }
          })
          .catch((error) => {
            // Handle network or other errors
            console.error("Login error:", error);
            // Display an error message to the user
            setPasswordError(true);
          });
      } else {
        // Handle the case where the token is not available
        console.error("Token not found in localStorage. Please register or log in first.");
        // Display an error message to the user
        setPasswordError(true);
      }
    }
  };

  return (
    <div>
      <section className="auth-wrapper">
        <div className="auth-box">
          <div className="login-wrapper">
            <div className="d-flex align-center justify-center">
              <img src={logo} alt="" height="30px" width="30px" />
              <div className="logo-txt">SIMS PPOB</div>
            </div>
            <div className="sub-header">
              Masuk atau buat akun
              <br />
              untuk memulai
            </div>
            <form className="login-form" onSubmit={submitHandler}>
              <div className="input-group">
                <i className="fa-solid fa-at inner-icon"></i>
                <input type="email" id="email" name="email" value={email} onChange={emailChangeHandler} className="input-box" placeholder="Masukkan email Anda" />
              </div>
              <div className="input-group">
                <i className="fa-solid fa-lock inner-icon"></i>
                <input type="password" value={password} onChange={passwordChangeHandler} className="input-box" placeholder="Masukkan password Anda" />
                <i className="fa-solid fa-eye-slash append-icon view-pwd"></i>
                {passwordError ? <div className="error-msg">Password yang anda masukkan salah.</div> : null}
              </div>
              <div className="btn-primary mt-6">
                <Link to="/dashboard">Masuk</Link>
              </div>
            </form>
            <div className="registration-txt">
              Belum punya akun? Registrasi
              <Link to="/register" className="registration-link">
                di sini
              </Link>
            </div>
          </div>
        </div>
        <div className="img-auth"></div>
      </section>
    </div>
  );
};

export default Login;
