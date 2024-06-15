"use client";
import React, { useEffect, useRef, useState, Fragment } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import { Dialog, Transition } from "@headlessui/react";
import { Card, CardContent, Grid, Typography, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import utility from "@/components/utils/utility";

const WebcamCapture = () => {
  const webcamRef = useRef(null);
  const [image, setImage] = useState(null);
  const [verified, setVerified] = useState(false);
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const userId = sessionStorage.getItem("user");

  useEffect(() => {
    // Check if the user is already verified
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

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
  };

  const sendImage = async () => {
    try {
      const response = await axios.post(utility.BASE_URL + "User/verify", {
        userId,
        image: image.split(",")[1], // Send base64 string without the prefix
      });
      setMessage(response.data.message);
      setVerified(true);
      setIsModalOpen(true);
    } catch (error) {
      console.log(error.response.data.message);
      console.error("Error sending image:", error);
      setMessage(error.response.data.message);
      setIsModalOpen(true);
    }
  };

  return (
    <div>
      {verified ? (
        <p>You are already verified</p>
      ) : (
        <div className="flex-col items-end">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={1000}
          />
          <button
            className="mt-8 mb-8 bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition duration-300"
            onClick={capture}
          >
            Capture
          </button>
          {image && (
            <>
              <img src={image} alt="captured" />
              <button
                className="mt-8 bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition duration-300"
                onClick={sendImage}
              >
                Send to API
              </button>
            </>
          )}
        </div>
      )}
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
      {message && <p>{message}</p>}
    </div>
  );
};

export default WebcamCapture;
