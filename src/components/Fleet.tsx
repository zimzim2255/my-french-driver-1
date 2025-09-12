import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import InfoCardDialog from './ui/info-card-dialog';
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { CompositeOnWhiteImage } from "./ui/CompositeOnWhiteImage";
import { 
  Users, 
  Briefcase, 
  Wifi, 
  Shield,
  Car,
  Crown,
  Star
} from "lucide-react";

export function Fleet() {
  const vehicles = [
    {
      category: "Business Class",
      model: "Mercedes E-Class",
      passengers: "1-3",
      luggage: "3",
      features: ["WiFi", "Climate Control", "Premium Sound", "Phone Charger"],
      description: "Perfect for business meetings and airport transfers with professional comfort.",
      price: "From €80/hour",
      badge: "Most Popular",
      image: "assets/Nouveau site internet/PICTURES OF FLEET/classe E.png"
    },
    {
      category: "First Class", 
      model: "Mercedes S-Class",
      passengers: "1-3",
      luggage: "4",
      features: ["WiFi", "Massage Seats", "Champagne Bar", "Privacy Glass"],
      description: "Ultimate luxury for VIP transportation and special occasions.",
      price: "From €120/hour",
      badge: "Premium",
      image: "assets/Nouveau site internet/notre flotte.jpeg"
    },
    {
      category: "Group Travel",
      model: "Mercedes V-Class",
      passengers: "1-7",
      luggage: "8",
      features: ["WiFi", "Conference Table", "Individual Seats", "Extra Space"],
      description: "Spacious luxury van perfect for group travel and family occasions.",
      price: "From €140/hour",
      badge: "Family",
      image: "assets/Nouveau site internet/PICTURES OF FLEET/mercedes classe V .jpg"
    }
  ];

  return (
    <section id="fleet" className="py-20 bg-muted/30 flex flex-col justify-center">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">Our Fleet</Badge>
          <h2 className="text-4xl md:text-5xl mb-6">
            Luxury Vehicles for Every Occasion
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our meticulously maintained fleet of premium Mercedes vehicles ensures 
            comfort, safety, and style for all your transportation needs.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {vehicles.map((vehicle, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 relative overflow-hidden">
              {vehicle.badge && (
                <div className="absolute top-4 right-4 z-10">
                  <Badge 
                    variant={vehicle.badge === "Premium" ? "default" : "secondary"}
                    className={vehicle.badge === "Premium" ? "bg-primary" : ""}
                  >
                    {vehicle.badge}
                  </Badge>
                </div>
              )}
              
              {/* Vehicle Image */}
              <div className="aspect-video overflow-hidden bg-white">
                {vehicle.model === "Mercedes V-Class" ? (
                  <CompositeOnWhiteImage
                    src={vehicle.image}
                    alt={vehicle.model}
                    className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <ImageWithFallback
                    src={vehicle.image}
                    alt={vehicle.model}
                    className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                  />
                )}
              </div>
              
              <CardContent className="p-6">
                <div className="mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Car className="w-5 h-5 text-primary" />
                    <span className="text-sm text-muted-foreground">{vehicle.category}</span>
                  </div>
                  <h3 className="text-2xl mb-2">{vehicle.model}</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {vehicle.description}
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-primary" />
                    <span className="text-sm">{vehicle.passengers} passengers</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Briefcase className="w-4 h-4 text-primary" />
                    <span className="text-sm">{vehicle.luggage} luggage</span>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-sm mb-3 flex items-center">
                    <Star className="w-4 h-4 mr-1" />
                    Features
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {vehicle.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-xs text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
                
                 <div className="flex items-center justify-end pt-4 border-t">
                  <InfoCardDialog title={vehicle.model} description={vehicle.description} adminHref="/#fleet">
                    <Button size="sm" className="group-hover:bg-primary group-hover:text-white">
                      Select Vehicle
                    </Button>
                  </InfoCardDialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <div className="bg-card p-8 rounded-lg max-w-2xl mx-auto">
            <Shield className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h3 className="text-xl mb-4">Premium Fleet Standards</h3>
            <p className="text-muted-foreground mb-6">
              All vehicles are less than 3 years old, professionally maintained, 
              fully insured, and equipped with the latest safety features.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Badge variant="outline">GPS Tracking</Badge>
              <Badge variant="outline">Professional Drivers</Badge>
              <Badge variant="outline">24/7 Support</Badge>
              <Badge variant="outline">Fully Insured</Badge>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
