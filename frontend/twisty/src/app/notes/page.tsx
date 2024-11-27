"use client";
import { useEffect, useState } from "react";
import DecodeJwt from "../decodejwt"; // Assuming DecodeJwt is a custom hook
import styles from "./notes.module.css";

const Page = () => {
  const [userData, setUserData] = useState(null); // Store user data
  const [error, setError] = useState(null); // Store any errors
  const [activeNote, setActiveNote] = useState(null); // Track the active note for zoom effect
  const userId = DecodeJwt(); // Decode JWT to get user ID

  // Fetch user data based on the user ID
  useEffect(() => {
    if (!userId) return; // Skip if userId is not available

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
        setUserData(data); // Update the user data state
      } catch (err) {
        setError(err.message); // Set error message in case of failure
      }
    };

    fetchUserData();
  }, [userId]); // Only fetch if userId changes

  const handleNoteClick = (note) => {
    setActiveNote(note); // Set the clicked note as active
  };

  const closeNote = () => {
    setActiveNote(null); // Close the zoomed note
  };

  return (
    <div className={styles.pageContainer}>
      {error && <p className={styles.errorText}>Error: {error}</p>}

      {userData ? (
        <div className={styles.container}>
          {userData.data.notes && userData.data.notes.length > 0 ? (
            <div className={styles.noteGrid}>
              {userData.data.notes.map((note) => (
                <div
                  key={note._id}
                  className={styles.noteItem}
                  onClick={() => handleNoteClick(note)}
                >
                  <div className={styles.noteTitle}>{note.title}</div>
                  <div className={styles.noteDescription}>
                    {note.description}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No notes available.</p>
          )}
        </div>
      ) : (
        userId && <p>Loading user data...</p>
      )}

      {activeNote && (
        <div className={styles.modal} onClick={closeNote}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>{activeNote.title}</h2>
            <p>{activeNote.description}</p>
            <button onClick={closeNote}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
