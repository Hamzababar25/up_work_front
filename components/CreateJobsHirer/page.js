"use client";
import React, { useEffect, useState } from "react";

const CreateJobsHirer = () => {
  const [description, setDescription] = useState("");
  const [projectName, setProjectName] = useState("");
  const [budget, setBudget] = useState("");
  const [keylist, setKeylist] = useState("");
  const [userId, setUserId] = useState("");
  const [bidPlaced, setBidPlaced] = useState(false);

  useEffect(() => {
    const userId = sessionStorage.getItem("user");
    console.log(userId);
    setUserId(userId);
  }, []);
  const handlePlaceBid = async () => {
    try {
      const keyListArray = keylist.split(",").map((item) => item.trim());
      const response = await fetch("http://localhost:3001/Jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: projectName,
          budget: budget,
          description: description,
          key_list: keyListArray, // Replace 'job_id_here' with the actual job ID
          user: userId, // Replace 'user_id_here' with the actual user ID
        }),
      });
      if (response.ok) {
        console.log("Job Posted successfully!");
        setBidPlaced(true);
        setBudget("");
        setDescription("");
        setKeylist("");
        setProjectName("");

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
    <div className="w-full">
      {/* Section with input fields */}
      <div className="w-1/2 float-left  h-full">
        <h1 className="text-4xl  font-bold mb-6">
          Create Jobs According To Your{" "}
          <span className="text-blue-400">Requirments</span>
        </h1>
        {/* Input fields go here */}
        <div className="mb-4 pt-10 ">
          <label className="block text-gray-700 text-lg font-semibold  mb-2">
            Project Name:
          </label>
          <p className="text-sm font-semibold mb-2 ">
            You can enter budget on the basis of per hour, per month or as a
            whole .
          </p>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="Project Name"
          />

          <label className="block text-gray-700 text-lg font-semibold  mb-2 pt-10">
            Project Budget:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            placeholder="Project Name"
          />

          <p className="text-lg font-semibold mb-2 pt-10">
            Describe your Project:
          </p>
          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Describe your Requirement"
          ></textarea>

          <label className="block text-gray-700 text-lg font-bold mb-2 pt-10">
            What skills are required?
          </label>
          <p className="text-sm font-semibold mb-2 ">
            Enter up to minimum 3 skills using commas, that best describe your
            project. Freelancers will use these skills to find projects they are
            most interested and experienced in.
          </p>
          <input
            className="shadow appearance-none border rounded h-20 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            value={keylist}
            onChange={(e) => setKeylist(e.target.value)}
            placeholder="Enter Skills"
          />
          <div className="relative  h-[1.5rem ] pt-7">
            <button
              onClick={handlePlaceBid}
              className={`bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md absolute -bottom-4 right-1 ${
                bidPlaced ? "bg-green-500" : ""
              }`}
            >
              {bidPlaced ? <span>Job Posted Successfully</span> : "Post Job"}
              {bidPlaced && (
                <div
                  className="bg-green-500 absolute inset-0 rounded-md"
                  style={{ opacity: 0.3 }}
                ></div>
              )}
            </button>
          </div>
        </div>
        {/* Repeat similar structure for other input fields */}
      </div>

      {/* Section with image */}
      <div className="w-1/2 float-left  ">
        <img src="/jnjn.avif" alt="Image" className="w-full " />
      </div>
    </div>
  );
};

export default CreateJobsHirer;
