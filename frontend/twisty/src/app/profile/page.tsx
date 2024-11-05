"use client";

import { useEffect, useState } from "react";

export default function Profile() {
  const [notes, setNotes] = useState(null);

  //to retrieve the data from server
  const handleRequest = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/users/getnotes", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      console.log("title:", result.title);
      setNotes(result);
    } catch (error) {
      alert(error);
    }
  };
  //used to show the notes on component
  useEffect(() => {
    handleRequest();
  }, []);
  return (
    <div>
      <h2>Data Output</h2>
      {notes ? (
        <pre>{JSON.stringify(notes, null, 2)}</pre>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
}

// import { useEffect, useState } from "react";
//
// export default function DataDisplay() {
//   const [data, setData] = useState(null);
//   const [error, setError] = useState(null);
//
//   const fetchData = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/api/users/getnotes", {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//
//       // Check if response is okay
//       if (!response.ok) {
//         throw new Error(`Server error: ${response.status}`);
//       }
//
//       const result = await response.json();
//       setData(result);
//       console.log("Data fetched successfully:", result);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       setError(error.message);
//     }
//   };
//
//   useEffect(() => {
//     fetchData();
//   }, []);
//
//   return (
//     <div>
//       <h2>Data Output</h2>
//       {error ? (
//         <p style={{ color: "red" }}>Error: {error}</p>
//       ) : data ? (
//         <pre>{JSON.stringify(data, null, 2)}</pre>
//       ) : (
//         <p>Loading data...</p>
//       )}
//     </div>
//   );
// }
