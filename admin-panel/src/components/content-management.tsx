import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Switch } from './ui/switch';
import { 
  FileText,
  Globe,
  Camera,
  Plus,
  Edit,
  Trash2,
  Eye,
  Save,
  Upload,
  Languages,
  Settings,
  Calendar,
  Star,
  Award,
  MapPin
} from 'lucide-react';

export function ContentManagement() {
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const pages = [
    {
      id: 'home',
      title: 'Homepage',
      slug: '/',
      status: 'published',
      lastModified: '2024-01-15',
      sections: ['Hero', 'Services', 'Fleet', 'Testimonials', 'Contact']
    },
    {
      id: 'services',
      title: 'Our Services',
      slug: '/services',
      status: 'published',
      lastModified: '2024-01-14',
      sections: ['Airport Transfers', 'City Tours', 'Business Travel', 'Special Events']
    },
    {
      id: 'fleet',
      title: 'Our Fleet',
      slug: '/fleet',
      status: 'published',
      lastModified: '2024-01-12',
      sections: ['Luxury Vehicles', 'Electric Options', 'Features']
    },
    {
      id: 'about',
      title: 'About Us',
      slug: '/about',
      status: 'draft',
      lastModified: '2024-01-10',
      sections: ['Our Story', 'Team', 'Values']
    }
  ];

  const blogPosts = [
    {
      id: 'blog001',
      title: 'Top 10 Hidden Gems in Paris',
      slug: 'top-10-hidden-gems-paris',
      excerpt: 'Discover secret spots in Paris that most tourists never see...',
      status: 'published',
      publishDate: '2024-01-15',
      author: 'Marie Dubois',
      views: 1250,
      featured: true
    },
    {
      id: 'blog002',
      title: 'The Ultimate Guide to Paris Fashion Week',
      slug: 'ultimate-guide-paris-fashion-week',
      excerpt: 'Everything you need to know about attending Fashion Week in Paris...',
      status: 'published',
      publishDate: '2024-01-12',
      author: 'Antoine Moreau',
      views: 892,
      featured: false
    },
    {
      id: 'blog003',
      title: 'Best Restaurants in Paris for Business Dining',
      slug: 'best-restaurants-paris-business-dining',
      excerpt: 'Our curated list of the finest restaurants for corporate entertainment...',
      status: 'draft',
      publishDate: null,
      author: 'Philippe Martin',
      views: 0,
      featured: false
    }
  ];

  const testimonials = [
    {
      id: 'test001',
      customer: 'Marie Dubois',
      text: 'Exceptional service every time. MyFrenchDriver has made my Paris visits truly memorable.',
      rating: 5,
      status: 'featured',
      service: 'VIP Transfer'
    },
    {
      id: 'test002',
      customer: 'James Wilson',
      text: 'Professional drivers and beautiful vehicles. Highly recommend for business travel.',
      rating: 5,
      status: 'published',
      service: 'City Tour'
    },
    {
      id: 'test003',
      customer: 'Sofia Martinez',
      text: 'The Versailles day trip was perfectly organized. Great attention to detail.',
      rating: 4,
      status: 'pending',
      service: 'Day Trip'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-muted text-muted-foreground';
      case 'featured': return 'bg-accent text-accent-foreground';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
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
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">{pages.length}</p>
                <p className="text-sm text-muted-foreground">Total Pages</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                <Globe className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">{blogPosts.length}</p>
                <p className="text-sm text-muted-foreground">Blog Posts</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">{testimonials.length}</p>
                <p className="text-sm text-muted-foreground">Testimonials</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                <Languages className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">2</p>
                <p className="text-sm text-muted-foreground">Languages</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content Management Tabs */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-primary">Website Content Management</CardTitle>
            <div className="flex items-center gap-4">
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger className="w-32">
                  <Languages className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="pages">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="pages">Pages</TabsTrigger>
              <TabsTrigger value="blog">Blog</TabsTrigger>
              <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
              <TabsTrigger value="settings">SEO Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="pages" className="space-y-6 mt-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Website Pages</h3>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-primary hover:bg-primary/90">
                      <Plus className="w-4 h-4 mr-2" />
                      New Page
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Create New Page</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Page Title</Label>
                          <Input placeholder="Enter page title" />
                        </div>
                        <div>
                          <Label>URL Slug</Label>
                          <Input placeholder="/page-url" />
                        </div>
                      </div>
                      <div>
                        <Label>Page Template</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select template" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="default">Default Page</SelectItem>
                            <SelectItem value="service">Service Page</SelectItem>
                            <SelectItem value="landing">Landing Page</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline">Cancel</Button>
                        <Button className="bg-accent hover:bg-accent/90">Create Page</Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {pages.map((page) => (
                  <Card key={page.id} className="border-2 hover:border-accent/50 transition-colors">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium text-primary">{page.title}</h4>
                          <p className="text-sm text-muted-foreground">{page.slug}</p>
                        </div>
                        <Badge className={getStatusColor(page.status)}>
                          {page.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Sections:</p>
                        <div className="flex flex-wrap gap-1">
                          {page.sections.map((section, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {section}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>Modified: {page.lastModified}</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="w-4 h-4 mr-1" />
                          Preview
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="blog" className="space-y-6 mt-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Blog Posts</h3>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-primary hover:bg-primary/90">
                      <Plus className="w-4 h-4 mr-2" />
                      New Post
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl">
                    <DialogHeader>
                      <DialogTitle>Create Blog Post</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div>
                        <Label>Post Title</Label>
                        <Input placeholder="Enter blog post title" />
                      </div>
                      <div>
                        <Label>Excerpt</Label>
                        <Textarea placeholder="Brief description of the post..." rows={2} />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Author</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select author" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="marie">Marie Dubois</SelectItem>
                              <SelectItem value="antoine">Antoine Moreau</SelectItem>
                              <SelectItem value="philippe">Philippe Martin</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Category</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="travel">Travel Tips</SelectItem>
                              <SelectItem value="culture">Culture</SelectItem>
                              <SelectItem value="business">Business</SelectItem>
                              <SelectItem value="events">Events</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div>
                        <Label>Content</Label>
                        <Textarea placeholder="Write your blog post content..." rows={8} />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Switch id="featured" />
                          <Label htmlFor="featured">Featured Post</Label>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline">Save Draft</Button>
                          <Button className="bg-accent hover:bg-accent/90">Publish</Button>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="space-y-4">
                {blogPosts.map((post) => (
                  <Card key={post.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-medium text-primary">{post.title}</h4>
                            {post.featured && (
                              <Badge className="bg-accent text-accent-foreground">
                                <Star className="w-3 h-3 mr-1" />
                                Featured
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{post.excerpt}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>By {post.author}</span>
                            {post.publishDate && (
                              <span>Published: {post.publishDate}</span>
                            )}
                            <span>{post.views} views</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          <Badge className={getStatusColor(post.status)}>
                            {post.status}
                          </Badge>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="testimonials" className="space-y-6 mt-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Customer Testimonials</h3>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-primary hover:bg-primary/90">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Testimonial
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Testimonial</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div>
                        <Label>Customer Name</Label>
                        <Input placeholder="Enter customer name" />
                      </div>
                      <div>
                        <Label>Service Used</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select service" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="airport">Airport Transfer</SelectItem>
                            <SelectItem value="city">City Tour</SelectItem>
                            <SelectItem value="business">Business Travel</SelectItem>
                            <SelectItem value="special">Special Events</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Testimonial Text</Label>
                        <Textarea placeholder="Enter testimonial..." rows={4} />
                      </div>
                      <div>
                        <Label>Rating</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select rating" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="5">5 Stars</SelectItem>
                            <SelectItem value="4">4 Stars</SelectItem>
                            <SelectItem value="3">3 Stars</SelectItem>
                            <SelectItem value="2">2 Stars</SelectItem>
                            <SelectItem value="1">1 Star</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline">Cancel</Button>
                        <Button className="bg-accent hover:bg-accent/90">Add Testimonial</Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {testimonials.map((testimonial) => (
                  <Card key={testimonial.id}>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-medium">{testimonial.customer}</h4>
                            <p className="text-sm text-muted-foreground">{testimonial.service}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex">
                              {Array.from({ length: testimonial.rating }, (_, i) => (
                                <Star key={i} className="w-4 h-4 text-accent fill-current" />
                              ))}
                            </div>
                            <Badge className={getStatusColor(testimonial.status)}>
                              {testimonial.status}
                            </Badge>
                          </div>
                        </div>
                        
                        <p className="text-sm text-muted-foreground italic">
                          "{testimonial.text}"
                        </p>
                        
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1">
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
                          </Button>
                          {testimonial.status === 'pending' && (
                            <Button variant="outline" size="sm" className="flex-1 text-green-600 hover:text-green-600">
                              <Award className="w-4 h-4 mr-1" />
                              Feature
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6 mt-6">
              <h3 className="text-lg font-medium">SEO & Meta Settings</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Global SEO Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Site Title</Label>
                      <Input defaultValue="MyFrenchDriver - Premium Chauffeur Service in Paris" />
                    </div>
                    <div>
                      <Label>Meta Description</Label>
                      <Textarea 
                        defaultValue="Experience luxury transportation in Paris with MyFrenchDriver. Professional chauffeurs, premium vehicles, and exceptional service for all your travel needs."
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label>Keywords</Label>
                      <Input defaultValue="Paris chauffeur, luxury transport, airport transfer, city tours" />
                    </div>
                    <Button className="w-full bg-accent hover:bg-accent/90">
                      <Save className="w-4 h-4 mr-2" />
                      Save Settings
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Social Media</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Open Graph Title</Label>
                      <Input defaultValue="MyFrenchDriver - Luxury Chauffeur Service" />
                    </div>
                    <div>
                      <Label>Open Graph Description</Label>
                      <Textarea 
                        defaultValue="Premium chauffeur service in Paris with professional drivers and luxury vehicles."
                        rows={2}
                      />
                    </div>
                    <div>
                      <Label>Social Media Image</Label>
                      <div className="flex gap-2">
                        <Input placeholder="Image URL" className="flex-1" />
                        <Button variant="outline">
                          <Upload className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <Button className="w-full bg-accent hover:bg-accent/90">
                      <Save className="w-4 h-4 mr-2" />
                      Update Social
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}