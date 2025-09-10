import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Calendar, 
  Award, 
  MessageSquare, 
  Image as ImageIcon, 
  Plus, 
  Users, 
  BarChart3, 
  ChevronDown,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SidebarProps {
  variant: "student" | "organizer";
}

const studentLinks = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/student/dashboard" },
  { icon: Calendar, label: "My Events", href: "/student/events" },
  { icon: Award, label: "Certificates", href: "/student/certificates" },
  { icon: MessageSquare, label: "Feedback", href: "/student/feedback" },
  { icon: ImageIcon, label: "Media Gallery", href: "/student/media" },
];

const organizerLinks = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/organizer/dashboard" },
  { icon: Calendar, label: "My Events", href: "/organizer/events" },
  { icon: Plus, label: "Create Event", href: "/organizer/create" },
  { icon: Users, label: "Registrations", href: "/organizer/registrations" },
  { icon: ImageIcon, label: "Media", href: "/organizer/media" },
  { icon: BarChart3, label: "Reports", href: "/organizer/reports" },
];

export const Sidebar = ({ variant }: SidebarProps) => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const links = variant === "student" ? studentLinks : organizerLinks;

  return (
    <aside className={cn(
      "bg-card border-r border-border transition-all duration-300 flex flex-col",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Toggle Button */}
      <div className="p-4 border-b border-border">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full justify-start"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <>
              <ChevronDown className="h-4 w-4 mr-2" />
              <span className="font-medium">Menu</span>
            </>
          )}
        </Button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {links.map((link) => {
            const isActive = location.pathname === link.href;
            return (
              <li key={link.href}>
                <Link to={link.href}>
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start",
                      isActive && "bg-accent/10 text-accent font-medium",
                      isCollapsed && "px-2"
                    )}
                  >
                    <link.icon className={cn("h-4 w-4", !isCollapsed && "mr-3")} />
                    {!isCollapsed && <span>{link.label}</span>}
                  </Button>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Info */}
      {!isCollapsed && (
        <div className="p-4 border-t border-border">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">JD</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-card-foreground truncate">
                John Doe
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {variant === "student" ? "Student" : "Event Organizer"}
              </p>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};