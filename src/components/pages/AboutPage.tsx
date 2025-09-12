import { getAssetPath } from "../../utils/assetPath";
import { About } from "../About";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { 
  Heart, 
  Clock, 
  Shield,
  Award,
  Users,
  TrendingUp,
  Star,
  Globe,
  CheckCircle,
  Quote,
  Calendar,
  MapPin
} from "lucide-react";

export function AboutPage() {
  const timeline = [
    {
      year: "2017",
      title: "Company Founded",
      description: "My French Driver was established with a vision to revolutionize premium transportation in Paris.",
      icon: <Calendar className="w-6 h-6" />
    },
    {
      year: "2018",
      title: "Fleet Expansion",
      description: "Added luxury Mercedes vehicles and expanded service coverage throughout Île-de-France.",
      icon: <TrendingUp className="w-6 h-6" />
    },
    {
      year: "2019",
      title: "Corporate Services",
      description: "Launched dedicated corporate transportation services with account management.",
      icon: <Users className="w-6 h-6" />
    },
    {
      year: "2020-2021",
      title: "Resilience & Innovation",
      description: "Adapted services during challenging times, implementing enhanced safety protocols.",
      icon: <Shield className="w-6 h-6" />
    },
    {
      year: "2022",
      title: "Service Excellence",
      description: "Achieved 4.9-star customer rating and expanded to special event transportation.",
      icon: <Star className="w-6 h-6" />
    },
    {
      year: "2023-2025",
      title: "Premium Leadership",
      description: "Established as Paris's premier luxury transportation service with 50,000+ successful rides.",
      icon: <Award className="w-6 h-6" />
    }
  ];

  const team = [
    {
      name: "Jean-Pierre Dubois",
      role: "Founder & CEO",
      description: "20+ years in luxury hospitality and transportation industry",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop"
    },
    {
      name: "Marie Laurent",
      role: "Operations Manager",
      description: "Expert in logistics and customer service excellence",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b1a9?w=300&h=300&fit=crop"
    },
    {
      name: "Antoine Martin",
      role: "Fleet Manager",
      description: "Mercedes specialist ensuring vehicle perfection",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop"
    }
  ];

  const testimonials = [
    {
      quote: "My French Driver provided exceptional service for our wedding. Every detail was perfect, from the decorated car to the professional chauffeur. Highly recommended!",
      author: "Sophie & Thomas",
      occasion: "Wedding Transportation"
    },
    {
      quote: "As a business executive, I rely on punctual and comfortable transportation. My French Driver consistently exceeds expectations with their premium service.",
      author: "David Richardson",
      occasion: "Corporate Client"
    },
    {
      quote: "The city tour was absolutely wonderful. Our driver was knowledgeable, friendly, and made our Paris experience unforgettable. The Mercedes was immaculate.",
      author: "Jennifer & Mark",
      occasion: "Tourism Service"
    }
  ];

  const certifications = [
    "Licensed Transportation Provider",
    "Comprehensive Insurance Coverage",
    "Professional Chauffeur Certification",
    "Mercedes-Benz Authorized Service",
    "Tourism Industry Accreditation",
    "Safety Standards Compliance"
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src={getAssetPath("Nouveau site internet/notre marque 1.jpg")}
            alt="About My French Driver"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/80"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <Badge variant="secondary" className="mb-4 bg-black/60 text-white border-white/50 font-semibold">About My French Driver</Badge>
            <h1 className="text-5xl md:text-6xl mb-6 font-bold text-white drop-shadow-lg">
              Excellence in Motion Since 2017
            </h1>
            <p className="text-xl mb-8 text-white font-medium drop-shadow-md">
              Founded with a passion for luxury and a commitment to excellence, My French Driver 
              has become Paris's premier transportation service. Our story is one of dedication, 
              innovation, and unwavering focus on customer satisfaction.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                <Users className="w-4 h-4 mr-2" />
                Meet Our Team
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                Our Services
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl mb-8">Our Mission & Values</h2>
              
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-lg text-primary flex-shrink-0">
                    <Heart className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl mb-3">Comfort</h3>
                    <p className="text-muted-foreground">
                      We believe every journey should be a luxurious experience. Our premium vehicles 
                      and personalized service ensure maximum comfort for every passenger.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-lg text-primary flex-shrink-0">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl mb-3">Punctuality</h3>
                    <p className="text-muted-foreground">
                      Time is precious. Our commitment to punctuality means you can rely on us 
                      for on-time service, whether for business meetings or special occasions.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-lg text-primary flex-shrink-0">
                    <Shield className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl mb-3">Discretion</h3>
                    <p className="text-muted-foreground">
                      Professional, confidential service that respects your privacy. Our chauffeurs 
                      are trained to provide discrete, courteous service at all times.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <ImageWithFallback
                src={getAssetPath("Nouveau site internet/notre marque 2.jpeg")}
                alt="Paris luxury transportation"
                className="w-full h-80 object-cover rounded-lg"
              />
              
              <div className="grid grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl text-primary mb-1">8+</div>
                    <div className="text-xs text-muted-foreground">Years Experience</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl text-primary mb-1">50K+</div>
                    <div className="text-xs text-muted-foreground">Happy Clients</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl text-primary mb-1">4.9★</div>
                    <div className="text-xs text-muted-foreground">Rating</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Timeline */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-6">Our Journey</h2>
            <p className="text-xl text-muted-foreground">
              From startup to industry leader - the My French Driver story
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {timeline.map((event, index) => (
                <div key={index} className={`flex items-center gap-8 ${
                  index % 2 === 1 ? 'flex-row-reverse' : ''
                }`}>
                  <div className={`flex-1 ${index % 2 === 1 ? 'text-right' : ''}`}>
                    <Card className="hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-3">
                          {index % 2 === 0 && (
                            <div className="bg-primary/10 p-2 rounded-lg text-primary">
                              {event.icon}
                            </div>
                          )}
                          <div>
                            <Badge variant="outline" className="mb-2">{event.year}</Badge>
                            <h3 className="text-lg">{event.title}</h3>
                          </div>
                          {index % 2 === 1 && (
                            <div className="bg-primary/10 p-2 rounded-lg text-primary">
                              {event.icon}
                            </div>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{event.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="w-4 h-4 bg-primary rounded-full flex-shrink-0"></div>
                  <div className="flex-1"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-6">Meet Our Team</h2>
            <p className="text-xl text-muted-foreground">
              The passionate professionals behind My French Driver's success
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <Card key={index} className="text-center group hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="relative mb-6">
                    <ImageWithFallback
                      src={member.image}
                      alt={member.name}
                      className="w-32 h-32 rounded-full mx-auto object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="text-xl mb-2">{member.name}</h3>
                  <Badge variant="secondary" className="mb-3">{member.role}</Badge>
                  <p className="text-sm text-muted-foreground">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Original About Component */}
      <About />

      {/* Testimonials */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-6">What Our Clients Say</h2>
            <p className="text-xl text-muted-foreground">
              Hear from satisfied customers who have experienced our premium service
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <Quote className="w-8 h-8 text-primary mb-4" />
                  <p className="text-muted-foreground mb-6 italic">"{testimonial.quote}"</p>
                  <div>
                    <div className="mb-1">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.occasion}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications & Standards */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-6">Certifications & Standards</h2>
            <p className="text-xl text-muted-foreground">
              We maintain the highest professional standards and certifications
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {certifications.map((cert, index) => (
              <div key={index} className="flex items-center space-x-3 bg-background p-4 rounded-lg border">
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-sm">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl mb-6">Experience the My French Driver Difference</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have chosen My French Driver for their 
            luxury transportation needs in Paris and beyond.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              <Calendar className="w-4 h-4 mr-2" />
              Book Your Ride
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
              <MapPin className="w-4 h-4 mr-2" />
              Our Services
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}