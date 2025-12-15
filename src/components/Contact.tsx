import { MessageCircle, Mail, Instagram, Facebook, Youtube, ArrowUpRight } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="section-padding bg-cream">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="text-charcoal/50 text-sm tracking-[0.3em] uppercase font-light mb-4 block">
            Connect
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-charcoal mb-6">
            Let's Talk
          </h2>
          <div className="w-20 h-px bg-charcoal/30 mx-auto" />
        </div>

        {/* Contact Grid */}
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {/* WhatsApp */}
            <a
              href="https://wa.me/94771234567?text=Hi,%20I'm%20interested%20in%20your%20wedding%20films.%20Can%20we%20discuss%20my%20upcoming%20wedding?"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between bg-charcoal text-cream p-8 transition-all duration-500 hover:bg-charcoal/90"
            >
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-cream/10 flex items-center justify-center">
                  <MessageCircle className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-cream/60 text-sm tracking-wider uppercase mb-1">Chat with us</p>
                  <p className="text-xl font-serif">WhatsApp</p>
                </div>
              </div>
              <ArrowUpRight className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>

            {/* Email */}
            <a
              href="mailto:hello@serenityweddingfilms.com"
              className="group flex items-center justify-between bg-charcoal/5 text-charcoal p-8 transition-all duration-500 hover:bg-charcoal hover:text-cream border border-charcoal/10"
            >
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-charcoal/10 group-hover:bg-cream/10 flex items-center justify-center transition-colors duration-500">
                  <Mail className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-charcoal/60 group-hover:text-cream/60 text-sm tracking-wider uppercase mb-1 transition-colors duration-500">Email us</p>
                  <p className="text-xl font-serif">hello@serenity.com</p>
                </div>
              </div>
              <ArrowUpRight className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          </div>

          {/* Social Media */}
          <div className="text-center">
            <p className="text-charcoal/60 text-sm tracking-[0.2em] uppercase mb-8">
              Follow Our Journey
            </p>
            <div className="flex justify-center gap-4">
              <a
                href="https://instagram.com/serenityweddingfilms"
                target="_blank"
                rel="noopener noreferrer"
                className="w-16 h-16 border border-charcoal/20 flex items-center justify-center text-charcoal hover:bg-charcoal hover:text-cream transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href="https://facebook.com/serenityweddingfilms"
                target="_blank"
                rel="noopener noreferrer"
                className="w-16 h-16 border border-charcoal/20 flex items-center justify-center text-charcoal hover:bg-charcoal hover:text-cream transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a
                href="https://youtube.com/@serenityweddingfilms"
                target="_blank"
                rel="noopener noreferrer"
                className="w-16 h-16 border border-charcoal/20 flex items-center justify-center text-charcoal hover:bg-charcoal hover:text-cream transition-all duration-300"
                aria-label="YouTube"
              >
                <Youtube className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
