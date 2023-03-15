import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import firestoreDatabase from "../firebaseConfiguration";
import {
  doc,
  getDocs,
  updateDoc,
  collection,
  query,
  where,
} from "firebase/firestore";
import "../css/UserProfile.css";
import usersProfile from '../image/profiles.png';

export const UserProfile = () => {

  const [onlineUsers, setOnlineUsers] = useState("");

  const userEmail = new URL(document.location).searchParams.get("email");

  const userUpdateID = new URL(document.location).searchParams.get("updateid");

  useEffect(() => {
    async function fetchUserData() {
      var activeUsers = "";
      var flag = false;
      const firebaseDocument = await getDocs(query(
        collection(firestoreDatabase, "users"),
        where("status", "==", "online")
      ));
      firebaseDocument.forEach(async (userDocument) => {
        if (userDocument.data().status === "online") {
          if (flag === false) {
            activeUsers = " <" + userDocument.data().email + "> ";
            flag = true;
          } else {
            activeUsers = activeUsers + " <" + userDocument.data().email + "> ";
          }
        }
      });
      setOnlineUsers(activeUsers);
    }
    fetchUserData();
  }, []);

  const logout = async () => {
          await updateDoc(doc(firestoreDatabase, "users", userUpdateID), {
            status: "offline",
          });
          // window.location.href = "https://container-2-anmmfspxoa-ue.a.run.app/";
          window.location.href = "http://localhost:3001/";
  };

  return (
    <div>
      <div className="userImage">
            <img src={usersProfile} width="25%" alt="userProfiles"/>
      </div>
      <h3>Welcome! You are logged in<h2>{userEmail}</h2></h3>
      <h3>Online Users </h3>
      <p>{onlineUsers}</p>
      <Button
        size="medium"
        color="secondary"
        variant="contained"
        onClick={logout}
      >
        Logout
      </Button>
    </div>
  );
};
