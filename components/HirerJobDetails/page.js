"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

function HirerJobDetail({ apiJobData, apiBidData, apiUserData }) {
  const [bidAmount, setBidAmount] = useState("");
  const [proposal, setProposal] = useState("");
  const [jobsData, setJobsData] = useState([]);
  const [userId, setUserId] = useState([]);
  const [bidPlaced, setBidPlaced] = useState(false);
  const [userData, setUserData] = useState([]);
  const [bidData, setBidData] = useState([]);

  useEffect(() => {
    const userId = sessionStorage.getItem("user");
    setUserId(userId);
    setJobsData(apiJobData);
    setUserData(apiUserData || {}); // Provide default value as an empty object
    setBidData(apiBidData || {});
  }, [apiJobData, apiUserData, apiBidData]);

  const router = useRouter();

  const handleClick = (user) => {
    router.push(`/Hirer/UserProfile?userId=${user}`);
  };

  if (!userData || !bidData) {
    return <div>Loading...</div>; // or render a placeholder
  }

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        {jobsData.title}
      </h1>
      <div className="flex mb-8 gap-x-4 border-b border-blue-400 pb-4">
        <Link
          href={`/Hirer/HirerJobProposals?jobId=${apiJobData.id}`}
          className="bg-blue-100 hover:bg-blue-500 text-blue-700 hover:text-white font-semibold py-2 px-4 rounded transition duration-300"
        >
          Proposals
        </Link>
      </div>
      <div className="xl:flex xl:gap-6">
        <motion.div
          whileTap={{ scale: 0.95 }}
          className="bg-white shadow-md rounded p-6 mb-6 xl:w-3/4"
        >
          <div className="flex justify-between mb-4">
            <p className="text-lg font-bold text-gray-700">Project Details</p>
            <p className="text-lg font-bold text-green-500">
              {jobsData.budget}
            </p>
          </div>
          <p className="text-gray-700 mb-6">{jobsData.description}</p>
          <p className="text-lg font-bold text-gray-700">Skills Required</p>
          <div className="flex flex-wrap mt-4">
            {jobsData.key_list &&
              jobsData.key_list.map((keyItem, index) => (
                <div key={index} className="flex items-center mb-2 mr-4">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                  <p className="text-blue-500">{keyItem}</p>
                </div>
              ))}
          </div>
        </motion.div>
        <motion.div
          whileTap={{ scale: 0.95 }}
          className="bg-white shadow-md rounded p-6 mb-6 xl:w-1/4 flex flex-col items-center"
          onClick={() => {
            handleClick(userData.id);
          }}
        >
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            About the Freelancer
          </h2>
          <div className="mb-4">
            {userData.image ? (
              <img
                src={userData.image}
                alt="User Profile"
                className="rounded-full h-40 w-40 border-4 border-green-500 object-cover"
              />
            ) : (
              <div className="h-40 w-40 border-4 border-green-500 flex items-center justify-center text-gray-500">
                No Image
              </div>
            )}
          </div>
          {userData ? (
            <>
              <div className="text-center">
                <p className="text-blue-500 font-semibold">
                  Name: {userData.fullname}
                </p>
                <p className="text-blue-500 font-semibold">
                  Location: {userData.City}
                </p>

                <p className="text-blue-500 font-semibold">
                  Phone: {userData.phoneNumber}
                </p>
                <p className="text-blue-500 font-semibold">
                  Mail: {userData.mail}
                </p>
              </div>
            </>
          ) : (
            <p>No freelancer was assigned.</p>
          )}
        </motion.div>
      </div>
      <div>
        <div className="mb-5 mt-5 text-xl font-bold text-gray-800">
          Accepted Bid
        </div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white shadow-md rounded p-6 mb-4 flex items-center justify-between"
        >
          <div className="w-full">
            {bidData && userData ? (
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  {userData.image ? (
                    <img
                      src={userData.image}
                      alt="User Profile"
                      className="h-28 w-28 border-4 border-green-500 object-cover rounded-full"
                    />
                  ) : (
                    <div className="h-28 w-28 border-4 border-green-500 flex items-center justify-center text-gray-500">
                      No Image
                    </div>
                  )}
                </div>
                <div className="ml-6 flex flex-col">
                  <p className="text-2xl font-bold text-gray-800">
                    {userData.fullname}
                  </p>
                  <p className="text-lg font-semibold text-gray-500">
                    {userData.mail}
                  </p>
                </div>
                <div className="ml-auto text-right">
                  <p className="text-2xl font-bold text-green-500">
                    {bidData.bid_amount}
                  </p>
                </div>
              </div>
            ) : (
              <p>No bid was accepted.</p>
            )}
            {bidData && userData && (
              <div className="mt-4">
                <p className="text-sm text-gray-700 font-medium">
                  {bidData.proposal}
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default HirerJobDetail;
