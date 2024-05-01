import JobsProposals from "../../../components/JobProposals/page";
import axios from "axios";

async function jobDetail({ searchParams }) {
  console.log("4", searchParams.jobId);

  try {
    const response = await axios.get(
      `http://localhost:3001/Jobs/${searchParams.jobId}`
    );
    const JobData = response.data.result;
    console.log(JobData, "jnj");

    return (
      <main className="">
        <JobsProposals apiJobData={JobData} />
      </main>
    );
  } catch (error) {
    console.error("Error fetching job details:", error);
    return null; // or handle the error in some way
  }
}

export default jobDetail;
