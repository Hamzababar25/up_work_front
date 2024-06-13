import SignupPage from "../../../components/HirerSignup/signup";
import utility from "@/components/utils/utility";

export default async function Home() {
  "use server";

  // Mark the signUp function with "use server"
  async function signUp(userData) {
    "use server";
    const response = await fetch(utility.BASE_URL + `Hirer/signup`, {
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
