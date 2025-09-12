import { getAssetPath } from "../../utils/assetPath";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { 
  Route, 
  MapPin, 
  Clock, 
  Car, 
  Shield,
  Star,
  CheckCircle,
  ArrowRight,
  Calendar,
  Phone,
  Coffee,
  Navigation,
  Users,
  Award,
  Mountain,
  Castle,
  Briefcase,
  Camera,
  PartyPopper
} from "lucide-react";

export function LongDistancePage() {
  const popularDestinations = [
    {
      name: "French Riviera",
      cities: ["Nice", "Cannes", "Monaco", "Saint-Tropez"],
      distance: "930 km",
      duration: "8-9 hours",
      highlights: ["Mediterranean coast", "Luxury resorts", "Film festivals", "Casinos"],
      price: "From €1,200",
      icon: Star
    },
    {
      name: "Loire Valley",
      cities: ["Tours", "Amboise", "Blois", "Chambord"],
      distance: "240 km",
      duration: "2.5-3 hours",
      highlights: ["Historic châteaux", "Wine regions", "UNESCO sites", "Gardens"],
      price: "From €1220",
      icon: Castle
    },
    {
      name: "Normandy",
      cities: ["Rouen", "Caen", "Bayeux", "Mont-Saint-Michel"],
      distance: "280 km",
      duration: "3-4 hours",
      highlights: ["D-Day beaches", "Medieval architecture", "Calvados", "Coastal beauty"],
      price: "From €1730",
      icon: Shield
    },
    {
      name: "Champagne Region",
      cities: ["Reims", "Épernay", "Troyes", "Châlons"],
      distance: "160 km",
      duration: "1.5-2 hours",
      highlights: ["Champagne houses", "Cathedral", "Vineyards", "Tastings"],
      price: "From €980",
      icon: Star
    },
    {
      name: "Burgundy",
      cities: ["Dijon", "Beaune", "Mâcon", "Auxerre"],
      distance: "320 km",
      duration: "3.5-4 hours",
      highlights: ["Wine country", "Medieval towns", "Gastronomy", "Vineyards"],
      price: "From €450",
      icon: Award
    },
    {
      name: "Swiss Alps",
      cities: ["Geneva", "Chamonix", "Annecy", "Megève"],
      distance: "540 km",
      duration: "5-6 hours",
      highlights: ["Mountain scenery", "Ski resorts", "Alpine lakes", "Luxury hotels"],
      price: "From €750",
      icon: Mountain
    }
  ];

  const serviceFeatures = [
    {
      icon: Car,
      title: "Premium Vehicles",
      description: "Luxury long-distance vehicles with enhanced comfort features for extended journeys.",
      color: "text-blue-600 bg-blue-100"
    },
    {
      icon: Users,
      title: "Professional Drivers",
      description: "Experienced chauffeurs trained for long-distance travel with local destination knowledge.",
      color: "text-green-600 bg-green-100"
    },
    {
      icon: Coffee,
      title: "Comfort Stops",
      description: "Planned rest stops at premium locations for refreshments and comfort breaks.",
      color: "text-orange-600 bg-orange-100"
    },
    {
      icon: Navigation,
      title: "Route Optimization",
      description: "Scenic routes and efficient highways chosen based on your preferences and schedule.",
      color: "text-purple-600 bg-purple-100"
    }
  ];

  const journeyTypes = [
    {
      title: "Business Travel",
      description: "Professional long-distance transfers for business meetings and corporate events",
      features: [
        "Wi-Fi connectivity throughout journey",
        "Mobile office setup with charging stations",
        "Quiet environment for calls and work",
        "Flexible scheduling for business needs",
        "Professional presentation upon arrival",
        "Expense reporting and invoicing"
      ],
      icon: Briefcase,
      color: "bg-blue-50 border-blue-200"
    },
    {
      title: "Leisure & Tourism",
      description: "Comfortable sightseeing transfers to explore France's beautiful regions",
      features: [
        "Scenic route recommendations",
        "Local knowledge and commentary",
        "Photo stop opportunities",
        "Flexible itinerary adjustments",
        "Luggage assistance at destinations",
        "Restaurant and hotel recommendations"
      ],
      icon: Camera,
      color: "bg-green-50 border-green-200"
    },
    {
      title: "Special Events",
      description: "Luxury transfers for weddings, celebrations, and important occasions",
      features: [
        "Decorated vehicles for special occasions",
        "Champagne service (where appropriate)",
        "Red carpet treatment",
        "Coordination with event planners",
        "Multiple vehicle coordination",
        "VIP arrival arrangements"
      ],
      icon: PartyPopper,
      color: "bg-purple-50 border-purple-200"
    },
    {
      title: "Multi-Day Tours",
      description: "Extended journeys with overnight stays and comprehensive itineraries",
      features: [
        "Multi-day itinerary planning",
        "Hotel coordination and bookings",
        "Daily schedule management",
        "Local guide arrangements",
        "Comprehensive travel packages",
        "24/7 support throughout journey"
      ],
      icon: Calendar,
      color: "bg-orange-50 border-orange-200"
    }
  ];

  const includedServices = [
    "Professional chauffeur for entire journey",
    "Premium fuel and toll charges included",
    "Comprehensive insurance coverage",
    "Real-time journey tracking and updates",
    "Complimentary refreshments and water",
    "Climate-controlled comfort throughout",
    "Luggage handling and assistance",
    "24/7 customer support during travel"
  ];

  const whyChooseLongDistance = [
    {
      title: "Comfort & Convenience",
      description: "Travel in luxury without the stress of driving, parking, or navigation.",
      icon: Star
    },
    {
      title: "Time Efficiency",
      description: "Direct routes and professional drivers ensure optimal travel times.",
      icon: Clock
    },
    {
      title: "Local Expertise",
      description: "Drivers with extensive knowledge of destinations and hidden gems.",
      icon: Award
    },
    {
      title: "Flexible Scheduling",
      description: "Depart when you want, stop where you choose, travel at your pace.",
      icon: Calendar
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={getAssetPath("Nouveau site internet/pictures Our french regions/chateau de la loire.jpg")} 
            alt="French Regions - Loire Valley" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-indigo-600/80" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200">
              <Route className="w-4 h-4 mr-2" />
              Long Distance Transfers
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Explore France in Luxury
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Discover the beauty of France with our premium long-distance transfer service. 
              From the French Riviera to the Loire Valley, travel in comfort and style to any destination.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Calendar className="w-4 h-4 mr-2" />
                Plan Your Journey
              </Button>
              <Button variant="outline" className="border-blue-200 hover:bg-blue-50">
                <Phone className="w-4 h-4 mr-2" />
                Call +33 1 42 60 30 30
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-green-100 text-green-800">
              <MapPin className="w-4 h-4 mr-2" />
              Popular Destinations
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Where Will You Go?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore France's most beautiful regions with our comfortable long-distance transfer service.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularDestinations.map((destination, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <destination.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600">{destination.price}</div>
                      <div className="text-xs text-muted-foreground">{destination.duration}</div>
                    </div>
                  </div>
                  <CardTitle className="text-xl">{destination.name}</CardTitle>
                  <CardDescription>
                    <div className="flex items-center space-x-2 text-sm">
                      <Route className="w-4 h-4" />
                      <span>{destination.distance}</span>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-2">Main Cities:</p>
                      <div className="flex flex-wrap gap-1">
                        {destination.cities.map((city, cityIndex) => (
                          <Badge key={cityIndex} variant="secondary" className="text-xs">
                            {city}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-2">Highlights:</p>
                      <ul className="space-y-1">
                        {destination.highlights.slice(0, 2).map((highlight, highlightIndex) => (
                          <li key={highlightIndex} className="flex items-center space-x-2">
                            <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                            <span className="text-xs text-muted-foreground">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
                    Book This Journey
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Service Features */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-purple-100 text-purple-800">
              <Star className="w-4 h-4 mr-2" />
              Service Features
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Long-Distance Excellence</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our long-distance service is designed for comfort, safety, and enjoyment throughout your journey.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {serviceFeatures.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <div className={`w-16 h-16 ${feature.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <feature.icon className="w-8 h-8" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Types */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-blue-100 text-blue-800">
              <Car className="w-4 h-4 mr-2" />
              Journey Types
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Tailored to Your Needs</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Whether for business, leisure, or special occasions, we customize our service to match your requirements.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {journeyTypes.map((journey, index) => (
              <Card key={index} className={`hover:shadow-lg transition-all duration-300 border-2 ${journey.color}`}>
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center">
                      <journey.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{journey.title}</CardTitle>
                      <CardDescription className="text-base">{journey.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {journey.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-3">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Included Services */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-white/20 text-white hover:bg-white/30">
              <Shield className="w-4 h-4 mr-2" />
              What's Included
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Complete Service Package</h2>
            <p className="text-blue-100 max-w-2xl mx-auto">
              Our long-distance transfers include everything you need for a comfortable and worry-free journey.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {includedServices.map((service, index) => (
              <div key={index} className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                <p className="text-blue-100 text-sm">{service}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Long Distance */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-green-100 text-green-800">
              <Award className="w-4 h-4 mr-2" />
              Why Choose Us
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">The Smart Way to Travel</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover why discerning travelers choose our long-distance service over other transportation options.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseLongDistance.map((reason, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <reason.icon className="w-8 h-8 text-green-600" />
                  </div>
                  <CardTitle className="text-xl">{reason.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{reason.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Explore France?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Let us take you on an unforgettable journey through France's most beautiful regions. 
              Contact us to plan your perfect long-distance transfer.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3">
                <Route className="w-5 h-5 mr-2" />
                Plan Your Journey
              </Button>
              <Button variant="outline" className="border-blue-200 hover:bg-blue-50 text-lg px-8 py-3">
                <Phone className="w-5 h-5 mr-2" />
                Call +33 1 42 60 30 30
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Custom itineraries | Professional drivers | All-inclusive pricing
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}