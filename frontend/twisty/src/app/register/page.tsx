//To:fix alert("An unexpected response was received."); gets triggered even if the data is pushed to the database

"use client";
import { useState } from "react";
import styles from "./login.module.css";
import Link from "next/link";
export default function Register() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (password !== repassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, password, email, repassword }),
      });

      const result = await response.json();
      if (response.ok && result.message) {
        alert("Response from server and result  both fine"); // Show success message from server
      } else if (!response.ok && result.message) {
        alert("not ok result from server"); // Show error message from server
      } else {
        alert("An unexpected response was received.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while registering");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles["centered-box"]}>
        <p className={styles["textLogin"]}>Register</p>
        <form onSubmit={handleSubmit}>
          <label>Enter Email</label>
          <div className={styles["text-field"]}>
            <input
              type="text"
              name="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <label>Enter Name</label>
          <div className={styles["text-field"]}>
            <input
              type="text"
              name="Username"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Enter Password</label>
          </div>
          <div className={styles["text-field"]}>
            <input
              type="password"
              name="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Re-Enter Password</label>
          </div>
          <div className={styles["text-field"]}>
            <input
              type="password"
              name="RePassword"
              value={repassword}
              onChange={(e) => setRepassword(e.target.value)}
              required
            />
          </div>

          <div>
            <input
              type="submit"
              name="Register"
              value="Register"
              className={styles["loginButton"]}
            />
          </div>
        </form>
        <p>
          Already have an Account?<Link href="/login">Go to Login</Link>
        </p>
      </div>
    </div>
  );
}
