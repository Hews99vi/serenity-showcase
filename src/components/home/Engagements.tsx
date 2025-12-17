import { Link } from "react-router-dom";

const engagementFilms = [
  {
    id: 1,
    thumbnail: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    coupleName: "Priya & Ashan",
  },
  {
    id: 2,
    thumbnail: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    coupleName: "Kavindi & Nuwan",
  },
  {
    id: 3,
    thumbnail: "https://images.unsplash.com/photo-1529636798458-92182e662485?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    coupleName: "Sanduni & Lakmal",
  },
];

const Engagements = () => {
  return (
    <section className="py-16 md:py-24 bg-charcoal border-t border-cream/10">
      <div className="section-container">
        {/* Section Header */}
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-serif text-cream tracking-wider mb-4">
            ENGAGEMENTS
          </h2>
          <p className="text-cream/50 text-sm md:text-base max-w-xl leading-relaxed mb-6">
            A fun and emotional way to share the exciting news with friends and family. Allow Serenity Films to unleash our full creativity to create your unique film designed around your personalities.
          </p>
          <Link
            to="/portfolio"
            className="text-cream/60 text-xs tracking-[0.2em] uppercase hover:text-cream transition-colors duration-300 link-underline inline-block"
          >
            view all
          </Link>
        </div>

        {/* Engagement Films */}
        <div className="grid grid-cols-3 gap-3 md:gap-4">
          {engagementFilms.map((film) => (
            <Link
              key={film.id}
              to="/portfolio"
              className="group relative aspect-square overflow-hidden"
            >
              <img
                src={film.thumbnail}
                alt={film.coupleName}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-charcoal/40 group-hover:bg-charcoal/20 transition-colors duration-500" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="text-cream text-sm tracking-wider">{film.coupleName}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Engagements;
