import { Instagram, Facebook, Youtube } from "lucide-react";
import logoIcon from "@/assets/serenity-logo-icon.png";

const footerLinks = [
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "About", href: "#about" },
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
    <footer className="bg-foreground text-background py-12 md:py-16">
      <div className="section-container">
        <div className="grid md:grid-cols-3 gap-10 md:gap-8 items-start mb-12">
          {/* Logo & Tagline */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
              <img
                src={logoIcon}
                alt="Serenity"
                className="w-10 h-10 brightness-0 invert"
              />
              <span className="font-serif text-xl font-medium">
                Serenity Wedding Films
              </span>
            </div>
            <p className="text-background/60 text-sm max-w-xs mx-auto md:mx-0">
              Cinematic wedding films crafted with elegance, emotion, and
              timeless beauty.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h4 className="font-medium mb-4 text-background/80">Quick Links</h4>
            <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {footerLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className="text-sm text-background/60 hover:text-background transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Social Links */}
          <div className="text-center md:text-right">
            <h4 className="font-medium mb-4 text-background/80">Follow Us</h4>
            <div className="flex justify-center md:justify-end gap-3">
              <a
                href="https://instagram.com/serenityweddingfilms"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-background/10 hover:bg-background/20 rounded-full flex items-center justify-center text-background/80 hover:text-background transition-all duration-200"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com/serenityweddingfilms"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-background/10 hover:bg-background/20 rounded-full flex items-center justify-center text-background/80 hover:text-background transition-all duration-200"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com/@serenityweddingfilms"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-background/10 hover:bg-background/20 rounded-full flex items-center justify-center text-background/80 hover:text-background transition-all duration-200"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-background/10 pt-8">
          <p className="text-center text-sm text-background/50">
            © {new Date().getFullYear()} Serenity Wedding Films. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
