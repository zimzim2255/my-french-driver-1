import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { 
  Car,
  Users,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Clock,
  Fuel,
  Wrench,
  Star,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

export function FleetManagement() {
  const [activeTab, setActiveTab] = useState('vehicles');
  const [searchTerm, setSearchTerm] = useState('');

  const vehicles = [
    {
      id: 'VEH001',
      model: 'Mercedes E-Class',
      licensePlate: 'ABC-123-CD',
      year: 2023,
      color: 'Black',
      seats: 4,
      status: 'available',
      mileage: 15420,
      lastMaintenance: '2024-01-10',
      nextMaintenance: '2024-04-10',
      fuelLevel: 85,
      currentDriver: 'Philippe Martin',
      location: 'CDG Airport',
      features: ['Leather seats', 'WiFi', 'Champagne service', 'GPS'],
      dailyRate: '€120'
    },
    {
      id: 'VEH002',
      model: 'BMW 7 Series',
      licensePlate: 'DEF-456-GH',
      year: 2023,
      color: 'Silver',
      seats: 4,
      status: 'in-use',
      mileage: 8920,
      lastMaintenance: '2024-01-05',
      nextMaintenance: '2024-04-05',
      fuelLevel: 65,
      currentDriver: 'Antoine Moreau',
      location: 'Eiffel Tower',
      features: ['Premium sound', 'Climate control', 'Sunroof', 'GPS'],
      dailyRate: '€130'
    },
    {
      id: 'VEH003',
      model: 'Audi A8',
      licensePlate: 'GHI-789-JK',
      year: 2022,
      color: 'Black',
      seats: 4,
      status: 'maintenance',
      mileage: 25680,
      lastMaintenance: '2024-01-15',
      nextMaintenance: '2024-02-15',
      fuelLevel: 45,
      currentDriver: 'Unassigned',
      location: 'Service Center',
      features: ['Massage seats', 'Premium audio', 'Executive package'],
      dailyRate: '€140'
    },
    {
      id: 'VEH004',
      model: 'Tesla Model S',
      licensePlate: 'TES-001-LA',
      year: 2024,
      color: 'White',
      seats: 4,
      status: 'available',
      mileage: 2100,
      lastMaintenance: '2024-01-01',
      nextMaintenance: '2024-07-01',
      fuelLevel: 92, // Battery level
      currentDriver: 'Unassigned',
      location: 'Central Garage',
      features: ['Electric', 'Autopilot', 'Premium interior', 'Eco-friendly'],
      dailyRate: '€150'
    }
  ];

  const drivers = [
    {
      id: 'DRV001',
      name: 'Philippe Martin',
      email: 'philippe.martin@myfrenchdriver.com',
      phone: '+33 6 12 34 56 78',
      license: 'FR123456789',
      licenseExpiry: '2026-03-15',
      experience: '15 years',
      languages: ['French', 'English', 'Spanish'],
      status: 'active',
      rating: 4.9,
      totalTrips: 1250,
      currentVehicle: 'Mercedes E-Class (ABC-123)',
      specializations: ['VIP Service', 'Airport Transfers', 'Wine Tours'],
      joinDate: '2018-06-15'
    },
    {
      id: 'DRV002',
      name: 'Antoine Moreau',
      email: 'antoine.moreau@myfrenchdriver.com',
      phone: '+33 6 23 45 67 89',
      license: 'FR987654321',
      licenseExpiry: '2025-11-20',
      experience: '12 years',
      languages: ['French', 'English', 'German'],
      status: 'active',
      rating: 4.8,
      totalTrips: 980,
      currentVehicle: 'BMW 7 Series (DEF-456)',
      specializations: ['City Tours', 'Business Travel', 'Cultural Tours'],
      joinDate: '2019-03-10'
    },
    {
      id: 'DRV003',
      name: 'Julien Leroy',
      email: 'julien.leroy@myfrenchdriver.com',
      phone: '+33 6 34 56 78 90',
      license: 'FR456789123',
      licenseExpiry: '2027-01-10',
      experience: '8 years',
      languages: ['French', 'English', 'Italian'],
      status: 'available',
      rating: 4.7,
      totalTrips: 650,
      currentVehicle: 'Unassigned',
      specializations: ['Day Trips', 'Versailles Tours', 'Photography Tours'],
      joinDate: '2020-09-22'
    },
    {
      id: 'DRV004',
      name: 'Claire Dubois',
      email: 'claire.dubois@myfrenchdriver.com',
      phone: '+33 6 45 67 89 01',
      license: 'FR789123456',
      licenseExpiry: '2025-08-30',
      experience: '10 years',
      languages: ['French', 'English', 'Japanese'],
      status: 'off-duty',
      rating: 4.9,
      totalTrips: 820,
      currentVehicle: 'Unassigned',
      specializations: ['Luxury Service', 'Shopping Tours', 'Fashion Week'],
      joinDate: '2019-11-05'
    }
  ];

  const getVehicleStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'in-use': return 'bg-accent text-accent-foreground';
      case 'maintenance': return 'bg-orange-100 text-orange-800';
      case 'unavailable': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getDriverStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-accent text-accent-foreground';
      case 'available': return 'bg-green-100 text-green-800';
      case 'off-duty': return 'bg-muted text-muted-foreground';
      case 'vacation': return 'bg-blue-100 text-blue-800';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Car className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">{vehicles.length}</p>
                <p className="text-sm text-muted-foreground">Total Vehicles</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">
                  {vehicles.filter(v => v.status === 'available').length}
                </p>
                <p className="text-sm text-muted-foreground">Available Now</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">{drivers.length}</p>
                <p className="text-sm text-muted-foreground">Active Drivers</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">
                  {vehicles.filter(v => v.status === 'maintenance').length}
                </p>
                <p className="text-sm text-muted-foreground">In Maintenance</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Fleet Management Tabs */}
      <Card>
        <CardHeader>
          <CardTitle className="text-primary">Fleet & Driver Management</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="vehicles">Vehicles</TabsTrigger>
              <TabsTrigger value="drivers">Drivers</TabsTrigger>
            </TabsList>
            
            <TabsContent value="vehicles" className="space-y-6 mt-6">
              <div className="flex items-center justify-between">
                <div className="flex gap-4 flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search vehicles..." 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-80"
                    />
                  </div>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-primary hover:bg-primary/90">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Vehicle
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Add New Vehicle</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Vehicle Model</Label>
                          <Input placeholder="e.g., Mercedes E-Class" />
                        </div>
                        <div>
                          <Label>License Plate</Label>
                          <Input placeholder="ABC-123-CD" />
                        </div>
                      </div>
                      {/* Add more form fields */}
                      <div className="flex justify-end gap-2">
                        <Button variant="outline">Cancel</Button>
                        <Button className="bg-accent hover:bg-accent/90">Add Vehicle</Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {vehicles.map((vehicle) => (
                  <Card key={vehicle.id} className="border-2 hover:border-accent/50 transition-colors">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-primary">{vehicle.model}</h3>
                          <p className="text-sm text-muted-foreground">{vehicle.licensePlate}</p>
                        </div>
                        <Badge className={getVehicleStatusColor(vehicle.status)}>
                          {vehicle.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Year:</span>
                          <p className="font-medium">{vehicle.year}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Seats:</span>
                          <p className="font-medium">{vehicle.seats}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Mileage:</span>
                          <p className="font-medium">{vehicle.mileage.toLocaleString()} km</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Rate:</span>
                          <p className="font-medium text-accent">{vehicle.dailyRate}/day</p>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-muted-foreground">Fuel Level</span>
                          <span className="font-medium">{vehicle.fuelLevel}%</span>
                        </div>
                        <Progress value={vehicle.fuelLevel} className="h-2" />
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          <span>Driver: {vehicle.currentDriver}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <span>{vehicle.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Wrench className="w-4 h-4 text-muted-foreground" />
                          <span>Next service: {vehicle.nextMaintenance}</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="drivers" className="space-y-6 mt-6">
              <div className="flex items-center justify-between">
                <div className="flex gap-4 flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search drivers..." 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-80"
                    />
                  </div>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-primary hover:bg-primary/90">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Driver
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Add New Driver</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Full Name</Label>
                          <Input placeholder="Enter driver name" />
                        </div>
                        <div>
                          <Label>Email</Label>
                          <Input type="email" placeholder="driver@myfrenchdriver.com" />
                        </div>
                      </div>
                      {/* Add more form fields */}
                      <div className="flex justify-end gap-2">
                        <Button variant="outline">Cancel</Button>
                        <Button className="bg-accent hover:bg-accent/90">Add Driver</Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {drivers.map((driver) => (
                  <Card key={driver.id} className="border-2 hover:border-accent/50 transition-colors">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                            <span className="text-accent-foreground font-medium">
                              {driver.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <h3 className="font-semibold text-primary">{driver.name}</h3>
                            <p className="text-sm text-muted-foreground">{driver.id}</p>
                          </div>
                        </div>
                        <Badge className={getDriverStatusColor(driver.status)}>
                          {driver.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Experience:</span>
                          <p className="font-medium">{driver.experience}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Rating:</span>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-accent fill-current" />
                            <span className="font-medium">{driver.rating}</span>
                          </div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Total Trips:</span>
                          <p className="font-medium">{driver.totalTrips}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Languages:</span>
                          <p className="font-medium">{driver.languages.length}</p>
                        </div>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-muted-foreground" />
                          <span className="truncate">{driver.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-muted-foreground" />
                          <span>{driver.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Car className="w-4 h-4 text-muted-foreground" />
                          <span>{driver.currentVehicle || 'Unassigned'}</span>
                        </div>
                      </div>

                      <div>
                        <span className="text-sm text-muted-foreground">Specializations:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {driver.specializations.slice(0, 2).map((spec, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {spec}
                            </Badge>
                          ))}
                          {driver.specializations.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{driver.specializations.length - 2}
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}