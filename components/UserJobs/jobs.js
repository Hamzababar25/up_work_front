"use client";
import { motion } from "framer-motion";

const jobsData = [
  {
    title: "Frontend Developer",
    description:
      "We are looking for a skilled frontend developer to join our team.",
    pricePerHour: 50,
  },
  {
    title: "UX/UI Designer",
    description:
      "We need a creative UX/UI designer who can bring our product to life.",
    pricePerHour: 60,
  },
  {
    title: "Data Analyst",
    description:
      "Join our data team to analyze and interpret complex data sets.",
    pricePerHour: 55,
  },
  // Add more job data as needed
];

const JobsPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">Jobs</h1>
      <div>
        {jobsData.map((job, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white rounded p-4 mb-4"
          >
            <h2 className="text-xl font-bold">{job.title}</h2>
            <p className="text-gray-600 mb-2">{job.description}</p>
            <p className="text-blue-500 font-bold">
              ${job.pricePerHour} per hour
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default JobsPage;
