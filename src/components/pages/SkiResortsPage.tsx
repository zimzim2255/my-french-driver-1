import { getAssetPath } from "../../utils/assetPath";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { 
  Mountain, 
  MapIcon, 
  CarTaxiFront,
  Newspaper,
  ArrowRight,
  CheckCircle,
  Star,
  Phone,
  Calendar,
  Snowflake,
  Clock,
  Shield,
  Award,
  Users,
  Car,
  Route,
  Thermometer
} from "lucide-react";

export function SkiResortsPage() {
  const skiServices = [
    {
      id: 'tours',
      title: 'City Tours',
      description: 'Discover the beauty of French Alpine cities and mountain villages with our guided tours.',
      icon: <MapIcon className="w-8 h-8" />,
      features: [
        'Chamonix and Mont Blanc tours',
        'Alpine village exploration',
        'Cultural and historical sites',
        'Professional local guides'
      ],
      link: 'tours',
      image: '/assets/Nouveau site internet/EXCURSION .jpeg'
    },
    {
      id: 'private-transportation',
      title: 'Private Transportation',
      description: 'Luxury private transportation to and from ski resorts with professional drivers.',
      icon: <CarTaxiFront className="w-8 h-8" />,
      features: [
        'Airport to resort transfers',
        'Inter-resort transportation',
        'Equipment transport service',
        'Flexible scheduling options'
      ],
      link: 'private-transportation',
      image: '/assets/Nouveau site internet/PICTURES OF FLEET/mercedes classe V .jpg'
    },
    {
      id: 'news',
      title: 'News & Updates',
      description: 'Stay informed about ski conditions, resort updates, and transportation news.',
      icon: <Newspaper className="w-8 h-8" />,
      features: [
        'Real-time ski conditions',
        'Resort opening schedules',
        'Weather updates',
        'Transportation alerts'
      ],
      link: 'news',
      image: '/assets/Nouveau site internet/HOME PAGE.jpeg'
    }
  ];

  const popularResorts = [
    {
      name: 'Chamonix-Mont-Blanc',
      distance: '1h 15min from Geneva',
      elevation: '1,035m - 3,842m',
      description: 'World-renowned ski resort at the foot of Mont Blanc',
      image: '/assets/Nouveau site internet/pictures Our french regions/mont st michel 3.jpg',
      features: ['Extreme skiing', 'Glacier access', 'Historic resort']
    },
    {
      name: 'Val d\'Isère',
      distance: '2h 30min from Lyon',
      elevation: '1,550m - 3,456m',
      description: 'Premium ski destination in the Tarentaise Valley',
      image: '/assets/Nouveau site internet/pictures Our french regions/chambord , les chateaux de la loire.jpg',
      features: ['Luxury amenities', 'Extensive ski area', 'Après-ski scene']
    },
    {
      name: 'Courchevel',
      distance: '2h from Lyon',
      elevation: '1,260m - 3,230m',
      description: 'Exclusive resort known for luxury and fine dining',
      image: '/assets/Nouveau site internet/pictures Our french regions/domaine de chantilly.jpg',
      features: ['Michelin restaurants', 'Luxury shopping', 'Helicopter access']
    },
    {
      name: 'Méribel',
      distance: '2h 15min from Lyon',
      elevation: '1,450m - 3,230m',
      description: 'Heart of the Three Valleys ski area',
      image: '/assets/Nouveau site internet/pictures Our french regions/versailles .jpg',
      features: ['Largest ski area', 'Family-friendly', 'Traditional architecture']
    }
  ];

  const keyBenefits = [
    {
      icon: <Mountain className="w-6 h-6" />,
      title: "Alpine Expertise",
      description: "Specialized knowledge of French Alpine regions and ski resorts"
    },
    {
      icon: <Snowflake className="w-6 h-6" />,
      title: "Winter Specialists",
      description: "Expert drivers trained for winter mountain conditions"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Safety First",
      description: "Winter-equipped vehicles and safety protocols"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Flexible Service",
      description: "Adaptable to weather conditions and ski schedules"
    }
  ];

  const stats = [
    { value: "15+", label: "Ski Resorts Served" },
    { value: "5000+", label: "Winter Transfers" },
    { value: "100%", label: "Winter Safety Record" },
    { value: "24/7", label: "Winter Support" }
  ];

  const winterServices = [
    {
      title: "Equipment Transport",
      description: "Safe transport of ski equipment and luggage",
      icon: <Car className="w-5 h-5" />
    },
    {
      title: "Multi-Resort Tours",
      description: "Visit multiple resorts in one trip",
      icon: <Route className="w-5 h-5" />
    },
    {
      title: "Weather Monitoring",
      description: "Real-time weather and road condition updates",
      icon: <Thermometer className="w-5 h-5" />
    },
    {
      title: "Group Transportation",
      description: "Large group transfers for ski parties",
      icon: <Users className="w-5 h-5" />
    }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src={getAssetPath("Nouveau site internet/EXCURSION .jpeg")}
            alt="French ski resorts"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-white/30">
              Ski Resorts Transportation
            </Badge>
            <h1 className="text-5xl md:text-6xl mb-6">
              French Alpine Adventures
            </h1>
            <p className="text-xl mb-8 text-gray-200">
              Experience the magic of French ski resorts with our premium transportation services. 
              From luxury transfers to guided tours, we make your Alpine adventure unforgettable.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                <Mountain className="w-4 h-4 mr-2" />
                Explore Ski Services
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                View Resort Tours
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits Overview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-6">Alpine Transportation Excellence</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our specialized ski resort transportation services combine Alpine expertise 
              with luxury comfort for the perfect mountain experience.
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

      {/* Ski Services */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-6">Comprehensive Ski Resort Services</h2>
            <p className="text-xl text-muted-foreground">
              Everything you need for the perfect Alpine experience
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {skiServices.map((service, index) => (
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

      {/* Popular Ski Resorts */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-6">Popular French Ski Resorts</h2>
            <p className="text-xl text-muted-foreground">
              Discover the most prestigious ski destinations in the French Alps
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {popularResorts.map((resort, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="aspect-[4/3] overflow-hidden">
                  <ImageWithFallback
                    src={resort.image}
                    alt={resort.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="text-lg mb-2">{resort.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{resort.description}</p>
                  
                  <div className="space-y-1 mb-4 text-xs">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-3 h-3 text-primary" />
                      <span>{resort.distance}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mountain className="w-3 h-3 text-primary" />
                      <span>{resort.elevation}</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    {resort.features.map((feature, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs mr-1 mb-1">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Winter Services */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge variant="outline" className="mb-4">Winter Specialization</Badge>
              <h2 className="text-4xl mb-6">Expert Winter Transportation</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Our specialized winter services ensure safe, comfortable, and reliable 
                transportation throughout the ski season. From equipment transport to 
                weather monitoring, we handle every detail.
              </p>

              <div className="space-y-6">
                {winterServices.map((service, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="bg-primary/10 p-2 rounded-lg text-primary">
                      {service.icon}
                    </div>
                    <div>
                      <h4 className="mb-2">{service.title}</h4>
                      <p className="text-sm text-muted-foreground">{service.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button size="lg">
                  Book Winter Transfer
                </Button>
                <Button size="lg" variant="outline">
                  <Phone className="w-4 h-4 mr-2" />
                  Winter Hotline
                </Button>
              </div>
            </div>

            <div className="space-y-6">
              <Card className="bg-primary text-white">
                <CardContent className="p-6 text-center">
                  <Snowflake className="w-12 h-12 mx-auto mb-4" />
                  <h3 className="text-xl mb-3">Winter Ready Fleet</h3>
                  <p className="opacity-90 mb-4">
                    All our vehicles are equipped with winter tires, chains, and 
                    emergency equipment for safe Alpine travel.
                  </p>
                  <Button variant="secondary" size="sm">
                    View Fleet
                  </Button>
                </CardContent>
              </Card>

              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <Thermometer className="w-8 h-8 mx-auto mb-2 text-primary" />
                    <div className="text-lg font-bold">-20°C</div>
                    <div className="text-xs text-muted-foreground">Operating Range</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Mountain className="w-8 h-8 mx-auto mb-2 text-primary" />
                    <div className="text-lg font-bold">3000m</div>
                    <div className="text-xs text-muted-foreground">Max Altitude</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-8 text-center">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <blockquote className="text-xl text-muted-foreground mb-6 italic">
                "My French Driver made our ski trip to Chamonix absolutely perfect. The driver was 
                knowledgeable about the mountain roads, helped with our equipment, and even gave us 
                great recommendations for restaurants. Professional service from start to finish!"
              </blockquote>
              <div>
                <div className="font-semibold text-lg">Sarah & Michael Johnson</div>
                <div className="text-muted-foreground">Ski Enthusiasts from London</div>
                <div className="text-sm text-muted-foreground">Chamonix Transfer Service</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl mb-6">Ready for Your Alpine Adventure?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Book your ski resort transportation today and experience the French Alps 
            with comfort, safety, and style.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              <Calendar className="w-4 h-4 mr-2" />
              Book Ski Transfer
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
              <Phone className="w-4 h-4 mr-2" />
              Call: +33 1 42 60 30 30
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}