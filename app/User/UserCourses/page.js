"use client";
import React, { useState, useEffect, Fragment } from "react";
import { Card, CardContent, Grid, Typography, Button } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import { FaUser } from "react-icons/fa";
import { Dialog, Transition } from "@headlessui/react";

function GETUserCourses({ page }) {
  const [userData, setUserData] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const userId = sessionStorage.getItem("user");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/User/${userId}`, {
          headers: {
            Accept: "application/json",
          },
        });

        console.log(response.status, "habibi");
        if (parseInt(response.status) === 200) {
          const data = await response.json();
          console.log("dataa", data.result.courses);
          setUserData(data.result.courses);
        } else {
          console.error("Error lun user data:", data.error);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [page]);

  // console.log(userData);
  return (
    <div className="">
      <Typography variant="h4" className="mt-2 mb-4 text-gray-800">
        Courses List
      </Typography>

      <div class="grid-cols-1 sm:grid md:grid-cols-2 xl:grid-cols-3 mt-10 gap-y-10 ">
        {userData?.map((user) => (
          <Link href={`/User/CourseDetails?courseId=${user.id}`}>
            <div
              class="block max-w-[20rem] rounded-lg bg-white text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-white"
              onClick={() => {}}
            >
              <div class="relative overflow-hidden bg-cover bg-no-repeat">
                {user?.image ? (
                  <img class="rounded-t-lg w-full" src={user.image} alt="" />
                ) : (
                  <img class="rounded-t-lg w-full" src="/emp.png" alt="" />
                )}
              </div>
              <div class="p-6 flex flex-col space-y-2 items-center bg-white border">
                <p class="text-base">{user.title}</p>
                <p className="text-blue-700">{user.description}</p>
                {/* <p>{user.phoneNumber}</p> */}
              </div>
            </div>
          </Link>
        ))}{" "}
      </div>

      {/* <div className="mt-6 sm:flex sm:items-center sm:justify-between ">
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
      </div> */}
    </div>
  );
}

function UserCourses({}) {
  return (
    <div>
      <GETUserCourses />
    </div>
  );
}
export default UserCourses;
