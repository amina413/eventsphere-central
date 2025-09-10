import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    event: "TechFest 2024",
    role: "Computer Science Student",
    rating: 5,
    content: "EventSphere made registering for TechFest incredibly easy. The QR code check-in was seamless, and I loved getting my digital certificate instantly!",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b2c5?w=150&h=150&fit=crop&crop=face"
  },
  {
    name: "Marcus Johnson",
    event: "Cultural Night",
    role: "Arts Student",
    rating: 5,
    content: "The cultural events organized through EventSphere are amazing. Great platform for discovering events and connecting with fellow students.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  },
  {
    name: "Priya Sharma",
    event: "Research Symposium",
    role: "PhD Candidate",
    rating: 5,
    content: "As a presenter, EventSphere helped me manage my academic presentation effortlessly. The feedback system is fantastic for improvement.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face"
  },
  {
    name: "Alex Rodriguez",
    event: "Hackathon 2024",
    role: "Engineering Student",
    rating: 5,
    content: "The 48-hour hackathon was perfectly organized. Real-time updates, easy team formation, and instant results - couldn't ask for more!",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  }
];

export const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            What Students Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Hear from students who have experienced amazing events through EventSphere.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className="relative bg-card hover:shadow-lg transition-all duration-300 border-0 shadow-card"
            >
              <CardContent className="p-6">
                {/* Quote Icon */}
                <Quote className="h-8 w-8 text-accent mb-4 opacity-60" />
                
                {/* Rating */}
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-warning fill-current" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-muted-foreground mb-6 leading-relaxed text-sm">
                  "{testimonial.content}"
                </p>

                {/* Author Info */}
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-accent/20"
                  />
                  <div>
                    <h4 className="font-semibold text-card-foreground text-sm">
                      {testimonial.name}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.role}
                    </p>
                    <p className="text-xs text-accent font-medium">
                      {testimonial.event}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Statistics */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">10,000+</div>
            <div className="text-muted-foreground">Students Registered</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-accent mb-2">500+</div>
            <div className="text-muted-foreground">Events Hosted</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-success mb-2">50+</div>
            <div className="text-muted-foreground">Universities</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-warning mb-2">98%</div>
            <div className="text-muted-foreground">Satisfaction Rate</div>
          </div>
        </div>
      </div>
    </section>
  );
};