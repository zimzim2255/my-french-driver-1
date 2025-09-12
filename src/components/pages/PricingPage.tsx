import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { 
  Euro, 
  Clock, 
  MapPin,
  Users,
  Briefcase,
  Star,
  CheckCircle,
  ArrowRight,
  Calculator,
  Phone,
  Car,
  Plane
} from "lucide-react";

export function PricingPage() {
  const baseRates = [
    {
      vehicle: "Mercedes E-Class",
      category: "Business Class",
      rate: "From €80/hour",
      description: "Perfect for business travel and airport transfers",
      features: ["1-3 passengers", "3 luggage bags", "WiFi included", "Professional chauffeur"],
      icon: <Car className="w-8 h-8" />
    },
    {
      vehicle: "Mercedes S-Class", 
      category: "First Class",
      rate: "From €120/hour",
      description: "Ultimate luxury for VIP transportation",
      features: ["1-3 passengers", "4 luggage bags", "Champagne service", "Privacy glass"],
      icon: <Star className="w-8 h-8" />
    },
    {
      vehicle: "Mercedes V-Class",
      category: "Group Travel",
      rate: "From €140/hour",
      description: "Spacious luxury for groups and families",
      features: ["1-7 passengers", "8+ luggage bags", "Conference table", "Extra space"],
      icon: <Users className="w-8 h-8" />
    }
  ];

  const airportPricing = [
    {
      airport: "Charles de Gaulle (CDG)",
      business: "€90",
      first: "€115",
      group: "€135",
      time: "45-60 min"
    },
    {
      airport: "Orly Airport (ORY)",
      business: "€70",
      first: "€95", 
      group: "€125",
      time: "30-45 min"
    },
    {
      airport: "Beauvais-Tillé (BVA)",
      business: "€150",
      first: "€200",
      group: "€220",
      time: "75-90 min"
    }
  ];

  const packages = [
    {
      name: "Hourly Service",
      description: "Flexible hourly bookings with professional chauffeur",
      pricing: [
        { vehicle: "Business Class", rate: "€80/hour" },
        { vehicle: "First Class", rate: "€120/hour" },
        { vehicle: "Group Travel", rate: "€140/hour" }
      ],
      features: [
        "Minimum 2 hours booking",
        "Waiting time included",
        "Fuel and tolls included",
        "Professional chauffeur"
      ],
      popular: false
    },
    {
      name: "Half Day (4 hours)",
      description: "Perfect for city tours, meetings, or shopping",
      pricing: [
        { vehicle: "Business Class", rate: "€300" },
        { vehicle: "First Class", rate: "€450" },
        { vehicle: "Group Travel", rate: "€520" }
      ],
      features: [
        "4 hours service included",
        "Multiple stops allowed",
        "Refreshments provided",
        "Tour guide service"
      ],
      popular: true
    },
    {
      name: "Full Day (8 hours)",
      description: "Complete day service for tours or business",
      pricing: [
        { vehicle: "Business Class", rate: "€580" },
        { vehicle: "First Class", rate: "€850" },
        { vehicle: "Group Travel", rate: "€980" }
      ],
      features: [
        "8 hours service included",
        "Unlimited stops",
        "Lunch coordination",
        "Full tour experience"
      ],
      popular: false
    }
  ];

  const additionalServices = [
    { service: "Meet & Greet at Airport", price: "Included" },
    { service: "Flight Monitoring", price: "Included" },
    { service: "Child Car Seat", price: "€10" },
    { service: "Additional Waiting Time", price: "€1/minute" },
    { service: "Champagne Service", price: "€25" },
    { service: "Flowers/Decorations", price: "€35" },
    { service: "WiFi Hotspot", price: "Included" },
    { service: "Phone Chargers", price: "Included" }
  ];

  const pricingFactors = [
    {
      factor: "Distance",
      description: "Calculated per kilometer with transparent fixed rates",
      icon: <MapPin className="w-6 h-6" />
    },
    {
      factor: "Time",
      description: "Hourly rates for extended services and waiting time",
      icon: <Clock className="w-6 h-6" />
    },
    {
      factor: "Vehicle Type",
      description: "Different rates based on luxury level and capacity",
      icon: <Car className="w-6 h-6" />
    },
    {
      factor: "Special Services",
      description: "Additional amenities and personalized services",
      icon: <Star className="w-6 h-6" />
    }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4">Transparent Pricing</Badge>
            <h1 className="text-5xl md:text-6xl mb-6">
              Clear, Fair, and Transparent Pricing
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              No hidden fees, no surge pricing, no surprises. Our transparent pricing 
              structure ensures you know exactly what you'll pay for premium luxury transportation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">
                <Calculator className="w-4 h-4 mr-2" />
                Calculate Your Price
              </Button>
              <Button size="lg" variant="outline">
                Request Custom Quote
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Base Rates */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-6">Starting Prices by Vehicle Type</h2>
            <p className="text-xl text-muted-foreground">
              Transparent starting prices for each vehicle category
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {baseRates.map((rate, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="bg-primary/10 rounded-full p-4 w-fit mx-auto mb-4 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    {rate.icon}
                  </div>
                  
                  <Badge variant="outline" className="mb-3">{rate.category}</Badge>
                  <h3 className="text-xl mb-2">{rate.vehicle}</h3>
                  <div className="text-3xl text-primary mb-2">{rate.rate}</div>
                  <p className="text-sm text-muted-foreground mb-6">{rate.description}</p>
                  
                  <div className="space-y-2 text-left mb-6">
                    {rate.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button className="w-full group-hover:bg-primary group-hover:text-white">
                    Select Vehicle
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Airport Transfers */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-6">Airport Transfer Fixed Prices</h2>
            <p className="text-xl text-muted-foreground">
              Guaranteed fixed pricing for all Paris airports - no surge charges
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-background rounded-lg overflow-hidden shadow-lg">
              <thead className="bg-primary text-white">
                <tr>
                  <th className="p-4 text-left">Airport</th>
                  <th className="p-4 text-center">Business Class</th>
                  <th className="p-4 text-center">First Class</th>
                  <th className="p-4 text-center">Group Travel</th>
                  <th className="p-4 text-center">Journey Time</th>
                </tr>
              </thead>
              <tbody>
                {airportPricing.map((airport, index) => (
                  <tr key={index} className="border-b hover:bg-muted/50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <Plane className="w-4 h-4 text-primary" />
                        <span>{airport.airport}</span>
                      </div>
                    </td>
                    <td className="p-4 text-center text-lg">{airport.business}</td>
                    <td className="p-4 text-center text-lg">{airport.first}</td>
                    <td className="p-4 text-center text-lg">{airport.group}</td>
                    <td className="p-4 text-center text-sm text-muted-foreground">{airport.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground mb-4">
              * Prices include meet & greet service, flight monitoring, and up to 60 minutes waiting time
            </p>
            <Button>
              <Plane className="w-4 h-4 mr-2" />
              Book Airport Transfer
            </Button>
          </div>
        </div>
      </section>

      {/* Service Packages */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-6">Service Packages</h2>
            <p className="text-xl text-muted-foreground">
              Comprehensive packages for extended services and special occasions
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <Card key={index} className={`group hover:shadow-xl transition-all duration-300 relative ${
                pkg.popular ? 'ring-2 ring-primary scale-105' : ''
              }`}>
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-white px-4 py-1">Most Popular</Badge>
                  </div>
                )}
                
                <CardContent className="p-6">
                  <h3 className="text-xl mb-2 text-center">{pkg.name}</h3>
                  <p className="text-sm text-muted-foreground text-center mb-6">{pkg.description}</p>
                  
                  <div className="space-y-3 mb-6">
                    {pkg.pricing.map((price, idx) => (
                      <div key={idx} className="flex items-center justify-between text-sm border-b pb-2">
                        <span>{price.vehicle}</span>
                        <span className="text-primary">{price.rate}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="space-y-2 mb-6">
                    {pkg.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    className={`w-full ${
                      pkg.popular ? 'bg-primary hover:bg-primary/90' : 'group-hover:bg-primary group-hover:text-white'
                    }`}
                  >
                    Select Package
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-6">Additional Services & Fees</h2>
            <p className="text-xl text-muted-foreground">
              Optional services to enhance your luxury transportation experience
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Card>
              <CardContent className="p-0">
                <div className="divide-y">
                  {additionalServices.map((service, index) => (
                    <div key={index} className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
                      <span>{service.service}</span>
                      <span className={`font-medium ${
                        service.price === 'Included' ? 'text-green-600' : 'text-primary'
                      }`}>
                        {service.price}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Factors */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-6">How We Calculate Your Price</h2>
            <p className="text-xl text-muted-foreground">
              Transparent pricing factors with no hidden charges or surprise fees
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pricingFactors.map((factor, index) => (
              <Card key={index} className="text-center group hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="bg-primary/10 rounded-full p-4 w-fit mx-auto mb-4 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    {factor.icon}
                  </div>
                  <h3 className="text-lg mb-3">{factor.factor}</h3>
                  <p className="text-sm text-muted-foreground">{factor.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quote CTA */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl mb-6">Get Your Personalized Quote</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Need a custom quote for your specific requirements? Our team will provide 
            a detailed estimate based on your exact needs and preferences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              <Calculator className="w-4 h-4 mr-2" />
              Calculate Price
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
              <Phone className="w-4 h-4 mr-2" />
              Call for Quote
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}