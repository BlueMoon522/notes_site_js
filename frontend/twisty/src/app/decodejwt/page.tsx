"use client";
import { useEffect, useState } from "react";
import DecodeJwt from "./decodejwt";

const Page = () => {
  const [userData, setUserData] = useState(null); // To store the user details
  const [error, setError] = useState(null); // To store errors, if any
  const userId = DecodeJwt();

  // Fetch user data based on the ID
  useEffect(() => {
    if (!userId) return; // Guard condition: Skip if userId is null or undefined

    const fetchUserData = async () => {
      try {
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
  }, [userId]);
  // Run this effect when userId changes
  return (
    <div>
      {error && <p>Error: {error}</p>}

      {userData ? (
        <div>
          <div>
            <ul>
              {userData.data.notes.map((note) => (
                <li key={note._id}>
                  <strong>{note.title}:</strong> {note.description}
                </li>
              ))}
            </ul>
            <h2>User Details:</h2>
            <p>notes:{[userData.data.name]}</p>
            <pre>{JSON.stringify(userData, null, 2)}</pre>
          </div>
        </div>
      ) : (
        userId && <p>Loading user data...</p>
      )}
    </div>
  );
};

export default Page;
