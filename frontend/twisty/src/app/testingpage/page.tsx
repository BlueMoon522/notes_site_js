"use client";
import React from "react";
import { useEffect, useState } from "react";
const UserInfo = ({ userId }) => {
  userId = "6742b386be349696d81733bc";
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchUserInfo(userId);
      setUser(data?.data); // Assuming your API sends { success: true, data: user }
    };

    fetchData();
  }, [userId]);

  return (
    <div>
      {user ? (
        <div>
          <h1>{user.name}</h1>
          {/* Render more user details */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
export default UserInfo;

const fetchUserInfo = async (userId) => {
  try {
    const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user info");
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching user info:", error);
  }
};
