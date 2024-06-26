"use client";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../../app/firebase/config";
import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const SignupPage = ({ apisignup }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");

  // const handleSignup = () => {
  //   // Handle signup logic, such as sending the form data to the server
  //   router.push("/Dashboard");
  // };

  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth);

  const handleSignUp = async () => {
    try {
      const res = await createUserWithEmailAndPassword(email, password);
      console.log("knk", { res });
      if (!res) {
        setEmailErrorMessage("Email already exists");
        return;
      }
      await apisignup({
        // userId: res.user.uid,
        id: res.user.uid,
        mail: email,
        fullname: firstName + " " + lastName,
        usertype: "user",
        // Pass the displayName
      });
      sessionStorage.setItem("user", true);
      setEmail("");
      setPassword("");
      setShowSuccessMessage(true); // Show success message
      setTimeout(() => {
        router.push("/auth/FreelancerSignin"); // Route to login page after a delay
      }, 2000);
    } catch (e) {
      console.error(e);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="bg-gray-100 min-h-screen flex items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="bg-white p-8 rounded shadow-md max-w-lg w-full"
      >
        <h1 className="text-4xl font-bold mb-8 text-center">
          Welcome to <span className="text-blue-300">HerCareerLink</span>
        </h1>
        <div className="mb-8">
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full p-4 border rounded"
          />
        </div>
        <div className="mb-8">
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full p-4 border rounded"
          />
        </div>
        <div className="mb-8">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 border rounded"
          />
        </div>
        <div className="mb-8 relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-4 border rounded"
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-4 cursor-pointer"
          >
            {showPassword ? "Hide" : "Show"}
          </span>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSignUp}
          className="bg-blue-500 text-white rounded p-4 w-full mb-6"
        >
          Sign Up
        </motion.button>
        {showSuccessMessage && (
          <p className="text-green-500 text-center">
            Account successfully created!
          </p>
        )}
        {emailErrorMessage && (
          <div className="text-green-500 text-center">{emailErrorMessage}</div>
        )}

        <p className="text-center text-gray-600">
          Already signed up?{" "}
          <a href="/auth/FreelancerSignin" className="text-blue-500">
            Click here to log in
          </a>
        </p>
      </motion.div>
    </motion.div>
  );
};

export default SignupPage;
