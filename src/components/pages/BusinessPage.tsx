import { getAssetPath } from "../../utils/assetPath";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { 
  Briefcase, 
  Plane, 
  Award,
  Settings,
  ArrowRight,
  CheckCircle,
  Star,
  Phone,
  Calendar,
  Users,
  Clock,
  Shield,
  TrendingUp,
  Target,
  Zap,
  Heart
} from "lucide-react";

export function BusinessPage() {
  const businessServices = [
    {
      id: 'airport',
      title: 'Airport Transfers',
      description: 'Professional airport transportation with flight monitoring and meet & greet service.',
      icon: <Plane className="w-8 h-8" />,
      features: [
        'Flight tracking and monitoring',
        'Meet & greet at arrivals',
        'Luggage assistance',
        'All Paris airports covered'
      ],
      link: 'airport',
      image: '/assets/Nouveau site internet/aiport transfer 1.jpeg'
    },
    {
      id: 'benefits',
      title: 'Business Benefits',
      description: 'Discover how professional transportation drives efficiency and reduces costs.',
      icon: <Award className="w-8 h-8" />,
      features: [
        'Time efficiency and productivity',
        'Cost management and reporting',
        'Professional image enhancement',
        'Employee satisfaction boost'
      ],
      link: 'business-benefits',
      image: '/assets/Nouveau site internet/notre marque 1.jpg'
    },
    {
      id: 'personalization',
      title: 'Personalization',
      description: 'Customize every aspect of your journey to match your preferences and needs.',
      icon: <Settings className="w-8 h-8" />,
      features: [
        'Personal comfort preferences',
        'Entertainment and media options',
        'Custom refreshment selection',
        'Service style preferences'
      ],
      link: 'personalization',
      image: '/assets/Nouveau site internet/MISE A DISPO.jpeg'
    }
  ];

  const keyBenefits = [
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Time Efficiency",
      description: "Save 40% more time compared to traditional transportation"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Reliability",
      description: "99.8% on-time performance with professional service"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Productivity",
      description: "Mobile office features to work during travel"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Cost Control",
      description: "Fixed rates and detailed expense reporting"
    }
  ];

  const stats = [
    { value: "500+", label: "Business Clients" },
    { value: "50K+", label: "Successful Trips" },
    { value: "4.9★", label: "Client Rating" },
    { value: "24/7", label: "Support Available" }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src={getAssetPath("Nouveau site internet/BUSINESS.jpeg")}
            alt="Business transportation"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/80"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <Badge variant="secondary" className="mb-4 bg-black/60 text-white border-white/50 font-semibold">
              Business Solutions
            </Badge>
            <h1 className="text-5xl md:text-6xl mb-6 font-bold text-white drop-shadow-lg">
              Elevate Your Business Transportation
            </h1>
            <p className="text-xl mb-8 text-white font-medium drop-shadow-md">
              Professional transportation solutions designed for modern businesses. 
              From airport transfers to personalized service, we deliver excellence every mile.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                <Briefcase className="w-4 h-4 mr-2" />
                Explore Business Solutions
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                Request Business Quote
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits Overview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-6">Why Businesses Choose Us</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Transform your business transportation with solutions that drive efficiency, 
              enhance your professional image, and deliver measurable results.
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

      {/* Business Services */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-6">Complete Business Solutions</h2>
            <p className="text-xl text-muted-foreground">
              Comprehensive transportation services tailored for business success
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {businessServices.map((service, index) => (
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

      {/* Value Proposition */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge variant="outline" className="mb-4">Business Value</Badge>
              <h2 className="text-4xl mb-6">Transform Your Business Travel</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Our business transportation solutions go beyond simple rides. We provide 
                a comprehensive service that enhances productivity, reduces costs, and 
                elevates your company's professional image.
              </p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-2 rounded-lg text-primary">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="mb-2">Instant Efficiency</h4>
                    <p className="text-sm text-muted-foreground">
                      Streamlined booking, real-time tracking, and priority support save valuable time.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-2 rounded-lg text-primary">
                    <Heart className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="mb-2">Personalized Experience</h4>
                    <p className="text-sm text-muted-foreground">
                      Customizable preferences ensure every journey meets your exact requirements.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-2 rounded-lg text-primary">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="mb-2">Dedicated Support</h4>
                    <p className="text-sm text-muted-foreground">
                      Account management and 24/7 support ensure seamless business operations.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button size="lg">
                  Get Started
                </Button>
                <Button size="lg" variant="outline">
                  <Phone className="w-4 h-4 mr-2" />
                  Schedule Consultation
                </Button>
              </div>
            </div>

            <div className="space-y-6">
              <Card className="bg-primary text-white">
                <CardContent className="p-6 text-center">
                  <TrendingUp className="w-12 h-12 mx-auto mb-4" />
                  <h3 className="text-xl mb-3">Business Growth</h3>
                  <p className="opacity-90 mb-4">
                    Companies using our services report 25% improvement in executive 
                    productivity and 30% reduction in travel-related stress.
                  </p>
                  <Button variant="secondary" size="sm">
                    View Case Studies
                  </Button>
                </CardContent>
              </Card>

              <div className="grid grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-4 text-center">
                    <Clock className="w-8 h-8 mx-auto mb-2 text-primary" />
                    <div className="text-lg font-bold">€15K</div>
                    <div className="text-xs text-muted-foreground">Average Annual Savings</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Star className="w-8 h-8 mx-auto mb-2 text-primary" />
                    <div className="text-lg font-bold">95%</div>
                    <div className="text-xs text-muted-foreground">Client Retention Rate</div>
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
                "My French Driver has revolutionized our executive transportation. The combination 
                of reliability, personalization, and professional service has exceeded our expectations. 
                Our executives can now focus on business while traveling in comfort and style."
              </blockquote>
              <div>
                <div className="font-semibold text-lg">Marie Dubois</div>
                <div className="text-muted-foreground">Chief Operations Officer</div>
                <div className="text-sm text-muted-foreground">International Consulting Group</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl mb-6">Ready to Elevate Your Business Transportation?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join hundreds of companies that have transformed their transportation experience. 
            Discover the difference professional service makes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              <Calendar className="w-4 h-4 mr-2" />
              Book Consultation
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
              <Phone className="w-4 h-4 mr-2" />
              Call Business Line
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}