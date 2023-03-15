import React, { useState } from "react";
import firestoreDatabase from "../firebaseConfiguration";
import "../css/Register.css";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Button } from "@material-ui/core";
import userImage from '../image/userImage.png';

const Register = (callback) => {

  const [userData, updateUserData] = useState({
    name: "",
    email: "",
    location: "",
    password: "",
  });

  const [validationErrors, setValidationErrors] = useState({});

  const onChange = (e) => {
    updateUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setValidationErrors(signupFormValidation(userData));
    if (Object.keys(signupFormValidation(userData)).length === 0) {
      addUserInFireStoreDatabase();
    }
  };

  const addUserInFireStoreDatabase = async () => {
    try {

      const userDocument = await addDoc(collection(firestoreDatabase, "users"), {
        email: userData.email,
        timestamp: serverTimestamp(),
        status: "offline",
      });

      const userDocument2 = await addDoc(collection(firestoreDatabase, "users"), {
        email: userData.email,
        password: userData.password,
        location: userData.location,
        name: userData.name,
        timestamp: serverTimestamp()
      });
      
      updateUserData({
        name: "",
        password: "",
        email: "",
        location: ""
      });

      // window.location.href = "https://container-2-anmmfspxoa-ue.a.run.app/";
      window.location.href = "http://localhost:3001/";

    } catch (e) {
      console.error("Error Message ", e);
    }
  };

  function signupFormValidation(userData) {

    let validationErrors = {};

    if (!userData.name.trim()) {
      validationErrors.name = "Mandatory Field";
    }

    if (!userData.email) {
      validationErrors.email = "Email is Mandatory";
      // Regex Source link: https://regexr.com/3e48o
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(userData.email)) {
      validationErrors.email = "Invalid Format";
    }

    if (!userData.location.trim()) {
      validationErrors.location = "Mandatory Field";
    }

    if (!userData.password) {
      validationErrors.password = "Mandatory Field";
    } 
    
    else if (userData.password.length < 8) {
      validationErrors.password = "Password should contain at least 8 characters or more";
    }
    
    return validationErrors;
  }
  return (
    <div className="form-container">
      <div className="form-content">
        <div className="userImage">
            <img src={userImage} width="20%" alt="userImage"/>
        </div>
        <form className="form" onSubmit={onSubmit}>
          <h1>Signup</h1>
          <div className="form-inputs">
            <input
              type="text"
              className="form-input"
              name="name"
              value={userData.name}
              onChange={onChange}
              placeholder="Full Name"
            />
            {validationErrors.name && <p class="error">{validationErrors.name}</p>}
          </div>
          <div className="form-inputs">
            <input
              type="text"
              className="form-input"
              name="email"
              value={userData.email}
              onChange={onChange}
              placeholder="Email ID"
            />
            {validationErrors.email && <p class="error">{validationErrors.email}</p>}
          </div>
          <div className="form-inputs">
            <input
              type="text"
              className="form-input"
              name="location"
              value={userData.location}
              onChange={onChange}
              placeholder="Location"
            />
            {validationErrors.location && <p class="error">{validationErrors.location}</p>}
          </div>
          <div className="form-inputs">
            <input
              type="password"
              className="form-input"
              name="password"
              value={userData.password}
              onChange={onChange}
              placeholder="Password"
            />
            {validationErrors.password && <p class="error">{validationErrors.password}</p>}
          </div>
          <Button
            className="form-input-btn"
            color="primary"
            variant="contained"
            type="submit"
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Register;
