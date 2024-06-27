"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaInstagramSquare } from "react-icons/fa";

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
              Success Stories
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Hear from women who have achieved their career goals with our
              platform.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-4 bg-green-100 shadow-lg rounded-lg">
                <h3 className="text-lg font-bold mb-2 text-green-600">
                  Sarah's Journey
                </h3>
                <p>
                  "Thanks to this platform, I found my dream job in tech and
                  advanced my career."
                </p>
              </div>
              <div className="p-4 bg-yellow-100 shadow-lg rounded-lg">
                <h3 className="text-lg font-bold mb-2 text-yellow-600">
                  Maria's Success
                </h3>
                <p>
                  "The courses available helped me gain the skills I needed to
                  land a high-paying job."
                </p>
              </div>
              <div className="p-4 bg-orange-100 shadow-lg rounded-lg">
                <h3 className="text-lg font-bold mb-2 text-orange-600">
                  Anita's Experience
                </h3>
                <p>
                  "I connected with amazing professionals and grew my network
                  significantly."
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-2">About Us</h3>
              <p>
                We are dedicated to empowering women by providing meaningful
                career opportunities and educational resources.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Quick Links</h3>
              <ul className="list-none">
                <li>
                  <a href="#" className="text-white hover:text-gray-400">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white hover:text-gray-400">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white hover:text-gray-400">
                    Jobs
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white hover:text-gray-400">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Follow Us</h3>
              <div className="flex justify-center space-x-4">
                <a href="#" className="text-white hover:text-gray-400">
                  <FaFacebook className="text-2xl" />
                </a>
                <a href="#" className="text-white hover:text-gray-400">
                  <FaLinkedin className="text-2xl" />
                </a>
                <a href="#" className="text-white hover:text-gray-400">
                  <IoLogoWhatsapp className="text-2xl" />{" "}
                </a>
                <a href="#" className="text-white hover:text-gray-400">
                  <FaInstagramSquare className="text-2xl" />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <p>&copy; 2024 Her Career Now. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FirstPage;
