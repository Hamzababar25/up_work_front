"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import utility from "../utils/utility";

const MyJobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const userId = sessionStorage.getItem("user"); // Replace this with the actual userId

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          utility.BASE_URL + `Jobs/jobs/search//user/${userId}`
        );
        setJobs(response.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, [userId]);

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">My Jobs</h1>
      <div>
        {jobs.length === 0 ? (
          <div className="text-gray-600">No jobs were found.</div>
        ) : (
          jobs.map((job) => (
            <motion.div
              key={job.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white rounded p-4 mb-4 flex items-center justify-between"
            >
              <div>
                <h2 className="text-xl font-bold mb-3">{job.title}</h2>
                <p className="text-gray-600 mb-3">{job.description}</p>
                <p className="text-blue-500 font-bold">{job.budget}</p>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyJobsPage;
