import { getAssetPath } from "../utils/assetPath";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { 
  Phone, 
  Mail, 
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
  Twitter
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="mb-6">
              <img 
                src={getAssetPath("logo.png")} 
                alt="My French Driver Logo" 
                className="w-14 h-14 object-contain"
              />
            </div>
            <p className="text-sm opacity-80 leading-relaxed mb-6">
              Since 2017, we've been providing premium chauffeur services in Paris and 
              Île-de-France with an unwavering commitment to comfort, punctuality, and discretion.
            </p>
            <div className="flex space-x-4">
              <Button size="sm" variant="ghost" className="text-white hover:bg-white/10 p-2">
                <Facebook className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="ghost" className="text-white hover:bg-white/10 p-2">
                <Instagram className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="ghost" className="text-white hover:bg-white/10 p-2">
                <Linkedin className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="ghost" className="text-white hover:bg-white/10 p-2">
                <Twitter className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          <div>
            <h4 className="mb-6">Services</h4>
            <ul className="space-y-3 text-sm opacity-80">
              <li><a href="#" className="hover:opacity-100 transition-opacity">Airport Transfers</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">Corporate Services</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">Special Events</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">City Tours</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">Long Distance</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="mb-6">Company</h4>
            <ul className="space-y-3 text-sm opacity-80">
              <li><a href="#" className="hover:opacity-100 transition-opacity">About Us</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">Our Fleet</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">Safety Standards</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">Terms of Service</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">Privacy Policy</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="mb-6">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Phone className="w-4 h-4 mt-1 flex-shrink-0" />
                <div className="text-sm">
                  <div>+33 1 42 60 30 30</div>
                  <div className="opacity-60">24/7 Booking</div>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Mail className="w-4 h-4 mt-1 flex-shrink-0" />
                <div className="text-sm">
                  <div>booking@myfrenchdriver.com</div>
                  <div className="opacity-60">Reservations</div>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <div className="text-sm">
                  <div>Paris & Île-de-France</div>
                  <div className="opacity-60">Service Area</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <Separator className="opacity-20 mb-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center text-sm opacity-80">
          <div>
            © 2025 My French Driver. All rights reserved.
          </div>
          <div className="mt-4 md:mt-0">
            Licensed & Insured • Professional Chauffeur Services • Since 2017
          </div>
        </div>
      </div>
    </footer>
  );
}