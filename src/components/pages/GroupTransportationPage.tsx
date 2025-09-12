import { getAssetPath } from "../../utils/assetPath";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { 
  Users, 
  Car, 
  Calendar, 
  Shield,
  Star,
  CheckCircle,
  ArrowRight,
  Phone,
  Award,
  Navigation,
  Clock,
  MapPin,
  Briefcase,
  PartyPopper,
  GraduationCap,
  Building
} from "lucide-react";

export function GroupTransportationPage() {
  const groupTypes = [
    {
      title: "Corporate Groups",
      description: "Professional transportation for business teams and corporate events",
      capacity: "8-50 passengers",
      features: [
        "Executive vehicles and coaches",
        "Wi-Fi and charging stations",
        "Professional presentation",
        "Flexible scheduling",
        "Meeting coordination",
        "Expense reporting"
      ],
      price: "From €15/person",
      icon: Briefcase,
      color: "bg-blue-100 text-blue-600"
    },
    {
      title: "Event Groups",
      description: "Coordinated transportation for conferences, weddings, and celebrations",
      capacity: "10-100 passengers",
      features: [
        "Event timeline coordination",
        "Multiple pickup locations",
        "VIP treatment options",
        "Decoration services",
        "Photography coordination",
        "Special occasion amenities"
      ],
      price: "From €12/person",
      icon: PartyPopper,
      color: "bg-purple-100 text-purple-600"
    },
    {
      title: "Educational Groups",
      description: "Safe and reliable transportation for schools and educational institutions",
      capacity: "15-55 passengers",
      features: [
        "Safety-certified vehicles",
        "Educational commentary",
        "Student supervision support",
        "Flexible itineraries",
        "Emergency protocols",
        "Teacher coordination"
      ],
      price: "From €8/person",
      icon: GraduationCap,
      color: "bg-green-100 text-green-600"
    },
    {
      title: "Tourist Groups",
      description: "Comfortable sightseeing transportation for tour groups",
      capacity: "12-50 passengers",
      features: [
        "Panoramic viewing vehicles",
        "Multilingual guides",
        "Photo stop coordination",
        "Luggage handling",
        "Cultural commentary",
        "Flexible tour routes"
      ],
      price: "From €10/person",
      icon: Star,
      color: "bg-yellow-100 text-yellow-600"
    }
  ];

  const vehicleOptions = [
    {
      type: "Luxury Minivans",
      capacity: "8 passengers",
      features: ["Premium comfort", "Climate control", "Individual seating", "Luggage space"],
      bestFor: "Small executive groups",
      image: "minivan"
    },
    {
      type: "Executive Coaches",
      capacity: "16-25 passengers",
      features: ["Reclining seats", "Entertainment system", "Refreshment area", "Wi-Fi"],
      bestFor: "Medium corporate groups",
      image: "coach"
    },
    {
      type: "Luxury Coaches",
      capacity: "30-50 passengers",
      features: ["Premium seating", "Panoramic windows", "Onboard facilities", "Professional service"],
      bestFor: "Large tour groups",
      image: "luxury-coach"
    },
    {
      type: "Double-Decker Buses",
      capacity: "50-80 passengers",
      features: ["Panoramic views", "Open-top option", "Audio systems", "Photo opportunities"],
      bestFor: "Sightseeing tours",
      image: "double-decker"
    }
  ];

  const popularDestinations = [
    {
      name: "Versailles Palace",
      description: "Royal palace and gardens tour",
      duration: "Half/Full day",
      groupSize: "Up to 50",
      highlights: ["Palace tour", "Gardens visit", "Marie Antoinette's estate"]
    },
    {
      name: "Loire Valley Châteaux",
      description: "Historic castles and wine regions",
      duration: "Full day",
      groupSize: "Up to 45",
      highlights: ["Chambord Castle", "Chenonceau", "Wine tastings"]
    },
    {
      name: "Normandy D-Day Beaches",
      description: "Historical WWII sites tour",
      duration: "Full day",
      groupSize: "Up to 50",
      highlights: ["Omaha Beach", "American Cemetery", "Pointe du Hoc"]
    },
    {
      name: "Champagne Region",
      description: "Champagne houses and vineyards",
      duration: "Full day",
      groupSize: "Up to 40",
      highlights: ["Reims Cathedral", "Champagne tastings", "Vineyard tours"]
    }
  ];

  const serviceFeatures = [
    {
      icon: Shield,
      title: "Safety First",
      description: "All vehicles meet the highest safety standards with professional, licensed drivers.",
      color: "text-green-600 bg-green-100"
    },
    {
      icon: Navigation,
      title: "Route Planning",
      description: "Optimized routes and schedules to maximize your group's time and experience.",
      color: "text-blue-600 bg-blue-100"
    },
    {
      icon: Users,
      title: "Group Coordination",
      description: "Dedicated coordinators to manage all aspects of your group transportation.",
      color: "text-purple-600 bg-purple-100"
    },
    {
      icon: Clock,
      title: "Flexible Timing",
      description: "Adaptable schedules to accommodate your group's specific needs and preferences.",
      color: "text-orange-600 bg-orange-100"
    }
  ];

  const benefits = [
    "Cost-effective per-person pricing",
    "Professional group coordination",
    "Flexible itinerary planning",
    "Safety-certified vehicles and drivers",
    "Multilingual guide services available",
    "Comprehensive insurance coverage",
    "24/7 support during your trip",
    "Special group amenities and services"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={getAssetPath("Nouveau site internet/chateau vaux le vicompte.jpg")} 
            alt="Group Transportation" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-indigo-600/80" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200">
              <Users className="w-4 h-4 mr-2" />
              Group Transportation
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Move Your Group in Style
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Professional group transportation services for corporate events, educational trips, 
              tours, and special occasions. Safe, comfortable, and coordinated travel for groups of all sizes.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Calendar className="w-4 h-4 mr-2" />
                Plan Group Transport
              </Button>
              <Button variant="outline" className="border-blue-200 hover:bg-blue-50">
                <Phone className="w-4 h-4 mr-2" />
                Call +33 1 42 60 30 30
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Group Types */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-green-100 text-green-800">
              <Car className="w-4 h-4 mr-2" />
              Group Types
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Transportation for Every Group</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Specialized transportation solutions tailored to different group types and requirements.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {groupTypes.map((group, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 ${group.color} rounded-lg flex items-center justify-center`}>
                        <group.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{group.title}</CardTitle>
                        <CardDescription className="text-sm">{group.capacity}</CardDescription>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600">{group.price}</div>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm">{group.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {group.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-3">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-muted-foreground text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Get Group Quote
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Vehicle Options */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-purple-100 text-purple-800">
              <Car className="w-4 h-4 mr-2" />
              Vehicle Fleet
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Perfect Vehicle</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our diverse fleet ensures we have the right vehicle for your group size and travel needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {vehicleOptions.map((vehicle, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Car className="w-8 h-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg">{vehicle.type}</CardTitle>
                  <CardDescription>
                    <Badge variant="secondary" className="text-xs">
                      {vehicle.capacity}
                    </Badge>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-4">
                    {vehicle.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="text-xs text-muted-foreground">
                        • {feature}
                      </li>
                    ))}
                  </ul>
                  <p className="text-sm font-medium text-blue-600">{vehicle.bestFor}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-yellow-100 text-yellow-800">
              <MapPin className="w-4 h-4 mr-2" />
              Popular Destinations
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Where Groups Love to Go</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover the most popular group destinations from Paris, perfect for educational, corporate, or leisure trips.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {popularDestinations.map((destination, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex justify-between items-start mb-3">
                    <CardTitle className="text-xl text-blue-600">{destination.name}</CardTitle>
                    <div className="text-right text-sm text-muted-foreground">
                      <div>{destination.duration}</div>
                      <div>{destination.groupSize}</div>
                    </div>
                  </div>
                  <CardDescription className="text-base">{destination.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {destination.highlights.map((highlight, highlightIndex) => (
                      <li key={highlightIndex} className="flex items-center space-x-2">
                        <Star className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{highlight}</span>
                      </li>
                    ))}
                  </ul>
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
            <Badge className="mb-4 bg-blue-100 text-blue-800">
              <Award className="w-4 h-4 mr-2" />
              Service Features
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Professional Group Management</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our comprehensive group transportation service ensures every detail is handled professionally.
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

      {/* Benefits */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-white/20 text-white hover:bg-white/30">
              <Shield className="w-4 h-4 mr-2" />
              Group Benefits
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Group Transportation</h2>
            <p className="text-blue-100 max-w-2xl mx-auto">
              Discover the advantages of professional group transportation for your next event or trip.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                <p className="text-blue-100 text-sm">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Process */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-green-100 text-green-800">
              <Calendar className="w-4 h-4 mr-2" />
              Easy Planning
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple Group Booking Process</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our streamlined process makes it easy to plan and book transportation for your group.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Tell Us Your Needs</h3>
              <p className="text-muted-foreground text-sm">
                Share your group size, dates, destinations, and special requirements.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Get Custom Quote</h3>
              <p className="text-muted-foreground text-sm">
                Receive a detailed quote with vehicle options and pricing breakdown.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Plan Together</h3>
              <p className="text-muted-foreground text-sm">
                Work with our coordinators to finalize itinerary and logistics.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-orange-600">4</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Enjoy Your Trip</h3>
              <p className="text-muted-foreground text-sm">
                Relax while we handle all transportation logistics for your group.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Move Your Group?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Get a custom quote for your group transportation needs. 
              Professional service, competitive pricing, and seamless coordination guaranteed.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3">
                <Users className="w-5 h-5 mr-2" />
                Get Group Quote
              </Button>
              <Button variant="outline" className="border-blue-200 hover:bg-blue-50 text-lg px-8 py-3">
                <Phone className="w-5 h-5 mr-2" />
                Call +33 1 42 60 30 30
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Professional coordination | Safety certified | Competitive group rates
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}