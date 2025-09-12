import { getAssetPath } from "../../utils/assetPath";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { 
  ArrowRight, 
  MapPin, 
  Clock, 
  Car, 
  Shield,
  Star,
  CheckCircle,
  Calendar,
  Phone,
  Users,
  Award,
  Navigation,
  Briefcase,
  Heart,
  Building,
  Plane,
  Train
} from "lucide-react";

export function OtherTransfersPage() {
  const transferTypes = [
    {
      title: "Hotel to Hotel",
      description: "Comfortable transfers between hotels for multi-city stays",
      features: ["Luggage handling", "Check-in coordination", "Flexible timing", "Multiple stops"],
      price: "From €35",
      icon: Building,
      color: "bg-blue-100 text-blue-600"
    },
    {
      title: "Restaurant Transfers",
      description: "Elegant transportation to fine dining establishments",
      features: ["Reservation coordination", "Wait service", "Return transfers", "Sommelier recommendations"],
      price: "From €25",
      icon: Heart,
      color: "bg-red-100 text-red-600"
    },
    {
      title: "Shopping Excursions",
      description: "Luxury shopping trips to boutiques and department stores",
      features: ["Personal shopper coordination", "Package handling", "Multiple store visits", "VIP access"],
      price: "From €40",
      icon: Star,
      color: "bg-purple-100 text-purple-600"
    },
    {
      title: "Medical Appointments",
      description: "Reliable transportation for medical visits and treatments",
      features: ["Punctual service", "Comfortable seating", "Wheelchair accessibility", "Discretion assured"],
      price: "From €30",
      icon: Shield,
      color: "bg-green-100 text-green-600"
    },
    {
      title: "Cultural Tours",
      description: "Guided transfers to museums, galleries, and cultural sites",
      features: ["Expert commentary", "Skip-the-line access", "Photo opportunities", "Cultural insights"],
      price: "From €50",
      icon: Award,
      color: "bg-yellow-100 text-yellow-600"
    },
    {
      title: "Business Meetings",
      description: "Professional transfers for corporate appointments",
      features: ["Wi-Fi connectivity", "Mobile office setup", "Punctual arrival", "Professional presentation"],
      price: "From €45",
      icon: Briefcase,
      color: "bg-indigo-100 text-indigo-600"
    }
  ];

  const specialServices = [
    {
      title: "Pet-Friendly Transfers",
      description: "Safe and comfortable transportation for you and your pets",
      features: ["Pet carriers available", "Climate control", "Stops for pet needs", "Veterinary coordination"],
      icon: Heart
    },
    {
      title: "Elderly Care Transfers",
      description: "Specialized service for senior citizens with mobility assistance",
      features: ["Mobility aid assistance", "Patient drivers", "Medical equipment transport", "Family coordination"],
      icon: Shield
    },
    {
      title: "Student Group Transfers",
      description: "Educational trip transportation for schools and universities",
      features: ["Group coordination", "Educational commentary", "Safety protocols", "Flexible scheduling"],
      icon: Users
    },
    {
      title: "Photography Tours",
      description: "Transfers to the best photography locations in Paris",
      features: ["Golden hour timing", "Equipment transport", "Location expertise", "Weather monitoring"],
      icon: Star
    }
  ];

  const serviceAreas = [
    "Central Paris (All Arrondissements)",
    "La Défense Business District",
    "Versailles and Surroundings",
    "Fontainebleau Region",
    "Chantilly and Senlis",
    "Provins and Medieval Towns",
    "Giverny (Monet's Garden)",
    "Auvers-sur-Oise",
    "Barbizon Artist Village",
    "Meaux and Surroundings"
  ];

  const whyChooseOther = [
    {
      title: "Flexibility",
      description: "Customized transfers tailored to your specific needs and schedule",
      icon: Navigation
    },
    {
      title: "Local Knowledge",
      description: "Drivers with extensive knowledge of Paris and surrounding areas",
      icon: MapPin
    },
    {
      title: "Professional Service",
      description: "Courteous, well-trained drivers committed to excellence",
      icon: Award
    },
    {
      title: "Reliability",
      description: "Punctual service you can count on for any occasion",
      icon: Clock
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={getAssetPath("Nouveau site internet/Louvre_Museum,_Paris_22_June_2014.jpeg")} 
            alt="Other Transfers" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-indigo-600/80" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200">
              <ArrowRight className="w-4 h-4 mr-2" />
              Other Transfers
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Custom Transfer Solutions
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Beyond airports and train stations - we provide specialized transfers for every occasion. 
              From business meetings to cultural tours, we've got you covered.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Calendar className="w-4 h-4 mr-2" />
                Book Custom Transfer
              </Button>
              <Button variant="outline" className="border-blue-200 hover:bg-blue-50">
                <Phone className="w-4 h-4 mr-2" />
                Call +33 1 42 60 30 30
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Transfer Types */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-green-100 text-green-800">
              <Car className="w-4 h-4 mr-2" />
              Transfer Types
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Specialized Transfer Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Whatever your destination or purpose, we provide professional transfer services tailored to your needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {transferTypes.map((transfer, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 ${transfer.color} rounded-lg flex items-center justify-center`}>
                      <transfer.icon className="w-6 h-6" />
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600">{transfer.price}</div>
                    </div>
                  </div>
                  <CardTitle className="text-xl">{transfer.title}</CardTitle>
                  <CardDescription className="text-base">{transfer.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {transfer.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-3">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-muted-foreground text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Book This Transfer
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Special Services */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-purple-100 text-purple-800">
              <Star className="w-4 h-4 mr-2" />
              Special Services
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Unique Transfer Solutions</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We go beyond standard transfers to provide specialized services for unique situations and requirements.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {specialServices.map((service, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <service.icon className="w-8 h-8 text-blue-600" />
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

      {/* Service Areas */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-green-100 text-green-800">
                <MapPin className="w-4 h-4 mr-2" />
                Service Coverage
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Extensive Service Area
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Our transfer services cover Paris and the entire Île-de-France region, 
                ensuring we can take you wherever you need to go with the same level of professional service.
              </p>
              <div className="grid md:grid-cols-2 gap-3">
                {serviceAreas.map((area, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{area}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl p-8 h-96 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-24 h-24 text-blue-600 mx-auto mb-4" />
                  <p className="text-blue-600 font-semibold text-lg">Paris & Île-de-France</p>
                  <p className="text-sm text-muted-foreground mt-2">Complete regional coverage</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-white/20 text-white hover:bg-white/30">
              <Award className="w-4 h-4 mr-2" />
              Why Choose Us
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">The Difference We Make</h2>
            <p className="text-blue-100 max-w-2xl mx-auto">
              Our commitment to excellence and attention to detail sets us apart in every transfer we provide.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseOther.map((reason, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <reason.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{reason.title}</h3>
                <p className="text-blue-100 text-sm">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Process */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-blue-100 text-blue-800">
              <Calendar className="w-4 h-4 mr-2" />
              Easy Booking
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Booking your custom transfer is simple and straightforward with our streamlined process.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Tell Us Your Needs</h3>
              <p className="text-muted-foreground">
                Contact us with your specific transfer requirements, destination, and any special requests.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Get Custom Quote</h3>
              <p className="text-muted-foreground">
                Receive a personalized quote based on your specific needs and requirements.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Enjoy Your Transfer</h3>
              <p className="text-muted-foreground">
                Relax and enjoy professional, customized service tailored to your exact needs.
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
              Need a Custom Transfer Solution?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Whatever your transfer needs, we're here to provide professional, reliable service. 
              Contact us to discuss your requirements.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3">
                <ArrowRight className="w-5 h-5 mr-2" />
                Request Custom Quote
              </Button>
              <Button variant="outline" className="border-blue-200 hover:bg-blue-50 text-lg px-8 py-3">
                <Phone className="w-5 h-5 mr-2" />
                Call +33 1 42 60 30 30
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Custom solutions | Professional service | Competitive pricing
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}