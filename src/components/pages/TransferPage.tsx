import { getAssetPath } from "../../utils/assetPath";
import { Plane, Clock, Shield, MapPin, Users, Briefcase, Star, Phone } from "lucide-react";
import { Button } from "../ui/button";

export function TransferPage() {
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

  const privileges = [
    {
      title: "FLIGHT TRACKING",
      description: "Your driver will know your flight number and will be aware of your arrival in real time. He will be waiting for you 15 minutes before your arrival time to ensure safe pick-up.",
      icon: Plane
    },
    {
      title: "NO WAITING CHARGES",
      description: "We guarantee you a fixed rate with no additional charges for waiting time in case your flight is delayed.",
      icon: Clock
    },
    {
      title: "Personalized welcome",
      description: "As soon as you arrive, your driver will be waiting for you at the luggage exit or at a meeting place agreed together with a tablet with your name, so you can easily recognize him and ensure a discreet pick-up.",
      icon: Star
    },
    {
      title: "YOUR DRIVER",
      description: "A few minutes before the arrival of your flight, you will receive an SMS informing you of the arrival of your driver. For any delay or other last minute unforeseen event, your driver will be reachable by phone if necessary with the mobile number you will have received.",
      icon: Phone
    }
  ];

  const benefits = [
    {
      title: "Price",
      description: "The price of the transfer is fixed without supplement to avoid any unpleasant surprises. includes taxes, tolls and waiting time at the airport."
    },
    {
      title: "Comfort",
      description: "You still get the car you reserved. You only share it with the people traveling with you. Our vehicles are chosen from the latest models of manufacturers and renewed every two years."
    },
    {
      title: "Security",
      description: "Each vehicle in the My French Driver fleet is regularly inspected. You can trust us: you are in a reliable car driven by an expert driver."
    },
    {
      title: "No delays",
      description: "Your driver always arrives at the specified time or checks your flight arrival time. Airport pick-up with a name sign is also included in the price of the service."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={getAssetPath("Nouveau site internet/aiport transfer 1.jpeg")}
            alt="Airport Transfers"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/70"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Transfers
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold opacity-90">
              at Parisian Airports
            </h2>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-semibold mb-8 text-foreground">
              Airport transfer to your destination
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              No need to stress anymore. Let us accompany you to your FLIGHT or to reach your place of stay or your home with complete peace of mind after your business or private trip by reserving your trip in advance.
            </p>
          </div>
        </div>
      </section>

      {/* All-inclusive Transfer */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-3xl font-semibold mb-8 text-center text-foreground">
              All-inclusive transfer
            </h3>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  If you've just gotten off your plane, exhausted after a long trip, <strong className="text-primary">My French Driver</strong> is the best solution if you want extra peace of mind on arrival and during your stay.
                </p>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  Whether at <strong className="text-foreground">Charles de Gaulle, Le Bourget, Orly or Beauvais-Tille,</strong> we offer you a top-of-the-range and personalized service.
                </p>
              </div>
              <div className="relative">
                <img 
                  src={getAssetPath("Nouveau site internet/aiport transfer 1.jpeg")}
                  alt="Airport Transfer"
                  className="w-full h-80 object-cover rounded-none"
                />
              </div>
            </div>
            
            <div className="mt-12 space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                Your private driver will be professional and courteous, and will welcome you on your arrival at the airport. He will carry a sign with your name or the name of your company to facilitate the appointment. He will help you with your luggage and drive you to a luxurious and comfortable vehicle.
              </p>
              <p>
                The vehicles used for airport transfers are of high quality and offer options for individual travelers as well as larger groups. You can choose between Motorcycle, Sedan, Van or First class depending on your specific needs.
              </p>
              <p>
                Our drivers are handpicked and have a perfect knowledge of the local roads, If you have special requests, such as stops along the way to buy items or groceries, or if you need to change the itinerary due to a change of plan, your private driver will be happy to assist you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Privileges */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-3xl font-semibold mb-12 text-center text-foreground">
              YOUR PRIVILEGES
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              {privileges.map((privilege, index) => {
                const IconComponent = privilege.icon;
                return (
                  <div key={index} className="flex gap-6 p-6 rounded-none bg-muted/20 hover:bg-muted/30 transition-colors">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-primary/10 rounded-none flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-3">
                        {privilege.title}
                      </h4>
                      <p className="text-muted-foreground leading-relaxed">
                        {privilege.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* VIP Greeter Service */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-semibold mb-8 text-foreground">
              YOUR VIP BENEFITS: GREETER
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              We offer you an additional <strong className="text-primary">VIP service</strong> on your arrival or on your departure in the company of a <strong className="text-primary">Greeter</strong>, having a greeter at the airport is a great way to start or end your trip in complete peace of mind.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              <strong className="text-foreground">The greeter</strong> welcomes you <strong className="text-foreground">on arrival</strong> or <strong className="text-foreground">departure</strong> and guides you through customs formalities, helping you save time and avoid queues. He installs you in the <strong className="text-foreground">VIP lounge</strong> and escorts you to your vehicle, he can also give you useful <strong className="text-foreground">advice</strong> on the region and <strong className="text-foreground">personalize</strong> your stay according to your interests and preferences.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center p-6 rounded-none bg-muted/10 hover:bg-muted/20 transition-colors">
                  <h4 className="text-xl font-semibold text-primary mb-4">
                    {benefit.title}
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
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
                  <div className="relative overflow-hidden rounded-none mb-6 aspect-[4/3]">
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

      {/* Paris Stopover */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-semibold mb-8 text-foreground">
              VISIT PARIS DURING A STOPOVER?
            </h3>
            <h4 className="text-xl font-medium text-muted-foreground mb-8 leading-relaxed">
              On a stopover in Paris but without much time to explore the capital? With this visit, we will make you discover the most essential places of the city of light!
            </h4>
            <p className="text-lg text-muted-foreground leading-relaxed">
              This stopover tour in Paris is private: it includes the vehicle, a driver waiting for you at the airport, pick-up and round-trip transfer. We will be waiting for you at the terminal as soon as you arrive with a sign in your name and, depending on the duration of your stopover, you will enjoy the mythical city of Paris for more or less time: from the Eiffel Tower to Notre Dame via the Champs Elysées, Anyway, you can design the itinerary according to your desires!
            </p>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-semibold mb-6 text-foreground">
              Are you interested in one of our services?
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