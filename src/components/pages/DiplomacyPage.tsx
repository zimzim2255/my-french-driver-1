import { getAssetPath } from "../../utils/assetPath";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { 
  Globe, 
  Users, 
  Crown,
  ShieldCheck,
  ArrowRight,
  CheckCircle,
  Star,
  Phone,
  Calendar,
  Shield,
  Award,
  Clock,
  Lock,
  Eye,
  Zap
} from "lucide-react";

export function DiplomacyPage() {
  const diplomacyServices = [
    {
      id: 'corporate',
      title: 'Corporate Services',
      description: 'Executive transportation solutions for diplomatic missions and international organizations.',
      icon: <Users className="w-8 h-8" />,
      features: [
        'Embassy and consulate services',
        'International delegation transport',
        'Protocol-compliant service',
        'Multilingual professional drivers'
      ],
      link: 'corporate',
      image: '/assets/Nouveau site internet/BUSINESS.jpeg'
    },
    {
      id: 'vip-service',
      title: 'VIP Service',
      description: 'Premium transportation for high-profile individuals and distinguished guests.',
      icon: <Crown className="w-8 h-8" />,
      features: [
        'Luxury fleet with premium amenities',
        'Red carpet treatment',
        'Discrete and professional service',
        'Customized experience packages'
      ],
      link: 'vip-service',
      image: '/assets/Nouveau site internet/notre marque 2.jpeg'
    },
    {
      id: 'close-protection',
      title: 'Close Protection',
      description: 'Secure transportation with trained security professionals for maximum safety.',
      icon: <ShieldCheck className="w-8 h-8" />,
      features: [
        'Trained security personnel',
        'Armored vehicle options',
        'Route security assessment',
        'Emergency response protocols'
      ],
      link: 'close-protection',
      image: '/assets/Nouveau site internet/notre flotte.jpeg'
    }
  ];

  const keyBenefits = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Maximum Security",
      description: "Advanced security protocols and trained personnel"
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: "Absolute Discretion",
      description: "Confidential service with complete privacy assurance"
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Protocol Excellence",
      description: "Expert knowledge of diplomatic protocols and etiquette"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "24/7 Availability",
      description: "Round-the-clock service for urgent diplomatic needs"
    }
  ];

  const stats = [
    { value: "50+", label: "Diplomatic Missions Served" },
    { value: "1000+", label: "VIP Transports" },
    { value: "100%", label: "Security Record" },
    { value: "24/7", label: "Emergency Response" }
  ];

  const certifications = [
    "ISO 27001 Security Management",
    "Diplomatic Protocol Certified",
    "Executive Protection Licensed",
    "International Security Standards",
    "Government Clearance Level",
    "Emergency Response Certified"
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src={getAssetPath("Nouveau site internet/diplomatie.jpeg")}
            alt="Diplomatic transportation"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/80"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <Badge variant="secondary" className="mb-4 bg-black/60 text-white border-white/50 font-semibold">
              Diplomatic Services
            </Badge>
            <h1 className="text-5xl md:text-6xl mb-6 font-bold text-white drop-shadow-lg">
              Distinguished Diplomatic Transportation
            </h1>
            <p className="text-xl mb-8 text-white font-medium drop-shadow-md">
              Exclusive transportation services for diplomatic missions, VIP clients, and high-security 
              requirements. Experience unparalleled discretion, security, and protocol excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                <Globe className="w-4 h-4 mr-2" />
                Explore Diplomatic Services
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                Request Security Consultation
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits Overview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-6">Diplomatic Excellence Standards</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our diplomatic transportation services meet the highest international standards 
              for security, discretion, and protocol compliance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {keyBenefits.map((benefit, index) => (
              <Card key={index} className="text-center group hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="bg-primary/10 rounded-full p-4 w-fit mx-auto mb-4 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    {benefit.icon}
                  </div>
                  <h3 className="text-lg mb-3">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Diplomatic Services */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-6">Comprehensive Diplomatic Solutions</h2>
            <p className="text-xl text-muted-foreground">
              Specialized services designed for the unique requirements of diplomatic and VIP transportation
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {diplomacyServices.map((service, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="aspect-video overflow-hidden">
                  <ImageWithFallback
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-primary/10 p-2 rounded-lg text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      {service.icon}
                    </div>
                    <h3 className="text-xl">{service.title}</h3>
                  </div>
                  
                  <p className="text-muted-foreground mb-6">{service.description}</p>
                  
                  <div className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button className="w-full group-hover:bg-primary group-hover:text-white">
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Security & Compliance */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge variant="outline" className="mb-4">Security & Compliance</Badge>
              <h2 className="text-4xl mb-6">Uncompromising Security Standards</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Our diplomatic transportation services adhere to the strictest international 
                security protocols. Every aspect of our operation is designed to ensure the 
                safety and confidentiality of our distinguished clients.
              </p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-2 rounded-lg text-primary">
                    <Lock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="mb-2">Secure Communications</h4>
                    <p className="text-sm text-muted-foreground">
                      Encrypted communication systems and secure coordination protocols.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-2 rounded-lg text-primary">
                    <Eye className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="mb-2">Background Verified Staff</h4>
                    <p className="text-sm text-muted-foreground">
                      All personnel undergo comprehensive security clearance and background checks.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-2 rounded-lg text-primary">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="mb-2">Emergency Protocols</h4>
                    <p className="text-sm text-muted-foreground">
                      Comprehensive emergency response procedures and backup systems.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button size="lg">
                  Security Briefing
                </Button>
                <Button size="lg" variant="outline">
                  <Phone className="w-4 h-4 mr-2" />
                  Secure Contact Line
                </Button>
              </div>
            </div>

            <div className="space-y-6">
              <Card className="bg-primary text-white">
                <CardContent className="p-6 text-center">
                  <ShieldCheck className="w-12 h-12 mx-auto mb-4" />
                  <h3 className="text-xl mb-3">Security Clearance</h3>
                  <p className="opacity-90 mb-4">
                    Our team maintains the highest level security clearances and 
                    undergoes continuous training in diplomatic protocols.
                  </p>
                  <Button variant="secondary" size="sm">
                    View Certifications
                  </Button>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-3">Certifications & Compliance</h4>
                    <div className="space-y-2">
                      {certifications.map((cert, index) => (
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
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-8 text-center">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <blockquote className="text-xl text-muted-foreground mb-6 italic">
                "My French Driver provides exceptional diplomatic transportation services. Their attention 
                to protocol, security measures, and discretion is unmatched. They understand the unique 
                requirements of diplomatic missions and consistently exceed our expectations."
              </blockquote>
              <div>
                <div className="font-semibold text-lg">Ambassador Jean-Pierre Laurent</div>
                <div className="text-muted-foreground">Embassy of France</div>
                <div className="text-sm text-muted-foreground">Diplomatic Mission</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl mb-6">Ready for Distinguished Service?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Experience the highest standards of diplomatic transportation. Contact our security 
            team for a confidential consultation and service briefing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Consultation
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
              <Phone className="w-4 h-4 mr-2" />
              Secure Contact Line
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}