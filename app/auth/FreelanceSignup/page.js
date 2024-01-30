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
import SignupPage from "../../../components/FreelancerSignup/signup";

export default async function Home() {
  "use server";
  let apiUrl = "http://localhost:3001"; // Update with your backend API URL

  // Mark the signUp function with "use server"
  async function signUp(userData) {
    "use server";
    const response = await fetch(`http://localhost:3001/User/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Failed to sign up");
    }

    return response.json();
  }

  // Rest of the component code
  return (
    <main className="">
      <SignupPage apisignup={signUp} />
    </main>
  );
}
