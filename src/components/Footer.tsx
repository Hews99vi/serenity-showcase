import { Instagram, Facebook, Youtube, Mail, MapPin, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "@/assets/serenity-logo-full.png";
const footerLinksLeft = [{
  label: "Home",
  href: "/"
}, {
  label: "Our Work",
  href: "/portfolio"
}, {
  label: "Services",
  href: "/services"
}];
const footerLinksRight = [{
  label: "Testimonials",
  href: "/testimonials"
}, {
  label: "Contact",
  href: "/contact"
}];
const Footer = () => {
  return <footer className="relative bg-charcoal text-cream overflow-hidden">
      {/* Top decorative border */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/3 rounded-full blur-3xl pointer-events-none" />

      {/* Main content */}
      <div className="relative z-10 section-container py-20 md:py-24">
        
        {/* Upper section with logo and tagline centered */}
        <div className="text-center mb-16">
          <motion.img src={logo} alt="Serenity Wedding Films" className="h-20 md:h-24 w-auto mx-auto mb-6" initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6
        }} />
          <motion.p className="text-cream/50 font-serif text-lg md:text-xl italic tracking-wide max-w-md mx-auto" initial={{
          opacity: 0
        }} whileInView={{
          opacity: 1
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6,
          delay: 0.2
        }}>
            Where Serenity Meets Cinema, Love Becomes a Masterpiece
          </motion.p>
        </div>

        {/* Decorative divider */}
        <div className="flex items-center justify-center gap-4 mb-16">
          <span className="w-16 md:w-24 h-px bg-gradient-to-r from-transparent to-gold/30" />
          <Sparkles className="w-4 h-4 text-gold/50" />
          <span className="w-16 md:w-24 h-px bg-gradient-to-l from-transparent to-gold/30" />
        </div>

        {/* Main grid */}
        <div className="grid md:grid-cols-3 gap-12 md:gap-16 mb-16">
          
          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h4 className="text-xs tracking-[0.3em] uppercase mb-8 text-gold/80 font-medium">
              Navigation
            </h4>
            <div className="flex justify-center md:justify-start gap-12">
              <nav className="flex flex-col gap-4">
                {footerLinksLeft.map((link, index) => <motion.div key={link.href} initial={{
                opacity: 0,
                x: -10
              }} whileInView={{
                opacity: 1,
                x: 0
              }} viewport={{
                once: true
              }} transition={{
                duration: 0.4,
                delay: index * 0.1
              }}>
                    <Link to={link.href} className="text-sm text-cream/50 hover:text-cream hover:pl-2 transition-all duration-300 inline-block">
                      {link.label}
                    </Link>
                  </motion.div>)}
              </nav>
              <nav className="flex flex-col gap-4">
                {footerLinksRight.map((link, index) => <motion.div key={link.href} initial={{
                opacity: 0,
                x: -10
              }} whileInView={{
                opacity: 1,
                x: 0
              }} viewport={{
                once: true
              }} transition={{
                duration: 0.4,
                delay: index * 0.1
              }}>
                    <Link to={link.href} className="text-sm text-cream/50 hover:text-cream hover:pl-2 transition-all duration-300 inline-block">
                      {link.label}
                    </Link>
                  </motion.div>)}
              </nav>
            </div>
          </div>

          {/* Contact Info */}
          <div className="text-center">
            <h4 className="text-xs tracking-[0.3em] uppercase mb-8 text-gold/80 font-medium">
              Get in Touch
            </h4>
            <div className="flex flex-col gap-5">
              <motion.a href="mailto:hello@serenityweddingfilms.com" className="flex items-center justify-center gap-3 text-cream/50 hover:text-cream transition-colors duration-300 group" initial={{
              opacity: 0,
              y: 10
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.4
            }}>
                <Mail className="w-4 h-4 text-gold/60 group-hover:text-gold transition-colors" />
                <span className="text-sm">info@serenityweddingfilms.com</span>
              </motion.a>
              <motion.div className="flex items-center justify-center gap-3 text-cream/50" initial={{
              opacity: 0,
              y: 10
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.4,
              delay: 0.1
            }}>
                <MapPin className="w-4 h-4 text-gold/60" />
                <span className="text-sm">Sri Lanka </span>
              </motion.div>
            </div>
          </div>

          {/* Social Links */}
          <div className="text-center md:text-right">
            <h4 className="text-xs tracking-[0.3em] uppercase mb-8 text-gold/80 font-medium">
              Follow Our Journey
            </h4>
            <div className="flex justify-center md:justify-end gap-4">
              <motion.a href="https://instagram.com/serenityweddingfilms" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full border border-cream/15 flex items-center justify-center text-cream/50 hover:text-cream hover:border-gold/50 hover:bg-gold/10 transition-all duration-300" aria-label="Instagram" whileHover={{
              scale: 1.1
            }} whileTap={{
              scale: 0.95
            }}>
                <Instagram className="w-4 h-4" />
              </motion.a>
              <motion.a href="https://facebook.com/SerenityWeddingFilms" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full border border-cream/15 flex items-center justify-center text-cream/50 hover:text-cream hover:border-gold/50 hover:bg-gold/10 transition-all duration-300" aria-label="Facebook" whileHover={{
              scale: 1.1
            }} whileTap={{
              scale: 0.95
            }}>
                <Facebook className="w-4 h-4" />
              </motion.a>
              <motion.a href="https://www.youtube.com/@serenityweddingfilms" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full border border-cream/15 flex items-center justify-center text-cream/50 hover:text-cream hover:border-gold/50 hover:bg-gold/10 transition-all duration-300" aria-label="YouTube" whileHover={{
              scale: 1.1
            }} whileTap={{
              scale: 0.95
            }}>
                <Youtube className="w-4 h-4" />
              </motion.a>
              <motion.a href="https://tiktok.com/@serenityweddingfilms?_t=8hmv9VTaBx1&_r=1" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full border border-cream/15 flex items-center justify-center text-cream/50 hover:text-cream hover:border-gold/50 hover:bg-gold/10 transition-all duration-300" aria-label="TikTok" whileHover={{
              scale: 1.1
            }} whileTap={{
              scale: 0.95
            }}>
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </motion.a>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="pt-8 border-t border-cream/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[11px] text-cream/30 tracking-[0.15em] uppercase">
              © {new Date().getFullYear()} Serenity Wedding Films
            </p>
            <p className="text-[11px] text-cream/30 tracking-wide">
              Crafted with passion for storytelling
            </p>
          </div>
        </div>
      </div>

      {/* Bottom decorative border */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
    </footer>;
};
export default Footer;