"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import utility from "@/components/utils/utility";
import { motion } from "framer-motion";

const CourseDetails = ({ searchParams }) => {
  const [course, setCourse] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const courseResponse = await axios.get(
          utility.BASE_URL + `Courses/${searchParams.courseId}`
        );
        setCourse(courseResponse.data);
      } catch (error) {
        toast.error("Error fetching course details");
      }
    };

    fetchCourseDetails();
  }, [searchParams.courseId]);

  if (!course) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600">
        Loading...
      </div>
    );
  }

  const handleQuizClick = (quizId) => {
    router.push(`/User/QuizAttempt?quizId=${quizId}`);
  };

  return (
    <div className="container mx-auto p-8 bg-white">
      <motion.div
        className="relative bg-white rounded-lg shadow-xl overflow-hidden mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {course.image && (
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-96 object-contain"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-75"></div>
        <div className="absolute bottom-0 left-0 p-6">
          <h2 className="text-4xl font-bold text-white mb-2">{course.title}</h2>
          <p className="text-white text-lg">{course.description}</p>
        </div>
      </motion.div>

      <div className="mt-8">
        <h3 className="text-3xl font-semibold text-gray-800 mb-6">Videos</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {course.videos.map((video, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg shadow-xl overflow-hidden transform transition-transform duration-300 hover:scale-105"
              whileHover={{ scale: 1.05 }}
            >
              <div className="relative">
                <video
                  src={video.url}
                  controls
                  className="w-full h-48 object-cover rounded-t-lg"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="p-4">
                <h4 className="text-lg font-medium text-gray-800">{`Video ${
                  index + 1
                }`}</h4>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-16 bg-white p-8 rounded-lg shadow-xl">
        <h3 className="text-3xl font-semibold text-gray-800 mb-6">Quizzes</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {course.quizzes.map((quiz, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg shadow-xl overflow-hidden cursor-pointer transform transition-transform duration-300 hover:scale-105"
              onClick={() => handleQuizClick(quiz.id)}
              whileHover={{ scale: 1.05 }}
            >
              <div className="p-4">
                <h4 className="text-lg font-medium text-gray-800">{`Quiz ${
                  index + 1
                }`}</h4>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
