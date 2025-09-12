import { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { 
  HelpCircle, 
  Plus,
  Minus,
  Search,
  Phone,
  Mail,
  Clock,
  MapPin,
  CreditCard,
  Shield,
  Users,
  Car
} from "lucide-react";

export function FAQPage() {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqCategories = [
    {
      title: "Booking & Reservations",
      icon: <Phone className="w-6 h-6" />,
      faqs: [
        {
          question: "How far in advance should I book?",
          answer: "We recommend booking at least 24 hours in advance for regular services. For special events or airport transfers during peak times, we suggest 48-72 hours notice. However, we do accept last-minute bookings subject to availability."
        },
        {
          question: "Can I modify or cancel my booking?",
          answer: "Yes, you can modify or cancel your booking up to 24 hours before the scheduled service without any charges. For cancellations within 24 hours, a 50% cancellation fee applies. Changes within 2 hours of service may incur additional charges."
        },
        {
          question: "How do I receive booking confirmation?",
          answer: "You'll receive an immediate email confirmation with all booking details, including your chauffeur's contact information, vehicle details, and pickup instructions. We also send SMS confirmations and reminders 24 hours before your service."
        },
        {
          question: "What if I need to extend my booking?",
          answer: "Extensions are possible subject to vehicle and chauffeur availability. Additional time will be charged at our standard hourly rates. Please inform your chauffeur or contact our dispatch center as early as possible."
        }
      ]
    },
    {
      title: "Pricing & Payment",
      icon: <CreditCard className="w-6 h-6" />,
      faqs: [
        {
          question: "What payment methods do you accept?",
          answer: "We accept all major credit cards (Visa, MasterCard, American Express), bank transfers, and cash. Corporate clients can set up monthly billing arrangements. All payments are processed securely through encrypted systems."
        },
        {
          question: "Are there any hidden fees?",
          answer: "No, our pricing is completely transparent. All costs including fuel, tolls, parking, and gratuities are included in your quoted price. The only additional charges would be for services not originally booked, such as waiting time beyond the included allowance."
        },
        {
          question: "Do prices include gratuities?",
          answer: "Yes, gratuities are included in all our quoted prices. However, if you're particularly satisfied with the service, additional tips are always appreciated by our chauffeurs."
        },
        {
          question: "How do you calculate airport transfer prices?",
          answer: "Airport transfers have fixed prices that include meet & greet service, flight monitoring, and up to 60 minutes of waiting time. Prices vary by airport distance and vehicle type but are guaranteed regardless of traffic conditions."
        }
      ]
    },
    {
      title: "Service & Vehicles",
      icon: <Car className="w-6 h-6" />,
      faqs: [
        {
          question: "What type of vehicles do you offer?",
          answer: "Our fleet consists exclusively of premium Mercedes vehicles: E-Class for business travel, S-Class for luxury transport, and V-Class for group travel. All vehicles are less than 3 years old and maintained to the highest standards."
        },
        {
          question: "Are child car seats available?",
          answer: "Yes, we provide child car seats and booster seats for all age groups at an additional charge of €10 per seat. Please specify the child's age and weight when booking to ensure we have the appropriate safety seat."
        },
        {
          question: "What amenities are included in the vehicles?",
          answer: "All vehicles include WiFi, phone chargers, climate control, bottled water, and premium sound systems. S-Class vehicles additionally feature massage seats, champagne service, and privacy glass. V-Class vehicles have conference tables and individual seating."
        },
        {
          question: "Are your vehicles wheelchair accessible?",
          answer: "While our standard fleet is not wheelchair accessible, we can arrange specialized vehicles for passengers with mobility requirements. Please contact us at least 48 hours in advance to ensure availability."
        }
      ]
    },
    {
      title: "Airport Services",
      icon: <MapPin className="w-6 h-6" />,
      faqs: [
        {
          question: "How does flight monitoring work?",
          answer: "We automatically track your flight status in real-time and adjust pickup times accordingly. If your flight is delayed, your chauffeur will wait at no extra charge. For early arrivals, we'll be notified and ready for pickup."
        },
        {
          question: "Where will my chauffeur meet me at the airport?",
          answer: "For arrivals, your chauffeur will meet you at the designated pickup area with a name sign. Specific meeting instructions are provided in your confirmation email. For departures, pickup is at your specified location, and we factor in appropriate travel time."
        },
        {
          question: "What if my flight is significantly delayed?",
          answer: "For delays over 2 hours, we may need to reschedule your service depending on chauffeur availability. We'll contact you to discuss options, which may include waiting (with additional charges) or rebooking at no extra cost."
        },
        {
          question: "Do you provide service to all Paris airports?",
          answer: "Yes, we service Charles de Gaulle (CDG), Orly (ORY), and Beauvais-Tillé (BVA) airports. We also provide transfers to private aviation terminals and helicopter pads upon request."
        }
      ]
    },
    {
      title: "Corporate Services",
      icon: <Users className="w-6 h-6" />,
      faqs: [
        {
          question: "What are the benefits of a corporate account?",
          answer: "Corporate accounts include dedicated account management, monthly billing, priority booking, detailed expense reporting, and preferential rates for regular bookings. You'll also have access to our corporate booking platform and 24/7 support."
        },
        {
          question: "How do you handle corporate billing?",
          answer: "We provide detailed monthly invoices with trip summaries, passenger information, and expense categories. Reports can be customized for your accounting requirements and integrated with most expense management systems."
        },
        {
          question: "Can multiple employees use the same corporate account?",
          answer: "Yes, corporate accounts support multiple users with different permission levels. You can set booking approvals, spending limits, and receive notifications for all account activity."
        },
        {
          question: "Do you provide regular route services?",
          answer: "Yes, we offer optimized regular route services for daily commutes or frequent business travel. These arrangements often qualify for preferential pricing and guaranteed vehicle availability."
        }
      ]
    },
    {
      title: "Safety & Insurance",
      icon: <Shield className="w-6 h-6" />,
      faqs: [
        {
          question: "Are your vehicles and drivers insured?",
          answer: "Yes, we maintain comprehensive commercial insurance covering all vehicles, passengers, and third parties. Our coverage exceeds legal requirements, and all chauffeurs are professionally licensed and background-checked."
        },
        {
          question: "What safety protocols do you follow?",
          answer: "All vehicles undergo daily safety inspections, regular maintenance, and are equipped with GPS tracking. Chauffeurs receive ongoing safety training and must maintain clean driving records. We also have 24/7 emergency support."
        },
        {
          question: "What happens in case of an emergency?",
          answer: "All vehicles have emergency communication systems, and chauffeurs are trained in first aid. Our 24/7 dispatch center can coordinate with emergency services if needed. We also maintain backup vehicles for service continuity."
        },
        {
          question: "How do you ensure passenger privacy?",
          answer: "We maintain strict confidentiality protocols. Chauffeurs sign non-disclosure agreements, and we're GDPR compliant for data protection. All passenger information is kept confidential and secure."
        }
      ]
    }
  ];

  const filteredFAQs = faqCategories.map(category => ({
    ...category,
    faqs: category.faqs.filter(faq => 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.faqs.length > 0);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4">Frequently Asked Questions</Badge>
            <h1 className="text-5xl md:text-6xl mb-6">
              How Can We Help You?
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Find answers to common questions about our premium transportation services. 
              Can't find what you're looking for? Our support team is available 24/7.
            </p>
            
            {/* Search */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search FAQ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {filteredFAQs.map((category, categoryIndex) => (
              <div key={categoryIndex} className="mb-12">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="text-primary">{category.icon}</div>
                  <h2 className="text-2xl">{category.title}</h2>
                </div>
                
                <div className="space-y-4">
                  {category.faqs.map((faq, faqIndex) => {
                    const globalIndex = categoryIndex * 100 + faqIndex;
                    const isOpen = openItems.includes(globalIndex);
                    
                    return (
                      <Card key={faqIndex} className="overflow-hidden">
                        <CardContent className="p-0">
                          <button
                            onClick={() => toggleItem(globalIndex)}
                            className="w-full p-6 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
                          >
                            <span className="text-lg pr-4">{faq.question}</span>
                            {isOpen ? (
                              <Minus className="w-5 h-5 text-primary flex-shrink-0" />
                            ) : (
                              <Plus className="w-5 h-5 text-primary flex-shrink-0" />
                            )}
                          </button>
                          
                          {isOpen && (
                            <div className="px-6 pb-6">
                              <div className="border-t pt-4">
                                <p className="text-muted-foreground leading-relaxed">
                                  {faq.answer}
                                </p>
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            ))}
            
            {filteredFAQs.length === 0 && searchTerm && (
              <div className="text-center py-12">
                <HelpCircle className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl mb-2">No results found</h3>
                <p className="text-muted-foreground mb-4">
                  We couldn't find any FAQ items matching "{searchTerm}"
                </p>
                <Button onClick={() => setSearchTerm('')}>
                  Clear Search
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Popular Questions */}
      {!searchTerm && (
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl mb-6">Most Popular Questions</h2>
              <p className="text-xl text-muted-foreground">
                Quick answers to our most frequently asked questions
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              <Card className="text-center group hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <Clock className="w-8 h-8 mx-auto mb-4 text-primary" />
                  <h3 className="text-lg mb-2">Booking Timeline</h3>
                  <p className="text-sm text-muted-foreground">
                    Book 24-48 hours in advance for best availability
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center group hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <CreditCard className="w-8 h-8 mx-auto mb-4 text-primary" />
                  <h3 className="text-lg mb-2">Payment Methods</h3>
                  <p className="text-sm text-muted-foreground">
                    Credit cards, bank transfer, cash, and corporate billing
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center group hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <MapPin className="w-8 h-8 mx-auto mb-4 text-primary" />
                  <h3 className="text-lg mb-2">Airport Coverage</h3>
                  <p className="text-sm text-muted-foreground">
                    CDG, Orly, and Beauvais with flight monitoring
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Contact Support */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-primary text-white rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl mb-6">Still Have Questions?</h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Our customer support team is available 24/7 to help with any questions 
              or special requirements you may have.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div>
                <Phone className="w-12 h-12 mx-auto mb-4 opacity-90" />
                <h4 className="text-xl mb-2">Call Us</h4>
                <p className="opacity-80">+33 1 42 60 30 30</p>
                <p className="text-sm opacity-70">Available 24/7</p>
              </div>
              <div>
                <Mail className="w-12 h-12 mx-auto mb-4 opacity-90" />
                <h4 className="text-xl mb-2">Email Support</h4>
                <p className="opacity-80">support@myfrenchdriver.com</p>
                <p className="text-sm opacity-70">Response within 2 hours</p>
              </div>
              <div>
                <HelpCircle className="w-12 h-12 mx-auto mb-4 opacity-90" />
                <h4 className="text-xl mb-2">Live Chat</h4>
                <p className="opacity-80">Instant assistance</p>
                <p className="text-sm opacity-70">Available on website</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg">
                <Phone className="w-4 h-4 mr-2" />
                Contact Support
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
                <Mail className="w-4 h-4 mr-2" />
                Send Message
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}