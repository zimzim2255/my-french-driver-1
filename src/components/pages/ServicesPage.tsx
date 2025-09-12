import { getAssetPath } from "../../utils/assetPath";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { 
  Plane, 
  Users, 
  Calendar, 
  MapPin,
  Clock,
  Star,
  ArrowRight,
  CheckCircle
} from "lucide-react";

export function ServicesPage() {
  const mainServices = [
    {
      icon: <Plane className="w-12 h-12" />,
      title: "Airport Transfers",
      description: "Professional transfers to/from all Paris airports with flight monitoring and meet & greet service.",
      features: [
        "Flight tracking and monitoring",
        "Meet & greet at arrivals",
        "Luggage assistance included",
        "All airports: CDG, Orly, Beauvais",
        "Fixed pricing, no surprises",
        "Available 24/7"
      ],
      pricing: "Starting from €80",
      image: "luxury airport transfer paris"
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: "Corporate Services",
      description: "Dedicated transportation solutions for businesses with account management and billing services.",
      features: [
        "Executive vehicle fleet",
        "Monthly billing available",
        "Regular route optimization",
        "Dedicated account manager",
        "Multi-passenger vehicles",
        "Conference call capabilities"
      ],
      pricing: "Starting from €100",
      image: "business executive transport"
    },
    {
      icon: <Calendar className="w-12 h-12" />,
      title: "Special Events",
      description: "Elegant transportation for weddings, galas, and special occasions with luxury service.",
      features: [
        "Luxury vehicle selection",
        "Event coordination support",
        "Multiple vehicle bookings",
        "Special decorations available",
        "Professional uniformed drivers",
        "Photography coordination"
      ],
      pricing: "Starting from €150",
      image: "luxury wedding car service"
    },
    {
      icon: <MapPin className="w-12 h-12" />,
      title: "City Tours & Excursions",
      description: "Discover Paris and surrounding regions with knowledgeable local chauffeurs.",
      features: [
        "Multi-lingual drivers",
        "Flexible itinerary planning",
        "Historical knowledge included",
        "Photo stop coordination",
        "Versailles and castles tours",
        "Custom route planning"
      ],
      pricing: "Half-day from €500 | Full-day from €980",
      image: "paris city tour luxury"
    }
  ];

  const additionalServices = [
    {
      title: "Long Distance Travel",
      description: "Comfortable long-distance transportation throughout France and Europe.",
      icon: <MapPin className="w-6 h-6" />
    },
    {
      title: "VIP Protection",
      description: "Discreet security transportation for high-profile clients.",
      icon: <Star className="w-6 h-6" />
    },
    {
      title: "Medical Transport",
      description: "Specialized vehicles for medical appointments and treatments.",
      icon: <CheckCircle className="w-6 h-6" />
    },
    {
      title: "Shopping Tours",
      description: "Luxury shopping experiences with personal shopping assistance.",
      icon: <Clock className="w-6 h-6" />
    }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src={getAssetPath("Nouveau site internet/notre marque 1.jpg")}
            alt="Premium transportation services"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/80"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto text-white">
            <Badge variant="secondary" className="mb-4 bg-black/60 text-white border-white/50 font-semibold">Our Services</Badge>
            <h1 className="text-5xl md:text-6xl mb-6 font-bold text-white drop-shadow-lg">
              Premium Transportation Solutions
            </h1>
            <p className="text-xl mb-8 text-white font-medium drop-shadow-md">
              Since 2017, My French Driver has been providing exceptional chauffeur services 
              in Paris and Île-de-France. Our mission is to deliver comfort, punctuality, 
              and discretion in every journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Book Service Now
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                Get Custom Quote
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-6">Core Services</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Professional transportation solutions tailored to your specific needs
            </p>
          </div>

          <div className="space-y-16">
            {mainServices.map((service, index) => (
              <div key={index} className={`grid lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-dense' : ''
              }`}>
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className="text-primary mb-4">
                    {service.icon}
                  </div>
                  <h3 className="text-3xl mb-4">{service.title}</h3>
                  <p className="text-lg text-muted-foreground mb-6">
                    {service.description}
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-8">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl text-primary mb-1">{service.pricing}</div>
                      <div className="text-sm text-muted-foreground">Base rate</div>
                    </div>
                    <Button>
                      Book Now
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
                
                <div className={index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                  <ImageWithFallback
                    src={
                      index === 0 ? "assets/Nouveau site internet/aiport transfer 1.jpeg" :
                      index === 1 ? "assets/Nouveau site internet/BUSINESS.jpeg" :
                      index === 2 ? "assets/Nouveau site internet/diplomatie.jpeg" :
                      "assets/Nouveau site internet/EXCURSION .jpeg"
                    }
                    alt={service.image}
                    className="w-full h-80 object-cover rounded-lg"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-6">Additional Services</h2>
            <p className="text-xl text-muted-foreground">
              Specialized transportation solutions for unique requirements
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {additionalServices.map((service, index) => (
              <Card key={index} className="text-center group hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="bg-primary/10 rounded-full p-4 w-fit mx-auto mb-4 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    {service.icon}
                  </div>
                  <h4 className="text-lg mb-3">{service.title}</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    {service.description}
                  </p>
                  <Button variant="ghost" size="sm" className="group-hover:bg-primary group-hover:text-white">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Service Standards */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-primary text-white rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl mb-6">Our Service Standards</h2>
            <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
              Every journey with My French Driver meets the highest standards of luxury, 
              safety, and professionalism.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <Clock className="w-12 h-12 mx-auto mb-4 opacity-90" />
                <h4 className="text-xl mb-2">Punctuality Guaranteed</h4>
                <p className="opacity-80">On-time service with traffic monitoring and route optimization</p>
              </div>
              <div>
                <Star className="w-12 h-12 mx-auto mb-4 opacity-90" />
                <h4 className="text-xl mb-2">Premium Comfort</h4>
                <p className="opacity-80">Luxury vehicles with amenities for maximum comfort</p>
              </div>
              <div>
                <CheckCircle className="w-12 h-12 mx-auto mb-4 opacity-90" />
                <h4 className="text-xl mb-2">Professional Drivers</h4>
                <p className="opacity-80">Experienced, licensed, and uniformed chauffeurs</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}