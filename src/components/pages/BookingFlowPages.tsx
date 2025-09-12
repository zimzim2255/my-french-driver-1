import { useEffect, useMemo, useState } from "react";
import haversine from "haversine-distance";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { CheckCircle, Clock, MapPin, Plane, Train, Users, Plus, X } from "lucide-react";
import { bookingService } from "../../services/api";
import StripePaymentForm from "../StripePaymentForm";
import { stripeService } from "../../services/stripe";

// -------------------- Types --------------------
export interface PlaceSuggestion {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
  class?: string;
  type?: string;
  address?: {
    city?: string;
    town?: string;
    municipality?: string;
    county?: string;
    state?: string;
    postcode?: string;
    country_code?: string;
    [key: string]: any;
  };
}

export interface Location {
  text: string;
  lat?: number;
  lon?: number;
}

export type TravelType = "none" | "flight" | "train";
export type BookingMode = "transfer" | "daily";

export interface Itinerary {
  pickup: Location;
  dropoff: Location;
  extraStops?: Location[]; // Additional stops between pickup and dropoff
  pickupDate: string; // YYYY-MM-DD
  pickupTime: string; // HH:mm
  passengers: number;
  travelType: TravelType;
  bookingMode?: BookingMode;
  dailyHours?: number;
  flightNumber?: string;
  trainNumber?: string;
  terminal?: string;
  notes?: string;
  serviceType?: string;
}

export interface VehicleOption {
  id: string;
  name: string;
  capacity: number;
  base: number;
  perKm: number;
  description?: string;
  image?: string;
}

export interface VehicleSelection {
  vehicleId: string;
  vehicleName: string;
  price: number;
  distanceKm: number;
  durationMin: number;
}

export interface ContactInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialRequests?: string;
}

// -------------------- Simple booking store (localStorage-backed) --------------------
const STORAGE_KEYS = {
  itinerary: "mfd_booking_itinerary",
  vehicle: "mfd_booking_vehicle",
  contact: "mfd_booking_contact",
};

const bookingStore = {
  setItinerary: (it: Itinerary) => {
    localStorage.setItem(STORAGE_KEYS.itinerary, JSON.stringify(it));
  },
  getItinerary: (): Itinerary | null => {
    const raw = localStorage.getItem(STORAGE_KEYS.itinerary);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as Itinerary;
    } catch {
      return null;
    }
  },
  setVehicle: (v: VehicleSelection) => {
    localStorage.setItem(STORAGE_KEYS.vehicle, JSON.stringify(v));
  },
  getVehicle: (): VehicleSelection | null => {
    const raw = localStorage.getItem(STORAGE_KEYS.vehicle);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as VehicleSelection;
    } catch {
      return null;
    }
  },
  setContact: (c: ContactInfo) => {
    localStorage.setItem(STORAGE_KEYS.contact, JSON.stringify(c));
  },
  getContact: (): ContactInfo | null => {
    const raw = localStorage.getItem(STORAGE_KEYS.contact);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as ContactInfo;
    } catch {
      return null;
    }
  },
  clear: () => {
    localStorage.removeItem(STORAGE_KEYS.itinerary);
    localStorage.removeItem(STORAGE_KEYS.vehicle);
    localStorage.removeItem(STORAGE_KEYS.contact);
  },
};

// -------------------- Shared helpers --------------------
function isFutureDateTime(dateStr: string, timeStr: string) {
  if (!dateStr || !timeStr) return false;
  const [h, m] = timeStr.split(":").map((n) => parseInt(n, 10));
  const d = new Date(dateStr + "T00:00:00");
  d.setHours(h || 0, m || 0, 0, 0);
  return d.getTime() > Date.now();
}

function formatDuration(mins: number) {
  const h = Math.floor(mins / 60);
  const m = Math.round(mins % 60);
  if (h <= 0) return `${m} min`;
  return `${h}h ${m}m`;
}

function computeDistanceKm(a?: Location, b?: Location) {
  if (!a || !b || a.lat == null || a.lon == null || b.lat == null || b.lon == null) return 0;
  const meters = haversine(
    { latitude: a.lat, longitude: a.lon },
    { latitude: b.lat, longitude: b.lon }
  );
  return meters / 1000;
}

const VEHICLES: VehicleOption[] = [
  { id: "sedan", name: "Mercedes Classe C", capacity: 3, base: 30, perKm: 2.0, description: "Comfortable for up to 3 passengers", image: "/assets/Nouveau site internet/PICTURES OF FLEET/mercedes classe C baniere .png" },
  { id: "premium-sedan", name: "Mercedes Classe E", capacity: 3, base: 40, perKm: 2.4, description: "Luxury sedan, leather seats", image: "/assets/Nouveau site internet/PICTURES OF FLEET/classe E.png" },
  { id: "van", name: "Mercedes Classe V", capacity: 7, base: 55, perKm: 3.0, description: "Spacious van for groups up to 7", image: "/assets/Nouveau site internet/PICTURES OF FLEET/mercedes classe V .jpg" },
];

const SERVICE_TYPES = [
  { id: "airport", name: "Airport Transfers", description: "Professional transfers to/from all Paris airports" },
  { id: "vip", name: "VIP Service", description: "Luxury transportation with premium amenities" },
  { id: "diplomacy", name: "Diplomacy Service", description: "Discrete and secure transportation for diplomatic missions" },
  { id: "business", name: "Business & Corporate", description: "Executive transportation for business needs" },
  { id: "wedding", name: "Wedding & Events", description: "Elegant transportation for special occasions" },
  { id: "medical", name: "Medical Tourism", description: "Comfortable transport for medical appointments" },
  { id: "private", name: "Private Transportation", description: "Personalized chauffeur service" },
  { id: "group", name: "Group Transportation", description: "Transport solutions for groups and events" },
  { id: "long-distance", name: "Long Distance", description: "Comfortable travel for longer journeys" },
  { id: "train", name: "Train Station Transfers", description: "Transfers to/from all Paris train stations" },
  { id: "disneyland", name: "Disneyland Transfers", description: "Family-friendly transfers to Disneyland Paris" },
  { id: "ski", name: "Ski Resort Transfers", description: "Transportation to French ski resorts" },
  { id: "24-7", name: "24/7 Service", description: "Round-the-clock transportation service" },
  { id: "close-protection", name: "Close Protection", description: "Security transportation services" },
  { id: "tours", name: "Tours & Excursions", description: "Guided tours and sightseeing trips" },
  { id: "other", name: "Other Services", description: "Custom transportation solutions" }
];

// Predefined Paris airports and train stations
const PARIS_AIRPORTS: PlaceSuggestion[] = [
  { place_id: 10001, display_name: "Paris Charles de Gaulle Airport (CDG)", lat: "49.0097", lon: "2.5479", class: "aeroway", type: "aerodrome" },
  { place_id: 10002, display_name: "Paris Orly Airport (ORY)", lat: "48.7262", lon: "2.3652", class: "aeroway", type: "aerodrome" },
  { place_id: 10003, display_name: "Le Bourget Airport (LBG)", lat: "48.9692", lon: "2.4419", class: "aeroway", type: "aerodrome" },
];

const PARIS_TRAIN_STATIONS: PlaceSuggestion[] = [
  { place_id: 11001, display_name: "Gare du Nord", lat: "48.8809", lon: "2.3553", class: "railway", type: "station" },
  { place_id: 11002, display_name: "Gare de l'Est", lat: "48.8761", lon: "2.3593", class: "railway", type: "station" },
  { place_id: 11003, display_name: "Gare de Lyon", lat: "48.8443", lon: "2.3746", class: "railway", type: "station" },
  { place_id: 11004, display_name: "Gare Montparnasse", lat: "48.8397", lon: "2.3200", class: "railway", type: "station" },
  { place_id: 11005, display_name: "Gare Saint-Lazare", lat: "48.8756", lon: "2.3266", class: "railway", type: "station" },
  { place_id: 11006, display_name: "Gare d'Austerlitz", lat: "48.8422", lon: "2.3652", class: "railway", type: "station" },
  { place_id: 11007, display_name: "Paris Bercy (Gare de Bercy)", lat: "48.8406", lon: "2.3809", class: "railway", type: "station" },
];

// -------------------- Step 1: Booking Driver --------------------
export function BookingDriverPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [pickup, setPickup] = useState<Location>({ text: "" });
  const [dropoff, setDropoff] = useState<Location>({ text: "" });
  const [extraStops, setExtraStops] = useState<Location[]>([]);
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [passengers, setPassengers] = useState<number>(1);
  const [travelType, setTravelType] = useState<TravelType>("none");
  const [bookingMode, setBookingMode] = useState<BookingMode>('transfer');
  const [dailyHours, setDailyHours] = useState<number>(1);
  const [flightNumber, setFlightNumber] = useState("");
  const [trainNumber, setTrainNumber] = useState("");
  const [terminal, setTerminal] = useState("");
  const [notes, setNotes] = useState("");
  const [serviceType, setServiceType] = useState<string>("");

  const [suggestions, setSuggestions] = useState<PlaceSuggestion[]>([]);
  const [activeField, setActiveField] = useState<string | null>(null);

  // Pre-fill if available
  useEffect(() => {
    const it = bookingStore.getItinerary();
    if (it) {
      setPickup(it.pickup ?? { text: "" });
      setDropoff(it.dropoff ?? { text: "" });
      setExtraStops(it.extraStops || []);
      setPickupDate(it.pickupDate || "");
      setPickupTime(it.pickupTime || "");
      setPassengers(it.passengers || 1);
      setTravelType(it.travelType || "none");
      setBookingMode(it.bookingMode || 'transfer');
      setDailyHours(it.dailyHours || 1);
      setFlightNumber(it.flightNumber || "");
      setTrainNumber(it.trainNumber || "");
      setTerminal(it.terminal || "");
      setNotes(it.notes || "");
      setServiceType(it.serviceType || "");
    }
  }, []);

  const fetchSuggestions = async (value: string, fieldKey: string) => {
    if (value.length < 3) {
      setSuggestions([]);
      setActiveField(null);
      return;
    }
    try {
      const params = new URLSearchParams({
        format: 'json',
        q: value,
        limit: '5',
        addressdetails: '1',
        countrycodes: 'fr',
        // Paris bounding box: left,top,right,bottom (lon,lat,lon,lat)
        viewbox: '2.224122,48.902144,2.469760,48.815575',
        bounded: '1',
        dedupe: '1',
      });
      const response = await fetch(`https://nominatim.openstreetmap.org/search?${params.toString()}`);
      const data: PlaceSuggestion[] = await response.json();
      const filtered = data.filter((item) => {
        const inParis = !!(
          (item.address?.city && item.address.city.toLowerCase() === 'paris') ||
          (item.address?.county && item.address.county.toLowerCase() === 'paris')
        );
        const typeMatch = !!(
          item.display_name &&
          (item.class === 'place' || item.type === 'city' || item.type === 'administrative' || item.class === 'highway')
        );
        return inParis && typeMatch;
      });
      setSuggestions(filtered);
      setActiveField(fieldKey);
    } catch (e) {
      console.error("Error fetching suggestions:", e);
      setSuggestions([]);
      setActiveField(null);
    }
  };

  const applySuggestion = (fieldKey: string, s: PlaceSuggestion) => {
    const loc: Location = {
      text: s.display_name,
      lat: parseFloat(s.lat),
      lon: parseFloat(s.lon),
    };

    if (fieldKey === "pickup") setPickup(loc);
    else if (fieldKey === "dropoff") setDropoff(loc);

    setSuggestions([]);
    setActiveField(null);
    };
    
    const showAirports = (fieldKey: string) => {
    setSuggestions(PARIS_AIRPORTS);
    setActiveField(fieldKey);
    };
    
    const showStations = (fieldKey: string) => {
    setSuggestions(PARIS_TRAIN_STATIONS);
    setActiveField(fieldKey);
    };
    
    const canContinue = useMemo(() => {
    if (!pickupDate || !pickupTime) return false;
    if (passengers < 1 || passengers > 7) return false;

    if (bookingMode === 'daily') {
      if (!pickup.text) return false;
      if (!dailyHours || dailyHours < 1) return false;
      return true;
    }

    // transfer mode
    if (!pickup.text || !dropoff.text) return false;
    return true;
  }, [pickup, dropoff, pickupDate, pickupTime, passengers, bookingMode, dailyHours]);

  const handleContinue = () => {
    if (!canContinue) return;
    
    const it: Itinerary = {
      pickup,
      dropoff,
      extraStops: extraStops.filter(stop => stop.text.trim() !== ''), // Only include non-empty stops
      pickupDate,
      pickupTime,
      passengers,
      travelType,
      bookingMode,
      dailyHours: bookingMode === 'daily' ? dailyHours : undefined,
      flightNumber: travelType === "flight" ? flightNumber.trim() : undefined,
      trainNumber: travelType === "train" ? trainNumber.trim() : undefined,
      terminal: terminal.trim() || undefined,
      notes: notes.trim() || undefined,
      serviceType: serviceType.trim() || undefined,
    };
    
    bookingStore.setItinerary(it);
    
    // Clear downstream selections
    localStorage.removeItem(STORAGE_KEYS.vehicle);
    localStorage.removeItem(STORAGE_KEYS.contact);
    
    onNavigate("booking-vehicle");
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section
        className="relative min-h-[60vh] flex items-center justify-center bg-center bg-cover"
        style={{ backgroundImage: "url('/assets/Nouveau site internet/EXCURSION .jpeg')" }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative container mx-auto px-4 text-center py-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Booking - Step 1/3</h1>
          <p className="text-lg md:text-xl text-yellow-400 font-semibold">Enter your itinerary and travel details</p>
          <div className="mt-6 max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-3 text-white text-sm">
            <div className="flex items-center justify-center gap-2"><CheckCircle className="w-4 h-4 text-yellow-400"/>24/7 Service</div>
            <div className="flex items-center justify-center gap-2"><CheckCircle className="w-4 h-4 text-yellow-400"/>Fixed Price</div>
            <div className="flex items-center justify-center gap-2"><CheckCircle className="w-4 h-4 text-yellow-400"/>Secure Payment</div>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-10 bg-gray-50">
        <div className="container mx-auto px-4 grid lg:grid-cols-3 gap-8 items-start">
          <Card className="bg-white/95 backdrop-blur-sm shadow-xl lg:col-span-2">
            <CardContent className="p-6 md:p-8">
              {/* Transfer vs Daily Rate Tabs */}
              <div className="mb-6">
                <div className="flex gap-3" role="tablist" aria-label="Pricing mode">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={bookingMode === 'transfer'}
                    className="px-6 py-3 text-sm font-semibold rounded-lg shadow-sm transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    onClick={() => setBookingMode('transfer')}
                    style={bookingMode === 'transfer' 
                      ? { background: 'linear-gradient(90deg,#D4AF37,#B8860B)', color: '#fff' }
                      : { backgroundColor: '#F3F4F6', color: '#374151' }}
                  >
                    Transfer
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={bookingMode === 'daily'}
                    className="px-6 py-3 text-sm font-semibold rounded-lg shadow-sm transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    onClick={() => setBookingMode('daily')}
                    style={bookingMode === 'daily' 
                      ? { background: 'linear-gradient(90deg,#D4AF37,#B8860B)', color: '#fff' }
                      : { backgroundColor: '#F3F4F6', color: '#374151' }}
                  >
                    Daily Rate
                  </button>
                </div>
              </div>

              <h3 className="text-lg font-medium mb-6 text-gray-700">Itinerary</h3>

              {/* Pickup */}
              <div className="relative mb-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-6 h-6 bg-black text-white rounded-sm flex items-center justify-center text-sm font-bold">
                    A
                  </div>
                  <span className="text-sm text-gray-600">Pick-up address</span>
                </div>
                <div className="relative">
                  <Input
                    placeholder="Pick-up address"
                    value={pickup.text}
                    onChange={(e) => {
                      const v = e.target.value;
                      setPickup((p) => ({ ...p, text: v }));
                      fetchSuggestions(v, "pickup");
                    }}
                    onBlur={() => setTimeout(() => setSuggestions([]), 150)}
                    className="pr-20 h-12 text-gray-600"
                  />
                  <div className="absolute right-2 inset-y-0 flex items-center gap-1">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      aria-label="Flight"
                      onMouseDown={(e) => { e.preventDefault(); showAirports('pickup'); }}
                      className="h-8 w-8"
                    >
                      <Plane className="w-4 h-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      aria-label="Train"
                      onMouseDown={(e) => { e.preventDefault(); showStations('pickup'); }}
                      className="h-8 w-8"
                    >
                      <Train className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                {suggestions.length > 0 && activeField === "pickup" && (
                  <ul className="absolute z-20 w-full bg-white border border-gray-200 rounded-md shadow-md mt-1 max-h-60 overflow-auto">
                    {suggestions.map((s) => (
                      <li key={s.place_id} className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-50" onMouseDown={() => applySuggestion("pickup", s)}>
                        {s.display_name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Dropoff */}
              {bookingMode === 'transfer' && (
              <div className="relative mb-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-6 h-6 bg-black text-white rounded-sm flex items-center justify-center text-sm font-bold">
                    B
                  </div>
                  <span className="text-sm text-gray-600">Drop-off address</span>
                </div>
                <div className="relative">
                  <Input
                    placeholder="Drop-off address"
                    value={dropoff.text}
                    onChange={(e) => {
                      const v = e.target.value;
                      setDropoff((p) => ({ ...p, text: v }));
                      fetchSuggestions(v, "dropoff");
                    }}
                    onBlur={() => setTimeout(() => setSuggestions([]), 150)}
                    className="pr-20 h-12 text-gray-600"
                  />
                  <div className="absolute right-2 inset-y-0 flex items-center gap-1">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      aria-label="Flight"
                      onMouseDown={(e) => { e.preventDefault(); showAirports('dropoff'); }}
                      className="h-8 w-8"
                    >
                      <Plane className="w-4 h-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      aria-label="Train"
                      onMouseDown={(e) => { e.preventDefault(); showStations('dropoff'); }}
                      className="h-8 w-8"
                    >
                      <Train className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                {suggestions.length > 0 && activeField === "dropoff" && (
                  <ul className="absolute z-20 w-full bg-white border border-gray-200 rounded-md shadow-md mt-1 max-h-60 overflow-auto">
                    {suggestions.map((s) => (
                      <li key={s.place_id} className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-50" onMouseDown={() => applySuggestion("dropoff", s)}>
                        {s.display_name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              )}

              {/* Add a Step Button */}
              {bookingMode === 'transfer' && (
              <div className="mb-6">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setExtraStops([...extraStops, { text: "" }])}
                  className="text-sm text-gray-600 border-gray-300"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add a Step
                </Button>
                
                {/* Extra Stops */}
                {extraStops.map((stop, index) => (
                  <div key={index} className="relative mt-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-6 h-6 bg-gray-500 text-white rounded-sm flex items-center justify-center text-sm font-bold">
                        {String.fromCharCode(67 + index)}
                      </div>
                      <span className="text-sm text-gray-600">Stop {index + 1} address</span>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex-1 relative">
                        <Input
                          placeholder={`Stop ${index + 1} address`}
                          value={stop.text}
                          onChange={(e) => {
                            const v = e.target.value;
                            const newStops = [...extraStops];
                            newStops[index] = { ...newStops[index], text: v };
                            setExtraStops(newStops);
                            fetchSuggestions(v, `extrastop-${index}`);
                          }}
                          onBlur={() => setTimeout(() => setSuggestions([]), 150)}
                          className="h-12 text-gray-600"
                        />
                        {suggestions.length > 0 && activeField === `extrastop-${index}` && (
                          <ul className="absolute z-20 w-full bg-white border border-gray-200 rounded-md shadow-md mt-1 max-h-60 overflow-auto">
                            {suggestions.map((s) => (
                              <li 
                                key={s.place_id} 
                                className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-50" 
                                onMouseDown={() => {
                                  const loc: Location = {
                                    text: s.display_name,
                                    lat: parseFloat(s.lat),
                                    lon: parseFloat(s.lon),
                                  };
                                  const newStops = [...extraStops];
                                  newStops[index] = loc;
                                  setExtraStops(newStops);
                                  setSuggestions([]);
                                  setActiveField(null);
                                }}
                              >
                                {s.display_name}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          const newStops = extraStops.filter((_, i) => i !== index);
                          setExtraStops(newStops);
                        }}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 h-12 w-12"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              )}

              {/* Date/Time/Passengers */}
              {bookingMode === 'daily' ? (
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Pick-up date</label>
                    <Input 
                      type="date" 
                      value={pickupDate} 
                      onChange={(e) => setPickupDate(e.target.value)}
                      placeholder="mm/dd/yyyy"
                      className="h-12"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Pick-up time</label>
                    <Input 
                      type="time" 
                      value={pickupTime} 
                      onChange={(e) => setPickupTime(e.target.value)}
                      placeholder="--:-- --"
                      className="h-12"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Duration</label>
                    <select className="w-full px-3 py-2 h-12 border border-border rounded-md bg-background" value={dailyHours} onChange={(e) => setDailyHours(parseInt(e.target.value, 10))}>
                      {Array.from({ length: 10 }).map((_, i) => (
                        <option key={i + 1} value={i + 1}>{i + 1}h</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Passengers Count</label>
                    <select className="w-full px-3 py-2 h-12 border border-border rounded-md bg-background" value={passengers} onChange={(e) => setPassengers(parseInt(e.target.value, 10))}>
                      {Array.from({ length: 7 }).map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Pick-up date</label>
                    <Input 
                      type="date" 
                      value={pickupDate} 
                      onChange={(e) => setPickupDate(e.target.value)}
                      placeholder="mm/dd/yyyy"
                      className="h-12"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Pick-up time</label>
                    <Input 
                      type="time" 
                      value={pickupTime} 
                      onChange={(e) => setPickupTime(e.target.value)}
                      placeholder="--:-- --"
                      className="h-12"
                    />
                  </div>
                </div>
              )}

              {/* Passengers Count */}
              <div className="mt-4">
                <label className="block text-sm text-gray-700 mb-1">Passengers Count</label>
                <select className="w-full px-3 py-2 h-12 border border-border rounded-md bg-background" value={passengers} onChange={(e) => setPassengers(parseInt(e.target.value, 10))}>
                  {Array.from({ length: 7 }).map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>

              {/* Estimation Button */}
              <div className="mt-6">
                <button
                  type="button"
                  onClick={handleContinue}
                  disabled={!canContinue}
                  className={`w-full h-12 md:h-12 uppercase font-semibold tracking-wide rounded-[3px] ${canContinue ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'}`}
                  style={{ backgroundColor: '#C9A659', color: '#FFFFFF' }}
                >
                  ESTIMATION
                </button>
                {!canContinue && (
                  <p className="text-xs mt-2 text-center text-gray-400">
                    Please fill in all required fields to get an estimation
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Right: Info */}
          <div className="text-gray-900 pt-2 lg:pt-6">
            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-200">Premium Service</Badge>
            <h2 className="mt-4 text-3xl md:text-4xl font-bold leading-tight text-gray-900">
              Why Choose Our
              <br />
              <span className="text-yellow-600">Booking Service?</span>
            </h2>
            <ul className="mt-6 space-y-4 text-base md:text-lg text-gray-700">
              <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-yellow-600 mt-0.5" /><span>A service available 24/7</span></li>
              <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-yellow-600 mt-0.5" /><span>Fixed price, you know the price in advance</span></li>
              <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-yellow-600 mt-0.5" /><span>Secure payment</span></li>
              <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-yellow-600 mt-0.5" /><span>Wifi, magazines, phone charger, sweets and refreshments</span></li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

// -------------------- Step 2: Booking Vehicle --------------------
export function BookingVehiclePage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const itinerary = bookingStore.getItinerary();

  const distanceKm = useMemo(() => computeDistanceKm(itinerary?.pickup, itinerary?.dropoff), [itinerary?.pickup, itinerary?.dropoff]);
  const durationMin = useMemo(() => Math.max(10, Math.round((distanceKm / 40) * 60)), [distanceKm]); // ~40km/h avg

  const options = useMemo(() => {
    const pax = itinerary?.passengers ?? 1;
    return VEHICLES.map((v) => {
      const price = Math.max(v.base, v.base + distanceKm * v.perKm);
      return { ...v, price };
    }).filter((v) => v.capacity >= pax);
  }, [distanceKm, itinerary?.passengers]);

  useEffect(() => {
    if (!itinerary || !itinerary.pickup?.text) {
      onNavigate("booking-driver");
      return;
    }
    if ((itinerary.bookingMode ?? 'transfer') === 'transfer' && !itinerary.dropoff?.text) {
      onNavigate("booking-driver");
    }
  }, [itinerary, onNavigate]);

  const selectVehicle = (v: VehicleOption & { price: number }) => {
    const sel: VehicleSelection = {
      vehicleId: v.id,
      vehicleName: v.name,
      price: Number(v.price.toFixed(2)),
      distanceKm: Number(distanceKm.toFixed(1)),
      durationMin,
    };
    bookingStore.setVehicle(sel);
    onNavigate("booking-information");
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section
        className="relative min-h-[60vh] flex items-center justify-center bg-center bg-cover"
        style={{ backgroundImage: "url('/assets/Nouveau site internet/EXCURSION .jpeg')" }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative container mx-auto px-4 text-center py-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Booking - Step 2/3</h1>
          <p className="text-lg md:text-xl text-yellow-400 font-semibold">Select a vehicle that suits your itinerary</p>
          <div className="mt-6 max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-3 text-white text-sm">
            <div className="flex items-center justify-center gap-2"><CheckCircle className="w-4 h-4 text-yellow-400"/>24/7 Service</div>
            <div className="flex items-center justify-center gap-2"><CheckCircle className="w-4 h-4 text-yellow-400"/>Fixed Price</div>
            <div className="flex items-center justify-center gap-2"><CheckCircle className="w-4 h-4 text-yellow-400"/>Secure Payment</div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <Button variant="outline" onClick={() => onNavigate("booking-driver")}>Back to Itinerary</Button>
        </div>

      {/* Summary */}
      {itinerary && (
        <Card className="mb-6">
          <CardContent className="p-4 grid md:grid-cols-4 gap-4 text-sm">
            <div>
              <div className="text-xs text-muted-foreground">From</div>
              <div className="font-medium flex items-center gap-2"><MapPin className="w-4 h-4" />{itinerary.pickup.text || '-'}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">To</div>
              <div className="font-medium flex items-center gap-2"><MapPin className="w-4 h-4" />{itinerary.dropoff.text || '-'}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Pickup</div>
              <div className="font-medium">{itinerary.pickupDate} {itinerary.pickupTime}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Passengers</div>
              <div className="font-medium">{itinerary.passengers}</div>
            </div>
          </CardContent>
        </Card>
      )}

      {(itinerary?.bookingMode ?? 'transfer') === 'transfer' && (
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm">Estimated distance: <span className="font-medium">{distanceKm.toFixed(1)} km</span> • Estimated duration: <span className="font-medium">{formatDuration(durationMin)}</span></div>
        <Button variant="outline" onClick={() => onNavigate("booking-driver")}>Edit itinerary</Button>
      </div>
      )}

      {/* Vehicles */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {options.map((v) => (
          <Card key={v.id} className="border-2 border-transparent hover:border-yellow-600 transition-colors overflow-hidden">
            <CardContent className="p-0">
              {/* Vehicle Image */}
              {v.image && (
                <div className="aspect-video w-full overflow-hidden bg-gray-100">
                  <img 
                    src={v.image} 
                    alt={v.name}
                    className="w-full h-full object-contain"
                  />
                </div>
              )}
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="text-xl font-semibold">{v.name}</div>
                    <div className="text-sm text-muted-foreground">Capacity: {v.capacity} passengers</div>
                  </div>
                  <div className="text-2xl font-bold text-yellow-700">€ {v.price.toFixed(2)}</div>
                </div>
                {v.description && <div className="mb-4 text-sm text-muted-foreground">{v.description}</div>}
                <div className="flex justify-end">
                  <Button onClick={() => selectVehicle(v)} className="w-full">Select</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {options.length === 0 && (
        <div className="mt-6 text-sm text-muted-foreground">No vehicle matches the passenger count. Please <button className="underline" onClick={() => onNavigate("booking-driver")}>go back</button> and adjust.</div>
      )}

      </div>
    </div>
  );
}

// -------------------- Step 3: Booking Information --------------------
export function BookingInformationPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const itinerary = bookingStore.getItinerary();
  const vehicle = bookingStore.getVehicle();

  useEffect(() => {
    if (!itinerary) onNavigate("booking-driver");
    else if (!vehicle) onNavigate("booking-vehicle");
  }, [itinerary, vehicle, onNavigate]);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string>("");
  const [bookingReference, setBookingReference] = useState<string>("");
  const [paymentIntent, setPaymentIntent] = useState<any>(null);

  // Prefill contact if any
  useEffect(() => {
    const c = bookingStore.getContact();
    if (c) {
      setFirstName(c.firstName || "");
      setLastName(c.lastName || "");
      setEmail(c.email || "");
      setPhone(c.phone || "");
      setSpecialRequests(c.specialRequests || "");
    }
  }, []);

  const emailValid = useMemo(() => /.+@.+\..+/.test(email), [email]);
  const phoneValid = useMemo(() => /^\+?[0-9\s-]{7,15}$/.test(phone), [phone]);

  const canPay = itinerary && vehicle && firstName && lastName && emailValid && phoneValid;

  const handlePaymentSuccess = async (paymentIntentResult: any) => {
    if (!itinerary || !vehicle) return;
    
    try {
      // Persist contact
      bookingStore.setContact({ firstName, lastName, email, phone, specialRequests });
      
      // Prepare booking data for backend
      const [pickupHour, pickupMinute] = itinerary.pickupTime.split(':');
      const bookingDateTime = new Date(itinerary.pickupDate);
      bookingDateTime.setHours(parseInt(pickupHour), parseInt(pickupMinute), 0, 0);
      
      // Map service type to backend format
      const serviceTypeMap: Record<string, 'city_ride' | 'airport_pickup' | 'train_pickup' | 'other'> = {
        'airport': 'airport_pickup',
        'train': 'train_pickup',
        'disneyland': 'other',
        'ski': 'other',
        'business': 'city_ride',
        'vip': 'city_ride',
        'diplomacy': 'city_ride',
        'wedding': 'other',
        'medical': 'other',
        'private': 'city_ride',
        'group': 'other',
        'long-distance': 'other',
        '24-7': 'city_ride',
        'close-protection': 'city_ride',
        'tours': 'other',
        'other': 'other'
      };
      
      const backendServiceType = itinerary.serviceType 
        ? serviceTypeMap[itinerary.serviceType] || 'city_ride'
        : 'city_ride';
      
      // Get service type name for display
      const serviceTypeName = itinerary.serviceType 
        ? SERVICE_TYPES.find(s => s.id === itinerary.serviceType)?.name 
        : undefined;
      
      const bookingData = {
        customer_name: `${firstName} ${lastName}`,
        customer_email: email,
        customer_phone: phone,
        service_type: backendServiceType,
        pickup_location: itinerary.pickup.text,
        dropoff_location: itinerary.dropoff.text,
        date_time: bookingDateTime.toISOString(),
        base_price: vehicle.price,
        flight_number: itinerary.travelType === 'flight' ? itinerary.flightNumber : undefined,
        train_number: itinerary.travelType === 'train' ? itinerary.trainNumber : undefined,
        special_requirements: [
          specialRequests,
          itinerary.notes,
          itinerary.terminal ? `Terminal: ${itinerary.terminal}` : '',
          itinerary.extraStops && itinerary.extraStops.length > 0 
            ? `Extra stops: ${itinerary.extraStops.map(stop => stop.text).join(', ')}` 
            : '',
          serviceTypeName ? `Service Type: ${serviceTypeName}` : '',
          `Vehicle: ${vehicle.vehicleName}`,
          `Distance: ${vehicle.distanceKm}km`,
          `Duration: ${Math.round(vehicle.durationMin)}min`,
          `Payment ID: ${paymentIntentResult.id}`
        ].filter(Boolean).join('. ')
      };
      
      // Submit booking to backend
      const response = await bookingService.create(bookingData);
      
      if (response.success && response.data) {
        setBookingReference(response.data.booking_reference);
        setPaymentIntent(paymentIntentResult);
        setSuccess(true);
        setError("");
        console.log('Booking created successfully:', response.data);
      } else {
        throw new Error(response.error || 'Failed to create booking');
      }
      
    } catch (err) {
      console.error('Booking error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred while processing your booking');
    }
  };

  const handlePaymentError = (errorMessage: string) => {
    setError(errorMessage);
    setSuccess(false);
  };

  if (!itinerary || !vehicle) return null;

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section
        className="relative min-h-[60vh] flex items-center justify-center bg-center bg-cover"
        style={{ backgroundImage: "url('/assets/Nouveau site internet/EXCURSION .jpeg')" }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative container mx-auto px-4 text-center py-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Booking - Step 3/3</h1>
          <p className="text-lg md:text-xl text-yellow-400 font-semibold">Enter your contact and payment details</p>
          <div className="mt-6 max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-3 text-white text-sm">
            <div className="flex items-center justify-center gap-2"><CheckCircle className="w-4 h-4 text-yellow-400"/>24/7 Service</div>
            <div className="flex items-center justify-center gap-2"><CheckCircle className="w-4 h-4 text-yellow-400"/>Fixed Price</div>
            <div className="flex items-center justify-center gap-2"><CheckCircle className="w-4 h-4 text-yellow-400"/>Secure Payment</div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <Button variant="outline" onClick={() => onNavigate("booking-vehicle")}>Back to Vehicle Selection</Button>
        </div>

      {success ? (
        <Card className="border-green-600">
          <CardContent className="p-8 text-center">
            <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
            <h2 className="text-2xl font-semibold mb-2">Booking Confirmed!</h2>
            <p className="text-muted-foreground mb-2">Your booking has been successfully created and stored.</p>
            {bookingReference && (
              <p className="text-lg font-semibold text-green-700 mb-4">
                Booking Reference: {bookingReference}
              </p>
            )}
            <p className="text-sm text-muted-foreground mb-6">A confirmation email will be sent shortly.</p>
            <div className="grid md:grid-cols-3 gap-4 text-left text-sm">
              <div>
                <div className="text-xs text-muted-foreground">Itinerary</div>
                <div className="font-medium">{itinerary.pickup.text}</div>
                <div className="font-medium">→ {itinerary.dropoff.text}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Schedule</div>
                <div className="font-medium">{itinerary.pickupDate} {itinerary.pickupTime}</div>
                <div className="text-xs">Passengers: {itinerary.passengers}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Vehicle</div>
                <div className="font-medium">{vehicle.vehicleName}</div>
                <div className="text-xs">€ {vehicle.price.toFixed(2)}</div>
              </div>
            </div>
            <div className="mt-6">
              <Button onClick={() => { bookingStore.clear(); onNavigate('home'); }}>Return to Home</Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {/* Summary */}
          <div className="md:col-span-1">
            <Card>
              <CardContent className="p-6 space-y-3 text-sm">
                <div className="font-semibold text-lg">Summary</div>
                <div className="flex justify-between"><span>From</span><span className="text-primary text-right ml-4">{itinerary.pickup.text}</span></div>
                <div className="flex justify-between"><span>To</span><span className="text-primary text-right ml-4">{itinerary.dropoff.text}</span></div>
                <div className="flex justify-between"><span>Pickup</span><span>{itinerary.pickupDate} {itinerary.pickupTime}</span></div>
                <div className="flex justify-between"><span>Passengers</span><span>{itinerary.passengers}</span></div>
                <div className="flex justify-between border-t pt-3"><span>Vehicle</span><span>{vehicle.vehicleName}</span></div>
                <div className="flex justify-between font-medium"><span>Total</span><span className="text-primary text-lg">€ {vehicle.price.toFixed(2)}</span></div>
                <div className="pt-2"><Button variant="outline" className="w-full" onClick={() => onNavigate("booking-vehicle")}>Change vehicle</Button></div>
              </CardContent>
            </Card>
          </div>

          {/* Contact + Payment */}
          <div className="md:col-span-2">
            <Card>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-1">First name</label>
                    <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Last name</label>
                    <Input value={lastName} onChange={(e) => setLastName(e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Email</label>
                    <Input value={email} onChange={(e) => setEmail(e.target.value)} className={!emailValid && email ? 'border-red-500' : ''} />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Phone (with country code)</label>
                    <Input value={phone} onChange={(e) => setPhone(e.target.value)} className={!phoneValid && phone ? 'border-red-500' : ''} />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm mb-1">Special requests</label>
                  <Textarea rows={3} value={specialRequests} onChange={(e) => setSpecialRequests(e.target.value)} />
                </div>

                {/* Stripe Payment Form */}
                <div className="mt-6">
                  {canPay ? (
                    <StripePaymentForm
                      amount={vehicle.price}
                      currency="eur"
                      customerInfo={{
                        firstName,
                        lastName,
                        email,
                        phone,
                        specialRequests
                      }}
                      bookingReference={stripeService.generateBookingReference()}
                      onPaymentSuccess={handlePaymentSuccess}
                      onPaymentError={handlePaymentError}
                      disabled={!canPay}
                    />
                  ) : (
                    <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg text-center">
                      <p className="text-sm text-gray-600">Please fill in all required contact information above to proceed with payment.</p>
                    </div>
                  )}
                </div>

                {error && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
