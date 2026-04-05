import {
  ArrowUpRight,
  Facebook,
  Instagram,
  Mail,
  MessageCircle,
  Youtube,
} from "lucide-react";
import type { ContactSection, SiteSettings, SocialLink, SocialPlatform } from "@/types/content";

interface ContactProps {
  content: ContactSection;
  siteSettings: SiteSettings;
  socialLinks: SocialLink[];
}

const socialIconMap: Record<Exclude<SocialPlatform, "whatsapp" | "tiktok">, typeof Instagram> = {
  instagram: Instagram,
  facebook: Facebook,
  youtube: Youtube,
};

const Contact = ({ content, siteSettings, socialLinks }: ContactProps) => {
  const contactSocialLinks = socialLinks.filter(
    (link) => link.platform === "instagram" || link.platform === "facebook" || link.platform === "youtube"
  );

  return (
    <section id="contact" className="section-padding bg-cream">
      <div className="section-container">
        <div className="text-center mb-20">
          <span className="text-charcoal/50 text-sm tracking-[0.3em] uppercase font-light mb-4 block">
            {content.eyebrow}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-charcoal mb-6">
            {content.title}
          </h2>
          <div className="w-20 h-px bg-charcoal/30 mx-auto" />
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            <a
              href={siteSettings.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between bg-charcoal text-cream p-8 transition-all duration-500 hover:bg-charcoal/90"
            >
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-cream/10 flex items-center justify-center">
                  <MessageCircle className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-cream/60 text-sm tracking-wider uppercase mb-1">
                    {content.whatsappEyebrow}
                  </p>
                  <p className="text-xl font-serif">{content.whatsappLabel}</p>
                </div>
              </div>
              <ArrowUpRight className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>

            <a
              href={`mailto:${siteSettings.contactEmail}`}
              className="group flex items-center justify-between bg-charcoal/5 text-charcoal p-8 transition-all duration-500 hover:bg-charcoal hover:text-cream border border-charcoal/10"
            >
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-charcoal/10 group-hover:bg-cream/10 flex items-center justify-center transition-colors duration-500">
                  <Mail className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-charcoal/60 group-hover:text-cream/60 text-sm tracking-wider uppercase mb-1 transition-colors duration-500">
                    {content.emailEyebrow}
                  </p>
                  <p className="text-sm md:text-base font-serif whitespace-nowrap">
                    {siteSettings.contactEmail}
                  </p>
                </div>
              </div>
              <ArrowUpRight className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          </div>

          <div className="text-center">
            <p className="text-charcoal/60 text-sm tracking-[0.2em] uppercase mb-8">
              {content.socialHeading}
            </p>
            <div className="flex justify-center gap-4">
              {contactSocialLinks.map((link) => {
                const Icon = socialIconMap[link.platform as keyof typeof socialIconMap];

                return (
                  <a
                    key={link.platform}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-16 h-16 border border-charcoal/20 flex items-center justify-center text-charcoal hover:bg-charcoal hover:text-cream transition-all duration-300"
                    aria-label={link.label}
                  >
                    <Icon className="w-6 h-6" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
