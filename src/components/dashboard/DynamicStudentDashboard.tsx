import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { StudentDashboardContent } from "./StudentDashboardContent";

export const DynamicStudentDashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard");

  return (
    <div className="min-h-screen bg-background">
      <Navbar variant="dashboard" />
      <div className="flex">
        <div className="w-64">
          <Sidebar 
            variant="student" 
            activeSection={activeSection}
            setActiveSection={setActiveSection}
          />
        </div>
        <main className="flex-1 p-6">
          <StudentDashboardContent activeSection={activeSection} />
        </main>
      </div>
    </div>
  );
};