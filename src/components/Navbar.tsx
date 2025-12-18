import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "@/assets/serenity-logo-full.png";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Our Work", href: "/portfolio" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // On home page: transparent when not scrolled, dark when scrolled
  // On other pages: always dark background
  const navBackground = isScrolled || !isHomePage
    ? "bg-charcoal/95 backdrop-blur-md py-3"
    : "bg-transparent py-6";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBackground}`}
    >
      <div className="section-container">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src={logo}
              alt="Serenity Wedding Films"
              className="h-12 md:h-16 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-xs tracking-[0.2em] uppercase transition-colors duration-300 link-underline ${
                  location.pathname === link.href
                    ? "text-cream"
                    : "text-cream/80 hover:text-cream"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Reserve Now Button */}
          <div className="hidden lg:block">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-cream text-charcoal px-6 py-3 text-sm tracking-widest uppercase font-medium transition-all duration-300 hover:bg-cream/90 hover:scale-105"
            >
              Reserve Now
            </Link>
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
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setIsOpen(false)}
                className={`text-2xl font-serif tracking-wide transition-all duration-300 ${
                  location.pathname === link.href
                    ? "text-cream"
                    : "text-cream/70 hover:text-cream"
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="mt-4 inline-flex items-center gap-2 bg-cream text-charcoal px-8 py-4 text-sm tracking-widest uppercase font-medium"
            >
              Reserve Now
            </Link>
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
