import { useEffect, useState } from "react";
import { Navigation } from "./components/Navigation";
import { Footer } from "./components/Footer";
import { getAssetPath } from "./utils/assetPath";

// Pages
import { HomePage } from "./components/pages/HomePage";
import { ServicesPage } from "./components/pages/ServicesPage";
import { AirportPage } from "./components/pages/AirportPage";
import { BusinessPage } from "./components/pages/BusinessPage";
import { BusinessBenefitsPage } from "./components/pages/BusinessBenefitsPage";
import { PersonalizationPage } from "./components/pages/PersonalizationPage";
import { DiplomacyPage } from "./components/pages/DiplomacyPage";
import { VipServicePage } from "./components/pages/VipServicePage";
import { CloseProtectionPage } from "./components/pages/CloseProtectionPage";
import { SkiResortsPage } from "./components/pages/SkiResortsPage";
import { PrivateTransportationPage } from "./components/pages/PrivateTransportationPage";
import { NewsPage } from "./components/pages/NewsPage";
import { CorporatePage } from "./components/pages/CorporatePage";
import { EventsPage } from "./components/pages/EventsPage";
import { ToursPage } from "./components/pages/ToursPage";
import { FleetPage } from "./components/pages/FleetPage";
import { AboutPage } from "./components/pages/AboutPage";
import { Contact } from "./components/Contact";
import { SafetyPage } from "./components/pages/SafetyPage";
import { PricingPage } from "./components/pages/PricingPage";
import { BookingDriverPage, BookingVehiclePage, BookingInformationPage } from "./components/pages/BookingFlowPages";
import { FAQPage } from "./components/pages/FAQPage";
import { TransferPage } from "./components/pages/TransferPage";
import { DailyRatePage } from "./components/pages/DailyRatePage";
import { ReviewsPage } from "./components/pages/ReviewsPage";
import { ContactPage } from "./components/pages/ContactPage";
import { BrandPage } from "./components/pages/BrandPage";
import { Service247Page } from "./components/pages/Service247Page";
import { TrainTransfersPage } from "./components/pages/TrainTransfersPage";
import { DisneylandTransfersPage } from "./components/pages/DisneylandTransfersPage";
import { LongDistancePage } from "./components/pages/LongDistancePage";
import { OtherTransfersPage } from "./components/pages/OtherTransfersPage";
import { MarriagePage } from "./components/pages/MarriagePage";
import { GroupTransportationPage } from "./components/pages/GroupTransportationPage";
import { MedicalTourismPage } from "./components/pages/MedicalTourismPage";

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [showSplash, setShowSplash] = useState(true);

  // Expose a simple global navigation helper for CTAs across the app
  useEffect(() => {
    (window as any).mfdNavigate = setCurrentPage;
    return () => {
      try { delete (window as any).mfdNavigate; } catch {}
    };
  }, []);

  const handleServiceClick = (serviceType: string) => {
    console.log('App handleServiceClick called with:', serviceType);
    switch (serviceType) {
      case 'transfer':
        console.log('Navigating to transfer page');
        setCurrentPage('transfer');
        break;
      case 'daily rate':
        console.log('Navigating to daily-rate page');
        setCurrentPage('daily-rate');
        break;
      case 'tours':
        console.log('Navigating to tours page');
        setCurrentPage('tours');
        break;
      case 'events':
        console.log('Navigating to events page');
        setCurrentPage('events');
        break;
      default:
        console.log('Navigating to home page');
        setCurrentPage('home');
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onServiceClick={handleServiceClick} />;
      case 'services':
        return <ServicesPage />;
      case 'airport':
        return <AirportPage />;
      case 'business':
        return <BusinessPage />;
      case 'business-benefits':
        return <BusinessBenefitsPage />;
      case 'personalization':
        return <PersonalizationPage />;
      case 'diplomacy':
        return <DiplomacyPage />;
      case 'vip-service':
        return <VipServicePage />;
      case 'close-protection':
        return <CloseProtectionPage />;
      case 'ski-resorts':
        return <SkiResortsPage />;
      case 'private-transportation':
        return <PrivateTransportationPage />;
      case 'news':
        return <NewsPage />;
      case 'corporate':
        return <CorporatePage />;
      case 'transfer':
        return <TransferPage />;
      case 'daily-rate':
        return <DailyRatePage />;
      case 'events':
        return <EventsPage />;
      case 'tours':
        return <ToursPage />;
      case 'fleet':
        return <FleetPage />;
      case 'about':
        return <AboutPage />;
      case 'safety':
        return <SafetyPage />;
      case 'pricing':
        return <PricingPage />;
      case 'booking-driver':
        return <BookingDriverPage onNavigate={setCurrentPage} />;
      case 'booking-vehicle':
        return <BookingVehiclePage onNavigate={setCurrentPage} />;
      case 'booking-information':
        return <BookingInformationPage onNavigate={setCurrentPage} />;
      case 'contact':
        return <ContactPage />;
      case 'faq':
        return <FAQPage />;
      case 'reviews':
        return <ReviewsPage />;
      case 'brand':
        return <BrandPage />;
      case 'service247':
        return <Service247Page />;
      case 'train-transfers':
        return <TrainTransfersPage />;
      case 'disneyland-transfers':
        return <DisneylandTransfersPage />;
      case 'long-distance':
        return <LongDistancePage />;
      case 'other-transfers':
        return <OtherTransfersPage />;
      case 'marriage':
        return <MarriagePage />;
      case 'group-transportation':
        return <GroupTransportationPage />;
      case 'medical-tourism':
        return <MedicalTourismPage />;
      default:
        return <HomePage onServiceClick={handleServiceClick} />;
    }
  };

  // Override back button for service pages
  if (['transfer', 'daily-rate', 'tours', 'events'].includes(currentPage)) {
    window.history.back = () => setCurrentPage('home');
  }

  // Splash screen: show logo, zoom in, then reveal homepage
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShowSplash(false);
      return;
    }
    
    // Hide splash after smooth animation completes
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2800); // Match animation duration
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let cleanup: void | (() => void);
    (async () => {
      const { applyGlobalScrollReveal } = await import("./utils/scrollReveal");
      const root = document.getElementById("root");
      cleanup = applyGlobalScrollReveal(root!);
    })();
    return () => {
      if (typeof cleanup === "function") cleanup();
    };
  }, [currentPage]);

  return (
    <div className="min-h-screen bg-background">
      {showSplash ? (
        <div
          className="fixed inset-0 z-[100] bg-white flex items-center justify-center"
          data-no-reveal
        >
          <img
            src={getAssetPath("logo.png")}
            alt="My French Driver Logo"
            className="w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] object-contain animate-splash-zoom"
          />
        </div>
      ) : (
        <>
          <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
          <main>
            {renderPage()}
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}