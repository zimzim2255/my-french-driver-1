import { getAssetPath } from "../../utils/assetPath";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { 
  Heart, 
  Camera, 
  Crown, 
  Car, 
  Star,
  CheckCircle,
  ArrowRight,
  Calendar,
  Phone,
  Users,
  Award,
  Sparkles,
  Gift,
  MapPin,
  Clock
} from "lucide-react";

export function MarriagePage() {
  const weddingPackages = [
    {
      title: "Romantic Couple Package",
      description: "Intimate transportation for the bride and groom",
      features: [
        "Luxury decorated vehicle",
        "Champagne service",
        "Rose petals and ribbons",
        "Professional photography stops",
        "Red carpet service",
        "Complimentary wedding music"
      ],
      price: "From €250",
      duration: "Half day",
      icon: Heart,
      popular: true
    },
    {
      title: "Bridal Party Package",
      description: "Elegant transportation for the entire bridal party",
      features: [
        "Multiple luxury vehicles",
        "Coordinated arrival times",
        "Bridal party decorations",
        "Group photo opportunities",
        "Refreshments included",
        "Professional coordination"
      ],
      price: "From €450",
      duration: "Full day",
      icon: Users,
      premium: true
    },
    {
      title: "Family & Guests Package",
      description: "Comfortable transportation for wedding guests",
      features: [
        "Fleet of premium vehicles",
        "Guest pickup coordination",
        "Venue-to-venue transfers",
        "Flexible scheduling",
        "Professional drivers",
        "Group management"
      ],
      price: "From €350",
      duration: "Full day",
      icon: Car,
      group: true
    },
    {
      title: "VIP Wedding Experience",
      description: "Ultimate luxury wedding transportation",
      features: [
        "Ultra-luxury vehicle fleet",
        "Personal wedding coordinator",
        "Champagne and catering",
        "Professional photographer",
        "Red carpet treatment",
        "Complete wedding day management"
      ],
      price: "From €800",
      duration: "Full day",
      icon: Crown,
      vip: true
    }
  ];

  const weddingServices = [
    {
      title: "Venue Transfers",
      description: "Seamless transportation between ceremony and reception venues",
      icon: MapPin,
      features: ["Church to reception", "Photo location stops", "Timing coordination", "Route planning"]
    },
    {
      title: "Guest Transportation",
      description: "Comfortable group transportation for wedding guests",
      icon: Users,
      features: ["Hotel pickups", "Group coordination", "Return transfers", "Flexible scheduling"]
    },
    {
      title: "Photography Tours",
      description: "Romantic photo shoots at Paris's most beautiful locations",
      icon: Camera,
      features: ["Iconic Paris locations", "Golden hour timing", "Professional coordination", "Equipment transport"]
    },
    {
      title: "Honeymoon Transfers",
      description: "Romantic start to your honeymoon journey",
      icon: Heart,
      features: ["Airport transfers", "Hotel coordination", "Romantic decorations", "Privacy assured"]
    }
  ];

  const romanticLocations = [
    {
      name: "Eiffel Tower",
      description: "Iconic backdrop for unforgettable wedding photos",
      bestTime: "Golden hour",
      features: ["Trocadéro viewpoint", "Seine riverbank", "Champ de Mars gardens"]
    },
    {
      name: "Louvre Palace",
      description: "Majestic architecture for elegant wedding portraits",
      bestTime: "Morning light",
      features: ["Glass pyramid", "Courtyard settings", "Classical architecture"]
    },
    {
      name: "Notre-Dame Area",
      description: "Historic charm and romantic Seine views",
      bestTime: "Afternoon",
      features: ["Cathedral exterior", "Seine bridges", "Île de la Cité"]
    },
    {
      name: "Montmartre",
      description: "Bohemian romance with panoramic city views",
      bestTime: "Sunset",
      features: ["Sacré-Cœur", "Cobblestone streets", "Artist squares"]
    },
    {
      name: "Luxembourg Gardens",
      description: "Beautiful gardens perfect for romantic strolls",
      bestTime: "Any time",
      features: ["Palace backdrop", "Formal gardens", "Fountain settings"]
    },
    {
      name: "Pont Alexandre III",
      description: "Paris's most ornate bridge with golden details",
      bestTime: "Golden hour",
      features: ["Ornate decorations", "Seine views", "Art Nouveau style"]
    }
  ];

  const weddingBenefits = [
    "Stress-free transportation coordination",
    "Professional wedding day timeline management",
    "Luxury vehicles with wedding decorations",
    "Experienced drivers familiar with wedding protocols",
    "Flexible scheduling for photo opportunities",
    "Coordination with wedding planners and photographers",
    "Backup vehicles and contingency planning",
    "Complimentary champagne and refreshments"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-100">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={getAssetPath("Nouveau site internet/chateau vaux le vicompte.jpeg")} 
            alt="Wedding Transportation Paris" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-pink-600/85 to-red-600/85" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-4 bg-black/60 text-white border-white/50 font-semibold">
              <Heart className="w-4 h-4 mr-2" />
              Wedding Transportation
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg">
              Your Perfect Wedding Day
            </h1>
            <p className="text-xl text-white font-medium drop-shadow-md mb-8 leading-relaxed">
              Make your special day even more magical with our luxury wedding transportation services. 
              From intimate ceremonies to grand celebrations, we ensure every moment is perfect.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-pink-600 hover:bg-pink-700">
                <Calendar className="w-4 h-4 mr-2" />
                Plan Wedding Transport
              </Button>
              <Button variant="outline" className="border-pink-200 hover:bg-pink-50">
                <Phone className="w-4 h-4 mr-2" />
                Call +33 1 42 60 30 30
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Wedding Packages */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-rose-100 text-rose-800">
              <Crown className="w-4 h-4 mr-2" />
              Wedding Packages
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Tailored for Your Special Day</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose from our carefully crafted wedding transportation packages, each designed to make your day unforgettable.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {weddingPackages.map((package_, index) => (
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
                      <div className="w-12 h-12 bg-gradient-to-r from-pink-100 to-rose-100 rounded-lg flex items-center justify-center">
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
                    Choose This Package
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Wedding Services */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-purple-100 text-purple-800">
              <Sparkles className="w-4 h-4 mr-2" />
              Wedding Services
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Complete Wedding Transportation</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From ceremony to reception, we provide comprehensive transportation services for every aspect of your wedding day.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {weddingServices.map((service, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-r from-pink-100 to-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <service.icon className="w-8 h-8 text-pink-600" />
                  </div>
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                  <CardDescription className="text-sm">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1">
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

      {/* Romantic Locations */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-blue-100 text-blue-800">
              <Camera className="w-4 h-4 mr-2" />
              Romantic Locations
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Paris's Most Romantic Spots</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We'll take you to the most beautiful and romantic locations in Paris for unforgettable wedding photos.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {romanticLocations.map((location, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center justify-between mb-3">
                    <CardTitle className="text-lg text-pink-600">{location.name}</CardTitle>
                    <Badge variant="secondary" className="text-xs">
                      <Clock className="w-3 h-3 mr-1" />
                      {location.bestTime}
                    </Badge>
                  </div>
                  <CardDescription className="text-sm">{location.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {location.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-2">
                        <Star className="w-3 h-3 text-yellow-500 flex-shrink-0" />
                        <span className="text-xs text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Wedding Benefits */}
      <section className="py-16 bg-gradient-to-r from-pink-600 to-red-600 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-white/20 text-white hover:bg-white/30">
              <Award className="w-4 h-4 mr-2" />
              Wedding Benefits
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Our Wedding Service</h2>
            <p className="text-pink-100 max-w-2xl mx-auto">
              Our wedding transportation service is designed to make your special day stress-free and magical.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {weddingBenefits.map((benefit, index) => (
              <div key={index} className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-pink-300 flex-shrink-0 mt-0.5" />
                <p className="text-pink-100 text-sm">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Planning Process */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-green-100 text-green-800">
              <Gift className="w-4 h-4 mr-2" />
              Planning Process
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How We Plan Your Perfect Day</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our experienced team works with you to create a seamless transportation plan for your wedding day.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-pink-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Initial Consultation</h3>
              <p className="text-muted-foreground text-sm">
                Discuss your wedding day timeline, venues, and transportation needs.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-rose-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Custom Planning</h3>
              <p className="text-muted-foreground text-sm">
                Create a detailed transportation plan tailored to your specific requirements.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-red-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Final Coordination</h3>
              <p className="text-muted-foreground text-sm">
                Confirm all details and coordinate with your wedding planner and venues.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-purple-600">4</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Perfect Execution</h3>
              <p className="text-muted-foreground text-sm">
                Flawless execution of your transportation plan on your special day.
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
              Ready to Plan Your Dream Wedding Transportation?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Let us make your wedding day transportation as perfect as your love story. 
              Contact us to start planning your magical day.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-pink-600 hover:bg-pink-700 text-lg px-8 py-3">
                <Heart className="w-5 h-5 mr-2" />
                Plan Wedding Transport
              </Button>
              <Button variant="outline" className="border-pink-200 hover:bg-pink-50 text-lg px-8 py-3">
                <Phone className="w-5 h-5 mr-2" />
                Call +33 1 42 60 30 30
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Luxury vehicles | Professional coordination | Unforgettable memories
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}