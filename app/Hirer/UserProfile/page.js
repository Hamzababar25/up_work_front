"use client";
import { Dialog, Transition } from "@headlessui/react";
import React, { useState, useEffect, Fragment, useRef } from "react";
import { CldVideoPlayer } from "next-cloudinary";
import Link from "next/link";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  IconButton,
} from "@mui/material";

import { FaRegEdit } from "react-icons/fa";
import { BsUpload } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
//import utility from "../utils/utility";
import { IoIosCloseCircle } from "react-icons/io";
// import utility from "../utils/utility";

function UserProfilePage(searchParams) {
  const [isHidden, setIsHidden] = useState(true);
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [DOB, setDOB] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState();
  const [Gender, setGender] = useState("");
  const [Email, setEmail] = useState("");
  const [CompanyName, setCompanyName] = useState("");
  const cancelButtonRef = useRef(null);
  const [changeImage, setChangeImage] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [userLoading, setUserLoading] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  console.log("data", userDetails);
  const userId = sessionStorage.getItem("user");

  console.log(searchParams.searchParams.userId, "userId");

  useEffect(() => {
    // Fetch user details after successful sign-in
    // const userId = sessionStorage.getItem("user");
    // console.log("janjn", userId); // assuming you store the user ID in sessionStorage

    // Make an API request to fetch user details based on userId
    // Use your backend API URL
    fetch(utility.BASE_URL + `User/${searchParams.searchParams.userId}`)
      .then((response) => response.json())
      .then((data) => {
        setUserDetails(data.result);
        console.log("data", data.result);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });
  }, [Object.keys(userDetails).length]); // Run

  return (
    <div className="w-full">
      <div className=" flex w-full items-center ">
        <h1 className="text-2xl font-semibold  text-black">Profile </h1>{" "}
      </div>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="flex items-center space-x-8">
          <div className="flex-shrink-0">
            <img
              src={userDetails?.image}
              alt="User Profile"
              className="rounded-full h-40 w-40 border-4 border-green-500 object-cover"
            />
          </div>
          <div className="flex flex-col gap-4">
            <div className="text-3xl font-bold">{FirstName}</div>
            <div className="text-base text-opacity-75 text-gray-600">
              {LastName}
            </div>
            <div className="text-base text-opacity-75 text-gray-600">
              {CompanyName}
            </div>
          </div>
          <div className="ml-auto">
            <button
              className="flex items-center justify-center px-4 py-2 bg-[#A5CD39] text-white rounded-lg"
              //   onClick={handleEditClickFalse}
            >
              <FaRegEdit className="text-xl text-white" />
              <p className="ml-2">Chat</p>
            </button>
          </div>
        </div>

        <div className="mt-8">
          <div className="text-2xl font-medium mb-4">Personal Information</div>
          <div className="grid grid-cols-2 gap-8">
            <div className="col-span-2 md:col-span-1 bg-white p-4 rounded-lg shadow-md">
              <p className="text-gray-600 text-sm mb-2">Email:</p>
              <p className="text-black font-medium">{userDetails?.mail}</p>
            </div>
            <div className="col-span-2 md:col-span-1 bg-white p-4 rounded-lg shadow-md">
              <p className="text-gray-600 text-sm mb-2">Phone:</p>
              <p className="text-black font-medium">
                {userDetails?.phoneNumber}
              </p>
            </div>
            <div className="col-span-2 bg-white p-4 rounded-lg shadow-md">
              <p className="text-gray-600 text-sm mb-2">Full Name:</p>
              <p className="text-black font-medium">{userDetails?.fullname}</p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="text-2xl font-medium">Uploaded Resume</div>
          <div className="flex justify-center mt-4">
            <video
              src={userDetails?.video}
              className="rounded-lg object-cover h-96 w-2/3 border-4 border-green-500"
              controls
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfilePage;
