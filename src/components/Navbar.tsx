import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/serenity-logo.png";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Services", href: "#services" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-charcoal/95 backdrop-blur-md py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="section-container">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("#home");
            }}
            className="flex items-center"
          >
            <img
              src={logo}
              alt="Serenity Wedding Films"
              className="h-8 md:h-10 w-auto brightness-0 invert"
            />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className="text-cream/80 hover:text-cream text-sm tracking-widest uppercase font-light transition-colors duration-300 link-underline"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Reserve Now Button */}
          <div className="hidden lg:block">
            <a
              href="#quote"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#quote");
              }}
              className="inline-flex items-center gap-2 bg-cream text-charcoal px-6 py-3 text-sm tracking-widest uppercase font-medium transition-all duration-300 hover:bg-cream/90 hover:scale-105"
            >
              Reserve Now
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-cream"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden fixed inset-0 top-0 bg-charcoal/98 backdrop-blur-lg transition-all duration-500 ${
            isOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          <div className="flex flex-col items-center justify-center h-full gap-8">
            {navLinks.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className="text-cream text-2xl font-serif tracking-wide transition-all duration-300 hover:text-cream/70"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#quote"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#quote");
              }}
              className="mt-4 inline-flex items-center gap-2 bg-cream text-charcoal px-8 py-4 text-sm tracking-widest uppercase font-medium"
            >
              Reserve Now
            </a>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-6 right-6 p-2 text-cream"
            aria-label="Close menu"
          >
            <X className="w-8 h-8" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
