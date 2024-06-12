"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Button,
  emphasize,
} from "@mui/material";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CoursesCarousel from "../CourseCarousel/page";
import UserCoursesCarousel from "../UserCoursesCarusel/page";

const Dashboard = () => {
  const [userDetails, setUserDetails] = useState(null);
  const router = useRouter();
  const [dashboardData, setDashboardData] = useState(null);
  const [userData, setUserData] = useState("");
  const [hirerData, setHirerData] = useState("");
  const [jobData, setJobData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/Admin/totalcount/count`,
          {
            headers: {
              Accept: "application/json",
            },
          }
        );

        // console.log(response.status, "habibi");
        if (parseInt(response.status) === 200) {
          const data = await response.json();
          // console.log("dataa", data);
          setDashboardData(data);
        } else {
          console.error("Error lun user data:", data.error);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/Admin/user`, {
          headers: {
            Accept: "application/json",
          },
        });

        console.log(response.status, "habibi");
        if (parseInt(response.status) === 200) {
          const data = await response.json();
          console.log("biruh", data);
          setUserData(data);
        } else {
          console.error("Error lun user data:", data.error);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/Admin/hirer`, {
          headers: {
            Accept: "application/json",
          },
        });

        console.log(response.status, "habibi");
        if (parseInt(response.status) === 200) {
          const data = await response.json();
          console.log("biruh", data);
          setHirerData(data);
        } else {
          console.error("Error lun user data:", data.error);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/Admin/job`, {
          headers: {
            Accept: "application/json",
          },
        });

        console.log(response.status, "habibi");
        if (parseInt(response.status) === 200) {
          const data = await response.json();
          console.log("yo", data);

          setJobData(data);
        } else {
          console.error("Error lun user data:", data.error);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  const handleClick = () => {
    router.push("/User/Sidebar");
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };
  const truncateDescription = (description, wordLimit) => {
    if (!description) return "";
    const words = description.split(" ");
    if (words.length <= wordLimit) return description;
    return words.slice(0, wordLimit).join(" ") + "...";
  };
  return (
    <motion.div
      className=" min-h-screen p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Typography variant="h4" className="mt-2 mb-4">
        Dashboard
      </Typography>

      {/* <----- new ----> */}
      <div className="flex flex-row">
        <div class="flex  -mx-3 mb-5 w-full">
          <div class="w-full max-w-full px-3 mb-6  mx-auto">
            <div class="relative flex-[1_auto] flex flex-col break-words min-w-0 bg-clip-border rounded-[.95rem] bg-white m-5">
              <div class="relative flex flex-col min-w-0 break-words border border-dashed bg-clip-border rounded-2xl border-stone-200 bg-light/30">
                {/* <!-- card header --> */}
                <div class="px-9 pt-5 flex justify-between items-stretch flex-wrap min-h-[70px] pb-0 bg-transparent">
                  <h3 class="flex flex-col items-start justify-center m-2 ml-0 font-medium text-xl/tight text-dark">
                    <span class="mr-3 font-semibold text-dark">Jobs</span>
                    <span class="mt-1 font-medium text-secondary-dark text-lg/normal">
                      Latest Jobs of the App{" "}
                    </span>
                  </h3>
                  <div class="relative flex flex-wrap items-center my-2">
                    <a
                      href="javascript:void(0)"
                      class="inline-block text-[.925rem] font-medium leading-normal text-center align-middle cursor-pointer rounded-2xl transition-colors duration-150 ease-in-out text-light-inverse bg-light-dark border-light shadow-none border-0 py-2 px-5 hover:bg-secondary active:bg-light focus:bg-light"
                    >
                      {" "}
                    </a>
                  </div>
                </div>
                {/* <!-- end card header -->
<!-- card body  --> */}
                <div class="flex-auto block py-8 pt-6 px-9">
                  <div class="overflow-x-auto">
                    <table class="w-full my-0 align-middle text-dark border-neutral-200">
                      <thead class="align-bottom">
                        <tr class="font-semibold text-[0.95rem] text-secondary-dark">
                          <th class="pb-3 text-start pl-3 min-w-[175px]">
                            Title
                          </th>
                          <th class="pb-3 text-center min-w-[100px]">Budget</th>
                          <th class="pb-3  text-center min-w-[100]">
                            Description
                          </th>
                          <th class="pb-3  text-center  min-w-[100px]">
                            Created_At
                          </th>
                          {/* <th class="pb-3 pr-12 text-end min-w-[100px]">
                          DEADLINE
                        </th>
                        <th class="pb-3 text-end min-w-[50px]">DETAILS</th> */}
                        </tr>
                      </thead>
                      {jobData?.user?.slice(0, 5).map((user) => (
                        <tbody>
                          <tr class="border-b border-dashed last:border-b-0">
                            <td class="p-3 pl-0 text-start">
                              <span class="font-semibold text-light-inverse text-md/normal">
                                {user?.title}
                              </span>
                            </td>
                            <td class="p-3 pr-0 text-center">
                              <span class="font-semibold text-light-inverse text-md/normal">
                                {user?.budget}
                              </span>
                            </td>
                            <td class="p-3 pr-0 text-center">
                              <span class="text-center text-blue-400 align-baseline inline-flex px-2 py-1 mr-auto items-center font-semibold text-base/none text-success bg-success-light rounded-lg">
                                {truncateDescription(user?.description, 3)}{" "}
                              </span>
                            </td>
                            {/* <td class="p-3 pr-12 text-center">
                              <span class="text-center align-baseline inline-flex px-4 py-3 mr-auto items-center font-semibold text-[.95rem] leading-none text-primary bg-primary-light rounded-lg">
                                {" "}
                                {user?.location}
                              </span>
                            </td> */}
                            <td class="pr-0 text-center">
                              <span class="font-semibold text-light-inverse text-md/normal">
                                {formatDate(user.created_at)}
                              </span>
                            </td>
                          </tr>
                        </tbody>
                      ))}
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <Button
              onClick={handleClick}
              className=" bg-purple-500 text-white py-2 px-4 ml-4 rounded-full hover:bg-blue-600 transition duration-300"
            >
              Explore Jobs
            </Button>
          </div>
        </div>
      </div>
      <CoursesCarousel />
      <UserCoursesCarousel />
    </motion.div>
  );
};

export default Dashboard;
