import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import QuoteSection from "@/components/QuoteSection";
import SeoTags from "@/components/SeoTags";
import { useContactPageContent } from "@/hooks/useContactPageContent";
import { usePageMeta } from "@/hooks/usePageMeta";

const ContactPage = () => {
  const { data: content } = useContactPageContent();
  const { data: seo } = usePageMeta("contact");

  return (
    <>
      <SeoTags seo={seo} />

      <main className="overflow-hidden">
        <Navbar />
        <div className="pt-24">
          <QuoteSection content={content.quoteSection} />
          <Contact
            content={content.contactSection}
            siteSettings={content.siteSettings}
            socialLinks={content.socialLinks}
          />
        </div>
        <Footer siteSettings={content.siteSettings} socialLinks={content.socialLinks} />
      </main>
    </>
  );
};

export default ContactPage;
