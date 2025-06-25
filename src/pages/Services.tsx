
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, MapPin, Heart, Users, Calendar, Star, Music, Palette, Flower, Car } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import ModernFooter from "@/components/ModernFooter";

const Services = () => {
  const services = [
    {
      icon: Camera,
      title: "Event Photography",
      description: "Capture your precious moments with professional photographers who specialize in events.",
      features: ["Pre-event shoots", "Event day coverage", "Photo albums", "Digital galleries"],
      image: "https://images.unsplash.com/photo-1606800052052-a08af7148866?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      color: "coral"
    },
    {
      icon: MapPin,
      title: "Event Venues",
      description: "Find the perfect venue for your dream event from our curated list of locations.",
      features: ["Indoor venues", "Outdoor locations", "Corporate venues", "Venue decoration"],
      image: "https://images.unsplash.com/photo-1519167758481-83f29c8ea79d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      color: "sage"
    },
    {
      icon: Heart,
      title: "Event Planners",
      description: "Professional event planners to make your special day stress-free and memorable.",
      features: ["Full event planning", "Day-of coordination", "Budget management", "Timeline creation"],
      image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      color: "cream"
    },
    {
      icon: Users,
      title: "Catering Services",
      description: "Delicious food and beverages to delight your event guests.",
      features: ["Multi-cuisine menus", "Live counters", "Cocktail services", "Dietary accommodations"],
      image: "https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      color: "coral"
    },
    {
      icon: Palette,
      title: "Decoration Services",
      description: "Professional decorators to make your event look stunning.",
      features: ["Theme decoration", "Floral arrangements", "Lighting setup", "Stage decoration"],
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      color: "sage"
    },
    {
      icon: Music,
      title: "Entertainment",
      description: "Musical entertainment and DJ services to keep your guests engaged all night.",
      features: ["Live bands", "DJ services", "Sound systems", "Dance performances"],
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      color: "cream"
    },
    {
      icon: Palette,
      title: "Event Styling",
      description: "Beautiful styling and theme coordination for your event.",
      features: ["Theme styling", "Color coordination", "Props rental", "Styling consultation"],
      image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      color: "coral"
    },
    {
      icon: Flower,
      title: "Floral Decoration",
      description: "Stunning floral arrangements and decorations for your event.",
      features: ["Stage decoration", "Table centerpieces", "Entrance decoration", "Floral arrangements"],
      image: "https://images.unsplash.com/photo-1490818387583-1baba5e638af?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      color: "sage"
    },
    {
      icon: Car,
      title: "Transportation",
      description: "Luxury transportation services for guests and organizers.",
      features: ["Guest transportation", "VIP car rental", "Airport transfers", "Decorated vehicles"],
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      color: "cream"
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'coral':
        return 'text-coral-600 bg-coral-100';
      case 'sage':
        return 'text-sage-600 bg-sage-100';
      case 'cream':
        return 'text-cream-600 bg-cream-100';
      default:
        return 'text-coral-600 bg-coral-100';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 to-brand-100">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 bg-gradient-to-br from-charcoal-900 to-charcoal-800">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 bg-coral-500 rounded-full px-8 py-3 mb-8">
            <Star className="h-5 w-5 text-white fill-current" />
            <span className="text-white font-bold text-base">Premium Services</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-playfair font-bold mb-6 text-white">
            Event Services
          </h1>
          <p className="text-xl max-w-3xl mx-auto text-gray-300 leading-relaxed">
            Complete event solutions under one roof. From planning to execution, 
            we have everything you need for your perfect event.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="glass-card hover-lift border-0 overflow-hidden group">
                <div className="aspect-video bg-gray-200 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <CardHeader>
                  <div className={`w-12 h-12 rounded-xl ${getColorClasses(service.color)} flex items-center justify-center mb-4`}>
                    <service.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl text-charcoal-900 font-bold">{service.title}</CardTitle>
                  <CardDescription className="text-base text-charcoal-700 leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-sm text-charcoal-700">
                        <div className={`w-2 h-2 rounded-full ${service.color === 'coral' ? 'bg-coral-500' : service.color === 'sage' ? 'bg-sage-500' : 'bg-cream-500'}`}></div>
                        <span className="font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="space-y-3">
                    <Link to="/vendors">
                      <Button variant="outline" className="w-full border-2 border-charcoal-300 text-charcoal-700 hover:bg-charcoal-100 font-semibold">
                        View Providers
                      </Button>
                    </Link>
                    <Link to="/booking">
                      <Button className="w-full btn-primary font-semibold">
                        Book Now
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-sage-100 to-coral-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-playfair font-bold mb-4 text-charcoal-900">Need Help Choosing?</h2>
          <p className="text-xl mb-8 text-charcoal-700 leading-relaxed">
            Our event experts are here to help you find the perfect services for your special occasion
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-2 border-sage-500 text-sage-700 hover:bg-sage-500 hover:text-white font-bold px-10 py-6 text-lg rounded-full">
                Get Free Consultation
              </Button>
            </Link>
            <Link to="/booking">
              <Button size="lg" className="btn-primary font-bold px-10 py-6 text-lg rounded-full">
                Start Booking
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <ModernFooter />
    </div>
  );
};

export default Services;
