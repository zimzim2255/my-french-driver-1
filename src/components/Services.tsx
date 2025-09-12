import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { 
  MapPin, 
  Plane, 
  Calendar, 
  Users, 
  Clock, 
  Star,
  ArrowRight
} from "lucide-react";

export function Services() {
  const services = [
    {
      icon: <Plane className="w-8 h-8" />,
      title: "Airport Transfers",
      description: "Seamless transfers to/from CDG, Orly, and Beauvais airports with flight monitoring and meet & greet service.",
      features: ["Flight tracking", "Meet & greet", "Luggage assistance", "All airports covered"],
      price: "From €80",
      image: "assets/Nouveau site internet/aiport transfer 1.jpeg"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Corporate Services",
      description: "Professional transportation for business meetings, conferences, and corporate events with dedicated account management.",
      features: ["Executive vehicles", "Billing management", "Regular routes", "24/7 support"],
      price: "From €100",
      image: "assets/Nouveau site internet/BUSINESS.jpeg"
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Special Events",
      description: "Elegant transportation for weddings, galas, and special occasions with luxury vehicles and professional service.",
      features: ["Luxury fleet", "Event coordination", "Multiple vehicles", "Special decorations"],
      price: "From €150",
      image: "assets/Nouveau site internet/diplomatie.jpeg"
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "City Tours",
      description: "Discover Paris and surrounding regions with our knowledgeable chauffeurs and comfortable vehicles.",
      features: ["Local expertise", "Flexible itinerary", "Multiple languages", "Photo stops"],
      price: "Half-day from €500",
      image: "assets/Nouveau site internet/EXCURSION .jpeg"
    }
  ];

  return (
    <section id="services" className="min-h-screen py-20 bg-muted/30 flex flex-col justify-center">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">Our Services</Badge>
          <h2 className="text-4xl md:text-5xl mb-6">
            Premium Transportation Solutions
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From airport transfers to special events, we provide exceptional chauffeur services 
            tailored to your needs with uncompromising quality and attention to detail.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
              {/* Service Image */}
              {service.image && (
                <div className="aspect-video overflow-hidden">
                  <ImageWithFallback
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              
              <CardContent className="p-6">
                <div className="mb-4 text-primary group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                
                <h3 className="text-xl mb-3">{service.title}</h3>
                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                  {service.description}
                </p>
                
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm">
                      <Star className="w-3 h-3 text-yellow-500 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <div className="flex items-center justify-between">
                  <div className="text-primary">{service.price}</div>
                  <Button size="sm" variant="ghost" className="group-hover:bg-primary group-hover:text-white">
                    Book Now
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button size="lg" className="px-8">
            <Clock className="w-4 h-4 mr-2" />
            Get Custom Quote
          </Button>
        </div>
      </div>
    </section>
  );
}