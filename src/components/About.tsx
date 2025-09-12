import { getAssetPath } from "../utils/assetPath";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { 
  Award, 
  Shield, 
  Clock, 
  Heart,
  Users,
  TrendingUp
} from "lucide-react";

export function About() {
  const values = [
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Comfort",
      description: "Luxurious vehicles and personalized service for an exceptional travel experience."
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Punctuality",
      description: "Reliable timing and efficient routes ensure you arrive on schedule, every time."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Discretion",
      description: "Professional, confidential service that respects your privacy and preferences."
    }
  ];

  const achievements = [
    { number: "8+", label: "Years of Excellence", icon: <Award className="w-5 h-5" /> },
    { number: "50,000+", label: "Successful Rides", icon: <TrendingUp className="w-5 h-5" /> },
    { number: "500+", label: "Corporate Clients", icon: <Users className="w-5 h-5" /> }
  ];

  return (
    <section id="about" className="min-h-screen py-20 flex flex-col justify-center">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <Badge variant="secondary" className="mb-4">About Us</Badge>
            <h2 className="text-4xl md:text-5xl mb-6">
              Excellence in Motion Since 2017
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              My French Driver was founded with a simple yet ambitious mission: to redefine 
              premium transportation in Paris and Île-de-France. Since 2017, we have been 
              delivering innovative, high-end travel experiences that combine traditional 
              French elegance with modern luxury.
            </p>
            
            <div className="space-y-6 mb-8">
              {values.map((value, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-lg text-primary flex-shrink-0">
                    {value.icon}
                  </div>
                  <div>
                    <h4 className="mb-2">{value.title}</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-3 gap-6">
              {achievements.map((achievement, index) => (
                <Card key={index}>
                  <CardContent className="p-4 text-center">
                    <div className="text-primary mb-2 flex justify-center">
                      {achievement.icon}
                    </div>
                    <div className="text-2xl mb-1">{achievement.number}</div>
                    <div className="text-xs text-muted-foreground">
                      {achievement.label}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="relative">
              <ImageWithFallback
                src={getAssetPath("Nouveau site internet/HOME PAGE.jpeg")}
                alt="Paris luxury transportation"
                className="w-full h-80 object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-lg"></div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <ImageWithFallback
                src={getAssetPath("Nouveau site internet/notre marque 1.jpg")}
                alt="Our brand"
                className="w-full h-40 object-cover rounded-lg"
              />
              <ImageWithFallback
                src={getAssetPath("Nouveau site internet/notre marque 2.jpeg")}
                alt="Professional service"
                className="w-full h-40 object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
