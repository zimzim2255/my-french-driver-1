import { getAssetPath } from "../../utils/assetPath";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { 
  Plane, 
  Clock, 
  MapPin,
  Users,
  Briefcase,
  Star,
  CheckCircle,
  ArrowRight,
  Phone,
  Wifi
} from "lucide-react";

export function AirportPage() {
  const airports = [
    {
      name: "Charles de Gaulle (CDG)",
      code: "CDG",
      distance: "35 km from Paris center",
      terminals: "3 Terminals",
      time: "45-60 minutes",
      price: "From €90",
      description: "Paris's main international airport serving over 70 million passengers annually."
    },
    {
      name: "Orly Airport (ORY)",
      code: "ORY", 
      distance: "18 km from Paris center",
      terminals: "2 Terminals",
      time: "30-45 minutes",
      price: "From €70",
      description: "Paris's second largest airport, closer to the city center."
    },
    {
      name: "Beauvais-Tillé (BVA)",
      code: "BVA",
      distance: "85 km from Paris center", 
      terminals: "1 Terminal",
      time: "75-90 minutes",
      price: "From €150",
      description: "Budget airline hub located north of Paris."
    }
  ];

  const services = [
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Flight Monitoring",
      description: "We track your flight in real-time and adjust pickup times for delays or early arrivals."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Meet & Greet",
      description: "Professional chauffeur waiting at arrivals with name sign for seamless pickup."
    },
    {
      icon: <Briefcase className="w-8 h-8" />,
      title: "Luggage Assistance",
      description: "Complete luggage handling from terminal to vehicle with care and professionalism."
    },
    {
      icon: <Wifi className="w-8 h-8" />,
      title: "Comfort Amenities",
      description: "WiFi, phone chargers, climate control, and refreshments in all vehicles."
    }
  ];

  const features = [
    "Fixed pricing - no surge charges",
    "Professional uniformed chauffeurs",
    "Luxury Mercedes vehicles",
    "Free waiting time included",
    "24/7 customer support",
    "Child seats available",
    "Business meeting setup",
    "Multi-language service"
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src={getAssetPath("Nouveau site internet/aiport transfer 1.jpeg")}
            alt="Airport transfer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/80"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <Badge variant="secondary" className="mb-4 bg-black/60 text-white border-white/50 font-semibold">
              Airport Transfers
            </Badge>
            <h1 className="text-5xl md:text-6xl mb-6 font-bold text-white drop-shadow-lg">
              Seamless Airport Transportation
            </h1>
            <p className="text-xl mb-8 text-white font-medium drop-shadow-md">
              Professional transfers to and from all Paris airports with flight monitoring, 
              meet & greet service, and luxury vehicles. Arrive and depart in comfort.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                <Plane className="w-4 h-4 mr-2" />
                Book Airport Transfer
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                View Pricing
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Airport Coverage */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-6">All Paris Airports Covered</h2>
            <p className="text-xl text-muted-foreground">
              Professional service to and from every airport serving the Paris region
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {airports.map((airport, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="bg-primary/10 rounded-full p-4 w-fit mx-auto mb-4 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      <Plane className="w-8 h-8 text-primary group-hover:text-white" />
                    </div>
                    <h3 className="text-xl mb-2">{airport.name}</h3>
                    <Badge variant="outline" className="mb-4">{airport.code}</Badge>
                    <p className="text-sm text-muted-foreground">{airport.description}</p>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Distance:</span>
                      <span>{airport.distance}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Terminals:</span>
                      <span>{airport.terminals}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Journey Time:</span>
                      <span>{airport.time}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Starting Price:</span>
                      <span className="text-lg text-primary">{airport.price}</span>
                    </div>
                  </div>

                  <Button className="w-full group-hover:bg-primary group-hover:text-white">
                    Book {airport.code} Transfer
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-6">Premium Airport Services</h2>
            <p className="text-xl text-muted-foreground">
              Every detail handled for a stress-free airport experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="text-center group hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-lg mb-3">{service.title}</h3>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl mb-6">Why Choose Our Airport Service?</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Since 2017, we've perfected airport transfers with attention to every detail. 
                Our service combines luxury, reliability, and professional expertise for 
                the ultimate travel experience.
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button size="lg">
                  Book Now
                </Button>
                <Button size="lg" variant="outline">
                  <Phone className="w-4 h-4 mr-2" />
                  Call +33 1 42 60 30 30
                </Button>
              </div>
            </div>

            <div className="space-y-6">
              <Card className="bg-primary text-white">
                <CardContent className="p-6 text-center">
                  <Clock className="w-12 h-12 mx-auto mb-4" />
                  <h3 className="text-xl mb-3">Flight Tracking</h3>
                  <p className="opacity-90">
                    Real-time monitoring ensures your driver is always ready, 
                    regardless of flight delays or early arrivals.
                  </p>
                </CardContent>
              </Card>

              <div className="grid grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-4 text-center">
                    <Star className="w-8 h-8 mx-auto mb-2 text-primary" />
                    <div className="text-lg mb-1">4.9★</div>
                    <div className="text-xs text-muted-foreground">Customer Rating</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <MapPin className="w-8 h-8 mx-auto mb-2 text-primary" />
                    <div className="text-lg mb-1">50K+</div>
                    <div className="text-xs text-muted-foreground">Airport Transfers</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking CTA */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl mb-6">Ready for Your Airport Transfer?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Book now for guaranteed luxury transportation with professional service 
            from Paris airports. Available 24/7.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              Book Airport Transfer
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
              Get Quote
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}