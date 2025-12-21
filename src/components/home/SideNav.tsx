import { useState, useEffect } from "react";

const navItems = [
  { id: "featured", label: "OUR WORK" },
  { id: "testimonials", label: "TESTIMONIALS" },
  { id: "contact", label: "CONTACT" },
];

// IDs of sections that have light/cream backgrounds
const lightSections = ["philosophy"];

const SideNav = () => {
  const [activeSection, setActiveSection] = useState("featured");
  const [isOverLightSection, setIsOverLightSection] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const navElement = document.querySelector('nav.fixed.right-8');
      if (!navElement) return;
      
      const navRect = navElement.getBoundingClientRect();
      const navCenterY = navRect.top + navRect.height / 2;
      
      // Check all sections to find which one the nav is currently over
      const allSections = document.querySelectorAll('section[id], div[id]');
      let foundLightSection = false;
      
      allSections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (navCenterY >= rect.top && navCenterY <= rect.bottom) {
          if (lightSections.includes(section.id)) {
            foundLightSection = true;
          }
        }
      });
      
      setIsOverLightSection(foundLightSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const textColor = isOverLightSection ? "text-charcoal" : "text-cream";
  const textColorMuted = isOverLightSection ? "text-charcoal/50 hover:text-charcoal/80" : "text-cream/50 hover:text-cream/80";

  return (
    <nav className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden xl:block transition-colors duration-300">
      <ul className="space-y-3">
        {navItems.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => scrollToSection(item.id)}
              className={`text-xs tracking-[0.15em] transition-colors duration-300 text-right block w-full ${
                isOverLightSection 
                  ? "text-charcoal hover:text-charcoal/70" 
                  : "text-cream hover:text-cream/70"
              }`}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SideNav;
