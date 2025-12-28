import { Plane, Sparkles, Heart } from "lucide-react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import FAQSection from "@/components/services/FAQSection";

const services = [
  {
    icon: Plane,
    title: "Destination Weddings",
    description:
      "Cinematic wedding films captured at breathtaking destinations worldwide. From tropical beaches to mountain retreats, we travel to document your dream wedding wherever love takes you.",
  },
  {
    icon: Sparkles,
    title: "Classic Sri Lankan Cultural Weddings",
    description:
      "Expertise in capturing traditional Kandyan, Poruwa, and other cultural wedding ceremonies. We honor and preserve the rich heritage of Sri Lankan wedding traditions with elegance and authenticity.",
  },
  {
    icon: Heart,
    title: "Engagement & Pre-Wedding Stories",
    description:
      "Romantic pre-wedding films and engagement coverage that tell your unique love story. Beautiful sessions in stunning locations before the big day arrives.",
  },
];

const Services = () => {
  const location = useLocation();

  // Smooth scroll to FAQ section when navigating with hash
  useEffect(() => {
    if (location.hash === "#faq") {
      setTimeout(() => {
        const element = document.getElementById("faq");
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  }, [location]);

  return (
    <>
      {/* Services Section - Full Viewport */}
      <section id="services" className="min-h-[100svh] bg-charcoal flex flex-col justify-center px-6 md:px-12 lg:px-20 pt-20 pb-8">
        <div className="max-w-7xl mx-auto w-full">
          {/* Section Header */}
          <div className="text-center mb-10 md:mb-12">
            <span className="text-cream/50 text-sm tracking-[0.3em] uppercase font-light mb-3 block">
              What We Offer
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-cream mb-4">
              Our Services
            </h2>
            <div className="w-16 h-px bg-cream/30 mx-auto mb-5" />
            <p className="text-base md:text-lg text-cream/70 max-w-2xl mx-auto font-light">
              From intimate ceremonies to grand celebrations, we offer premium
              filmmaking services tailored to your unique vision.
            </p>
          </div>

          {/* Services Grid - 3 Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div
                key={service.title}
                className="group relative bg-charcoal-light/50 p-8 md:p-10 transition-all duration-500 border border-cream/10 hover:border-cream/30 hover:bg-charcoal-light"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Accent line */}
                <div className="absolute top-0 left-0 w-0 h-0.5 bg-cream/60 group-hover:w-full transition-all duration-500" />
                
                <div className="mb-6">
                  <div className="w-14 h-14 border border-cream/20 flex items-center justify-center group-hover:border-cream/40 transition-colors duration-500">
                    <service.icon className="w-7 h-7 text-cream/70 group-hover:text-cream transition-colors duration-500" />
                  </div>
                </div>
                <h3 className="text-lg md:text-xl font-serif font-medium text-cream mb-3">
                  {service.title}
                </h3>
                <p className="text-sm md:text-base text-cream/60 leading-relaxed group-hover:text-cream/80 transition-colors duration-500">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />
    </>
  );
};

export default Services;
