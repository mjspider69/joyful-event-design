
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Calendar, Heart, MapPin, Star, Users } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 px-4 royal-gradient">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-cinzel font-bold mb-6 metallic-gold-bright glitter-text">
            Royal Event Planning
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 font-cormorant metallic-gold-subtle">
            Transform your special moments into majestic celebrations with India's premier event planning platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gold-500 hover:bg-gold-600 text-maroon-900 font-cormorant font-semibold text-lg px-8 py-6">
              Start Planning <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-gold-400 text-gold-400 hover:bg-gold-400 hover:text-maroon-900 font-cormorant font-semibold text-lg px-8 py-6">
              Explore Services
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-maroon-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-cinzel font-bold mb-4 metallic-gold glitter-text">
              Why Choose Aaroham
            </h2>
            <p className="text-xl max-w-3xl mx-auto font-cormorant metallic-gold-subtle">
              Experience the finest in event planning with our royal touch and attention to detail
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Users,
                title: "Expert Planners",
                description: "Professional event coordinators with years of royal event experience"
              },
              {
                icon: MapPin,
                title: "Premium Venues",
                description: "Curated selection of luxury venues fit for royal celebrations"
              },
              {
                icon: Star,
                title: "5-Star Service",
                description: "Impeccable service that exceeds expectations every time"
              },
              {
                icon: Calendar,
                title: "Timely Execution",
                description: "Flawless execution with precision timing and attention to detail"
              }
            ].map((feature, index) => (
              <Card key={index} className="bg-maroon-800 border-gold-600 hover:border-gold-400 transition-all hover:shadow-lg hover:shadow-gold-400/20">
                <CardHeader className="text-center">
                  <feature.icon className="h-12 w-12 text-gold-400 mx-auto mb-4" />
                  <CardTitle className="metallic-gold font-cinzel text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center font-cormorant text-lg metallic-gold-subtle">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 px-4 bg-maroon-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-cinzel font-bold mb-4 metallic-gold glitter-text">
              Our Royal Services
            </h2>
            <p className="text-xl max-w-3xl mx-auto font-cormorant metallic-gold-subtle">
              From intimate gatherings to grand celebrations, we make every event extraordinary
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              {
                title: "Corporate Events",
                description: "Professional corporate gatherings with royal elegance",
                image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              },
              {
                title: "Social Celebrations",
                description: "Birthday parties and personal milestones made memorable",
                image: "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              },
              {
                title: "Cultural Events",
                description: "Traditional celebrations with modern royal touch",
                image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              }
            ].map((service, index) => (
              <Card key={index} className="bg-maroon-800 border-gold-600 hover:border-gold-400 transition-all overflow-hidden hover:shadow-lg hover:shadow-gold-400/20">
                <div className="aspect-video overflow-hidden">
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                </div>
                <CardHeader>
                  <CardTitle className="metallic-gold font-cinzel text-xl">{service.title}</CardTitle>
                  <CardDescription className="font-cormorant text-lg metallic-gold-subtle">
                    {service.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <Link to="/services">
              <Button size="lg" className="bg-gold-500 hover:bg-gold-600 text-maroon-900 font-cormorant font-semibold text-lg px-8 py-6">
                View All Services <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-maroon-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-cinzel font-bold mb-4 metallic-gold glitter-text">
              Royal Testimonials
            </h2>
            <p className="text-xl max-w-3xl mx-auto font-cormorant metallic-gold-subtle">
              Hear from our satisfied clients about their royal event experiences
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Priya Sharma",
                event: "Corporate Gala",
                comment: "Aaroham made our company gala feel like a royal affair. The attention to detail was exceptional."
              },
              {
                name: "Rajesh Kumar",
                event: "Anniversary Celebration",
                comment: "Our 25th anniversary celebration was beyond our dreams. Truly a royal experience!"
              },
              {
                name: "Sneha Patel",
                event: "Birthday Party",
                comment: "The team at Aaroham transformed our daughter's birthday into a fairy tale celebration."
              }
            ].map((testimonial, index) => (
              <Card key={index} className="bg-maroon-800 border-gold-600">
                <CardHeader>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-gold-400 text-gold-400" />
                    ))}
                  </div>
                  <CardTitle className="metallic-gold font-cinzel">{testimonial.name}</CardTitle>
                  <CardDescription className="font-cormorant text-base metallic-gold-subtle">
                    {testimonial.event}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="font-cormorant text-lg italic metallic-gold-subtle">
                    "{testimonial.comment}"
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 royal-gradient">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-cinzel font-bold mb-4 metallic-gold-bright glitter-text">
            Ready to Plan Your Royal Event?
          </h2>
          <p className="text-xl mb-8 font-cormorant metallic-gold-subtle">
            Let us bring your vision to life with our expert planning and royal touch
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" className="bg-gold-500 hover:bg-gold-600 text-maroon-900 font-cormorant font-semibold text-lg px-8 py-6">
                Get Started Today
              </Button>
            </Link>
            <Link to="/gallery">
              <Button size="lg" variant="outline" className="border-gold-400 text-gold-400 hover:bg-gold-400 hover:text-maroon-900 font-cormorant font-semibold text-lg px-8 py-6">
                View Our Portfolio
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
