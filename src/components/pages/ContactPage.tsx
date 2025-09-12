import { getAssetPath } from "../../utils/assetPath";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send,
  MessageSquare,
  Calendar,
  Car,
  Shield,
  Award,
  CheckCircle,
  Globe,
  Users,
  Star
} from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccess(null);
    setError(null);

    try {
      const subjectBase = formData.service ? `${formData.service} inquiry` : 'Contact form inquiry';
      const subject = formData.date ? `${subjectBase} - ${formData.date}` : subjectBase;

      const normalizePhone = (input: string): string | undefined => {
        const raw = (input || '').replace(/\s+/g, '');
        if (!raw) return undefined;
        if (raw.startsWith('+')) {
          // Basic sanity: + followed by 7-15 digits
          return /^\+[0-9]{7,15}$/.test(raw) ? raw : undefined;
        }
        // Auto-convert common FR local format 0XXXXXXXXX to +33XXXXXXXXX
        if (/^0\d{9}$/.test(raw)) {
          return `+33${raw.slice(1)}`;
        }
        // Accept plain digits by prefixing + if length reasonable
        if (/^\d{7,15}$/.test(raw)) {
          return `+${raw}`;
        }
        return undefined;
      };

      const phoneNorm = normalizePhone(formData.phone);

      const payload = {
        sender_name: formData.name,
        sender_email: formData.email,
        ...(phoneNorm ? { sender_phone: phoneNorm } : {}),
        subject,
        message: formData.message,
        message_type: 'inquiry',
        priority: 'medium',
        source: 'website'
      };

      const res = await fetch(`${API_BASE_URL}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const errMsg = data?.error || data?.message || 'Failed to send message';
        throw new Error(errMsg);
      }

      const ref = data?.message_data?.reference_number || data?.message_data?.id || '';
      setSuccess(ref ? `Message sent successfully. Reference: ${ref}` : 'Message sent successfully.');
      setFormData({ name: '', email: '', phone: '', service: '', date: '', message: '' });
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2500);
    } catch (err: any) {
      setError(err?.message || 'Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl p-6 shadow-xl text-center">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-10 h-10 text-green-600 animate-bounce" />
            </div>
            <h3 className="text-lg font-semibold">Message sent!</h3>
            <p className="text-sm text-muted-foreground">We'll get back to you shortly.</p>
          </div>
        </div>
      )}
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={getAssetPath("Nouveau site internet/HOME PAGE.jpeg")} 
            alt="Contact My French Driver" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/85 to-indigo-600/85" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-4 bg-black/60 text-white border-white/50 font-semibold">
              <MessageSquare className="w-4 h-4 mr-2" />
              Contact Us
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg">
              Get in Touch
            </h1>
            <p className="text-xl text-white font-medium drop-shadow-md mb-8 leading-relaxed">
              Ready to experience premium transportation? Contact our team for personalized service and instant quotes.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="text-center hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl">Call Us</CardTitle>
                <CardDescription>Available 24/7 for your convenience</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-blue-600 mb-2">+33 1 42 60 30 30</p>
                <p className="text-sm text-muted-foreground">Emergency: +33 6 12 34 56 78</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-xl">Email Us</CardTitle>
                <CardDescription>Quick response guaranteed</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold text-green-600 mb-2">info@myfrenchdriver.com</p>
                <p className="text-sm text-muted-foreground">reservations@myfrenchdriver.com</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-purple-600" />
                </div>
                <CardTitle className="text-xl">Visit Us</CardTitle>
                <CardDescription>Central Paris location</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="font-semibold text-purple-600 mb-2">Paris & Île-de-France</p>
                <p className="text-sm text-muted-foreground">Serving all major airports and destinations</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Form */}
            <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center">
                  <Send className="w-6 h-6 mr-3 text-blue-600" />
                  Send us a Message
                </CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you within 2 hours
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div className="p-3 rounded-md bg-red-50 border border-red-200 text-red-700 text-sm">
                      {error}
                    </div>
                  )}
                  {success && (
                    <div className="p-3 rounded-md bg-green-50 border border-green-200 text-green-700 text-sm">
                      {success}
                    </div>
                  )}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Full Name *</label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your full name"
                        required
                        className="border-gray-200 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email *</label>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your.email@example.com"
                        required
                        className="border-gray-200 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone Number</label>
                      <Input
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+33 6 12 34 56 78"
                        className="border-gray-200 focus:border-blue-500"
                      />
                      <p className="text-xs text-muted-foreground mt-1">Use international format (e.g., +33 6 12 34 56 78). French numbers starting with 0 are auto-formatted.</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Service Type</label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-200 rounded-md focus:border-blue-500 focus:outline-none"
                      >
                        <option value="">Select a service</option>
                        <option value="airport-transfer">Airport Transfer</option>
                        <option value="business-travel">Business Travel</option>
                        <option value="city-tours">City Tours</option>
                        <option value="wedding">Wedding Transportation</option>
                        <option value="events">Special Events</option>
                        <option value="daily-rate">Daily Rate</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Preferred Date</label>
                    <Input
                      name="date"
                      type="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="border-gray-200 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Message *</label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us about your transportation needs..."
                      rows={5}
                      required
                      className="border-gray-200 focus:border-blue-500"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={submitting}
                    variant="default"
                    className="w-full text-white py-3 disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{ backgroundColor: '#000', color: '#fff' }}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    {submitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Additional Information */}
            <div className="space-y-8">
              <Card className="border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <Clock className="w-5 h-5 mr-3 text-green-600" />
                    Operating Hours
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-medium">Monday - Friday</span>
                    <span className="text-muted-foreground">24/7 Available</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Saturday - Sunday</span>
                    <span className="text-muted-foreground">24/7 Available</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Emergency Service</span>
                    <span className="text-green-600 font-semibold">Always Available</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <Award className="w-5 h-5 mr-3 text-blue-600" />
                    Why Choose Us
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Professional Drivers</p>
                      <p className="text-sm text-muted-foreground">Licensed, insured, and experienced</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Premium Fleet</p>
                      <p className="text-sm text-muted-foreground">Luxury vehicles maintained to perfection</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">24/7 Support</p>
                      <p className="text-sm text-muted-foreground">Always here when you need us</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Competitive Pricing</p>
                      <p className="text-sm text-muted-foreground">Transparent, no hidden fees</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                <CardContent className="p-6">
                  <div className="text-center">
                    <Star className="w-8 h-8 mx-auto mb-3" />
                    <h3 className="text-xl font-bold mb-2">Need Immediate Assistance?</h3>
                    <p className="mb-4 opacity-90">Call us now for instant booking and support</p>
                    <Button variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                      <Phone className="w-4 h-4 mr-2" />
                      Call +33 1 42 60 30 30
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Service Area</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We provide premium transportation services throughout Paris and the greater Île-de-France region, 
              including all major airports, train stations, and destinations.
            </p>
          </div>
          
          <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Interactive map would be displayed here</p>
              <p className="text-sm text-gray-400 mt-2">Covering Paris & Île-de-France</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}