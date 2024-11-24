//text,email,password,submit in the type are predefined
"use client"; // Ensures this component runs on the client-side, enabling use of hooks and client-only features

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./login.module.css";

import Link from "next/link";
export default function Login() {
  const [password, setPassword] = useState(""); // State to store the entered password
  const [error, setError] = useState(""); // State to store any error messages for invalid login
  const [email, setEmail] = useState("");

  const router = useRouter(); // Initialize Next.js router for client-side navigation

  // Handle form submission to authenticate user
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault(); // Prevent default form submission behavior (page reload)

    try {
      // Send a POST request to the backend login route with the form data
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST", // Define the HTTP method as POST to send data to the server
        headers: {
          "Content-Type": "application/json", // Specify JSON format for the request body
        },
        body: JSON.stringify({ email, password }), // Convert form data into JSON format
        credentials: "include", //include cookie in request
      });

      const result = await response.json(); // Parse JSON response from the server
      console.log(result);
      const token = result.token;
      console.log("====================================");
      console.log(token);
      console.log("====================================");
      //store token in browser
      //  localStorage.setItem("authToken", token);//stores in localStorage not necessary
      console.log("Token stored successfully!");

      if (response.ok) {
        alert("Login successful");
        setError(""); // Clear any existing error messages on successful login

        console.log(setError);

        router.push("/dashboard"); // Redirect user to the dashboard (or other protected route)
      }
      // Check if the response status is 200 (successful login)
      else {
        // If login fails, display server error message, or a default message if undefined
        setError(result.message || "Login failed");
      }
    } catch (error) {
      console.error("Error:", error); // Log any errors encountered during the fetch request
      setError("An error occurred while logging in"); // Show a general error message if request fails
    }
  };

  return (
    <div className={styles.container}>
      {/* Centered box container for form styling */}
      <div className={styles["centered-box"]}>
        <h2>Login</h2> {/* Page heading for login */}
        {/* Conditionally render error message if there's an error */}
        {error && <p className={styles.error}>{error}</p>}
        {/* Login form with handleSubmit as onSubmit event handler */}
        <form onSubmit={handleSubmit}>
          {/* Input field for the username */}
          <label>Name:</label>
          <div className={styles["text-field"]}>
            <input
              type="text" // Text input type for username
              value={email} // Controlled component binding input value to state
              onChange={(e) => setEmail(e.target.value)} // Update state on input change
              required // Set input as required for form validation
            />
          </div>

          {/* Input field for the password */}
          <label>Password:</label>
          <div className={styles["text-field"]}>
            <input
              type="password" // Password input type for obscured text
              value={password} // Controlled component binding input value to state
              onChange={(e) => setPassword(e.target.value)} // Update state on input change
              required // Set input as required for form validation
            />
          </div>
          <button type="submit" className={styles["loginButton"]}>
            Login
          </button>
        </form>
        {/* Pass the userId to the Dashboard component as a prop */}
        <p>
          Dont have Account?<Link href="/register">Go to Register</Link>
        </p>
      </div>
    </div>
  );
}
