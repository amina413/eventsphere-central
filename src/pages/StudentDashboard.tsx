import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EventRegistrationForm } from "@/components/forms/EventRegistrationForm";
import { FeedbackForm } from "@/components/forms/FeedbackForm";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { 
  Calendar, 
  Award, 
  MessageSquare, 
  Users, 
  QrCode, 
  X,
  CheckCircle,
  Clock,
  Download
} from "lucide-react";

// Mock data
const mockEvents = [
  {
    id: 1,
    title: "Tech Innovation Summit 2024",
    event_date: "2024-03-20",
    location: "Main Auditorium",
    category: "technical",
    current_registrations: 120,
    capacity: 150,
    organizer: { full_name: "Dr. Smith" }
  },
  {
    id: 2,
    title: "Cultural Fest Harmony",
    event_date: "2024-03-25",
    location: "Open Grounds",
    category: "cultural",
    current_registrations: 200,
    capacity: 300,
    organizer: { full_name: "Prof. Johnson" }
  },
  {
    id: 3,
    title: "AI & Machine Learning Workshop",
    event_date: "2024-04-01",
    location: "CS Lab Block",
    category: "academic",
    current_registrations: 45,
    capacity: 50,
    organizer: { full_name: "Dr. Wilson" }
  }
];

const mockRegistrations = [
  {
    id: 1,
    event_id: 1,
    status: "confirmed",
    events: {
      title: "Tech Innovation Summit 2024",
      event_date: "2024-03-20",
      location: "Main Auditorium",
      category: "technical"
    }
  },
  {
    id: 2,
    event_id: 2,
    status: "attended",
    events: {
      title: "Cultural Fest Harmony",
      event_date: "2024-03-25",
      location: "Open Grounds", 
      category: "cultural"
    }
  }
];

const mockCertificates = [
  {
    id: 1,
    certificate_type: "participation",
    issued_at: "2024-03-26",
    events: {
      title: "Cultural Fest Harmony"
    }
  }
];

const mockNotifications = [
  {
    id: 1,
    message: "Your registration for Tech Summit has been confirmed!",
    created_at: "2024-03-15"
  },
  {
    id: 2,
    message: "New certificate available for download",
    created_at: "2024-03-26"
  }
];

const StudentDashboard = () => {
  const [events, setEvents] = useState(mockEvents);
  const [registrations, setRegistrations] = useState(mockRegistrations);
  const [certificates, setCertificates] = useState(mockCertificates);
  const [notifications, setNotifications] = useState(mockNotifications);
  const [loading, setLoading] = useState(true);
  
  const { user, profile } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleCancelRegistration = async (registrationId: string) => {
    try {
      setRegistrations(prev => 
        prev.map(reg => 
          reg.id.toString() === registrationId 
            ? { ...reg, status: 'cancelled' } 
            : reg
        )
      );

      toast({
        title: 'Registration Cancelled',
        description: 'Your registration has been cancelled successfully.',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'Failed to cancel registration.',
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return (
      <DashboardLayout variant="student">
        <div className="flex items-center justify-center min-h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    );
  }
  
  return (
    <DashboardLayout variant="student">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Welcome back, {profile?.full_name || 'Student'}!</h1>
          <p className="text-muted-foreground">Here's what's happening with your events.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-0 shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available Events</CardTitle>
              <Calendar className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{events.length}</div>
              <p className="text-xs text-muted-foreground">Events you can register for</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">My Registrations</CardTitle>
              <Users className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">{registrations.length}</div>
              <p className="text-xs text-muted-foreground">Events you're registered for</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Certificates</CardTitle>
              <Award className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">{certificates.length}</div>
              <p className="text-xs text-muted-foreground">Certificates earned</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Notifications</CardTitle>
              <MessageSquare className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">{notifications.length}</div>
              <p className="text-xs text-muted-foreground">Unread notifications</p>
            </CardContent>
          </Card>
        </div>

        {/* Available Events */}
        <Card className="border-0 shadow-card">
          <CardHeader>
            <CardTitle>Available Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {events.slice(0, 3).map((event) => (
                <div key={event.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-card-foreground">{event.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {new Date(event.event_date).toLocaleDateString()} • {event.location} • {event.category}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {event.current_registrations}/{event.capacity} registered
                    </p>
                  </div>
                  
                  <div className="ml-4">
                    <Button size="sm" className="bg-primary hover:bg-primary/90">
                      Register Now
                    </Button>
                  </div>
                </div>
              ))}
              
              {events.length === 0 && (
                <p className="text-center text-muted-foreground py-8">
                  No events available at the moment.
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* My Registrations */}
        <Card className="border-0 shadow-card">
          <CardHeader>
            <CardTitle>My Registrations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {registrations.map((registration) => (
                <div key={registration.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div>
                      <h4 className="font-medium text-card-foreground">{registration.events?.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {registration.events?.event_date ? new Date(registration.events.event_date).toLocaleDateString() : ''} • {registration.events?.location} • {registration.events?.category}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Badge 
                      variant={registration.status === "attended" ? "default" : "secondary"}
                      className={
                        registration.status === "attended" ? "bg-success text-success-foreground" :
                        registration.status === "confirmed" ? "bg-primary text-primary-foreground" :
                        registration.status === "cancelled" ? "bg-destructive text-destructive-foreground" :
                        "bg-accent text-accent-foreground"
                      }
                    >
                      {registration.status === "attended" && <CheckCircle className="w-3 h-3 mr-1" />}
                      {registration.status === "registered" && <Clock className="w-3 h-3 mr-1" />}
                      {registration.status}
                    </Badge>
                    
                    <div className="flex space-x-2">
                      {registration.status === "attended" && (
                        <Button size="sm" variant="outline">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          Feedback
                        </Button>
                      )}
                      {registration.status === "confirmed" && (
                        <Button size="sm" variant="outline">
                          <QrCode className="h-4 w-4 mr-1" />
                          Check-in
                        </Button>
                      )}
                      {registration.status === "registered" && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleCancelRegistration(registration.id.toString())}
                        >
                          <X className="h-4 w-4 mr-1" />
                          Cancel
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {registrations.length === 0 && (
                <p className="text-center text-muted-foreground py-8">
                  You haven't registered for any events yet.
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Certificates */}
        <Card className="border-0 shadow-card">
          <CardHeader>
            <CardTitle>My Certificates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {certificates.map((cert) => (
                <div key={cert.id} className="p-4 border border-border rounded-lg bg-gradient-to-br from-accent/5 to-primary/5">
                  <div className="flex items-start justify-between mb-3">
                    <Award className="h-8 w-8 text-accent" />
                    <Badge variant="outline">{cert.certificate_type}</Badge>
                  </div>
                  <h4 className="font-medium text-card-foreground mb-1">
                    {cert.events?.title} Certificate
                  </h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Issued on {new Date(cert.issued_at).toLocaleDateString()}
                  </p>
                  <Button size="sm" variant="outline" className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Download Certificate
                  </Button>
                </div>
              ))}
              
              {certificates.length === 0 && (
                <div className="col-span-2">
                  <p className="text-center text-muted-foreground py-8">
                    No certificates earned yet. Attend events to earn certificates!
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;