import { getAssetPath } from "../../utils/assetPath";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { 
  CarTaxiFront, 
  Users, 
  Clock,
  Shield,
  Star,
  CheckCircle,
  Phone,
  Calendar,
  Car,
  Route,
  MapPin,
  Luggage,
  Snowflake,
  Mountain,
  Award,
  Zap,
  Heart,
  Eye
} from "lucide-react";

export function PrivateTransportationPage() {
  const transportationServices = [
    {
      icon: <Car className="w-8 h-8" />,
      title: "Airport Transfers",
      description: "Seamless transfers from major airports to ski resorts",
      details: [
        "Geneva Airport to Chamonix",
        "Lyon Airport to Val d'Isère",
        "Zurich Airport to French resorts",
        "Private jet terminal access"
      ]
    },
    {
      icon: <Route className="w-8 h-8" />,
      title: "Inter-Resort Transport",
      description: "Travel between different ski resorts with ease",
      details: [
        "Multi-resort ski passes",
        "Flexible daily schedules",
        "Equipment transport included",
        "Local area expertise"
      ]
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Group Transportation",
      description: "Comfortable transport for ski groups and families",
      details: [
        "8-16 passenger vehicles",
        "Group equipment storage",
        "Coordinated logistics",
        "Special group rates"
      ]
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Flexible Scheduling",
      description: "Adapt to your ski schedule and weather conditions",
      details: [
        "Early morning departures",
        "Late evening returns",
        "Weather delay adjustments",
        "Real-time communication"
      ]
    }
  ];

  const vehicleTypes = [
    {
      name: "Luxury Sedan",
      capacity: "1-3 passengers",
      luggage: "3-4 ski sets",
      price: "From €120/hour",
      features: [
        "Mercedes S-Class or BMW 7 Series",
        "Heated leather seats",
        "Climate control",
        "Premium sound system"
      ],
      image: "assets/Nouveau site internet/PICTURES OF FLEET/classe E.png",
      popular: false
    },
    {
      name: "Premium SUV",
      capacity: "1-6 passengers",
      luggage: "6-8 ski sets",
      price: "From €180/hour",
      features: [
        "Mercedes GLS or BMW X7",
        "All-wheel drive",
        "Panoramic sunroof",
        "Advanced safety systems"
      ],
      image: "assets/Nouveau site internet/notre flotte.jpeg",
      popular: true
    },
    {
      name: "Luxury Van",
      capacity: "6-8 passengers",
      luggage: "8-12 ski sets",
      price: "From €250/hour",
      features: [
        "Mercedes V-Class or Sprinter",
        "Individual captain chairs",
        "Entertainment system",
        "Refreshment center"
      ],
      image: "assets/Nouveau site internet/PICTURES OF FLEET/mercedes classe V .jpg",
      popular: false
    }
  ];

  const winterFeatures = [
    {
      category: "Winter Equipment",
      icon: <Snowflake className="w-6 h-6" />,
      features: [
        "Winter tires (mandatory)",
        "Snow chains available",
        "Ice scrapers and brushes",
        "Emergency winter kit",
        "Heated mirrors and seats",
        "Defrosting systems"
      ]
    },
    {
      category: "Safety Systems",
      icon: <Shield className="w-6 h-6" />,
      features: [
        "All-wheel drive vehicles",
        "Electronic stability control",
        "Anti-lock braking system",
        "Traction control",
        "Emergency communication",
        "GPS tracking system"
      ]
    },
    {
      category: "Comfort Features",
      icon: <Heart className="w-6 h-6" />,
      features: [
        "Climate-controlled cabin",
        "Heated leather seats",
        "Premium entertainment",
        "WiFi connectivity",
        "Refreshment service",
        "Privacy partitions"
      ]
    },
    {
      category: "Professional Service",
      icon: <Award className="w-6 h-6" />,
      features: [
        "Alpine-trained drivers",
        "Local area knowledge",
        "Multilingual service",
        "Equipment assistance",
        "Flexible scheduling",
        "24/7 support hotline"
      ]
    }
  ];

  const popularRoutes = [
    {
      from: "Geneva Airport",
      to: "Chamonix",
      duration: "1h 15min",
      distance: "88 km",
      price: "From €180",
      highlights: ["Scenic Alpine route", "Mont Blanc views", "Historic resort town"]
    },
    {
      from: "Lyon Airport",
      to: "Val d'Isère",
      duration: "2h 30min",
      distance: "220 km",
      price: "From €320",
      highlights: ["Tarentaise Valley", "High-altitude resort", "Luxury amenities"]
    },
    {
      from: "Paris",
      to: "Courchevel",
      duration: "6h 30min",
      distance: "650 km",
      price: "From €850",
      highlights: ["Three Valleys access", "Michelin dining", "Exclusive resort"]
    },
    {
      from: "Zurich Airport",
      to: "Chamonix",
      duration: "3h 45min",
      distance: "320 km",
      price: "From €480",
      highlights: ["Cross-border service", "Swiss-French Alps", "Glacier access"]
    }
  ];

  const clientTypes = [
    {
      title: "Ski Enthusiasts",
      description: "Passionate skiers seeking reliable mountain transport",
      icon: <Mountain className="w-6 h-6" />
    },
    {
      title: "Luxury Travelers",
      description: "Discerning clients expecting premium service",
      icon: <Star className="w-6 h-6" />
    },
    {
      title: "Corporate Groups",
      description: "Business teams on Alpine retreats and events",
      icon: <Users className="w-6 h-6" />
    },
    {
      title: "Families",
      description: "Multi-generational ski holidays with special needs",
      icon: <Heart className="w-6 h-6" />
    }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src={getAssetPath("Nouveau site internet/EXCURSION .jpeg")}
            alt="Private ski resort transportation"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-white/30">
              Private Transportation
            </Badge>
            <h1 className="text-5xl md:text-6xl mb-6">
              Luxury Ski Resort Transfers
            </h1>
            <p className="text-xl mb-8 text-gray-200">
              Experience premium private transportation to French ski resorts. Professional drivers, 
              luxury vehicles, and personalized service for the perfect Alpine journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                <CarTaxiFront className="w-4 h-4 mr-2" />
                Book Private Transfer
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                View Fleet Options
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Transportation Services */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-6">Comprehensive Private Transportation</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our private transportation services cover every aspect of your ski resort journey, 
              from airport transfers to inter-resort travel.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {transportationServices.map((service, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="bg-primary/10 rounded-full p-4 w-fit mx-auto mb-4 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-xl mb-3 text-center">{service.title}</h3>
                  <p className="text-muted-foreground mb-4 text-center">{service.description}</p>
                  
                  <div className="space-y-2">
                    {service.details.map((detail, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-sm">{detail}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Vehicle Fleet */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-6">Premium Vehicle Fleet</h2>
            <p className="text-xl text-muted-foreground">
              Choose from our selection of luxury vehicles, all equipped for Alpine conditions
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {vehicleTypes.map((vehicle, index) => (
              <Card key={index} className={`group hover:shadow-xl transition-all duration-300 overflow-hidden ${
                vehicle.popular ? 'border-primary shadow-lg scale-105' : ''
              }`}>
                <div className="aspect-video overflow-hidden">
                  <ImageWithFallback
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    {vehicle.popular && (
                      <Badge className="mb-4">Most Popular</Badge>
                    )}
                    <h3 className="text-2xl mb-2">{vehicle.name}</h3>
                    <div className="text-3xl font-bold text-primary mb-2">{vehicle.price}</div>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div className="flex items-center justify-center space-x-2">
                        <Users className="w-4 h-4" />
                        <span>{vehicle.capacity}</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2">
                        <Luggage className="w-4 h-4" />
                        <span>{vehicle.luggage}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 mb-8">
                    {vehicle.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-3">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button className={`w-full ${
                    vehicle.popular ? 'bg-primary hover:bg-primary/90' : ''
                  }`} variant={vehicle.popular ? 'default' : 'outline'}>
                    Select {vehicle.name}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Routes */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-6">Popular Ski Resort Routes</h2>
            <p className="text-xl text-muted-foreground">
              Our most requested private transportation routes to French ski resorts
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {popularRoutes.map((route, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span className="font-semibold">{route.from}</span>
                        <span className="text-muted-foreground">→</span>
                        <span className="font-semibold">{route.to}</span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{route.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Route className="w-3 h-3" />
                          <span>{route.distance}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">{route.price}</div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-6">
                    <h4 className="font-semibold text-sm">Route Highlights:</h4>
                    {route.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <Star className="w-3 h-3 text-primary flex-shrink-0" />
                        <span className="text-sm">{highlight}</span>
                      </div>
                    ))}
                  </div>

                  <Button className="w-full">
                    Book This Route
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Winter Features */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-6">Winter-Ready Features</h2>
            <p className="text-xl text-muted-foreground">
              Every vehicle in our fleet is specially equipped for safe Alpine travel
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {winterFeatures.map((category, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-primary/10 p-2 rounded-lg text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      {category.icon}
                    </div>
                    <h3 className="text-lg font-semibold">{category.category}</h3>
                  </div>
                  
                  <div className="space-y-2">
                    {category.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <CheckCircle className="w-3 h-3 text-primary flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Client Types */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-6">Who We Serve</h2>
            <p className="text-xl text-muted-foreground">
              Our private transportation services cater to diverse clientele
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {clientTypes.map((client, index) => (
              <Card key={index} className="text-center group hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="bg-primary/10 rounded-full p-4 w-fit mx-auto mb-4 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    {client.icon}
                  </div>
                  <h3 className="text-lg mb-3">{client.title}</h3>
                  <p className="text-sm text-muted-foreground">{client.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Service Process */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge variant="outline" className="mb-4">Service Excellence</Badge>
              <h2 className="text-4xl mb-6">Seamless Private Transportation</h2>
              <p className="text-lg text-muted-foreground mb-8">
                From booking to arrival, our private transportation service is designed 
                for maximum comfort, safety, and convenience. Every detail is handled 
                with professional care.
              </p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-2 rounded-lg text-primary">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="mb-2">Easy Booking</h4>
                    <p className="text-sm text-muted-foreground">
                      Simple online booking with instant confirmation and flexible scheduling.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-2 rounded-lg text-primary">
                    <Eye className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="mb-2">Real-Time Tracking</h4>
                    <p className="text-sm text-muted-foreground">
                      Live tracking and communication throughout your journey.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-2 rounded-lg text-primary">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="mb-2">Premium Experience</h4>
                    <p className="text-sm text-muted-foreground">
                      Luxury vehicles, professional drivers, and personalized service.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button size="lg">
                  Book Private Transfer
                </Button>
                <Button size="lg" variant="outline">
                  <Phone className="w-4 h-4 mr-2" />
                  Call for Quote
                </Button>
              </div>
            </div>

            <div className="space-y-6">
              <Card className="bg-primary text-white">
                <CardContent className="p-6 text-center">
                  <CarTaxiFront className="w-12 h-12 mx-auto mb-4" />
                  <h3 className="text-xl mb-3">24/7 Private Service</h3>
                  <p className="opacity-90 mb-4">
                    Our private transportation service operates around the clock 
                    to accommodate your ski schedule and travel needs.
                  </p>
                  <Button variant="secondary" size="sm">
                    Learn More
                  </Button>
                </CardContent>
              </Card>

              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <Clock className="w-8 h-8 mx-auto mb-2 text-primary" />
                    <div className="text-lg font-bold">24/7</div>
                    <div className="text-xs text-muted-foreground">Available</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Shield className="w-8 h-8 mx-auto mb-2 text-primary" />
                    <div className="text-lg font-bold">100%</div>
                    <div className="text-xs text-muted-foreground">Insured</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl mb-6">Ready for Premium Ski Transportation?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Experience the ultimate in private ski resort transportation. Book your 
            luxury transfer today and travel in comfort and style.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              <Calendar className="w-4 h-4 mr-2" />
              Book Private Transfer
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
              <Phone className="w-4 h-4 mr-2" />
              Private Line: +33 1 42 60 30 30
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}