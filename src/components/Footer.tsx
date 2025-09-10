import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-nav text-nav-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">ES</span>
              </div>
              <span className="text-nav-foreground font-bold text-2xl">EventSphere</span>
            </Link>
            <p className="text-nav-foreground/80 mb-6 leading-relaxed">
              Connecting students with amazing events across universities. 
              Discover, register, and participate in experiences that matter.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-nav-foreground/60 hover:text-accent transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-nav-foreground/60 hover:text-accent transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-nav-foreground/60 hover:text-accent transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-nav-foreground/60 hover:text-accent transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-nav-foreground font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-nav-foreground/80 hover:text-accent transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-nav-foreground/80 hover:text-accent transition-colors">
                  Browse Events
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-nav-foreground/80 hover:text-accent transition-colors">
                  Event Categories
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-nav-foreground/80 hover:text-accent transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-nav-foreground/80 hover:text-accent transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* For Students */}
          <div>
            <h3 className="text-nav-foreground font-semibold text-lg mb-4">For Students</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/student/dashboard" className="text-nav-foreground/80 hover:text-accent transition-colors">
                  Student Dashboard
                </Link>
              </li>
              <li>
                <Link to="/student/events" className="text-nav-foreground/80 hover:text-accent transition-colors">
                  My Events
                </Link>
              </li>
              <li>
                <Link to="/student/certificates" className="text-nav-foreground/80 hover:text-accent transition-colors">
                  Certificates
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-nav-foreground/80 hover:text-accent transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-nav-foreground/80 hover:text-accent transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-nav-foreground font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center text-nav-foreground/80">
                <Mail className="h-4 w-4 mr-3 text-accent" />
                support@eventsphere.edu
              </li>
              <li className="flex items-center text-nav-foreground/80">
                <Phone className="h-4 w-4 mr-3 text-accent" />
                +1 (555) 123-4567
              </li>
              <li className="flex items-start text-nav-foreground/80">
                <MapPin className="h-4 w-4 mr-3 text-accent mt-1" />
                <span>
                  123 University Ave<br />
                  Campus Center, Room 456<br />
                  Academic City, AC 12345
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-nav-foreground/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-nav-foreground/60 text-sm mb-4 md:mb-0">
            © 2024 EventSphere. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <Link to="/privacy" className="text-nav-foreground/60 hover:text-accent transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-nav-foreground/60 hover:text-accent transition-colors">
              Terms of Service
            </Link>
            <Link to="/accessibility" className="text-nav-foreground/60 hover:text-accent transition-colors">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};