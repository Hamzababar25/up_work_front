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
import utility from "../utils/utility";

function HirerProfilePage() {
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

  const handleEditClickFalse = () => {
    // Update the isHidden state to false when the "Edit" link is clicked
    setIsHidden(false);
  };
  async function handleEditClickTrue() {
    try {
      // Prepare data to send in the PUT request
      const requestData = {
        file: selectedFile, // Assuming you have a file input for image
        videofile: selectedVideo, // Assuming you have a file input for video
        fullname: FirstName + LastName, // Assuming you have a file input for
        phoneNumber: PhoneNumber,
        dob: DOB,
      };

      // Make the PUT request to your API endpoint
      const response = await fetch(`http://localhost:3001/User/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // Add any other headers as needed
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        // Handle error here

        console.error("Error updating user:", response.statusText);
        return;
      }

      // Assuming your API returns a JSON response
      const responseData = await response.json();
      setUserDetails({});
      // Check the success flag in the response
      if (responseData.success) {
        // Optionally, update local state or perform any other actions
        console.log("User updated successfully:", responseData.result);
      } else {
        // Handle API response failure
        console.error("Error updating user:", responseData.error);
      }
    } catch (error) {
      // Handle any unexpected errors
      console.error("An error occurred:", error);
    }
    // Update the isHidden state to false when the "Edit" link is clicked
    setIsHidden(true);
  }
  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  useEffect(() => {
    // Fetch user details after successful sign-in
    // const userId = sessionStorage.getItem("user");
    // console.log("janjn", userId); // assuming you store the user ID in sessionStorage

    // Make an API request to fetch user details based on userId
    // Use your backend API URL
    fetch(`http://localhost:3001/Hirer/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setUserDetails(data.result);
        console.log("data", data.result);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });
  }, [Object.keys(userDetails).length]); // Run

  const handleImage = (e) => {
    let file = null;
    file = URL.createObjectURL(e.target.files[0]);

    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setImageUrl(reader.result);
      setChangeImage(true);
      setSelectedFile(e.target.files[0]);

      utility
        .convertBase64(e.target.files[0])
        .then((response) => {
          let convertedFile = response;

          setSelectedFile(convertedFile);
        })
        .catch((error) => {
          toast.error("file can not be converted into base64");
        });
    };
    reader.onerror = function (error) {};
  };
  const handleReSet = () => {
    setImageUrl("");
    setSelectedFile(null);
    setChangeImage(false);
  };
  function handleVideo(e) {
    let file = null;
    file = URL.createObjectURL(e.target.files[0]);

    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setVideoUrl(reader.result);

      setSelectedVideo(e.target.files[0]);

      utility
        .convertBase64(e.target.files[0])
        .then((response) => {
          let convertedFile = response;

          setSelectedVideo(convertedFile);
        })
        .catch((error) => {
          toast.error("file can not be converted into base64");
        });
    };
    reader.onerror = function (error) {};
  }
  return (
    <div className="w-full">
      <div className=" flex w-full items-center ">
        <h1 className="text-2xl font-semibold  text-black">Profile </h1>{" "}
      </div>
      {isHidden ? (
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
                onClick={handleEditClickFalse}
              >
                <FaRegEdit className="text-xl text-white" />
                <p className="ml-2">Edit</p>
              </button>
            </div>
          </div>

          <div className="mt-8">
            <div className="text-2xl font-medium mb-4">
              Personal Information
            </div>
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
                <p className="text-black font-medium">
                  {userDetails?.fullname}
                </p>
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
      ) : (
        <div className="bg-white ">
          <div className="flex h-1/5 w-full items-center pl-20 pt-2 ">
            <div className=" h-2/3 w-28 rounded-full  ">
              {" "}
              <img
                src={selectedFile}
                className=" rounded-full object-scale-down h-28 w-96 border border-blue-100 ..."
              />
            </div>

            <div className=" flex flex-col gap-1 h-3/4 w-9/12 pl-6"></div>

            <div className="flex h-1/4 w-1/6 mb-20 justify-center ">
              {" "}
              <button
                className=" flex items-center justify-center h-full px-4 py-2 w-8/12 bg-[#A5CD39] text-white rounded-lg"
                onClick={handleEditClickTrue}
              >
                {" "}
                <p className=" w-10 "> Save</p>{" "}
              </button>{" "}
            </div>
          </div>

          <div className="flex flex-col gap-4 h-1/6 w-full pl-20">
            <div className="flex gap-6">
              <button
                onClick={(e) => {
                  setOpen(true);
                }}
                className="w-28 px-4 py-2 rounded-lg bg-[#3E8914] text-white"
              >
                Upload
              </button>{" "}
              <Transition.Root show={open} as={Fragment}>
                <Dialog
                  as="div"
                  className="relative z-10"
                  initialFocus={cancelButtonRef}
                  static
                  onClose={() => null}
                >
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                  </Transition.Child>
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  >
                    <div className="fixed inset-0 z-10 overflow-y-auto">
                      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all dark:bg-secondaryBg sm:my-8 sm:w-full sm:max-w-lg">
                          <div className="my-4">
                            {(!changeImage || imageUrl === "") && (
                              <div className="w-full">
                                <div className="w-full px-2 py-4 lg:mt-6 md:p-4">
                                  <div className=" w-full flex flex-col items-center space-y-3 bg-white border-2 border-[#3E8914] border-dashed rounded-md p-4">
                                    <h1 className=" text-sm text-black">
                                      Upload Picture
                                    </h1>
                                    <div>
                                      <input
                                        onChange={(e) => {
                                          handleImage(e);
                                          setOpen(false);
                                        }}
                                        onClick={(event) => {
                                          event.target.value = null;
                                        }}
                                        accept="image/*"
                                        style={{ display: "none" }}
                                        id="image"
                                        type="file"
                                      />
                                      <label
                                        className="cursor-pointer"
                                        htmlFor="image"
                                      >
                                        <div className="flex flex-col justify-center items-center h-full">
                                          <BsUpload size={76} color="#3E8914" />
                                        </div>
                                      </label>
                                    </div>
                                    <p className="text-center text-black text-xs font-thin">
                                      Click to upload Picture
                                    </p>
                                  </div>
                                </div>
                                <div className=" absolute top-0 right-0 w-10 ml-2 h-9 rounded-full ]  ">
                                  <button
                                    type="button"
                                    className="focus:ring-offset h-9 w-9 rounded-full     text-black shadow-sm hover:bg-[#DCE0E1] focus:outline-none focus:ring focus:ring-white"
                                    onClick={() => {
                                      handleReSet();
                                      setOpen(false);
                                    }}
                                  >
                                    <IoIosCloseCircle className="text-4xl " />
                                  </button>
                                </div>
                              </div>
                            )}

                            {
                              <div className="flex justify-center items-center border">
                                <div
                                  style={{
                                    backgroundImage:
                                      imageUrl !== ""
                                        ? `url(${imageUrl})`
                                        : "url()",
                                  }}
                                  className="h-32 w-1/2 bg-no-repeat bg-contain relative"
                                >
                                  {changeImage && (
                                    <div
                                      onClick={() => {
                                        setChangeImage(false);
                                      }}
                                      className="absolute right-2 border-2 top-2 bg-gray-400 border-white rounded-full hover:bg-gray-300"
                                    >
                                      <IconButton
                                        style={{ color: "white" }}
                                        aria-label="edit"
                                      >
                                        <AiFillEdit />
                                      </IconButton>
                                    </div>
                                  )}
                                </div>
                                <div className=" absolute top-0 right-0 w-10 ml-2 h-9 rounded-full ]  ">
                                  <button
                                    type="button"
                                    className="focus:ring-offset h-9 w-9 rounded-full     text-black shadow-sm hover:bg-[#DCE0E1] focus:outline-none focus:ring focus:ring-white"
                                    onClick={() => {
                                      setOpen(false);
                                    }}
                                  >
                                    <IoIosCloseCircle className="text-4xl " />
                                  </button>
                                </div>
                              </div>
                            }
                          </div>
                        </Dialog.Panel>
                      </div>
                    </div>
                  </Transition.Child>
                </Dialog>
              </Transition.Root>
              <button className="w-28 px-4 py-2 rounded-lg bg-slate-200 text-slate-500">
                Remove
              </button>{" "}
            </div>
            <div className=" h-12 w-2/5 ">
              {" "}
              <p className="text-opacity-75 text-gray-600 text-sm">
                The proposed size is 350px * 180px. No bigger than 2.5mb
              </p>{" "}
            </div>
          </div>

          <div className=" flex flex-col h-4/5 w-4/5   pl-20">
            <div className="flex flex-col gap-2 h-20 w-1/3 ">
              {" "}
              {/* <p className="text-opacity-75 text-gray-600 text-sm">
                Email
              </p>{" "} */}
              <TextField
                id="standard-basic"
                type="text"
                required
                label="Enter First Name"
                placeholder="First Name"
                value={FirstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                size="small"
                className="w-full  rounded-md border  bg-[#F7F8F9]"
              />{" "}
            </div>
            <div className="flex flex-col gap-2 h-20 w-1/3 ">
              {" "}
              {/* <p className="text-opacity-75 text-gray-600 text-sm">
                Last Name
              </p>{" "} */}
              <TextField
                id="standard-basic"
                label="Enter Last Name"
                placeholder="Last Name"
                required
                value={LastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                size="small"
                className="w-full  rounded-md border  bg-[#F7F8F9]"
              />{" "}
            </div>

            <div className="flex flex-col gap-2 h-20 w-1/3 ">
              {" "}
              {/* <p className="text-opacity-75 text-gray-600 text-sm">
                Phone Number
              </p>{" "} */}
              <TextField
                id="standard-basic"
                type="number"
                required
                label="Enter Phone Number"
                placeholder="Phone Number"
                value={PhoneNumber}
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                }}
                size="small"
                className="w-full  rounded-md border  bg-[#F7F8F9]"
              />{" "}
            </div>

            <div className="flex flex-col gap-2 h-20 w-1/3 ">
              {" "}
              {/* <p className="text-opacity-75 text-gray-600 text-sm">
                Date Of Birth
              </p>{" "} */}
              <TextField
                id="standard-basic"
                type="date"
                required
                value={DOB}
                onChange={(e) => {
                  setDOB(e.target.value);
                }}
                size="small"
                className="w-full  rounded-md border  bg-[#F7F8F9]"
              />{" "}
            </div>

            <div className="flex flex-col gap-2 h-32 w-1/3 bg-black">
              <label htmlFor="video">Upload Resume Video</label>
              <input
                id="video"
                type="file"
                accept="video/*"
                onChange={(e) => {
                  handleVideo(e);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HirerProfilePage;

// "use client"; // pages/index.js
// import React, { useState } from "react";
// import { FaEdit } from "react-icons/fa";
// import { motion } from "framer-motion";

// const ProfileCard = ({
//   fullName,
//   phoneNumber,
//   description,
//   languages,
//   certificates,
//   videoUrl,
//   onEdit,
// }) => {
//   return (
//     <div className="bg-white p-8 shadow-lg rounded-lg">
//       <div className="flex items-center mb-4">
//         <img
//           src="your-profile-image.jpg"
//           alt="Profile"
//           className="w-16 h-16 rounded-full mr-4"
//         />
//         <div>
//           <h1 className="text-2xl font-bold">{fullName}</h1>
//           <p className="text-gray-600">{phoneNumber}</p>
//         </div>
//         <button onClick={onEdit} className="ml-auto">
//           <FaEdit />
//         </button>
//       </div>
//       <p className="text-gray-800">{description}</p>
//       <p className="text-gray-800">Languages: {languages}</p>
//       <p className="text-gray-800">Certificates: {certificates}</p>
//       <div className="mt-4">
//         <h2 className="text-xl font-bold mb-2">Resume Video</h2>
//         <iframe width="560" height="315" src={videoUrl} title="Resume Video" />
//       </div>
//     </div>
//   );
// };

// const EditProfileModal = ({ onClose }) => {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: -50 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: -50 }}
//       transition={{ duration: 0.3 }}
//       className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center"
//     >
//       {/* Modal content goes here */}
//       <div className="bg-white p-8 shadow-lg rounded-lg">
//         {/* Include form fields for editing profile details */}
//         <button onClick={onClose}>Close</button>
//       </div>
//     </motion.div>
//   );
// };

// const MyProfilePage = () => {
//   const [isEditing, setIsEditing] = useState(false);

//   const handleEdit = () => {
//     setIsEditing(true);
//   };

//   const handleCloseEdit = () => {
//     setIsEditing(false);
//   };

//   // Mock data (replace with your actual data)
//   const profileData = {
//     fullName: "John Doe",
//     phoneNumber: "123-456-7890",
//     description: "Web Developer",
//     languages: "JavaScript, HTML, CSS",
//     certificates: "React Developer Certificate",
//     videoUrl: "https://www.youtube.com/embed/your-resume-video-id",
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="max-w-3xl w-full">
//         <ProfileCard {...profileData} onEdit={handleEdit} />
//       </div>
//       {isEditing && <EditProfileModal onClose={handleCloseEdit} />}
//     </div>
//   );
// };

// export default MyProfilePage;
