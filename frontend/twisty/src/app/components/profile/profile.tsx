"use client";
import { useEffect, useState } from "react";
import styles from "./profile.module.css"; // Import the CSS file
import DecodeJwt from "@/app/decodejwt";

const Profile = () => {
  const [userData, setUserData] = useState(null); // Store user data
  const [error, setError] = useState(null); // Store any errors

  const userId = DecodeJwt(); // Decode JWT to get user ID

  useEffect(() => {
    if (!userId) return;

    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/users/${userId}`,
          {
            method: "GET",
            credentials: "include", // Ensure cookies are sent
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        console.log(data);
        setUserData(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUserData();
  }, [userId]);

  console.log(userId);

  return (
    <div className={styles["profile-container"]}>
      {error ? (
        <p className="error-message">Error: {error}</p>
      ) : userData ? (
        <div>
          <h1 className={styles["profile-heading"]}>Profile Page</h1>
          <p className={styles["profile-info"]}>
            <strong>Username:</strong> {userData.data.name}
          </p>
          <p className={styles["profile-info"]}>
            <strong>Email:</strong> {userData.data.email}
          </p>
        </div>
      ) : (
        <p className={styles["loading-message"]}>Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;
