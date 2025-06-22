import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, MapPin, Heart, Users, Calendar, Star, Music, Shirt, Flower, Car } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Services = () => {
  const services = [
    {
      icon: Camera,
      title: "Event Photography",
      description: "Capture your precious moments with professional photographers who specialize in events.",
      features: ["Pre-event shoots", "Event day coverage", "Photo albums", "Digital galleries"]
    },
    {
      icon: MapPin,
      title: "Event Venues",
      description: "Find the perfect venue for your dream event from our curated list of locations.",
      features: ["Indoor venues", "Outdoor locations", "Corporate venues", "Venue decoration"]
    },
    {
      icon: Heart,
      title: "Event Planners",
      description: "Professional event planners to make your special day stress-free and memorable.",
      features: ["Full event planning", "Day-of coordination", "Budget management", "Timeline creation"]
    },
    {
      icon: Users,
      title: "Catering Services",
      description: "Delicious food and beverages to delight your event guests.",
      features: ["Multi-cuisine menus", "Live counters", "Cocktail services", "Dietary accommodations"]
    },
    {
      icon: Star,
      title: "Decoration Services",
      description: "Professional decorators to make your event look stunning.",
      features: ["Theme decoration", "Floral arrangements", "Lighting setup", "Stage decoration"]
    },
    {
      icon: Music,
      title: "Entertainment",
      description: "Musical entertainment and DJ services to keep your guests engaged all night.",
      features: ["Live bands", "DJ services", "Sound systems", "Dance performances"]
    },
    {
      icon: Shirt,
      title: "Event Styling",
      description: "Beautiful styling and theme coordination for your event.",
      features: ["Theme styling", "Color coordination", "Props rental", "Styling consultation"]
    },
    {
      icon: Flower,
      title: "Floral Decoration",
      description: "Stunning floral arrangements and decorations for your event.",
      features: ["Stage decoration", "Table centerpieces", "Entrance decoration", "Floral arrangements"]
    },
    {
      icon: Car,
      title: "Transportation",
      description: "Luxury transportation services for guests and organizers.",
      features: ["Guest transportation", "VIP car rental", "Airport transfers", "Decorated vehicles"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 bg-gradient-to-br from-maroon-900 to-maroon-950">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 metallic-gold-bright glitter-text font-cinzel">
            Event Services
          </h1>
          <p className="text-xl max-w-3xl mx-auto font-cormorant metallic-gold-subtle">
            Complete event solutions under one roof. From planning to execution, 
            we have everything you need for your perfect event.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4 bg-maroon-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="bg-maroon-800 border-gold-600 hover:border-gold-400 hover:shadow-lg hover:shadow-gold-400/20 transition-all h-full">
                <CardHeader>
                  <service.icon className="h-12 w-12 text-gold-400 mb-4" />
                  <CardTitle className="text-xl metallic-gold font-cinzel">{service.title}</CardTitle>
                  <CardDescription className="text-base metallic-gold-subtle font-cormorant">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm metallic-gold-subtle font-cormorant">
                        <div className="w-2 h-2 bg-gold-500 rounded-full"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full bg-gold-500 hover:bg-gold-600 text-maroon-900 font-cormorant font-semibold">
                    View Providers
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 royal-gradient">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4 metallic-gold-bright glitter-text font-cinzel">Need Help Choosing?</h2>
          <p className="text-xl mb-8 metallic-gold-subtle font-cormorant">
            Our event experts are here to help you find the perfect services for your special occasion
          </p>
          <Button size="lg" className="bg-gold-500 hover:bg-gold-600 text-maroon-900 font-cormorant font-semibold px-8 py-6 text-lg">
            Get Free Consultation
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
