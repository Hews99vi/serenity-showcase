import { MessageCircle, Mail, Instagram, Facebook, Youtube } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="section-padding bg-primary">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium text-primary-foreground mb-4">
            Let's Connect
          </h2>
          <div className="w-24 h-px bg-accent mx-auto mb-6" />
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            Ready to capture your special moments? Reach out to us through any
            of these channels.
          </p>
        </div>

        {/* Contact Options */}
        <div className="max-w-3xl mx-auto">
          <div className="grid sm:grid-cols-2 gap-6 mb-12">
            {/* WhatsApp */}
            <a
              href="https://wa.me/94771234567?text=Hi,%20I'm%20interested%20in%20your%20wedding%20films.%20Can%20we%20discuss%20my%20upcoming%20wedding?"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 bg-green-500 hover:bg-green-600 text-white p-6 rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
            >
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <MessageCircle className="w-7 h-7" />
              </div>
              <div>
                <p className="text-sm opacity-80 mb-1">Chat with us</p>
                <p className="text-lg font-medium">WhatsApp</p>
              </div>
            </a>

            {/* Email */}
            <a
              href="mailto:hello@serenityweddingfilms.com"
              className="group flex items-center gap-4 bg-primary-foreground/10 hover:bg-primary-foreground/20 text-primary-foreground p-6 rounded-2xl transition-all duration-300 hover:scale-[1.02] border border-primary-foreground/20"
            >
              <div className="w-14 h-14 bg-accent/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Mail className="w-7 h-7 text-accent" />
              </div>
              <div>
                <p className="text-sm opacity-80 mb-1">Email us</p>
                <p className="text-lg font-medium">hello@serenityweddingfilms.com</p>
              </div>
            </a>
          </div>

          {/* Social Media */}
          <div className="text-center">
            <p className="text-primary-foreground/60 text-sm mb-6">
              Follow us on social media
            </p>
            <div className="flex justify-center gap-4">
              <a
                href="https://instagram.com/serenityweddingfilms"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-primary-foreground/10 hover:bg-accent rounded-full flex items-center justify-center text-primary-foreground hover:text-accent-foreground transition-all duration-300 hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com/serenityweddingfilms"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-primary-foreground/10 hover:bg-accent rounded-full flex items-center justify-center text-primary-foreground hover:text-accent-foreground transition-all duration-300 hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://youtube.com/@serenityweddingfilms"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-primary-foreground/10 hover:bg-accent rounded-full flex items-center justify-center text-primary-foreground hover:text-accent-foreground transition-all duration-300 hover:scale-110"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
