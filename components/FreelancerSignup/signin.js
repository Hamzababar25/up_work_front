"use client";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../../app/firebase/config";
import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const SigninPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);

  const handleSignIn = async () => {
    try {
      const res = await signInWithEmailAndPassword(email, password);
      console.log(email, password);
      console.log({ res });
      console.log(res.user.uid);
      sessionStorage.setItem("user", true);
      setEmail("");
      setPassword("");
      router.push("/User");
    } catch (e) {
      console.error(e);
    }
  };
  //   // Handle signup logic, such as sending the form data to the server
  //   router.push("/Dashboard");
  // };

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
        <h1 className="text-4xl font-bold mb-8 text-center">Login</h1>

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
          onClick={handleSignIn}
          className="bg-blue-500 text-white rounded p-4 w-full mb-6"
        >
          Sign In
        </motion.button>
        {showSuccessMessage && (
          <p className="text-green-500 text-center">Logged in successfully</p>
        )}
        {emailErrorMessage && (
          <div className="text-green-500 text-center">{emailErrorMessage}</div>
        )}

        <p className="text-center text-gray-600">
          Dont have an account?{" "}
          <a href="/login" className="text-blue-500">
            Click here to signup
          </a>
        </p>
      </motion.div>
    </motion.div>
  );
};

export default SigninPage;
