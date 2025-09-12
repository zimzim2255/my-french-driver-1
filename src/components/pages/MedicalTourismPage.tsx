import { getAssetPath } from "../../utils/assetPath";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { 
  Stethoscope, 
  Heart, 
  Shield, 
  Car,
  Star,
  CheckCircle,
  ArrowRight,
  Calendar,
  Phone,
  Users,
  Award,
  Clock,
  MapPin,
  Plane,
  Building,
  UserCheck,
  Headphones
} from "lucide-react";

export function MedicalTourismPage() {
  const medicalServices = [
    {
      title: "Hospital Transfers",
      description: "Comfortable transportation to and from medical facilities",
      features: [
        "Wheelchair accessible vehicles",
        "Medical equipment transport",
        "Trained assistance staff",
        "Direct hospital coordination",
        "Emergency response capability",
        "Insurance coordination"
      ],
      price: "From €45",
      icon: Building,
      color: "bg-blue-100 text-blue-600"
    },
    {
      title: "Airport Medical Transfers",
      description: "Specialized transfers for medical tourists arriving in Paris",
      features: [
        "Meet & greet at arrival",
        "Medical documentation assistance",
        "Multilingual support",
        "Comfortable medical transport",
        "Hotel/clinic coordination",
        "24/7 availability"
      ],
      price: "From €85",
      icon: Plane,
      color: "bg-green-100 text-green-600"
    },
    {
      title: "Treatment Appointments",
      description: "Regular transportation for ongoing medical treatments",
      features: [
        "Flexible scheduling",
        "Comfortable seating options",
        "Punctual service",
        "Treatment center familiarity",
        "Patient care assistance",
        "Family coordination"
      ],
      price: "From €35",
      icon: Calendar,
      color: "bg-purple-100 text-purple-600"
    },
    {
      title: "Recovery Transportation",
      description: "Gentle transportation during recovery periods",
      features: [
        "Extra comfort features",
        "Smooth ride technology",
        "Recovery-friendly vehicles",
        "Assistance with mobility",
        "Medication reminders",
        "Caregiver coordination"
      ],
      price: "From €50",
      icon: Heart,
      color: "bg-red-100 text-red-600"
    }
  ];

  const medicalFacilities = [
    {
      name: "American Hospital of Paris",
      location: "Neuilly-sur-Seine",
      specialties: ["Cardiology", "Oncology", "Orthopedics", "Emergency Care"],
      languages: ["English", "French", "Arabic"],
      accreditation: "JCI Accredited"
    },
    {
      name: "Hôpital Européen Georges-Pompidou",
      location: "15th Arrondissement",
      specialties: ["Cardiovascular", "Transplants", "Neurology", "Oncology"],
      languages: ["French", "English", "Spanish"],
      accreditation: "ISO Certified"
    },
    {
      name: "Institut Curie",
      location: "5th Arrondissement",
      specialties: ["Cancer Treatment", "Research", "Radiation Therapy"],
      languages: ["French", "English", "Italian"],
      accreditation: "International Recognition"
    },
    {
      name: "Clinique du Trocadéro",
      location: "16th Arrondissement",
      specialties: ["Plastic Surgery", "Dermatology", "Aesthetic Medicine"],
      languages: ["French", "English", "Russian"],
      accreditation: "Private Excellence"
    }
  ];

  const serviceFeatures = [
    {
      icon: Shield,
      title: "Medical Safety",
      description: "All vehicles equipped with medical safety features and emergency communication systems.",
      color: "text-green-600 bg-green-100"
    },
    {
      icon: UserCheck,
      title: "Trained Staff",
      description: "Drivers trained in medical assistance and patient care protocols.",
      color: "text-blue-600 bg-blue-100"
    },
    {
      icon: Headphones,
      title: "Multilingual Support",
      description: "Communication support in multiple languages for international patients.",
      color: "text-purple-600 bg-purple-100"
    },
    {
      icon: Clock,
      title: "Flexible Scheduling",
      description: "Adaptable to medical schedules and last-minute appointment changes.",
      color: "text-orange-600 bg-orange-100"
    }
  ];

  const patientTypes = [
    {
      title: "International Patients",
      description: "Comprehensive support for medical tourists from abroad",
      services: [
        "Airport pickup and drop-off",
        "Hotel to hospital transfers",
        "Translation services",
        "Medical documentation assistance",
        "Insurance coordination",
        "Cultural orientation"
      ]
    },
    {
      title: "Elderly Patients",
      description: "Specialized care for senior patients with mobility needs",
      services: [
        "Wheelchair accessible vehicles",
        "Assistance with boarding",
        "Comfortable seating options",
        "Medication reminders",
        "Family coordination",
        "Gentle driving techniques"
      ]
    },
    {
      title: "Post-Surgery Patients",
      description: "Careful transportation during recovery periods",
      services: [
        "Extra comfort features",
        "Smooth ride technology",
        "Recovery position options",
        "Medical equipment transport",
        "Caregiver assistance",
        "Follow-up coordination"
      ]
    },
    {
      title: "Chronic Care Patients",
      description: "Regular transportation for ongoing treatments",
      services: [
        "Scheduled appointment transfers",
        "Treatment center familiarity",
        "Medical history awareness",
        "Flexible scheduling",
        "Insurance billing",
        "Care team coordination"
      ]
    }
  ];

  const medicalBenefits = [
    "Specialized medical transportation vehicles",
    "Trained drivers with medical assistance knowledge",
    "Wheelchair accessibility and mobility aids",
    "Direct coordination with medical facilities",
    "Multilingual support for international patients",
    "Flexible scheduling for medical appointments",
    "Insurance and billing coordination",
    "24/7 emergency transportation availability"
  ];

  const safetyProtocols = [
    {
      title: "Vehicle Sanitization",
      description: "Comprehensive cleaning and sanitization between patients",
      icon: Shield
    },
    {
      title: "Medical Equipment",
      description: "Vehicles equipped with basic medical safety equipment",
      icon: Stethoscope
    },
    {
      title: "Emergency Protocols",
      description: "Direct communication with emergency services and hospitals",
      icon: Phone
    },
    {
      title: "Patient Privacy",
      description: "Strict confidentiality and HIPAA-compliant practices",
      icon: UserCheck
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-teal-100">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={getAssetPath("Nouveau site internet/champagne_vignoble-scaled.jpeg")} 
            alt="Medical Tourism" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-green-600/80" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200">
              <Stethoscope className="w-4 h-4 mr-2" />
              Medical Tourism
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Healthcare Transportation
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Specialized transportation services for medical tourists and patients. 
              Safe, comfortable, and professional transport to Paris's world-class medical facilities.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Calendar className="w-4 h-4 mr-2" />
                Book Medical Transport
              </Button>
              <Button variant="outline" className="border-blue-200 hover:bg-blue-50">
                <Phone className="w-4 h-4 mr-2" />
                Call +33 1 42 60 30 30
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Medical Services */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-green-100 text-green-800">
              <Heart className="w-4 h-4 mr-2" />
              Medical Services
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Specialized Medical Transportation</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive transportation services designed specifically for medical patients and healthcare needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {medicalServices.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 ${service.color} rounded-lg flex items-center justify-center`}>
                        <service.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{service.title}</CardTitle>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600">{service.price}</div>
                    </div>
                  </div>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-3">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-muted-foreground text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Book This Service
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Medical Facilities */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-purple-100 text-purple-800">
              <Building className="w-4 h-4 mr-2" />
              Medical Facilities
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Paris's Premier Medical Centers</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We provide transportation to Paris's top medical facilities, known for excellence in international healthcare.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {medicalFacilities.map((facility, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex justify-between items-start mb-3">
                    <CardTitle className="text-xl text-blue-600">{facility.name}</CardTitle>
                    <Badge variant="secondary" className="text-xs">
                      {facility.accreditation}
                    </Badge>
                  </div>
                  <CardDescription>
                    <div className="flex items-center space-x-2 text-sm">
                      <MapPin className="w-4 h-4" />
                      <span>{facility.location}</span>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-2">Specialties:</p>
                      <div className="flex flex-wrap gap-1">
                        {facility.specialties.map((specialty, specialtyIndex) => (
                          <Badge key={specialtyIndex} variant="outline" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-2">Languages:</p>
                      <div className="flex flex-wrap gap-1">
                        {facility.languages.map((language, languageIndex) => (
                          <Badge key={languageIndex} variant="secondary" className="text-xs">
                            {language}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Patient Types */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-blue-100 text-blue-800">
              <Users className="w-4 h-4 mr-2" />
              Patient Care
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Tailored Patient Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Specialized transportation services designed for different patient needs and medical situations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {patientTypes.map((patient, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl text-blue-600">{patient.title}</CardTitle>
                  <CardDescription className="text-base">{patient.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {patient.services.map((service, serviceIndex) => (
                      <li key={serviceIndex} className="flex items-start space-x-3">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground text-sm">{service}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Service Features */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-green-100 text-green-800">
              <Award className="w-4 h-4 mr-2" />
              Service Features
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Medical Transportation Excellence</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our medical transportation service combines healthcare expertise with luxury comfort.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {serviceFeatures.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <div className={`w-16 h-16 ${feature.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <feature.icon className="w-8 h-8" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Protocols */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-red-100 text-red-800">
              <Shield className="w-4 h-4 mr-2" />
              Safety Protocols
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Medical Safety Standards</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We maintain the highest safety and hygiene standards for all medical transportation services.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {safetyProtocols.map((protocol, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <protocol.icon className="w-8 h-8 text-red-600" />
                  </div>
                  <CardTitle className="text-lg">{protocol.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{protocol.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Medical Benefits */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-white/20 text-white hover:bg-white/30">
              <Heart className="w-4 h-4 mr-2" />
              Medical Benefits
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Medical Transportation</h2>
            <p className="text-blue-100 max-w-2xl mx-auto">
              Professional medical transportation ensures your healthcare journey is safe, comfortable, and stress-free.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {medicalBenefits.map((benefit, index) => (
              <div key={index} className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                <p className="text-blue-100 text-sm">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Need Medical Transportation?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Trust our specialized medical transportation service for your healthcare needs in Paris. 
              Professional, safe, and compassionate care every step of the way.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3">
                <Stethoscope className="w-5 h-5 mr-2" />
                Book Medical Transport
              </Button>
              <Button variant="outline" className="border-blue-200 hover:bg-blue-50 text-lg px-8 py-3">
                <Phone className="w-5 h-5 mr-2" />
                Call +33 1 42 60 30 30
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Medical certified | Multilingual support | 24/7 availability
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}