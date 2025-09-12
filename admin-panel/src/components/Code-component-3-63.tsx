import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Avatar, AvatarFallback, AvatarInitials } from './ui/avatar';
import { 
  Star,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Calendar,
  User,
  TrendingUp,
  Award,
  Search,
  Filter,
  Eye,
  Reply,
  Archive,
  Trash2,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

export function ReviewsManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [ratingFilter, setRatingFilter] = useState('all');

  const reviews = [
    {
      id: 'REV001',
      customer: 'Marie Dubois',
      email: 'marie.dubois@email.com',
      bookingId: 'BK001',
      driver: 'Philippe Martin',
      vehicle: 'Mercedes E-Class',
      service: 'Airport Transfer',
      rating: 5,
      title: 'Exceptional service as always!',
      comment: 'Philippe provided excellent service with the champagne amenity. The vehicle was immaculate and he was very professional throughout the journey. This is why I always choose MyFrenchDriver for my Paris visits.',
      date: '2024-01-15',
      status: 'published',
      helpful: 12,
      verified: true,
      response: 'Thank you Marie for your wonderful review! We are delighted to provide you with consistent excellent service.'
    },
    {
      id: 'REV002',
      customer: 'James Wilson',
      email: 'j.wilson@company.com',
      bookingId: 'BK002',
      driver: 'Antoine Moreau',
      vehicle: 'BMW 7 Series',
      service: 'City Tour',
      rating: 5,
      title: 'Perfect city tour experience',
      comment: 'Antoine was an excellent guide and driver. His knowledge of Paris history was impressive and he took us to some hidden gems we would never have found on our own. Highly recommended!',
      date: '2024-01-15',
      status: 'published',
      helpful: 8,
      verified: true,
      response: null
    },
    {
      id: 'REV003',
      customer: 'Sofia Martinez',
      email: 'sofia.m@gmail.com',
      bookingId: 'BK003',
      driver: 'Julien Leroy',
      vehicle: 'Audi A8',
      service: 'Versailles Day Trip',
      rating: 4,
      title: 'Great day trip to Versailles',
      comment: 'Wonderful day trip to Versailles. Julien was punctual and knowledgeable. The only minor issue was that the vehicle air conditioning was not working perfectly, but overall a great experience.',
      date: '2024-01-14',
      status: 'published',
      helpful: 6,
      verified: true,
      response: 'Thank you Sofia! We apologize for the air conditioning issue and have addressed this with our maintenance team.'
    },
    {
      id: 'REV004',
      customer: 'Michael Chen',
      email: 'mchen@tech.com',
      bookingId: 'BK004',
      driver: 'Philippe Martin',
      vehicle: 'Mercedes E-Class',
      service: 'Business Transfer',
      rating: 5,
      title: 'Professional business service',
      comment: 'Excellent service for business travel. Philippe was professional, punctual, and the vehicle was perfect for client meetings. The invoice process was seamless. Will definitely use again.',
      date: '2024-01-16',
      status: 'pending',
      helpful: 0,
      verified: true,
      response: null
    },
    {
      id: 'REV005',
      customer: 'Emma Thompson',
      email: 'emma.thompson@email.co.uk',
      bookingId: 'BK005',
      driver: 'Claire Dubois',
      vehicle: 'Tesla Model S',
      service: 'Shopping Tour',
      rating: 3,
      title: 'Good service but room for improvement',
      comment: 'Claire was friendly and the Tesla was comfortable. However, there were some delays due to traffic that could have been avoided with better route planning. The shopping recommendations were excellent though.',
      date: '2024-01-13',
      status: 'flagged',
      helpful: 2,
      verified: true,
      response: null
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-accent text-accent-foreground';
      case 'flagged': return 'bg-orange-100 text-orange-800';
      case 'archived': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-accent fill-current' : 'text-muted-foreground'
        }`}
      />
    ));
  };

  const filteredReviews = reviews.filter(review => {
    const matchesRating = ratingFilter === 'all' || review.rating.toString() === ratingFilter;
    const matchesSearch = review.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.comment.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRating && matchesSearch;
  });

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const totalReviews = reviews.length;
  const publishedReviews = reviews.filter(r => r.status === 'published').length;
  const pendingReviews = reviews.filter(r => r.status === 'pending').length;

  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(r => r.rating === rating).length,
    percentage: (reviews.filter(r => r.rating === rating).length / totalReviews) * 100
  }));

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">{averageRating.toFixed(1)}</p>
                <p className="text-sm text-muted-foreground">Average Rating</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">{totalReviews}</p>
                <p className="text-sm text-muted-foreground">Total Reviews</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">{publishedReviews}</p>
                <p className="text-sm text-muted-foreground">Published</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">{pendingReviews}</p>
                <p className="text-sm text-muted-foreground">Pending Review</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Rating Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-primary">Rating Distribution</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {ratingDistribution.map(({ rating, count, percentage }) => (
              <div key={rating} className="flex items-center gap-3">
                <div className="flex items-center gap-1 w-12">
                  <span className="text-sm font-medium">{rating}</span>
                  <Star className="w-3 h-3 text-accent fill-current" />
                </div>
                <div className="flex-1 bg-muted rounded-full h-2">
                  <div 
                    className="bg-accent h-2 rounded-full transition-all"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-sm text-muted-foreground w-8">{count}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Reviews Management */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-primary">Customer Reviews</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Analytics
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search reviews..." 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={ratingFilter} onValueChange={setRatingFilter}>
                  <SelectTrigger className="w-40">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Ratings</SelectItem>
                    <SelectItem value="5">5 Stars</SelectItem>
                    <SelectItem value="4">4 Stars</SelectItem>
                    <SelectItem value="3">3 Stars</SelectItem>
                    <SelectItem value="2">2 Stars</SelectItem>
                    <SelectItem value="1">1 Star</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-6">
                {filteredReviews.map((review) => (
                  <Card key={review.id} className="border-l-4 border-l-accent/50">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        {/* Review Header */}
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3">
                            <Avatar>
                              <AvatarInitials>{review.customer.split(' ').map(n => n[0]).join('')}</AvatarInitials>
                              <AvatarFallback>{review.customer.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-medium">{review.customer}</h4>
                                {review.verified && (
                                  <Badge variant="outline" className="text-xs">
                                    <CheckCircle className="w-3 h-3 mr-1" />
                                    Verified
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Calendar className="w-3 h-3" />
                                {review.date}
                                <span>•</span>
                                <span>Booking: {review.bookingId}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={getStatusColor(review.status)}>
                              {review.status}
                            </Badge>
                          </div>
                        </div>

                        {/* Service Details */}
                        <div className="bg-secondary/30 p-3 rounded-lg">
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className="text-muted-foreground">Service:</span>
                              <p className="font-medium">{review.service}</p>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Driver:</span>
                              <p className="font-medium">{review.driver}</p>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Vehicle:</span>
                              <p className="font-medium">{review.vehicle}</p>
                            </div>
                          </div>
                        </div>

                        {/* Rating and Review */}
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex">{renderStars(review.rating)}</div>
                            <span className="font-medium">{review.rating}/5</span>
                          </div>
                          <h5 className="font-medium mb-2">{review.title}</h5>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {review.comment}
                          </p>
                        </div>

                        {/* Our Response */}
                        {review.response && (
                          <div className="bg-accent/10 p-4 rounded-lg border border-accent/20">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                                <span className="text-xs text-accent-foreground font-medium">MFD</span>
                              </div>
                              <span className="text-sm font-medium">MyFrenchDriver Response</span>
                            </div>
                            <p className="text-sm text-muted-foreground">{review.response}</p>
                          </div>
                        )}

                        {/* Review Actions */}
                        <div className="flex items-center justify-between pt-2 border-t">
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <ThumbsUp className="w-4 h-4" />
                              <span>{review.helpful} helpful</span>
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm">
                                  <Reply className="w-4 h-4 mr-2" />
                                  {review.response ? 'Update Response' : 'Respond'}
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Respond to Review</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4 py-4">
                                  <div className="bg-secondary/50 p-3 rounded-lg">
                                    <p className="text-sm font-medium mb-1">{review.title}</p>
                                    <p className="text-sm text-muted-foreground">{review.comment}</p>
                                  </div>
                                  <div>
                                    <Label>Your Response</Label>
                                    <Textarea 
                                      placeholder="Write your response to this review..."
                                      rows={4}
                                      defaultValue={review.response || ''}
                                    />
                                  </div>
                                  <div className="flex justify-end gap-2">
                                    <Button variant="outline">Cancel</Button>
                                    <Button className="bg-accent hover:bg-accent/90">
                                      Post Response
                                    </Button>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                            
                            {review.status === 'pending' && (
                              <Button variant="outline" size="sm" className="text-green-600 hover:text-green-600">
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Approve
                              </Button>
                            )}
                            
                            <Button variant="outline" size="sm">
                              <Archive className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}