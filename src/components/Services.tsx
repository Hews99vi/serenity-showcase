import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Check, Clock, Users, Video, Camera, Plane, Star } from "lucide-react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import servicesHero from "@/assets/services-hero.jpg";

const packages = [
  {
    name: "Classic Moments 4K",
    tagline: "Elegance Meets Technology",
    price: "100,000",
    currency: "LKR",
    popular: false,
    features: [
      { icon: Clock, text: "Up to 12 hours of exclusive coverage" },
      { icon: Users, text: "Two Professional Cinematographers" },
      { icon: Video, text: "1 Insta-Wed Bliss Reel (30 sec)" },
      { icon: Camera, text: "Cinematic Highlight Video 4K (3-8 min)" },
    ],
    equipment: ["Two Professional Cameras", "Dedicated Sound Recording", "Premium Color Grading"],
    delivery: "Via Drive Link in 4K",
  },
  {
    name: "Premier Classics 4K",
    tagline: "Enduring Memories in Cinematic Detail",
    price: "150,000",
    currency: "LKR",
    popular: true,
    features: [
      { icon: Clock, text: "Up to 12 hours of exclusive coverage" },
      { icon: Users, text: "Two Professional Cinematographers" },
      { icon: Video, text: "1 Insta-Wed Bliss Reel (30 sec)" },
      { icon: Camera, text: "Full-Length Wedding Video (30-60 min)" },
      { icon: Star, text: "Cinematic Trailer 4K (3-5 min)" },
    ],
    equipment: ["Two Professional Cameras", "Dedicated Sound Recording", "Premium Color Grading"],
    delivery: "Customized wooden box with flash drive & Drive Link in 4K",
  },
  {
    name: "Grand Moments 4K",
    tagline: "For Those Who Want It All",
    price: "225,000",
    currency: "LKR",
    popular: false,
    features: [
      { icon: Clock, text: "Up to 12 hours of exclusive coverage" },
      { icon: Users, text: "Three Professional Cinematographers" },
      { icon: Video, text: "2 Insta-Wed Bliss Reels (30 sec each)" },
      { icon: Camera, text: "Full-Length Wedding 4K Video (30-90 min)" },
      { icon: Star, text: "Cinematic Trailer 4K (5-8 min)" },
      { icon: Plane, text: "Drone Coverage Included" },
    ],
    equipment: ["Three Professional Cameras", "Dedicated Sound Recording", "Premium Color Grading"],
    delivery: "Customized wooden box with flash drive & Drive Link in 4K",
  },
];

const faqs = [
  {
    question: "How long does it take to receive the final wedding film?",
    answer: "The final edited video will be delivered within 3 months after the event. Wedding reels are typically delivered within 1-2 weeks. We kindly request clients not to inquire about delivery before this timeline, as editing requires careful attention to detail and storytelling.",
  },
  {
    question: "Will we receive raw footage from our wedding?",
    answer: "All final deliverables will be provided as edited films only. Raw footage will not be delivered under any circumstance, as it is part of the creative process and our unique cinematic style.",
  },
  {
    question: "How do we book Serenity Wedding Films?",
    answer: "To confirm your booking, a non-refundable advance payment of 25% of the full package price is required. Dates will not be reserved without the advance payment. The full payment must be completed before the event date. Payments can be made via bank transfer or other agreed-upon methods.",
  },
  {
    question: "Can we request revisions to the final edit?",
    answer: "One free revision is included for trailers and full videos. Extra revisions beyond this will incur an additional fee. No changes are made to reels. Please note that music selection cannot be changed as our editors carefully sync it to match the mood and flow of your video.",
  },
  {
    question: "What happens if our wedding is postponed?",
    answer: "If your wedding is postponed, please inform us at least 7 days in advance. Postponements exceeding 6 months may incur additional charges based on updated package rates. All advance payments are non-refundable.",
  },
  {
    question: "Do you cover destination weddings?",
    answer: "Yes, we cover weddings across Sri Lanka and internationally. Travel costs will be added for events outside the Colombo area. For destination weddings, the client must cover airfare and accommodation for the videography team.",
  },
  {
    question: "Do you share wedding videos on social media?",
    answer: "Serenity Wedding Films reserves the right to share highlights and selected clips on social media platforms. However, we absolutely respect your privacy — requests for non-publication must be made in advance.",
  },
];

const Services = () => {
  const location = useLocation();

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

  const scrollToPackages = () => {
    const element = document.getElementById("packages");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      {/* Hero Section - Full Viewport */}
      <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={servicesHero}
            alt="Cinematic wedding moment"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/80 via-charcoal/60 to-charcoal/90" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-gold text-sm tracking-[0.3em] uppercase font-light mb-6 block"
          >
            4K Cinematic Wedding Experiences
          </motion.span>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-medium text-cream leading-tight mb-8"
          >
            Where Serenity Meets Cinema,
            <br />
            <span className="text-gold-light">Love Becomes a Masterpiece</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl text-cream/70 max-w-3xl mx-auto font-light leading-relaxed mb-12"
          >
            Capturing timeless moments, one frame at a time. We specialize in turning your love story 
            into a cinematic masterpiece with breathtaking 4K clarity.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            onClick={scrollToPackages}
            className="group relative inline-flex items-center gap-3 px-8 py-4 border border-gold/50 text-cream hover:bg-gold/10 transition-all duration-500"
          >
            <span className="text-sm tracking-[0.2em] uppercase">View Our Packages</span>
            <svg
              className="w-4 h-4 transform group-hover:translate-y-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.button>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-cream/30 to-cream/60 animate-pulse" />
        </motion.div>
      </section>

      {/* Packages Section */}
      <section id="packages" className="py-24 md:py-32 bg-charcoal scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 md:mb-20"
          >
            <span className="text-gold text-sm tracking-[0.3em] uppercase font-light mb-4 block">
              Investment
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-cream mb-6">
              4K Cinematic Packages
            </h2>
            <div className="w-20 h-px bg-gold/50 mx-auto mb-6" />
            <p className="text-lg text-cream/60 max-w-2xl mx-auto font-light">
              Choose the perfect package to preserve your wedding day in stunning cinematic detail.
            </p>
          </motion.div>

          {/* Package Cards */}
          <div className="grid lg:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className={`relative group bg-charcoal-light/30 border transition-all duration-500 hover:bg-charcoal-light/50 ${
                  pkg.popular 
                    ? "border-gold/50 hover:border-gold" 
                    : "border-cream/10 hover:border-cream/30"
                }`}
              >
                {/* Popular Badge */}
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <span className="bg-gold text-charcoal text-xs tracking-[0.15em] uppercase px-4 py-2 font-medium">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="p-8 md:p-10">
                  {/* Package Name */}
                  <div className="mb-8">
                    <h3 className="text-2xl font-serif font-medium text-cream mb-2">
                      {pkg.name}
                    </h3>
                    <p className="text-cream/50 text-sm font-light">{pkg.tagline}</p>
                  </div>

                  {/* Price */}
                  <div className="mb-8 pb-8 border-b border-cream/10">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl md:text-5xl font-serif text-cream">{pkg.price}</span>
                      <span className="text-cream/50 text-sm">{pkg.currency}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-4 mb-8">
                    {pkg.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <feature.icon className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                        <span className="text-cream/80 text-sm leading-relaxed">{feature.text}</span>
                      </div>
                    ))}
                  </div>

                  {/* Equipment */}
                  <div className="mb-8">
                    <h4 className="text-xs tracking-[0.2em] uppercase text-cream/40 mb-3">Equipment</h4>
                    <div className="space-y-2">
                      {pkg.equipment.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-gold/70" />
                          <span className="text-cream/60 text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Delivery */}
                  <div className="pt-6 border-t border-cream/10">
                    <h4 className="text-xs tracking-[0.2em] uppercase text-cream/40 mb-2">Delivery</h4>
                    <p className="text-cream/70 text-sm">{pkg.delivery}</p>
                  </div>
                </div>

                {/* Hover accent line */}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold group-hover:w-full transition-all duration-500" />
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-16"
          >
            <p className="text-cream/50 text-sm mb-6">
              All packages include premium color grading and professional sound recording
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-3 px-10 py-4 bg-gold text-charcoal font-medium tracking-[0.1em] uppercase text-sm hover:bg-gold-light transition-all duration-300"
            >
              Request a Quote
            </a>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 md:py-32 bg-charcoal-light scroll-mt-24">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="text-gold text-sm tracking-[0.3em] uppercase font-light mb-4 block">
              Common Questions
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-cream mb-6">
              Frequently Asked
            </h2>
            <div className="w-20 h-px bg-gold/50 mx-auto" />
          </motion.div>

          {/* FAQ Accordion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border border-cream/10 bg-charcoal/50 px-6 rounded-none data-[state=open]:bg-charcoal data-[state=open]:border-gold/30 transition-all duration-300"
                >
                  <AccordionTrigger className="text-left text-cream font-medium py-6 hover:no-underline hover:text-gold transition-colors duration-300 font-serif text-lg">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-cream/60 pb-6 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>

          {/* Additional CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-12"
          >
            <p className="text-cream/50 text-sm">
              Have more questions?{" "}
              <a href="/contact" className="text-gold hover:text-gold-light transition-colors duration-300 underline underline-offset-4">
                Get in touch
              </a>
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Services;
