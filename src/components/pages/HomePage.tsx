import { Hero } from "../Hero";
import { Services } from "../Services";
import { VehicleFleet } from "../VehicleFleet";
import { PhotoGallery } from "../PhotoGallery";
import { About } from "../About";
import { Fleet } from "../Fleet";
import ServicesList from "../ServicesList";

interface HomePageProps {
  onServiceClick?: (serviceType: string) => void;
}

export function HomePage({ onServiceClick }: HomePageProps) {
  return (
    <>
      <Hero />
      <Services />
      <VehicleFleet />
      <PhotoGallery />
      <About />
      <Fleet />
      <ServicesList onServiceClick={onServiceClick} />
    </>
  );
}
