import { useState, useEffect } from "react";

const navItems = [
  { id: "featured", label: "FEATURED" },
  { id: "testimonials", label: "TESTIMONIALS" },
  { id: "destinations", label: "DESTINATIONS" },
  { id: "engagements", label: "ENGAGEMENTS" },
  { id: "contact", label: "CONTACT" },
];

const SideNav = () => {
  const [activeSection, setActiveSection] = useState("featured");

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden xl:block">
      <div className="bg-charcoal/80 backdrop-blur-sm rounded-lg px-4 py-3 border border-cream/10">
        <ul className="space-y-3">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => scrollToSection(item.id)}
                className={`text-xs tracking-[0.15em] transition-colors duration-300 text-right block w-full ${
                  activeSection === item.id
                    ? "text-cream"
                    : "text-cream/50 hover:text-cream/80"
                }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default SideNav;
