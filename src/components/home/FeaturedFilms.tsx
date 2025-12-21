import { Link } from "react-router-dom";
import { Play } from "lucide-react";

const featuredFilms = [
  {
    id: 1,
    thumbnail: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    coupleName: "SAHAN & NETHMI",
    venue: "Cinnamon Grand Colombo",
    youtubeId: "co_WYnhlhi0",
    featured: true
  },
  {
    id: 2,
    thumbnail: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    coupleName: "KASUN & DILINI",
    venue: "Galle Face Hotel",
    youtubeId: "dQw4w9WgXcQ"
  },
  {
    id: 3,
    thumbnail: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    coupleName: "RAVINDU & SACHINI",
    venue: "Shangri-La Colombo",
    youtubeId: "jNQXAC9IVRw"
  }
];

const FeaturedFilms = () => {
  return (
    <section className="py-20 md:py-32 bg-charcoal relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 border border-cream/20 rotate-45" />
        <div className="absolute bottom-20 right-10 w-96 h-96 border border-cream/20 -rotate-12" />
      </div>

      <div className="section-container relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-gold/80 text-xs tracking-[0.3em] uppercase mb-3 block">
              Cinematic Stories
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-cream tracking-wider uppercase">
              OUR WORK
            </h2>
          </div>
          <Link 
            to="/portfolio" 
            className="text-cream/60 text-xs tracking-[0.2em] uppercase hover:text-cream transition-colors duration-300 link-underline self-start md:self-auto"
          >
            view all films
          </Link>
        </div>

        {/* Featured Film - Large */}
        <div className="mb-8">
          <div className="group relative">
            <div className="relative aspect-video overflow-hidden rounded-sm bg-charcoal-light">
              {featuredFilms[0].youtubeId ? (
                <iframe
                  src={`https://www.youtube.com/embed/${featuredFilms[0].youtubeId}?autoplay=1&mute=1&loop=1&playlist=${featuredFilms[0].youtubeId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1`}
                  className="absolute inset-0 w-full h-full object-cover scale-105"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  title={featuredFilms[0].coupleName}
                  style={{ border: 'none', pointerEvents: 'none' }}
                />
              ) : (
                <img
                  src={featuredFilms[0].thumbnail}
                  alt={featuredFilms[0].coupleName}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              )}

              {/* Cinematic letterbox effect */}
              <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-charcoal to-transparent" />
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-charcoal via-charcoal/80 to-transparent" />

              {/* Film grain overlay */}
              <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22 opacity=%220.03%22/%3E%3C/svg%3E')] pointer-events-none" />

              {/* Elegant border */}
              <div className="absolute inset-2 border border-cream/10 pointer-events-none rounded-sm group-hover:border-gold/30 transition-colors duration-500" />

              {/* Content overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                <div className="flex items-end justify-between">
                  <div>
                    <span className="text-gold/60 text-[10px] md:text-xs tracking-[0.2em] uppercase block mb-2">
                      Featured Film
                    </span>
                    <h3 className="text-cream font-serif text-xl md:text-3xl tracking-wider mb-1">
                      {featuredFilms[0].coupleName}
                    </h3>
                    <p className="text-cream/50 text-xs md:text-sm tracking-wider">
                      {featuredFilms[0].venue}
                    </p>
                  </div>
                  <Link 
                    to="/portfolio" 
                    className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-cream/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-gold/20 transition-all duration-300 group-hover:scale-110"
                  >
                    <Play className="w-5 h-5 md:w-6 md:h-6 text-cream ml-1" fill="currentColor" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Two smaller films */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {featuredFilms.slice(1, 3).map((film, index) => (
            <div key={film.id} className="group relative">
              <div className="relative aspect-video overflow-hidden rounded-sm bg-charcoal-light">
                {film.youtubeId ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${film.youtubeId}?autoplay=1&mute=1&loop=1&playlist=${film.youtubeId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1`}
                    className="absolute inset-0 w-full h-full object-cover scale-105"
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

                {/* Cinematic gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent opacity-90" />

                {/* Film number */}
                <div className="absolute top-4 left-4">
                  <span className="text-cream/20 font-serif text-4xl md:text-5xl">
                    0{index + 2}
                  </span>
                </div>

                {/* Elegant border */}
                <div className="absolute inset-2 border border-cream/10 pointer-events-none rounded-sm group-hover:border-gold/30 transition-colors duration-500" />

                {/* Content overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                  <div className="flex items-end justify-between">
                    <div>
                      <h3 className="text-cream font-serif text-lg md:text-xl tracking-wider mb-1">
                        {film.coupleName}
                      </h3>
                      <p className="text-cream/50 text-xs tracking-wider">
                        {film.venue}
                      </p>
                    </div>
                    <Link 
                      to="/portfolio" 
                      className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-cream/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:bg-gold/20"
                    >
                      <Play className="w-4 h-4 md:w-5 md:h-5 text-cream ml-0.5" fill="currentColor" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom decorative line */}
        <div className="mt-16 flex items-center justify-center gap-4">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-cream/20" />
          <span className="text-cream/30 text-[10px] tracking-[0.3em] uppercase">
            Serenity Films
          </span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-cream/20" />
        </div>
      </div>
    </section>
  );
};

export default FeaturedFilms;
