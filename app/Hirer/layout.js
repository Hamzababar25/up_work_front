"use client";
import { useEffect, useRef, useState } from "react";
// import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Sidebar from "../Hirer/Sidebar/page";
import Header from "../../components/Header";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex  h-screen overflow-hidden">
      <Sidebar />
      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        {/* <!-- ===== Header Start ===== --> */}
        <Header />
        {/* <div className="h-[4rem] bg-blue-500"></div> */}
        <main className="ml-64 pl-10 ">
          <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
