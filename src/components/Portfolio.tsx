import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Play, X, Film, Heart, Camera, Sun, Sparkles, Building } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface VideoItem {
  id: string;
  youtubeId: string;
  caption: string;
}

const videos: VideoItem[] = [
  {
    id: "1",
    youtubeId: "gINkgjJelU4",
    caption: "A quiet moment by the sea. A story told through soft light and raw emotion.",
  },
  {
    id: "2",
    youtubeId: "0TvxJPETd-8",
    caption: "A celebration filled with colour, culture, and heartfelt connections.",
  },
  {
    id: "3",
    youtubeId: "YaZWNpmYuYo",
    caption: "Two souls finding forever in a moment of pure joy.",
  },
  {
    id: "4",
    youtubeId: "BPPlu0aNgb0",
    caption: "Where tradition meets timeless love, beautifully captured.",
  },
];

const services = [
  { icon: Film, text: "Cinematic Wedding Films" },
  { icon: Heart, text: "Engagement & Pre-Wedding Stories" },
  { icon: Camera, text: "Homecoming Films" },
  { icon: Sun, text: "Outdoor / Scenic Shoots" },
  { icon: Sparkles, text: "Classic Sri Lankan Cultural Weddings" },
  { icon: Building, text: "Modern Hotel Weddings" },
];

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
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Video Card Container */}
      <div 
        className="relative aspect-video overflow-hidden cursor-pointer bg-charcoal"
        onClick={() => onPlay(video.youtubeId)}
      >
        {/* Thumbnail */}
        <img
          src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
          alt="Wedding film thumbnail"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

        {/* Play Button */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          initial={false}
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative">
            {/* Outer ring pulse */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-cream/40"
              animate={{ 
                scale: isHovered ? [1, 1.4, 1.4] : 1,
                opacity: isHovered ? [0.6, 0, 0] : 0.6
              }}
              transition={{ 
                duration: 1.5, 
                repeat: isHovered ? Infinity : 0,
                ease: "easeOut"
              }}
              style={{ width: 80, height: 80, marginLeft: -40, marginTop: -40, left: '50%', top: '50%', position: 'absolute' }}
            />
            <div className="w-20 h-20 rounded-full bg-cream/20 backdrop-blur-sm border border-cream/40 flex items-center justify-center group-hover:bg-cream/30 transition-all duration-300">
              <Play className="w-8 h-8 text-cream fill-cream ml-1" />
            </div>
          </div>
        </motion.div>

        {/* Film grain effect */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Caption */}
      <motion.div 
        className="mt-6 px-2"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, delay: index * 0.15 + 0.4 }}
      >
        <p className="text-cream/70 text-sm md:text-base italic leading-relaxed font-light tracking-wide">
          "{video.caption}"
        </p>
      </motion.div>
    </motion.div>
  );
};

const Portfolio = () => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const heroRef = useRef(null);
  const introRef = useRef(null);
  const servicesRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });
  const isIntroInView = useInView(introRef, { once: true, margin: "-100px" });
  const isServicesInView = useInView(servicesRef, { once: true, margin: "-100px" });

  const openVideo = (youtubeId: string) => setActiveVideo(youtubeId);
  const closeVideo = () => setActiveVideo(null);

  return (
    <div className="bg-charcoal min-h-screen">
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative py-24 md:py-32 lg:py-40 overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--cream)) 1px, transparent 0)`,
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        {/* Decorative Lines */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isHeroInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute top-1/2 left-0 w-24 md:w-40 h-px bg-gradient-to-r from-transparent to-cream/30 origin-left"
        />
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isHeroInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute top-1/2 right-0 w-24 md:w-40 h-px bg-gradient-to-l from-transparent to-cream/30 origin-right"
        />

        <div className="section-container text-center relative z-10">
          {/* Decorative element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isHeroInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center gap-4 mb-8"
          >
            <span className="w-8 md:w-12 h-px bg-cream/40" />
            <Film className="w-5 h-5 text-cream/60" />
            <span className="w-8 md:w-12 h-px bg-cream/40" />
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif text-5xl md:text-6xl lg:text-7xl text-cream mb-6 tracking-wide"
          >
            Our Work
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-script text-2xl md:text-3xl text-cream/70"
          >
            Stories We've Told
          </motion.p>
        </div>
      </section>

      {/* Intro Section */}
      <section ref={introRef} className="py-20 md:py-28 border-t border-cream/10">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center">
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isIntroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8 }}
              className="text-cream/80 text-lg md:text-xl leading-relaxed font-light mb-8"
            >
              Every couple has a unique rhythm — and our films are crafted to reflect it. From intimate coastside ceremonies to elegant hotel celebrations, we focus on genuine emotion, natural storytelling, and timeless cinematics.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isIntroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-cream/60 text-base md:text-lg leading-relaxed font-light mb-12"
            >
              Our work blends real moments, clean visuals, and thoughtful sound design to create films that feel personal, emotional, and beautifully true to you. Explore our portfolio and see how we capture love in its most authentic form — quietly, powerfully, and with heart.
            </motion.p>

            {/* Decorative divider */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={isIntroInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="flex items-center justify-center gap-4"
            >
              <span className="w-16 md:w-24 h-px bg-cream/20" />
              <Heart className="w-4 h-4 text-cream/40" />
              <span className="w-16 md:w-24 h-px bg-cream/20" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section ref={servicesRef} className="py-16 md:py-24 bg-charcoal-light/30">
        <div className="section-container">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isServicesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8 }}
            className="font-serif text-2xl md:text-3xl text-cream text-center mb-12"
          >
            We Create
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto">
            {services.map((service, index) => (
              <motion.div
                key={service.text}
                initial={{ opacity: 0, y: 20 }}
                animate={isServicesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex items-center gap-3 text-cream/70 group"
              >
                <service.icon className="w-4 h-4 text-cream/50 group-hover:text-cream/80 transition-colors duration-300" />
                <span className="text-sm md:text-base font-light tracking-wide group-hover:text-cream transition-colors duration-300">
                  {service.text}
                </span>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isServicesInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-cream/50 text-sm md:text-base text-center mt-12 max-w-2xl mx-auto font-light italic"
          >
            Each film is carefully edited with soft tones, emotional pacing, and storytelling that highlights the essence of your day.
          </motion.p>
        </div>
      </section>

      {/* Video Gallery */}
      <section className="py-24 md:py-32">
        <div className="section-container">
          {/* Section Header */}
          <div className="text-center mb-16 md:mb-20">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex items-center justify-center gap-4 mb-6"
            >
              <span className="w-12 md:w-20 h-px bg-cream/20" />
              <span className="text-cream/50 text-xs md:text-sm tracking-[0.3em] uppercase">Featured Films</span>
              <span className="w-12 md:w-20 h-px bg-cream/20" />
            </motion.div>
          </div>

          {/* Video Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
            {videos.map((video, index) => (
              <VideoCard 
                key={video.id} 
                video={video} 
                index={index} 
                onPlay={openVideo}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 md:py-28 border-t border-cream/10">
        <div className="section-container text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-cream/60 text-lg md:text-xl font-light mb-8 max-w-2xl mx-auto"
          >
            Ready to tell your story?
          </motion.p>
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            href="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 bg-cream text-charcoal font-medium tracking-wide hover:bg-cream/90 transition-all duration-300 group"
          >
            <span>Get in Touch</span>
            <motion.span
              className="text-lg"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              →
            </motion.span>
          </motion.a>
        </div>
      </section>

      {/* Video Modal */}
      <AnimatePresence>
        {activeVideo && (
          <Dialog open={!!activeVideo} onOpenChange={closeVideo}>
            <DialogContent className="max-w-6xl w-[95vw] p-0 bg-black border-none overflow-hidden">
              <DialogTitle className="sr-only">Wedding Film</DialogTitle>
              <div className="relative">
                {/* Close Button */}
                <button
                  onClick={closeVideo}
                  className="absolute -top-12 right-0 z-50 p-2 text-cream/80 hover:text-cream transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>

                {/* Video Player */}
                <div className="aspect-video w-full">
                  <iframe
                    src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1&rel=0`}
                    title="Wedding Film"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Portfolio;
