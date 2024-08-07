import utility from "@/components/utils/utility";
import JobsDetailPage from "../../../components/JobDetails/jobDetails";
import axios from "axios";

async function jobDetail({ searchParams }) {
  console.log("4", searchParams.jobId);

  try {
    const response = await axios.get(
      utility.BASE_URL + `Jobs/${searchParams.jobId}`
    );
    const JobData = response.data.result.job;

    return (
      <main className="">
        <JobsDetailPage apiJobData={JobData} />
      </main>
    );
  } catch (error) {
    console.error("Error fetching job details:", error);
    return null; // or handle the error in some way
  }
}

export default jobDetail;
