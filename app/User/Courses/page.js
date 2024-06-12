"use client";
import React, { useState, useEffect, Fragment } from "react";
import { Card, CardContent, Grid, Typography, Button } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import { FaUser } from "react-icons/fa";
import { Dialog, Transition } from "@headlessui/react";

function GETCourses({ page }) {
  const [userData, setUserData] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userId = sessionStorage.getItem("user");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/Courses?perPage=7&page=${page}`,
          {
            headers: {
              Accept: "application/json",
            },
          }
        );

        console.log(response.status, "habibi");
        if (parseInt(response.status) === 200) {
          const data = await response.json();
          console.log("dataa", data);
          setUserData(data);
        } else {
          console.error("Error lun user data:", data.error);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [page]);

  console.log("yolo", userData);
  const handleEnroll = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3001/User/enrollCourse`,
        {
          userId: userId, // Replace with actual user ID
          courseId: selectedCourse.id,
        }
      );

      if (response.status === 200) {
        alert("Enrolled successfully!");
      } else {
        console.error("Enrollment failed:", response.data.error);
      }
    } catch (error) {
      console.error("Error enrolling in course:", error);
    } finally {
      setIsModalOpen(false);
    }
  };

  // console.log(userData);
  return (
    <div className="">
      <Typography variant="h4" className="mt-2 mb-4 text-gray-800">
        Courses List
      </Typography>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 mt-10 gap-y-10 ">
        {userData?.users.map((user) => (
          <div
            key={user.id}
            className="block max-w-[20rem] rounded-lg  shadow-secondary-1 dark:bg-surface-dark dark:text-white"
            onClick={() => {
              setSelectedCourse(user);
              setIsModalOpen(true);
            }}
          >
            <div className="relative overflow-hidden bg-white bg-cover bg-no-repeat h-64">
              <img
                className="w-full h-full object-contain rounded-t-lg"
                src={user?.image ? user.image : "/emp.png"}
                alt={user.title}
              />
            </div>
            <div className="p-6 flex flex-col space-y-2 items-center bg-white border h-32">
              <p className="text-base">{user.title}</p>
              <p className="text-blue-700">{user.description}</p>
            </div>
          </div>
        ))}
      </div>
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
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <svg
                          className="h-6 w-6 text-red-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10 14L6 18m0 0l4-4m-4 4h12"
                          />
                        </svg>
                      </div>
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-lg leading-6 font-medium text-gray-900"
                        >
                          Enroll in Course
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Do you want to enroll in the course{" "}
                            <strong>{selectedCourse?.title}</strong>?
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <Button
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={handleEnroll}
                    >
                      Yes
                    </Button>
                    <Button
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:w-auto sm:text-sm"
                      onClick={() => setIsModalOpen(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      <div className="mt-6 sm:flex sm:items-center sm:justify-between ">
        {userData?.users !== undefined && (
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Page{" "}
            <span className="font-medium text-gray-700 dark:text-gray-100">
              {userData?.currentPage} of {userData?.lastPage}
            </span>
          </div>
        )}

        <div className="flex items-center mt-4 gap-x-4 sm:mt-0">
          {userData?.currentPage > 1 && (
            <Link
              href={`/User/Courses?page=${parseInt(userData?.currentPage) - 1}`}
              className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 rtl:-scale-x-100"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                />
              </svg>

              <span>previous</span>
            </Link>
          )}

          {userData?.currentPage < userData?.lastPage && (
            <Link
              href={`/User/Courses?page=${parseInt(userData?.currentPage) + 1}`}
              className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
            >
              <span>Next</span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 rtl:-scale-x-100"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

function Courses({ params, searchParams }) {
  let page = searchParams.page ? searchParams.page : 1;
  return (
    <div>
      <GETCourses page={page} />
    </div>
  );
}
export default Courses;
