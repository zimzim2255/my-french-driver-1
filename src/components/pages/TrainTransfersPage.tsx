import { getAssetPath } from "../../utils/assetPath";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { 
  Train, 
  MapPin, 
  Clock, 
  Users, 
  Shield,
  Star,
  CheckCircle,
  ArrowRight,
  Calendar,
  Phone,
  Luggage,
  Navigation,
  Zap,
  Award,
  Car
} from "lucide-react";

export function TrainTransfersPage() {
  const trainStations = [
    {
      name: "Gare du Nord",
      description: "Eurostar, Thalys, and international connections",
      services: ["Eurostar to London", "Thalys to Brussels/Amsterdam", "Regional trains"],
      travelTime: "15-45 min from city center",
      icon: Train
    },
    {
      name: "Gare de Lyon",
      description: "TGV to Southern France and international destinations",
      services: ["TGV to Lyon/Marseille", "International to Switzerland/Italy", "Regional services"],
      travelTime: "20-40 min from city center",
      icon: Train
    },
    {
      name: "Gare de l'Est",
      description: "Eastern France and Germany connections",
      services: ["TGV to Eastern France", "International to Germany", "Regional networks"],
      travelTime: "25-45 min from city center",
      icon: Train
    },
    {
      name: "Gare Montparnasse",
      description: "TGV to Western and Southwestern France",
      services: ["TGV to Bordeaux/Nantes", "Regional to Brittany", "Suburban services"],
      travelTime: "20-35 min from city center",
      icon: Train
    },
    {
      name: "Gare Saint-Lazare",
      description: "Normandy and suburban connections",
      services: ["Regional to Normandy", "Suburban RER", "Intercity services"],
      travelTime: "15-30 min from city center",
      icon: Train
    },
    {
      name: "Gare d'Austerlitz",
      description: "Southern and southwestern regional services",
      services: ["Night trains", "Regional services", "Suburban connections"],
      travelTime: "25-40 min from city center",
      icon: Train
    }
  ];

  const serviceFeatures = [
    {
      icon: Clock,
      title: "Punctual Service",
      description: "We monitor train schedules and adjust pickup times for delays or early arrivals.",
      color: "text-blue-600 bg-blue-100"
    },
    {
      icon: Luggage,
      title: "Luggage Assistance",
      description: "Professional help with heavy bags and multiple pieces of luggage.",
      color: "text-green-600 bg-green-100"
    },
    {
      icon: Navigation,
      title: "Station Navigation",
      description: "Expert knowledge of all Paris train stations and optimal pickup points.",
      color: "text-purple-600 bg-purple-100"
    },
    {
      icon: Shield,
      title: "Meet & Greet",
      description: "Personal meet and greet service with name boards for easy identification.",
      color: "text-orange-600 bg-orange-100"
    }
  ];

  const transferTypes = [
    {
      title: "Hotel to Train Station",
      description: "Comfortable transfer from your accommodation to any Paris train station",
      features: ["Door-to-door service", "Luggage assistance", "Traffic route optimization", "Early morning availability"],
      price: "From €45",
      duration: "15-45 minutes"
    },
    {
      title: "Train Station to Hotel",
      description: "Meet and greet service upon arrival with transfer to your destination",
      features: ["Meet & greet with name board", "Luggage handling", "City orientation", "Multiple stops possible"],
      price: "From €45",
      duration: "15-45 minutes"
    },
    {
      title: "Station to Station",
      description: "Transfers between different Paris train stations for connections",
      features: ["Quick connections", "Luggage transfer", "Schedule coordination", "Express service"],
      price: "From €35",
      duration: "20-60 minutes"
    },
    {
      title: "Train Station to Airport",
      description: "Seamless connection from train arrival to airport departure",
      features: ["Flight monitoring", "Express routes", "Terminal selection", "Timing coordination"],
      price: "From €65",
      duration: "45-90 minutes"
    }
  ];

  const benefits = [
    "No need to navigate complex public transport with luggage",
    "Direct door-to-door service saving time and effort",
    "Professional drivers familiar with all train stations",
    "Real-time train schedule monitoring and adjustments",
    "Comfortable climate-controlled vehicles",
    "Assistance with heavy luggage and multiple bags"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={getAssetPath("Nouveau site internet/1668738-diaporama.jpeg")} 
            alt="Train Station Transfer" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-indigo-600/80" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200">
              <Train className="w-4 h-4 mr-2" />
              Train Station Transfers
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Seamless Train Connections
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Professional transfers to and from all major Paris train stations. Skip the hassle of public transport 
              and enjoy comfortable, direct service with luggage assistance.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Calendar className="w-4 h-4 mr-2" />
                Book Transfer
              </Button>
              <Button variant="outline" className="border-blue-200 hover:bg-blue-50">
                <Phone className="w-4 h-4 mr-2" />
                Call +33 1 42 60 30 30
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Train Stations */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-green-100 text-green-800">
              <MapPin className="w-4 h-4 mr-2" />
              Paris Train Stations
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">All Major Stations Covered</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We provide transfers to and from all major Paris train stations, ensuring you never miss a connection.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trainStations.map((station, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <station.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{station.name}</CardTitle>
                      <CardDescription className="text-sm">{station.travelTime}</CardDescription>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm">{station.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {station.services.map((service, serviceIndex) => (
                      <div key={serviceIndex} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{service}</span>
                      </div>
                    ))}
                  </div>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Our Train Transfers</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Professional service designed to make your train travel experience smooth and stress-free.
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

      {/* Transfer Types */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-blue-100 text-blue-800">
              <Car className="w-4 h-4 mr-2" />
              Transfer Options
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Flexible Transfer Solutions</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose from our range of transfer options to suit your specific travel needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {transferTypes.map((transfer, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <CardTitle className="text-xl text-blue-600">{transfer.title}</CardTitle>
                      <CardDescription className="text-base mt-2">{transfer.description}</CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">{transfer.price}</div>
                      <div className="text-sm text-muted-foreground">{transfer.duration}</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {transfer.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-3">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-muted-foreground text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700">
                    Book This Transfer
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
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
              <Award className="w-4 h-4 mr-2" />
              Benefits
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Skip Public Transport</h2>
            <p className="text-blue-100 max-w-2xl mx-auto">
              Enjoy the comfort and convenience of private transfers instead of navigating busy public transport with luggage.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                <p className="text-blue-100">{benefit}</p>
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
              <Zap className="w-4 h-4 mr-2" />
              Easy Booking
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple 3-Step Process</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Book your train station transfer in just a few clicks or with a quick phone call.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Choose Your Transfer</h3>
              <p className="text-muted-foreground">
                Select your pickup and drop-off locations, date, and time. Specify any special requirements.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Confirm Details</h3>
              <p className="text-muted-foreground">
                Provide your train details, contact information, and any special requests for the journey.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Enjoy Your Transfer</h3>
              <p className="text-muted-foreground">
                Meet your professional driver and enjoy a comfortable, stress-free journey to your destination.
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
              Ready to Book Your Train Transfer?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Skip the hassle of public transport and enjoy professional, comfortable transfers to any Paris train station.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3">
                <Calendar className="w-5 h-5 mr-2" />
                Book Online Now
              </Button>
              <Button variant="outline" className="border-blue-200 hover:bg-blue-50 text-lg px-8 py-3">
                <Phone className="w-5 h-5 mr-2" />
                Call +33 1 42 60 30 30
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Available 24/7 | Instant confirmation | Professional service guaranteed
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}