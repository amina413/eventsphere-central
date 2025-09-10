import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    // Simulate subscription
    setIsSubscribed(true);
    toast({
      title: "Successfully subscribed!",
      description: "You'll receive updates about upcoming events.",
    });
    
    setTimeout(() => {
      setIsSubscribed(false);
      setEmail("");
    }, 3000);
  };

  return (
    <section className="py-20 bg-gradient-to-r from-primary to-accent">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Content */}
        <div className="mb-8">
          <Mail className="h-16 w-16 text-white mx-auto mb-6 opacity-90" />
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Stay in the Loop
          </h2>
          <p className="text-xl text-accent-light max-w-2xl mx-auto">
            Get notified about upcoming events, registration deadlines, and exclusive opportunities 
            tailored for your interests.
          </p>
        </div>

        {/* Newsletter Form */}
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/70 focus:border-white focus:ring-white"
                required
              />
            </div>
            <Button 
              type="submit" 
              variant="secondary"
              className="bg-white text-primary hover:bg-accent-light hover:text-primary font-semibold px-8"
              disabled={isSubscribed}
            >
              {isSubscribed ? (
                <>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Subscribed!
                </>
              ) : (
                "Subscribe"
              )}
            </Button>
          </div>
        </form>

        {/* Benefits */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
          <div className="flex flex-col items-center">
            <div className="bg-white/10 rounded-full p-4 mb-4">
              <Mail className="h-6 w-6" />
            </div>
            <h3 className="font-semibold mb-2">Early Access</h3>
            <p className="text-accent-light text-sm">Be the first to know about new events</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-white/10 rounded-full p-4 mb-4">
              <CheckCircle className="h-6 w-6" />
            </div>
            <h3 className="font-semibold mb-2">Exclusive Events</h3>
            <p className="text-accent-light text-sm">Access to subscriber-only events</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-white/10 rounded-full p-4 mb-4">
              <Mail className="h-6 w-6" />
            </div>
            <h3 className="font-semibold mb-2">Personalized Updates</h3>
            <p className="text-accent-light text-sm">Recommendations based on your interests</p>
          </div>
        </div>
      </div>
    </section>
  );
};