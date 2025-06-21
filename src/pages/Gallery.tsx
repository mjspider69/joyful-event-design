
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const Gallery = () => {
  const galleryImages = [
    {
      url: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Elegant Wedding Ceremony",
      category: "Ceremony"
    },
    {
      url: "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Beautiful Bridal Portrait",
      category: "Portrait"
    },
    {
      url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Reception Celebration",
      category: "Reception"
    },
    {
      url: "https://images.unsplash.com/photo-1606800052052-a08af7148866?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Wedding Photography",
      category: "Photography"
    },
    {
      url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Outdoor Wedding Setup",
      category: "Decoration"
    },
    {
      url: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Wedding Cake",
      category: "Details"
    },
    {
      url: "https://images.unsplash.com/photo-1519167758481-83f29c8ea79d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Luxury Venue",
      category: "Venue"
    },
    {
      url: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Wedding Planning",
      category: "Planning"
    },
    {
      url: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Bridal Makeup",
      category: "Makeup"
    }
  ];

  const categories = ["All", "Ceremony", "Reception", "Portrait", "Decoration", "Details", "Venue"];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Wedding Gallery
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get inspired by beautiful wedding moments captured by our professional photographers. 
            Browse through stunning ceremonies, receptions, and intimate moments.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 px-4 border-b">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Button 
                key={category}
                variant={category === "All" ? "default" : "outline"}
                className={category === "All" ? "bg-pink-500 hover:bg-pink-600" : ""}
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
                className="group relative aspect-square overflow-hidden rounded-lg bg-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <img 
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="font-semibold">{image.title}</h3>
                    <p className="text-sm opacity-90">{image.category}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Photos
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-pink-500 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Want Your Wedding Featured?</h2>
          <p className="text-xl mb-8">
            Share your beautiful wedding moments with us and inspire other couples
          </p>
          <Button size="lg" variant="secondary" className="px-8 py-6 text-lg">
            Submit Your Photos
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Gallery;
