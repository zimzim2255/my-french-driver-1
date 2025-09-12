import { getAssetPath } from "../../utils/assetPath";
import { ArrowLeft, Users, Briefcase, MapPin, Wine, Anchor } from "lucide-react";
import { Button } from "../ui/button";
import { CompositeOnWhiteImage } from "../ui/CompositeOnWhiteImage";

export function ToursPage() {
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
          <img
            src={getAssetPath("Nouveau site internet/arc-de-triomphe.jpeg")}
            alt="Paris Tours"
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
            <h1 className="text-5xl md:text-6xl mb-6 font-bold text-white drop-shadow-lg">
              Discover France with Style
            </h1>
            <h2 className="text-2xl md:text-3xl mb-8 text-white font-medium drop-shadow-md">
              Explore France at your own pace with our private excursions
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                <MapPin className="w-4 h-4 mr-2" />
                Explore Tours
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                Custom Itinerary
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-semibold mb-8 text-primary">
              My French Driver offers tailor-made stays to live a unique experience in Paris and its surroundings according to your needs and desires.
            </h3>
          </div>
        </div>
      </section>

      {/* Paris Tours */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-semibold mb-8 text-foreground">
                  Visit Paris with Your Private Driver
                </h3>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  Paris is an inexhaustible source of inspiration. Whatever you want to explore the city's historical monuments, parks and gardens, gourmet cuisine, cultural treasures, luxury boutiques etc etc your driver will be able to guide you and help you discover the capital's must-see sites.
                </p>
              </div>
              <div className="relative">
                <img 
                  src={getAssetPath("Nouveau site internet/arc-de-triomphe.jpeg")}
                  alt="Paris Tours"
                  className="w-full h-80 object-cover rounded-2xl"
                />
              </div>
            </div>

            <div className="mt-16">
              <h4 className="text-2xl font-semibold mb-8 text-foreground">
                In Paris
              </h4>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Enjoy your visit to Paris without having to worry about logistical details. Our reliable and professional passenger transport service will take you safely through the city, so you can focus on the beauty of Paris.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Champagne Tour */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <img 
                  src={getAssetPath("Nouveau site internet/champagne tour .jpg")}
                  alt="Champagne Tour"
                  className="w-full h-80 object-cover rounded-2xl"
                />
              </div>
              <div>
                <div className="flex items-center mb-6">
                  <Wine className="w-8 h-8 text-primary mr-4" />
                  <h3 className="text-3xl font-semibold text-foreground">
                    Champagne Tour
                  </h3>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  What would a trip to France be without a visit to Champagne, about an hour and a half east of Paris? The cities of Reims and Epernay are at the epicenter of Champagne production. Let yourself be guided on the Champagne Route, stop to visit the famous wine estates and enjoy the beautiful landscapes where the vineyards stretch as far as the eye can see.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Landing Beaches */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center mb-6">
                  <Anchor className="w-8 h-8 text-primary mr-4" />
                  <h3 className="text-3xl font-semibold text-foreground">
                    The landing beaches
                  </h3>
                </div>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  Immerse yourself in one of the decisive parts of Western history. More than 70 years after Operation Overlord changed the course of history on June 6, 1944 by liberating France from the Nazis, make a pilgrimage to these famous battlefields steeped in history.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Your driver will show you the main D-Day landing sites. From legendary Omaha Beach to Utah Beach and Sainte-Mère-Église, relive 'the longest day' at your own pace.
                </p>
              </div>
              <div className="relative">
                <img 
                  src={getAssetPath("Nouveau site internet/pictures Our french regions/plage du debarquement 3.jpg")}
                  alt="D-Day Landing Beaches"
                  className="w-full h-80 object-cover rounded-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* French Regions */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-6">
                <MapPin className="w-8 h-8 text-primary mr-4" />
                <h3 className="text-3xl font-semibold text-foreground">
                  Our Regions of France...
                </h3>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-4xl mx-auto">
                My French Driver highlights the French art of living as well as the historical and cultural heritage of our country. You can depart from Paris to visit the castles, the vineyards of the Champagne region or even make a trip to the sea.
              </p>
            </div>

            {/* Regional Destinations Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-2xl mb-4">
                  <img 
                    src={getAssetPath("Nouveau site internet/pictures Our french regions/versailles .jpg")}
                    alt="Versailles"
                    className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all duration-300"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h4 className="text-xl font-semibold">Versailles</h4>
                    <p className="text-sm opacity-90">Royal Palace & Gardens</p>
                  </div>
                </div>
              </div>

              <div className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-2xl mb-4">
                  <img 
                    src={getAssetPath("Nouveau site internet/pictures Our french regions/mont saint michel.jpg")}
                    alt="Mont Saint Michel"
                    className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all duration-300"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h4 className="text-xl font-semibold">Mont Saint Michel</h4>
                    <p className="text-sm opacity-90">Medieval Abbey</p>
                  </div>
                </div>
              </div>

              <div className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-2xl mb-4">
                  <img 
                    src={getAssetPath("Nouveau site internet/pictures Our french regions/giverny.jpeg")}
                    alt="Giverny"
                    className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all duration-300"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h4 className="text-xl font-semibold">Giverny</h4>
                    <p className="text-sm opacity-90">Monet's Gardens</p>
                  </div>
                </div>
              </div>

              <div className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-2xl mb-4">
                  <img 
                    src={getAssetPath("Nouveau site internet/pictures Our french regions/fontainebleau .jpeg")}
                    alt="Fontainebleau"
                    className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all duration-300"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h4 className="text-xl font-semibold">Fontainebleau</h4>
                    <p className="text-sm opacity-90">Royal Castle & Forest</p>
                  </div>
                </div>
              </div>

              <div className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-2xl mb-4">
                  <img 
                    src={getAssetPath("Nouveau site internet/pictures Our french regions/domaine de chantilly.jpg")}
                    alt="Chantilly"
                    className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all duration-300"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h4 className="text-xl font-semibold">Chantilly</h4>
                    <p className="text-sm opacity-90">Castle & Horse Museum</p>
                  </div>
                </div>
              </div>

              <div className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-2xl mb-4">
                  <img 
                    src={getAssetPath("Nouveau site internet/pictures Our french regions/chateau de la loire.jpg")}
                    alt="Loire Valley"
                    className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all duration-300"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h4 className="text-xl font-semibold">Loire Valley</h4>
                    <p className="text-sm opacity-90">Renaissance Castles</p>
                  </div>
                </div>
              </div>
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
                  <div className="relative overflow-hidden rounded-2xl mb-6 aspect-[4/3] bg-white">
                    <CompositeOnWhiteImage
                      src={vehicle.image}
                      alt={`${vehicle.model} - ${vehicle.category}`}
                      className="w-full h-full object-contain p-4 transition-transform duration-700 group-hover:scale-105"
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
              Ready to explore France with your private driver?
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