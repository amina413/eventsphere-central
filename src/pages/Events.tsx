import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Calendar, MapPin, Users, Clock, IndianRupee } from "lucide-react";
import { Footer } from "@/components/Footer";

// Mock events data
const mockEvents = [
  {
    id: 1,
    title: "Tech Innovation Summit 2024",
    description: "Join us for a day of cutting-edge technology presentations, networking opportunities, and hands-on workshops. Learn about the latest trends in AI, blockchain, and software development.",
    event_date: "2024-03-20T09:00:00Z",
    location: "Main Auditorium",
    category: "technical",
    current_registrations: 120,
    capacity: 150,
    fee_amount: 0,
    requirements: "Basic programming knowledge preferred",
    image_url: null,
    status: "approved"
  },
  {
    id: 2,
    title: "Cultural Fest Harmony",
    description: "Experience the vibrant cultural diversity of our college through music, dance, drama, and art exhibitions. Participate in various competitions and showcase your talents.",
    event_date: "2024-03-25T14:00:00Z",
    location: "Open Grounds",
    category: "cultural",
    current_registrations: 200,
    capacity: 300,
    fee_amount: 50,
    requirements: "Open to all students",
    image_url: null,
    status: "approved"
  },
  {
    id: 3,
    title: "AI & Machine Learning Workshop",
    description: "Deep dive into artificial intelligence and machine learning concepts. Hands-on session with Python, TensorFlow, and real-world project implementation.",
    event_date: "2024-04-01T10:00:00Z",
    location: "CS Lab Block",
    category: "academic",
    current_registrations: 45,
    capacity: 50,
    fee_amount: 100,
    requirements: "Python programming experience required",
    image_url: null,
    status: "approved"
  },
  {
    id: 4,
    title: "Startup Pitch Competition",
    description: "Present your innovative business ideas to a panel of industry experts and investors. Win exciting prizes and get mentorship opportunities.",
    event_date: "2024-04-10T15:00:00Z",
    location: "Business Hall",
    category: "competition",
    current_registrations: 30,
    capacity: 40,
    fee_amount: 0,
    requirements: "Business plan required for participation",
    image_url: null,
    status: "approved"
  },
  {
    id: 5,
    title: "Photography Workshop",
    description: "Learn the art of photography from professional photographers. Covers composition, lighting, editing, and portfolio development.",
    event_date: "2024-04-15T11:00:00Z",
    location: "Art Studio",
    category: "workshop",
    current_registrations: 25,
    capacity: 30,
    fee_amount: 75,
    requirements: "Camera (DSLR or mirrorless) required",
    image_url: null,
    status: "approved"
  }
];

const Events = () => {
  const [events, setEvents] = useState(mockEvents);
  const [loading, setLoading] = useState(true);
  const [registrations, setRegistrations] = useState(new Set([1, 3])); // Mock registered events
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleRegistrationSuccess = () => {
    toast({
      title: "Registration Successful",
      description: "You have successfully registered for the event!",
    });
  };

  const handleRegister = (eventId: number) => {
    setRegistrations(prev => new Set([...prev, eventId]));
    handleRegistrationSuccess();
  };

  const eventTypeColors = {
    technical: "bg-primary",
    cultural: "bg-primary", 
    academic: "bg-primary",
    sports: "bg-primary",
    workshop: "bg-primary",
    seminar: "bg-primary",
    competition: "bg-primary"
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
        
        <main className="container mx-auto px-4 py-6 lg:py-8">
          <div className="text-center mb-8 lg:mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Upcoming Events</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
              Discover and register for exciting events happening at our college. Don't miss out on opportunities to learn, compete, and connect!
            </p>
          </div>

          {events.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">No upcoming events</h3>
              <p className="text-muted-foreground">Check back soon for new events!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
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
                        <Button 
                          onClick={() => handleRegister(event.id)}
                          className="w-full bg-primary hover:bg-primary/90"
                        >
                          Register Now
                        </Button>
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