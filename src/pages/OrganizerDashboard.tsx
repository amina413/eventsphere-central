import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreateEventForm } from "@/components/forms/CreateEventForm";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
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
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const { user, profile } = useAuth();
  const { toast } = useToast();

  const fetchMyEvents = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('events')
        .select(`
          *,
          event_registrations(count)
        `)
        .eq('organizer_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setEvents(data || []);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyEvents();
  }, [user]);

  if (loading) {
    return (
      <DashboardLayout variant="organizer">
        <div className="flex items-center justify-center min-h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    );
  }
  return (
    <DashboardLayout variant="organizer">
      <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Welcome, {profile?.full_name || 'Organizer'}!</h1>
            <p className="text-muted-foreground">Manage your events and track performance.</p>
          </div>
          <CreateEventForm onEventCreated={fetchMyEvents} />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-0 shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Events</CardTitle>
              <Calendar className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{events.length}</div>
              <p className="text-xs text-muted-foreground">Events created</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
              <Clock className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">
                {events.filter(e => e.status === 'pending').length}
              </div>
              <p className="text-xs text-muted-foreground">Awaiting admin review</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved Events</CardTitle>
              <Users className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">
                {events.filter(e => e.status === 'approved').length}
              </div>
              <p className="text-xs text-muted-foreground">Live events</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Registrations</CardTitle>
              <MessageSquare className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">
                {events.reduce((sum, event) => sum + event.current_registrations, 0)}
              </div>
              <p className="text-xs text-muted-foreground">Across all events</p>
            </CardContent>
          </Card>
        </div>

        {/* My Events */}
        <Card className="border-0 shadow-card">
          <CardHeader>
            <CardTitle>My Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {events.map((event) => (
                <div key={event.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div>
                      <h4 className="font-medium text-card-foreground">{event.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {new Date(event.event_date).toLocaleDateString()} • {event.current_registrations}/{event.capacity} registered
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Badge 
                      variant={event.status === "approved" ? "default" : "secondary"}
                      className={
                        event.status === "approved" 
                          ? "bg-success text-success-foreground" 
                          : event.status === "pending"
                          ? "bg-warning text-warning-foreground"
                          : "bg-destructive text-destructive-foreground"
                      }
                    >
                      {event.status === "approved" ? (
                        <CheckCircle className="w-3 h-3 mr-1" />
                      ) : event.status === "pending" ? (
                        <Clock className="w-3 h-3 mr-1" />
                      ) : (
                        <XCircle className="w-3 h-3 mr-1" />
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
              
              {events.length === 0 && (
                <p className="text-center text-muted-foreground py-8">
                  You haven't created any events yet. Click "Create Event" to get started!
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default OrganizerDashboard;