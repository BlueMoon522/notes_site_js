"use client";
import { useEffect, useState } from "react";

const DecodeJwt = () => {
  const [userId, setUserId] = useState(null); // To store the user ID
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
        console.log(error);
        setError(err.message);
      }
    };

    fetchUserId();
  }, []);
  // Run this effect when userId changes
  return userId;
};

export default DecodeJwt;
