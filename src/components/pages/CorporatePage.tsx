import { getAssetPath } from "../../utils/assetPath";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { 
  Users, 
  Briefcase, 
  Building,
  CreditCard,
  Clock,
  Phone,
  Calendar,
  CheckCircle,
  Star,
  Shield,
  Headphones
} from "lucide-react";

export function CorporatePage() {
  const benefits = [
    {
      icon: <CreditCard className="w-8 h-8" />,
      title: "Monthly Billing",
      description: "Streamlined invoicing with detailed trip reports and expense management."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Account Management",
      description: "Dedicated account manager for personalized service and support."
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Priority Booking",
      description: "Guaranteed availability with priority scheduling for corporate clients."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Premium Insurance",
      description: "Comprehensive coverage for business travelers and executive transport."
    }
  ];

  const solutions = [
    {
      title: "Executive Transportation",
      description: "High-end vehicles for C-level executives and VIP clients",
      features: [
        "Mercedes S-Class and E-Class fleet",
        "Professional uniformed chauffeurs",
        "Privacy and discretion guaranteed",
        "Mobile office capabilities",
        "Refreshments and amenities"
      ],
      price: "From €120/hour"
    },
    {
      title: "Team Transportation",
      description: "Group transportation solutions for meetings and events",
      features: [
        "Mercedes V-Class for up to 7 passengers",
        "Conference table and WiFi",
        "Multiple vehicle coordination",
        "Event logistics support",
        "Cost-effective group rates"
      ],
      price: "From €140/hour"
    },
    {
      title: "Regular Commutes",
      description: "Daily transportation for executives and employees",
      features: [
        "Fixed route optimization",
        "Regular driver assignment",
        "Flexible scheduling",
        "Monthly contract rates",
        "Real-time tracking"
      ],
      price: "Custom pricing"
    }
  ];

  const corporateFeatures = [
    "Dedicated account management",
    "24/7 customer support",
    "Real-time booking platform",
    "Detailed expense reporting",
    "Multi-user account access",
    "Custom billing cycles",
    "Corporate rates and discounts",
    "Event coordination services"
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4">Corporate Services</Badge>
            <h1 className="text-5xl md:text-6xl mb-6">
              Executive Transportation Solutions
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Professional corporate transportation services designed for businesses. 
              Streamlined booking, dedicated support, and premium vehicles for your team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">
                <Building className="w-4 h-4 mr-2" />
                Setup Corporate Account
              </Button>
              <Button size="lg" variant="outline">
                Request Corporate Quote
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Benefits */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-6">Why Choose Corporate Services?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Tailored solutions that save time, reduce costs, and provide the professional 
              image your business deserves.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
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
        </div>
      </section>

      {/* Corporate Solutions */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-6">Corporate Transportation Solutions</h2>
            <p className="text-xl text-muted-foreground">
              Flexible packages designed to meet diverse business transportation needs
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <h3 className="text-xl mb-3">{solution.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{solution.description}</p>
                    <div className="text-2xl text-primary">{solution.price}</div>
                  </div>

                  <div className="space-y-3 mb-8">
                    {solution.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-3">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button className="w-full group-hover:bg-primary group-hover:text-white">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Account Management */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge variant="outline" className="mb-4">Account Management</Badge>
              <h2 className="text-4xl mb-6">Dedicated Corporate Support</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Every corporate client receives a dedicated account manager who understands 
                your business needs and ensures seamless transportation services. From setup 
                to ongoing support, we're here to make business travel effortless.
              </p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-2 rounded-lg text-primary">
                    <Headphones className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="mb-2">24/7 Support Line</h4>
                    <p className="text-sm text-muted-foreground">
                      Direct access to our corporate support team for urgent requests and changes.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-2 rounded-lg text-primary">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="mb-2">Advance Scheduling</h4>
                    <p className="text-sm text-muted-foreground">
                      Book recurring trips and manage complex itineraries with ease.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-2 rounded-lg text-primary">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="mb-2">Expense Management</h4>
                    <p className="text-sm text-muted-foreground">
                      Detailed reporting and simplified billing for accounting departments.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <ImageWithFallback
                src={getAssetPath("Nouveau site internet/BUSINESS.jpeg")}
                alt="Corporate account management"
                className="w-full h-80 object-cover rounded-lg"
              />
              
              <Card className="bg-primary text-white">
                <CardContent className="p-6 text-center">
                  <Star className="w-12 h-12 mx-auto mb-4" />
                  <h3 className="text-xl mb-3">Corporate Excellence</h3>
                  <p className="opacity-90 mb-4">
                    Join over 500+ companies that trust My French Driver for their 
                    executive transportation needs.
                  </p>
                  <Button variant="secondary" size="sm">
                    View Case Studies
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-6">Corporate Account Features</h2>
            <p className="text-xl text-muted-foreground">
              Everything your business needs for professional transportation management
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {corporateFeatures.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3 bg-background p-4 rounded-lg">
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
          <h2 className="text-3xl md:text-4xl mb-6">Ready to Elevate Your Business Travel?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Set up your corporate account today and experience the difference professional 
            transportation makes for your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              <Building className="w-4 h-4 mr-2" />
              Setup Corporate Account
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
              <Phone className="w-4 h-4 mr-2" />
              Call Corporate Sales
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}