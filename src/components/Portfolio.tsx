import { useState, useRef } from "react";
import { Play, X, Film, Sparkles } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { motion, useInView } from "framer-motion";

interface ReelItem {
  id: number;
  thumbnail: string;
  coupleName: string;
  caption: string;
  videoUrl: string;
}

interface CategorySection {
  id: string;
  title: string;
  reels: ReelItem[];
}

const portfolioData: CategorySection[] = [
  {
    id: "cinematic-wedding",
    title: "Cinematic Wedding Films",
    reels: [
      {
        id: 1,
        thumbnail: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        coupleName: "Sahan & Nethmi",
        caption: "A quiet moment by the sea. A story told through soft light and raw emotion.",
        videoUrl: "https://player.vimeo.com/video/YOUR_VIDEO_ID",
      },
      {
        id: 2,
        thumbnail: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        coupleName: "Amila & Hansani",
        caption: "Pure love and laughter captured in the golden hour.",
        videoUrl: "https://player.vimeo.com/video/YOUR_VIDEO_ID",
      },
      {
        id: 3,
        thumbnail: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        coupleName: "Nuwan & Sanduni",
        caption: "Two hearts, one beautiful journey.",
        videoUrl: "https://player.vimeo.com/video/YOUR_VIDEO_ID",
      },
    ],
  },
  {
    id: "engagement",
    title: "Engagement & Pre-Wedding Stories",
    reels: [
      {
        id: 4,
        thumbnail: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        coupleName: "Kasun & Dilini",
        caption: "An intimate story among the misty tea estates of Nuwara Eliya.",
        videoUrl: "https://player.vimeo.com/video/YOUR_VIDEO_ID",
      },
      {
        id: 5,
        thumbnail: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        coupleName: "Tharaka & Ishani",
        caption: "A love story written in golden light.",
        videoUrl: "https://player.vimeo.com/video/YOUR_VIDEO_ID",
      },
    ],
  },
  {
    id: "homecoming",
    title: "Homecoming Films",
    reels: [
      {
        id: 6,
        thumbnail: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        coupleName: "Dinesh & Malsha",
        caption: "A beautiful ceremony filled with blessings, joy, and new beginnings.",
        videoUrl: "https://player.vimeo.com/video/YOUR_VIDEO_ID",
      },
      {
        id: 7,
        thumbnail: "https://images.unsplash.com/photo-1460364157752-926555571c37?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        coupleName: "Prasad & Nimali",
        caption: "Where tradition meets timeless love.",
        videoUrl: "https://player.vimeo.com/video/YOUR_VIDEO_ID",
      },
    ],
  },
  {
    id: "outdoor",
    title: "Outdoor / Scenic Shoots",
    reels: [
      {
        id: 8,
        thumbnail: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        coupleName: "Tharindu & Ishara",
        caption: "Sunset hues and ocean breeze—a coastal love story.",
        videoUrl: "https://player.vimeo.com/video/YOUR_VIDEO_ID",
      },
      {
        id: 9,
        thumbnail: "https://images.unsplash.com/photo-1529634597503-139d3726fed5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        coupleName: "Chathura & Sewwandi",
        caption: "Nature's canvas, love's masterpiece.",
        videoUrl: "https://player.vimeo.com/video/YOUR_VIDEO_ID",
      },
      {
        id: 10,
        thumbnail: "https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        coupleName: "Lahiru & Madushani",
        caption: "Lost in each other, found in nature.",
        videoUrl: "https://player.vimeo.com/video/YOUR_VIDEO_ID",
      },
    ],
  },
  {
    id: "cultural",
    title: "Classic Sri Lankan Cultural Weddings",
    reels: [
      {
        id: 11,
        thumbnail: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        coupleName: "Ravindu & Sachini",
        caption: "A celebration filled with colour, culture, and heartfelt connections.",
        videoUrl: "https://player.vimeo.com/video/YOUR_VIDEO_ID",
      },
      {
        id: 12,
        thumbnail: "https://images.unsplash.com/photo-1604604994333-f1b0e9471186?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        coupleName: "Sampath & Chathurika",
        caption: "Traditional elegance meets modern cinematography.",
        videoUrl: "https://player.vimeo.com/video/YOUR_VIDEO_ID",
      },
    ],
  },
  {
    id: "hotel",
    title: "Modern Hotel Weddings",
    reels: [
      {
        id: 13,
        thumbnail: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        coupleName: "Kavinda & Hashini",
        caption: "Luxury, love, and timeless elegance.",
        videoUrl: "https://player.vimeo.com/video/YOUR_VIDEO_ID",
      },
      {
        id: 14,
        thumbnail: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        coupleName: "Roshan & Dilshani",
        caption: "Where sophistication meets heartfelt moments.",
        videoUrl: "https://player.vimeo.com/video/YOUR_VIDEO_ID",
      },
      {
        id: 15,
        thumbnail: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        coupleName: "Ashan & Thilini",
        caption: "A grand celebration of love.",
        videoUrl: "https://player.vimeo.com/video/YOUR_VIDEO_ID",
      },
    ],
  },
];

const categories = [
  "Cinematic Wedding Films",
  "Engagement & Pre-Wedding Stories",
  "Homecoming Films",
  "Outdoor / Scenic Shoots",
  "Classic Sri Lankan Cultural Weddings",
  "Modern Hotel Weddings",
];

const ReelCard = ({ reel, onClick, index }: { reel: ReelItem; onClick: () => void; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      className="group cursor-pointer relative aspect-[9/16] overflow-hidden rounded-sm"
    >
      {/* Thumbnail */}
      <img
        src={reel.thumbnail}
        alt={reel.coupleName}
        className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
        loading="lazy"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent opacity-80" />
      
      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-cream/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Film Strip Effect - Top */}
      <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-charcoal/90 to-transparent flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500">
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-2 h-3 bg-cream/20 rounded-sm" />
          ))}
        </div>
      </div>

      {/* Play Button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileHover={{ scale: 1 }}
          className="w-14 h-14 border-2 border-cream/80 rounded-full flex items-center justify-center backdrop-blur-md bg-charcoal/40 opacity-0 group-hover:opacity-100 transition-all duration-500 shadow-[0_0_30px_rgba(255,239,194,0.2)]"
        >
          <Play className="w-5 h-5 text-cream ml-1" fill="currentColor" />
        </motion.div>
      </div>

      {/* Info */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
          <h3 className="text-base font-serif uppercase tracking-[0.15em] text-cream mb-2 drop-shadow-lg">
            {reel.coupleName}
          </h3>
          <p className="text-cream/60 text-xs font-script italic line-clamp-2 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
            "{reel.caption}"
          </p>
        </div>
      </div>

      {/* Corner Accents */}
      <div className="absolute top-3 left-3 w-6 h-6 border-l border-t border-cream/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute top-3 right-3 w-6 h-6 border-r border-t border-cream/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
};

const CategorySection = ({ category, categoryIndex }: { category: CategorySection; categoryIndex: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedReel, setSelectedReel] = useState<ReelItem | null>(null);

  return (
    <>
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="py-20 px-6 relative"
      >
        {/* Background Pattern */}
        {categoryIndex % 2 === 1 && (
          <div className="absolute inset-0 bg-gradient-to-r from-cream/[0.02] via-transparent to-cream/[0.02]" />
        )}

        <div className="max-w-7xl mx-auto relative">
          {/* Category Header */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12 flex items-end gap-6"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-cream/20 text-6xl md:text-7xl font-serif font-light">
                  {String(categoryIndex + 1).padStart(2, "0")}
                </span>
                <div className="w-12 h-px bg-gradient-to-r from-cream/40 to-transparent" />
              </div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif uppercase tracking-[0.12em] text-cream">
                {category.title}
              </h2>
            </div>
            <Film className="w-5 h-5 text-cream/30 mb-2 hidden md:block" />
          </motion.div>

          {/* Reels Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5">
            {category.reels.map((reel, index) => (
              <ReelCard
                key={reel.id}
                reel={reel}
                onClick={() => setSelectedReel(reel)}
                index={index}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Video Modal */}
      <Dialog open={!!selectedReel} onOpenChange={() => setSelectedReel(null)}>
        <DialogContent className="max-w-md w-full p-0 bg-charcoal border-cream/10 overflow-hidden rounded-lg shadow-2xl">
          <button
            onClick={() => setSelectedReel(null)}
            className="absolute top-4 right-4 z-10 w-9 h-9 border border-cream/30 rounded-full flex items-center justify-center text-cream hover:bg-cream hover:text-charcoal transition-all duration-300 backdrop-blur-sm bg-charcoal/50"
          >
            <X className="w-4 h-4" />
          </button>

          {selectedReel && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {/* Reel Video Placeholder */}
              <div className="aspect-[9/16] bg-charcoal-light flex items-center justify-center relative overflow-hidden">
                <img
                  src={selectedReel.thumbnail}
                  alt={selectedReel.coupleName}
                  className="absolute inset-0 w-full h-full object-cover opacity-30"
                />
                <div className="absolute inset-0 bg-charcoal/60" />
                <div className="relative text-center text-cream/70">
                  <div className="w-16 h-16 border-2 border-cream/50 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                    <Play className="w-6 h-6 text-cream ml-1" />
                  </div>
                  <p className="text-xs tracking-[0.2em] uppercase">
                    Play Reel
                  </p>
                </div>
              </div>

              {/* Reel Info */}
              <div className="p-6 text-cream border-t border-cream/10">
                <h3 className="text-xl font-serif uppercase tracking-[0.12em] mb-3">
                  {selectedReel.coupleName}
                </h3>
                <p className="text-cream/50 font-script text-base italic">
                  "{selectedReel.caption}"
                </p>
              </div>
            </motion.div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

const Portfolio = () => {
  const heroRef = useRef(null);
  const introRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const introInView = useInView(introRef, { once: true, margin: "-100px" });

  return (
    <section id="portfolio" className="bg-charcoal overflow-hidden">
      {/* Hero Section */}
      <div ref={heroRef} className="min-h-[50vh] flex items-center justify-center relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 border border-cream/5 rounded-full" />
          <div className="absolute bottom-20 right-20 w-48 h-48 border border-cream/5 rounded-full" />
          <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-cream/20 rounded-full" />
          <div className="absolute bottom-1/3 left-1/4 w-1 h-1 bg-cream/30 rounded-full" />
        </div>

        <div className="relative z-10 text-center px-6 py-24 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-cream/40" />
              <Sparkles className="w-4 h-4 text-cream/40" />
              <span className="text-cream/50 text-xs tracking-[0.4em] uppercase font-light">
                Portfolio
              </span>
              <Sparkles className="w-4 h-4 text-cream/40" />
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-cream/40" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl md:text-6xl lg:text-8xl font-serif uppercase tracking-[0.2em] text-cream mb-8"
          >
            Our Work
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={heroInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="w-32 h-px bg-gradient-to-r from-transparent via-cream/50 to-transparent mx-auto"
          />
        </div>
      </div>

      {/* Intro Section */}
      <motion.div
        ref={introRef}
        initial={{ opacity: 0 }}
        animate={introInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="py-20 px-6 border-t border-cream/10 relative"
      >
        {/* Background Accent */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-cream/10 to-transparent" />

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-5 gap-12 lg:gap-20">
            {/* Intro Text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={introInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="md:col-span-3 space-y-6"
            >
              <p className="text-cream/70 text-lg leading-relaxed">
                Every couple has a unique rhythm — and our films are crafted to reflect it.
                From intimate coastside ceremonies to elegant hotel celebrations, we focus on genuine
                emotion, natural storytelling, and timeless cinematics.
              </p>
              <p className="text-cream/60 text-base leading-relaxed">
                Our work blends real moments, clean visuals, and thoughtful sound design to create films
                that feel personal, emotional, and beautifully true to you.
              </p>
              <p className="text-cream/60 text-base leading-relaxed">
                Explore our portfolio and see how we capture love in its most authentic form — quietly,
                powerfully, and with heart.
              </p>
            </motion.div>

            {/* We Create List */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={introInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="md:col-span-2"
            >
              <div className="flex items-center gap-3 mb-6">
                <Film className="w-4 h-4 text-cream/40" />
                <span className="text-cream/50 text-xs tracking-[0.3em] uppercase">
                  We Create
                </span>
              </div>
              <ul className="space-y-4 mb-8">
                {categories.map((category, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={introInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    className="text-cream/80 font-light flex items-center gap-4 group"
                  >
                    <span className="w-2 h-2 bg-cream/30 rounded-full group-hover:bg-cream/60 transition-colors duration-300" />
                    <span className="group-hover:text-cream transition-colors duration-300">
                      {category}
                    </span>
                  </motion.li>
                ))}
              </ul>
              <div className="pl-6 border-l border-cream/20">
                <p className="text-cream/40 text-sm italic font-script leading-relaxed">
                  Each film is carefully edited with soft tones, emotional pacing, and storytelling that highlights
                  the essence of your day.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Divider */}
      <div className="flex items-center justify-center py-8">
        <div className="w-24 h-px bg-gradient-to-r from-transparent via-cream/20 to-transparent" />
        <div className="w-2 h-2 bg-cream/20 rounded-full mx-4" />
        <div className="w-24 h-px bg-gradient-to-r from-transparent via-cream/20 to-transparent" />
      </div>

      {/* Category Sections */}
      <div className="pb-24">
        {portfolioData.map((category, categoryIndex) => (
          <CategorySection
            key={category.id}
            category={category}
            categoryIndex={categoryIndex}
          />
        ))}
      </div>
    </section>
  );
};

export default Portfolio;
