import { Link } from "react-router-dom";
import { Play, ArrowRight } from "lucide-react";

const featuredWorks = [
  {
    id: 1,
    thumbnail:
      "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    coupleName: "Sahan & Nethmi",
    eventType: "Wedding Film",
  },
  {
    id: 2,
    thumbnail:
      "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    coupleName: "Kasun & Dilini",
    eventType: "Pre-Wedding",
  },
  {
    id: 3,
    thumbnail:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    coupleName: "Ravindu & Sachini",
    eventType: "Wedding Film",
  },
  {
    id: 4,
    thumbnail:
      "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    coupleName: "Dinesh & Malsha",
    eventType: "Homecoming",
  },
];

const FeaturedWork = () => {
  return (
    <section className="section-padding bg-charcoal relative overflow-hidden">
      {/* Decorative Line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cream/20 to-transparent" />

      <div className="section-container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-cream/50 text-xs tracking-[0.3em] uppercase font-light mb-4 block">
            Portfolio
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-cream mb-6">
            Stories Through Our Lens
          </h2>
          <p className="text-cream/70 text-lg max-w-2xl mx-auto">
            Let us take you through some of our exclusive pieces of work,
            crafted with love and cinematic precision.
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredWorks.map((work, index) => (
            <Link
              key={work.id}
              to="/portfolio"
              className="group relative aspect-[3/4] overflow-hidden cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Thumbnail */}
              <img
                src={work.thumbnail}
                alt={`${work.coupleName} - ${work.eventType}`}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-transparent opacity-60 group-hover:opacity-90 transition-all duration-500" />

              {/* Play Icon */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                <div className="w-16 h-16 border border-cream/50 flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-500">
                  <Play className="w-6 h-6 text-cream ml-1" />
                </div>
              </div>

              {/* Info */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="text-xs font-medium text-cream/60 uppercase tracking-[0.15em] mb-2 block">
                  {work.eventType}
                </span>
                <h3 className="text-lg font-serif font-medium text-cream">
                  {work.coupleName}
                </h3>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-12">
          <Link
            to="/portfolio"
            className="group inline-flex items-center gap-3 bg-transparent text-cream px-8 py-4 text-sm tracking-widest uppercase font-medium transition-all duration-500 hover:bg-cream hover:text-charcoal border border-cream/30 hover:border-cream"
          >
            View Full Portfolio
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedWork;
