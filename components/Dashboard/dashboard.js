"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";

const Dashboard = () => {
  const [category, setCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const router = useRouter();

  const handleSearch = () => {
    // Handle search logic based on selected category and search term
    // Update the results based on the search
    // ...
  };

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
      <div className="flex mb-4">
        <button
          onClick={() => setCategory("jobs")}
          className="bg-blue-500 text-white rounded p-4 mr-4"
        >
          Jobs
        </button>
        <button
          onClick={() => setCategory("courses")}
          className="bg-blue-500 text-white rounded p-4"
        >
          Courses
        </button>
      </div>
      {category && (
        <div className="mb-8">
          <input
            type="text"
            placeholder={`Enter the ${
              category === "jobs" ? "job" : "course"
            } you want to see`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-4 border rounded"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white rounded p-4 ml-4"
          >
            Search
          </button>
        </div>
      )}
      {results.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Results</h2>
          <ul>
            {results.map((result, index) => (
              <li key={index} className="mb-2">
                {result}
              </li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  );
};

export default Dashboard;
