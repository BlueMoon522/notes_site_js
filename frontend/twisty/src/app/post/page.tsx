"use client";
import styles from "./post.modules.css";
import { useState } from "react";
import Link from "next/link";

export default function Post() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) {
      alert("Title , Description Required*");
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/api/users/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });
      const result = await response.json();
      if (response.ok) {
        alert("Posted succesfully");
        setTitle("");
        setDescription("");
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("submission failed");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.description}>
        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Title Input */}
          <div className={styles.inputGroup}>
            <label>Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Paragraph Input */}
          <div className={styles.inputGroup}>
            <label>Paragraph:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              required
            />
          </div>

          <button type="submit" className={styles.submitButton}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
