import { Link } from "react-router-dom";

const categories = [
  {
    id: "teasers",
    title: "TEASERS",
    duration: "60-90 secs",
    description: "A cinematic trailer, perfect for sharing on social media to create an air of suspense and anticipation for the main wedding film.",
    thumbnails: [
      "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1591604466107-ec97de577aff?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    ],
  },
  {
    id: "highlights",
    title: "HIGHLIGHTS",
    duration: "3-5 mins",
    description: "Designed around each individual couple, a highlight showcases all the best shots from your big day, edited with precision to fit the tone of your wedding.",
    thumbnails: [
      "https://images.unsplash.com/photo-1591604466107-ec97de577aff?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    ],
  },
  {
    id: "full-films",
    title: "FULL FILMS",
    duration: "45 mins +",
    description: "A traditional, full-length wedding film, featuring the entire event edited in chronological order, from preparations to the end of the night.",
    thumbnails: [
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1591604466107-ec97de577aff?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    ],
  },
];

const FilmCategories = () => {
  return (
    <section className="py-16 md:py-24 bg-charcoal">
      <div className="section-container">
        {categories.map((category, index) => (
          <div
            key={category.id}
            className={`${index !== 0 ? "mt-20 md:mt-28" : ""}`}
          >
            {/* Category Header */}
            <div className="flex items-center gap-4 mb-4">
              <h2 className="text-2xl md:text-3xl font-serif text-cream tracking-wider">
                {category.title}
              </h2>
              <span className="px-4 py-1.5 border border-cream/30 text-cream/60 text-xs tracking-wider">
                {category.duration}
              </span>
            </div>

            {/* Description */}
            <p className="text-cream/50 text-sm md:text-base max-w-xl leading-relaxed mb-6">
              {category.description}
            </p>

            {/* View All Link */}
            <Link
              to="/portfolio"
              className="text-cream/60 text-xs tracking-[0.2em] uppercase hover:text-cream transition-colors duration-300 link-underline inline-block mb-8"
            >
              view all
            </Link>

            {/* Thumbnails Grid */}
            <div className="flex gap-3 overflow-x-auto pb-4 -mx-6 px-6 scrollbar-hide">
              {category.thumbnails.map((thumb, thumbIndex) => (
                <Link
                  key={thumbIndex}
                  to="/portfolio"
                  className="group flex-shrink-0 w-[180px] md:w-[200px]"
                >
                  <div className="relative aspect-[2/3] overflow-hidden bg-charcoal-light">
                    <img
                      src={thumb}
                      alt={`${category.title} film ${thumbIndex + 1}`}
                      className="absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-105 grayscale-[30%] group-hover:grayscale-0"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-charcoal/20 group-hover:bg-transparent transition-colors duration-500" />
                    <div className="absolute inset-2 border border-cream/5 group-hover:border-cream/20 transition-colors duration-500" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FilmCategories;
