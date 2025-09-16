import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { 
  Calendar, 
  Clock, 
  Users, 
  MessageSquare, 
  Edit,
  Settings,
  CheckCircle,
  XCircle,
  Star,
  BarChart3
} from "lucide-react";

// Mock data
const mockEvents = [
  {
    id: 1,
    title: "TechFest 2024",
    event_date: "2024-03-15",
    status: "approved",
    current_registrations: 250,
    capacity: 300,
    created_at: "2024-02-01",
    mode: "offline",
    location: "Main Auditorium",
    category: "technical"
  },
  {
    id: 2,
    title: "AI Workshop",
    event_date: "2024-03-20",
    status: "pending",
    current_registrations: 45,
    capacity: 50,
    created_at: "2024-02-15",
    mode: "online",
    location: "Zoom Meeting",
    category: "technical"
  },
  {
    id: 3,
    title: "Cultural Night",
    event_date: "2024-02-10",
    status: "completed",
    current_registrations: 180,
    capacity: 200,
    created_at: "2024-01-20",
    mode: "offline",
    location: "Open Theatre",
    category: "cultural"
  }
];

const mockRegistrations = {
  1: [
    { id: 1, name: "John Doe", studentId: "CS001", registrationDate: "2024-02-05" },
    { id: 2, name: "Jane Smith", studentId: "CS002", registrationDate: "2024-02-06" },
    { id: 3, name: "Mike Johnson", studentId: "EE001", registrationDate: "2024-02-07" }
  ],
  2: [
    { id: 4, name: "Sarah Wilson", studentId: "CS003", registrationDate: "2024-02-16" }
  ],
  3: [
    { id: 5, name: "Alex Brown", studentId: "ME001", registrationDate: "2024-01-25" },
    { id: 6, name: "Lisa Davis", studentId: "CE001", registrationDate: "2024-01-26" }
  ]
};

const mockFeedback = {
  3: [
    { 
      student: "Alex Brown", 
      rating: 5, 
      comment: "Excellent cultural event! Very well organized and entertaining." 
    },
    { 
      student: "Lisa Davis", 
      rating: 4, 
      comment: "Great performances but could have been longer." 
    }
  ]
};

interface OrganizerDashboardContentProps {
  activeSection: string;
}

export const OrganizerDashboardContent = ({ activeSection }: OrganizerDashboardContentProps) => {
  const [events, setEvents] = useState(mockEvents);
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
  const [editingEvent, setEditingEvent] = useState<any>(null);
  const [createEventForm, setCreateEventForm] = useState({
    title: '',
    description: '',
    category: '',
    mode: '',
    location: '',
    eventDate: '',
    capacity: ''
  });
  
  const { profile } = useAuth();
  const { toast } = useToast();

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    const newEvent = {
      id: events.length + 1,
      title: createEventForm.title,
      event_date: createEventForm.eventDate,
      status: "pending",
      current_registrations: 0,
      capacity: parseInt(createEventForm.capacity),
      created_at: new Date().toISOString().split('T')[0],
      mode: createEventForm.mode,
      location: createEventForm.location,
      category: createEventForm.category
    };
    setEvents([...events, newEvent]);
    toast({
      title: 'Event Created!',
      description: 'Your event has been submitted for approval.',
    });
    setCreateEventForm({
      title: '',
      description: '',
      category: '',
      mode: '',
      location: '',
      eventDate: '',
      capacity: ''
    });
  };

  if (activeSection === "dashboard") {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Welcome, {profile?.full_name || 'Organizer'}!</h1>
          <p className="text-muted-foreground">Manage your events and track performance.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
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
                <div key={event.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 md:p-4 border border-border rounded-lg gap-3 sm:gap-0">
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
                          : event.status === "completed"
                          ? "bg-primary text-primary-foreground"
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
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="outline" onClick={() => setEditingEvent(event)}>
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                          <DialogHeader>
                            <DialogTitle>Edit Event</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <Label>Event Title</Label>
                              <Input value={editingEvent?.title || ''} readOnly />
                            </div>
                            <div>
                              <Label>Date</Label>
                              <Input value={editingEvent?.event_date || ''} readOnly />
                            </div>
                            <div>
                              <Label>Location</Label>
                              <Input value={editingEvent?.location || ''} readOnly />
                            </div>
                            <Button className="w-full">Save Changes</Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                      
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="outline">
                            <Settings className="h-4 w-4 mr-1" />
                            Manage
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                          <DialogHeader>
                            <DialogTitle>Manage Event - {event.title}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4 text-center">
                              <div>
                                <div className="text-2xl font-bold text-primary">{event.current_registrations}</div>
                                <div className="text-sm text-muted-foreground">Registered</div>
                              </div>
                              <div>
                                <div className="text-2xl font-bold text-accent">{event.capacity}</div>
                                <div className="text-sm text-muted-foreground">Capacity</div>
                              </div>
                            </div>
                            <Button className="w-full" variant="outline">
                              View Full Analytics
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
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
          <CardTitle>My Events</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {events.map((event) => (
              <div key={event.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 md:p-4 border border-border rounded-lg gap-3 sm:gap-0">
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
                        : event.status === "completed"
                        ? "bg-primary text-primary-foreground"
                        : "bg-destructive text-destructive-foreground"
                    }
                  >
                    {event.status}
                  </Badge>
                  
                  <div className="flex space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="outline" onClick={() => setEditingEvent(event)}>
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle>Edit Event</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label>Event Title</Label>
                            <Input value={editingEvent?.title || ''} readOnly />
                          </div>
                          <div>
                            <Label>Date</Label>
                            <Input value={editingEvent?.event_date || ''} readOnly />
                          </div>
                          <div>
                            <Label>Location</Label>
                            <Input value={editingEvent?.location || ''} readOnly />
                          </div>
                          <Button className="w-full">Save Changes</Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="outline">
                          <Settings className="h-4 w-4 mr-1" />
                          Manage
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle>Manage Event - {event.title}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4 text-center">
                            <div>
                              <div className="text-2xl font-bold text-primary">{event.current_registrations}</div>
                              <div className="text-sm text-muted-foreground">Registered</div>
                            </div>
                            <div>
                              <div className="text-2xl font-bold text-accent">{event.capacity}</div>
                              <div className="text-sm text-muted-foreground">Capacity</div>
                            </div>
                          </div>
                          <Button className="w-full" variant="outline">
                            View Full Analytics
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (activeSection === "create") {
    return (
      <Card className="border-0 shadow-card">
        <CardHeader>
          <CardTitle>Create New Event</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreateEvent} className="space-y-4">
            <div>
              <Label htmlFor="title">Event Title</Label>
              <Input
                id="title"
                value={createEventForm.title}
                onChange={(e) => setCreateEventForm(prev => ({ ...prev, title: e.target.value }))}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={createEventForm.description}
                onChange={(e) => setCreateEventForm(prev => ({ ...prev, description: e.target.value }))}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="category">Event Category</Label>
              <Select value={createEventForm.category} onValueChange={(value) => setCreateEventForm(prev => ({ ...prev, category: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technical">Technical</SelectItem>
                  <SelectItem value="cultural">Cultural</SelectItem>
                  <SelectItem value="academic">Academic</SelectItem>
                  <SelectItem value="sports">Sports</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="mode">Mode of Delivery</Label>
              <Select value={createEventForm.mode} onValueChange={(value) => setCreateEventForm(prev => ({ ...prev, mode: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="online">Online</SelectItem>
                  <SelectItem value="offline">On-Location</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={createEventForm.location}
                onChange={(e) => setCreateEventForm(prev => ({ ...prev, location: e.target.value }))}
                placeholder={createEventForm.mode === 'online' ? 'Meeting Link/Platform' : 'Venue Location'}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="eventDate">Event Date & Time</Label>
              <Input
                id="eventDate"
                type="datetime-local"
                value={createEventForm.eventDate}
                onChange={(e) => setCreateEventForm(prev => ({ ...prev, eventDate: e.target.value }))}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="capacity">Capacity</Label>
              <Input
                id="capacity"
                type="number"
                value={createEventForm.capacity}
                onChange={(e) => setCreateEventForm(prev => ({ ...prev, capacity: e.target.value }))}
                required
              />
            </div>
            
            <Button type="submit" className="w-full">Create Event</Button>
          </form>
        </CardContent>
      </Card>
    );
  }

  if (activeSection === "registrations") {
    return (
      <Card className="border-0 shadow-card">
        <CardHeader>
          <CardTitle>Event Registrations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {events.map((event) => (
              <Card key={event.id} className="p-4 cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => setSelectedEvent(selectedEvent === event.id ? null : event.id)}>
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">{event.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {event.current_registrations} registrations • {event.capacity} capacity
                    </p>
                  </div>
                  <Badge className="bg-primary text-primary-foreground">
                    {selectedEvent === event.id ? 'Hide Details' : 'View Details'}
                  </Badge>
                </div>
                
                {selectedEvent === event.id && mockRegistrations[event.id] && (
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex justify-between items-center mb-3">
                      <h5 className="font-medium">Registered Students</h5>
                      <div className="text-sm text-muted-foreground">
                        Total: {mockRegistrations[event.id].length}
                      </div>
                    </div>
                    <div className="space-y-2">
                      {mockRegistrations[event.id].map((registration) => (
                        <div key={registration.id} className="flex justify-between items-center py-2 px-3 bg-muted rounded">
                          <div>
                            <span className="font-medium">{registration.name}</span>
                            <span className="text-sm text-muted-foreground ml-2">ID: {registration.studentId}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            Registered: {new Date(registration.registrationDate).toLocaleDateString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (activeSection === "reports") {
    const completedEvents = events.filter(e => e.status === 'completed');
    
    return (
      <Card className="border-0 shadow-card">
        <CardHeader>
          <CardTitle>Event Reports & Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {completedEvents.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                No completed events to show reports for yet.
              </p>
            ) : (
              completedEvents.map((event) => (
                <Card key={event.id} className="p-4">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">{event.title}</h4>
                      <Badge className="bg-success text-success-foreground">Completed</Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">{event.current_registrations}</div>
                        <div className="text-sm text-muted-foreground">Total Participants</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-accent">
                          {mockFeedback[event.id] ? (
                            (mockFeedback[event.id].reduce((sum, f) => sum + f.rating, 0) / mockFeedback[event.id].length).toFixed(1)
                          ) : 'N/A'}
                        </div>
                        <div className="text-sm text-muted-foreground">Avg Rating</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-success">
                          {mockFeedback[event.id] ? mockFeedback[event.id].length : 0}
                        </div>
                        <div className="text-sm text-muted-foreground">Feedback Count</div>
                      </div>
                    </div>
                    
                    {mockFeedback[event.id] && (
                      <div className="space-y-3">
                        <h5 className="font-medium">Student Feedback</h5>
                        {mockFeedback[event.id].map((feedback, index) => (
                          <div key={index} className="p-3 bg-muted rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                              <span className="font-medium">{feedback.student}</span>
                              <div className="flex items-center">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star key={star} className={`w-4 h-4 ${
                                    star <= feedback.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                                  }`} />
                                ))}
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground">{feedback.comment}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return <div>Section not found</div>;
};