import React, { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const CoursesCarousel = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch the courses data
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:3001/Admin/courses");
        if (response.ok) {
          const data = await response.json();
          console.log("hka", data);
          setCourses(data);
        } else {
          console.error("Error fetching courses:", response.status);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div>
      <h2 className="text-center font-semibold text-2xl mb-4">Courses</h2>
      {courses?.user?.length > 0 ? (
        <Carousel responsive={responsive}>
          {courses?.user?.map((course) => (
            <div key={course.id} className="p-4">
              <div className="bg-white rounded-lg shadow-md p-6">
                <img
                  src={course.image || "/path/to/default_course_image.png"}
                  alt={course.title}
                  className="w-full h-40 object-contain mb-4 rounded"
                />
                <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
                <p className="text-gray-600">{course.description}</p>
              </div>
            </div>
          ))}
        </Carousel>
      ) : (
        <p className="text-center">No courses available</p>
      )}
    </div>
  );
};
export default CoursesCarousel;
