"use client"; // This directive indicates that this component should be rendered on the client side only

import { useState } from "react"; // Importing React's useState hook to manage component state
import Link from "next/link"; // Importing Link component from Next.js for client-side navigation
import styles from "./dashboard.module.css"; // Importing CSS module for component-specific styling

// Dashboard component definition
export default function Dashboard() {
  // State to manage the sidebar's open/closed state
  const [isOpen, setIsOpen] = useState(true);

  // Function to toggle sidebar open/closed
  const toggleSidebar = () => {
    setIsOpen((prevOpen) => !prevOpen); // Toggle the isOpen state between true and false
  };

  return (
    <div className={styles.container}>
      {/* Sidebar div with conditional styling based on the isOpen state */}
      <div className={isOpen ? styles.sidebar : styles.sidebarClosed}>
        {/* Toggle button for opening/closing the sidebar */}
        <button
          // Apply different button styles based on the sidebar's open/closed state
          className={isOpen ? styles.toggleButtonOpen : styles.toggleButtonClosed}
          onClick={toggleSidebar} // Toggle sidebar when button is clicked
        >
          {isOpen ? "←" : "→"} {/* Display arrow based on open/closed state */}
        </button>

        {/* Navigation list with links to different pages */}
        <ul className={styles.navList}>
          <li>
            <Link href="/">Home</Link> {/* Link to Home page */}
          </li>
          <li>
            <Link href="/about">About</Link> {/* Link to About page */}
          </li>
          <li>
            <Link href="/services">Services</Link> {/* Link to Services page */}
          </li>
          <li>
            <Link href="/contact">Contact</Link> {/* Link to Contact page */}
          </li>
        </ul>
      </div>
    </div>
  );
}

