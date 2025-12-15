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
    <section id="portfolio" className="section-padding bg-primary">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium text-primary-foreground mb-4">
            Our Work
          </h2>
          <div className="w-24 h-px bg-accent mx-auto mb-6" />
          <p className="text-lg text-primary-foreground/80 max-w-3xl mx-auto leading-relaxed">
            Every couple has a unique rhythm and our films are crafted to
            reflect it. From intimate coastside ceremonies to elegant hotel
            celebrations, we focus on genuine emotion, natural storytelling, and
            timeless cinematics.
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {portfolioItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group cursor-pointer relative aspect-[4/3] rounded-2xl overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Thumbnail */}
              <img
                src={item.thumbnail}
                alt={`${item.coupleName} - ${item.eventType}`}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />

              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-accent/90 rounded-full flex items-center justify-center transform scale-90 opacity-80 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300">
                  <Play className="w-7 h-7 text-accent-foreground ml-1" />
                </div>
              </div>

              {/* Info */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="text-xs font-medium text-accent uppercase tracking-wider">
                  {item.eventType}
                </span>
                <h3 className="text-xl font-serif font-medium text-white mt-1">
                  {item.coupleName}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-4xl w-full p-0 bg-primary border-none overflow-hidden">
          <button
            onClick={() => setSelectedItem(null)}
            className="absolute top-4 right-4 z-10 w-10 h-10 bg-primary/80 rounded-full flex items-center justify-center text-primary-foreground hover:bg-primary transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {selectedItem && (
            <div className="p-6">
              {/* Video Embed Placeholder */}
              <div className="aspect-video bg-charcoal-light rounded-lg flex items-center justify-center mb-6">
                <div className="text-center text-primary-foreground/60">
                  <Play className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-sm">
                    Video will load here
                    <br />
                    <span className="text-xs opacity-70">
                      Replace with your Vimeo embed
                    </span>
                  </p>
                </div>
              </div>

              {/* Video Info */}
              <div className="text-primary-foreground">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-medium text-accent uppercase tracking-wider">
                    {selectedItem.eventType}
                  </span>
                  <span className="text-xs text-primary-foreground/50">
                    {selectedItem.date}
                  </span>
                </div>
                <h3 className="text-2xl font-serif font-medium mb-3">
                  {selectedItem.coupleName}
                </h3>
                <p className="text-primary-foreground/80 italic">
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
