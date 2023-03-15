import React, { useState } from "react";
import { Button } from "@material-ui/core";
import {
  collection,
  query,
  where,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import firestoreDatabase from "../firebaseConfiguration";
import "../css/Login.css";
import userLogin from '../image/userLogin.png';

const Login = () => {

  const [validationErrors, setValidationErrors] = useState({});

  const [userData, updateUserData] = useState({
    email: "",
    password: "",
  });

  const onChange = (e) => {
    updateUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };
  
  const loginUser = async () => {

    try {
     
      const firebaseDocument = await getDocs(query(
        collection(firestoreDatabase, "users"),
        where("email", "==", userData.email)
      ));

      firebaseDocument.forEach(async (userDocument) => {

        if (userData.password === userDocument.data().password) {
          validateUser(firebaseDocument);
        }

        updateUserData({
          email: "",
          password: "",
        });
        
      });
    } catch (e) {
      console.error("Fetching user data failed: ", e);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setValidationErrors(loginFormValidation(userData));
    if (Object.keys(loginFormValidation(userData)).length === 0) {
      loginUser();
    }
  };

  function loginFormValidation  (userData) {
    let validationErrors = {};

    if (!userData.email) {
      validationErrors.email = 'Email required';
    }

    if (!userData.password) {
      setValidationErrors.password = 'Password required';
    }
    return validationErrors;
  }
  return (
    <div className="form-container">
      <div className="form-content-right">

        <form className="form" onSubmit={onSubmit}>
          <h1>Login</h1>
          <div className="form-inputs">
            <input
              type="text"
              className="form-input"
              name="email"
              placeholder="Enter your email"
              value={userData.email}
              onChange={onChange}
            />
            {validationErrors.email && <p class="error">{validationErrors.email}</p>}
          </div>
          <div className="form-inputs">
            <input
              type="password"
              className="form-input"
              name="password"
              placeholder="Enter your password"
              value={userData.password}
              onChange={onChange}
            />
            {validationErrors.password && <p class="error">{validationErrors.password}</p>}
          </div>
          <Button className="form-input-btn" color="primary" variant="contained" type="submit">
            Submit
          </Button>
        </form>
      
        <div className="userImage">
            <img src={userLogin} width="25%" alt="userImage"/>
        </div>

      </div>
    </div>
  );
};


function validateUser(firebaseDocument) {
  firebaseDocument.forEach(async (userDocument) => {
    if (userDocument.data().status) {
      await updateDoc(doc(firestoreDatabase, "users", userDocument.id), {
        status: "online",
      });
      // window.location.href = "https://container-3-anmmfspxoa-ue.a.run.app/?email=" + userDoc.data().email +"&updateid="+userDoc.id;
      window.location.href = "http://localhost:3002/?email=" + userDocument.data().email + "&updateid=" + userDocument.id;
    }
  });
}


export default Login;

