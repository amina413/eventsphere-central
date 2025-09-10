import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
  variant: "student" | "organizer";
}

export const DashboardLayout = ({ children, variant }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar variant="dashboard" />
      <div className="flex">
        <Sidebar variant={variant} />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};