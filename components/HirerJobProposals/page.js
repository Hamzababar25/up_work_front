"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import utility from "../utils/utility";

const HirerJobProposals = ({ apiJobData }) => {
  const [jobsData, setJobsData] = useState([]);
  const [bidPlaced, setBidPlaced] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (apiJobData && apiJobData.bids) {
      setJobsData(apiJobData.bids);

      // Logging bid user data to console
    }
  }, [apiJobData]);

  const handleAcceptBid = async function (jobid, bidid) {
    try {
      const response = await fetch(
        utility.BASE_URL + `Jobs/${jobid}/accept-bid`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            bidId: bidid,
          }),
        }
      );
      console.log("response", response);
      if (response.ok) {
        console.log("Job Posted successfully!");
        setSuccessMessage("Bid accepted successfully!"); // Set success message
        setTimeout(() => {
          setSuccessMessage(""); // Clear success message after 3 seconds
        }, 5000);

        // You can add further logic here, such as displaying a success message or redirecting the user
      } else {
        const errorData = await response.json();
        console.log("err", errorData); // Parse error response
        if (errorData.message) {
          setErrorMessage(errorData.message); // Set success message
          setTimeout(() => {
            setErrorMessage(""); // Clear success message after 3 seconds
          }, 5000);
        } else {
          setErrorMessage("Failed to accept bid"); // Default error message
        }
      }
    } catch (error) {
      console.log("err", error.message);
      console.error("Error placing bid:", error);
      // Handle network errors or other exceptions here
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-2xl font-semibold mb-8">{apiJobData.title}</h1>
      <div className="flex mb-8 gap-x-4 border-b border-blue-400">
        <Link
          href={`/Hirer/hirerJobDetails?jobId=${apiJobData.id}`}
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border-b border-blue-500 hover:border-transparent"
        >
          Details
        </Link>

        {/* This Link component seems incomplete or incorrect, please make sure it's properly defined */}
        {/* <Link href={`/User/jobDetails?jobId=${apiJobData.id}`} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border-b border-blue-500 hover:border-transparent ">
          Proposals
        </Link> */}
      </div>

      <div className="">
        {jobsData.length > 0 ? (
          jobsData.map((job, index) => (
            <div
              key={index}
              // whileHover={{ scale: 1.05 }}
              // whileTap={{ scale: 0.95 }}
              className="bg-white rounded p-4 mb-4 flex items-center justify-between"
            >
              <div className="w-full">
                {job.user && (
                  <Link href={`/Hirer/UserProfile?userId=${job.user.id}`}>
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <img
                          src={job.user.image}
                          alt="User Profile"
                          className="h-28 w-28 border-4 border-green-500 object-cover"
                        />
                      </div>
                      <div className="pt-4 pl-6 flex flex-col">
                        <p className="text-2xl font-bold">
                          {job.user.fullname}
                        </p>
                        <p className="text-lg font-semibold text-gray-500">
                          {job.user.mail}
                        </p>
                        <p className="text-lg font-semibold text-gray-500">
                          {job.user.phoneNumber}
                        </p>
                        {/* Add more user details as needed */}
                      </div>
                      <div className="w-full flex justify-end">
                        <div className="mr-10 mt-2">
                          <p className="text-2xl font-bold">{job.bid_amount}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                )}
                <div className="pt-4 pl-4 flex flex-col 2x:w-1/2 lg:w-2/3">
                  <p className="text-sm text-gray-700 font-medium">
                    {job.proposal}
                  </p>
                  {/* Add more user details as needed */}
                </div>
                <div className="relative  h-[1.5rem ] pt-10">
                  <button
                    onClick={() => {
                      handleAcceptBid(apiJobData.id, job.id);
                    }}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md absolute bottom-6 right-4"
                  >
                    Accept Bid
                  </button>
                  {successMessage && (
                    <p className="text-green-500 text-lg absolute top-8 right-6 ">
                      {successMessage}
                    </p>
                  )}
                  {errorMessage && (
                    <p className="text-red-500 text-lg absolute top-8 right-6 ">
                      {errorMessage}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>There were no bids for this job.</p>
        )}
      </div>
    </div>
  );
};

export default HirerJobProposals;
