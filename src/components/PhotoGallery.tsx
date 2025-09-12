import React, { useEffect, useMemo, useRef, useState } from "react";
import Swiper from "react-id-swiper";
import "swiper/css/swiper.css";

import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Lightbox } from "./ui/lightbox";
import { Star } from "lucide-react";

import '../styles/gallery.css';

export function PhotoGallery() {
  // Images for the gallery with unified card data
  const galleryItems = useMemo(
    () => [
      {
        src: "assets/Nouveau site internet/PICTURES OF FLEET/mercedes classe C baniere .png",
        alt: "Mercedes C-Class",
        title: "Mercedes C-Class",
        description: "Elegant and comfortable sedan perfect for business or leisure travel with premium amenities.",
        features: ["Leather seats", "Climate control", "Premium sound", "Wi-Fi available"]
      },
      {
        src: "assets/Nouveau site internet/PICTURES OF FLEET/classe E.png",
        alt: "Mercedes E-Class",
        title: "Mercedes E-Class",
        description: "Luxury business class sedan offering superior comfort and advanced technology.",
        features: ["Executive seating", "Advanced safety", "Charging ports", "Privacy glass"]
      },
      {
        src: "assets/Nouveau site internet/PICTURES OF FLEET/mercedes classe V .jpg",
        alt: "Mercedes V-Class",
        title: "Mercedes V-Class",
        description: "Spacious and versatile van ideal for group travel with premium comfort.",
        features: ["7 passenger seats", "Panoramic roof", "Flexible seating", "Large luggage space"]
      },
      {
        src: "assets/Nouveau site internet/notre flotte.jpeg",
        alt: "Executive Fleet",
        title: "Executive Fleet",
        description: "Our complete luxury fleet ready to serve your transportation needs with style.",
        features: ["24/7 availability", "Professional drivers", "Immaculate condition", "Latest models"]
      },
      {
        src: "assets/Nouveau site internet/BUSINESS.jpeg",
        alt: "Business Travel",
        title: "Business Travel",
        description: "Premium business transportation solutions for corporate clients and executives.",
        features: ["Corporate accounts", "On-time guarantee", "Professional service", "Discretion assured"]
      },
      {
        src: "assets/Nouveau site internet/aiport transfer 1.jpeg",
        alt: "Airport Service",
        title: "Airport Service",
        description: "Reliable and punctual airport transfers with flight monitoring and meet & greet.",
        features: ["Flight tracking", "Meet & greet", "Luggage assistance", "All terminals covered"]
      }
    ],
    [],
  );

  const lightboxImages = galleryItems.map((p) => ({ src: p.src, alt: p.alt }));

  const swiperRef = useRef<any>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [autoPlayRunning, setAutoPlayRunning] = useState(true);

  // Swiper configuration
  const params = {
    loop: true,
    centeredSlides: false,
    spaceBetween: 20,
    preloadImages: false,
    lazy: { loadPrevNext: true, loadPrevNextAmount: 2 },
    watchSlidesVisibility: true,
    autoplay: { delay: 3000, disableOnInteraction: false },
    slidesPerView: 1,
    breakpoints: {
      640: { slidesPerView: 1.5, spaceBetween: 24 },
      1024: { slidesPerView: 2, spaceBetween: 30 },
      1280: { slidesPerView: 3, spaceBetween: 30 },
    },
    pagination: { el: ".swiper-pagination", clickable: true },
    renderPagination: () => <div className="swiper-pagination !bottom-[-10px]" />,
  } as const;

  // Manage autoplay when off-screen
  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          swiperRef.current?.swiper?.autoplay?.start?.();
          setAutoPlayRunning(true);
        } else {
          swiperRef.current?.swiper?.autoplay?.stop?.();
          setAutoPlayRunning(false);
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Lightbox control
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  return (
    <section ref={sectionRef} className="gallery-section">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6 md:mb-10">
          <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-primary/20">
            Gallery
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-3 text-white">
            Explore Our Premium Rides
          </h2>
          <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto">
            Experience luxury and comfort with our premium fleet
          </p>
        </div>

        <div
          className="relative max-w-6xl mx-auto"
          onMouseEnter={() => {
            swiperRef.current?.swiper?.autoplay?.stop?.();
            setAutoPlayRunning(false);
          }}
          onMouseLeave={() => {
            swiperRef.current?.swiper?.autoplay?.start?.();
            setAutoPlayRunning(true);
          }}
        >
          <Swiper {...params} ref={swiperRef}>
            {galleryItems.map((item, idx) => (
              <div 
                key={idx} 
                className="animate-slide-down" 
                style={{ '--slide-index': idx } as React.CSSProperties}
              >
                <Card className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 overflow-hidden h-full relative animate-glow-on-swipe border-2 border-transparent hover:border-yellow-500/30">
                  {/* Glow effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-amber-500/20 to-orange-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none animate-glow-pulse"></div>
                  
                  {/* Card Image */}
                  <div className="relative" style={{ height: '400px', overflow: 'hidden' }}>
                    <ImageWithFallback
                      src={item.src}
                      alt={item.alt}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Image glow overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  
                  <CardContent className="p-6 sm:p-7">
                    <h3 className="text-lg font-semibold mb-2 text-foreground">{item.title}</h3>
                    <p className="text-muted-foreground mb-3 text-sm leading-relaxed">
                      {item.description}
                    </p>
                    
                    <ul className="space-y-1 mb-3">
                      {item.features.slice(0, 3).map((feature, featureIdx) => (
                        <li key={featureIdx} className="flex items-center text-xs">
                          <Star className="w-3 h-3 text-yellow-500 mr-1.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <button
                      className="text-primary text-sm font-medium hover:text-primary/80 transition-colors"
                      onClick={() => openLightbox(idx)}
                    >
                      View Full Image →
                    </button>
                  </CardContent>
                </Card>
              </div>
            ))}
          </Swiper>

          <div className="mt-8 flex items-center justify-center space-x-3">
            <button
              className="text-xs text-gray-400 hover:text-primary"
              onClick={() => {
                if (autoPlayRunning) {
                  swiperRef.current?.swiper?.autoplay?.stop?.();
                  setAutoPlayRunning(false);
                } else {
                  swiperRef.current?.swiper?.autoplay?.start?.();
                  setAutoPlayRunning(true);
                }
              }}
            >
              {autoPlayRunning ? "Auto-play: On" : "Auto-play: Off"}
            </button>
          </div>
        </div>

        <Lightbox
          images={lightboxImages}
          isOpen={isLightboxOpen}
          onClose={() => setIsLightboxOpen(false)}
          initialIndex={lightboxIndex}
        />
      </div>
    </section>
  );
}