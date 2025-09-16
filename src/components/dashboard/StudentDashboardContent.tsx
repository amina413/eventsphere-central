import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { 
  Calendar, 
  Users, 
  Award, 
  BookOpen, 
  MessageSquare,
  Download,
  Star,
  CheckCircle,
  MapPin,
  Clock,
  QrCode,
  X
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

interface StudentDashboardContentProps {
  activeSection: string;
}

export const StudentDashboardContent = ({ activeSection }: StudentDashboardContentProps) => {
  const [events, setEvents] = useState(mockEvents);
  const [registrations, setRegistrations] = useState(mockRegistrations);
  const [certificates] = useState(mockCertificates);
  const [registrationForm, setRegistrationForm] = useState({
    fullName: '',
    studentId: '',
    eventTitle: ''
  });
  const [feedbackForm, setFeedbackForm] = useState({
    fullName: '',
    studentId: '',
    eventTitle: '',
    feedback: ''
  });
  
  const { profile } = useAuth();
  const { toast } = useToast();

  const handleRegister = (eventTitle: string) => {
    setRegistrationForm(prev => ({ ...prev, eventTitle }));
  };

  const handleSubmitRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    const newRegistration = {
      id: registrations.length + 1,
      event_id: events.find(e => e.title === registrationForm.eventTitle)?.id || 0,
      status: "registered" as const,
      events: events.find(e => e.title === registrationForm.eventTitle)
    };
    setRegistrations([...registrations, newRegistration]);
    toast({
      title: 'Registration Successful!',
      description: `You have been registered for ${registrationForm.eventTitle}`,
    });
    setRegistrationForm({ fullName: '', studentId: '', eventTitle: '' });
  };

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Feedback Submitted!',
      description: 'Thank you for your valuable feedback.',
    });
    setFeedbackForm({ fullName: '', studentId: '', eventTitle: '', feedback: '' });
  };

  const handleCancelRegistration = (registrationId: number) => {
    setRegistrations(prev => 
      prev.map(reg => 
        reg.id === registrationId 
          ? { ...reg, status: 'cancelled' as const } 
          : reg
      )
    );
    toast({
      title: 'Registration Cancelled',
      description: 'Your registration has been cancelled successfully.',
    });
  };

  const handleCheckIn = () => {
    toast({
      title: 'Check-in Successful!',
      description: 'You have been checked in to the event.',
    });
  };

  if (activeSection === "dashboard") {
    return (
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
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
              <div className="text-2xl font-bold text-accent">2</div>
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
              {events.slice(0, 3).map((event) => {
                const isRegistered = registrations.some(reg => reg.event_id === event.id);
                return (
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
                      {isRegistered ? (
                        <Button size="sm" variant="secondary" disabled>
                          Registered
                        </Button>
                      ) : (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              size="sm" 
                              className="bg-primary hover:bg-primary/90"
                              onClick={() => handleRegister(event.title)}
                            >
                              Register Now
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Register for Event</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleSubmitRegistration} className="space-y-4">
                              <div>
                                <Label htmlFor="fullName">Full Name</Label>
                                <Input
                                  id="fullName"
                                  value={registrationForm.fullName || profile?.full_name || ''}
                                  onChange={(e) => setRegistrationForm(prev => ({ ...prev, fullName: e.target.value }))}
                                  required
                                />
                              </div>
                              <div>
                                <Label htmlFor="studentId">Student ID</Label>
                                <Input
                                  id="studentId"
                                  value={registrationForm.studentId || profile?.id_number || ''}
                                  onChange={(e) => setRegistrationForm(prev => ({ ...prev, studentId: e.target.value }))}
                                  required
                                />
                              </div>
                              <div>
                                <Label htmlFor="eventTitle">Event</Label>
                                <Input
                                  id="eventTitle"
                                  value={registrationForm.eventTitle}
                                  readOnly
                                />
                              </div>
                              <Button type="submit" className="w-full">Register</Button>
                            </form>
                          </DialogContent>
                        </Dialog>
                      )}
                    </div>
                  </div>
                );
              })}
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
                <div key={registration.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 md:p-4 border border-border rounded-lg gap-3 sm:gap-0">
                  <div className="flex items-center space-x-4">
                    <div>
                      <h4 className="font-medium text-card-foreground">{registration.events?.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {registration.events?.event_date ? new Date(registration.events.event_date).toLocaleDateString() : ''} • {registration.events?.location} • {registration.events?.category}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
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
                    
                    <div className="flex flex-wrap gap-2">
                      {registration.status === "attended" && (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="outline">
                              <MessageSquare className="h-4 w-4 mr-1" />
                              Feedback
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Submit Feedback</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleSubmitFeedback} className="space-y-4">
                              <div>
                                <Label htmlFor="feedbackFullName">Full Name</Label>
                                <Input
                                  id="feedbackFullName"
                                  value={feedbackForm.fullName || profile?.full_name || ''}
                                  onChange={(e) => setFeedbackForm(prev => ({ ...prev, fullName: e.target.value }))}
                                  required
                                />
                              </div>
                              <div>
                                <Label htmlFor="feedbackStudentId">Student ID</Label>
                                <Input
                                  id="feedbackStudentId"
                                  value={feedbackForm.studentId || profile?.id_number || ''}
                                  onChange={(e) => setFeedbackForm(prev => ({ ...prev, studentId: e.target.value }))}
                                  required
                                />
                              </div>
                              <div>
                                <Label htmlFor="feedbackEventTitle">Event</Label>
                                <Input
                                  id="feedbackEventTitle"
                                  value={registration.events?.title || ''}
                                  readOnly
                                />
                              </div>
                              <div>
                                <Label htmlFor="feedback">Feedback</Label>
                                <Textarea
                                  id="feedback"
                                  value={feedbackForm.feedback}
                                  onChange={(e) => setFeedbackForm(prev => ({ ...prev, feedback: e.target.value }))}
                                  placeholder="Please share your feedback about the event..."
                                  required
                                />
                              </div>
                              <Button type="submit" className="w-full">Submit Feedback</Button>
                            </form>
                          </DialogContent>
                        </Dialog>
                      )}
                      {registration.status === "confirmed" && (
                        <Button size="sm" variant="outline" onClick={handleCheckIn}>
                          <QrCode className="h-4 w-4 mr-1" />
                          Check-in
                        </Button>
                      )}
                      {registration.status === "registered" && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleCancelRegistration(registration.id)}
                        >
                          <X className="h-4 w-4 mr-1" />
                          Cancel
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (activeSection === "events") {
    return (
      <Card className="border-0 shadow-card">
        <CardHeader>
          <CardTitle>Available Events</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {events.map((event) => {
              const isRegistered = registrations.some(reg => reg.event_id === event.id);
              return (
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
                    {isRegistered ? (
                      <Button size="sm" variant="secondary" disabled>
                        Registered
                      </Button>
                    ) : (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            size="sm" 
                            className="bg-primary hover:bg-primary/90"
                            onClick={() => handleRegister(event.title)}
                          >
                            Register Now
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Register for Event</DialogTitle>
                          </DialogHeader>
                          <form onSubmit={handleSubmitRegistration} className="space-y-4">
                            <div>
                              <Label htmlFor="fullName">Full Name</Label>
                              <Input
                                id="fullName"
                                value={registrationForm.fullName || profile?.full_name || ''}
                                onChange={(e) => setRegistrationForm(prev => ({ ...prev, fullName: e.target.value }))}
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="studentId">Student ID</Label>
                              <Input
                                id="studentId"
                                value={registrationForm.studentId || profile?.id_number || ''}
                                onChange={(e) => setRegistrationForm(prev => ({ ...prev, studentId: e.target.value }))}
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="eventTitle">Event</Label>
                              <Input
                                id="eventTitle"
                                value={registrationForm.eventTitle}
                                readOnly
                              />
                            </div>
                            <Button type="submit" className="w-full">Register</Button>
                          </form>
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (activeSection === "certificates") {
    return (
      <Card className="border-0 shadow-card">
        <CardHeader>
          <CardTitle>My Certificates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid gap-4">
              <h4 className="font-medium">Available Certificates</h4>
              {certificates.map((certificate) => (
                <div key={certificate.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <h5 className="font-medium">{certificate.events.title}</h5>
                    <p className="text-sm text-muted-foreground">
                      Certificate of {certificate.certificate_type} • Issued: {new Date(certificate.issued_at).toLocaleDateString()}
                    </p>
                  </div>
                  <Button size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </div>
              ))}
            </div>
            
            <div className="mt-6">
              <h4 className="font-medium mb-3">Pending Certificates</h4>
              {registrations.filter(r => r.status === "attended").map((registration) => (
                <div key={registration.id} className="flex items-center justify-between p-4 border border-border rounded-lg bg-muted/20">
                  <div>
                    <h5 className="font-medium">{registration.events?.title}</h5>
                    <p className="text-sm text-muted-foreground">Certificate processing - Available soon</p>
                  </div>
                  <Badge variant="secondary">Processing</Badge>
                </div>
              ))}
            </div>
            
            {certificates.length === 0 && registrations.filter(r => r.status === "attended").length === 0 && (
              <p className="text-center text-muted-foreground py-8">
                No certificates available yet. Attend events to earn certificates!
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (activeSection === "feedback") {
    return (
      <Card className="border-0 shadow-card">
        <CardHeader>
          <CardTitle>Submit Feedback</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmitFeedback} className="space-y-4">
            <div>
              <Label htmlFor="feedbackFullName">Full Name</Label>
              <Input
                id="feedbackFullName"
                value={feedbackForm.fullName || profile?.full_name || ''}
                onChange={(e) => setFeedbackForm(prev => ({ ...prev, fullName: e.target.value }))}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="feedbackStudentId">Student ID</Label>
              <Input
                id="feedbackStudentId"
                value={feedbackForm.studentId || profile?.id_number || ''}
                onChange={(e) => setFeedbackForm(prev => ({ ...prev, studentId: e.target.value }))}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="eventSelect">Select Event</Label>
              <select
                id="eventSelect"
                className="w-full p-2 border border-border rounded-md bg-background"
                value={feedbackForm.eventTitle}
                onChange={(e) => setFeedbackForm(prev => ({ ...prev, eventTitle: e.target.value }))}
                required
              >
                <option value="">Select an event</option>
                {registrations.filter(r => r.status === "attended").map((registration) => (
                  <option key={registration.id} value={registration.events?.title || ''}>
                    {registration.events?.title}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <Label htmlFor="feedbackText">Your Feedback</Label>
              <Textarea
                id="feedbackText"
                value={feedbackForm.feedback}
                onChange={(e) => setFeedbackForm(prev => ({ ...prev, feedback: e.target.value }))}
                placeholder="Please share your experience with the event..."
                rows={5}
                required
              />
            </div>
            
            <Button type="submit" className="w-full">
              Submit Feedback
            </Button>
          </form>
        </CardContent>
      </Card>
    );
  }

  return <div>Section not found</div>;
};