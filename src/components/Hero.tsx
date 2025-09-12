import { getAssetPath } from "../utils/assetPath";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Star, Clock, Shield, Users } from "lucide-react";

import InfoCardDialog from './ui/info-card-dialog';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20">
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
        >
          <source src={getAssetPath("Untitled video - Made with Clipchamp.mp4")} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h1 className="text-5xl md:text-6xl lg:text-7xl mb-6 leading-tight">
            Premium Transportation
            <span className="block text-3xl md:text-4xl lg:text-5xl text-gray-300 mt-2">
              in Paris & Île-de-France
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto">
            Experience luxury, comfort, and punctuality with My French Driver. 
            Your trusted partner since 2017 for premium chauffeur services.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <InfoCardDialog title="Book Your Ride" description="Start a booking or view booking options." adminHref="/book">
              <Button size="lg" className="bg-white text-black hover:bg-gray-100 px-8 py-3">
                Book Your Ride
              </Button>
            </InfoCardDialog>

            <InfoCardDialog title="View Fleet" description="Browse our fleet and select a vehicle." adminHref="/#fleet">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black px-8 py-3">
                View Fleet
              </Button>
            </InfoCardDialog>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-4 text-center">
              <Star className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
              <div className="text-2xl mb-1">4.9★</div>
              <div className="text-sm text-gray-300">Customer Rating</div>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-4 text-center">
              <Clock className="w-8 h-8 mx-auto mb-2" />
              <div className="text-2xl mb-1">24/7</div>
              <div className="text-sm text-gray-300">Service Available</div>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-4 text-center">
              <Shield className="w-8 h-8 mx-auto mb-2" />
              <div className="text-2xl mb-1">100%</div>
              <div className="text-sm text-gray-300">Insured & Licensed</div>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-4 text-center">
              <Users className="w-8 h-8 mx-auto mb-2" />
              <div className="text-2xl mb-1">10K+</div>
              <div className="text-sm text-gray-300">Happy Clients</div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}