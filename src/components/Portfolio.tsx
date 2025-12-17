import { useState } from "react";
import { Play, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface PortfolioItem {
  id: number;
  thumbnail: string;
  coupleName: string;
  eventType: string;
  caption: string;
  videoUrl: string;
  date: string;
}

const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    thumbnail:
      "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    coupleName: "Sahan & Nethmi",
    eventType: "Cinematic Wedding Film",
    caption:
      "A quiet moment by the sea. A story told through soft light and raw emotion.",
    videoUrl: "https://player.vimeo.com/video/YOUR_VIDEO_ID_1",
    date: "March 2024",
  },
  {
    id: 2,
    thumbnail:
      "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    coupleName: "Kasun & Dilini",
    eventType: "Pre-Wedding Story",
    caption:
      "An intimate engagement story captured among the misty tea estates of Nuwara Eliya.",
    videoUrl: "https://player.vimeo.com/video/YOUR_VIDEO_ID_2",
    date: "February 2024",
  },
  {
    id: 3,
    thumbnail:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    coupleName: "Ravindu & Sachini",
    eventType: "Classic Sri Lankan Wedding",
    caption:
      "A celebration filled with colour, culture, and heartfelt connections.",
    videoUrl: "https://player.vimeo.com/video/YOUR_VIDEO_ID_3",
    date: "January 2024",
  },
  {
    id: 4,
    thumbnail:
      "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    coupleName: "Dinesh & Malsha",
    eventType: "Homecoming Film",
    caption:
      "A beautiful homecoming ceremony filled with blessings, joy, and new beginnings.",
    videoUrl: "https://player.vimeo.com/video/YOUR_VIDEO_ID_4",
    date: "December 2023",
  },
  {
    id: 5,
    thumbnail:
      "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    coupleName: "Tharindu & Ishara",
    eventType: "Modern Hotel Wedding",
    caption:
      "Sunset hues and ocean breeze—a coastal wedding like no other.",
    videoUrl: "https://player.vimeo.com/video/YOUR_VIDEO_ID_5",
    date: "November 2023",
  },
  {
    id: 6,
    thumbnail:
      "https://images.unsplash.com/photo-1591604466107-ec97de577aff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    coupleName: "Amila & Hansani",
    eventType: "Outdoor Scenic Shoot",
    caption:
      "Pure love and laughter captured in the golden hour of their engagement day.",
    videoUrl: "https://player.vimeo.com/video/YOUR_VIDEO_ID_6",
    date: "October 2023",
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

const Portfolio = () => {
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  return (
    <section id="portfolio" className="bg-charcoal">
      {/* Hero Section */}
      <div className="min-h-[60vh] flex items-center justify-center relative overflow-hidden">
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
            From intimate coastside ceremonies to elegant hotel celebrations, we focus on genuine
            emotion, natural storytelling, and timeless cinematics.
          </p>
        </div>
      </div>

      {/* Philosophy Section */}
      <div className="py-20 px-6 border-t border-cream/10">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-cream/60 leading-relaxed text-base">
                Our work blends real moments, clean visuals, and thoughtful sound design to create films
                that feel personal, emotional, and beautifully true to you.
              </p>
              <p className="text-cream/60 leading-relaxed text-base mt-6">
                Explore our portfolio and see how we capture love in its most authentic form — quietly,
                powerfully, and with heart.
              </p>
            </div>
            <div>
              <span className="text-cream/40 text-xs tracking-[0.3em] uppercase mb-6 block">
                We Create
              </span>
              <ul className="space-y-3">
                {categories.map((category, index) => (
                  <li
                    key={index}
                    className="text-cream/80 font-light flex items-center gap-3"
                  >
                    <span className="w-1.5 h-1.5 bg-cream/40 rounded-full" />
                    {category}
                  </li>
                ))}
              </ul>
              <p className="text-cream/50 text-sm mt-8 italic font-script">
                Each film is carefully edited with soft tones, emotional pacing, and storytelling that highlights
                the essence of your day.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio Grid */}
      <div className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolioItems.map((item, index) => (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="group cursor-pointer relative aspect-[4/5] overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Thumbnail */}
                <img
                  src={item.thumbnail}
                  alt={`${item.coupleName} - ${item.eventType}`}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/30 to-transparent opacity-70 group-hover:opacity-90 transition-all duration-500" />

                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="w-16 h-16 border border-cream/60 flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-500">
                    <Play className="w-6 h-6 text-cream ml-1" />
                  </div>
                </div>

                {/* Info */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="text-[10px] font-medium text-cream/50 uppercase tracking-[0.2em] mb-2 block">
                    {item.eventType}
                  </span>
                  <h3 className="text-xl font-serif uppercase tracking-wider text-cream mb-3">
                    {item.coupleName}
                  </h3>
                  <p className="text-cream/50 text-sm font-script italic opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    "{item.caption}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-5xl w-full p-0 bg-charcoal border-cream/10 overflow-hidden">
          <button
            onClick={() => setSelectedItem(null)}
            className="absolute top-6 right-6 z-10 w-10 h-10 border border-cream/20 flex items-center justify-center text-cream hover:bg-cream hover:text-charcoal transition-all duration-300"
          >
            <X className="w-4 h-4" />
          </button>

          {selectedItem && (
            <div className="p-8 md:p-12">
              {/* Video Embed Placeholder */}
              <div className="aspect-video bg-charcoal-light border border-cream/10 flex items-center justify-center mb-8">
                <div className="text-center text-cream/60">
                  <Play className="w-14 h-14 mx-auto mb-4 opacity-40" />
                  <p className="text-xs tracking-[0.2em] uppercase">
                    Video will load here
                  </p>
                  <p className="text-[10px] opacity-40 mt-2">
                    Replace with your Vimeo embed
                  </p>
                </div>
              </div>

              {/* Video Info */}
              <div className="text-cream">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-[10px] font-medium text-cream/50 uppercase tracking-[0.2em]">
                    {selectedItem.eventType}
                  </span>
                  <span className="text-cream/20">•</span>
                  <span className="text-[10px] text-cream/40">
                    {selectedItem.date}
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-serif uppercase tracking-wider mb-6">
                  {selectedItem.coupleName}
                </h3>
                <p className="text-cream/60 font-script text-lg italic">
                  "{selectedItem.caption}"
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
