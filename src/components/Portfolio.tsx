import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { Play, X, Film, MapPin, Heart, Sparkles } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
interface VideoItem {
  id: string;
  youtubeId: string;
  caption: string;
  category: "destination" | "cultural" | "engagement";
  location?: string;
  couple?: string;
}
const videos: VideoItem[] = [{
  id: "1",
  youtubeId: "gINkgjJelU4",
  caption: "A quiet moment by the sea. A story told through soft light and raw emotion.",
  category: "destination",
  location: "Maldives",
  couple: "Sarah & James"
}, {
  id: "2",
  youtubeId: "0TvxJPETd-8",
  caption: "A celebration filled with colour, culture, and heartfelt connections.",
  category: "cultural",
  location: "Kandy",
  couple: "Nimali & Ruwan"
}, {
  id: "3",
  youtubeId: "YaZWNpmYuYo",
  caption: "Two souls finding forever in a moment of pure joy.",
  category: "engagement",
  location: "Colombo",
  couple: "Tharushi & Ashan"
}, {
  id: "4",
  youtubeId: "BPPlu0aNgb0",
  caption: "Where tradition meets timeless love, beautifully captured.",
  category: "cultural",
  location: "Galle",
  couple: "Kavindi & Dinesh"
}];
const categories = [{
  id: "destination",
  title: "Destination Weddings",
  subtitle: "Love Across Borders",
  description: "Exotic locations, breathtaking vistas, and unforgettable celebrations",
  icon: MapPin,
  image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80"
}, {
  id: "cultural",
  title: "Classic Sri Lankan Cultural Weddings",
  subtitle: "Timeless Traditions",
  description: "Rich heritage, sacred rituals, and the beauty of our culture",
  icon: Sparkles,
  image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80"
}, {
  id: "engagement",
  title: "Engagement & Pre-Wedding Stories",
  subtitle: "The Beginning",
  description: "Capturing the magic of your journey before the big day",
  icon: Heart,
  image: "https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=800&q=80"
}];
type CategoryType = "all" | "destination" | "cultural" | "engagement";
const VideoCard = ({
  video,
  index,
  onPlay
}: {
  video: VideoItem;
  index: number;
  onPlay: (youtubeId: string) => void;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px"
  });
  const [isHovered, setIsHovered] = useState(false);
  return <motion.div ref={ref} initial={{
    opacity: 0,
    y: 60
  }} animate={isInView ? {
    opacity: 1,
    y: 0
  } : {
    opacity: 0,
    y: 60
  }} transition={{
    duration: 0.8,
    delay: index * 0.15,
    ease: [0.25, 0.46, 0.45, 0.94]
  }} className="group relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div className="relative aspect-video overflow-hidden cursor-pointer bg-charcoal" onClick={() => onPlay(video.youtubeId)}>
        <img src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`} alt="Wedding film thumbnail" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
        
        {/* Location badge */}
        {video.location && <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-charcoal/80 backdrop-blur-sm border border-cream/20">
            <MapPin className="w-3 h-3 text-cream/70" />
            <span className="text-cream/90 text-xs tracking-wide">{video.location}</span>
          </div>}

        <motion.div className="absolute inset-0 flex items-center justify-center" initial={false} animate={{
        scale: isHovered ? 1.1 : 1
      }} transition={{
        duration: 0.3
      }}>
          <div className="relative">
            <motion.div className="absolute inset-0 rounded-full border-2 border-cream/40" animate={{
            scale: isHovered ? [1, 1.4, 1.4] : 1,
            opacity: isHovered ? [0.6, 0, 0] : 0.6
          }} transition={{
            duration: 1.5,
            repeat: isHovered ? Infinity : 0,
            ease: "easeOut"
          }} style={{
            width: 80,
            height: 80,
            marginLeft: -40,
            marginTop: -40,
            left: '50%',
            top: '50%',
            position: 'absolute'
          }} />
            <div className="w-20 h-20 rounded-full bg-cream/20 backdrop-blur-sm border border-cream/40 flex items-center justify-center group-hover:bg-cream/30 transition-all duration-300">
              <Play className="w-8 h-8 text-cream fill-cream ml-1" />
            </div>
          </div>
        </motion.div>

        <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
      }} />
      </div>

      <motion.div className="mt-6 px-2" initial={{
      opacity: 0
    }} animate={isInView ? {
      opacity: 1
    } : {
      opacity: 0
    }} transition={{
      duration: 0.6,
      delay: index * 0.15 + 0.4
    }}>
        {video.couple && <p className="text-cream/90 font-serif text-lg mb-2">{video.couple}</p>}
        <p className="text-cream/60 text-sm italic leading-relaxed font-light tracking-wide">
          "{video.caption}"
        </p>
      </motion.div>
    </motion.div>;
};
const CategoryCard = ({
  category,
  index,
  isActive,
  onClick
}: {
  category: typeof categories[0];
  index: number;
  isActive: boolean;
  onClick: () => void;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-50px"
  });
  return <motion.div ref={ref} initial={{
    opacity: 0,
    y: 40
  }} animate={isInView ? {
    opacity: 1,
    y: 0
  } : {
    opacity: 0,
    y: 40
  }} transition={{
    duration: 0.8,
    delay: index * 0.2
  }} onClick={onClick} className={`group relative cursor-pointer overflow-hidden ${isActive ? "ring-2 ring-cream/60" : ""}`}>
      {/* Background Image */}
      <div className="absolute inset-0">
        <img src={category.image} alt={category.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className={`absolute inset-0 transition-all duration-500 ${isActive ? "bg-gradient-to-t from-charcoal/95 via-charcoal/80 to-charcoal/60" : "bg-gradient-to-t from-charcoal/90 via-charcoal/70 to-charcoal/40 group-hover:from-charcoal/95 group-hover:via-charcoal/75"}`} />
      </div>

      {/* Content */}
      <div className="relative z-10 p-6 md:p-8 h-full flex flex-col justify-end min-h-[280px] md:min-h-[320px]">
        {/* Icon */}
        <motion.div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 transition-all duration-300 ${isActive ? "bg-cream/20" : "bg-cream/10 group-hover:bg-cream/20"}`} whileHover={{
        scale: 1.1
      }}>
          <category.icon className={`w-5 h-5 transition-colors duration-300 ${isActive ? "text-cream" : "text-cream/70 group-hover:text-cream"}`} />
        </motion.div>

        {/* Subtitle */}
        <p className="text-cream/50 text-xs tracking-[0.2em] uppercase mb-2">
          {category.subtitle}
        </p>

        {/* Title */}
        <h3 className={`font-serif text-xl md:text-2xl mb-3 transition-colors duration-300 ${isActive ? "text-cream" : "text-cream/90 group-hover:text-cream"}`}>
          {category.title}
        </h3>

        {/* Description */}
        <p className="text-cream/50 text-sm font-light leading-relaxed">
          {category.description}
        </p>

        {/* Active indicator */}
        <motion.div className="absolute bottom-0 left-0 h-1 bg-cream/60" initial={{
        width: 0
      }} animate={{
        width: isActive ? "100%" : 0
      }} transition={{
        duration: 0.4
      }} />

        {/* Corner accent */}
        <div className={`absolute top-4 right-4 w-8 h-8 border-t border-r transition-all duration-300 ${isActive ? "border-cream/40" : "border-cream/20 group-hover:border-cream/40"}`} />
      </div>
    </motion.div>;
};
const Portfolio = () => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<CategoryType>("all");
  const heroRef = useRef(null);
  const introRef = useRef(null);
  const galleryRef = useRef(null);
  const isHeroInView = useInView(heroRef, {
    once: true
  });
  const isIntroInView = useInView(introRef, {
    once: true,
    margin: "-100px"
  });
  const openVideo = (youtubeId: string) => setActiveVideo(youtubeId);
  const closeVideo = () => setActiveVideo(null);
  const filteredVideos = activeCategory === "all" ? videos : videos.filter(v => v.category === activeCategory);
  const scrollToGallery = () => {
    galleryRef.current?.scrollIntoView({
      behavior: "smooth"
    });
  };
  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId as CategoryType);
    setTimeout(() => scrollToGallery(), 100);
  };
  return <div className="bg-charcoal min-h-screen">
      {/* Hero + Intro Section - Full Viewport */}
      <section ref={heroRef} className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden pt-20">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--cream)) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
        </div>

        {/* Decorative Lines */}
        <motion.div initial={{
        scaleX: 0
      }} animate={isHeroInView ? {
        scaleX: 1
      } : {
        scaleX: 0
      }} transition={{
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94]
      }} className="absolute top-32 left-0 w-24 md:w-40 h-px bg-gradient-to-r from-transparent to-cream/30 origin-left" />
        <motion.div initial={{
        scaleX: 0
      }} animate={isHeroInView ? {
        scaleX: 1
      } : {
        scaleX: 0
      }} transition={{
        duration: 1.2,
        delay: 0.2,
        ease: [0.25, 0.46, 0.45, 0.94]
      }} className="absolute top-32 right-0 w-24 md:w-40 h-px bg-gradient-to-l from-transparent to-cream/30 origin-right" />

        <div className="section-container relative z-10">
          {/* Hero Header */}
          <div className="text-center mb-8 md:mb-12">
            {/* Decorative element */}
            <motion.div initial={{
            opacity: 0,
            scale: 0.8
          }} animate={isHeroInView ? {
            opacity: 1,
            scale: 1
          } : {
            opacity: 0,
            scale: 0.8
          }} transition={{
            duration: 0.8
          }} className="flex items-center justify-center gap-4 mb-6">
              <span className="w-8 md:w-12 h-px bg-cream/40" />
              <Film className="w-5 h-5 text-cream/60" />
              <span className="w-8 md:w-12 h-px bg-cream/40" />
            </motion.div>

            {/* Title */}
            <motion.h1 initial={{
            opacity: 0,
            y: 30
          }} animate={isHeroInView ? {
            opacity: 1,
            y: 0
          } : {
            opacity: 0,
            y: 30
          }} transition={{
            duration: 0.8,
            delay: 0.2
          }} className="font-serif text-4xl md:text-5xl lg:text-6xl text-cream mb-4 tracking-wide">
              Our Work
            </motion.h1>

            {/* Subtitle */}
            <motion.p initial={{
            opacity: 0,
            y: 20
          }} animate={isHeroInView ? {
            opacity: 1,
            y: 0
          } : {
            opacity: 0,
            y: 20
          }} transition={{
            duration: 0.8,
            delay: 0.4
          }} className="font-script text-xl md:text-2xl text-cream/70">
              Stories We've Told
            </motion.p>
          </div>

          {/* Two Column Layout */}
          <div ref={introRef} className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left - Text Content */}
            <div className="space-y-6">
              <motion.div initial={{
              opacity: 0,
              x: -30
            }} animate={isIntroInView ? {
              opacity: 1,
              x: 0
            } : {
              opacity: 0,
              x: -30
            }} transition={{
              duration: 0.8
            }} className="flex items-center gap-3">
                <span className="w-12 h-px bg-cream/40" />
              </motion.div>

              <motion.h2 initial={{
              opacity: 0,
              y: 30
            }} animate={isIntroInView ? {
              opacity: 1,
              y: 0
            } : {
              opacity: 0,
              y: 30
            }} transition={{
              duration: 0.8,
              delay: 0.1
            }} className="font-serif text-2xl md:text-3xl lg:text-4xl text-cream leading-tight">
                Every couple has a <span className="italic text-cream/70">unique rhythm</span>
              </motion.h2>

              <motion.p initial={{
              opacity: 0,
              y: 30
            }} animate={isIntroInView ? {
              opacity: 1,
              y: 0
            } : {
              opacity: 0,
              y: 30
            }} transition={{
              duration: 0.8,
              delay: 0.2
            }} className="text-cream/70 text-sm md:text-base leading-relaxed font-light">
                From intimate coastside ceremonies to elegant hotel celebrations, we focus on genuine emotion, natural storytelling, and timeless cinematics.
              </motion.p>

              <motion.p initial={{
              opacity: 0,
              y: 30
            }} animate={isIntroInView ? {
              opacity: 1,
              y: 0
            } : {
              opacity: 0,
              y: 30
            }} transition={{
              duration: 0.8,
              delay: 0.3
            }} className="text-cream/50 text-xs md:text-sm leading-relaxed font-light">
                Our work blends real moments, clean visuals, and thoughtful sound design to create films that feel personal, emotional, and beautifully true to you.
              </motion.p>

              {/* Decorative quote */}
              <motion.div initial={{
              opacity: 0
            }} animate={isIntroInView ? {
              opacity: 1
            } : {
              opacity: 0
            }} transition={{
              duration: 0.8,
              delay: 0.5
            }} className="pt-4 border-l-2 border-cream/20 pl-6">
                <p className="text-cream/60 italic font-light text-xs md:text-sm">
                  "We capture love in its most authentic form quietly, powerfully, and with heart."
                </p>
              </motion.div>
            </div>

            {/* Right - Featured Video Preview */}
            <motion.div initial={{
            opacity: 0,
            x: 30
          }} animate={isIntroInView ? {
            opacity: 1,
            x: 0
          } : {
            opacity: 0,
            x: 30
          }} transition={{
            duration: 0.8,
            delay: 0.3
          }} className="relative group">
              {/* Decorative frame */}
              <div className="absolute -inset-3 border border-cream/10 -z-10" />
              <div className="absolute -inset-6 border border-cream/5 -z-20" />
              
              {/* Autoplay Video */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <iframe src="https://www.youtube.com/embed/gINkgjJelU4?autoplay=1&mute=1&loop=1&playlist=gINkgjJelU4&controls=0&showinfo=0&rel=0&modestbranding=1" title="Featured wedding film" className="absolute inset-0 w-full h-full" allow="autoplay; encrypted-media" allowFullScreen />
              </div>

              {/* Floating accent */}
              <div className="absolute -bottom-3 -right-3 w-16 h-16 border border-cream/10 flex items-center justify-center">
                <Film className="w-5 h-5 text-cream/30" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border border-cream/30 rounded-full flex items-start justify-center p-2"
          >
            <motion.div className="w-1 h-2 bg-cream/50 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Category Filter Cards Section */}
      <section className="py-20 md:py-32 bg-charcoal-light/30 relative">
        {/* Decorative pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--cream)) 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }} />
        </div>

        <div className="section-container relative z-10">
          {/* Section Header */}
          <div className="text-center mb-12">
            <motion.div initial={{
            opacity: 0
          }} whileInView={{
            opacity: 1
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.8
          }} className="flex items-center justify-center gap-4 mb-6">
              <span className="w-12 md:w-20 h-px bg-cream/20" />
              <span className="text-cream/50 text-xs md:text-sm tracking-[0.3em] uppercase">Browse by Category</span>
              <span className="w-12 md:w-20 h-px bg-cream/20" />
            </motion.div>

            <motion.h2 initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.8
          }} className="font-serif text-3xl md:text-4xl text-cream mb-4">
              We create 
            </motion.h2>

            <motion.p initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.8,
            delay: 0.1
          }} className="text-cream/50 text-sm md:text-base max-w-xl mx-auto">
              Select a category to explore our featured wedding films
            </motion.p>
          </div>

          {/* Category Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {categories.map((category, index) => <CategoryCard key={category.id} category={category} index={index} isActive={activeCategory === category.id} onClick={() => handleCategoryClick(category.id)} />)}
          </div>
        </div>
      </section>

      {/* Video Gallery */}
      <section ref={galleryRef} className="py-24 md:py-32 relative">
        {/* Background texture */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--cream)) 1px, transparent 0)`,
          backgroundSize: '30px 30px'
        }} />
        </div>

        <div className="section-container relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16 md:mb-20">
            <motion.div initial={{
            opacity: 0
          }} whileInView={{
            opacity: 1
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.8
          }} className="flex items-center justify-center gap-4 mb-6">
              <span className="w-12 md:w-20 h-px bg-cream/20" />
              <span className="text-cream/50 text-xs md:text-sm tracking-[0.3em] uppercase">Featured Films</span>
              <span className="w-12 md:w-20 h-px bg-cream/20" />
            </motion.div>

            <motion.h3 initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} className="font-serif text-2xl md:text-3xl text-cream/80">
              {activeCategory === "all" ? "All Our Stories" : categories.find(c => c.id === activeCategory)?.title}
            </motion.h3>
          </div>

          {/* Video Grid */}
          <AnimatePresence mode="wait">
            <motion.div key={activeCategory} initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} exit={{
            opacity: 0,
            y: -20
          }} transition={{
            duration: 0.5
          }} className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
              {filteredVideos.map((video, index) => <VideoCard key={video.id} video={video} index={index} onPlay={openVideo} />)}
            </motion.div>
          </AnimatePresence>

          {/* Empty state */}
          {filteredVideos.length === 0 && <motion.div initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} className="text-center py-20">
              <Film className="w-12 h-12 text-cream/20 mx-auto mb-4" />
              <p className="text-cream/40">No films in this category yet</p>
            </motion.div>}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 md:py-28 border-t border-cream/10">
        <div className="section-container text-center">
          <motion.p initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.8
        }} className="text-cream/60 text-lg md:text-xl font-light mb-8 max-w-2xl mx-auto">
            Ready to tell your story?
          </motion.p>
          <motion.a initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.8,
          delay: 0.2
        }} href="/contact" className="inline-flex items-center gap-3 px-8 py-4 bg-cream text-charcoal font-medium tracking-wide hover:bg-cream/90 transition-all duration-300 group">
            <span>Get in Touch</span>
            <motion.span className="text-lg" animate={{
            x: [0, 4, 0]
          }} transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}>
              →
            </motion.span>
          </motion.a>
        </div>
      </section>

      {/* Video Modal */}
      <AnimatePresence>
        {activeVideo && <Dialog open={!!activeVideo} onOpenChange={closeVideo}>
            <DialogContent className="max-w-6xl w-[95vw] p-0 bg-black border-none overflow-hidden">
              <DialogTitle className="sr-only">Wedding Film</DialogTitle>
              <div className="relative">
                <button onClick={closeVideo} className="absolute -top-12 right-0 z-50 p-2 text-cream/80 hover:text-cream transition-colors">
                  <X className="w-6 h-6" />
                </button>
                <div className="aspect-video w-full">
                  <iframe src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1&rel=0`} title="Wedding Film" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="w-full h-full" />
                </div>
              </div>
            </DialogContent>
          </Dialog>}
      </AnimatePresence>
    </div>;
};
export default Portfolio;