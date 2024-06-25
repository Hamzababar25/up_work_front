"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const FirstPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="bg-gray-100">
      <main>
        <section className="py-20">
          <div className="container mx-auto text-center">
            <div className="flex justify-center ">
              <img
                src="/HerCareerLink.png"
                className="h-48 w-72 me-2 object-cover rounded-2xl mb-4 "
              />
            </div>
            <h1 className="text-5xl font-bold text-gray-800 mb-4">
              Empowering Women in the Workplace
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Discover meaningful career opportunities and educational
              resources.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-4 bg-pink-100 shadow-lg rounded-lg">
                <h2 className="text-xl font-bold mb-2 text-pink-600">
                  Find Your Dream Job
                </h2>
                <p>
                  Explore job listings from companies committed to diversity and
                  inclusion.
                </p>
              </div>
              <div className="p-4 bg-purple-100 shadow-lg rounded-lg">
                <h2 className="text-xl font-bold mb-2 text-purple-600">
                  Learn and Grow
                </h2>
                <p>
                  Access a wide range of courses and educational content to
                  enhance your skills.
                </p>
              </div>
              <div className="p-4 bg-blue-100 shadow-lg rounded-lg">
                <h2 className="text-xl font-bold mb-2 text-blue-600">
                  Hire with Confidence
                </h2>
                <p>
                  Post job opportunities and connect with talented women
                  professionals.
                </p>
              </div>
            </div>
            <div className="mt-12">
              <button
                onClick={(e) => {
                  router.push("/auth/FreelanceSignup");
                }}
                className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-3 px-6 rounded-lg mr-4"
              >
                Sign up as a Professional
              </button>
              <button
                onClick={(e) => {
                  router.push("/auth/HirerSignup");
                }}
                className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg"
              >
                Post a Job Opportunity
              </button>
            </div>
            <div className="mt-12 flex justify-center">
              <img
                src="jnjn.avif"
                alt="Educational Pic"
                className=" w-3/4 rounded-lg "
              />
            </div>
          </div>
        </section>
        <section className="bg-white py-20">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Join Our Community
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Connect with like-minded professionals and expand your network.
            </p>
            <button className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-3 px-6 rounded-lg">
              Create Your Profile
            </button>
          </div>
        </section>
      </main>
      <footer className="bg-gray-800 text-white py-8">
        {/* ... Footer content */}
      </footer>
    </div>
  );
};

export default FirstPage;
