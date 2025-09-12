import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  MessageCircle,
  Calendar,
  Star
} from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">Contact Us</Badge>
          <h2 className="text-4xl md:text-5xl mb-6">
            Ready to Experience Luxury?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Contact our team to book your premium transportation or get a personalized quote. 
            We're available 24/7 to serve you.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl mb-6 flex items-center">
                  <Calendar className="w-6 h-6 mr-2 text-primary" />
                  Book Your Ride
                </h3>
                
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm mb-2">Full Name</label>
                      <Input placeholder="Enter your full name" />
                    </div>
                    <div>
                      <label className="block text-sm mb-2">Phone Number</label>
                      <Input placeholder="+33 1 XX XX XX XX" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm mb-2">Email Address</label>
                    <Input type="email" placeholder="your.email@example.com" />
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm mb-2">Pickup Location</label>
                      <Input placeholder="Enter pickup address" />
                    </div>
                    <div>
                      <label className="block text-sm mb-2">Destination</label>
                      <Input placeholder="Enter destination" />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm mb-2">Date</label>
                      <Input type="date" />
                    </div>
                    <div>
                      <label className="block text-sm mb-2">Time</label>
                      <Input type="time" />
                    </div>
                    <div>
                      <label className="block text-sm mb-2">Passengers</label>
                      <select className="w-full px-3 py-2 border border-border rounded-md bg-background">
                        <option>1 Passenger</option>
                        <option>2 Passengers</option>
                        <option>3 Passengers</option>
                        <option>4+ Passengers</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm mb-2">Special Requirements</label>
                    <Textarea 
                      placeholder="Any special requests, flight details, or additional information..."
                      rows={4}
                    />
                  </div>
                  
                  <Button size="lg" className="w-full">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Request Quote
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h4 className="mb-4 flex items-center">
                  <Phone className="w-5 h-5 mr-2 text-primary" />
                  Call Us Directly
                </h4>
                <div className="space-y-3">
                  <div>
                    <div className="text-lg">+33 1 42 60 30 30</div>
                    <div className="text-sm text-muted-foreground">Main booking line</div>
                  </div>
                  <div>
                    <div className="text-lg">+33 6 12 34 56 78</div>
                    <div className="text-sm text-muted-foreground">Emergency & 24/7</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h4 className="mb-4 flex items-center">
                  <Mail className="w-5 h-5 mr-2 text-primary" />
                  Email Us
                </h4>
                <div className="space-y-3">
                  <div>
                    <div>booking@myfrenchdriver.com</div>
                    <div className="text-sm text-muted-foreground">Reservations</div>
                  </div>
                  <div>
                    <div>corporate@myfrenchdriver.com</div>
                    <div className="text-sm text-muted-foreground">Business accounts</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h4 className="mb-4 flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-primary" />
                  Service Area
                </h4>
                <div className="space-y-2 text-sm">
                  <div>• Paris (All Arrondissements)</div>
                  <div>• CDG, Orly & Beauvais Airports</div>
                  <div>• Île-de-France Region</div>
                  <div>• Versailles & Surroundings</div>
                  <div>• Custom destinations available</div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-primary text-white">
              <CardContent className="p-6 text-center">
                <Clock className="w-8 h-8 mx-auto mb-3" />
                <h4 className="mb-2">24/7 Availability</h4>
                <p className="text-sm opacity-90 mb-4">
                  Our premium service is available around the clock for your convenience.
                </p>
                <div className="flex items-center justify-center space-x-1 text-sm">
                  <Star className="w-4 h-4 text-yellow-300" />
                  <span>Premium service guaranteed</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}