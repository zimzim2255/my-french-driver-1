import { getAssetPath } from "../../utils/assetPath";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { 
  Clock, 
  Phone, 
  Shield, 
  Zap, 
  MapPin,
  Calendar,
  Users,
  Car,
  Headphones,
  CheckCircle,
  AlertCircle,
  Star,
  Globe,
  Heart,
  Award,
  ArrowRight
} from "lucide-react";

export function Service247Page() {
  const serviceFeatures = [
    {
      icon: Clock,
      title: "24/7 Availability",
      description: "Round-the-clock service, 365 days a year. We're always here when you need us.",
      color: "text-blue-600 bg-blue-100"
    },
    {
      icon: Phone,
      title: "Instant Response",
      description: "Immediate booking confirmation and real-time support for all your needs.",
      color: "text-green-600 bg-green-100"
    },
    {
      icon: Zap,
      title: "Emergency Service",
      description: "Priority response for urgent transportation needs and last-minute requests.",
      color: "text-yellow-600 bg-yellow-100"
    },
    {
      icon: Headphones,
      title: "Multilingual Support",
      description: "Professional assistance in French, English, and other major languages.",
      color: "text-purple-600 bg-purple-100"
    }
  ];

  const emergencyScenarios = [
    {
      title: "Flight Delays & Changes",
      description: "Flight delayed or cancelled? We monitor your flight status and adjust pickup times automatically.",
      icon: MapPin,
      response: "Immediate adjustment"
    },
    {
      title: "Medical Emergencies",
      description: "Urgent medical appointments or hospital transfers with priority dispatch.",
      icon: Heart,
      response: "Priority response"
    },
    {
      title: "Business Urgencies",
      description: "Last-minute meetings, airport rushes, or important client transportation.",
      icon: Users,
      response: "Express service"
    },
    {
      title: "Event Transportation",
      description: "Unexpected event needs, additional vehicles, or schedule changes.",
      icon: Calendar,
      response: "Flexible solutions"
    }
  ];

  const supportChannels = [
    {
      channel: "Phone Support",
      availability: "24/7",
      response: "Immediate",
      number: "+33 1 42 60 30 30",
      icon: Phone,
      color: "bg-blue-500"
    },
    {
      channel: "Emergency Line",
      availability: "24/7",
      response: "Priority",
      number: "+33 6 12 34 56 78",
      icon: AlertCircle,
      color: "bg-red-500"
    },
    {
      channel: "WhatsApp",
      availability: "24/7",
      response: "Quick",
      number: "+33 6 87 65 43 21",
      icon: Headphones,
      color: "bg-green-500"
    },
    {
      channel: "Email Support",
      availability: "24/7",
      response: "Within 30 min",
      number: "support@myfrenchdriver.com",
      icon: Globe,
      color: "bg-purple-500"
    }
  ];

  const guarantees = [
    "Response within 5 minutes for emergency calls",
    "Vehicle dispatch within 15 minutes in Paris",
    "Real-time tracking and updates",
    "Professional drivers available 24/7",
    "Backup vehicles for any situation",
    "Multilingual customer support"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={getAssetPath("Nouveau site internet/champagne tour .jpg")} 
            alt="24/7 Service" 
            className="w-full h-full object-cover filter grayscale"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-4 bg-white text-black hover:bg-gray-200">
              <Clock className="w-4 h-4 mr-2" />
              24/7 Service
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Always Available
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Round-the-clock premium transportation service. Day or night, weekday or weekend, 
              we're here to serve you with the same level of excellence.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-white text-black hover:bg-gray-200">
                <Phone className="w-4 h-4 mr-2" />
                Call Now: +33 1 42 60 30 30
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                <Calendar className="w-4 h-4 mr-2" />
                Book Online
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Service Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-green-100 text-green-800">
              <Star className="w-4 h-4 mr-2" />
              Service Features
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Our 24/7 Service</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive support and premium transportation available whenever you need it.
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

      {/* Emergency Scenarios */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-red-100 text-red-800">
              <AlertCircle className="w-4 h-4 mr-2" />
              Emergency Response
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">When Every Minute Counts</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our emergency response team is trained to handle urgent situations with speed and professionalism.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {emergencyScenarios.map((scenario, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <scenario.icon className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{scenario.title}</CardTitle>
                      <CardDescription className="text-base mt-2">{scenario.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-green-100 text-green-800">
                      <Zap className="w-3 h-3 mr-1" />
                      {scenario.response}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Support Channels */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-purple-100 text-purple-800">
              <Headphones className="w-4 h-4 mr-2" />
              Contact Channels
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Multiple Ways to Reach Us</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose your preferred communication method - we're available on all channels 24/7.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportChannels.map((channel, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <div className={`w-16 h-16 ${channel.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <channel.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-lg">{channel.channel}</CardTitle>
                  <CardDescription>
                    <Badge className="bg-green-100 text-green-800 mb-2">
                      {channel.availability}
                    </Badge>
                    <br />
                    Response: {channel.response}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="font-semibold text-blue-600">{channel.number}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Service Guarantees */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-white/20 text-white hover:bg-white/30">
              <Shield className="w-4 h-4 mr-2" />
              Our Guarantees
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What You Can Expect</h2>
            <p className="text-blue-100 max-w-2xl mx-auto">
              Our commitment to excellence means you can count on these service guarantees every time.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guarantees.map((guarantee, index) => (
              <div key={index} className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                <p className="text-blue-100">{guarantee}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Night Service */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-indigo-100 text-indigo-800">
                <Clock className="w-4 h-4 mr-2" />
                Night Service
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Premium Service After Dark
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Our night service maintains the same high standards as our daytime operations. 
                Whether you need an early morning airport transfer, late-night event transportation, 
                or emergency service, our professional drivers are ready.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Enhanced safety protocols for night travel</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>GPS tracking and real-time monitoring</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Experienced night-shift drivers</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Same premium vehicles and service quality</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-indigo-900 to-blue-900 rounded-2xl p-8 h-96 flex items-center justify-center">
                <div className="text-center text-white">
                  <Clock className="w-24 h-24 mx-auto mb-4 opacity-80" />
                  <p className="text-xl font-semibold mb-2">Night Service Available</p>
                  <p className="text-blue-200">Professional transportation 24/7</p>
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
              Need Transportation Right Now?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Don't wait - our 24/7 service means you can book premium transportation any time of day or night.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-red-600 hover:bg-red-700 text-lg px-8 py-3">
                <Phone className="w-5 h-5 mr-2" />
                Emergency: +33 6 12 34 56 78
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3">
                <Phone className="w-5 h-5 mr-2" />
                Call: +33 1 42 60 30 30
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Average response time: 5 minutes | Vehicle dispatch: 15 minutes
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}