import { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { 
  Settings, 
  User, 
  Palette,
  Music,
  Thermometer,
  Coffee,
  Newspaper,
  Wifi,
  CheckCircle,
  Star,
  Phone,
  Calendar,
  UserCheck,
  Heart,
  Sliders,
  MapPin,
  Clock,
  Shield,
  Headphones,
  Smartphone,
  Car
} from "lucide-react";

export function PersonalizationPage() {
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([]);

  const personalizationOptions = [
    {
      category: "Comfort Preferences",
      icon: <Thermometer className="w-6 h-6" />,
      options: [
        { id: "temp-cool", name: "Cool Temperature (18-20°C)", icon: <Thermometer className="w-4 h-4" /> },
        { id: "temp-warm", name: "Warm Temperature (22-24°C)", icon: <Thermometer className="w-4 h-4" /> },
        { id: "seat-massage", name: "Massage Seats", icon: <Settings className="w-4 h-4" /> },
        { id: "lumbar-support", name: "Extra Lumbar Support", icon: <Settings className="w-4 h-4" /> }
      ]
    },
    {
      category: "Entertainment & Media",
      icon: <Music className="w-6 h-6" />,
      options: [
        { id: "music-classical", name: "Classical Music", icon: <Music className="w-4 h-4" /> },
        { id: "music-jazz", name: "Jazz Music", icon: <Music className="w-4 h-4" /> },
        { id: "music-none", name: "No Music (Quiet)", icon: <Music className="w-4 h-4" /> },
        { id: "news-financial", name: "Financial News", icon: <Newspaper className="w-4 h-4" /> },
        { id: "news-international", name: "International News", icon: <Newspaper className="w-4 h-4" /> }
      ]
    },
    {
      category: "Refreshments",
      icon: <Coffee className="w-6 h-6" />,
      options: [
        { id: "water-still", name: "Still Water", icon: <Coffee className="w-4 h-4" /> },
        { id: "water-sparkling", name: "Sparkling Water", icon: <Coffee className="w-4 h-4" /> },
        { id: "coffee-espresso", name: "Espresso", icon: <Coffee className="w-4 h-4" /> },
        { id: "tea-selection", name: "Tea Selection", icon: <Coffee className="w-4 h-4" /> },
        { id: "snacks-healthy", name: "Healthy Snacks", icon: <Coffee className="w-4 h-4" /> }
      ]
    },
    {
      category: "Technology & Connectivity",
      icon: <Wifi className="w-6 h-6" />,
      options: [
        { id: "wifi-premium", name: "Premium WiFi", icon: <Wifi className="w-4 h-4" /> },
        { id: "charging-wireless", name: "Wireless Charging", icon: <Smartphone className="w-4 h-4" /> },
        { id: "charging-multiple", name: "Multiple USB Ports", icon: <Smartphone className="w-4 h-4" /> },
        { id: "privacy-screen", name: "Privacy Screen", icon: <Shield className="w-4 h-4" /> }
      ]
    },
    {
      category: "Service Preferences",
      icon: <UserCheck className="w-6 h-6" />,
      options: [
        { id: "greeting-formal", name: "Formal Greeting", icon: <User className="w-4 h-4" /> },
        { id: "greeting-casual", name: "Casual Greeting", icon: <User className="w-4 h-4" /> },
        { id: "conversation-minimal", name: "Minimal Conversation", icon: <User className="w-4 h-4" /> },
        { id: "conversation-friendly", name: "Friendly Conversation", icon: <User className="w-4 h-4" /> },
        { id: "assistance-luggage", name: "Luggage Assistance", icon: <UserCheck className="w-4 h-4" /> }
      ]
    }
  ];

  const profileFeatures = [
    {
      icon: <User className="w-8 h-8" />,
      title: "Personal Profile",
      description: "Create detailed profiles for each traveler with specific preferences and requirements."
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Schedule Preferences",
      description: "Set preferred pickup times, buffer periods, and notification preferences."
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Route Optimization",
      description: "Save favorite routes and preferred stops for efficient travel planning."
    },
    {
      icon: <Car className="w-8 h-8" />,
      title: "Vehicle Selection",
      description: "Choose preferred vehicle types and specific amenities for different occasions."
    }
  ];

  const customizationLevels = [
    {
      level: "Essential",
      price: "Included",
      features: [
        "Basic comfort preferences",
        "Temperature control",
        "Music selection",
        "Refreshment choices",
        "Greeting style"
      ]
    },
    {
      level: "Premium",
      price: "+€10 per trip",
      features: [
        "All Essential features",
        "Advanced entertainment options",
        "Premium refreshments",
        "Specialized equipment",
        "Route customization"
      ]
    },
    {
      level: "Luxury",
      price: "+€25 per trip",
      features: [
        "All Premium features",
        "Personal concierge service",
        "Custom amenities",
        "Specialized dietary requirements",
        "VIP treatment protocols"
      ]
    }
  ];

  const handlePreferenceToggle = (optionId: string) => {
    setSelectedPreferences(prev => 
      prev.includes(optionId) 
        ? prev.filter(id => id !== optionId)
        : [...prev, optionId]
    );
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4">Personalization</Badge>
            <h1 className="text-5xl md:text-6xl mb-6">
              Your Journey, Your Way
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Customize every aspect of your transportation experience. From comfort 
              preferences to entertainment options, we tailor each journey to your exact needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">
                <Settings className="w-4 h-4 mr-2" />
                Customize Experience
              </Button>
              <Button size="lg" variant="outline">
                View Personalization Options
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Preference Builder */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-6">Build Your Perfect Journey</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Select your preferences below to see how we can customize your transportation experience
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {personalizationOptions.map((category, categoryIndex) => (
                <Card key={categoryIndex} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="bg-primary/10 p-2 rounded-lg text-primary">
                        {category.icon}
                      </div>
                      <h3 className="text-xl font-semibold">{category.category}</h3>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      {category.options.map((option) => (
                        <div
                          key={option.id}
                          onClick={() => handlePreferenceToggle(option.id)}
                          className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-md ${
                            selectedPreferences.includes(option.id)
                              ? 'border-primary bg-primary/5 text-primary'
                              : 'border-border hover:border-primary/50'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            {option.icon}
                            <span className="text-sm">{option.name}</span>
                            {selectedPreferences.includes(option.id) && (
                              <CheckCircle className="w-4 h-4 ml-auto text-primary" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Preview Panel */}
            <div className="space-y-6">
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Your Personalized Experience</h3>
                  
                  {selectedPreferences.length === 0 ? (
                    <p className="text-muted-foreground text-sm">
                      Select preferences to see your customized experience preview
                    </p>
                  ) : (
                    <div className="space-y-3">
                      <div className="text-sm text-muted-foreground">
                        Selected Preferences: {selectedPreferences.length}
                      </div>
                      
                      <div className="space-y-2">
                        {selectedPreferences.slice(0, 5).map((prefId) => {
                          const option = personalizationOptions
                            .flatMap(cat => cat.options)
                            .find(opt => opt.id === prefId);
                          return option ? (
                            <div key={prefId} className="flex items-center space-x-2 text-sm">
                              <CheckCircle className="w-3 h-3 text-primary" />
                              <span>{option.name}</span>
                            </div>
                          ) : null;
                        })}
                        {selectedPreferences.length > 5 && (
                          <div className="text-xs text-muted-foreground">
                            +{selectedPreferences.length - 5} more preferences
                          </div>
                        )}
                      </div>

                      <Button className="w-full mt-4" size="sm">
                        Save Preferences
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-primary text-white">
                <CardContent className="p-6 text-center">
                  <Heart className="w-12 h-12 mx-auto mb-4" />
                  <h3 className="text-lg mb-2">Personalization Promise</h3>
                  <p className="text-sm opacity-90">
                    We remember your preferences for every future journey, 
                    ensuring consistency and comfort every time.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Profile Features */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-6">Advanced Profile Management</h2>
            <p className="text-xl text-muted-foreground">
              Comprehensive tools to manage and customize your transportation experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {profileFeatures.map((feature, index) => (
              <Card key={index} className="text-center group hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="bg-primary/10 rounded-full p-4 w-fit mx-auto mb-4 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg mb-3">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Customization Levels */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-6">Personalization Levels</h2>
            <p className="text-xl text-muted-foreground">
              Choose the level of customization that fits your needs and budget
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {customizationLevels.map((level, index) => (
              <Card key={index} className={`group hover:shadow-xl transition-all duration-300 ${
                index === 1 ? 'border-primary shadow-lg scale-105' : ''
              }`}>
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    {index === 1 && (
                      <Badge className="mb-4">Most Popular</Badge>
                    )}
                    <h3 className="text-2xl mb-2">{level.level}</h3>
                    <div className="text-3xl font-bold text-primary mb-2">{level.price}</div>
                  </div>

                  <div className="space-y-3 mb-8">
                    {level.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-3">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button className={`w-full ${
                    index === 1 ? 'bg-primary hover:bg-primary/90' : ''
                  }`} variant={index === 1 ? 'default' : 'outline'}>
                    Choose {level.level}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-6">Personalization Success Stories</h2>
            <p className="text-xl text-muted-foreground">
              See how our personalized service has enhanced our clients' experiences
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="group hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-muted-foreground mb-4 italic">
                  "The personalization options are incredible. They remember that I prefer 
                  classical music, cool temperature, and minimal conversation. It's like 
                  having my own private sanctuary during busy days."
                </blockquote>
                <div>
                  <div className="font-semibold">Alexandra Martin</div>
                  <div className="text-sm text-muted-foreground">CEO, Fashion House</div>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-muted-foreground mb-4 italic">
                  "The mobile office setup with premium WiFi and privacy screen has 
                  transformed my commute into productive work time. I can take 
                  confidential calls and work on presentations seamlessly."
                </blockquote>
                <div>
                  <div className="font-semibold">Robert Chen</div>
                  <div className="text-sm text-muted-foreground">Investment Director</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl mb-6">Ready to Personalize Your Experience?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Start customizing your transportation experience today. Create your profile 
            and enjoy personalized service from your very first journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              <User className="w-4 h-4 mr-2" />
              Create Profile
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
              <Phone className="w-4 h-4 mr-2" />
              Speak with Specialist
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}