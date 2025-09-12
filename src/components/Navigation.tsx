import { getAssetPath } from "../utils/assetPath";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import {
  Phone as PhoneLine,
  MapPin,
  Menu,
  ChevronDown,
  Home as HomeIcon,
  Car as CarIcon,
  Briefcase as BriefcaseIcon,
  Shield as ShieldIcon,
  Mountain as MountainIcon,
  Star as StarIcon,
} from "lucide-react";

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

type MenuItem = {
  id: string;
  label: string;
  icon?: React.ElementType;
  children?: MenuItem[];
};

// Structured navigation definition with icons and hierarchy
const menuItems: MenuItem[] = [
  {
    id: "home",
    label: "Home",
    icon: HomeIcon,
    children: [
      { id: "the-brand", label: "The Brand" },
      { id: "the-fleet", label: "The Fleet" },
      { id: "service-24-7", label: "A 24/7 Service" },
    ],
  },
  {
    id: "services",
    label: "Our Services",
    icon: CarIcon,
    children: [
      {
        id: "transfers",
        label: "Transfers",
        children: [
          { id: "airport", label: "Airport Transfers" },
          { id: "train-transfers", label: "Train Station Transfers" },
          { id: "disney-transfers", label: "Disneyland Transfers" },
          { id: "long-distance", label: "Long Distance" },
          { id: "other-transfers", label: "Other Transfers" },
        ],
      },
      { id: "daily-rate", label: "Daily Rate" },
      { id: "tours", label: "TOURS" },
      { id: "events", label: "Events" },
      { id: "marriage", label: "Marriage" },
      { id: "group-transportation", label: "Group transportation" },
      { id: "medical-tourism", label: "Medical tourism" },
    ],
  },
  {
    id: "business",
    label: "Business",
    icon: BriefcaseIcon,
    children: [
      { id: "business-benefits", label: "Benefits" },
      { id: "business-personalization", label: "Personalization" },
    ],
  },
  {
    id: "diplomacy",
    label: "Diplomacy",
    icon: ShieldIcon,
    children: [
      { id: "vip-service", label: "VIP service" },
      { id: "close-protection", label: "Close protection" },
    ],
  },
  { id: "contact", label: "Contact", icon: PhoneLine },
  { id: "booking-driver", label: "Book a Driver" },
  {
    id: "ski-resorts",
    label: "Ski Resorts",
    icon: MountainIcon,
    children: [
      { id: "ski-services", label: "Our private transportation services" },
      { id: "news", label: "NEWS" },
    ],
  },
  { id: "reviews", label: "REVIEWS", icon: StarIcon },
];

export function Navigation({ currentPage, onPageChange }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Mobile accordions open state
  const [openMobile, setOpenMobile] = useState<string | null>(null);
  const [openMobileSub, setOpenMobileSub] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setIsScrolled(currentScrollY > 100);

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handlePageChange = (pageId: string) => {
    onPageChange(pageId);
    setMobileMenuOpen(false);
  };

  const GoldIcon = ({ Icon, className = "" }: { Icon: React.ElementType, className?: string }) => (
    <Icon className={`w-5 h-5 text-[#D4AF37] ${className}`} />
  );

  const DesktopDropdown = ({ item }: { item: MenuItem }) => {
    if (!item.children || item.children.length === 0) return null;

    const grandchildrenSection = item.children.find((c) => c.children && c.children.length);
    const directChildren = item.children.filter((c) => !c.children || c.children.length === 0);

    return (
      <div className="group relative">
        <button
          onClick={() => handlePageChange(item.id)}
          className={`relative text-base transition-all duration-300 group flex items-center gap-2 ${
            currentPage === item.id ? 'text-primary' : 'hover:text-primary'
          }`}
        >
          {item.icon && <GoldIcon Icon={item.icon} />}
          <span className="relative z-10">{item.label}</span>
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
          <span className="absolute inset-0 bg-primary/5 rounded-lg transform scale-0 group-hover:scale-100 transition-transform duration-200 -z-10" />
        </button>
        <div className="absolute top-full left-0 mt-2 min-w-[18rem] bg-card/95 backdrop-blur-md border rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 p-2">
          {grandchildrenSection && (
            <div className="px-2 py-2">
              <div className="px-2 pb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide">{grandchildrenSection.label}</div>
              <div className="grid grid-cols-1">
                {grandchildrenSection.children!.map((gc) => (
                  <button
                    key={gc.id}
                    onClick={() => handlePageChange(gc.id)}
                    className={`w-full text-left px-4 py-2 text-sm rounded-md hover:bg-primary/10 hover:text-primary transition-all duration-200 ${
                      currentPage === gc.id ? 'text-primary bg-primary/10' : ''
                    }`}
                  >
                    {gc.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {directChildren.length > 0 && (
            <div className="px-2 py-2 border-t border-border/50">
              <div className="grid grid-cols-1">
                {directChildren.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => handlePageChange(c.id)}
                    className={`w-full text-left px-4 py-2 text-sm rounded-md hover:bg-primary/10 hover:text-primary transition-all duration-200 ${
                      currentPage === c.id ? 'text-primary bg-primary/10' : ''
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      } ${
        isScrolled
          ? 'bg-background/95 backdrop-blur-md border-b shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div
          className="flex items-center space-x-3 cursor-pointer group"
          onClick={() => handlePageChange('home')}
        >
          <img
            src={getAssetPath("logo.png")}
            alt="My French Driver Logo"
            className="w-16 h-16 lg:w-20 lg:h-20 object-contain group-hover:scale-105 transition-transform duration-200"
          />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          {menuItems.map((item) => {
            const isSimple = !item.children || item.children.length === 0;
            if (isSimple) {
              return (
                <button
                  key={item.id}
                  onClick={() => handlePageChange(item.id)}
                  className={`relative text-base transition-all duration-300 group flex items-center gap-2 ${
                    currentPage === item.id ? 'text-primary' : 'hover:text-primary'
                  }`}
                >
                  {item.icon && <GoldIcon Icon={item.icon} />}
                  <span className="relative z-10">{item.label}</span>
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary transform origin-left transition-transform duration-300 ${
                    currentPage === item.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`} />
                  <span className="absolute inset-0 bg-primary/5 rounded-lg transform scale-0 group-hover:scale-100 transition-transform duration-200 -z-10" />
                </button>
              );
            }
            return <DesktopDropdown key={item.id} item={item} />;
          })}
        </nav>

        {/* Contact Info & CTA */}
        <div className="flex items-center space-x-4">
          <div className="hidden xl:flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors duration-200 group">
              <PhoneLine className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
              <span>+33 1 42 60 30 30</span>
            </div>
            <div className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors duration-200 group">
              <MapPin className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
              <span>Paris & Île-de-France</span>
            </div>
          </div>
          <Button
            onClick={() => handlePageChange('booking-driver')}
            className="hidden md:flex relative overflow-hidden group hover:scale-105 transition-all duration-200"
          >
            <span className="relative z-10">Book Now</span>
            <span className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </Button>

          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden p-2 hover:bg-primary/10 hover:scale-105 transition-all duration-200"
              >
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 bg-card/95 backdrop-blur-md">
              <div className="flex flex-col space-y-4 mt-8">
                <div className="text-center pb-4 border-b border-border/50">
                  <img
                    src={getAssetPath("logo.png")}
                    alt="My French Driver Logo"
                    className="w-14 h-14 object-contain mx-auto mb-3 hover:scale-105 transition-transform duration-200"
                  />
                </div>

                <div className="space-y-1">
                  {menuItems.map((item) => {
                    const hasChildren = item.children && item.children.length > 0;
                    const isOpen = openMobile === item.id;
                    const Icon = item.icon;
                    return (
                      <div key={item.id} className="">
                        <button
                          onClick={() => {
                            if (hasChildren) {
                              setOpenMobile(isOpen ? null : item.id);
                            } else {
                              handlePageChange(item.id);
                            }
                          }}
                          className={`w-full flex items-center justify-between p-3 rounded-lg hover:bg-primary/10 hover:text-primary transition-all duration-200 ${
                            currentPage === item.id ? 'bg-primary/10 text-primary' : ''
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            {Icon && <Icon className="w-5 h-5 text-[#D4AF37]" />}
                            <span>{item.label}</span>
                          </span>
                          {hasChildren && (
                            <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                          )}
                        </button>

                        {hasChildren && isOpen && (
                          <div className="pl-2 pb-2">
                            {item.children!.map((child) => {
                              const hasGrandchildren = child.children && child.children.length > 0;
                              const isSubOpen = openMobileSub === child.id;
                              return (
                                <div key={child.id} className="">
                                  <button
                                    onClick={() => {
                                      if (hasGrandchildren) {
                                        setOpenMobileSub(isSubOpen ? null : child.id);
                                      } else {
                                        handlePageChange(child.id);
                                      }
                                    }}
                                    className="w-full flex items-center justify-between p-2 rounded-md hover:bg-primary/10 hover:text-primary text-sm"
                                  >
                                    <span>{child.label}</span>
                                    {hasGrandchildren && (
                                      <ChevronDown className={`w-4 h-4 transition-transform ${isSubOpen ? 'rotate-180' : ''}`} />
                                    )}
                                  </button>

                                  {hasGrandchildren && isSubOpen && (
                                    <div className="pl-2">
                                      {child.children!.map((gc) => (
                                        <button
                                          key={gc.id}
                                          onClick={() => handlePageChange(gc.id)}
                                          className={`w-full text-left p-2 rounded-md hover:bg-primary/10 hover:text-primary text-sm ${
                                            currentPage === gc.id ? 'bg-primary/10 text-primary' : ''
                                          }`}
                                        >
                                          {gc.label}
                                        </button>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="pt-4 border-t border-border/50 space-y-3">
                  <div className="flex items-center space-x-3 text-sm text-muted-foreground hover:text-primary transition-colors duration-200 group">
                    <PhoneLine className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                    <span>+33 1 42 60 30 30</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-muted-foreground hover:text-primary transition-colors duration-200 group">
                    <MapPin className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                    <span>Paris & Île-de-France</span>
                  </div>
                  <Button
                    onClick={() => handlePageChange('booking-driver')}
                    className="w-full hover:scale-105 transition-all duration-200 relative overflow-hidden group"
                  >
                    <span className="relative z-10">Book Now</span>
                    <span className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
