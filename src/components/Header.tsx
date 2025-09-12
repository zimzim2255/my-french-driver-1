import { Button } from "./ui/button";
import { Phone, MapPin } from "lucide-react";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-3">
            <img 
              src="assets/logo.png" 
              alt="My French Driver Logo" 
              className="w-12 h-12 object-contain"
            />
          </div>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#services" className="hover:text-primary transition-colors">Services</a>
          <a href="#about" className="hover:text-primary transition-colors">About</a>
          <a href="#fleet" className="hover:text-primary transition-colors">Fleet</a>
          <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
        </nav>
        
        <div className="flex items-center space-x-4">
          <div className="hidden lg:flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span>+33 1 42 60 30 30</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span>Paris & Île-de-France</span>
            </div>
          </div>
          <Button>Book Now</Button>
        </div>
      </div>
    </header>
  );
}