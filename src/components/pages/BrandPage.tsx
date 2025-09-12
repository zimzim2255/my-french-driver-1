import { getAssetPath } from "../../utils/assetPath";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { 
  Award, 
  Shield, 
  Star, 
  Users, 
  Globe, 
  Heart,
  Crown,
  Sparkles,
  Target,
  Zap,
  CheckCircle,
  ArrowRight,
  Calendar,
  Car
} from "lucide-react";

export function BrandPage() {
  const brandValues = [
    {
      icon: Crown,
      title: "Excellence",
      description: "We set the highest standards in luxury transportation, ensuring every journey exceeds expectations.",
      color: "text-yellow-600 bg-yellow-100"
    },
    {
      icon: Shield,
      title: "Trust",
      description: "Built on reliability and integrity, we're the trusted choice for discerning clients worldwide.",
      color: "text-blue-600 bg-blue-100"
    },
    {
      icon: Heart,
      title: "Passion",
      description: "Our love for exceptional service drives us to create memorable experiences for every client.",
      color: "text-red-600 bg-red-100"
    },
    {
      icon: Sparkles,
      title: "Innovation",
      description: "Continuously evolving our services with cutting-edge technology and modern solutions.",
      color: "text-purple-600 bg-purple-100"
    }
  ];

  const brandPillars = [
    {
      title: "Premium Quality",
      description: "Every aspect of our service reflects our commitment to luxury and excellence.",
      features: ["Luxury fleet vehicles", "Professional chauffeurs", "Immaculate presentation", "Attention to detail"]
    },
    {
      title: "Personalized Service",
      description: "Tailored experiences that cater to your unique preferences and requirements.",
      features: ["Custom itineraries", "Personal preferences", "Flexible scheduling", "Dedicated support"]
    },
    {
      title: "Global Standards",
      description: "International quality standards with local expertise and cultural understanding.",
      features: ["Multilingual service", "Cultural sensitivity", "Global protocols", "Local knowledge"]
    }
  ];

  const achievements = [
    { number: "15+", label: "Years of Excellence", icon: Award },
    { number: "50,000+", label: "Satisfied Clients", icon: Users },
    { number: "99.8%", label: "On-Time Performance", icon: Target },
    { number: "24/7", label: "Available Service", icon: Zap }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={getAssetPath("Nouveau site internet/notre marque 1.jpg")} 
            alt="My French Driver Brand" 
            className="w-full h-full object-cover filter grayscale"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-4 bg-white text-black hover:bg-gray-200">
              <Crown className="w-4 h-4 mr-2" />
              Our Brand
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              My French Driver
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              More than transportation - we're your gateway to experiencing France with elegance, 
              comfort, and unparalleled service excellence.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-white text-black hover:bg-gray-200">
                <Calendar className="w-4 h-4 mr-2" />
                Book Now
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                <Car className="w-4 h-4 mr-2" />
                View Fleet
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-green-100 text-green-800">
                <Sparkles className="w-4 h-4 mr-2" />
                Our Story
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Crafting Exceptional Journeys Since 2008
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Born from a passion for excellence and a deep love for French hospitality, My French Driver 
                began as a vision to redefine luxury transportation. What started as a small fleet of premium 
                vehicles has evolved into France's most trusted chauffeur service.
              </p>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                We believe that every journey should be an experience - from the moment you step into one of 
                our vehicles until you reach your destination. Our commitment to excellence has made us the 
                preferred choice for diplomats, business leaders, and discerning travelers worldwide.
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex -space-x-2">
                  <div className="w-10 h-10 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
                    <Star className="w-5 h-5 text-white" />
                  </div>
                  <div className="w-10 h-10 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div className="w-10 h-10 bg-purple-500 rounded-full border-2 border-white flex items-center justify-center">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div>
                  <p className="font-semibold">Trusted by thousands</p>
                  <p className="text-sm text-muted-foreground">Excellence recognized worldwide</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl p-8 h-96 flex items-center justify-center">
                <div className="text-center">
                  <Car className="w-24 h-24 text-blue-600 mx-auto mb-4" />
                  <p className="text-blue-600 font-semibold">Premium Fleet Image</p>
                  <p className="text-sm text-muted-foreground mt-2">Luxury vehicles ready for service</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Values */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-purple-100 text-purple-800">
              <Heart className="w-4 h-4 mr-2" />
              Our Values
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Drives Us Forward</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our core values shape every interaction, every journey, and every moment of your experience with us.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {brandValues.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <div className={`w-16 h-16 ${value.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <value.icon className="w-8 h-8" />
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Pillars */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-blue-100 text-blue-800">
              <Target className="w-4 h-4 mr-2" />
              Brand Pillars
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">The Foundation of Excellence</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Three fundamental pillars that define our approach to luxury transportation and client service.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {brandPillars.map((pillar, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl text-blue-600">{pillar.title}</CardTitle>
                  <CardDescription className="text-base">{pillar.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {pillar.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-white/20 text-white hover:bg-white/30">
              <Award className="w-4 h-4 mr-2" />
              Our Achievements
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Numbers That Speak</h2>
            <p className="text-blue-100 max-w-2xl mx-auto">
              Our commitment to excellence is reflected in the trust our clients place in us every day.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <achievement.icon className="w-8 h-8" />
                </div>
                <div className="text-4xl font-bold mb-2">{achievement.number}</div>
                <div className="text-blue-100">{achievement.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-green-100 text-green-800">
              <Globe className="w-4 h-4 mr-2" />
              Our Mission
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Connecting People, Creating Experiences
            </h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              "To provide exceptional transportation experiences that exceed expectations, combining French 
              elegance with modern convenience, while building lasting relationships with our clients through 
              trust, reliability, and unparalleled service."
            </p>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <Star className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Excellence First</h3>
                  <p className="text-sm text-muted-foreground">Every detail matters in creating perfect journeys</p>
                </div>
                <div>
                  <Users className="w-8 h-8 text-blue-500 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Client-Centric</h3>
                  <p className="text-sm text-muted-foreground">Your needs and preferences guide our service</p>
                </div>
                <div>
                  <Globe className="w-8 h-8 text-green-500 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Global Reach</h3>
                  <p className="text-sm text-muted-foreground">Local expertise with international standards</p>
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
              Experience the My French Driver Difference
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of satisfied clients who trust us for their most important journeys.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Calendar className="w-4 h-4 mr-2" />
                Book Your Journey
              </Button>
              <Button variant="outline" className="border-blue-200 hover:bg-blue-50">
                Learn More
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}