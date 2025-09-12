import { getAssetPath } from "../../utils/assetPath";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { 
  Shield, 
  Award, 
  CheckCircle,
  Phone,
  AlertTriangle,
  Lock,
  UserCheck,
  Car,
  Heart,
  Clock,
  Star,
  Eye
} from "lucide-react";

export function SafetyPage() {
  const safetyStandards = [
    {
      icon: <UserCheck className="w-8 h-8" />,
      title: "Professional Driver Certification",
      description: "All chauffeurs undergo rigorous background checks, training, and certification processes.",
      details: [
        "Comprehensive background verification",
        "Professional driving license validation",
        "Defensive driving course completion",
        "Customer service training",
        "Regular performance evaluations",
        "Continuous education programs"
      ]
    },
    {
      icon: <Car className="w-8 h-8" />,
      title: "Vehicle Safety Systems",
      description: "Our Mercedes fleet features the latest safety technology and undergoes regular maintenance.",
      details: [
        "Advanced driver assistance systems",
        "Anti-lock braking systems (ABS)",
        "Electronic stability control",
        "Multiple airbag systems",
        "GPS tracking and monitoring",
        "Emergency communication systems"
      ]
    },
    {
      icon: <Lock className="w-8 h-8" />,
      title: "Data Protection & Privacy",
      description: "Your personal information and travel details are protected with enterprise-grade security.",
      details: [
        "GDPR compliance certification",
        "Encrypted data transmission",
        "Secure payment processing",
        "Confidential client information",
        "Privacy-focused service protocols",
        "Regular security audits"
      ]
    }
  ];

  const certifications = [
    {
      title: "Transportation License",
      description: "Fully licensed by French transportation authorities",
      icon: <Award className="w-6 h-6" />
    },
    {
      title: "Insurance Coverage",
      description: "Comprehensive commercial insurance for all operations",
      icon: <Shield className="w-6 h-6" />
    },
    {
      title: "ISO Certification",
      description: "Quality management systems certification",
      icon: <Star className="w-6 h-6" />
    },
    {
      title: "Safety Training",
      description: "Regular safety training and emergency response protocols",
      icon: <AlertTriangle className="w-6 h-6" />
    }
  ];

  const emergencyProcedures = [
    {
      situation: "Vehicle Breakdown",
      response: "Immediate replacement vehicle dispatched within 30 minutes",
      icon: <Car className="w-6 h-6" />
    },
    {
      situation: "Medical Emergency",
      response: "Trained drivers provide first aid and coordinate emergency services",
      icon: <Heart className="w-6 h-6" />
    },
    {
      situation: "Route Disruption",
      response: "Real-time traffic monitoring with alternative route planning",
      icon: <Eye className="w-6 h-6" />
    },
    {
      situation: "Communication Issues",
      response: "24/7 support center with multiple contact methods",
      icon: <Phone className="w-6 h-6" />
    }
  ];

  const maintenanceSchedule = [
    "Daily vehicle inspection checklist",
    "Weekly safety system verification",
    "Monthly comprehensive maintenance",
    "Quarterly professional certification renewal",
    "Bi-annual safety audit and compliance review",
    "Annual fleet replacement and upgrade program"
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src={getAssetPath("Nouveau site internet/notre marque 2.jpeg")}
            alt="Safety & Standards"
            className="w-full h-full object-cover filter grayscale"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-white text-black hover:bg-gray-200">Safety & Standards</Badge>
            <h1 className="text-5xl md:text-6xl mb-6 text-white">
              Your Safety is Our Priority
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              At My French Driver, safety comes first. We maintain the highest safety standards 
              through rigorous training, regular maintenance, comprehensive insurance, and 
              strict compliance with all transportation regulations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-black hover:bg-gray-200">
                <Shield className="w-4 h-4 mr-2" />
                Safety Certifications
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                Emergency Procedures
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Safety Standards */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-6">Comprehensive Safety Standards</h2>
            <p className="text-xl text-muted-foreground">
              Multi-layered safety approach ensuring your complete protection and peace of mind
            </p>
          </div>

          <div className="space-y-16">
            {safetyStandards.map((standard, index) => (
              <div key={index} className={`grid lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-dense' : ''
              }`}>
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className="text-primary mb-4">
                    {standard.icon}
                  </div>
                  <h3 className="text-3xl mb-4">{standard.title}</h3>
                  <p className="text-lg text-muted-foreground mb-6">
                    {standard.description}
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    {standard.details.map((detail, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-sm">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className={index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                  <Card className="bg-primary/5 border-primary/20">
                    <CardContent className="p-8 text-center">
                      <div className="bg-primary/10 rounded-full p-6 w-fit mx-auto mb-6 text-primary">
                        {standard.icon}
                      </div>
                      <h4 className="text-xl mb-4">Industry Leading Standards</h4>
                      <p className="text-muted-foreground">
                        Our commitment to safety exceeds industry requirements, ensuring 
                        the highest level of protection for every journey.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-6">Safety Certifications & Compliance</h2>
            <p className="text-xl text-muted-foreground">
              Fully certified and compliant with all French and European transportation regulations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {certifications.map((cert, index) => (
              <Card key={index} className="text-center group hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="bg-primary/10 rounded-full p-4 w-fit mx-auto mb-4 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    {cert.icon}
                  </div>
                  <h3 className="text-lg mb-3">{cert.title}</h3>
                  <p className="text-sm text-muted-foreground">{cert.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Procedures */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-6">Emergency Response Procedures</h2>
            <p className="text-xl text-muted-foreground">
              Prepared for any situation with comprehensive emergency protocols and 24/7 support
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {emergencyProcedures.map((procedure, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/10 p-3 rounded-lg text-primary flex-shrink-0">
                      {procedure.icon}
                    </div>
                    <div>
                      <h3 className="text-lg mb-2">{procedure.situation}</h3>
                      <p className="text-muted-foreground text-sm">{procedure.response}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Maintenance Schedule */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl mb-6">Preventive Maintenance Program</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Our proactive maintenance schedule ensures every vehicle operates at peak 
                safety and performance levels. Regular inspections and services prevent 
                issues before they occur.
              </p>

              <div className="space-y-4">
                {maintenanceSchedule.map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>

              <Button size="lg" className="mt-8">
                <Phone className="w-4 h-4 mr-2" />
                Contact Safety Manager
              </Button>
            </div>

            <div className="space-y-6">
              <ImageWithFallback
                src={getAssetPath("Nouveau site internet/notre flotte.jpeg")}
                alt="Vehicle maintenance and safety inspection"
                className="w-full h-80 object-cover rounded-lg"
              />
              
              <Card className="bg-primary text-white">
                <CardContent className="p-6 text-center">
                  <Shield className="w-12 h-12 mx-auto mb-4" />
                  <h3 className="text-xl mb-3">Zero Tolerance Safety Policy</h3>
                  <p className="opacity-90">
                    Any vehicle or driver that doesn't meet our strict safety standards 
                    is immediately removed from service until compliance is restored.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* 24/7 Support */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-primary text-white rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl mb-6">24/7 Safety Support</h2>
            <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
              Our dedicated safety team is available around the clock to ensure your security 
              and respond to any situation. Your safety is never compromised, day or night.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div>
                <Phone className="w-12 h-12 mx-auto mb-4 opacity-90" />
                <h4 className="text-xl mb-2">Emergency Hotline</h4>
                <p className="opacity-80">+33 6 99 99 99 99</p>
              </div>
              <div>
                <AlertTriangle className="w-12 h-12 mx-auto mb-4 opacity-90" />
                <h4 className="text-xl mb-2">Immediate Response</h4>
                <p className="opacity-80">Average response time: 15 minutes</p>
              </div>
              <div>
                <Eye className="w-12 h-12 mx-auto mb-4 opacity-90" />
                <h4 className="text-xl mb-2">Live Monitoring</h4>
                <p className="opacity-80">Real-time vehicle tracking</p>
              </div>
            </div>

            <Button variant="secondary" size="lg">
              <Shield className="w-4 h-4 mr-2" />
              Download Safety Guide
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}