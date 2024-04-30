"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";

const HirerJobs = () => {
  const [jobsData, setJobsData] = useState("");
  const [userId, setUserId] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const userId = sessionStorage.getItem("user");
    console.log(userId);
    setUserId(userId);
    const fetchJobsData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/Hirer/hirer/jobs/${userId}`
        );
        console.log(response.data.result, "kk");
        setJobsData(response.data.result.jobs);
      } catch (error) {
        console.error("Error fetching job data:", error);
        setError("Error fetching job data. Please try again later.");
      }
    };

    fetchJobsData();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">My Jobs</h1>
      <div>
        {jobsData.length === 0 ? (
          <div className="text-gray-600">No jobs were found.</div>
        ) : (
          jobsData.map((job, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white rounded p-4 mb-4 flex items-center justify-between"
            >
              <div>
                <h2 className="text-xl font-bold">{job.title}</h2>
                <p className="text-gray-600 mb-2">{job.description}</p>
                <p className="text-blue-500 font-bold">
                  ${job.pricePerHour} per hour
                </p>
              </div>
              <div>
                <span
                  className={`text-sm font-bold ${
                    job.status === "Completed"
                      ? "text-green-500"
                      : job.status === "In Progress"
                      ? "text-blue-500"
                      : "text-yellow-500"
                  }`}
                >
                  {job.status}
                </span>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default HirerJobs;
