import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "./dialog";
import { Button } from "./button";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from "lucide-react";

interface LightboxProps {
  images: Array<{
    src: string;
    alt: string;
    title?: string;
    description?: string;
  }>;
  isOpen: boolean;
  onClose: () => void;
  initialIndex?: number;
}

export function Lightbox({ images, isOpen, onClose, initialIndex = 0 }: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case 'ArrowLeft':
          previousImage();
          break;
        case 'ArrowRight':
          nextImage();
          break;
        case 'Escape':
          onClose();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex]);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setIsZoomed(false);
  };

  const previousImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setIsZoomed(false);
  };

  const currentImage = images[currentIndex];

  if (!isOpen || !currentImage) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] max-h-[95vh] w-full h-full p-0 bg-black/95 border-none">
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Close button */}
          <Button
            variant="outline"
            size="sm"
            onClick={onClose}
            className="absolute top-4 right-4 z-50 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 text-white"
          >
            <X className="w-4 h-4" />
          </Button>

          {/* Image counter */}
          <div className="absolute top-4 left-4 z-50 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-1 text-white text-sm">
            {currentIndex + 1} / {images.length}
          </div>

          {/* Zoom controls */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50 flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsZoomed(!isZoomed)}
              className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 text-white"
            >
              {isZoomed ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
            </Button>
          </div>

          {/* Navigation arrows */}
          {images.length > 1 && (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={previousImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-50 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 text-white"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-50 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 text-white"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </>
          )}

          {/* Main image */}
          <div className="w-full h-full flex items-center justify-center p-8">
            <div className={`relative max-w-full max-h-full transition-transform duration-300 ${
              isZoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'
            }`}>
              <ImageWithFallback
                src={currentImage.src}
                alt={currentImage.alt}
                className="max-w-full max-h-full object-contain"
                onClick={() => setIsZoomed(!isZoomed)}
              />
            </div>
          </div>

          {/* Image info */}
          {(currentImage.title || currentImage.description) && (
            <div className="absolute bottom-4 left-4 right-4 z-50 bg-white/10 backdrop-blur-sm rounded-lg p-4 text-white">
              {currentImage.title && (
                <h3 className="text-lg mb-2">{currentImage.title}</h3>
              )}
              {currentImage.description && (
                <p className="text-sm text-white/80">{currentImage.description}</p>
              )}
            </div>
          )}

          {/* Thumbnail strip */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-50 flex space-x-2 bg-white/10 backdrop-blur-sm rounded-lg p-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index);
                    setIsZoomed(false);
                  }}
                  className={`w-12 h-12 rounded overflow-hidden transition-all ${
                    index === currentIndex 
                      ? 'ring-2 ring-primary scale-110' 
                      : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  <ImageWithFallback
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}