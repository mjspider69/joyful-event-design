
import Navbar from "@/components/Navbar";
import ModernFooter from "@/components/ModernFooter";
import { Button } from "@/components/ui/button";
import { Star, Camera, Filter } from "lucide-react";

const Gallery = () => {
  const galleryImages = [
    {
      url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Corporate Event Setup",
      category: "Corporate"
    },
    {
      url: "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Birthday Party Celebration",
      category: "Birthday"
    },
    {
      url: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Event Planning Session",
      category: "Planning"
    },
    {
      url: "https://images.unsplash.com/photo-1606800052052-a08af7148866?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Event Photography",
      category: "Photography"
    },
    {
      url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Outdoor Event Setup",
      category: "Decoration"
    },
    {
      url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Conference Event",
      category: "Conference"
    },
    {
      url: "https://images.unsplash.com/photo-1519167758481-83f29c8ea79d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Luxury Venue",
      category: "Venue"
    },
    {
      url: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Event Planning",
      category: "Planning"
    },
    {
      url: "https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Catering Service",
      category: "Catering"
    }
  ];

  const categories = ["All", "Corporate", "Birthday", "Conference", "Decoration", "Catering", "Venue"];

  const getCategoryColor = (category: string, isActive = false) => {
    if (isActive) return "bg-coral-500 text-white border-coral-500";
    return "border-2 border-charcoal-300 text-charcoal-700 hover:bg-charcoal-100";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 to-brand-100">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 bg-gradient-to-br from-charcoal-900 to-charcoal-800">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 bg-sage-500 rounded-full px-8 py-3 mb-8">
            <Camera className="h-5 w-5 text-white" />
            <span className="text-white font-bold text-base">Event Gallery</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-playfair font-bold mb-6 text-white">
            Event Gallery
          </h1>
          <p className="text-xl max-w-3xl mx-auto text-gray-300 leading-relaxed">
            Get inspired by beautiful event moments captured by our professional photographers. 
            Browse through stunning corporate events, celebrations, and memorable occasions.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 px-4 bg-white border-b border-brand-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Filter className="h-5 w-5 text-charcoal-600" />
            <span className="text-charcoal-800 font-semibold text-lg">Filter by Category:</span>
          </div>
          <div className="flex flex-wrap gap-4">
            {categories.map((category) => (
              <Button 
                key={category}
                className={`${getCategoryColor(category, category === "All")} font-semibold px-6 py-3 rounded-full transition-all duration-300`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <div 
                key={index}
                className="group relative aspect-square overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                <img 
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4">
                      <h3 className="font-bold text-charcoal-900 text-lg mb-1">{image.title}</h3>
                      <div className="inline-flex items-center gap-2 bg-coral-100 text-coral-700 px-3 py-1 rounded-full text-sm font-semibold">
                        <Star className="h-3 w-3 fill-current" />
                        {image.category}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button size="lg" className="btn-secondary font-bold px-10 py-4 text-lg rounded-full">
              Load More Photos
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-coral-100 to-sage-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-playfair font-bold mb-4 text-charcoal-900">Want Your Event Featured?</h2>
          <p className="text-xl mb-8 text-charcoal-700 leading-relaxed">
            Share your beautiful event moments with us and inspire other clients
          </p>
          <Button size="lg" className="btn-primary font-bold px-10 py-6 text-lg rounded-full">
            Submit Your Photos
          </Button>
        </div>
      </section>

      <ModernFooter />
    </div>
  );
};

export default Gallery;
