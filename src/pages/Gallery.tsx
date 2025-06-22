import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

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

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 bg-gradient-to-br from-maroon-900 to-maroon-950">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 metallic-gold-bright glitter-text font-cinzel">
            Event Gallery
          </h1>
          <p className="text-xl max-w-3xl mx-auto metallic-gold-subtle font-cormorant">
            Get inspired by beautiful event moments captured by our professional photographers. 
            Browse through stunning corporate events, celebrations, and memorable occasions.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 px-4 border-b border-gold-600 bg-maroon-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Button 
                key={category}
                variant={category === "All" ? "default" : "outline"}
                className={category === "All" ? 
                  "bg-gold-500 hover:bg-gold-600 text-maroon-900 font-cormorant font-semibold" : 
                  "border-gold-400 text-gold-400 hover:bg-gold-400 hover:text-maroon-900 font-cormorant"
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 px-4 bg-maroon-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <div 
                key={index}
                className="group relative aspect-square overflow-hidden rounded-lg bg-gray-100 hover:shadow-xl hover:shadow-gold-400/20 transition-all duration-300"
              >
                <img 
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="font-semibold metallic-gold font-cinzel">{image.title}</h3>
                    <p className="text-sm metallic-gold-subtle font-cormorant">{image.category}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="border-gold-400 text-gold-400 hover:bg-gold-400 hover:text-maroon-900 font-cormorant">
              Load More Photos
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 royal-gradient">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4 metallic-gold-bright glitter-text font-cinzel">Want Your Event Featured?</h2>
          <p className="text-xl mb-8 metallic-gold-subtle font-cormorant">
            Share your beautiful event moments with us and inspire other clients
          </p>
          <Button size="lg" className="bg-gold-500 hover:bg-gold-600 text-maroon-900 font-cormorant font-semibold px-8 py-6 text-lg">
            Submit Your Photos
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Gallery;
