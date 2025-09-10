import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Award, 
  MessageSquare, 
  Users, 
  QrCode, 
  X,
  CheckCircle,
  Clock
} from "lucide-react";

const upcomingEvents = [
  {
    id: 1,
    name: "TechFest 2024",
    date: "2024-03-15",
    status: "registered",
    category: "Technical"
  },
  {
    id: 2,
    name: "Cultural Night",
    date: "2024-03-20",
    status: "pending",
    category: "Cultural"
  },
  {
    id: 3,
    name: "Research Symposium",
    date: "2024-03-25",
    status: "confirmed",
    category: "Academic"
  }
];

const certificates = [
  {
    id: 1,
    title: "Hackathon Winner",
    event: "CodeFest 2024",
    date: "2024-02-15",
    type: "Winner"
  },
  {
    id: 2,
    title: "Participation Certificate",
    event: "Cultural Festival",
    date: "2024-02-10",
    type: "Participation"
  }
];

const StudentDashboard = () => {
  return (
    <DashboardLayout variant="student">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Welcome back, John!</h1>
          <p className="text-muted-foreground">Here's what's happening with your events.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-0 shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
              <Calendar className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">3</div>
              <p className="text-xs text-muted-foreground">+2 from last month</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Registered Events</CardTitle>
              <Users className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">12</div>
              <p className="text-xs text-muted-foreground">+5 from last month</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Certificates Earned</CardTitle>
              <Award className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">8</div>
              <p className="text-xs text-muted-foreground">+3 from last month</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Feedback Given</CardTitle>
              <MessageSquare className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">15</div>
              <p className="text-xs text-muted-foreground">+7 from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Events Table */}
        <Card className="border-0 shadow-card">
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div>
                      <h4 className="font-medium text-card-foreground">{event.name}</h4>
                      <p className="text-sm text-muted-foreground">{event.date} • {event.category}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Badge 
                      variant={event.status === "confirmed" ? "default" : "secondary"}
                      className={
                        event.status === "confirmed" ? "bg-success text-success-foreground" :
                        event.status === "pending" ? "bg-warning text-warning-foreground" :
                        "bg-accent text-accent-foreground"
                      }
                    >
                      {event.status === "confirmed" && <CheckCircle className="w-3 h-3 mr-1" />}
                      {event.status === "pending" && <Clock className="w-3 h-3 mr-1" />}
                      {event.status}
                    </Badge>
                    
                    <div className="flex space-x-2">
                      {event.status === "confirmed" && (
                        <Button size="sm" variant="outline">
                          <QrCode className="h-4 w-4 mr-1" />
                          Check-in
                        </Button>
                      )}
                      <Button size="sm" variant="outline">
                        <X className="h-4 w-4 mr-1" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Certificates Section */}
        <Card className="border-0 shadow-card">
          <CardHeader>
            <CardTitle>Recent Certificates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {certificates.map((cert) => (
                <div key={cert.id} className="p-4 border border-border rounded-lg bg-gradient-to-br from-accent/5 to-primary/5">
                  <div className="flex items-start justify-between mb-3">
                    <Award className="h-8 w-8 text-accent" />
                    <Badge variant="outline">{cert.type}</Badge>
                  </div>
                  <h4 className="font-medium text-card-foreground mb-1">{cert.title}</h4>
                  <p className="text-sm text-muted-foreground mb-3">{cert.event} • {cert.date}</p>
                  <Button size="sm" variant="outline" className="w-full">
                    Download Certificate
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;