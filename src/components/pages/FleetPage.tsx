import { getAssetPath } from "../../utils/assetPath";
import { Fleet } from "../Fleet";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { CompositeOnWhiteImage } from "../ui/CompositeOnWhiteImage";
import { 
  Car, 
  Shield, 
  Star,
  CheckCircle,
  Wifi,
  Users,
  Briefcase,
  Crown,
  Coffee,
  Music,
  Thermometer,
  Phone
} from "lucide-react";

export function FleetPage() {
  const vehicleDetails = [
    {
      category: "Business Class",
      model: "Mercedes E-Class",
      year: "2022-2024",
      engine: "2.0L Turbo / Hybrid",
      features: {
        comfort: ["Premium leather seats", "Climate control", "Adjustable seating", "Ambient lighting"],
        technology: ["WiFi hotspot", "USB charging ports", "Bluetooth connectivity", "Premium sound system"],
        safety: ["Advanced safety systems", "GPS tracking", "Emergency assistance", "Professional maintenance"],
        amenities: ["Bottled water", "Phone charger", "Tissues", "Hand sanitizer"]
      },
      specs: {
        passengers: "1-3",
        luggage: "3 large bags",
        fuel: "Hybrid available",
        transmission: "Automatic"
      },
      price: "From €80/hour",
      description: "Perfect for business travel and airport transfers with professional comfort and reliability.",
      image: "assets/Nouveau site internet/PICTURES OF FLEET/classe E.png"
    },
    {
      category: "First Class",
      model: "Mercedes S-Class", 
      year: "2023-2024",
      engine: "3.0L V6 Turbo",
      features: {
        comfort: ["Massage seats", "Individual climate zones", "Privacy glass", "Premium champagne bar"],
        technology: ["4G WiFi", "Tablet controls", "Surround sound", "Conference call setup"],
        safety: ["Chauffeur training", "VIP security", "Discrete service", "Emergency protocols"],
        amenities: ["Champagne service", "Premium refreshments", "Luxury toiletries", "Reading materials"]
      },
      specs: {
        passengers: "1-3",
        luggage: "4 large bags",
        fuel: "Premium gasoline",
        transmission: "9G-Tronic automatic"
      },
      price: "From €120/hour",
      description: "Ultimate luxury for VIP transportation with unparalleled comfort and prestigious service.",
      image: "assets/Nouveau site internet/notre flotte.jpeg"
    },
    {
      category: "Group Travel",
      model: "Mercedes V-Class",
      year: "2022-2024", 
      engine: "2.0L Turbo Diesel",
      features: {
        comfort: ["Individual captain chairs", "Conference table", "Extra legroom", "Multiple climate zones"],
        technology: ["WiFi for all passengers", "Multiple USB ports", "Entertainment system", "PA system"],
        safety: ["Advanced driver assistance", "Stability control", "Multiple airbags", "Emergency exits"],
        amenities: ["Refreshment center", "Storage compartments", "Power outlets", "Privacy curtains"]
      },
      specs: {
        passengers: "1-7",
        luggage: "8+ large bags",
        fuel: "Diesel efficiency",
        transmission: "7G-Tronic automatic"
      },
      price: "From €140/hour",
      description: "Spacious luxury van perfect for group travel, family occasions, and corporate teams.",
      image: "assets/Nouveau site internet/PICTURES OF FLEET/mercedes classe V .jpg"
    }
  ];

  const fleetStandards = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Safety First",
      description: "All vehicles undergo rigorous safety inspections and are equipped with the latest safety technology.",
      details: ["Monthly safety inspections", "Advanced driver assistance", "Emergency protocols", "Insurance coverage"]
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Premium Maintenance",
      description: "Professional maintenance ensures every vehicle operates at peak performance and luxury standards.",
      details: ["Authorized Mercedes service", "Regular maintenance schedule", "Quality assurance checks", "Replacement guarantee"]
    },
    {
      icon: <Crown className="w-8 h-8" />,
      title: "Luxury Standards",
      description: "Every detail is maintained to provide the highest level of comfort and sophistication.",
      details: ["Interior detailing", "Premium amenities", "Comfort optimization", "Aesthetic perfection"]
    }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src={getAssetPath("Nouveau site internet/chateau fontainebleau.jpg")}
            alt="Premium Mercedes fleet"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/80"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto text-white">
            <Badge variant="secondary" className="mb-4 bg-black/60 text-white border-white/50 font-semibold">Our Fleet</Badge>
            <h1 className="text-5xl md:text-6xl mb-6 font-bold text-white drop-shadow-lg">
              Premium Mercedes Vehicle Fleet
            </h1>
            <p className="text-xl mb-8 text-white font-medium drop-shadow-md">
              Our meticulously maintained fleet of premium Mercedes vehicles ensures comfort, 
              safety, and style for every journey. Each vehicle is less than 3 years old and 
              equipped with the latest luxury amenities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                <Car className="w-4 h-4 mr-2" />
                View Available Vehicles
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                Fleet Specifications
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Vehicle Details */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="space-y-20">
            {vehicleDetails.map((vehicle, index) => (
              <div key={index} className={`grid lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-dense' : ''
              }`}>
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <Badge variant="outline" className="mb-4">{vehicle.category}</Badge>
                  <h2 className="text-3xl mb-4">{vehicle.model}</h2>
                  <p className="text-lg text-muted-foreground mb-6">{vehicle.description}</p>
                  
                  {/* Vehicle Specs */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Users className="w-4 h-4 text-primary" />
                        <span className="text-sm">Passengers</span>
                      </div>
                      <div className="text-lg">{vehicle.specs.passengers}</div>
                    </div>
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Briefcase className="w-4 h-4 text-primary" />
                        <span className="text-sm">Luggage</span>
                      </div>
                      <div className="text-lg">{vehicle.specs.luggage}</div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-6">
                    {Object.entries(vehicle.features).map(([category, features]) => (
                      <div key={category}>
                        <h4 className="mb-3 capitalize flex items-center">
                          {category === 'comfort' && <Coffee className="w-4 h-4 mr-2 text-primary" />}
                          {category === 'technology' && <Wifi className="w-4 h-4 mr-2 text-primary" />}
                          {category === 'safety' && <Shield className="w-4 h-4 mr-2 text-primary" />}
                          {category === 'amenities' && <Star className="w-4 h-4 mr-2 text-primary" />}
                          {category}
                        </h4>
                        <div className="grid md:grid-cols-2 gap-2">
                          {features.map((feature, idx) => (
                            <div key={idx} className="flex items-center space-x-2">
                              <CheckCircle className="w-3 h-3 text-primary flex-shrink-0" />
                              <span className="text-sm">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 flex items-center justify-between">
                    <div>
                      <div className="text-2xl text-primary">{vehicle.price}</div>
                      <div className="text-sm text-muted-foreground">Base rate</div>
                    </div>
                    <Button>
                      Select This Vehicle
                    </Button>
                  </div>
                </div>
                
                <div className={index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                  <div className="bg-white rounded-lg overflow-hidden">
                    {vehicle.model === "Mercedes V-Class" ? (
                      <CompositeOnWhiteImage
                        src={vehicle.image}
                        alt={vehicle.model}
                        className="w-full h-80 object-contain p-4 bg-white"
                      />
                    ) : (
                      <ImageWithFallback
                        src={vehicle.image}
                        alt={vehicle.model}
                        className="w-full h-80 object-contain p-4 bg-white"
                      />
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <Card>
                      <CardContent className="p-4 text-center">
                        <div className="text-lg mb-1">{vehicle.year}</div>
                        <div className="text-xs text-muted-foreground">Model Years</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <div className="text-lg mb-1">{vehicle.engine}</div>
                        <div className="text-xs text-muted-foreground">Engine</div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fleet Standards */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-6">Fleet Quality Standards</h2>
            <p className="text-xl text-muted-foreground">
              Every vehicle in our fleet meets the highest standards of luxury, safety, and performance
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {fleetStandards.map((standard, index) => (
              <Card key={index} className="text-center group hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8">
                  <div className="bg-primary/10 rounded-full p-4 w-fit mx-auto mb-6 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    {standard.icon}
                  </div>
                  <h3 className="text-xl mb-4">{standard.title}</h3>
                  <p className="text-muted-foreground mb-6">{standard.description}</p>
                  
                  <div className="space-y-2">
                    {standard.details.map((detail, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-sm">
                        <CheckCircle className="w-3 h-3 text-primary flex-shrink-0" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Original Fleet Component */}
      <Fleet />

      {/* Additional Information */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-primary text-white rounded-2xl p-8 md:p-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl mb-6">Why Choose Our Fleet?</h2>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    <span>All vehicles less than 3 years old</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    <span>Mercedes-Benz authorized maintenance</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    <span>Comprehensive insurance coverage</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    <span>Professional chauffeur training</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    <span>24/7 roadside assistance</span>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div>
                    <div className="text-3xl mb-2">15+</div>
                    <div className="text-sm opacity-90">Premium Vehicles</div>
                  </div>
                  <div>
                    <div className="text-3xl mb-2">100%</div>
                    <div className="text-sm opacity-90">Mercedes Fleet</div>
                  </div>
                  <div>
                    <div className="text-3xl mb-2">24/7</div>
                    <div className="text-sm opacity-90">Availability</div>
                  </div>
                  <div>
                    <div className="text-3xl mb-2">5★</div>
                    <div className="text-sm opacity-90">Service Rating</div>
                  </div>
                </div>
                
                <Button variant="secondary" size="lg">
                  <Phone className="w-4 h-4 mr-2" />
                  Contact Fleet Manager
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}