"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Dashboard = () => {
  const [userDetails, setUserDetails] = useState(null);
  //const userId = sessionStorage.getItem("user");

  console.log(userDetails);

  useEffect(() => {
    // Fetch user details after successful sign-in
    const userId = sessionStorage.getItem("user");
    console.log("janjn", userId); // assuming you store the user ID in sessionStorage

    // Make an API request to fetch user details based on userId
    // Use your backend API URL
    fetch(`http://localhost:3001/User/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setUserDetails(data.result);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });
  }, []); // Run the effect once after component mount

  // ... rest of your component code
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
  };
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="bg-gray-100 min-h-screen flex flex-col items-center justify-center"
    >
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
      {userDetails && (
        <p className="mb-4">
          Welcome, {userDetails.fullname}! {/* Display user's name */}
        </p>
      )}
      {/* ... rest of your component code */}
    </motion.div>
  );
};

export default Dashboard;
