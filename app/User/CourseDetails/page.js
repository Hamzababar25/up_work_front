"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/navigation";

const CourseDetails = ({ searchParams }) => {
  const [course, setCourse] = useState(null);
  const [videos, setVideos] = useState([]);
  console.log(4, searchParams.courseId);
  const router = useRouter();

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const courseResponse = await axios.get(
          `http://localhost:3001/Courses/${searchParams.courseId}`
        );
        console.log(courseResponse.data.videos, "data");
        setCourse(courseResponse.data);
        // const videosResponse = await axios.get(
        //   `http://localhost:3001/Videos?courseId=${courseId}`
        // );
        // setVideos(videosResponse.data);
      } catch (error) {
        toast.error("Error fetching course details");
      }
    };

    fetchCourseDetails();
  }, [searchParams.courseId]);

  if (!course) {
    return <div>Loading...</div>;
  }
  const handleQuizClick = (quizId) => {
    router.push(`/User/QuizAttempt?quizId=${quizId}`);
  };
  console.log(course.video, "habibi");
  return (
    <div className="container mx-auto p-8  rounded-lg shadow-lg">
      <div className="bg-white rounded-lg  shadow-md overflow-hidden">
        <div className="p-6">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            {course.title}
          </h2>
          <p className="text-blue-400 mb-4">{course.description}</p>
          {course.image && (
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-80 object-contain rounded-lg mb-2 "
            />
          )}
        </div>
      </div>
      <div className="mt-8">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Videos</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {course.videos.map((video, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <video
                src={video.url}
                controls
                className="w-full h-48 object-cover"
              >
                Your browser does not support the video tag.
              </video>
              <div className="p-4">
                <h4 className="text-lg font-medium text-gray-800">{`Video ${
                  index + 1
                }`}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-8">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Quizzes</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-4 gap-6">
          {course.quizzes.map((quiz, index) => (
            <div
              key={index}
              className=" w-fit  overflow-hidden cursor-pointer"
              onClick={() => handleQuizClick(quiz.id)}
            >
              <div className="p-4">
                <h4 className="text-lg font-medium text-gray-800">
                  {" "}
                  {"Quiz" + (index + 1)}
                </h4>
              </div>
            </div>
          ))}
        </div>
        {/* {course.quizzes.length < 4 && (
          <div class="relative overflow-hidden bg-cover bg-no-repeat">
            <Link href={`/Admin/CreateQuiz?courseId=${searchParams.courseId}`}>
              <button className="bg-green-500 text-white py-2 px-4 rounded-md  mt-20">
                Add Quiz
              </button>
            </Link>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default CourseDetails;
