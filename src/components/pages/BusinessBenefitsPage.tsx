import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { 
  Award, 
  Clock, 
  Shield,
  CreditCard,
  Users,
  TrendingUp,
  CheckCircle,
  Star,
  Phone,
  Calendar,
  Briefcase,
  Target,
  BarChart3,
  Headphones,
  Globe,
  Zap
} from "lucide-react";

export function BusinessBenefitsPage() {
  const benefits = [
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Time Efficiency",
      description: "Save valuable time with our streamlined booking process and reliable service.",
      details: [
        "One-click booking system",
        "Real-time tracking and updates",
        "Automated scheduling for regular trips",
        "Priority customer support"
      ]
    },
    {
      icon: <CreditCard className="w-8 h-8" />,
      title: "Cost Management",
      description: "Transparent pricing with detailed reporting for better expense control.",
      details: [
        "Fixed corporate rates",
        "Monthly consolidated billing",
        "Detailed expense reports",
        "No hidden fees or surge pricing"
      ]
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Professional Image",
      description: "Enhance your company's reputation with premium transportation services.",
      details: [
        "Luxury Mercedes fleet",
        "Professional uniformed chauffeurs",
        "Immaculate vehicle presentation",
        "Discrete and confidential service"
      ]
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Employee Satisfaction",
      description: "Improve employee experience with comfortable and reliable transportation.",
      details: [
        "Stress-free travel experience",
        "Comfortable luxury vehicles",
        "WiFi and charging facilities",
        "Climate-controlled environment"
      ]
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Productivity Boost",
      description: "Transform travel time into productive work time with mobile office features.",
      details: [
        "Mobile office setup",
        "High-speed WiFi connectivity",
        "Privacy for confidential calls",
        "Comfortable workspace environment"
      ]
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Reliability Guarantee",
      description: "Count on us for punctual and dependable service every time.",
      details: [
        "99.8% on-time performance",
        "Flight monitoring for airport transfers",
        "Backup vehicle availability",
        "24/7 customer support"
      ]
    }
  ];

  const metrics = [
    {
      icon: <BarChart3 className="w-12 h-12" />,
      value: "40%",
      label: "Average Time Savings",
      description: "Compared to traditional taxi services"
    },
    {
      icon: <Star className="w-12 h-12" />,
      value: "4.9★",
      label: "Customer Satisfaction",
      description: "Based on 10,000+ business trips"
    },
    {
      icon: <Clock className="w-12 h-12" />,
      value: "99.8%",
      label: "On-Time Performance",
      description: "Punctuality you can depend on"
    },
    {
      icon: <Users className="w-12 h-12" />,
      value: "500+",
      label: "Corporate Clients",
      description: "Trusted by leading companies"
    }
  ];

  const testimonials = [
    {
      quote: "My French Driver has transformed our executive transportation. The reliability and professionalism are unmatched.",
      author: "Sarah Johnson",
      position: "CEO, TechCorp International",
      company: "Fortune 500 Technology Company"
    },
    {
      quote: "The cost savings and efficiency gains have been remarkable. Our employees love the service quality.",
      author: "Michael Chen",
      position: "Operations Director",
      company: "Global Consulting Firm"
    },
    {
      quote: "From airport transfers to client meetings, they handle everything seamlessly. Truly professional service.",
      author: "Emma Rodriguez",
      position: "Executive Assistant",
      company: "Investment Banking"
    }
  ];

  const features = [
    "Dedicated account management",
    "Priority booking system",
    "Real-time trip tracking",
    "Detailed expense reporting",
    "24/7 customer support",
    "Multi-user account access",
    "Custom billing cycles",
    "Corporate rate discounts",
    "Event coordination services",
    "Emergency backup vehicles",
    "Professional chauffeur training",
    "Comprehensive insurance coverage"
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4">Business Benefits</Badge>
            <h1 className="text-5xl md:text-6xl mb-6">
              Unlock Your Business Potential
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Discover how professional transportation services can drive efficiency, 
              reduce costs, and enhance your company's professional image.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">
                <Award className="w-4 h-4 mr-2" />
                Explore Benefits
              </Button>
              <Button size="lg" variant="outline">
                Request Business Quote
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-6">Why Businesses Choose Us</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our comprehensive business transportation solutions deliver measurable 
              benefits that impact your bottom line and employee satisfaction.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="bg-primary/10 rounded-full p-4 w-fit mb-4 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl mb-3">{benefit.title}</h3>
                  <p className="text-muted-foreground mb-4">{benefit.description}</p>
                  
                  <div className="space-y-2">
                    {benefit.details.map((detail, idx) => (
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

      {/* Performance Metrics */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-6">Proven Results</h2>
            <p className="text-xl text-muted-foreground">
              Our track record speaks for itself with measurable business impact
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {metrics.map((metric, index) => (
              <Card key={index} className="text-center group hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
                    {metric.icon}
                  </div>
                  <div className="text-3xl font-bold text-primary mb-2">{metric.value}</div>
                  <h4 className="text-lg mb-2">{metric.label}</h4>
                  <p className="text-sm text-muted-foreground">{metric.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Calculator Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge variant="outline" className="mb-4">ROI Analysis</Badge>
              <h2 className="text-4xl mb-6">Calculate Your Savings</h2>
              <p className="text-lg text-muted-foreground mb-8">
                See how much your business can save with our professional transportation 
                services compared to traditional alternatives.
              </p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-2 rounded-lg text-primary">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="mb-2">Reduced Wait Times</h4>
                    <p className="text-sm text-muted-foreground">
                      Average 30% reduction in travel delays with our punctual service.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-2 rounded-lg text-primary">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="mb-2">Increased Productivity</h4>
                    <p className="text-sm text-muted-foreground">
                      Mobile office features enable work during travel time.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-2 rounded-lg text-primary">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="mb-2">Cost Predictability</h4>
                    <p className="text-sm text-muted-foreground">
                      Fixed corporate rates eliminate budget surprises.
                    </p>
                  </div>
                </div>
              </div>

              <Button size="lg" className="mt-8">
                <BarChart3 className="w-4 h-4 mr-2" />
                Calculate Your ROI
              </Button>
            </div>

            <div className="space-y-6">
              <Card className="bg-primary text-white">
                <CardContent className="p-6 text-center">
                  <TrendingUp className="w-12 h-12 mx-auto mb-4" />
                  <h3 className="text-xl mb-3">Average Annual Savings</h3>
                  <div className="text-3xl font-bold mb-2">€15,000</div>
                  <p className="opacity-90">
                    Per company with 50+ monthly trips
                  </p>
                </CardContent>
              </Card>

              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <Clock className="w-8 h-8 mx-auto mb-2 text-primary" />
                    <div className="text-lg font-bold">120hrs</div>
                    <div className="text-xs text-muted-foreground">Time Saved Monthly</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Users className="w-8 h-8 mx-auto mb-2 text-primary" />
                    <div className="text-lg font-bold">95%</div>
                    <div className="text-xs text-muted-foreground">Employee Satisfaction</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-6">What Our Business Clients Say</h2>
            <p className="text-xl text-muted-foreground">
              Real feedback from companies that have transformed their transportation
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-muted-foreground mb-4 italic">
                    "{testimonial.quote}"
                  </blockquote>
                  <div>
                    <div className="font-semibold">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.position}</div>
                    <div className="text-xs text-muted-foreground">{testimonial.company}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-6">Complete Business Solution</h2>
            <p className="text-xl text-muted-foreground">
              Everything your business needs for professional transportation management
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3 bg-background p-4 rounded-lg border hover:shadow-md transition-all duration-200">
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl mb-6">Ready to Transform Your Business Transportation?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join hundreds of companies that have already discovered the benefits of 
            professional transportation services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              <Briefcase className="w-4 h-4 mr-2" />
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
              <Phone className="w-4 h-4 mr-2" />
              Speak with Expert
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}