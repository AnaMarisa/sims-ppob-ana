import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../assets/Logo.png";
import { setEmail, setFirstName, setLastName, setPassword, setConfirmPassword, setValid } from "../../store/registrationSlice";
import { Link } from "react-router-dom";
import "../../assets/css/style.css";
import "../../assets/css/auth.css";
import "../../assets/css/form.css";

const Register = () => {
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);
  const [error, setError] = useState(""); // State to track errors
  const dispatch = useDispatch();
  const { email, firstName, lastName, password, confirmPassword, isValid } = useSelector((state) => state.registration);

  const isFirstNameValid = firstName.length >= 2 && firstName.length <= 15;
  const isLastNameValid = lastName.length >= 2 && lastName.length <= 15;

  const emailChangeHandler = (e) => {
    const value = e.target.value;
    dispatch(setEmail(value));
    const isEmailValid = value.includes("@");
    dispatch(setValid(isEmailValid && firstName.length >= 2 && firstName.length <= 15 && lastName.length >= 2 && lastName.length <= 15 && password.length >= 8 && (confirmPasswordTouched ? confirmPassword === password : true)));
  };

  const firstNameChangeHandler = (e) => {
    const value = e.target.value;
    dispatch(setFirstName(value));
    const isFirstNameValid = value.length >= 2 && value.length <= 15;
    dispatch(setValid(isFirstNameValid && email.includes("@") && lastName.length >= 2 && lastName.length <= 15 && password.length >= 8 && (confirmPasswordTouched ? confirmPassword === password : true)));
  };

  const lastNameChangeHandler = (e) => {
    const value = e.target.value;
    dispatch(setLastName(value));
    const isLastNameValid = value.length >= 2 && value.length <= 15;
    dispatch(setValid(isLastNameValid && email.includes("@") && firstName.length >= 2 && firstName.length <= 15 && password.length >= 8 && (confirmPasswordTouched ? confirmPassword === password : true)));
  };

  const passwordChangeHandler = (e) => {
    const value = e.target.value;
    dispatch(setPassword(value));
    const isPasswordValid = value.length >= 8;
    dispatch(setValid(isPasswordValid && email.includes("@") && firstName.length >= 2 && firstName.length <= 15 && lastName.length >= 2 && lastName.length <= 15 && (confirmPasswordTouched ? confirmPassword === password : true)));
  };

  const ConfirmPasswordChangeHandler = (e) => {
    const value = e.target.value;
    dispatch(setConfirmPassword(value));
    setConfirmPasswordTouched(true);
    // Check if the confirmation password matches the password
    const passwordsMatch = value === password;

    // Dispatch an action to update the validity state based on password match
    dispatch(setValid(passwordsMatch && email.includes("@") && firstName.length >= 2 && firstName.length <= 15 && lastName.length >= 2 && lastName.length <= 15 && password.length >= 8));
  };

  const submitHandler = (e) => {
    e.preventDefault();

    // Check for empty fields
    if (!email || !firstName || !lastName || !password || !confirmPassword) {
      setError("Please fill in all the fields.");
      return; // Stop registration if any field is empty
    }

    if (isValid) {
      // Create an object with the registration data
      const registrationData = {
        email,
        firstName,
        lastName,
        password,
        confirmPassword,
      };

      // Make the HTTP POST request to the registration endpoint
      fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationData),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message === "Registration successful") {
            // Registration was successful, you can redirect the user to a login page or perform other actions.
            console.log("Registration successful");
            // Optionally, you can handle the JWT token if it's included in the response.
            const token = data.token; // Extract the JWT token if available
            // Store the token in localStorage
            localStorage.setItem("token", token);
            // Redirect to the login page
            window.location.href = "/login"; // You can use react-router's history for navigation if you're using it.
          } else {
            // Handle registration failure
            console.error("Registration failed");
          }
        });
    }
  };

  return (
    <>
      <section className="auth-wrapper">
        <div className="auth-box">
          <div className="login-wrapper">
            <div className="d-flex align-center justify-center">
              <img src={logo} alt="" height="30px" width="30px" />
              <div className="logo-txt">SIMS PPOB</div>
            </div>
            <div className="sub-header">
              Lengkapi data untuk
              <br />
              membuat akun
            </div>
            <form className="register-form" onSubmit={submitHandler}>
              <div className="input-group">
                <i className="fa-solid fa-at inner-icon"></i>
                <input type="email" id="email" name="email" onChange={emailChangeHandler} className="input-box" autoComplete="off" placeholder="Email" />
              </div>
              <div className="input-group">
                <i className="fa-regular fa-user inner-icon"></i>
                <input type="text" id="firstName" name="firstName" onChange={firstNameChangeHandler} className="input-box" placeholder="Nama depan" />
                {!isFirstNameValid && firstName && <div className="error-msg">Nama depan harus &gt;2 karakter</div>}
              </div>
              <div className="input-group">
                <i className="fa-regular fa-user inner-icon"></i>
                <input type="text" id="lastName" name="lastName" onChange={lastNameChangeHandler} className="input-box" placeholder="Nama belakang" />
                {!isLastNameValid && lastName && <div className="error-msg">Nama belakang harus &gt;2 karakter</div>}
                <div className="error-msg"></div>
              </div>
              <div className="input-group">
                <i className="fa-solid fa-lock inner-icon"></i>
                <input type="password" id="password" name="password" onChange={passwordChangeHandler} className="input-box" placeholder="Password" />
                <i className="fa-solid fa-eye-slash append-icon view-pwd"></i>
              </div>
              <div className="input-group">
                <i className="fa-solid fa-lock inner-icon"></i>
                <input type="password" id="confirmPassword" name="confirmPassword" onChange={ConfirmPasswordChangeHandler} className="input-box" placeholder="Konfirmasi password" />
                <i className="fa-solid fa-eye-slash append-icon view-pwd"></i>
                {confirmPasswordTouched && password !== confirmPassword && <div className="error-msg">Password tidak sama</div>}
              </div>
              <button type="submit" className="btn-login">
                Masuk
              </button>
            </form>
            <div className="registration-txt">
              Sudah punya akun? Login
              <Link to="/login" className="registration-link">
                di sini
              </Link>
            </div>
          </div>
        </div>
        <div className="img-auth"></div>
      </section>
      {error && (
        <div className="message-wrapper">
          <div className="error-box">
            Input tidak boleh kosong.
            <i className="fa-solid fa-xmark btn-close" onClick={() => setError("")}></i>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
