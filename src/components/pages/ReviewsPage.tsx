import { getAssetPath } from "../../utils/assetPath";
import { Star, MapPin, ThumbsUp } from "lucide-react";

interface Review {
  id: number;
  name: string;
  rating: number;
  date: string;
  location: string;
  review: string;
  avatar: string;
}

const reviews: Review[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    rating: 5,
    date: "2 weeks ago",
    location: "Paris, France",
    review: "Exceptional service from My French Driver! Our chauffeur was punctual, professional, and made our airport transfer seamless. The vehicle was immaculate and comfortable. Highly recommend for anyone needing reliable transportation in France.",
    avatar: "SJ"
  },
  {
    id: 2,
    name: "Michael Chen",
    rating: 5,
    date: "1 month ago",
    location: "Lyon, France",
    review: "Outstanding experience! Used My French Driver for business meetings across Lyon. The driver was knowledgeable about the city, always on time, and the luxury vehicle made a great impression on our clients. Will definitely use again.",
    avatar: "MC"
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    rating: 5,
    date: "3 weeks ago",
    location: "Nice, France",
    review: "Perfect service for our wedding day! My French Driver provided elegant transportation for our bridal party. The attention to detail was incredible, and they helped make our special day even more memorable. Thank you!",
    avatar: "ER"
  },
  {
    id: 4,
    name: "James Wilson",
    rating: 5,
    date: "2 months ago",
    location: "Marseille, France",
    review: "Fantastic VIP service! The chauffeur was courteous and professional throughout our corporate event. The vehicle was luxurious and well-maintained. My French Driver exceeded all expectations. Five stars!",
    avatar: "JW"
  },
  {
    id: 5,
    name: "Sophie Martin",
    rating: 5,
    date: "1 week ago",
    location: "Cannes, France",
    review: "Incredible experience during the film festival! My French Driver provided seamless transportation between venues. The service was discreet, professional, and perfectly timed. Couldn't have asked for better service.",
    avatar: "SM"
  },
  {
    id: 6,
    name: "David Thompson",
    rating: 5,
    date: "3 months ago",
    location: "Bordeaux, France",
    review: "Excellent airport transfer service! Flight was delayed but the driver waited patiently and tracked our arrival. Professional, friendly, and the car was spotless. My French Driver is now our go-to transportation service.",
    avatar: "DT"
  },
  {
    id: 7,
    name: "Isabella Garcia",
    rating: 5,
    date: "2 weeks ago",
    location: "Toulouse, France",
    review: "Amazing tour experience! Our driver was not only professional but also acted as an excellent guide, sharing local insights and history. The vehicle was comfortable for our full-day tour. Highly recommended!",
    avatar: "IG"
  },
  {
    id: 8,
    name: "Robert Anderson",
    rating: 5,
    date: "1 month ago",
    location: "Strasbourg, France",
    review: "Top-notch diplomatic service! My French Driver handled our embassy visits with utmost professionalism and discretion. The security protocols were excellent, and the service was flawless throughout.",
    avatar: "RA"
  },
  {
    id: 9,
    name: "Maria Rossi",
    rating: 5,
    date: "4 weeks ago",
    location: "Montpellier, France",
    review: "Perfect for our ski resort transfer! The driver was experienced with mountain roads and weather conditions. Comfortable journey and great conversation. My French Driver made our winter vacation start perfectly!",
    avatar: "MR"
  },
  {
    id: 10,
    name: "Thomas Mueller",
    rating: 5,
    date: "2 months ago",
    location: "Nantes, France",
    review: "Outstanding corporate transportation! Used My French Driver for multiple business trips. Always reliable, punctual, and professional. The booking process is smooth and the service consistently excellent.",
    avatar: "TM"
  }
];

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className="w-4 h-4 fill-yellow-400 text-yellow-400"
        />
      ))}
    </div>
  );
};

export function ReviewsPage() {
  const averageRating = 5.0;
  const totalReviews = reviews.length;

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Google-style Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0">
              <img 
                src={getAssetPath("logo.png")} 
                alt="My French Driver" 
                className="w-16 h-16 object-contain rounded-lg border border-gray-200"
              />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-normal text-gray-900 mb-2">My French Driver</h1>
              <div className="flex items-center gap-2 mb-2">
                <StarRating rating={5} />
                <span className="text-sm text-gray-600">{averageRating} ({totalReviews} reviews)</span>
              </div>
              <p className="text-sm text-gray-600">Premium transportation services • France</p>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section - Google Style */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="border-b border-gray-100 pb-6 last:border-b-0">
              {/* Review Header */}
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden bg-gray-100">
                  <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium text-gray-900 text-sm">{review.name}</h3>
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <svg className="w-4 h-4 text-green-500" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <StarRating rating={review.rating} />
                    <span className="text-xs text-gray-500">{review.date}</span>
                  </div>
                  
                  {/* Location */}
                  <div className="flex items-center gap-1 text-xs text-gray-500 mb-3">
                    <MapPin className="w-3 h-3" />
                    <span>{review.location}</span>
                  </div>
                </div>
              </div>

              {/* Review Content */}
              <div className="ml-13">
                <p className="text-sm text-gray-700 leading-relaxed mb-4">{review.review}</p>
                
                {/* Google-style actions */}
                <div className="flex items-center gap-6 text-xs text-gray-500">
                  <button className="flex items-center gap-1 hover:text-gray-700 transition-colors">
                    <ThumbsUp className="w-3 h-3" />
                    <span>Helpful</span>
                  </button>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    <span className="text-xs">Posted on Google</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Google-style Summary */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <StarRating rating={5} />
                <span className="text-2xl font-medium text-gray-900">{averageRating}</span>
                <span className="text-gray-600">• {totalReviews} reviews</span>
              </div>
              <p className="text-sm text-gray-600 mb-6">
                Customers consistently praise My French Driver for professional service, punctuality, and luxury vehicles across France.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button className="bg-blue-600 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
                  Book Your Ride
                </button>
                <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors">
                  View Services
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Indicators - Google Style */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-white border border-gray-200 rounded-lg">
            <div className="text-2xl font-semibold text-blue-600 mb-1">500+</div>
            <div className="text-xs text-gray-600">Happy Customers</div>
          </div>
          <div className="text-center p-4 bg-white border border-gray-200 rounded-lg">
            <div className="text-2xl font-semibold text-blue-600 mb-1">5.0★</div>
            <div className="text-xs text-gray-600">Average Rating</div>
          </div>
          <div className="text-center p-4 bg-white border border-gray-200 rounded-lg">
            <div className="text-2xl font-semibold text-blue-600 mb-1">24/7</div>
            <div className="text-xs text-gray-600">Available Service</div>
          </div>
          <div className="text-center p-4 bg-white border border-gray-200 rounded-lg">
            <div className="text-2xl font-semibold text-blue-600 mb-1">100%</div>
            <div className="text-xs text-gray-600">Professional</div>
          </div>
        </div>
      </div>
    </div>
  );
}