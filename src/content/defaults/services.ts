import type {
  ContactQuoteSection,
  ContactSection,
  FaqCallToActionSection,
  FaqGroup,
  FaqIntroSection,
  FaqItem,
  ServiceItem,
  ServicesHeroSection,
} from "@/types/content";

export const servicesHero: ServicesHeroSection = {
  eyebrow: "What We Offer",
  title: "Our Services",
  description:
    "From intimate ceremonies to grand celebrations, we offer premium filmmaking services tailored to your unique vision.",
  faqPromptEyebrow: "Have Questions?",
  faqPromptText: "Scroll to FAQ",
};

export const serviceItems: ServiceItem[] = [
  {
    id: "service-destination",
    iconName: "plane",
    title: "Destination Weddings",
    description:
      "Cinematic wedding films captured at breathtaking destinations worldwide. From tropical beaches to mountain retreats, we travel to document your dream wedding wherever love takes you.",
    sortOrder: 1,
  },
  {
    id: "service-cultural",
    iconName: "sparkles",
    title: "Classic Sri Lankan Cultural Weddings",
    description:
      "Expertise in capturing traditional Kandyan, Poruwa, and other cultural wedding ceremonies. We honor and preserve the rich heritage of Sri Lankan wedding traditions with elegance and authenticity.",
    sortOrder: 2,
  },
  {
    id: "service-engagement",
    iconName: "heart",
    title: "Engagement & Pre-Wedding Stories",
    description:
      "Romantic pre-wedding films and engagement coverage that tell your unique love story. Beautiful sessions in stunning locations before the big day arrives.",
    sortOrder: 3,
  },
];

export const servicesFaqIntro: FaqIntroSection = {
  eyebrow: "Everything You Need to Know",
  title: "We've Got Answers",
  description: "Your questions about Serenity Wedding Films, answered with care",
};

export const servicesFaqCta: FaqCallToActionSection = {
  title: "Still have questions?",
  description: "We'd love to hear from you and discuss your wedding vision",
  primaryButtonLabel: "Request a Quote",
  primaryButtonHref: "/contact",
  secondaryButtonLabel: "Chat on WhatsApp",
};

export const faqGroups: FaqGroup[] = [
  {
    id: "style",
    label: "Style & Services",
    iconName: "film",
    sortOrder: 1,
  },
  {
    id: "booking",
    label: "Booking & Coverage",
    iconName: "calendar",
    sortOrder: 2,
  },
  {
    id: "deliverables",
    label: "Deliverables & Timeline",
    iconName: "clock",
    sortOrder: 3,
  },
  {
    id: "policies",
    label: "Creative & Policies",
    iconName: "palette",
    sortOrder: 4,
  },
];

export const faqItems: FaqItem[] = [
  {
    id: "style-1",
    groupId: "style",
    question: "How would you describe your filming style?",
    answer:
      "Our style is cinematic, natural, and emotion-driven. We focus on capturing couples and people in their real moments as they naturally unfold - without staging or interrupting the flow of your day. The result is a film that feels honest, timeless, and deeply personal.",
    sortOrder: 1,
  },
  {
    id: "style-2",
    groupId: "style",
    question: "Do you offer 4K wedding films?",
    answer:
      "Yes. We exclusively film and deliver in 4K. Full HD is becoming outdated, and 4K ensures superior clarity, richer detail, and long-lasting quality for years to come.",
    sortOrder: 2,
  },
  {
    id: "style-3",
    groupId: "style",
    question: "How many videographers will be present?",
    answer:
      "We provide a minimum of two professional videographers. Relying on a single videographer carries the risk of missing real moments, so we ensure multiple angles and complete coverage throughout your day.",
    sortOrder: 3,
  },
  {
    id: "style-4",
    groupId: "style",
    question: "Do you record sound during the wedding?",
    answer:
      "Yes. We professionally record audio using dedicated sound-recording technology to capture vows, speeches, and important moments clearly.",
    sortOrder: 4,
  },
  {
    id: "booking-1",
    groupId: "booking",
    question: "How do we book Serenity Wedding Films?",
    answer:
      "Simply submit the Request a Quote form on our website. We will respond within 24 hours with availability and next steps.",
    sortOrder: 1,
  },
  {
    id: "booking-2",
    groupId: "booking",
    question: "Do you cover events outside Colombo?",
    answer:
      "Yes, we cover weddings across Sri Lanka. Travel arrangements and related costs will be clearly discussed during the booking process.",
    sortOrder: 2,
  },
  {
    id: "booking-3",
    groupId: "booking",
    question: "Do you cover more than one wedding per day?",
    answer:
      "No. We strictly cover only one wedding per day to ensure full attention, creativity, and quality for every couple.",
    sortOrder: 3,
  },
  {
    id: "booking-4",
    groupId: "booking",
    question: "Do you offer pre-wedding shoots and homecoming coverage?",
    answer:
      "Yes. Pre-wedding films, engagements, and homecomings are available as add-on services or included in selected packages.",
    sortOrder: 4,
  },
  {
    id: "deliverables-1",
    groupId: "deliverables",
    question: "How long will our wedding film be?",
    answer:
      "Film length depends entirely on the event and package selected. Highlight films usually range from 3-8 minutes, while full cinematic wedding films can be 40-90 minutes or longer, based on coverage and traditions.",
    sortOrder: 1,
  },
  {
    id: "deliverables-2",
    groupId: "deliverables",
    question: "How long does it take to receive the final film?",
    answer:
      "Wedding reels: Delivered within 1-2 weeks. Full wedding films: Delivered within 8-12 weeks. Delivery time may vary depending on season and editing complexity, but quality and storytelling are always our priority.",
    sortOrder: 2,
  },
  {
    id: "deliverables-3",
    groupId: "deliverables",
    question: "How will our final film be delivered?",
    answer:
      "Your wedding film will be delivered digitally via a secure online link, allowing easy viewing, downloading, and sharing.",
    sortOrder: 3,
  },
  {
    id: "deliverables-4",
    groupId: "deliverables",
    question: "Will we receive raw footage?",
    answer:
      "No. We deliver only the final, professionally edited film that represents our creative vision and quality standards.",
    sortOrder: 4,
  },
  {
    id: "policies-1",
    groupId: "policies",
    question: "Do you provide photography services?",
    answer:
      "No. We specialize exclusively in wedding videography. Videography requires different techniques, equipment, and creative focus than photography.",
    sortOrder: 1,
  },
  {
    id: "policies-2",
    groupId: "policies",
    question: "Can we request music changes in the final edit?",
    answer:
      "Please note that music selection cannot be changed. Our editors carefully choose and sync music to match the mood, pacing, and emotional flow of your film.",
    sortOrder: 2,
  },
  {
    id: "policies-3",
    groupId: "policies",
    question: "Do you publish every wedding video on social media?",
    answer:
      "Absolutely not. We respect your privacy. Wedding films are shared publicly only with your permission.",
    sortOrder: 3,
  },
];

export const contactQuoteSection: ContactQuoteSection = {
  eyebrow: "Get in Touch",
  title: "Reserve Your Date",
  description:
    "We're honoured to be part of your special day. Share your details below, and we'll get back to you with availability, pricing, and next steps.",
  quoteText: '"Every love story deserves to be told beautifully."',
};

export const contactSection: ContactSection = {
  eyebrow: "Connect",
  title: "Let's Talk",
  socialHeading: "Follow Our Journey",
  whatsappEyebrow: "Chat with us",
  whatsappLabel: "WhatsApp",
  emailEyebrow: "Email us",
};
