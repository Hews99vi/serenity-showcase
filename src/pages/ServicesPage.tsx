import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Services from "@/components/Services";
import SeoTags from "@/components/SeoTags";
import { usePageMeta } from "@/hooks/usePageMeta";
import { useServicesPageContent } from "@/hooks/useServicesPageContent";

const ServicesPage = () => {
  const { data: content } = useServicesPageContent();
  const { data: seo } = usePageMeta("services");

  return (
    <>
      <SeoTags seo={seo} />

      <main className="overflow-hidden">
        <Navbar />
        <Services
          hero={content.hero}
          services={content.services}
          faqIntro={content.faqIntro}
          faqCta={content.faqCta}
          faqGroups={content.faqGroups}
          faqItems={content.faqItems}
          siteSettings={content.siteSettings}
        />
        <Footer siteSettings={content.siteSettings} socialLinks={content.socialLinks} />
      </main>
    </>
  );
};

export default ServicesPage;
