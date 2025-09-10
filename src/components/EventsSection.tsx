import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, Music, GraduationCap, Users } from "lucide-react";
import eventTechnical from "@/assets/event-technical.jpg";
import eventCultural from "@/assets/event-cultural.jpg";
import eventAcademic from "@/assets/event-academic.jpg";

const eventCategories = [
  {
    title: "Technical Events",
    description: "Coding competitions, hackathons, tech talks, and innovation challenges.",
    image: eventTechnical,
    icon: Code,
    stats: "50+ Events",
    color: "from-primary to-primary-hover"
  },
  {
    title: "Cultural Events",
    description: "Music festivals, dance competitions, art exhibitions, and cultural celebrations.",
    image: eventCultural,
    icon: Music,
    stats: "30+ Events",
    color: "from-accent to-accent-light"
  },
  {
    title: "Academic Events",
    description: "Research symposiums, paper presentations, workshops, and seminars.",
    image: eventAcademic,
    icon: GraduationCap,
    stats: "25+ Events",
    color: "from-success to-success/80"
  },
  {
    title: "Sports & Wellness",
    description: "Tournaments, fitness challenges, outdoor adventures, and wellness programs.",
    image: eventTechnical, // placeholder
    icon: Users,
    stats: "40+ Events",
    color: "from-warning to-warning/80"
  }
];

export const EventsSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Explore Event Categories
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From technical competitions to cultural celebrations, discover events that match your interests and talents.
          </p>
        </div>

        {/* Event Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {eventCategories.map((category, index) => (
            <Card 
              key={index} 
              className="event-card group border-0 shadow-card hover:shadow-lg overflow-hidden bg-card"
            >
              {/* Image Container */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-80`} />
                
                {/* Icon Overlay */}
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-3">
                  <category.icon className="h-6 w-6 text-white" />
                </div>
                
                {/* Stats Badge */}
                <div className="absolute bottom-4 left-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                  <span className="text-white font-medium text-sm">{category.stats}</span>
                </div>
              </div>

              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-bold text-card-foreground">
                  {category.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="pb-4">
                <p className="text-muted-foreground leading-relaxed">
                  {category.description}
                </p>
              </CardContent>

              <CardFooter>
                <Button 
                  variant="outline" 
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300"
                >
                  View Events
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Button variant="hero" size="lg" className="shadow-glow">
            Browse All Events
          </Button>
        </div>
      </div>
    </section>
  );
};