"use client";
import { motion } from "framer-motion";
import { useEffect, useState, Fragment } from "react";
import axios from "axios";
import Link from "next/link";
import { Dialog, Transition } from "@headlessui/react";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import utility from "../utils/utility";

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
    const checkUserVerification = async () => {
      try {
        const response = await axios.get(utility.BASE_URL + `User/${userId}`);
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
      const response = await fetch(utility.BASE_URL + "Bids", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bid_amount: bidAmount,
          proposal: proposal,
          jobs: apiJobData.id,
          user: userId,
        }),
      });
      if (response.ok) {
        console.log("Bid placed successfully!");
        setBidPlaced(true);
      } else {
        console.error("Failed to place bid:", response.statusText);
      }
    } catch (error) {
      console.error("Error placing bid:", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-3xl font-bold text-blue-700 mb-8">
        {jobsData.title}
      </h1>
      <div className="flex mb-8 gap-x-4 border-b border-blue-500 pb-2">
        <Link
          href={`/User/JobProposals?jobId=${apiJobData.id}`}
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        >
          Proposals
        </Link>
      </div>
      <div className="xl:flex xl:w-full xl:gap-x-6">
        <motion.div
          whileTap={{ scale: 0.95 }}
          className="rounded p-6 mb-4 xl:w-3/4 lg:w-full bg-white shadow-lg"
        >
          <div className="flex w-full justify-between mb-4">
            <p className="text-xl font-bold">Project Details</p>
            <p className="text-xl font-bold text-green-500">
              {jobsData.budget}
            </p>
          </div>
          <p className="text-lg mb-4">{jobsData.description}</p>
          <p className="text-lg font-bold mt-6">Skills Required</p>
          <div className="flex flex-wrap mt-4">
            {jobsData.key_list &&
              jobsData.key_list.map((keyItem, index) => (
                <div
                  key={index}
                  className="flex items-center mb-2 mr-4 px-3 py-1 bg-blue-100 text-blue-600 rounded-full"
                >
                  <p>{keyItem}</p>
                </div>
              ))}
          </div>
        </motion.div>
        <motion.div
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg p-6 mb-4 xl:w-1/4 h-auto lg:w-2/4 flex flex-col shadow-lg text-white"
        >
          <h2 className="text-2xl font-bold mb-6">About the Client</h2>
          {jobsData.hirer && (
            <div className="flex flex-col items-center mb-6">
              <img
                src={jobsData.hirer.image}
                alt="User Profile"
                className="rounded-full h-40 w-40 border-4 border-green-500 object-cover"
              />
            </div>
          )}
          {jobsData.hirer && (
            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold">Name</p>
                <span className="text-base">{jobsData.hirer.fullname}</span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold">Location</p>
                <span className="text-base">{jobsData.hirer.City}</span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold">Phone No</p>
                <span className="text-base">{jobsData.hirer.phoneNumber}</span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold">Mail</p>
                <span className="text-base">{jobsData.hirer.mail}</span>
              </div>
            </div>
          )}
        </motion.div>
      </div>
      <div className="mt-6">
        <motion.div className="bg-white rounded p-6 mb-4 xl:w-3/4 lg:w-full shadow-lg">
          <div className="w-full border-b pb-4 mb-4">
            <h2 className="text-xl font-bold">Place A Bid On This Project</h2>
          </div>
          <p className="mb-2">Please enter a bid between the budget limit</p>
          <div className="mb-4">
            <p className="text-lg font-semibold mb-2">Bid Amount</p>
            <input
              type="number"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              className="w-2/5 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter your bid in PKR"
            />
          </div>
          <div className="mb-4">
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
          </div>
          <div className="relative h-[1.5rem]">
            <button
              onClick={handlePlaceBid}
              className={`bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md absolute -bottom-4 right-1 ${
                bidPlaced ? "bg-green-500" : ""
              }`}
            >
              {bidPlaced ? "Bid Placed Successfully" : "Place Bid"}
              {bidPlaced && (
                <div
                  className="bg-green-500 absolute inset-0 rounded-md"
                  style={{ opacity: 0.3 }}
                ></div>
              )}
            </button>
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
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">
                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                          <svg
                            className="h-6 w-6 text-red-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M13 16h-1v-4h-1m0-4h.01M12 18h.01M4.293 4.293a1 1 0 011.414 0L12 10.586l6.293-6.293a1 1 0 111.414 1.414L13.414 12l6.293 6.293a1 1 0 01-1.414 1.414L12 13.414l-6.293 6.293a1 1 0 01-1.414-1.414L10.586 12 4.293 5.707a1 1 0 010-1.414z"
                            ></path>
                          </svg>
                        </div>
                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                          <Dialog.Title
                            as="h3"
                            className="text-lg font-medium leading-6 text-gray-900"
                          >
                            Verification Needed
                          </Dialog.Title>
                          <div className="mt-2">
                            <p className="text-sm text-gray-500">
                              Please get verified to place a bid.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <Button
                        type="button"
                        variant="contained"
                        color="primary"
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={() => setIsModalOpen(false)}
                      >
                        Close
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

export async function getServerSideProps(context) {
  try {
    const { id } = context.query;
    const response = await axios.get(utility.BASE_URL + `Jobs/${id}`);
    const apiJobData = response.data;
    return { props: { apiJobData } };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { props: { apiJobData: null } };
  }
}
