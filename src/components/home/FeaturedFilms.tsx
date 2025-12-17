import { Link } from "react-router-dom";

const featuredFilms = [
  {
    id: 1,
    thumbnail: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    coupleName: "SAHAN & NETHMI",
    venue: "Cinnamon Grand Colombo",
    youtubeId: "co_WYnhlhi0",
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
  {
    id: 6,
    thumbnail: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    coupleName: "NUWAN & ISHARA",
    venue: "Jetwing Lighthouse",
  },
];

const FeaturedFilms = () => {
  return (
    <section className="py-16 md:py-24 bg-charcoal">
      <div className="section-container">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl md:text-3xl font-serif text-cream tracking-wider uppercase">
            Our Picks
          </h2>
          <Link
            to="/portfolio"
            className="text-cream/60 text-xs tracking-[0.2em] uppercase hover:text-cream transition-colors duration-300 link-underline"
          >
            view all
          </Link>
        </div>

        {/* Films Grid - 3x2 Instagram Reels Style */}
        <div className="grid grid-cols-3 gap-3 md:gap-4">
          {featuredFilms.slice(0, 6).map((film) => (
            <div key={film.id} className="group">
              {/* Poster Card - Instagram Reels Aspect Ratio */}
              <div className="relative aspect-[9/16] overflow-hidden bg-charcoal-light rounded-sm">
                {film.youtubeId ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${film.youtubeId}?autoplay=1&mute=1&loop=1&playlist=${film.youtubeId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1`}
                    className="absolute inset-0 w-full h-full object-cover"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    title={film.coupleName}
                    style={{ border: 'none', pointerEvents: 'none' }}
                  />
                ) : (
                  <img
                    src={film.thumbnail}
                    alt={film.coupleName}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                )}
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-transparent opacity-90 pointer-events-none" />
                
                {/* Film border effect */}
                <div className="absolute inset-[3px] border border-cream/10 pointer-events-none rounded-sm group-hover:border-cream/25 transition-colors duration-500" />
                

                {/* Top Badge */}
                <div className="absolute top-3 left-0 right-0 flex justify-center pointer-events-none">
                  <span className="text-cream/40 text-[8px] md:text-[10px] tracking-[0.2em] uppercase">
                    Serenity Films
                  </span>
                </div>

                {/* Play icon overlay - only for non-video items */}
                {!film.youtubeId && (
                  <Link to="/portfolio" className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-cream/20 backdrop-blur-sm flex items-center justify-center">
                      <div className="w-0 h-0 border-l-[12px] border-l-cream border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1" />
                    </div>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedFilms;
