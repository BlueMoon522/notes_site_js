import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const cookieStore = cookies();
  const token = (await cookieStore).get("jwt");

  if (!token) {
    console.log("Redirecting to /login...");
    redirect("/login"); // Ensure no content renders before this call
  }

  return <div>Welcome to the Dashboard!</div>;
};

export default Dashboard;

//import { useState } from "react";
//import Link from "next/link";
//import styles from "./dashboard.module.css"
//import authChecker from "../middleware/authmiddleware";
//export default function Dashboard() {
//authChecker();
// const [isOpen, setIsOpen] = useState(true);
// const [title, setTitle] = useState("");
// const [description, setDescription] = useState("");
// const toggleSidebar = () => setIsOpen(!isOpen);

// //function to handle note submit

// const handleSubmit = async (e: { preventDefault: () => void }) => {
//   e.preventDefault();
//   console.log("This is where it went");
//   if (!title || !description) {
//     console.log("1This is where it went");
//     alert("Title , Description Required*");
//     return;
//   }
//   try {
//     const response = await fetch("http://localhost:5000/api/users/posts", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ title, description }),
//       credentials: "include",
//     });
//     console.log("2his is where it went");
//     const result = await response.json();
//     if (response.ok) {
//       alert("Posted successfully");
//       console.log("3his is where it went");
//       setTitle("");
//       setDescription("");
//     } else {
//       console.log("4his is where it went");

//       alert(result.message);
//     }
//   } catch (error) {
//     console.error("Error:", error);
//     alert("submission failed");
//   }
// };

//return (
// <>
// <p>This is a dashboard</p>
///</>
// <div className={styles.container}>
//   <div className={isOpen ? styles.sidebar : styles.sidebarClosed}>
//     {/* Conditional styling applied here based on isOpen */}
//     <button
//       className={
//         isOpen ? styles.toggleButtonOpen : styles.toggleButtonClosed
//       }
//       onClick={toggleSidebar}
//     >
//       {isOpen ? "←" : "→"}
//     </button>

//     <ul className={styles.navList}>
//       <li>
//         <Link href="/">Home</Link>
//       </li>
//       <li>
//         <Link href="/post">Post</Link>
//       </li>
//       <li>
//         <Link href="/profile">Profile</Link>
//       </li>
//       <li>
//         <Link href="/settings">Settings</Link>
//       </li>
//     </ul>
//   </div>
//   <div className={styles.description}>
//     <form onSubmit={handleSubmit} className={styles.form}>
//       {/* Title Input */}
//       <div className={styles.inputGroup}>
//         <label>Title:</label>
//         <input
//           type="text"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           required
//         />
//       </div>

//       {/* Paragraph Input */}
//       <div className={styles.inputGroup}>
//         <label>Paragraph:</label>
//         <textarea
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           required
//         />
//       </div>

//       <button type="submit" className={styles.submitButton}>
//         Submit
//       </button>
//     </form>
//   </div>
// </div>
// );
//}
