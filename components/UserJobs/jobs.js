"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

const JobsPage = () => {
  const router = useRouter();
  const [jobsData, setJobsData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobsData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/Jobs");
        console.log(response.data, "kk");
        setJobsData(response.data);
      } catch (error) {
        console.error("Error fetching job data:", error);
        setError("Error fetching job data. Please try again later.");
      }
    };

    fetchJobsData();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/Jobs/jobs/search/${searchQuery}`
      );
      console.log(response.data.result, "jkj");
      setJobsData(response.data.result);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="flex  w-full justify-center items-center mb-4">
        <input
          type="text"
          placeholder="Search jobs by keywords"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 border w-1/2 border-gray-300 rounded-l mr-2"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-500 text-white rounded-r"
        >
          Search
        </button>
      </div>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <h1 className="text-4xl font-bold mb-8">Jobs</h1>
      <div>
        {jobsData.length === 0 ? (
          <div className="text-gray-600">No jobs were found.</div>
        ) : (
          jobsData.map((job, index) => (
            <Link href={`/User/jobDetails?jobId=${job.id}`} key={index}>
              <div className="bg-white rounded p-4 mb-4 cursor-pointer ">
                <div className=" flex   ">
                  <div className="w-2/4 ">
                    <h2 className="text-xl font-bold ">{job.title}</h2>
                  </div>

                  <div className="w-2/4 flex justify-center ">
                    <div className="  flex text-lg font-bold    ">
                      <h1>{job.bidCount} Bids</h1>
                      <h1 className="ml-10 rounded-full pl-3   bg-green-500 text-gray-100 w-20 h-8">
                        {job.status ? "Open" : "Closed"}
                      </h1>{" "}
                      {/* Conditional rendering of status */}{" "}
                    </div>
                  </div>
                </div>

                <p className="text-blue-600 font-bold mb-2 mt-4">
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

export default JobsPage;
