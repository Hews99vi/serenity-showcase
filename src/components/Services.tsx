import {
  Film,
  Heart,
  Home,
  Mountain,
  Sparkles,
  Building2,
} from "lucide-react";

const services = [
  {
    icon: Film,
    title: "Cinematic Wedding Films",
    description:
      "Full-length wedding films crafted with cinematic storytelling, capturing every emotional moment of your special day.",
  },
  {
    icon: Heart,
    title: "Engagement & Pre-Wedding",
    description:
      "Romantic pre-wedding shoots that tell your love story in stunning locations before the big day arrives.",
  },
  {
    icon: Home,
    title: "Homecoming Films",
    description:
      "Beautiful documentation of traditional homecoming ceremonies, preserving cultural moments with elegance.",
  },
  {
    icon: Mountain,
    title: "Outdoor Scenic Shoots",
    description:
      "Breathtaking outdoor sessions in Sri Lanka's most stunning natural landscapes and scenic locations.",
  },
  {
    icon: Sparkles,
    title: "Cultural Weddings",
    description:
      "Expertise in capturing traditional Kandyan, Poruwa, and other cultural wedding ceremonies.",
  },
  {
    icon: Building2,
    title: "Modern Hotel Weddings",
    description:
      "Elegant coverage of contemporary hotel weddings with sophisticated cinematography and style.",
  },
];

const Services = () => {
  return (
    <section id="services" className="section-padding bg-cream">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="text-charcoal/50 text-sm tracking-[0.3em] uppercase font-light mb-4 block">
            What We Offer
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-charcoal mb-6">
            Our Services
          </h2>
          <div className="w-20 h-px bg-charcoal/30 mx-auto mb-8" />
          <p className="text-lg text-charcoal/70 max-w-2xl mx-auto font-light">
            From intimate ceremonies to grand celebrations, we offer a range of
            filmmaking services tailored to your unique vision.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-charcoal/10">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group bg-cream p-10 md:p-12 transition-all duration-500 hover:bg-charcoal"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-8">
                <service.icon className="w-10 h-10 text-charcoal group-hover:text-cream transition-colors duration-500" />
              </div>
              <h3 className="text-xl font-serif font-medium text-charcoal group-hover:text-cream mb-4 transition-colors duration-500">
                {service.title}
              </h3>
              <p className="text-charcoal/70 group-hover:text-cream/70 leading-relaxed transition-colors duration-500">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
