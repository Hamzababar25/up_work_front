"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";

// const jobsData = [
//   {
//     title: "Frontend Developer",
//     description:
//       "We are looking for a skilled frontend developer to join our team.",
//     pricePerHour: 50,
//   },
//   {
//     title: "UX/UI Designer",
//     description:
//       "We need a creative UX/UI designer who can bring our product to life.",
//     pricePerHour: 60,
//   },
//   {
//     title: "Data Analyst",
//     description:
//       "Join our data team to analyze and interpret complex data sets.",
//     pricePerHour: 55,
//   },
//   // Add more job data as needed
// ];

function JobsDetailPage({ apiJobData }) {
  const [jobsData, setJobsData] = useState([]);
  console.log(apiJobData.title, "vd");
  useEffect(() => {
    setJobsData(apiJobData);
  }, [apiJobData]);

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-2xl font-semibold mb-8">{jobsData.title}</h1>
      <div className="flex mb-8 gap-x-4 border-b border-blue-400">
        <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border-b border-blue-500 hover:border-transparent ">
          Details
        </button>
        <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border-b border-blue-500 hover:border-transparent ">
          Proposals
        </button>
      </div>
      <div className="flex  w-11/12 h-fit gap-x-6">
        <motion.div
          whileTap={{ scale: 0.95 }}
          className="bg-white rounded p-4 mb-4 w-3/4"
        >
          <div className="flex  w-full">
            <div className="w-1/4 ">
              <p className="text-lg font-bold  mb-10 ">Project Details</p>
            </div>
            <div className="w-3/4  flex justify-end ">
              <p className="text-lg font-bold mr-10    ">{jobsData.budget}</p>
            </div>
          </div>
          <p className="text-lg">{jobsData.description}</p>

          <p className="text-lg font-bold mt-16"> Skills Required</p>
        </motion.div>
        <motion.div
          whileTap={{ scale: 0.95 }}
          className="bg-white rounded p-4 mb-4 w-1/5 h-2/4 ml-10"
        >
          <h2 className="text-xl font-bold">{}</h2>
        </motion.div>
      </div>
    </div>
  );
}

export default JobsDetailPage;
