"use client";
import { useEffect, useState } from "react";
const DecodeJwt = () => {
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/decode-cookie", {
          method: "POST",
          credentials: "include", // Ensures cookies are sent
        });

        if (!response.ok) {
          throw new Error("Failed to fetch");
        }

        const data = await response.json();
        setUserId(data.id);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {userId ? <p>User ID: {userId}</p> : <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default DecodeJwt;
