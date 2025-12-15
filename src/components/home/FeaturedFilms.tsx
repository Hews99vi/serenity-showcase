import { Link } from "react-router-dom";

const featuredFilms = [
  {
    id: 1,
    thumbnail: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    coupleName: "SAHAN & NETHMI",
    venue: "Cinnamon Grand Colombo",
  },
  {
    id: 2,
    thumbnail: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    coupleName: "KASUN & DILINI",
    venue: "Galle Face Hotel",
  },
  {
    id: 3,
    thumbnail: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    coupleName: "RAVINDU & SACHINI",
    venue: "Shangri-La Colombo",
  },
  {
    id: 4,
    thumbnail: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    coupleName: "DINESH & MALSHA",
    venue: "Anantara Kalutara",
  },
  {
    id: 5,
    thumbnail: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    coupleName: "THARINDU & NIMALI",
    venue: "Heritance Kandalama",
  },
];

const FeaturedFilms = () => {
  return (
    <section className="py-16 md:py-24 bg-charcoal">
      <div className="section-container">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl md:text-3xl font-serif font-medium text-cream tracking-wide">
            OUR PICKS
          </h2>
          <Link
            to="/portfolio"
            className="text-cream/60 text-xs tracking-[0.2em] uppercase hover:text-cream transition-colors duration-300 link-underline"
          >
            view all
          </Link>
        </div>

        {/* Films Grid - Horizontal Scroll */}
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6 scrollbar-hide">
          {featuredFilms.map((film) => (
            <Link
              key={film.id}
              to="/portfolio"
              className="group flex-shrink-0 w-[220px] md:w-[260px]"
            >
              {/* Poster Card */}
              <div className="relative aspect-[2/3] overflow-hidden bg-charcoal-light">
                <img
                  src={film.thumbnail}
                  alt={film.coupleName}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent opacity-80" />
                
                {/* Film border effect */}
                <div className="absolute inset-2 border border-cream/10 pointer-events-none" />
                
                {/* Couple Names - Movie Poster Style */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-cream text-center font-serif text-lg tracking-wider leading-tight">
                    {film.coupleName.split(" & ")[0]}
                    <span className="block text-cream/60 text-sm font-light my-1">&</span>
                    {film.coupleName.split(" & ")[1]}
                  </h3>
                </div>

                {/* Top Badge */}
                <div className="absolute top-4 left-0 right-0 flex justify-center">
                  <span className="text-cream/40 text-[10px] tracking-[0.3em] uppercase">
                    Serenity Films
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedFilms;
