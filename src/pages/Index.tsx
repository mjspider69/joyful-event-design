import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Calendar, Heart, MapPin, Star, Users, Camera, Music, Flower, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
const Index = () => {
  const featuredServices = [{
    icon: Camera,
    title: "Photography",
    description: "Professional event photography to capture every precious moment",
    image: "https://images.unsplash.com/photo-1606800052052-a08af7148866?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  }, {
    icon: MapPin,
    title: "Venues",
    description: "Stunning venues for unforgettable celebrations",
    image: "https://images.unsplash.com/photo-1519167758481-83f29c8ea79d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  }, {
    icon: Users,
    title: "Catering",
    description: "Exquisite cuisine and dining experiences",
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  }, {
    icon: Flower,
    title: "Decoration",
    description: "Beautiful decorations that tell your story",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  }];
  const testimonials = [{
    name: "Priya Sharma",
    event: "Birthday Celebration",
    rating: 5,
    text: "Aaroham made my daughter's birthday absolutely magical! Every detail was perfect.",
    image: "https://images.unsplash.com/photo-1494790108755-2616c9088248?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
  }, {
    name: "Rajesh Kumar",
    event: "Corporate Event",
    rating: 5,
    text: "Professional service and exceptional execution. Our company event was a huge success!",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
  }, {
    name: "Anita Patel",
    event: "Anniversary Celebration",
    rating: 5,
    text: "They transformed our vision into reality. The attention to detail was remarkable!",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
  }];
  return <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-20 pb-12 px-4 royal-gradient min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-[t#] bg-[#5a0202]">
            <div>
              <h1 className="text-4xl md:text-7xl font-bold mb-6 metallic-gold-bright glitter-text font-cinzel leading-tight">
                Create Royal Events That Last Forever
              </h1>
              <p className="text-xl md:text-2xl mb-8 metallic-gold-subtle font-cormorant leading-relaxed">
                India's most trusted event planning platform. We transform your dreams into magnificent celebrations with royal elegance and unmatched sophistication.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/booking">
                  <Button size="lg" className="bg-gold-500 hover:bg-gold-600 text-maroon-900 font-cormorant font-semibold px-8 py-6 text-lg">
                    Start Planning <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/services">
                  <Button size="lg" variant="outline" className="border-gold-400 text-gold-400 hover:bg-gold-400 hover:text-maroon-900 font-cormorant font-semibold px-8 py-6 text-lg">
                    Explore Services
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Elegant Event Setup" className="rounded-lg shadow-2xl border-2 border-gold-400" />
              <div className="absolute -bottom-4 -right-4 bg-gold-500 text-maroon-900 p-4 rounded-lg font-cinzel font-bold">
                <Trophy className="h-6 w-6 mb-2" />
                Award Winning
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-20 px-4 bg-maroon-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 metallic-gold-bright glitter-text font-cinzel">
              Our Royal Services
            </h2>
            <p className="text-xl metallic-gold-subtle font-cormorant max-w-3xl mx-auto">
              From intimate gatherings to grand celebrations, we offer comprehensive event solutions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredServices.map((service, index) => <Card key={index} className="bg-maroon-800 border-gold-600 hover:border-gold-400 hover:shadow-lg hover:shadow-gold-400/20 transition-all overflow-hidden">
                <div className="aspect-square bg-gray-200 overflow-hidden">
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                </div>
                <CardHeader className="text-center">
                  <service.icon className="h-12 w-12 text-gold-400 mx-auto mb-4" />
                  <CardTitle className="text-xl metallic-gold font-cinzel">{service.title}</CardTitle>
                  <CardDescription className="metallic-gold-subtle font-cormorant">
                    {service.description}
                  </CardDescription>
                </CardHeader>
              </Card>)}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/services">
              <Button size="lg" className="bg-gold-500 hover:bg-gold-600 text-maroon-900 font-cormorant font-semibold">
                View All Services <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-maroon-800 to-maroon-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold metallic-gold-bright font-cinzel mb-2">500+</div>
              <div className="metallic-gold-subtle font-cormorant text-lg">Events Completed</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold metallic-gold-bright font-cinzel mb-2">50+</div>
              <div className="metallic-gold-subtle font-cormorant text-lg">Expert Vendors</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold metallic-gold-bright font-cinzel mb-2">25+</div>
              <div className="metallic-gold-subtle font-cormorant text-lg">Cities Covered</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold metallic-gold-bright font-cinzel mb-2">4.9</div>
              <div className="metallic-gold-subtle font-cormorant text-lg">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-maroon-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 metallic-gold-bright glitter-text font-cinzel">
              What Our Clients Say
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => <Card key={index} className="bg-maroon-800 border-gold-600">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full border-2 border-gold-400 mr-4" />
                    <div>
                      <h4 className="font-semibold metallic-gold font-cormorant">{testimonial.name}</h4>
                      <p className="text-sm metallic-gold-subtle font-cormorant">{testimonial.event}</p>
                    </div>
                  </div>
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />)}
                  </div>
                  <p className="metallic-gold-subtle font-cormorant italic">"{testimonial.text}"</p>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 royal-gradient">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 metallic-gold-bright glitter-text font-cinzel">
            Ready to Create Your Royal Event?
          </h2>
          <p className="text-xl mb-8 metallic-gold-subtle font-cormorant">
            Join thousands of satisfied customers who trusted us with their special moments
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/booking">
              <Button size="lg" className="bg-gold-500 hover:bg-gold-600 text-maroon-900 font-cormorant font-semibold px-8 py-6 text-lg">
                Book Your Event <Calendar className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-gold-400 text-gold-400 hover:bg-gold-400 hover:text-maroon-900 font-cormorant font-semibold px-8 py-6 text-lg">
                Get Free Quote
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>;
};
export default Index;