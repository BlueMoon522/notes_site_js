"use client";
import { useEffect, useState } from "react";

const DecodeJwt = () => {
  const [userId, setUserId] = useState(null); // To store the user ID
  const [userData, setUserData] = useState(null); // To store the user details
  const [error, setError] = useState(null); // To store errors, if any

  // Fetch and decode the JWT to get the user ID
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await fetch("http://localhost:5000/decode-cookie", {
          method: "POST",
          credentials: "include", // Ensures cookies are sent
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user ID");
        }

        const data = await response.json();
        setUserId(data.id); // Set the ID
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUserId();
  }, []);

  // Fetch user data based on the ID
  useEffect(() => {
    if (!userId) return; // Guard condition: Skip if userId is null or undefined

    const fetchUserData = async () => {
      try {
        console.log("did it get here??");
        console.log(userId);
        const response = await fetch(
          `http://localhost:5000/api/users/${userId}`,
          {
            method: "GET",
            credentials: "include", // Ensures cookies are sent
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUserData(data); // Set the user data
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUserData();
  }, [userId]); // Run this effect when userId changes

  return (
    <div>
      {error && <p>Error: {error}</p>}

      {userId ? <p>User ID: {userId}</p> : <p>Loading user ID...</p>}

      {userData ? (
        <div>
          <h2>User Details:</h2>
          <pre>{JSON.stringify(userData, null, 2)}</pre>
        </div>
      ) : (
        userId && <p>Loading user data...</p>
      )}
    </div>
  );
};

export default DecodeJwt;
