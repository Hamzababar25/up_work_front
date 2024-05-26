"use client";
import { motion } from "framer-motion";
import { useEffect, useState, Fragment } from "react";
import axios from "axios";
import Link from "next/link";
import { Dialog, Transition } from "@headlessui/react";
import { Card, CardContent, Grid, Typography, Button } from "@mui/material";
import { useRouter } from "next/navigation";

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
  const [bidAmount, setBidAmount] = useState("");
  const [proposal, setProposal] = useState("");
  const [jobsData, setJobsData] = useState([]);
  const [userId, setUserId] = useState([]);
  const [verified, setVerified] = useState(false);
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const [bidPlaced, setBidPlaced] = useState(false);
  console.log(apiJobData.id, "vd");
  useEffect(() => {
    // Check if the user is already verified
    const checkUserVerification = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/User/${userId}`
        );
        console.log(response);
        setVerified(response.data.result.verified);
      } catch (error) {
        console.error("Error checking verification status:", error);
      }
    };

    checkUserVerification();
  }, [userId]);

  useEffect(() => {
    const userId = sessionStorage.getItem("user");

    setUserId(userId);
    setJobsData(apiJobData);
  }, [apiJobData]);
  const handlePlaceBid = async () => {
    try {
      if (!verified) {
        setMessage("Please get verified first.");
        setIsModalOpen(true);
        return;
      }
      const response = await fetch("http://localhost:3001/Bids", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bid_amount: bidAmount,
          proposal: proposal,
          jobs: apiJobData.id, // Replace 'job_id_here' with the actual job ID
          user: userId, // Replace 'user_id_here' with the actual user ID
        }),
      });
      if (response.ok) {
        console.log("Bid placed successfully!");
        setBidPlaced(true);
        // You can add further logic here, such as displaying a success message or redirecting the user
      } else {
        console.error("Failed to place bid:", response.statusText);
        // Handle error conditions here
      }
    } catch (error) {
      console.error("Error placing bid:", error);
      // Handle network errors or other exceptions here
    }
  };
  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-2xl font-semibold mb-8">{jobsData.title}</h1>
      <div className="flex mb-8 gap-x-4 border-b border-blue-400">
        {/* <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border-b border-blue-500 hover:border-transparent ">
          Details
        </button> */}
        <Link
          href={`/User/JobProposals?jobId=${apiJobData.id}`}
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
          className="bg-white rounded p-4 mb-4 xl:w-1/4 h-2/4 lg:ml-52 xl:ml-2 lg:w-2/4  flex flex-col"
        >
          <h2 className="text-xl font-bold mb-4 ">About the client</h2>
          <div className="flex-shrink-0  ">
            <img
              src="/jnjn.avif"
              alt="User Profile"
              className="rounded-full h-40 w-40 border-4 border-green-500 object-cover"
            />
          </div>
          <div className="flex items-center mb-2 mt-10">
            {jobsData.hirer && (
              <p className="text-blue-500 ">
                Name <span className="ml-16">{jobsData.hirer.fullname}</span>
              </p>
            )}
          </div>
          <div className="flex items-center mb-2">
            {jobsData.hirer && (
              <p className="text-blue-500">
                Location{" "}
                <span className="ml-10">{jobsData.hirer.location}</span>
              </p>
            )}
          </div>
          <div className="flex items-center mb-2">
            {jobsData.hirer && (
              <p className="text-blue-500">
                Country <span className="ml-12">{jobsData.hirer.fullname}</span>
              </p>
            )}
          </div>
          <div className="flex items-center mb-2">
            {jobsData.hirer && (
              <p className="text-blue-500">
                Phone No{" "}
                <span className="ml-8">{jobsData.hirer.phoneNumber}</span>
              </p>
            )}
          </div>
          <div className="flex items-center mb-2">
            {jobsData.hirer && (
              <p className="text-blue-500">
                Mail <span className="ml-20">{jobsData.hirer.mail}</span>
              </p>
            )}
          </div>
        </motion.div>
      </div>

      <div>
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
        <Transition.Root show={isModalOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={setIsModalOpen}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-800 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">
                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"></div>
                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                          <Dialog.Title
                            as="h3"
                            className="text-lg leading-6 font-medium text-gray-900"
                          >
                            Verification
                          </Dialog.Title>
                          <div className="mt-2">
                            <p className="text-sm text-gray-500">
                              {message && <p>{message}</p>}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                      <Button
                        type="button"
                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:w-auto sm:text-sm"
                        onClick={() => router.back()}
                      >
                        OK
                      </Button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      </div>
    </div>
  );
}

export default JobsDetailPage;
