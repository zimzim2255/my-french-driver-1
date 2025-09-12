import { Users, Briefcase } from "lucide-react";
import { CompositeOnWhiteImage } from "./ui/CompositeOnWhiteImage";

export function VehicleFleet() {
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
    <section className="py-20 bg-background vehicle-fleet-section">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-semibold mb-6 text-foreground">
            Our fleet of vehicles
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            All our vehicles meet the highest expectations of our customers, Efficient vehicles for the environment chosen from the latest models of the year for their comfort and prestige.
          </p>
        </div>

        {/* Vehicle Grid */}
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {vehicles.map((vehicle, index) => (
            <div key={index} className="group">
              {/* Vehicle Image */}
              <div className="relative overflow-hidden rounded-none mb-6 aspect-[4/3] bg-white">
                <CompositeOnWhiteImage
                  src={vehicle.image}
                  alt={`${vehicle.model} - ${vehicle.category}`}
                  className="w-full h-full object-contain p-4 transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Vehicle Info */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-2xl font-semibold text-primary mb-2">
                    {vehicle.category}
                  </h3>
                  <h4 className="text-xl font-medium text-foreground mb-3">
                    {vehicle.model}
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {vehicle.description}
                  </p>
                </div>

                {/* Capacity Info */}
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
    </section>
  );
}