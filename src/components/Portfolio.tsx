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
    eventType: "Wedding",
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
    eventType: "Pre-Wedding",
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
    eventType: "Wedding",
    caption:
      "Traditional elegance meets modern cinematography in this Kandyan wedding celebration.",
    videoUrl: "https://player.vimeo.com/video/YOUR_VIDEO_ID_3",
    date: "January 2024",
  },
  {
    id: 4,
    thumbnail:
      "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    coupleName: "Dinesh & Malsha",
    eventType: "Homecoming",
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
    eventType: "Wedding",
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
    eventType: "Engagement",
    caption:
      "Pure love and laughter captured in the golden hour of their engagement day.",
    videoUrl: "https://player.vimeo.com/video/YOUR_VIDEO_ID_6",
    date: "October 2023",
  },
];

const Portfolio = () => {
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  return (
    <section id="portfolio" className="section-padding bg-charcoal">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="text-cream/50 text-sm tracking-[0.3em] uppercase font-light mb-4 block">
            Our Work
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-cream mb-6">
            Portfolio
          </h2>
          <div className="w-20 h-px bg-cream/30 mx-auto mb-8" />
          <p className="text-lg text-cream/70 max-w-3xl mx-auto font-light leading-relaxed">
            Every couple has a unique rhythm and our films are crafted to
            reflect it. From intimate coastside ceremonies to elegant hotel
            celebrations.
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-transparent opacity-60 group-hover:opacity-90 transition-all duration-500" />

              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                <div className="w-20 h-20 border-2 border-cream flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-500">
                  <Play className="w-8 h-8 text-cream ml-1" />
                </div>
              </div>

              {/* Info */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <span className="text-xs font-medium text-cream/60 uppercase tracking-[0.2em] mb-2 block">
                  {item.eventType}
                </span>
                <h3 className="text-2xl font-serif font-medium text-cream">
                  {item.coupleName}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-5xl w-full p-0 bg-charcoal border-cream/10 overflow-hidden">
          <button
            onClick={() => setSelectedItem(null)}
            className="absolute top-6 right-6 z-10 w-12 h-12 border border-cream/20 flex items-center justify-center text-cream hover:bg-cream hover:text-charcoal transition-all duration-300"
          >
            <X className="w-5 h-5" />
          </button>

          {selectedItem && (
            <div className="p-8 md:p-12">
              {/* Video Embed Placeholder */}
              <div className="aspect-video bg-charcoal-light border border-cream/10 flex items-center justify-center mb-8">
                <div className="text-center text-cream/60">
                  <Play className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-sm tracking-widest uppercase">
                    Video will load here
                  </p>
                  <p className="text-xs opacity-50 mt-2">
                    Replace with your Vimeo embed
                  </p>
                </div>
              </div>

              {/* Video Info */}
              <div className="text-cream">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-xs font-medium text-cream/60 uppercase tracking-[0.2em]">
                    {selectedItem.eventType}
                  </span>
                  <span className="text-cream/30">•</span>
                  <span className="text-xs text-cream/50">
                    {selectedItem.date}
                  </span>
                </div>
                <h3 className="text-3xl font-serif font-medium mb-4">
                  {selectedItem.coupleName}
                </h3>
                <p className="text-cream/70 font-script text-xl italic">
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
