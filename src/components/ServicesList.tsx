interface ServicesListProps {
  onServiceClick?: (serviceType: string) => void;
}

export function ServicesList({ onServiceClick }: ServicesListProps) {
  const services = [
    {
      title: "TRANSFER",
      subtitle: "Airports, Train stations, Chateaux, Leisure parks...",
      image: "assets/Nouveau site internet/aiport transfer 1.jpeg"
    },
    {
      title: "DAILY RATE",
      subtitle: "A dedicated driver to go further",
      image: "assets/Nouveau site internet/MISE A DISPO.jpeg"
    },
    {
      title: "TOURS",
      subtitle: "Our excursions throughout France",
      image: "assets/Nouveau site internet/EXCURSION .jpeg"
    },
    {
      title: "EVENTS",
      subtitle: "Exceptional transport for your private and professional events",
      image: "assets/Nouveau site internet/BUSINESS.jpeg"
    }
  ];

  return (
    <section className="py-20 bg-background services-list-section">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-semibold mb-6 text-foreground">
            Our Services
          </h2>
        </div>

        {/* Services Layout */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div 
                key={index} 
                className={`group relative overflow-hidden ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } flex flex-col lg:flex-row items-center gap-8 py-8`}
              >
                {/* Image Section */}
                <div className="relative w-full lg:w-1/2 h-80 lg:h-64 overflow-hidden rounded-none">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  
                  {/* Floating Title on Image */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-2xl lg:text-3xl font-bold text-white tracking-widest mb-2">
                      {service.title}
                    </h3>
                    <div className="w-16 h-1 bg-white/80 rounded-none" />
                  </div>
                </div>

                {/* Content Section */}
                <div className="w-full lg:w-1/2 space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-0.5 bg-primary" />
                      <span className="text-sm font-medium text-primary tracking-wider">
                        SERVICE {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                    
                    <h4 className="text-xl lg:text-2xl font-semibold text-foreground leading-tight">
                      {service.subtitle}
                    </h4>
                  </div>

                  {/* Interactive Element */}
                  <div 
                    className="group/btn inline-flex items-center space-x-3 text-primary hover:text-primary/80 transition-colors cursor-pointer"
                    onClick={() => {
                      console.log('Clicked service:', service.title.toLowerCase());
                      onServiceClick?.(service.title.toLowerCase());
                    }}
                  >
                    <span className="text-sm font-medium tracking-wide">Learn More</span>
                    <div className="w-8 h-0.5 bg-primary group-hover/btn:w-12 transition-all duration-300" />
                    <div className="w-2 h-2 bg-primary rounded-none group-hover/btn:scale-125 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-20 text-center">
          <div className="max-w-4xl mx-auto bg-muted/30 rounded-none p-12">
            <h3 className="text-2xl font-semibold text-foreground mb-6">
              Premium Chauffeur Experience
            </h3>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Professional chauffeur services tailored to your needs. Experience luxury, comfort, and reliability with every journey across France.
            </p>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                "24/7 Availability",
                "Professional Drivers", 
                "Luxury Fleet",
                "Competitive Rates"
              ].map((feature, idx) => (
                <div key={idx} className="flex flex-col items-center space-y-2">
                  <div className="w-3 h-3 bg-primary rounded-none" />
                  <span className="text-sm text-muted-foreground text-center">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Ensure proper export
export default ServicesList;