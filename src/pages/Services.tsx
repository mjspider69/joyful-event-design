
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, MapPin, Heart, Users, Calendar, Star, Music, Shirt, Flower, Car } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Services = () => {
  const services = [
    {
      icon: Camera,
      title: "Wedding Photography",
      description: "Capture your precious moments with professional photographers who specialize in weddings.",
      features: ["Pre-wedding shoots", "Wedding day coverage", "Photo albums", "Digital galleries"]
    },
    {
      icon: MapPin,
      title: "Wedding Venues",
      description: "Find the perfect venue for your dream wedding from our curated list of locations.",
      features: ["Indoor venues", "Outdoor locations", "Destination weddings", "Venue decoration"]
    },
    {
      icon: Heart,
      title: "Wedding Planners",
      description: "Professional wedding planners to make your special day stress-free and memorable.",
      features: ["Full wedding planning", "Day-of coordination", "Budget management", "Timeline creation"]
    },
    {
      icon: Users,
      title: "Catering Services",
      description: "Delicious food and beverages to delight your wedding guests.",
      features: ["Multi-cuisine menus", "Live counters", "Cocktail services", "Dietary accommodations"]
    },
    {
      icon: Star,
      title: "Bridal Makeup",
      description: "Professional makeup artists to make you look stunning on your wedding day.",
      features: ["Bridal makeup", "Hair styling", "Mehendi artists", "Grooming for groom"]
    },
    {
      icon: Music,
      title: "Entertainment",
      description: "Musical entertainment and DJ services to keep your guests dancing all night.",
      features: ["Live bands", "DJ services", "Sound systems", "Dance performances"]
    },
    {
      icon: Shirt,
      title: "Wedding Attire",
      description: "Beautiful wedding outfits and accessories for the bride and groom.",
      features: ["Bridal lehengas", "Groom sherwanis", "Jewelry rental", "Styling consultation"]
    },
    {
      icon: Flower,
      title: "Floral Decoration",
      description: "Stunning floral arrangements and decorations for your wedding ceremony.",
      features: ["Mandap decoration", "Stage decoration", "Bridal bouquets", "Centerpieces"]
    },
    {
      icon: Car,
      title: "Transportation",
      description: "Luxury transportation services for the wedding party and guests.",
      features: ["Bridal car rental", "Guest transportation", "Airport transfers", "Decorated vehicles"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Wedding Services
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Complete wedding solutions under one roof. From planning to execution, 
            we have everything you need for your perfect wedding day.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow h-full">
                <CardHeader>
                  <service.icon className="h-12 w-12 text-pink-500 mb-4" />
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription className="text-base">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full bg-pink-500 hover:bg-pink-600">
                    View Providers
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-pink-500 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Need Help Choosing?</h2>
          <p className="text-xl mb-8">
            Our wedding experts are here to help you find the perfect services for your special day
          </p>
          <Button size="lg" variant="secondary" className="px-8 py-6 text-lg">
            Get Free Consultation
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
