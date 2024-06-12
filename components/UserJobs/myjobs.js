"use client";
import { motion } from "framer-motion";

const myJobsData = [
  {
    title: "Backend Developer",
    description:
      "Create and maintain backend services for our web applications.",
    pricePerHour: 55,
    status: "In Progress",
  },
  {
    title: "Mobile App Developer",
    description:
      "Develop cross-platform mobile applications using React Native.",
    pricePerHour: 60,
    status: "Completed",
  },
  {
    title: "Data Scientist",
    description:
      "Utilize machine learning algorithms to analyze and predict trends.",
    pricePerHour: 65,
    status: "Pending",
  },
  // Add more job data as needed
];

const MyJobsPage = () => {
  return (
    <div className=" min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">My Jobs</h1>
      <div>
        {myJobsData.map((job, index) => (
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
        ))}
      </div>
    </div>
  );
};

export default MyJobsPage;
