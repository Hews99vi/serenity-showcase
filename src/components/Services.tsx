import { Plane, Sparkles, Heart } from "lucide-react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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

const faqs = [
  {
    question: "How would you describe your filming style?",
    answer:
      "Our style is cinematic, natural, and emotion-driven. We focus on capturing couples and people in their real moments as they naturally unfold — without staging or interrupting the flow of your day. The result is a film that feels honest, timeless, and deeply personal.",
  },
  {
    question: "Do you offer 4K wedding films?",
    answer:
      "Yes. We exclusively film and deliver in 4K. Full HD is becoming outdated, and 4K ensures superior clarity, richer detail, and long-lasting quality for years to come.",
  },
  {
    question: "How long will our wedding film be?",
    answer:
      "Film length depends entirely on the event and package selected. Highlight films usually range from 3–8 minutes, while full cinematic wedding films can be 40–90 minutes or longer, based on coverage and traditions.",
  },
  {
    question: "How many videographers will be present?",
    answer:
      "We provide a minimum of two professional videographers. Relying on a single videographer carries the risk of missing real moments, so we ensure multiple angles and complete coverage throughout your day.",
  },
  {
    question: "Do you cover events outside Colombo?",
    answer:
      "Yes, we cover weddings across Sri Lanka. Travel arrangements and related costs will be clearly discussed during the booking process.",
  },
  {
    question: "Do you offer pre-wedding shoots and homecoming coverage?",
    answer:
      "Yes. Pre-wedding films, engagements, and homecomings are available as add-on services or included in selected packages.",
  },
  {
    question: "Will we receive raw footage?",
    answer:
      "No. We deliver only the final, professionally edited film that represents our creative vision and quality standards.",
  },
  {
    question: "How long does it take to receive the final film?",
    answer:
      "Wedding reels: Delivered within 1–2 weeks. Full wedding films: Delivered within 8–12 weeks. Delivery time may vary depending on season and editing complexity, but quality and storytelling are always our priority.",
  },
  {
    question: "How do we book Serenity Wedding Films?",
    answer:
      "Simply submit the Request a Quote form on our website. We will respond within 24 hours with availability and next steps.",
  },
  {
    question: "How will our final film be delivered?",
    answer:
      "Your wedding film will be delivered digitally via a secure online link, allowing easy viewing, downloading, and sharing.",
  },
  {
    question: "Do you cover more than one wedding per day?",
    answer:
      "No. We strictly cover only one wedding per day to ensure full attention, creativity, and quality for every couple.",
  },
  {
    question: "Do you provide photography services?",
    answer:
      "No. We specialize exclusively in wedding videography. Videography requires different techniques, equipment, and creative focus than photography.",
  },
  {
    question: "Do you record sound during the wedding?",
    answer:
      "Yes. We professionally record audio using dedicated sound-recording technology to capture vows, speeches, and important moments clearly.",
  },
  {
    question: "Do you publish every wedding video on social media?",
    answer:
      "Absolutely not. We respect your privacy. Wedding films are shared publicly only with your permission.",
  },
  {
    question: "Can we request music changes in the final edit?",
    answer:
      "Please note that music selection cannot be changed. Our editors carefully choose and sync music to match the mood, pacing, and emotional flow of your film.",
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
      <section id="faq" className="section-padding bg-charcoal-light scroll-mt-24">
        <div className="section-container max-w-4xl">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="text-cream/50 text-sm tracking-[0.3em] uppercase font-light mb-4 block">
              Got Questions?
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-cream mb-6">
              Frequently Asked Questions
            </h2>
            <div className="w-20 h-px bg-cream/30 mx-auto" />
          </div>

          {/* FAQ Accordion */}
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-cream/10 bg-charcoal/50 px-6 rounded-none data-[state=open]:bg-charcoal data-[state=open]:border-cream/20"
              >
                <AccordionTrigger className="text-left text-cream font-medium py-6 hover:no-underline hover:text-cream/80 font-serif text-lg">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-cream/60 pb-6 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  );
};

export default Services;
