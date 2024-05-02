"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

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

function HirerJobDetail({ apiJobData, apiUserData, apiBidData }) {
  const [bidAmount, setBidAmount] = useState("");
  const [proposal, setProposal] = useState("");
  const [jobsData, setJobsData] = useState([]);
  const [userId, setUserId] = useState([]);
  const [bidPlaced, setBidPlaced] = useState(false);
  const [userData, setUserData] = useState([]);
  const [bidData, setBidData] = useState([]);
  console.log(apiJobData.id, "vd");
  useEffect(() => {
    const userId = sessionStorage.getItem("user");
    console.log(apiUserData, "habibi");
    setUserId(userId);
    setJobsData(apiJobData);
    setUserData(apiUserData);
    setBidData(apiBidData);
  }, [apiJobData]);

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-2xl font-semibold mb-8">{jobsData.title}</h1>
      <div className="flex mb-8 gap-x-4 border-b border-blue-400">
        {/* <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border-b border-blue-500 hover:border-transparent ">
          Details
        </button> */}
        <Link
          href={`/Hirer/HirerJobProposals?jobId=${apiJobData.id}`}
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border-b border-blue-500 hover:border-transparent "
        >
          Proposals
        </Link>
      </div>
      <div className=" xl:flex  xl:w-full xl:h-fit xl:gap-x-6 ">
        <motion.div
          whileTap={{ scale: 0.95 }}
          className=" rounded p-4 mb-4 xl:w-3/4 lg:w-full bg-white"
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
          <div className="flex flex-wrap mt-4 ml-6">
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
          className="bg-white rounded p-4 mb-4 xl:w-1/4 h-2/4 lg:ml-52 xl:ml-2 lg:w-2/4 flex flex-col"
        >
          <h2 className="text-xl font-bold mb-4">About the freelancer</h2>
          <div className="flex-shrink-0">
            {userData ? (
              <img
                src={userData.image}
                alt="User Profile"
                className="rounded-full h-40 w-40 border-4 border-green-500 object-cover"
              />
            ) : (
              <div>{}</div>
            )}
          </div>
          {userData ? (
            <>
              <div className="flex items-center mb-2 mt-10">
                <p className="text-blue-500">
                  Name <span className="ml-16">{userData.fullname}</span>
                </p>
              </div>
              <div className="flex items-center mb-2">
                <p className="text-blue-500">
                  Location <span className="ml-10">{userData.location}</span>
                </p>
              </div>
              <div className="flex items-center mb-2">
                <p className="text-blue-500">
                  Country <span className="ml-12">{userData.fullname}</span>
                </p>
              </div>
              <div className="flex items-center mb-2">
                <p className="text-blue-500">
                  Phone No <span className="ml-8">{userData.phoneNumber}</span>
                </p>
              </div>
              <div className="flex items-center mb-2">
                <p className="text-blue-500">
                  Mail <span className="ml-20">{userData.mail}</span>
                </p>
              </div>
            </>
          ) : (
            <p>No freelancer was assigned.</p>
          )}
        </motion.div>
      </div>

      {/* <div>
        <motion.div className="bg-white rounded p-4 mb-4 xl:w-3/4 h-3/4 lg:w-full">
          <div className="w-full border-b">
            <h2 className="text-xl font-bold mb-4">
              Place A Bid On This Project
            </h2>
          </div>
          <p className="  mb-2 mt-5">
            Please enter a bid between the budget limit
          </p>
          <div className="mb-4 mt-10">
            <p className="text-lg  font-semibold ml-4 ">Bid Amount</p>
            <input
              type="number"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              className="w-2/5 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter your bid in PKR"
            />
          </div>
          <div className="mb-4 mt-10">
            <p className="text-lg font-semibold mb-2">
              Describe your proposal:
            </p>
            <textarea
              rows={4}
              value={proposal}
              onChange={(e) => setProposal(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Write your proposal (100 words)"
            ></textarea>
            <div className="relative  h-[1.5rem]">
              <button
                onClick={handlePlaceBid}
                className={`bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md absolute -bottom-4 right-1 ${
                  bidPlaced ? "bg-green-500" : ""
                }`}
              >
                {bidPlaced ? <span>Bid Placed Successfully</span> : "Place Bid"}
                {bidPlaced && (
                  <div
                    className="bg-green-500 absolute inset-0 rounded-md"
                    style={{ opacity: 0.3 }}
                  ></div>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </div> */}
      <div>
        <div className="mb-5 mt-5 text-xl font-bold">Accepted Bid</div>
        <motion.div
          //   key={index}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white rounded p-4 mb-4 flex items-center justify-between"
        >
          <div className="w-full">
            {bidData && userData ? (
              <div className="flex">
                <div className="flex-shrink-0">
                  {userData.image ? (
                    <img
                      src={userData.image}
                      alt="User Profile"
                      className="h-28 w-28 border-4 border-green-500 object-cover"
                    />
                  ) : (
                    <div className="h-28 w-28 border-4 border-green-500 flex items-center justify-center text-gray-500">
                      No Image
                    </div>
                  )}
                </div>
                <div className="pt-4 pl-6 flex flex-col">
                  <p className="text-2xl font-bold">{userData.fullname}</p>
                  <p className="text-lg font-semibold text-gray-500">
                    {userData.mail}
                  </p>
                  {/* Add more user details as needed */}
                </div>
                <div className="w-full flex justify-end">
                  <div className="mr-10 mt-2">
                    <p className="text-2xl font-bold">{bidData.bid_amount}</p>
                  </div>
                </div>
              </div>
            ) : (
              <p>No bid was accepted.</p>
            )}
            {bidData && userData && (
              <div className="pt-4 pl-4 flex flex-col  2x:w-1/2 lg:w-2/3">
                <p className="text-sm text-gray-700 font-medium">
                  {bidData.proposal}
                </p>
                {/* Add more user details as needed */}
              </div>
            )}
          </div>
          <div>
            {/* <span
              className={`text-sm font-bold ${
                job.status === "Completed"
                  ? "text-green-500"
                  : job.status === "In Progress"
                  ? "text-blue-500"
                  : "text-yellow-500"
              }`}
            >
              {job.status}
            </span> */}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default HirerJobDetail;
