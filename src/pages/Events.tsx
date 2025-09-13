import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EventRegistrationForm } from "@/components/forms/EventRegistrationForm";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Calendar, MapPin, Users, Clock, IndianRupee } from "lucide-react";
import { Footer } from "@/components/Footer";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [registrations, setRegistrations] = useState(new Set());
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('status', 'approved')
        .gte('event_date', new Date().toISOString())
        .order('event_date', { ascending: true });

      if (error) throw error;
      setEvents(data || []);
    } catch (error) {
      console.error('Error fetching events:', error);
      toast({
        title: "Error loading events",
        description: "Please try refreshing the page.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchUserRegistrations = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('event_registrations')
        .select('event_id')
        .eq('user_id', user.id);

      if (error) throw error;
      
      const registeredEvents = new Set(data.map(reg => reg.event_id));
      setRegistrations(registeredEvents);
    } catch (error) {
      console.error('Error fetching registrations:', error);
    }
  };

  useEffect(() => {
    fetchEvents();
    if (user) {
      fetchUserRegistrations();
    }
  }, [user]);

  const handleRegistrationSuccess = () => {
    fetchUserRegistrations();
    fetchEvents();
  };

  const eventTypeColors = {
    technical: "bg-blue-500",
    cultural: "bg-purple-500", 
    academic: "bg-green-500",
    sports: "bg-orange-500",
    workshop: "bg-indigo-500",
    seminar: "bg-teal-500",
    competition: "bg-red-500"
  };

  if (loading) {
    return (
      <ProtectedRoute requiredRole="student">
        <div className="min-h-screen bg-background">
          <Navbar variant="home" />
          <div className="flex items-center justify-center min-h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute requiredRole="student">
      <div className="min-h-screen bg-background">
        <Navbar variant="home" />
        
        <main className="container mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Upcoming Events</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover and register for exciting events happening at our college. Don't miss out on opportunities to learn, compete, and connect!
            </p>
          </div>

          {events.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">No upcoming events</h3>
              <p className="text-muted-foreground">Check back soon for new events!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event) => (
                <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img 
                      src={event.image_url || "/placeholder-event.jpg"} 
                      alt={event.title}
                      className="w-full h-48 object-cover bg-muted"
                    />
                    <Badge 
                      className={`absolute top-3 left-3 text-white ${eventTypeColors[event.category?.toLowerCase()] || 'bg-gray-500'}`}
                    >
                      {event.category}
                    </Badge>
                    {registrations.has(event.id) && (
                      <Badge className="absolute top-3 right-3 bg-green-500 text-white">
                        Registered
                      </Badge>
                    )}
                  </div>
                  
                  <CardHeader>
                    <CardTitle className="text-xl">{event.title}</CardTitle>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground text-sm line-clamp-3">
                      {event.description}
                    </p>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-2" />
                        {new Date(event.event_date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <Clock className="h-4 w-4 mr-2" />
                        {new Date(event.event_date).toLocaleTimeString()}
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-2" />
                        {event.location}
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <Users className="h-4 w-4 mr-2" />
                        {event.current_registrations || 0}/{event.capacity} registered
                      </div>
                      {event.fee_amount > 0 && (
                        <div className="flex items-center text-muted-foreground">
                          <IndianRupee className="h-4 w-4 mr-2" />
                          ₹{event.fee_amount}
                        </div>
                      )}
                    </div>

                    {event.requirements && (
                      <div className="text-sm">
                        <span className="font-medium">Requirements: </span>
                        <span className="text-muted-foreground">{event.requirements}</span>
                      </div>
                    )}

                    <div className="pt-4">
                      {registrations.has(event.id) ? (
                        <Button disabled className="w-full">
                          Already Registered
                        </Button>
                      ) : (
                        <EventRegistrationForm 
                          event={event} 
                          onRegistrationSuccess={handleRegistrationSuccess} 
                        />
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </main>

        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default Events;