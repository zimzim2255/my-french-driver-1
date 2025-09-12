import { getAssetPath } from "../../utils/assetPath";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { 
  Castle, 
  MapPin, 
  Clock, 
  Users, 
  Star,
  Heart,
  Camera,
  Gift,
  CheckCircle,
  ArrowRight,
  Calendar,
  Phone,
  Car,
  Shield,
  Sparkles,
  Baby,
  PartyPopper,
  Crown,
  Zap
} from "lucide-react";

export function DisneylandTransfersPage() {
  const disneyDestinations = [
    {
      name: "Disneyland Park",
      description: "The original magical kingdom with classic Disney attractions",
      highlights: ["Sleeping Beauty Castle", "Pirates of the Caribbean", "Space Mountain", "Main Street USA"],
      icon: Castle,
      color: "bg-pink-100 text-pink-600"
    },
    {
      name: "Walt Disney Studios",
      description: "Movie magic and behind-the-scenes Disney experiences",
      highlights: ["Ratatouille Ride", "Tower of Terror", "Marvel Campus", "Frozen Land"],
      icon: Camera,
      color: "bg-blue-100 text-blue-600"
    },
    {
      name: "Disney Village",
      description: "Shopping, dining, and entertainment district",
      highlights: ["Disney Store", "Restaurants", "Entertainment", "Hotels"],
      icon: Gift,
      color: "bg-green-100 text-green-600"
    },
    {
      name: "Disney Hotels",
      description: "Magical accommodation within the resort",
      highlights: ["Grand Californian", "Disneyland Hotel", "Newport Bay", "Sequoia Lodge"],
      icon: Star,
      color: "bg-purple-100 text-purple-600"
    }
  ];

  const servicePackages = [
    {
      title: "Family Magic Package",
      description: "Perfect for families with children visiting Disneyland Paris",
      features: [
        "Child seats and booster seats included",
        "Disney music playlist during journey",
        "Complimentary Disney stickers for kids",
        "Flexible pickup times for tired children",
        "Photo stops at Disney entrance",
        "Luggage assistance with Disney purchases"
      ],
      price: "From €85",
      duration: "45-60 minutes",
      icon: Baby,
      popular: true
    },
    {
      title: "VIP Disney Experience",
      description: "Luxury transfer with premium amenities for special occasions",
      features: [
        "Premium luxury vehicle",
        "Champagne service (adults only)",
        "Disney-themed decorations",
        "Professional photo service",
        "Priority drop-off location",
        "Concierge assistance"
      ],
      price: "From €150",
      duration: "45-60 minutes",
      icon: Crown,
      premium: true
    },
    {
      title: "Group Disney Adventure",
      description: "Large group transfers for Disney celebrations and events",
      features: [
        "Minibus or coach options",
        "Group entertainment system",
        "Coordinated arrival times",
        "Multiple pickup locations",
        "Disney trivia and games",
        "Group photo opportunities"
      ],
      price: "From €120",
      duration: "45-60 minutes",
      icon: Users,
      group: true
    },
    {
      title: "Express Disney Transfer",
      description: "Quick and efficient transfer for time-conscious visitors",
      features: [
        "Direct route optimization",
        "Fast-track drop-off",
        "Real-time traffic updates",
        "Express booking confirmation",
        "Priority vehicle assignment",
        "Minimal stops"
      ],
      price: "From €65",
      duration: "35-45 minutes",
      icon: Zap,
      express: true
    }
  ];

  const specialServices = [
    {
      title: "Birthday Celebrations",
      description: "Make Disney birthdays extra magical with special decorations and surprises",
      icon: PartyPopper,
      features: ["Birthday decorations", "Special music", "Surprise treats", "Photo opportunities"]
    },
    {
      title: "Anniversary Packages",
      description: "Romantic Disney transfers for couples celebrating special moments",
      icon: Heart,
      features: ["Romantic decorations", "Champagne service", "Rose petals", "Professional photos"]
    },
    {
      title: "First Visit Magic",
      description: "Extra special service for first-time Disney visitors",
      icon: Sparkles,
      features: ["Disney welcome kit", "Park tips and advice", "Photo at entrance", "Magic moments"]
    },
    {
      title: "Multi-Day Packages",
      description: "Convenient transfers for extended Disney stays",
      icon: Calendar,
      features: ["Daily transfers", "Flexible scheduling", "Luggage storage", "Preferred rates"]
    }
  ];

  const whyChooseUs = [
    "Disney-trained drivers with park knowledge",
    "Child-friendly vehicles with safety seats",
    "Flexible timing for Disney schedules",
    "Photo opportunities at Disney entrance",
    "Assistance with Disney purchases and luggage",
    "Knowledge of best routes and parking areas",
    "Special Disney-themed amenities",
    "Experience with Disney crowd management"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-100">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={getAssetPath("Nouveau site internet/disneyland-paris.jpeg")} 
            alt="Disneyland Paris" 
            className="w-full h-full object-cover"
          />
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-600/85 to-purple-600/85" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-4 bg-black/60 text-white border-white/50 font-semibold">
              <Castle className="w-4 h-4 mr-2" />
              Disneyland Transfers
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg">
              Magical Disney Journeys
            </h1>
            <p className="text-xl text-white font-medium drop-shadow-md mb-8 leading-relaxed">
              Start your Disney adventure in style with our premium transfers to Disneyland Paris. 
              Family-friendly service with magical touches to make your journey as special as your destination.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-pink-600 hover:bg-pink-700">
                <Calendar className="w-4 h-4 mr-2" />
                Book Disney Transfer
              </Button>
              <Button variant="outline" className="border-pink-200 hover:bg-pink-50">
                <Phone className="w-4 h-4 mr-2" />
                Call +33 1 42 60 30 30
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Disney Destinations */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-purple-100 text-purple-800">
              <MapPin className="w-4 h-4 mr-2" />
              Disney Destinations
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Where Magic Awaits</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We provide transfers to all areas of Disneyland Paris, ensuring you arrive at the perfect location for your magical day.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {disneyDestinations.map((destination, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <div className={`w-16 h-16 ${destination.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <destination.icon className="w-8 h-8" />
                  </div>
                  <CardTitle className="text-xl text-center">{destination.name}</CardTitle>
                  <CardDescription className="text-center">{destination.description}</CardDescription>
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

      {/* Service Packages */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-blue-100 text-blue-800">
              <Gift className="w-4 h-4 mr-2" />
              Disney Packages
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Magical Transfer Experiences</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose from our specially designed Disney transfer packages, each crafted to enhance your magical experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {servicePackages.map((package_, index) => (
              <Card key={index} className={`hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm relative ${
                package_.popular ? 'ring-2 ring-pink-500' : ''
              }`}>
                {package_.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-pink-500 text-white">
                    Most Popular
                  </Badge>
                )}
                <CardHeader>
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-pink-100 to-purple-100 rounded-lg flex items-center justify-center">
                        <package_.icon className="w-6 h-6 text-pink-600" />
                      </div>
                      <div>
                        <CardTitle className="text-xl text-pink-600">{package_.title}</CardTitle>
                        <CardDescription className="text-base mt-1">{package_.description}</CardDescription>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">{package_.price}</div>
                      <div className="text-sm text-muted-foreground">{package_.duration}</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {package_.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-3">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full bg-pink-600 hover:bg-pink-700">
                    Book This Package
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Special Services */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-yellow-100 text-yellow-800">
              <Sparkles className="w-4 h-4 mr-2" />
              Special Occasions
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Make It Extra Magical</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Celebrating something special? Our themed services add extra magic to your Disney experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {specialServices.map((service, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <service.icon className="w-8 h-8 text-yellow-600" />
                  </div>
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                  <CardDescription className="text-sm">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="text-xs text-muted-foreground">
                        • {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gradient-to-r from-pink-600 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-white/20 text-white hover:bg-white/30">
              <Shield className="w-4 h-4 mr-2" />
              Disney Expertise
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Families Choose Us</h2>
            <p className="text-pink-100 max-w-2xl mx-auto">
              Our Disney transfer service is designed by families, for families, with all the special touches that make the journey magical.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((reason, index) => (
              <div key={index} className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-pink-300 flex-shrink-0 mt-0.5" />
                <p className="text-pink-100 text-sm">{reason}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Details */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-blue-100 text-blue-800">
                <Clock className="w-4 h-4 mr-2" />
                Journey Information
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Your Disney Adventure Starts Here
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-pink-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Distance & Duration</h3>
                    <p className="text-muted-foreground">
                      Approximately 45-60 minutes from central Paris to Disneyland Paris, 
                      depending on traffic and your specific pickup location.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Car className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Vehicle Options</h3>
                    <p className="text-muted-foreground">
                      Family-friendly vehicles with child seats, spacious luggage compartments, 
                      and entertainment systems to keep everyone happy during the journey.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Star className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Special Touches</h3>
                    <p className="text-muted-foreground">
                      Disney music, complimentary snacks for children, and photo opportunities 
                      to capture the excitement before you even enter the park.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-pink-100 to-purple-100 rounded-2xl p-8 h-96 flex items-center justify-center">
                <div className="text-center">
                  <Castle className="w-24 h-24 text-pink-600 mx-auto mb-4" />
                  <p className="text-pink-600 font-semibold text-lg">Disney Magic Awaits</p>
                  <p className="text-sm text-muted-foreground mt-2">Professional Disney transfers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready for Your Disney Adventure?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Book your magical Disney transfer today and start your adventure the moment you step into our vehicle.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-pink-600 hover:bg-pink-700 text-lg px-8 py-3">
                <Castle className="w-5 h-5 mr-2" />
                Book Disney Magic
              </Button>
              <Button variant="outline" className="border-pink-200 hover:bg-pink-50 text-lg px-8 py-3">
                <Phone className="w-5 h-5 mr-2" />
                Call +33 1 42 60 30 30
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Family-friendly service | Child seats included | Disney-trained drivers
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}