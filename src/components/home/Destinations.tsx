import { Link } from "react-router-dom";

const destinations = [
  { name: "Colombo", image: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
  { name: "Galle", image: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
  { name: "Kandy", image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
  { name: "Sigiriya", image: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
  { name: "Bentota", image: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
];

const Destinations = () => {
  return (
    <section className="py-16 md:py-24 bg-charcoal border-t border-cream/10">
      <div className="section-container">
        {/* Section Header */}
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-serif font-medium text-cream tracking-wide mb-4">
            DESTINATIONS
          </h2>
          <p className="text-cream/50 text-sm md:text-base max-w-xl leading-relaxed">
            From coastal resorts to hill country retreats, we capture love stories across the most beautiful locations in Sri Lanka.
          </p>
        </div>

        {/* Destinations - Text List with Hover Images */}
        <div className="flex flex-wrap gap-x-8 gap-y-2">
          {destinations.map((destination, index) => (
            <Link
              key={destination.name}
              to="/portfolio"
              className="group relative"
            >
              <span className="text-cream/40 text-sm md:text-base tracking-wider hover:text-cream transition-colors duration-300">
                {destination.name.toUpperCase()}
              </span>
            </Link>
          ))}
        </div>

        {/* View All Link */}
        <Link
          to="/portfolio"
          className="text-cream/60 text-xs tracking-[0.2em] uppercase hover:text-cream transition-colors duration-300 link-underline inline-block mt-8"
        >
          view all
        </Link>
      </div>
    </section>
  );
};

export default Destinations;
