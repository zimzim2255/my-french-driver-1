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
  Mail as MailIcon,
  Facebook,
  Instagram,
  MessageCircle,
  Languages,
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

      setIsScrolled(currentScrollY > 50);

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

  // Check if we're on home page and should show transparent nav
  const isHomePage = currentPage === 'home';
  const shouldBeTransparent = isHomePage && !isScrolled;

  const handlePageChange = (pageId: string) => {
    onPageChange(pageId);
    setMobileMenuOpen(false);
  };

  const GoldIcon = ({ Icon, className = "" }: { Icon: React.ElementType, className?: string }) => (
    <Icon className={`w-5 h-5 text-[#D4AF37] ${className}`} />
  );

  const DesktopDropdown = ({ item, shouldBeTransparent }: { item: MenuItem, shouldBeTransparent: boolean }) => {
    if (!item.children || item.children.length === 0) return null;

    const grandchildrenSection = item.children.find((c) => c.children && c.children.length);
    const directChildren = item.children.filter((c) => !c.children || c.children.length === 0);

    return (
      <div className="group relative">
        <button
          onClick={() => handlePageChange(item.id)}
          className={`relative text-sm xl:text-base font-semibold uppercase tracking-wide transition-all duration-300 group flex items-center gap-2 ${
            currentPage === item.id 
              ? (shouldBeTransparent ? 'text-white' : 'text-gray-900') 
              : (shouldBeTransparent ? 'text-white/90 hover:text-white' : 'text-gray-700 hover:text-gray-900')
          }`}
        >
          {item.icon && <GoldIcon Icon={item.icon} />}
          <span className="relative z-10">{item.label}</span>
        </button>
        <div className="absolute top-full left-0 mt-2 min-w-[18rem] bg-white border rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 p-2">
          {grandchildrenSection && (
            <div className="px-2 py-2">
              <div className="px-2 pb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide">{grandchildrenSection.label}</div>
              <div className="grid grid-cols-1">
                {grandchildrenSection.children!.map((gc) => (
                  <button
                    key={gc.id}
                    onClick={() => handlePageChange(gc.id)}
                    className={`w-full text-left px-4 py-2 text-sm rounded-md hover:bg-gray-50 transition-all duration-200 ${
                      currentPage === gc.id ? 'text-gray-900 bg-gray-50' : 'text-gray-700'
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
                    className={`w-full text-left px-4 py-2 text-sm rounded-md hover:bg-gray-50 transition-all duration-200 ${
                      currentPage === c.id ? 'text-gray-900 bg-gray-50' : 'text-gray-700'
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
      } ${shouldBeTransparent ? 'bg-transparent' : 'bg-white/95 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.06)]'}`}
    >
      {/* Top contact strip */}
      <div className={`hidden md:block transition-all duration-300 ${shouldBeTransparent ? 'border-b border-white/20' : 'border-b border-gray-200'}`}>
        <div className="container mx-auto px-4 py-2 flex items-center justify-between text-sm">
          <div className={`flex items-center gap-6 transition-colors duration-300 ${shouldBeTransparent ? 'text-white' : 'text-gray-600'}`}>
            <div className="flex items-center gap-2">
              <PhoneLine className={`w-4 h-4 transition-colors duration-300 ${shouldBeTransparent ? 'text-yellow-400' : 'text-yellow-600'}`} />
              <span>+33.7.64.01.33.81</span>
            </div>
            <div className="flex items-center gap-2">
              <MailIcon className={`w-4 h-4 transition-colors duration-300 ${shouldBeTransparent ? 'text-yellow-400' : 'text-yellow-600'}`} />
              <span>contact@myfrenchdriver.com</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button
              onClick={() => handlePageChange('booking-driver')}
              className="h-9 px-4 rounded-[3px] uppercase font-semibold tracking-wide"
              style={{ backgroundColor: '#C9A659', color: '#1f2937' }}
            >
              BOOK YOUR DRIVER
            </Button>
            <div className={`hidden lg:flex items-center gap-3 transition-colors duration-300 ${shouldBeTransparent ? 'text-white/80' : 'text-gray-500'}`}>
              <a aria-label="Facebook" href="#" className={`transition-colors duration-300 ${shouldBeTransparent ? 'hover:text-white' : 'hover:text-gray-700'}`}>
                <Facebook className="w-4 h-4" />
              </a>
              <a aria-label="Instagram" href="#" className={`transition-colors duration-300 ${shouldBeTransparent ? 'hover:text-white' : 'hover:text-gray-700'}`}>
                <Instagram className="w-4 h-4" />
              </a>
              <a aria-label="WhatsApp" href="#" className={`transition-colors duration-300 ${shouldBeTransparent ? 'hover:text-white' : 'hover:text-gray-700'}`}>
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation row */}
      <div className={`transition-all duration-300 ${shouldBeTransparent ? 'border-b border-white/10' : 'border-b border-gray-100'}`}>
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <div
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => handlePageChange('home')}
          >
            <img
              src={getAssetPath("logo.png")}
              alt="My French Driver Logo"
              className="w-16 h-16 lg:w-20 lg:h-20 object-contain"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {menuItems.map((item) => {
              const isSimple = !item.children || item.children.length === 0;
              if (isSimple) {
                return (
                  <button
                    key={item.id}
                    onClick={() => handlePageChange(item.id)}
                    className={`relative text-sm xl:text-base font-semibold uppercase tracking-wide transition-all duration-300 group flex items-center gap-2 ${
                      currentPage === item.id 
                        ? (shouldBeTransparent ? 'text-white' : 'text-gray-900') 
                        : (shouldBeTransparent ? 'text-white/90 hover:text-white' : 'text-gray-700 hover:text-gray-900')
                    }`}
                  >
                    {item.icon && <GoldIcon Icon={item.icon} />}
                    <span className="relative z-10">{item.label}</span>
                  </button>
                );
              }
              return <DesktopDropdown key={item.id} item={item} shouldBeTransparent={shouldBeTransparent} />;
            })}
          </nav>

          {/* Right-side: language */}
          <div className={`hidden lg:flex items-center gap-3 pl-6 transition-all duration-300 ${shouldBeTransparent ? 'border-l border-white/20' : 'border-l border-gray-200'}`}>
            <button 
              className={`p-2 rounded-md transition-colors duration-300 ${
                shouldBeTransparent ? 'text-white hover:text-white/80' : 'text-gray-700 hover:text-gray-900'
              }`} 
              aria-label="Change language"
            >
              <Languages className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden flex items-center gap-2">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`p-2 transition-colors duration-300 ${shouldBeTransparent ? 'text-white hover:text-white/80' : 'text-gray-700 hover:text-gray-900'}`}
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
                      className="w-14 h-14 object-contain mx-auto mb-3"
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
                              <span className="uppercase tracking-wide text-sm">{item.label}</span>
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
                    <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                      <PhoneLine className="w-4 h-4" />
                      <span>+33.7.64.01.33.81</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                      <MailIcon className="w-4 h-4" />
                      <span>contact@myfrenchdriver.com</span>
                    </div>
                    <Button
                      onClick={() => handlePageChange('booking-driver')}
                      className="w-full rounded-[3px] uppercase font-semibold tracking-wide"
                      style={{ backgroundColor: '#C9A659', color: '#1f2937' }}
                    >
                      BOOK YOUR DRIVER
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
