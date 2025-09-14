import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, Eye } from "lucide-react";
import { Footer } from "@/components/Footer";

const galleryEvents = [
  {
    id: 1,
    title: "TechFest 2024",
    type: "Technical",
    date: "2024-02-15",
    location: "Main Auditorium",
    attendees: 350,
    images: [
      "/placeholder-tech-1.jpg",
      "/placeholder-tech-2.jpg", 
      "/placeholder-tech-3.jpg"
    ]
  },
  {
    id: 2,
    title: "Cultural Evening",
    type: "Cultural",
    date: "2024-02-10",
    location: "Open Theatre", 
    attendees: 200,
    images: [
      "/placeholder-cultural-1.jpg",
      "/placeholder-cultural-2.jpg",
      "/placeholder-cultural-3.jpg"
    ]
  },
  {
    id: 3,
    title: "Academic Conference",
    type: "Academic",
    date: "2024-02-05",
    location: "Conference Hall",
    attendees: 150,
    images: [
      "/placeholder-academic-1.jpg",
      "/placeholder-academic-2.jpg"
    ]
  },
  {
    id: 4,
    title: "Sports Fest",
    type: "Sports",
    date: "2024-01-25",
    location: "Sports Complex",
    attendees: 400,
    images: [
      "/placeholder-sports-1.jpg",
      "/placeholder-sports-2.jpg",
      "/placeholder-sports-3.jpg",
      "/placeholder-sports-4.jpg"
    ]
  }
];

const eventTypeColors = {
  Technical: "bg-primary",
  Cultural: "bg-primary", 
  Academic: "bg-primary",
  Sports: "bg-primary"
};

const Gallery = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  return (
    <div className="min-h-screen bg-background">
      <Navbar variant="home" />
      
      <main className="container mx-auto px-4 py-6 lg:py-8">
        <div className="text-center mb-8 lg:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Event Gallery</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
            Browse through memories from our past events. Each gallery showcases the vibrant moments and experiences shared by our college community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {galleryEvents.map((event) => (
            <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img 
                  src={event.images[0]} 
                  alt={event.title}
                  className="w-full h-48 object-cover bg-muted"
                />
                <Badge 
                  className={`absolute top-3 left-3 text-white ${eventTypeColors[event.type]}`}
                >
                  {event.type}
                </Badge>
              </div>
              
              <CardContent className="p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-semibold mb-3">{event.title}</h3>
                
                <div className="space-y-2 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span className="truncate">{new Date(event.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span className="truncate">{event.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span>{event.attendees} attendees</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mb-4">
                  {event.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${event.title} ${index + 1}`}
                      className="w-full h-14 sm:h-16 object-cover rounded bg-muted cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => setSelectedEvent(event)}
                    />
                  ))}
                </div>

                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setSelectedEvent(event)}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View Gallery
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Image Modal */}
        {selectedEvent && (
          <div 
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-2 sm:p-4"
            onClick={() => setSelectedEvent(null)}
          >
            <div className="bg-background rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto mx-2">
              <div className="p-4 sm:p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold pr-4">{selectedEvent.title}</h2>
                    <Badge className={`mt-2 text-white ${eventTypeColors[selectedEvent.type]}`}>
                      {selectedEvent.type}
                    </Badge>
                  </div>
                  <Button variant="ghost" onClick={() => setSelectedEvent(null)} className="text-xl">
                    ×
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                  {selectedEvent.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${selectedEvent.title} ${index + 1}`}
                      className="w-full h-48 sm:h-64 object-cover rounded bg-muted"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Gallery;