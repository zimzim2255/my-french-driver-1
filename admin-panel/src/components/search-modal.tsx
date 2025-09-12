import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { 
  Search, 
  Calendar, 
  Users, 
  Car, 
  MessageSquare,
  User,
  Clock
} from 'lucide-react';

export function SearchModal() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  // Mock search results
  const searchResults = [
    {
      id: 1,
      type: 'booking',
      title: 'Booking BK001 - Marie Dubois',
      description: 'CDG Airport → Hotel Plaza Athénée',
      date: '2024-01-15',
      status: 'confirmed',
      icon: Calendar
    },
    {
      id: 2,
      type: 'customer',
      title: 'Marie Dubois',
      description: 'VIP Customer - marie.dubois@email.com',
      date: 'Last booking: 2024-01-15',
      status: 'vip',
      icon: Users
    },
    {
      id: 3,
      type: 'booking',
      title: 'Booking BK002 - James Wilson',
      description: 'Eiffel Tower → Louvre Museum',
      date: '2024-01-15',
      status: 'in-progress',
      icon: Calendar
    },
    {
      id: 4,
      type: 'driver',
      title: 'Philippe Martin',
      description: 'Mercedes E-Class (ABC-123) • 4.9★',
      date: 'Currently active',
      status: 'active',
      icon: User
    },
    {
      id: 5,
      type: 'vehicle',
      title: 'Mercedes E-Class (ABC-123)',
      description: 'Driver: Philippe Martin • Available',
      date: 'Last service: 2024-01-10',
      status: 'available',
      icon: Car
    },
    {
      id: 6,
      type: 'message',
      title: 'Message from James Wilson',
      description: 'Question about tour duration',
      date: '2 hours ago',
      status: 'unread',
      icon: MessageSquare
    }
  ];

  const filteredResults = searchQuery.length > 0 
    ? searchResults.filter(result => 
        result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        result.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'booking': return 'bg-accent text-accent-foreground';
      case 'customer': return 'bg-primary text-primary-foreground';
      case 'driver': return 'bg-blue-100 text-blue-800';
      case 'vehicle': return 'bg-green-100 text-green-800';
      case 'message': return 'bg-orange-100 text-orange-800';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-accent text-accent-foreground';
      case 'vip': return 'bg-accent text-accent-foreground';
      case 'active': return 'bg-green-100 text-green-800';
      case 'available': return 'bg-green-100 text-green-800';
      case 'unread': return 'bg-orange-100 text-orange-800';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="border-muted">
          <Search className="w-4 h-4 mr-0 sm:mr-2" />
          <span className="hidden sm:inline">Search</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-primary">Search</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search bookings, customers, drivers, vehicles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              autoFocus
            />
          </div>

          {/* Search Results */}
          {searchQuery.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-medium text-muted-foreground">
                  {filteredResults.length} results found
                </h4>
                {filteredResults.length > 0 && (
                  <Button variant="ghost" size="sm" className="text-xs">
                    Clear
                  </Button>
                )}
              </div>

              <ScrollArea className="h-80">
                <div className="space-y-2">
                  {filteredResults.map((result) => {
                    const Icon = result.icon;
                    return (
                      <div
                        key={result.id}
                        className="p-3 border rounded-lg hover:bg-secondary/50 cursor-pointer transition-colors"
                        onClick={() => {
                          // Handle navigation to the specific item
                          setIsOpen(false);
                        }}
                      >
                        <div className="flex items-start gap-3">
                          <div className="mt-1">
                            <Icon className="w-4 h-4 text-primary" />
                          </div>
                          <div className="flex-1 space-y-1">
                            <div className="flex items-start justify-between">
                              <h4 className="text-sm font-medium">{result.title}</h4>
                              <div className="flex gap-1">
                                <Badge className={getTypeColor(result.type)} variant="secondary">
                                  {result.type}
                                </Badge>
                                <Badge className={getStatusColor(result.status)} variant="outline">
                                  {result.status}
                                </Badge>
                              </div>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {result.description}
                            </p>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Clock className="w-3 h-3" />
                              {result.date}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>
            </div>
          )}

          {/* Quick Actions */}
          {searchQuery.length === 0 && (
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-3">Quick Actions</h4>
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  variant="outline" 
                  className="justify-start h-auto p-3"
                  onClick={() => setSearchQuery('booking')}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  <div className="text-left">
                    <p className="text-sm font-medium">Search Bookings</p>
                    <p className="text-xs text-muted-foreground">Find reservations</p>
                  </div>
                </Button>
                <Button 
                  variant="outline" 
                  className="justify-start h-auto p-3"
                  onClick={() => setSearchQuery('customer')}
                >
                  <Users className="w-4 h-4 mr-2" />
                  <div className="text-left">
                    <p className="text-sm font-medium">Search Customers</p>
                    <p className="text-xs text-muted-foreground">Find client profiles</p>
                  </div>
                </Button>
                <Button 
                  variant="outline" 
                  className="justify-start h-auto p-3"
                  onClick={() => setSearchQuery('driver')}
                >
                  <User className="w-4 h-4 mr-2" />
                  <div className="text-left">
                    <p className="text-sm font-medium">Search Drivers</p>
                    <p className="text-xs text-muted-foreground">Find driver info</p>
                  </div>
                </Button>
                <Button 
                  variant="outline" 
                  className="justify-start h-auto p-3"
                  onClick={() => setSearchQuery('vehicle')}
                >
                  <Car className="w-4 h-4 mr-2" />
                  <div className="text-left">
                    <p className="text-sm font-medium">Search Vehicles</p>
                    <p className="text-xs text-muted-foreground">Find fleet info</p>
                  </div>
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}