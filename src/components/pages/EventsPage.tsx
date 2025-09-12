import { getAssetPath } from "../../utils/assetPath";
import { ArrowLeft, Users, Briefcase, Calendar, Star, Shield, Clock } from "lucide-react";
import { Button } from "../ui/button";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Badge } from "../ui/badge";

export function EventsPage() {
  const vehicles = [
    {
      category: "Sedan",
      model: "Mercedes C-Class",
      description: "Top of the range for a unique experience in a refined sedan.",
      passengers: 2,
      suitcases: 2,
      image: "assets/Nouveau site internet/PICTURES OF FLEET/mercedes classe C baniere .png"
    },
    {
      category: "Business Class",
      model: "Mercedes E-Class",
      description: "Prestige and excellence, you are our VIP will appreciate the incomparable comfort of a luxurious sedan",
      passengers: 2,
      suitcases: 2,
      image: "assets/Nouveau site internet/PICTURES OF FLEET/classe E.png"
    },
    {
      category: "First Class",
      model: "Mercedes S-Class",
      description: "It is the ultimate reference of high-end sedans. With LCD TVs and exceptional quality of materials.",
      passengers: 2,
      suitcases: 2,
      image: "assets/Nouveau site internet/notre flotte.jpeg"
    },
    {
      category: "Van",
      model: "Mercedes V-Class",
      description: "Take advantage of the many seats and the lounge layout of the most elegant minivan on the market.",
      passengers: 7,
      suitcases: 6,
      image: "assets/Nouveau site internet/PICTURES OF FLEET/mercedes classe V .jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src={getAssetPath("Nouveau site internet/diplomatie.jpeg")}
            alt="Event transportation"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/80"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <Button 
              variant="ghost" 
              className="mb-4 hover:bg-black/40 text-white border-white/50 font-semibold"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Services
            </Button>
            <Badge variant="secondary" className="mb-4 bg-black/60 text-white border-white/50 font-semibold">
              Event Transportation
            </Badge>
            <h1 className="text-5xl md:text-6xl mb-6 font-bold text-white drop-shadow-lg">
              Professional Event Transportation
            </h1>
            <p className="text-xl mb-8 text-white font-medium drop-shadow-md">
              Elegant and efficient transportation solutions for all your professional and private events. 
              From corporate galas to intimate celebrations, we ensure your guests arrive in style.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                <Calendar className="w-4 h-4 mr-2" />
                Plan Event Transport
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                Get Custom Quote
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-semibold mb-8 text-foreground leading-relaxed">
              Are you organizing a professional or private event and looking for an efficient and personalized transport solution for your guests? Our private transport service is there to meet all your expectations and offer you a quality service for all your events.
            </h3>
          </div>
        </div>
      </section>

      {/* Service Overview */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-semibold mb-8 text-foreground">
                  A service adapted to your private and corporate events.
                </h3>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  Are you organizing an important event, is it a gala, a conference or a corporate event? Our passenger transport service with private driver offers you an elegant and practical transport solution for all your events.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  We have a fleet of recent and comfortable vehicles, suitable for all types of events, from trade shows to weddings, including private parties and concerts. We offer sedans, vans, high-end sedans and minibuses to meet all your accommodation capacity requirements.
                </p>
              </div>
              <div className="relative">
                <img 
                  src={getAssetPath("Nouveau site internet/BUSINESS.jpeg")}
                  alt="Event Transportation"
                  className="w-full h-80 object-cover rounded-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customized Service */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="space-y-8 text-lg text-muted-foreground leading-relaxed">
              <p>
                Our event transport service adapts to your needs and requirements, whether you need a transfer for your guests from an airport, train station or hotel, or whether you want to organize a sightseeing tour to discover the attractions of the city. We are here to offer you a tailor-made service, with customization options to meet all your needs.
              </p>
              <p>
                Our team of professional drivers are trained to provide top quality service, with attention to detail to meet all your requirements. They are courteous, punctual and discreet to guarantee the satisfaction of your guests throughout the event.
              </p>
              <p>
                We also provide you with concierge services to meet all your special requests, such as restaurant reservations, finding accommodation or managing the logistical organization of your event.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Features */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6 rounded-2xl bg-background hover:shadow-lg transition-all">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Calendar className="w-8 h-8 text-primary" />
                </div>
                <h4 className="text-xl font-semibold text-foreground mb-4">
                  Event Planning
                </h4>
                <p className="text-muted-foreground leading-relaxed">
                  Complete logistical support for all types of events, from corporate meetings to private celebrations.
                </p>
              </div>

              <div className="text-center p-6 rounded-2xl bg-background hover:shadow-lg transition-all">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Star className="w-8 h-8 text-primary" />
                </div>
                <h4 className="text-xl font-semibold text-foreground mb-4">
                  Professional Service
                </h4>
                <p className="text-muted-foreground leading-relaxed">
                  Courteous, punctual and discreet drivers trained to provide top quality service for your guests.
                </p>
              </div>

              <div className="text-center p-6 rounded-2xl bg-background hover:shadow-lg transition-all">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <h4 className="text-xl font-semibold text-foreground mb-4">
                  Concierge Services
                </h4>
                <p className="text-muted-foreground leading-relaxed">
                  Additional services including restaurant reservations, accommodation assistance, and event logistics.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Commitment */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Our commitment is to offer you an impeccable transport experience for your event, with comfortable vehicles and a team of professional drivers. <strong className="text-primary">Contact us now</strong> to book your event <strong className="text-primary">transport service</strong> and discover our personalized services for your <strong className="text-primary">event.</strong>
            </p>
          </div>
        </div>
      </section>

      {/* Fleet Section */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h3 className="text-3xl font-semibold mb-6 text-foreground">
                Our fleet of vehicles
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                All our vehicles meet the highest expectations of our customers, Efficient vehicles for the environment chosen from the latest models of the year for their comfort and prestige.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              {vehicles.map((vehicle, index) => (
                <div key={index} className="group">
                  <div className="relative overflow-hidden rounded-2xl mb-6 aspect-[4/3]">
                    <img
                      src={vehicle.image}
                      alt={`${vehicle.model} - ${vehicle.category}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-2xl font-semibold text-primary mb-2">
                        {vehicle.category}
                      </h4>
                      <h5 className="text-xl font-medium text-foreground mb-3">
                        {vehicle.model}
                      </h5>
                      <p className="text-muted-foreground leading-relaxed">
                        {vehicle.description}
                      </p>
                    </div>

                    <div className="flex items-center space-x-6 pt-4">
                      <div className="flex items-center space-x-2">
                        <Users className="w-5 h-5 text-primary" />
                        <span className="text-foreground font-medium">
                          {vehicle.passengers} People
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Briefcase className="w-5 h-5 text-primary" />
                        <span className="text-foreground font-medium">
                          {vehicle.suitcases} Suitcases
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-semibold mb-6 text-foreground">
              Planning an event and need professional transportation?
            </h3>
            <h4 className="text-3xl font-bold text-primary mb-8">
              Contact us for more information
            </h4>
            <Button size="lg" className="px-8 py-3">
              Get in Touch
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}