"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

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
      {/* <div>
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
      </div> */}
      <div>
        {jobsData.length === 0 ? (
          <div className="text-gray-600">No jobs were found.</div>
        ) : (
          jobsData.map((job, index) => (
            <Link href={`/Hirer/hirerJobDetails?jobId=${job.id}`} key={index}>
              <div className="bg-white rounded p-4 mb-4 cursor-pointer">
                <h2 className="text-xl font-bold">{job.title}</h2>
                <p className="text-blue-600 font-bold mb-2 mt-6">
                  {job.budget}
                </p>
                <p className="text-gray-600 mb-2 mt-6">{job.description}</p>
                <p className="text-lg font-bold mt-16"> Skills Required</p>
                <div className="flex flex-wrap mt-4 ml-6">
                  {job.key_list !== undefined &&
                    job.key_list.map((keyItem, index) => (
                      <div key={index} className="flex items-center mb-2 mr-4">
                        <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                        <p className="text-blue-500">{keyItem}</p>
                      </div>
                    ))}
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default HirerJobs;
