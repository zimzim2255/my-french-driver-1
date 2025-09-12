import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Lightbox } from "./ui/lightbox";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { 
  Users, 
  Briefcase,
  Star,
  Gauge,
  Fuel,
  Shield,
  ChevronUp,
  ChevronDown,
  Camera,
  Eye
} from "lucide-react";

export function CarGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const wheelRef = useRef<HTMLDivElement>(null);

  const cars = [
    {
      name: "Mercedes E-Class",
      category: "Business Class",
      description: "Perfect for executive travel and airport transfers with professional comfort.",
      image: "assets/Nouveau site internet/PICTURES OF FLEET/classe E.png",
      specs: {
        passengers: "1-3",
        luggage: "3 bags",
        features: ["WiFi", "Climate Control", "Premium Sound", "Leather Seats"]
      },
      price: "From €80/hour",
      color: "from-blue-500/20 to-blue-600/30"
    },
    {
      name: "Mercedes S-Class",
      category: "First Class",
      description: "Ultimate luxury experience with VIP amenities and unparalleled comfort.",
      image: "assets/Nouveau site internet/notre flotte.jpeg",
      specs: {
        passengers: "1-3",
        luggage: "4 bags",
        features: ["Massage Seats", "Champagne Bar", "Privacy Glass", "Executive Console"]
      },
      price: "From €120/hour",
      color: "from-purple-500/20 to-purple-600/30"
    },
    {
      name: "Mercedes V-Class",
      category: "Group Travel",
      description: "Spacious luxury van perfect for group transportation and family travels.",
      image: "assets/Nouveau site internet/PICTURES OF FLEET/mercedes classe V .jpg",
      specs: {
        passengers: "1-7",
        luggage: "8+ bags",
        features: ["Conference Table", "Individual Seats", "Extra Space", "Multiple Zones"]
      },
      price: "From €140/hour",
      color: "from-green-500/20 to-green-600/30"
    },
    {
      name: "Mercedes C-Class",
      category: "Sedan",
      description: "Top of the range for a unique experience in a refined sedan.",
      image: "assets/Nouveau site internet/PICTURES OF FLEET/mercedes classe C baniere .png",
      specs: {
        passengers: "1-2",
        luggage: "2 bags",
        features: ["Premium Comfort", "Efficient Performance", "Modern Design", "Safety First"]
      },
      price: "From €70/hour",
      color: "from-amber-500/20 to-amber-600/30"
    },
    {
      name: "Professional Service",
      category: "Complete Experience",
      description: "Professional chauffeurs and impeccably maintained vehicles for every occasion.",
      image: "assets/Nouveau site internet/notre marque 1.jpg",
      specs: {
        passengers: "All Sizes",
        luggage: "Flexible",
        features: ["Expert Drivers", "Punctual Service", "Safety First", "24/7 Support"]
      },
      price: "Premium Service",
      color: "from-slate-500/20 to-slate-600/30"
    }
  ];

  // Convert cars data to lightbox format with additional images
  const additionalImages = [
    {
      src: "https://images.unsplash.com/photo-1741089040480-238da1bf915c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXJjZWRlcyUyMGx1eHVyeSUyMGNhciUyMGRhc2hib2FyZCUyMGludGVyaW9yfGVufDF8fHx8MTc1NzA5ODMzNHww&ixlib=rb-4.1.0&q=80&w=1080",
      alt: "Mercedes Dashboard",
      title: "Premium Dashboard",
      description: "State-of-the-art digital dashboard with luxury finishes"
    },
    {
      src: "https://images.unsplash.com/photo-1607332623489-e8ddd788072d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXJjZWRlcyUyMGJsYWNrJTIwbHV4dXJ5JTIwY2FyJTIwZXh0ZXJpb3IlMjBzaWRlfGVufDF8fHx8MTc1NzA5ODMzN3ww&ixlib=rb-4.1.0&q=80&w=1080",
      alt: "Mercedes Side Profile",
      title: "Elegant Profile",
      description: "Sleek aerodynamic design with premium styling"
    },
    {
      src: "https://images.unsplash.com/photo-1610281229695-c0e0b7a6d2d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjaGF1ZmZldXIlMjBtZXJjZWRlcyUyMGZyb250JTIwdmlld3xlbnwxfHx8fDE3NTcwOTgzNDF8MA&ixlib=rb-4.1.0&q=80&w=1080",
      alt: "Mercedes Front View",
      title: "Commanding Presence",
      description: "Distinctive front grille and LED lighting technology"
    }
  ];

  const lightboxImages = [
    ...cars.map(car => ({
      src: car.image,
      alt: car.name,
      title: car.name,
      description: `${car.category} - ${car.description}`
    })),
    ...additionalImages
  ];

  const nextItem = () => {
    setCurrentIndex((prev) => (prev + 1) % cars.length);
  };

  const prevItem = () => {
    setCurrentIndex((prev) => (prev - 1 + cars.length) % cars.length);
  };

  const goToIndex = (index: number) => {
    setCurrentIndex(index);
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || isDragging) return;
    
    const interval = setInterval(nextItem, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, isDragging]);

  // Touch/swipe functionality
  const [startY, setStartY] = useState(0);
  const [currentY, setCurrentY] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartY(e.touches[0].clientY);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setCurrentY(e.touches[0].clientY);
  };

  const handleTouchEnd = () => {
    if (!startY || !currentY) return;
    
    const diff = startY - currentY;
    const threshold = 50;

    if (diff > threshold) {
      nextItem();
    } else if (diff < -threshold) {
      prevItem();
    }

    setStartY(0);
    setCurrentY(0);
    setIsDragging(false);
  };

  // Wheel scroll functionality
  const handleWheel = (e: WheelEvent) => {
    e.preventDefault();
    if (e.deltaY > 0) {
      nextItem();
    } else {
      prevItem();
    }
  };

  useEffect(() => {
    const wheelElement = wheelRef.current;
    if (wheelElement) {
      wheelElement.addEventListener('wheel', handleWheel, { passive: false });
      return () => wheelElement.removeEventListener('wheel', handleWheel);
    }
  }, []);

  const getItemPosition = (index: number) => {
    const totalItems = cars.length;
    const angleStep = 360 / totalItems;
    let relativeIndex = index - currentIndex;
    
    // Normalize the relative index to be between -totalItems/2 and totalItems/2
    if (relativeIndex > totalItems / 2) {
      relativeIndex -= totalItems;
    } else if (relativeIndex < -totalItems / 2) {
      relativeIndex += totalItems;
    }
    
    const angle = relativeIndex * angleStep;
    const radius = 200;
    const x = Math.sin((angle * Math.PI) / 180) * radius;
    const y = -Math.cos((angle * Math.PI) / 180) * radius;
    
    const scale = Math.max(0.6, 1 - Math.abs(relativeIndex) * 0.15);
    const opacity = Math.max(0.3, 1 - Math.abs(relativeIndex) * 0.2);
    const blur = Math.abs(relativeIndex) * 2;
    
    return { x, y, scale, opacity, blur, isCenter: relativeIndex === 0 };
  };

  const currentCar = cars[currentIndex];

  return (
    <section className="py-20 bg-gradient-to-br from-background via-muted/30 to-background overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-primary/20">
            Our Fleet
          </Badge>
          <h2 className="text-4xl md:text-6xl mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Premium Mercedes Collection
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Experience our meticulously curated fleet through our interactive showcase
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
          {/* Apple Watch-style Circular Gallery */}
          <div className="relative">
            <div
              ref={wheelRef}
              className="relative h-[600px] w-full max-w-[500px] mx-auto"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
            >
              {/* Circular arrangement of cars */}
              <div className="absolute inset-0 flex items-center justify-center">
                {cars.map((car, index) => {
                  const { x, y, scale, opacity, blur, isCenter } = getItemPosition(index);
                  
                  return (
                    <div
                      key={index}
                      className={`absolute transition-all duration-700 ease-out cursor-pointer ${
                        isCenter ? 'z-20' : 'z-10'
                      }`}
                      style={{
                        transform: `translate(${x}px, ${y}px) scale(${scale})`,
                        opacity,
                        filter: `blur(${blur}px)`,
                      }}
                      onClick={() => goToIndex(index)}
                    >
                      <div className={`relative w-40 h-40 ${isCenter ? 'w-48 h-48' : ''} transition-all duration-700 group/img`}>
                        <div className={`absolute inset-0 rounded-full overflow-hidden shadow-2xl bg-white ${
                          isCenter ? 'ring-4 ring-primary/50 shadow-primary/20' : 'shadow-black/20'
                        }`}>
                          <ImageWithFallback
                            src={car.image}
                            alt={car.name}
                            className="w-full h-full object-contain p-2"
                          />
                          <div className={`absolute inset-0 bg-gradient-to-b ${car.color} ${
                            isCenter ? 'opacity-60' : 'opacity-80'
                          }`} />
                          
                          {/* Lightbox trigger for center image */}
                          {isCenter && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                openLightbox(index);
                              }}
                              className="absolute inset-0 bg-black/20 opacity-0 group-hover/img:opacity-100 transition-opacity duration-200 flex items-center justify-center"
                            >
                              <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 hover:bg-white/30 transition-colors">
                                <Eye className="w-6 h-6 text-white" />
                              </div>
                            </button>
                          )}
                        </div>
                        
                        {isCenter && (
                          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center">
                            <div className="bg-background/90 backdrop-blur-sm rounded-lg px-3 py-1 shadow-lg">
                              <p className="text-sm text-primary whitespace-nowrap">{car.category}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Navigation controls */}
              <div className="absolute left-1/2 transform -translate-x-1/2 top-4 z-30">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={prevItem}
                  className="bg-background/80 backdrop-blur-sm border-primary/20 hover:bg-primary/10"
                >
                  <ChevronUp className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="absolute left-1/2 transform -translate-x-1/2 bottom-4 z-30">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={nextItem}
                  className="bg-background/80 backdrop-blur-sm border-primary/20 hover:bg-primary/10"
                >
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </div>

              {/* Progress ring */}
              <div className="absolute inset-0 pointer-events-none">
                <svg className="w-full h-full" viewBox="0 0 400 400">
                  <circle
                    cx="200"
                    cy="200"
                    r="180"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    className="text-border opacity-20"
                  />
                  <circle
                    cx="200"
                    cy="200"
                    r="180"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeDasharray={`${(360 / cars.length)} ${360 - (360 / cars.length)}`}
                    strokeDashoffset={`${-currentIndex * (360 / cars.length)}`}
                    className="text-primary transition-all duration-700"
                    transform="rotate(-90 200 200)"
                  />
                </svg>
              </div>
            </div>

            {/* Auto-play indicator */}
            <div className="text-center mt-8">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="text-muted-foreground hover:text-primary"
              >
                {isAutoPlaying ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    <span className="text-xs">Auto-rotating</span>
                  </div>
                ) : (
                  <span className="text-xs">Paused</span>
                )}
              </Button>
            </div>
          </div>

          {/* Current car details */}
          <div className="space-y-8">
            <Card className="overflow-hidden bg-gradient-to-br from-card via-card to-muted/20 border-primary/10">
              <CardContent className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-3xl mb-2">{currentCar.name}</h3>
                    <Badge className="bg-primary/10 text-primary border-primary/20">
                      {currentCar.category}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl text-primary">{currentCar.price}</div>
                    <div className="text-sm text-muted-foreground">Base rate</div>
                  </div>
                </div>

                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  {currentCar.description}
                </p>

                {/* Specs */}
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Users className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Passengers</div>
                      <div>{currentCar.specs.passengers}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Briefcase className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Luggage</div>
                      <div>{currentCar.specs.luggage}</div>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {currentCar.specs.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-primary" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="flex space-x-3">
                  <Button 
                    onClick={() => openLightbox(currentIndex)}
                    variant="outline"
                    className="flex-1"
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    View Photos
                  </Button>
                  <Button className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">
                    Book This Vehicle
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Car selector dots */}
            <div className="flex justify-center space-x-3">
              {cars.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-primary scale-125' 
                      : 'bg-muted hover:bg-primary/50 scale-100'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Fleet Summary Cards */}
        <div className="mt-24 grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card className="text-center group hover:shadow-xl transition-all duration-300">
            <CardContent className="p-8">
              <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl mb-3">Premium Quality</h3>
              <p className="text-muted-foreground leading-relaxed">
                All vehicles less than 3 years old with regular maintenance and premium standards
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center group hover:shadow-xl transition-all duration-300">
            <CardContent className="p-8">
              <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Star className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl mb-3">Luxury Amenities</h3>
              <p className="text-muted-foreground leading-relaxed">
                WiFi, refreshments, and premium comfort features in every vehicle
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center group hover:shadow-xl transition-all duration-300">
            <CardContent className="p-8">
              <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl mb-3">Professional Service</h3>
              <p className="text-muted-foreground leading-relaxed">
                Experienced chauffeurs with local knowledge and complete discretion
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Lightbox */}
        <Lightbox
          images={lightboxImages}
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          initialIndex={lightboxIndex}
        />
      </div>
    </section>
  );
}