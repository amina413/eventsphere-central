import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Clock, 
  Users, 
  MessageSquare, 
  Plus, 
  Upload, 
  BarChart3,
  Edit,
  Settings,
  CheckCircle,
  XCircle
} from "lucide-react";

const myEvents = [
  {
    id: 1,
    name: "TechFest 2024",
    date: "2024-03-15",
    status: "approved",
    registrations: 250,
    capacity: 300
  },
  {
    id: 2,
    name: "AI Workshop",
    date: "2024-03-20",
    status: "pending",
    registrations: 45,
    capacity: 50
  },
  {
    id: 3,
    name: "Coding Bootcamp",
    date: "2024-03-25",
    status: "approved",
    registrations: 180,
    capacity: 200
  }
];

const OrganizerDashboard = () => {
  return (
    <DashboardLayout variant="organizer">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Organizer Dashboard</h1>
            <p className="text-muted-foreground">Manage your events and track performance.</p>
          </div>
          <Button variant="hero" className="shadow-glow">
            <Plus className="h-4 w-4 mr-2" />
            Create Event
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-0 shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Events Created</CardTitle>
              <Calendar className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">24</div>
              <p className="text-xs text-muted-foreground">+3 from last month</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
              <Clock className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">2</div>
              <p className="text-xs text-muted-foreground">Awaiting admin review</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Registrations</CardTitle>
              <Users className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">1,247</div>
              <p className="text-xs text-muted-foreground">+15% from last month</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Feedback Count</CardTitle>
              <MessageSquare className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">892</div>
              <p className="text-xs text-muted-foreground">4.8/5 avg rating</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="border-0 shadow-card">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="p-6 h-auto flex flex-col items-center">
                <Plus className="h-8 w-8 mb-2 text-primary" />
                <span className="font-medium">Create New Event</span>
                <span className="text-sm text-muted-foreground">Set up your next event</span>
              </Button>
              <Button variant="outline" className="p-6 h-auto flex flex-col items-center">
                <Upload className="h-8 w-8 mb-2 text-accent" />
                <span className="font-medium">Upload Media</span>
                <span className="text-sm text-muted-foreground">Add photos and videos</span>
              </Button>
              <Button variant="outline" className="p-6 h-auto flex flex-col items-center">
                <BarChart3 className="h-8 w-8 mb-2 text-success" />
                <span className="font-medium">View Reports</span>
                <span className="text-sm text-muted-foreground">Analyze event performance</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* My Events */}
        <Card className="border-0 shadow-card">
          <CardHeader>
            <CardTitle>My Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {myEvents.map((event) => (
                <div key={event.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div>
                      <h4 className="font-medium text-card-foreground">{event.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {event.date} • {event.registrations}/{event.capacity} registered
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Badge 
                      variant={event.status === "approved" ? "default" : "secondary"}
                      className={
                        event.status === "approved" 
                          ? "bg-success text-success-foreground" 
                          : "bg-warning text-warning-foreground"
                      }
                    >
                      {event.status === "approved" ? (
                        <CheckCircle className="w-3 h-3 mr-1" />
                      ) : (
                        <Clock className="w-3 h-3 mr-1" />
                      )}
                      {event.status}
                    </Badge>
                    
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button size="sm" variant="outline">
                        <Settings className="h-4 w-4 mr-1" />
                        Manage
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default OrganizerDashboard;