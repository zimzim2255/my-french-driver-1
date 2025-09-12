import { getAssetPath } from "../../utils/assetPath";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { 
  Newspaper, 
  Calendar, 
  Clock,
  Thermometer,
  Mountain,
  AlertTriangle,
  CheckCircle,
  Star,
  Phone,
  Bell,
  Snowflake,
  Car,
  Route,
  Info,
  TrendingUp,
  MapPin,
  Users
} from "lucide-react";

export function NewsPage() {
  const latestNews = [
    {
      id: 1,
      title: "Exceptional Snow Conditions Across French Alps",
      category: "Snow Report",
      date: "2024-01-15",
      time: "08:30",
      excerpt: "Fresh snowfall of 40cm overnight brings perfect powder conditions to major ski resorts.",
      content: "The French Alps have received exceptional snowfall over the past 48 hours, with Chamonix reporting 40cm of fresh powder and Val d'Isère receiving 35cm. Visibility is excellent and all major lifts are operational.",
      image: "assets/Nouveau site internet/EXCURSION .jpeg",
      priority: "high",
      tags: ["Snow Conditions", "Weather", "Ski Resorts"]
    },
    {
      id: 2,
      title: "New High-Speed Lift Opens in Courchevel",
      category: "Resort Updates",
      date: "2024-01-14",
      time: "14:20",
      excerpt: "State-of-the-art 8-person gondola reduces wait times and improves access to advanced slopes.",
      content: "Courchevel has officially opened its new high-speed gondola lift, connecting the 1850 level directly to the Saulire summit. The lift features heated seats and panoramic windows.",
      image: "assets/Nouveau site internet/chateau fontainebleau.jpg",
      priority: "medium",
      tags: ["Infrastructure", "Courchevel", "Ski Lifts"]
    },
    {
      id: 3,
      title: "Transportation Alert: A40 Motorway Delays",
      category: "Transportation",
      date: "2024-01-14",
      time: "11:45",
      excerpt: "Heavy traffic expected on A40 towards Chamonix due to weekend ski traffic. Alternative routes recommended.",
      content: "Weekend ski traffic is causing significant delays on the A40 motorway between Geneva and Chamonix. We recommend using alternative routes via Annecy or departing earlier to avoid peak hours.",
      image: "assets/Nouveau site internet/aiport transfer 1.jpeg",
      priority: "high",
      tags: ["Traffic", "Transportation", "Travel Advisory"]
    },
    {
      id: 4,
      title: "Michelin Star Restaurant Opens in Val d'Isère",
      category: "Dining",
      date: "2024-01-13",
      time: "16:00",
      excerpt: "Renowned chef opens new mountain restaurant featuring contemporary Alpine cuisine.",
      content: "Chef Laurent Dubois has opened his new restaurant 'Sommet' in Val d'Isère, bringing Michelin-starred dining to the slopes with a focus on local Alpine ingredients and modern French cuisine.",
      image: "assets/Nouveau site internet/PARIS BY NIGHT.jpeg",
      priority: "low",
      tags: ["Dining", "Val d'Isère", "Restaurants"]
    }
  ];

  const weatherUpdates = [
    {
      resort: "Chamonix",
      temperature: "-8°C",
      conditions: "Fresh Powder",
      snowfall: "40cm (24h)",
      visibility: "Excellent",
      status: "optimal"
    },
    {
      resort: "Val d'Isère",
      temperature: "-12°C",
      conditions: "Clear Skies",
      snowfall: "35cm (24h)",
      visibility: "Perfect",
      status: "optimal"
    },
    {
      resort: "Courchevel",
      temperature: "-6°C",
      conditions: "Light Snow",
      snowfall: "25cm (24h)",
      visibility: "Good",
      status: "good"
    },
    {
      resort: "Méribel",
      temperature: "-10°C",
      conditions: "Partly Cloudy",
      snowfall: "30cm (24h)",
      visibility: "Good",
      status: "good"
    }
  ];

  const transportationAlerts = [
    {
      route: "Geneva → Chamonix",
      status: "Delays Expected",
      severity: "medium",
      message: "Heavy weekend traffic, add 30 minutes to journey time",
      icon: <AlertTriangle className="w-4 h-4" />
    },
    {
      route: "Lyon → Val d'Isère",
      status: "Normal Conditions",
      severity: "low",
      message: "Clear roads, normal travel times expected",
      icon: <CheckCircle className="w-4 h-4" />
    },
    {
      route: "Paris → Courchevel",
      status: "Weather Advisory",
      severity: "high",
      message: "Snow chains required beyond Albertville",
      icon: <Snowflake className="w-4 h-4" />
    }
  ];

  const upcomingEvents = [
    {
      title: "FIS Alpine Ski World Cup",
      location: "Chamonix",
      date: "2024-01-20",
      type: "Sports Event",
      impact: "Increased traffic and accommodation demand"
    },
    {
      title: "Winter Music Festival",
      location: "Val d'Isère",
      date: "2024-01-25",
      type: "Entertainment",
      impact: "Limited parking, book transfers in advance"
    },
    {
      title: "Courchevel Food & Wine Festival",
      location: "Courchevel",
      date: "2024-02-01",
      type: "Culinary",
      impact: "Restaurant reservations recommended"
    }
  ];

  const newsCategories = [
    { name: "All News", count: 24, active: true },
    { name: "Snow Reports", count: 8, active: false },
    { name: "Transportation", count: 6, active: false },
    { name: "Resort Updates", count: 5, active: false },
    { name: "Weather", count: 3, active: false },
    { name: "Events", count: 2, active: false }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal': return 'text-green-500 bg-green-50';
      case 'good': return 'text-blue-500 bg-blue-50';
      case 'fair': return 'text-yellow-500 bg-yellow-50';
      case 'poor': return 'text-red-500 bg-red-50';
      default: return 'text-gray-500 bg-gray-50';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'border-red-200 bg-red-50';
      case 'medium': return 'border-yellow-200 bg-yellow-50';
      case 'low': return 'border-green-200 bg-green-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src={getAssetPath("Nouveau site internet/PARIS BY NIGHT.jpeg")}
            alt="Ski resort news and updates"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-white/30">
              News & Updates
            </Badge>
            <h1 className="text-5xl md:text-6xl mb-6">
              Stay Informed
            </h1>
            <p className="text-xl mb-8 text-gray-200">
              Get the latest updates on ski conditions, resort news, transportation alerts, 
              and everything you need to know for your Alpine adventure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                <Bell className="w-4 h-4 mr-2" />
                Subscribe to Updates
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                View Weather Report
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Weather Overview */}
      <section className="py-12 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl mb-2">Current Conditions</h2>
            <p className="opacity-90">Live updates from major French ski resorts</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {weatherUpdates.map((weather, index) => (
              <Card key={index} className="bg-white/10 border-white/20 text-white">
                <CardContent className="p-4 text-center">
                  <h3 className="font-semibold mb-2">{weather.resort}</h3>
                  <div className="text-2xl font-bold mb-1">{weather.temperature}</div>
                  <div className="text-sm opacity-90 mb-2">{weather.conditions}</div>
                  <div className="text-xs space-y-1">
                    <div>Snow: {weather.snowfall}</div>
                    <div>Visibility: {weather.visibility}</div>
                  </div>
                  <Badge 
                    className={`mt-2 ${getStatusColor(weather.status)}`}
                    variant="secondary"
                  >
                    {weather.status.charAt(0).toUpperCase() + weather.status.slice(1)}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* News Categories */}
      <section className="py-8 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {newsCategories.map((category, index) => (
              <Button
                key={index}
                variant={category.active ? "default" : "outline"}
                size="sm"
                className="flex items-center space-x-2"
              >
                <span>{category.name}</span>
                <Badge variant="secondary" className="text-xs">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-6">Latest News & Updates</h2>
            <p className="text-xl text-muted-foreground">
              Stay up-to-date with the latest developments in French ski resorts
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {latestNews.map((article, index) => (
              <Card key={article.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="aspect-video overflow-hidden">
                  <ImageWithFallback
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="outline">{article.category}</Badge>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(article.date).toLocaleDateString()}</span>
                      <Clock className="w-3 h-3 ml-2" />
                      <span>{article.time}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 mb-4">
                    <div className={`w-2 h-2 rounded-full mt-2 ${getPriorityColor(article.priority)}`}></div>
                    <div className="flex-1">
                      <h3 className="text-xl mb-3 group-hover:text-primary transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-muted-foreground mb-4">{article.excerpt}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {article.tags.map((tag, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <Button variant="outline" className="w-full">
                    Read Full Article
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" variant="outline">
              Load More Articles
            </Button>
          </div>
        </div>
      </section>

      {/* Transportation Alerts */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-6">Transportation Alerts</h2>
            <p className="text-xl text-muted-foreground">
              Real-time updates on road conditions and travel advisories
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {transportationAlerts.map((alert, index) => (
              <Card key={index} className={`border-l-4 ${getSeverityColor(alert.severity)}`}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`${alert.severity === 'high' ? 'text-red-500' : alert.severity === 'medium' ? 'text-yellow-500' : 'text-green-500'}`}>
                        {alert.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold">{alert.route}</h3>
                        <p className="text-sm text-muted-foreground">{alert.message}</p>
                      </div>
                    </div>
                    <Badge 
                      variant={alert.severity === 'high' ? 'destructive' : alert.severity === 'medium' ? 'default' : 'secondary'}
                    >
                      {alert.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-6">Upcoming Events</h2>
            <p className="text-xl text-muted-foreground">
              Major events that may affect your travel plans
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {upcomingEvents.map((event, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span className="text-sm text-muted-foreground">
                      {new Date(event.date).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <h3 className="text-lg mb-2">{event.title}</h3>
                  
                  <div className="flex items-center space-x-2 mb-3">
                    <MapPin className="w-3 h-3 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{event.location}</span>
                  </div>

                  <Badge variant="outline" className="mb-4">
                    {event.type}
                  </Badge>

                  <div className="bg-muted/50 p-3 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <Info className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <p className="text-sm">{event.impact}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl mb-6">Stay Updated</h2>
            <p className="text-xl opacity-90 mb-8">
              Subscribe to our newsletter for the latest ski resort news, weather updates, 
              and transportation alerts delivered directly to your inbox.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-8">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-black"
              />
              <Button size="lg" variant="secondary">
                <Bell className="w-4 h-4 mr-2" />
                Subscribe
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                <Phone className="w-4 h-4 mr-2" />
                News Hotline: +33 1 42 60 30 30
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}