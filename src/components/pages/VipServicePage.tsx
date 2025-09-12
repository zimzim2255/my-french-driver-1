import { getAssetPath } from "../../utils/assetPath";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { 
  Crown, 
  Star, 
  Sparkles,
  Wine,
  Music,
  Wifi,
  CheckCircle,
  Phone,
  Calendar,
  Users,
  Clock,
  Shield,
  Award,
  Heart,
  Zap,
  Car,
  Gift,
  Camera,
  Headphones
} from "lucide-react";

export function VipServicePage() {
  const vipFeatures = [
    {
      icon: <Crown className="w-8 h-8" />,
      title: "Royal Treatment",
      description: "Experience transportation fit for royalty with our premium VIP service.",
      details: [
        "Red carpet arrival and departure",
        "Personal concierge service",
        "Priority lane access",
        "Exclusive VIP lounges"
      ]
    },
    {
      icon: <Car className="w-8 h-8" />,
      title: "Luxury Fleet",
      description: "Travel in the finest vehicles with premium amenities and comfort.",
      details: [
        "Mercedes S-Class and Maybach",
        "Rolls-Royce and Bentley options",
        "Custom interior configurations",
        "Latest technology integration"
      ]
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Personal Service",
      description: "Dedicated team ensuring every detail exceeds your expectations.",
      details: [
        "Personal VIP coordinator",
        "Multilingual professional staff",
        "24/7 personal assistance",
        "Customized service protocols"
      ]
    },
    {
      icon: <Gift className="w-8 h-8" />,
      title: "Exclusive Amenities",
      description: "Luxury amenities and personalized touches for an unforgettable experience.",
      details: [
        "Premium champagne service",
        "Gourmet refreshments",
        "Fresh flower arrangements",
        "Personalized welcome gifts"
      ]
    }
  ];

  const luxuryAmenities = [
    {
      category: "Comfort & Luxury",
      icon: <Sparkles className="w-6 h-6" />,
      items: [
        "Massage seats with heating/cooling",
        "Premium leather interiors",
        "Ambient lighting systems",
        "Climate-controlled environment",
        "Privacy partitions"
      ]
    },
    {
      category: "Entertainment & Technology",
      icon: <Headphones className="w-6 h-6" />,
      items: [
        "High-end sound systems",
        "Large HD displays",
        "Streaming entertainment",
        "High-speed WiFi",
        "Wireless charging stations"
      ]
    },
    {
      category: "Refreshments & Service",
      icon: <Wine className="w-6 h-6" />,
      items: [
        "Premium champagne selection",
        "Gourmet catering options",
        "Fresh fruit and snacks",
        "Artisan coffee service",
        "Custom dietary accommodations"
      ]
    },
    {
      category: "Special Services",
      icon: <Camera className="w-6 h-6" />,
      items: [
        "Professional photography",
        "Event coordination",
        "Shopping assistance",
        "Restaurant reservations",
        "Cultural guide services"
      ]
    }
  ];

  const vipPackages = [
    {
      name: "Platinum VIP",
      price: "From €200/hour",
      description: "Ultimate luxury experience with all premium amenities",
      features: [
        "Rolls-Royce or Bentley fleet",
        "Personal concierge service",
        "Premium champagne & catering",
        "Professional photography",
        "Red carpet treatment",
        "24/7 personal coordinator"
      ],
      popular: false
    },
    {
      name: "Diamond Elite",
      price: "From €350/hour",
      description: "The pinnacle of luxury transportation with exclusive services",
      features: [
        "Maybach or custom luxury vehicles",
        "Dedicated security detail",
        "Michelin-star catering",
        "Personal stylist available",
        "Private jet coordination",
        "Exclusive venue access"
      ],
      popular: true
    },
    {
      name: "Royal Experience",
      price: "Custom Pricing",
      description: "Bespoke luxury service tailored to your unique requirements",
      features: [
        "Custom vehicle selection",
        "Personalized itinerary planning",
        "Celebrity chef services",
        "Private event coordination",
        "International travel arrangements",
        "Unlimited customization"
      ],
      popular: false
    }
  ];

  const clientTypes = [
    {
      title: "Celebrities & Entertainment",
      description: "Discrete and professional service for high-profile personalities",
      icon: <Star className="w-6 h-6" />
    },
    {
      title: "Business Executives",
      description: "Executive transportation with mobile office capabilities",
      icon: <Award className="w-6 h-6" />
    },
    {
      title: "Special Occasions",
      description: "Luxury transportation for weddings, anniversaries, and celebrations",
      icon: <Heart className="w-6 h-6" />
    },
    {
      title: "International Guests",
      description: "Premium service for visiting dignitaries and important guests",
      icon: <Crown className="w-6 h-6" />
    }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src={getAssetPath("Nouveau site internet/diplomatie.jpeg")}
            alt="VIP luxury transportation"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/80"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <Badge variant="secondary" className="mb-4 bg-black/60 text-white border-white/50 font-semibold">
              VIP Service
            </Badge>
            <h1 className="text-5xl md:text-6xl mb-6 font-bold text-white drop-shadow-lg">
              Luxury Beyond Expectations
            </h1>
            <p className="text-xl mb-8 text-white font-medium drop-shadow-md">
              Experience the ultimate in luxury transportation with our exclusive VIP service. 
              From red carpet treatment to personalized amenities, every journey is extraordinary.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                <Crown className="w-4 h-4 mr-2" />
                Experience VIP Service
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                View Luxury Fleet
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* VIP Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-6">The VIP Difference</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our VIP service transforms transportation into an unforgettable luxury experience, 
              with attention to every detail that matters to our distinguished clients.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {vipFeatures.map((feature, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="bg-primary/10 rounded-full p-4 w-fit mx-auto mb-4 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl mb-3 text-center">{feature.title}</h3>
                  <p className="text-muted-foreground mb-4 text-center">{feature.description}</p>
                  
                  <div className="space-y-2">
                    {feature.details.map((detail, idx) => (
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

      {/* Luxury Amenities */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-6">Premium Amenities</h2>
            <p className="text-xl text-muted-foreground">
              Every VIP journey includes carefully curated amenities for maximum comfort and luxury
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {luxuryAmenities.map((category, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-primary/10 p-2 rounded-lg text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      {category.icon}
                    </div>
                    <h3 className="text-lg font-semibold">{category.category}</h3>
                  </div>
                  
                  <div className="space-y-2">
                    {category.items.map((item, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <Sparkles className="w-3 h-3 text-primary flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* VIP Packages */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-6">VIP Service Packages</h2>
            <p className="text-xl text-muted-foreground">
              Choose from our curated VIP packages or create a custom experience
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {vipPackages.map((pkg, index) => (
              <Card key={index} className={`group hover:shadow-xl transition-all duration-300 ${
                pkg.popular ? 'border-primary shadow-lg scale-105' : ''
              }`}>
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    {pkg.popular && (
                      <Badge className="mb-4">Most Popular</Badge>
                    )}
                    <h3 className="text-2xl mb-2">{pkg.name}</h3>
                    <div className="text-3xl font-bold text-primary mb-2">{pkg.price}</div>
                    <p className="text-muted-foreground text-sm">{pkg.description}</p>
                  </div>

                  <div className="space-y-3 mb-8">
                    {pkg.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-3">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button className={`w-full ${
                    pkg.popular ? 'bg-primary hover:bg-primary/90' : ''
                  }`} variant={pkg.popular ? 'default' : 'outline'}>
                    Select {pkg.name}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Client Types */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-6">Who We Serve</h2>
            <p className="text-xl text-muted-foreground">
              Our VIP service caters to distinguished clients with unique requirements
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {clientTypes.map((client, index) => (
              <Card key={index} className="text-center group hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="bg-primary/10 rounded-full p-4 w-fit mx-auto mb-4 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    {client.icon}
                  </div>
                  <h3 className="text-lg mb-3">{client.title}</h3>
                  <p className="text-sm text-muted-foreground">{client.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Gallery */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge variant="outline" className="mb-4">VIP Experience</Badge>
              <h2 className="text-4xl mb-6">Unforgettable Moments</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Every VIP journey is crafted to create lasting memories. From the moment 
                you step into our luxury vehicle until your arrival, every detail is 
                orchestrated to perfection.
              </p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-2 rounded-lg text-primary">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="mb-2">Instant Luxury</h4>
                    <p className="text-sm text-muted-foreground">
                      From booking to arrival, experience seamless luxury at every touchpoint.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-2 rounded-lg text-primary">
                    <Heart className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="mb-2">Personal Touch</h4>
                    <p className="text-sm text-muted-foreground">
                      Customized service that reflects your preferences and style.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-2 rounded-lg text-primary">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="mb-2">Complete Privacy</h4>
                    <p className="text-sm text-muted-foreground">
                      Absolute discretion and confidentiality for all VIP clients.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button size="lg">
                  Book VIP Experience
                </Button>
                <Button size="lg" variant="outline">
                  <Phone className="w-4 h-4 mr-2" />
                  VIP Concierge Line
                </Button>
              </div>
            </div>

            <div className="space-y-6">
              <Card className="bg-primary text-white">
                <CardContent className="p-6 text-center">
                  <Crown className="w-12 h-12 mx-auto mb-4" />
                  <h3 className="text-xl mb-3">VIP Membership</h3>
                  <p className="opacity-90 mb-4">
                    Join our exclusive VIP membership program for priority access, 
                    special rates, and personalized service benefits.
                  </p>
                  <Button variant="secondary" size="sm">
                    Learn More
                  </Button>
                </CardContent>
              </Card>

              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <Star className="w-8 h-8 mx-auto mb-2 text-primary" />
                    <div className="text-lg font-bold">5.0★</div>
                    <div className="text-xs text-muted-foreground">VIP Rating</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Clock className="w-8 h-8 mx-auto mb-2 text-primary" />
                    <div className="text-lg font-bold">24/7</div>
                    <div className="text-xs text-muted-foreground">VIP Support</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl mb-6">Ready for the VIP Treatment?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Experience luxury transportation like never before. Contact our VIP concierge 
            team to create your perfect journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              <Calendar className="w-4 h-4 mr-2" />
              Book VIP Service
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
              <Phone className="w-4 h-4 mr-2" />
              VIP Concierge: +33 1 42 60 30 30
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}