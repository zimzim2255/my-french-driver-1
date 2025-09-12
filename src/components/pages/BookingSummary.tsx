import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { CreditCard } from 'lucide-react';

export function BookingSummary() {
  // Dummy data for demonstration
  const pickupLocation = { lat: 48.8566, lng: 2.3522, name: "Pickup Location" };
  const dropoffLocation = { lat: 48.8606, lng: 2.3267, name: "Dropoff Location" };
  const distance = 5; // in kilometers
  const pricePerKm = 2.5;
  const total = distance * pricePerKm;

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl md:text-5xl mb-6 text-center">Payment</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl mb-4">Your Ride Details</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Pickup:</span>
                  <span className="text-primary">{pickupLocation.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Dropoff:</span>
                  <span className="text-primary">{dropoffLocation.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Distance:</span>
                  <span>{distance} km</span>
                </div>
                <div className="border-t pt-3 flex justify-between font-medium">
                  <span>Total Price:</span>
                  <span className="text-primary text-lg">€{total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="mt-6">
            <CardContent className="p-6">
              <h3 className="text-xl mb-4">Payment Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm mb-2">Card Number</label>
                  <div className="relative">
                    <Input placeholder="**** **** **** ****" />
                    <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-2">Expiry Date</label>
                    <Input placeholder="MM/YY" />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">CVC</label>
                    <Input placeholder="***" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="mt-6 text-center">
            <Button size="lg">Pay Now</Button>
          </div>
        </div>
        <div>
          <MapContainer center={[pickupLocation.lat, pickupLocation.lng]} zoom={13} style={{ height: '400px', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[pickupLocation.lat, pickupLocation.lng]}>
              <Popup>{pickupLocation.name}</Popup>
            </Marker>
            <Marker position={[dropoffLocation.lat, dropoffLocation.lng]}>
              <Popup>{dropoffLocation.name}</Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </div>
  );
}