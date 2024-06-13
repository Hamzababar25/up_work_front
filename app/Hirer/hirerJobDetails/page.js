import HirerJobDetail from "../../../components/HirerJobDetails/page";
import axios from "axios";
import utility from "@/components/utils/utility";
async function jobDetail({ searchParams }) {
  console.log("4", searchParams.jobId);

  try {
    const response = await axios.get(
      utility.BASE_URL + `Jobs/${searchParams.jobId}`
    );
    const JobData = response.data.result.job;
    const linkedUser = response.data.result.linkedUser;
    const acceptedBid = response.data.result.acceptedBid;
    console.log(JobData, "jnj");

    return (
      <main className="">
        <HirerJobDetail
          apiJobData={JobData}
          apiUserData={linkedUser}
          apiBidData={acceptedBid}
        />
      </main>
    );
  } catch (error) {
    console.error("Error fetching job details:", error);
    return null; // or handle the error in some way
  }
}

export default jobDetail;
