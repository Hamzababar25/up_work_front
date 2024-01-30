// "use server";
// import SignupPage from "../../../components/FreelancerSignup/signup";

// export default async function Home(userData) {
//   "use server";
//   const apiUrl = "http://localhost:3001"; // Update with your backend API URL

//   const signUp = async (userData) => {
//     "use server";
//     const response = await fetch(`${apiUrl}/User/signup`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(userData),
//     });

//     if (!response.ok) {
//       throw new Error("Failed to sign up");
//     }

//     return response.json();
//   };

//   // Rest of the component code
//   return (
//     <main className="">
//       <SignupPage apisignup={signUp} />
//     </main>
//   );
// }
import SigninPage from "../../../components/FreelancerSignup/signin";

export default async function Home() {
  // Rest of the component code
  return (
    <main className="">
      <SigninPage />
    </main>
  );
}
