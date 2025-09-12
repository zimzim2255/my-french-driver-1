import { getAssetPath } from "../../utils/assetPath";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { 
  ShieldCheck, 
  Shield, 
  Eye,
  Radio,
  Car,
  Users,
  CheckCircle,
  Star,
  Phone,
  Calendar,
  Clock,
  Lock,
  AlertTriangle,
  Target,
  Zap,
  Award,
  MapPin,
  Headphones,
  Camera
} from "lucide-react";

export function CloseProtectionPage() {
  const protectionServices = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Executive Protection",
      description: "Comprehensive security for high-profile executives and business leaders.",
      details: [
        "Trained security professionals",
        "Threat assessment and planning",
        "Secure route coordination",
        "Emergency response protocols"
      ]
    },
    {
      icon: <Car className="w-8 h-8" />,
      title: "Armored Vehicles",
      description: "State-of-the-art armored vehicles for maximum protection during transport.",
      details: [
        "B4/B6 level armored vehicles",
        "Bulletproof glass and panels",
        "Run-flat tire systems",
        "Advanced communication systems"
      ]
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Security Teams",
      description: "Professional security teams with military and law enforcement backgrounds.",
      details: [
        "Ex-military personnel",
        "Specialized training programs",
        "Continuous skill development",
        "Multi-language capabilities"
      ]
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Surveillance & Intelligence",
      description: "Advanced surveillance and intelligence gathering for proactive security.",
      details: [
        "Route reconnaissance",
        "Threat intelligence analysis",
        "Real-time monitoring",
        "Counter-surveillance measures"
      ]
    }
  ];

  const securityLevels = [
    {
      level: "Standard Security",
      price: "From €150/hour",
      description: "Basic protection with trained security driver",
      features: [
        "Security-trained chauffeur",
        "Secure vehicle inspection",
        "Basic route planning",
        "Emergency communication",
        "Incident reporting"
      ],
      recommended: false
    },
    {
      level: "Enhanced Protection",
      price: "From €300/hour",
      description: "Advanced security with dedicated protection officer",
      features: [
        "Dedicated protection officer",
        "Armored vehicle options",
        "Advanced route security",
        "Real-time threat monitoring",
        "Coordination with local authorities",
        "Emergency medical support"
      ],
      recommended: true
    },
    {
      level: "Maximum Security",
      price: "Custom Pricing",
      description: "Complete security package with full protection team",
      features: [
        "Multi-person security team",
        "Fully armored vehicle fleet",
        "Advance security reconnaissance",
        "Counter-surveillance operations",
        "Medical support team",
        "24/7 command center support"
      ],
      recommended: false
    }
  ];

  const securityFeatures = [
    {
      category: "Vehicle Security",
      icon: <Car className="w-6 h-6" />,
      features: [
        "Armored passenger compartment",
        "Bulletproof glass (B4-B6 rating)",
        "Reinforced door frames",
        "Run-flat tire systems",
        "Emergency escape features",
        "Secure communication systems"
      ]
    },
    {
      category: "Personnel Training",
      icon: <Target className="w-6 h-6" />,
      features: [
        "Military/law enforcement background",
        "Defensive driving certification",
        "First aid and medical training",
        "Threat assessment expertise",
        "Firearms proficiency",
        "Cultural sensitivity training"
      ]
    },
    {
      category: "Technology & Equipment",
      icon: <Radio className="w-6 h-6" />,
      features: [
        "Encrypted communication systems",
        "GPS tracking and monitoring",
        "Surveillance detection equipment",
        "Emergency alert systems",
        "Body armor and protection gear",
        "Medical emergency equipment"
      ]
    },
    {
      category: "Operational Procedures",
      icon: <Lock className="w-6 h-6" />,
      features: [
        "Advance route reconnaissance",
        "Threat level assessments",
        "Emergency evacuation plans",
        "Coordination protocols",
        "Incident response procedures",
        "Regular security briefings"
      ]
    }
  ];

  const clientProfiles = [
    {
      title: "Corporate Executives",
      description: "C-level executives and board members requiring discrete protection",
      icon: <Award className="w-6 h-6" />,
      riskFactors: ["High-profile visibility", "Business conflicts", "Travel to risk areas"]
    },
    {
      title: "Government Officials",
      description: "Politicians and government representatives with security requirements",
      icon: <Shield className="w-6 h-6" />,
      riskFactors: ["Political exposure", "Public appearances", "Controversial positions"]
    },
    {
      title: "High Net Worth Individuals",
      description: "Wealthy individuals and families requiring personal security",
      icon: <Users className="w-6 h-6" />,
      riskFactors: ["Kidnapping threats", "Extortion attempts", "Privacy concerns"]
    },
    {
      title: "Celebrities & Public Figures",
      description: "Entertainment and sports personalities needing protection",
      icon: <Star className="w-6 h-6" />,
      riskFactors: ["Fan interactions", "Stalking incidents", "Media attention"]
    }
  ];

  const certifications = [
    "ISO 27001 Security Management",
    "Private Security License (France)",
    "Executive Protection Certification",
    "Defensive Driving Instructor",
    "First Aid/CPR Certified",
    "Firearms License & Training",
    "Counter-Surveillance Specialist",
    "Emergency Response Certified"
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src={getAssetPath("Nouveau site internet/diplomatie.jpeg")}
            alt="Close protection security transport"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/80"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <Badge variant="secondary" className="mb-4 bg-black/60 text-white border-white/50 font-semibold">
              Close Protection
            </Badge>
            <h1 className="text-5xl md:text-6xl mb-6 font-bold text-white drop-shadow-lg">
              Maximum Security Transportation
            </h1>
            <p className="text-xl mb-8 text-white font-medium drop-shadow-md">
              Professional close protection services with trained security personnel, armored vehicles, 
              and comprehensive threat assessment. Your safety is our absolute priority.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                <ShieldCheck className="w-4 h-4 mr-2" />
                Security Consultation
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                View Security Fleet
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Protection Services */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-6">Comprehensive Protection Services</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our close protection services combine advanced security protocols, trained personnel, 
              and state-of-the-art equipment to ensure maximum safety for our clients.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {protectionServices.map((service, index) => (
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

      {/* Security Levels */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-6">Security Protection Levels</h2>
            <p className="text-xl text-muted-foreground">
              Choose the appropriate security level based on your threat assessment and requirements
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {securityLevels.map((level, index) => (
              <Card key={index} className={`group hover:shadow-xl transition-all duration-300 ${
                level.recommended ? 'border-primary shadow-lg scale-105' : ''
              }`}>
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    {level.recommended && (
                      <Badge className="mb-4">Recommended</Badge>
                    )}
                    <h3 className="text-2xl mb-2">{level.level}</h3>
                    <div className="text-3xl font-bold text-primary mb-2">{level.price}</div>
                    <p className="text-muted-foreground text-sm">{level.description}</p>
                  </div>

                  <div className="space-y-3 mb-8">
                    {level.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-3">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button className={`w-full ${
                    level.recommended ? 'bg-primary hover:bg-primary/90' : ''
                  }`} variant={level.recommended ? 'default' : 'outline'}>
                    Select {level.level}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Security Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-6">Advanced Security Features</h2>
            <p className="text-xl text-muted-foreground">
              Comprehensive security measures across all aspects of our protection services
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {securityFeatures.map((category, index) => (
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
                        <ShieldCheck className="w-3 h-3 text-primary flex-shrink-0" />
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

      {/* Client Profiles */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-6">Who Needs Close Protection?</h2>
            <p className="text-xl text-muted-foreground">
              Our security services are designed for clients facing various threat levels and risk factors
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {clientProfiles.map((profile, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="bg-primary/10 rounded-full p-4 w-fit mx-auto mb-4 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    {profile.icon}
                  </div>
                  <h3 className="text-lg mb-3 text-center">{profile.title}</h3>
                  <p className="text-muted-foreground mb-4 text-center text-sm">{profile.description}</p>
                  
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-center">Common Risk Factors:</h4>
                    {profile.riskFactors.map((risk, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <AlertTriangle className="w-3 h-3 text-orange-500 flex-shrink-0" />
                        <span className="text-xs">{risk}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Security Process */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge variant="outline" className="mb-4">Security Process</Badge>
              <h2 className="text-4xl mb-6">How We Ensure Your Safety</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Our comprehensive security process begins with thorough threat assessment 
                and continues with meticulous planning and execution of protection protocols.
              </p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-2 rounded-lg text-primary">
                    <Eye className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="mb-2">Threat Assessment</h4>
                    <p className="text-sm text-muted-foreground">
                      Comprehensive analysis of potential risks and threat levels specific to your situation.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-2 rounded-lg text-primary">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="mb-2">Route Planning</h4>
                    <p className="text-sm text-muted-foreground">
                      Detailed route reconnaissance and security planning for all journeys.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-2 rounded-lg text-primary">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="mb-2">Real-time Monitoring</h4>
                    <p className="text-sm text-muted-foreground">
                      Continuous monitoring and communication throughout the journey.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button size="lg">
                  Security Assessment
                </Button>
                <Button size="lg" variant="outline">
                  <Phone className="w-4 h-4 mr-2" />
                  Emergency Line
                </Button>
              </div>
            </div>

            <div className="space-y-6">
              <Card className="bg-primary text-white">
                <CardContent className="p-6 text-center">
                  <ShieldCheck className="w-12 h-12 mx-auto mb-4" />
                  <h3 className="text-xl mb-3">Security Guarantee</h3>
                  <p className="opacity-90 mb-4">
                    Our security professionals maintain the highest standards with 
                    continuous training and certification updates.
                  </p>
                  <Button variant="secondary" size="sm">
                    View Certifications
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-3">Team Certifications</h4>
                  <div className="space-y-2">
                    {certifications.slice(0, 6).map((cert, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-sm">{cert}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl mb-6">Secure Your Transportation Today</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Don't compromise on security. Contact our protection specialists for a confidential 
            consultation and customized security solution.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              <Calendar className="w-4 h-4 mr-2" />
              Security Consultation
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
              <Phone className="w-4 h-4 mr-2" />
              Emergency: +33 1 42 60 30 30
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}