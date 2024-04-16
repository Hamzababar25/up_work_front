import JobsPage from "../../../components/UserJobs/jobs";
export default function Home({ params, searchParams }) {
  console.log("second", params);
  console.log("third", searchParams);

  return (
    <main className="">
      <JobsPage />
    </main>
  );
}
