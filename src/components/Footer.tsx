import { Instagram, Facebook, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/serenity-logo-full.png";
const footerLinks = [{
  label: "Home",
  href: "/"
}, {
  label: "Our Work",
  href: "/portfolio"
}, {
  label: "Services",
  href: "/services"
}, {
  label: "Contact",
  href: "/contact"
}];
const Footer = () => {
  return <footer className="bg-charcoal text-cream py-16 md:py-20">
      <div className="section-container">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-3 gap-12 md:gap-8 items-start mb-16">
          {/* Logo & Tagline */}
          <div className="text-center md:text-left">
            <img src={logo} alt="Serenity Wedding Films" className="h-16 w-auto mx-auto md:mx-0 mb-4" />
            <p className="text-cream/60 leading-relaxed max-w-xs mx-auto md:mx-0 font-sans font-medium text-sm tracking-wide">Where Serenity Meets Cinema,
Love Becomes a Masterpiece</p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h4 className="text-sm tracking-[0.2em] uppercase mb-6 text-cream/60">
              Quick Links
            </h4>
            <nav className="flex flex-col gap-3">
              {footerLinks.map(link => <Link key={link.href} to={link.href} className="text-sm text-cream/50 hover:text-cream transition-colors duration-300">
                  {link.label}
                </Link>)}
            </nav>
          </div>

          {/* Social Links */}
          <div className="text-center md:text-right">
            <h4 className="text-sm tracking-[0.2em] uppercase mb-6 text-cream/60">
              Follow Us
            </h4>
            <div className="flex justify-center md:justify-end gap-3">
              <a href="https://instagram.com/serenityweddingfilms" target="_blank" rel="noopener noreferrer" className="w-12 h-12 border border-cream/20 flex items-center justify-center text-cream/60 hover:text-cream hover:border-cream/40 transition-all duration-300" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://facebook.com/serenityweddingfilms" target="_blank" rel="noopener noreferrer" className="w-12 h-12 border border-cream/20 flex items-center justify-center text-cream/60 hover:text-cream hover:border-cream/40 transition-all duration-300" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://youtube.com/@serenityweddingfilms" target="_blank" rel="noopener noreferrer" className="w-12 h-12 border border-cream/20 flex items-center justify-center text-cream/60 hover:text-cream hover:border-cream/40 transition-all duration-300" aria-label="YouTube">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="https://tiktok.com/@serenityweddingfilms" target="_blank" rel="noopener noreferrer" className="w-12 h-12 border border-cream/20 flex items-center justify-center text-cream/60 hover:text-cream hover:border-cream/40 transition-all duration-300" aria-label="TikTok">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
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
    </footer>;
};
export default Footer;