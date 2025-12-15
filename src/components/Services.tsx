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
    title: "Engagement & Pre-Wedding Stories",
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
    title: "Classic Sri Lankan Cultural Weddings",
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
    <section id="services" className="section-padding bg-background">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium text-foreground mb-4">
            Our Services
          </h2>
          <div className="w-24 h-px bg-accent mx-auto mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From intimate ceremonies to grand celebrations, we offer a range of
            filmmaking services tailored to your unique vision.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group bg-card border border-border rounded-2xl p-8 transition-all duration-300 hover:shadow-xl hover:shadow-accent/10 hover:-translate-y-1 hover:border-accent/30"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-accent group-hover:scale-110 transition-all duration-300">
                <service.icon className="w-7 h-7 text-accent-foreground group-hover:text-primary transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-serif font-medium text-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
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
