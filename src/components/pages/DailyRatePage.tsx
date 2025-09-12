import { getAssetPath } from "../../utils/assetPath";
import { ArrowLeft, Users, Briefcase, Shield, Clock, MapPin, Star } from "lucide-react";
import { Button } from "../ui/button";

export function DailyRatePage() {
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

  const benefits = [
    {
      title: "Comfort and safety",
      description: "By opting for our chauffeur-driven vehicle service, customers will be able to travel in complete peace of mind, in comfortable vehicles, driven by experienced drivers.",
      icon: Shield
    },
    {
      title: "Freedom of movement",
      description: "Customers will enjoy the freedom to travel at their own pace and as needed, without having to worry about driving or logistics.",
      icon: MapPin
    },
    {
      title: "Flexibility",
      description: "We are able to meet all our customers' requests, whether for a few hours, a whole day or even several hours, for a personalized and tailor-made service.",
      icon: Clock
    },
    {
      title: "Fixed rates",
      description: "We offer fixed and transparent rates for our chauffeur-driven vehicle service. Our customers will enjoy superior service at an affordable price.",
      icon: Star
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-muted/30 py-8">
        <div className="container mx-auto px-4">
          <Button 
            variant="ghost" 
            className="mb-4 hover:bg-primary/10"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Services
          </Button>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
            Daily Rate
          </h1>
          <h2 className="text-2xl md:text-3xl text-primary font-semibold">
            Provision of a Vehicle with Driver for Any Type of Event
          </h2>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-semibold mb-8 text-foreground">
              Take your time, your private driver is there for you!
            </h3>
          </div>
        </div>
      </section>

      {/* Top-of-the-range Service */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-3xl font-semibold mb-8 text-center text-foreground">
              A top-of-the-range service
            </h3>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  Our chauffeur-driven vehicle service is the ideal solution for customers who wish to have a vehicle and a driver at their disposal for a fixed period. Whether for business trips, tourist visits or special events, our service of providing vehicle with driver will allow you to move in peace and in all security.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Whether you need a vehicle for a few hours, an entire day or even several days, we are able to respond to all your requests. We offer competitive and transparent rates, and we are committed to providing a service top quality to satisfy all our customers.
                </p>
              </div>
              <div className="relative">
                <img 
                  src={getAssetPath("Nouveau site internet/MISE A DISPO.jpeg")}
                  alt="Daily Rate Service"
                  className="w-full h-80 object-cover rounded-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Complete Service */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-3xl font-semibold mb-8 text-center text-foreground">
              A COMPLETE SERVICE
            </h3>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                Our superior quality vehicles are driven by experienced professional drivers who know the roads of Paris and its surroundings perfectly. We are at your disposal for all your requests for the provision of a vehicle with driver, whether for travel punctual or regular reservations.
              </p>
              <p>
                We pride ourselves on providing superior service to all of our customers, and are committed to providing clean, safe, and well-equipped vehicles for all of our transportation services. We are available 24 hours a day, 7 days a week to answer all your personnel transport requests and we are committed to providing you with a fast and reliable response.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {benefits.map((benefit, index) => {
                const IconComponent = benefit.icon;
                return (
                  <div key={index} className="flex gap-6 p-6 rounded-2xl bg-background hover:shadow-lg transition-all">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-foreground mb-3">
                        {benefit.title}
                      </h4>
                      <p className="text-muted-foreground leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Fleet Section */}
      <section className="py-16">
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
              Need a dedicated driver for your journey?
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