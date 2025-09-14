import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Bell, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface NavbarProps {
  variant?: "home" | "dashboard";
}

export const Navbar = ({ variant = "home" }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, profile, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out successfully",
        description: "You have been logged out.",
      });
      navigate('/');
    } catch (error) {
      toast({
        title: "Error signing out",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  if (variant === "dashboard") {
    return (
      <nav className="bg-nav border-b border-border px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">ES</span>
            </div>
            <span className="text-nav-foreground font-bold text-xl">EventSphere</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Button variant="ghost" size="sm" className="text-nav-foreground hover:bg-accent/20">
              <Bell className="h-5 w-5" />
            </Button>
            {profile && (
              <span className="text-nav-foreground text-sm">
                {profile.full_name} ({profile.role})
              </span>
            )}
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-nav-foreground hover:bg-accent/20"
              onClick={handleSignOut}
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-nav/95 backdrop-blur-sm border-b border-border/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-glow">
              <span className="text-white font-bold text-lg">ES</span>
            </div>
            <span className="text-nav-foreground font-bold text-2xl">EventSphere</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="nav-link text-nav-foreground hover:text-accent">
              Home
            </Link>
            <Link to="/events" className="nav-link text-nav-foreground hover:text-accent">
              View Events
            </Link>
            <Link to="/gallery" className="nav-link text-nav-foreground hover:text-accent">
              Gallery
            </Link>
            <Link to="/about" className="nav-link text-nav-foreground hover:text-accent">
              About
            </Link>
          </div>

          {/* Auth/User Section */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            
            {user ? (
              <div className="flex items-center space-x-4">
                {profile && (
                  <span className="text-nav-foreground text-sm">
                    {profile.full_name}
                  </span>
                )}
                <Button 
                  variant="ghost" 
                  className="text-nav-foreground hover:text-accent hover:bg-accent/10"
                  onClick={handleSignOut}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <>
                <Link to="/auth">
                  <Button variant="ghost" className="text-nav-foreground hover:text-accent hover:bg-accent/10">
                    Login
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-glow">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-nav-foreground"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border/20 py-4">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-nav-foreground hover:text-accent">
                Home
              </Link>
              <Link to="/events" className="text-nav-foreground hover:text-accent">
                View Events
              </Link>
              <Link to="/gallery" className="text-nav-foreground hover:text-accent">
                Gallery
              </Link>
              <Link to="/about" className="text-nav-foreground hover:text-accent">
                About
              </Link>
              <div className="flex flex-col space-y-2 pt-4 border-t border-border/20">
                {user ? (
                  <>
                    {profile && (
                      <div className="text-nav-foreground text-sm px-2 py-1">
                        {profile.full_name}
                      </div>
                    )}
                    <Button 
                      variant="ghost" 
                      className="w-full text-nav-foreground justify-start"
                      onClick={handleSignOut}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/auth">
                      <Button variant="ghost" className="w-full text-nav-foreground">
                        Login
                      </Button>
                    </Link>
                    <Link to="/auth">
                      <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                        Sign Up
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};