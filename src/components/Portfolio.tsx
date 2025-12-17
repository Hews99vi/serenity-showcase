import { useState } from "react";
import { Play, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

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

const Portfolio = () => {
  const [selectedReel, setSelectedReel] = useState<ReelItem | null>(null);

  return (
    <section id="portfolio" className="bg-charcoal">
      {/* Hero Section */}
      <div className="min-h-[50vh] flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-charcoal/95 to-charcoal" />
        <div className="relative z-10 text-center px-6 py-24 max-w-4xl mx-auto">
          <span className="text-cream/40 text-xs tracking-[0.4em] uppercase font-light mb-6 block">
            Portfolio
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif uppercase tracking-[0.15em] text-cream mb-8">
            Our Work
          </h1>
          <div className="w-24 h-px bg-cream/20 mx-auto mb-10" />
          <p className="text-cream/70 text-lg md:text-xl leading-relaxed font-light max-w-3xl mx-auto">
            Every couple has a unique rhythm — and our films are crafted to reflect it.
            Explore our collection of cinematic stories.
          </p>
        </div>
      </div>

      {/* Category Sections */}
      <div className="pb-20">
        {portfolioData.map((category, categoryIndex) => (
          <div
            key={category.id}
            className={`py-16 px-6 ${categoryIndex % 2 === 0 ? "bg-charcoal" : "bg-charcoal-light/30"}`}
          >
            <div className="max-w-7xl mx-auto">
              {/* Category Header */}
              <div className="mb-10">
                <span className="text-cream/30 text-xs tracking-[0.3em] uppercase block mb-3">
                  {String(categoryIndex + 1).padStart(2, "0")}
                </span>
                <h2 className="text-2xl md:text-3xl font-serif uppercase tracking-[0.1em] text-cream">
                  {category.title}
                </h2>
                <div className="w-16 h-px bg-cream/20 mt-4" />
              </div>

              {/* Reels Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {category.reels.map((reel) => (
                  <div
                    key={reel.id}
                    onClick={() => setSelectedReel(reel)}
                    className="group cursor-pointer relative aspect-[9/16] overflow-hidden bg-charcoal-light"
                  >
                    {/* Thumbnail */}
                    <img
                      src={reel.thumbnail}
                      alt={reel.coupleName}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-transparent opacity-60 group-hover:opacity-80 transition-all duration-500" />

                    {/* Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <div className="w-12 h-12 border border-cream/60 rounded-full flex items-center justify-center backdrop-blur-sm bg-charcoal/30">
                        <Play className="w-5 h-5 text-cream ml-0.5" fill="currentColor" />
                      </div>
                    </div>

                    {/* Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-sm font-serif uppercase tracking-wider text-cream mb-1">
                        {reel.coupleName}
                      </h3>
                      <p className="text-cream/50 text-xs font-script italic line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        "{reel.caption}"
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Video Modal */}
      <Dialog open={!!selectedReel} onOpenChange={() => setSelectedReel(null)}>
        <DialogContent className="max-w-lg w-full p-0 bg-charcoal border-cream/10 overflow-hidden">
          <button
            onClick={() => setSelectedReel(null)}
            className="absolute top-4 right-4 z-10 w-8 h-8 border border-cream/20 rounded-full flex items-center justify-center text-cream hover:bg-cream hover:text-charcoal transition-all duration-300"
          >
            <X className="w-4 h-4" />
          </button>

          {selectedReel && (
            <div>
              {/* Reel Video Placeholder */}
              <div className="aspect-[9/16] bg-charcoal-light flex items-center justify-center">
                <div className="text-center text-cream/60">
                  <Play className="w-12 h-12 mx-auto mb-3 opacity-40" />
                  <p className="text-xs tracking-[0.2em] uppercase">
                    Reel Video
                  </p>
                  <p className="text-[10px] opacity-40 mt-1">
                    Add your video embed here
                  </p>
                </div>
              </div>

              {/* Reel Info */}
              <div className="p-6 text-cream">
                <h3 className="text-lg font-serif uppercase tracking-wider mb-2">
                  {selectedReel.coupleName}
                </h3>
                <p className="text-cream/60 font-script text-sm italic">
                  "{selectedReel.caption}"
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Portfolio;
