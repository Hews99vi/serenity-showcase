import { Instagram, Facebook, Youtube, Mail, MapPin, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import logo from "@/assets/serenity-logo-full.png";

const socialLinks = [
  {
    href: "https://wa.me/94712345678",
    label: "WhatsApp",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
  {
    href: "https://instagram.com/serenityweddingfilms",
    label: "Instagram",
    icon: <Instagram className="w-4 h-4" />,
  },
  {
    href: "https://facebook.com/SerenityWeddingFilms",
    label: "Facebook",
    icon: <Facebook className="w-4 h-4" />,
  },
  {
    href: "https://www.youtube.com/@serenityweddingfilms",
    label: "YouTube",
    icon: <Youtube className="w-4 h-4" />,
  },
  {
    href: "https://tiktok.com/@serenityweddingfilms?_t=8hmv9VTaBx1&_r=1",
    label: "TikTok",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
      </svg>
    ),
  },
];

const Footer = () => {
  return (
    <footer className="relative bg-charcoal text-cream overflow-hidden">
      {/* Top decorative border */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-gold/3 rounded-full blur-3xl pointer-events-none" />

      {/* Main content */}
      <div className="relative z-10 px-6 md:px-12 lg:px-20 py-16 md:py-20">
        
        {/* Logo & Tagline Section - Preserved */}
        <div className="text-center mb-12 md:mb-16">
          <motion.img
            src={logo}
            alt="Serenity Wedding Films"
            className="h-16 md:h-20 lg:h-24 w-auto mx-auto mb-4 md:mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          />
          <motion.p
            className="text-cream/50 font-serif text-base md:text-lg lg:text-xl italic tracking-wide max-w-md mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Where Serenity Meets Cinema, Love Becomes a Masterpiece
          </motion.p>
        </div>

        {/* Decorative divider */}
        <div className="flex items-center justify-center gap-4 mb-12 md:mb-16">
          <span className="w-16 md:w-24 h-px bg-gradient-to-r from-transparent to-gold/30" />
          <Sparkles className="w-4 h-4 text-gold/50" />
          <span className="w-16 md:w-24 h-px bg-gradient-to-l from-transparent to-gold/30" />
        </div>

        {/* Minimalist Content Grid */}
        <div className="max-w-4xl mx-auto">
          
          {/* Social Links - Centered & Prominent */}
          <motion.div 
            className="flex justify-center gap-4 md:gap-5 mb-10 md:mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 md:w-12 md:h-12 rounded-full border border-cream/20 flex items-center justify-center text-cream/60 hover:text-cream hover:border-gold/60 hover:bg-gold/10 transition-all duration-300"
                aria-label={social.label}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                {social.icon}
              </motion.a>
            ))}
          </motion.div>

          {/* Contact Info - Simple & Clean */}
          <motion.div 
            className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 mb-10 md:mb-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <a
              href="mailto:info@serenityweddingfilms.com"
              className="flex items-center gap-2.5 text-cream/50 hover:text-cream transition-colors duration-300 group"
            >
              <Mail className="w-4 h-4 text-gold/60 group-hover:text-gold transition-colors" />
              <span className="text-sm tracking-wide">info@serenityweddingfilms.com</span>
            </a>
            <div className="flex items-center gap-2.5 text-cream/50">
              <MapPin className="w-4 h-4 text-gold/60" />
              <span className="text-sm tracking-wide">Sri Lanka</span>
            </div>
          </motion.div>

        </div>

        {/* Bottom Bar - Clean & Professional */}
        <div className="pt-8 md:pt-10 border-t border-cream/10">
          <div className="flex flex-col gap-4 md:flex-row items-center justify-between">
            
            {/* Copyright - Left */}
            <p className="text-[10px] md:text-[11px] text-cream/40 tracking-[0.12em] uppercase order-1">
              © 2025 Serenity Wedding Films
            </p>

            {/* Photography Credits - Center */}
            <p className="text-[10px] md:text-[11px] text-cream/30 tracking-wide italic order-2">
              All photographs are the property of their respective owners
            </p>

            {/* Company Legal Name - Right */}
            <p className="text-[10px] md:text-[11px] text-cream/50 tracking-[0.15em] uppercase font-medium order-3">
              SERENITY WEDDING FILMS (PVT) LTD
            </p>

          </div>
        </div>
      </div>

      {/* Bottom decorative border */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
    </footer>
  );
};

export default Footer;
