"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const [userDetails, setUserDetails] = useState(null);
  const router = useRouter();

  const handleClick = () => {
    router.push("/User/Sidebar");
  };

  useEffect(() => {
    // Fetch user details after successful sign-in
    const userId = sessionStorage.getItem("user");

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
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="bg-gray-100 min-h-screen p-8"
    >
      {userDetails && (
        <div className="mb-8 text-center">
          <img
            src={userDetails?.image}
            alt="User Profile"
            className="w-32 h-32 rounded-full mx-auto mb-4"
          />
          <h1 className="text-4xl font-bold">{userDetails?.fullname}</h1>
          <p className="text-gray-600">{userDetails?.mail}</p>
        </div>
      )}

      <h2 className="text-3xl font-semibold mb-4">Your Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Grid Item 1 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">Your Stats</h3>
          <p className="text-gray-600 mb-4">
            Track your progress and achievements.
          </p>
          {/* Add charts, stats, or any relevant data visualization here */}
        </div>

        {/* Grid Item 2 */}
        <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">Latest Jobs</h3>
          <p className="text-gray-200 mb-4">
            Explore and apply for the latest opportunities.
          </p>
          {/* Add job listings or relevant information here */}
        </div>

        {/* Grid Item 3 */}
        <div className="bg-green-500 text-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">Upcoming Events</h3>
          <p className="text-gray-200 mb-4">
            Stay informed about upcoming events and workshops.
          </p>
          {/* Add event details or relevant information here */}
        </div>

        {/* Add more grid items as needed */}
      </div>

      <button
        onClick={handleClick}
        className="mt-8 bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition duration-300"
      >
        Explore Jobs
      </button>
    </motion.div>
  );
};

export default Dashboard;
