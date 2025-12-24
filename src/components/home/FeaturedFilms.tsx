import { motion } from "framer-motion";
import { Play, Sparkles } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
const films = [{
  id: 1,
  title: "Eternal Moments",
  subtitle: "A Love Story",
  youtubeId: "d4EVqmeHXLM",
  thumbnail: `https://img.youtube.com/vi/d4EVqmeHXLM/maxresdefault.jpg`
}, {
  id: 2,
  title: "Golden Hours",
  subtitle: "Captured Forever",
  youtubeId: "0TvxJPETd-8",
  thumbnail: `https://img.youtube.com/vi/0TvxJPETd-8/maxresdefault.jpg`
}, {
  id: 3,
  title: "Timeless Vows",
  subtitle: "Your Perfect Day",
  youtubeId: "Jh254MxhU3g",
  thumbnail: `https://img.youtube.com/vi/Jh254MxhU3g/maxresdefault.jpg`
}];
const FeaturedFilms = () => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const openVideo = (youtubeId: string) => {
    setActiveVideo(youtubeId);
  };
  const closeVideo = () => {
    setActiveVideo(null);
  };
  return <section id="featured" className="relative py-24 md:py-32 overflow-hidden bg-charcoal">
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        
        
        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/5 rounded-full blur-3xl" />
      </div>

      <div className="section-container relative z-10">
        {/* Section Header */}
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.8
      }} className="text-center mb-16 md:mb-20">
          <motion.span className="inline-block text-gold font-medium tracking-[0.3em] uppercase text-xs md:text-sm mb-4" initial={{
          opacity: 0,
          letterSpacing: "0.5em"
        }} whileInView={{
          opacity: 1,
          letterSpacing: "0.3em"
        }} viewport={{
          once: true
        }} transition={{
          duration: 1,
          delay: 0.2
        }}>
            Cinematic Stories
          </motion.span>
          <h2 className="font-serif text-4xl md:text-6xl text-cream mb-6 tracking-wide lg:text-6xl">
            Our Work
          </h2>
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="w-12 md:w-20 h-px bg-gradient-to-r from-transparent to-gold/60" />
            <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-gold" />
            <span className="w-12 md:w-20 h-px bg-gradient-to-l from-transparent to-gold/60" />
          </div>
          <p className="text-cream/60 max-w-2xl mx-auto text-base md:text-lg leading-relaxed px-4">
            Every love story is unique. We capture the emotions, the laughter, 
            and the tears that make your day unforgettable.
          </p>
        </motion.div>

        {/* Featured Hero Video */}
        <motion.div initial={{
        opacity: 0,
        scale: 0.95
      }} whileInView={{
        opacity: 1,
        scale: 1
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.8,
        delay: 0.2
      }} className="mb-6 md:mb-8">
          <div className="relative group cursor-pointer overflow-hidden rounded-lg md:rounded-2xl" onClick={() => openVideo(films[0].youtubeId)} onMouseEnter={() => setHoveredId(films[0].id)} onMouseLeave={() => setHoveredId(null)}>
            {/* Main image container */}
            <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden">
              <iframe 
                src={`https://www.youtube.com/embed/${films[0].youtubeId}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=${films[0].youtubeId}`} 
                className="w-full h-full object-cover scale-[1.2]" 
                allow="autoplay; encrypted-media" 
                allowFullScreen 
              />
              
              {/* Gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/30 to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-charcoal/50 via-transparent to-charcoal/50 pointer-events-none" />
              
              {/* Content overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 lg:p-12">
                <motion.div initial={{
                opacity: 0,
                y: 20
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                duration: 0.5
              }}>
                  <h3 className="font-serif text-2xl md:text-4xl lg:text-5xl text-cream mb-2">{films[0].title}</h3>
                  <p className="text-cream/60 text-sm md:text-lg">{films[0].subtitle}</p>
                </motion.div>
              </div>
              
              {/* Corner decorations */}
              <div className="absolute top-4 left-4 md:top-6 md:left-6 w-8 h-8 md:w-16 md:h-16 border-l-2 border-t-2 border-gold/40 rounded-tl-lg" />
              <div className="absolute top-4 right-4 md:top-6 md:right-6 w-8 h-8 md:w-16 md:h-16 border-r-2 border-t-2 border-gold/40 rounded-tr-lg" />
              <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 w-8 h-8 md:w-16 md:h-16 border-l-2 border-b-2 border-gold/40 rounded-bl-lg" />
              <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 w-8 h-8 md:w-16 md:h-16 border-r-2 border-b-2 border-gold/40 rounded-br-lg" />
              
              {/* Hover border glow */}
              <motion.div className="absolute inset-0 rounded-lg md:rounded-2xl border-2 border-gold/0" animate={{
              borderColor: hoveredId === films[0].id ? "rgba(212, 175, 55, 0.5)" : "rgba(212, 175, 55, 0)"
            }} transition={{
              duration: 0.3
            }} />
            </div>
          </div>
        </motion.div>

        {/* Two smaller videos grid */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-8">
          {films.slice(1).map((film, index) => <motion.div key={film.id} initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6,
          delay: 0.3 + index * 0.15
        }}>
              <div className="relative group cursor-pointer overflow-hidden rounded-lg md:rounded-xl" onClick={() => openVideo(film.youtubeId)} onMouseEnter={() => setHoveredId(film.id)} onMouseLeave={() => setHoveredId(null)}>
                <div className="relative aspect-video overflow-hidden">
                  {hoveredId === film.id ? <iframe src={`https://www.youtube.com/embed/${film.youtubeId}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=${film.youtubeId}`} className="w-full h-full object-cover scale-[1.2]" allow="autoplay; encrypted-media" allowFullScreen /> : <motion.img src={film.thumbnail} alt={film.title} className="w-full h-full object-cover" initial={{
                scale: 1
              }} transition={{
                duration: 0.7
              }} />}
                  
                  {/* Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/30 to-transparent" />
                  <motion.div className="absolute inset-0 bg-gold/5" initial={{
                opacity: 0
              }} animate={{
                opacity: hoveredId === film.id ? 1 : 0
              }} transition={{
                duration: 0.3
              }} />
                  
                  {/* Shine effect */}
                  <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12" initial={{
                x: "-100%"
              }} animate={{
                x: hoveredId === film.id ? "200%" : "-100%"
              }} transition={{
                duration: 0.6
              }} />
                  
                  
                  {/* Play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div className="relative" initial={{
                  scale: 0.8,
                  opacity: 0.7
                }} animate={{
                  scale: hoveredId === film.id ? 1 : 0.8,
                  opacity: hoveredId === film.id ? 1 : 0.7
                }} transition={{
                  duration: 0.3
                }} whileHover={{
                  scale: 1.1
                }}>
                      <motion.div className="absolute inset-0 bg-gold/20 rounded-full" animate={{
                    scale: hoveredId === film.id ? [1, 1.4, 1] : 1,
                    opacity: hoveredId === film.id ? [0.5, 0, 0.5] : 0
                  }} transition={{
                    duration: 1.5,
                    repeat: Infinity
                  }} />
                      <div className="relative w-14 h-14 md:w-18 md:h-18 bg-gold/80 backdrop-blur-sm rounded-full flex items-center justify-center border border-cream/20">
                        <Play className="w-6 h-6 md:w-8 md:h-8 text-charcoal ml-0.5" fill="currentColor" />
                      </div>
                    </motion.div>
                  </div>
                  
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                    <motion.div initial={{
                  y: 10
                }} animate={{
                  y: hoveredId === film.id ? 0 : 5
                }} transition={{
                  duration: 0.3
                }}>
                      <h3 className="font-serif text-xl md:text-2xl text-cream mb-1">{film.title}</h3>
                      <p className="text-cream/50 text-xs md:text-sm">{film.subtitle}</p>
                    </motion.div>
                  </div>
                  
                  {/* Hover border effect */}
                  <motion.div className="absolute inset-0 border-2 border-gold/0 rounded-lg md:rounded-xl" animate={{
                borderColor: hoveredId === film.id ? "rgba(212, 175, 55, 0.4)" : "rgba(212, 175, 55, 0)"
              }} transition={{
                duration: 0.3
              }} />
                </div>
              </div>
            </motion.div>)}
        </div>

        {/* View all work button */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.6,
        delay: 0.5
      }} className="text-center mt-12 md:mt-16">
          <Link to="/portfolio" className="group inline-flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 bg-transparent border-2 border-gold/40 rounded-full text-cream font-medium hover:bg-gold hover:border-gold hover:text-charcoal transition-all duration-300">
            <span className="text-sm md:text-base tracking-wide">Explore Our Works</span>
            <motion.span className="inline-block" animate={{
            x: [0, 5, 0]
          }} transition={{
            duration: 1.5,
            repeat: Infinity
          }}>
              →
            </motion.span>
          </Link>
        </motion.div>

        {/* Bottom decorative line */}
        <div className="mt-16 flex items-center justify-center gap-4">
          <div className="h-px w-12 md:w-20 bg-gradient-to-r from-transparent to-cream/20" />
          <span className="text-cream/30 text-[10px] tracking-[0.3em] uppercase">SERENITY WEDDING FILMS</span>
          <div className="h-px w-12 md:w-20 bg-gradient-to-l from-transparent to-cream/20" />
        </div>
      </div>

      {/* Video Modal */}
      {activeVideo && <motion.div initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} exit={{
      opacity: 0
    }} className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/98 backdrop-blur-md p-4" onClick={closeVideo}>
          <motion.div initial={{
        scale: 0.9,
        opacity: 0
      }} animate={{
        scale: 1,
        opacity: 1
      }} exit={{
        scale: 0.9,
        opacity: 0
      }} transition={{
        type: "spring",
        duration: 0.5
      }} className="relative w-full max-w-6xl aspect-video" onClick={e => e.stopPropagation()}>
            {/* Close button */}
            <button onClick={closeVideo} className="absolute -top-12 right-0 text-cream/70 hover:text-cream transition-colors text-sm md:text-lg flex items-center gap-2 group">
              <span className="group-hover:underline">Close</span>
              <span className="text-xl md:text-2xl">×</span>
            </button>
            
            {/* Video frame with decoration */}
            <div className="relative w-full h-full">
              <div className="absolute -inset-2 md:-inset-4 border border-gold/20 rounded-lg" />
              <iframe src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1&rel=0`} title="Wedding Film" className="w-full h-full rounded-lg shadow-2xl shadow-gold/10" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
            </div>
          </motion.div>
        </motion.div>}
    </section>;
};
export default FeaturedFilms;