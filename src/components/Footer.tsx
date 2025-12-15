import { Instagram, Facebook, Youtube } from "lucide-react";
import logo from "@/assets/serenity-logo.png";

const footerLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

const Footer = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-charcoal text-cream py-16 md:py-20">
      <div className="section-container">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-3 gap-12 md:gap-8 items-start mb-16">
          {/* Logo & Tagline */}
          <div className="text-center md:text-left">
            <img
              src={logo}
              alt="Serenity Wedding Films"
              className="h-8 w-auto brightness-0 invert mx-auto md:mx-0 mb-6"
            />
            <p className="text-cream/50 text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
              Cinematic wedding films crafted with elegance, emotion, and
              timeless beauty.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h4 className="text-sm tracking-[0.2em] uppercase mb-6 text-cream/60">
              Quick Links
            </h4>
            <nav className="flex flex-col gap-3">
              {footerLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className="text-sm text-cream/50 hover:text-cream transition-colors duration-300"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Social Links */}
          <div className="text-center md:text-right">
            <h4 className="text-sm tracking-[0.2em] uppercase mb-6 text-cream/60">
              Follow Us
            </h4>
            <div className="flex justify-center md:justify-end gap-3">
              <a
                href="https://instagram.com/serenityweddingfilms"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 border border-cream/20 flex items-center justify-center text-cream/60 hover:text-cream hover:border-cream/40 transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com/serenityweddingfilms"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 border border-cream/20 flex items-center justify-center text-cream/60 hover:text-cream hover:border-cream/40 transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://youtube.com/@serenityweddingfilms"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 border border-cream/20 flex items-center justify-center text-cream/60 hover:text-cream hover:border-cream/40 transition-all duration-300"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-cream/10 pt-8">
          <p className="text-center text-xs text-cream/40 tracking-wider">
            © {new Date().getFullYear()} Serenity Wedding Films. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
