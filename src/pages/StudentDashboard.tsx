import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EventRegistrationForm } from "@/components/forms/EventRegistrationForm";
import { FeedbackForm } from "@/components/forms/FeedbackForm";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
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

const upcomingEvents = [];
const certificates = [];

const StudentDashboard = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [certificates, setCertificates] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const { user, profile } = useAuth();
  const { toast } = useToast();

  // Fetch approved events for browsing
  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select(`
          *,
          profiles:organizer_id (full_name)
        `)
        .eq('status', 'approved')
        .order('event_date', { ascending: true });

      if (error) throw error;
      setEvents(data || []);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  // Fetch user's registrations
  const fetchRegistrations = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('event_registrations')
        .select(`
          *,
          events (
            title,
            event_date,
            location,
            category
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRegistrations(data || []);
    } catch (error) {
      console.error('Error fetching registrations:', error);
    }
  };

  // Fetch user's certificates
  const fetchCertificates = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('certificates')
        .select(`
          *,
          events (title)
        `)
        .eq('user_id', user.id)
        .order('issued_at', { ascending: false });

      if (error) throw error;
      setCertificates(data || []);
    } catch (error) {
      console.error('Error fetching certificates:', error);
    }
  };

  // Fetch notifications
  const fetchNotifications = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .eq('read', false)
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) throw error;
      setNotifications(data || []);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([
        fetchEvents(),
        fetchRegistrations(),
        fetchCertificates(),
        fetchNotifications()
      ]);
      setLoading(false);
    };

    loadData();
  }, [user]);

  const handleCancelRegistration = async (registrationId: string) => {
    try {
      const { error } = await supabase
        .from('event_registrations')
        .update({ status: 'cancelled' })
        .eq('id', registrationId);

      if (error) throw error;

      toast({
        title: 'Registration Cancelled',
        description: 'Your registration has been cancelled successfully.',
      });

      fetchRegistrations();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to cancel registration.',
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
                    <EventRegistrationForm 
                      event={event} 
                      onRegistrationSuccess={fetchRegistrations}
                    />
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
                        <FeedbackForm 
                          eventId={registration.event_id}
                          eventTitle={registration.events?.title || 'Event'}
                          onFeedbackSubmitted={fetchNotifications}
                        />
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