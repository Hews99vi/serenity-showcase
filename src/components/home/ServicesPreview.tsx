import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const services = [
  {
    id: "weddings",
    title: "Weddings",
    description:
      "Documenting every unforgettable moment of your big day with authenticity, elegance, and cinematic artistry.",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "engagements",
    title: "Engagements",
    description:
      "Beautifully capturing the start of your journey together, with creative and personalized filming that tells your unique story.",
    image:
      "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "homecoming",
    title: "Homecoming",
    description:
      "Celebrate your relationship with natural and candid filmmaking that preserves traditional ceremonies beautifully.",
    image:
      "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  },
];

const ServicesPreview = () => {
  const [activeService, setActiveService] = useState(services[0]);

  return (
    <section className="section-padding bg-cream relative overflow-hidden">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-charcoal/50 text-xs tracking-[0.3em] uppercase font-light mb-4 block">
            What We Offer
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-charcoal mb-6">
            Our Services
          </h2>
          <p className="text-charcoal/70 text-lg max-w-2xl mx-auto">
            From the First Look to Forever, we offer a range of filmmaking
            services designed to celebrate love in all its forms.
          </p>
        </div>

        {/* Services Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <img
              src={activeService.image}
              alt={activeService.title}
              className="w-full h-full object-cover transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent" />
          </div>

          {/* Tabs */}
          <div className="space-y-0">
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => setActiveService(service)}
                className={`w-full text-left p-8 border-b border-charcoal/10 transition-all duration-500 group ${
                  activeService.id === service.id
                    ? "bg-charcoal"
                    : "bg-transparent hover:bg-charcoal/5"
                }`}
              >
                <h3
                  className={`text-2xl font-serif font-medium mb-3 transition-colors duration-500 ${
                    activeService.id === service.id
                      ? "text-cream"
                      : "text-charcoal"
                  }`}
                >
                  {service.title}
                </h3>
                <p
                  className={`text-sm leading-relaxed transition-colors duration-500 ${
                    activeService.id === service.id
                      ? "text-cream/70"
                      : "text-charcoal/60"
                  }`}
                >
                  {service.description}
                </p>
              </button>
            ))}

            {/* View All Services Link */}
            <Link
              to="/services"
              className="group inline-flex items-center gap-3 text-charcoal hover:text-charcoal/70 text-sm tracking-widest uppercase font-medium transition-all duration-300 mt-8 ml-8"
            >
              View All Services
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;
