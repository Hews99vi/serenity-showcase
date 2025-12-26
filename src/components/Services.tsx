import { Plane, Sparkles, Heart } from "lucide-react";
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
  return (
    <>
      {/* Services Section */}
      <section id="services" className="section-padding bg-cream">
        <div className="section-container">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="text-charcoal/50 text-sm tracking-[0.3em] uppercase font-light mb-4 block">
              What We Offer
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-charcoal mb-6">
              Our Services
            </h2>
            <div className="w-20 h-px bg-charcoal/30 mx-auto mb-8" />
            <p className="text-lg text-charcoal/70 max-w-2xl mx-auto font-light">
              From intimate ceremonies to grand celebrations, we offer premium
              filmmaking services tailored to your unique vision.
            </p>
          </div>

          {/* Services Grid - 3 Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.title}
                className="group bg-white p-10 md:p-12 transition-all duration-500 hover:bg-charcoal border border-charcoal/10 hover:border-charcoal"
              >
                <div className="mb-8">
                  <service.icon className="w-12 h-12 text-charcoal group-hover:text-cream transition-colors duration-500" />
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

      {/* FAQ Section */}
      <section id="faq" className="section-padding bg-white">
        <div className="section-container max-w-4xl">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="text-charcoal/50 text-sm tracking-[0.3em] uppercase font-light mb-4 block">
              Got Questions?
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-charcoal mb-6">
              Frequently Asked Questions
            </h2>
            <div className="w-20 h-px bg-charcoal/30 mx-auto" />
          </div>

          {/* FAQ Accordion */}
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-charcoal/10 bg-cream/50 px-6 rounded-none data-[state=open]:bg-cream"
              >
                <AccordionTrigger className="text-left text-charcoal font-medium py-6 hover:no-underline hover:text-charcoal/80 font-serif text-lg">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-charcoal/70 pb-6 leading-relaxed">
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
