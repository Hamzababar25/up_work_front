import HirerJobProposals from "../../../components/HirerJobProposals/page";
import axios from "axios";
import utility from "@/components/utils/utility";
async function jobDetail({ searchParams }) {
  console.log("4", searchParams.jobId);

  try {
    const response = await axios.get(
      utility.BASE_URL + `Jobs/${searchParams.jobId}`
    );
    const JobData = response.data.result.job;

    return (
      <main className="">
        <HirerJobProposals apiJobData={JobData} />
      </main>
    );
  } catch (error) {
    console.error("Error fetching job details:", error);
    return null; // or handle the error in some way
  }
}

export default jobDetail;
