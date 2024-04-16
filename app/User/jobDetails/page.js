import JobsDetailPage from "../../../components/JobDetails/jobDetails";
export default function Page({ params, searchParams }) {
  console.log("svv", params);
  console.log("4", searchParams);
  return (
    <main className="">
      <JobsDetailPage />
    </main>
  );
}
