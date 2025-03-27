"use client";

import  Sidebar  from "@/components/Homepage/Sidebar";
import  MainContent  from "@/components/Homepage/MainContent";
import  RightSidebar  from "@/components/Homepage/RightSidebar";


export default function LMSPreview() {

  return (
    <div className="flex h-screen">
                <Sidebar />
                <MainContent />
                <RightSidebar />
    </div>
  )

}