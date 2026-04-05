import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Portfolio from "@/components/Portfolio";
import SeoTags from "@/components/SeoTags";
import { usePageMeta } from "@/hooks/usePageMeta";
import { usePortfolioPageContent } from "@/hooks/usePortfolioPageContent";

const PortfolioPage = () => {
  const { data: content } = usePortfolioPageContent();
  const { data: seo } = usePageMeta("portfolio");

  return (
    <>
      <SeoTags seo={seo} />

      <main className="overflow-hidden">
        <Navbar />
        <Portfolio
          hero={content.hero}
          intro={content.intro}
          categoriesIntro={content.categoriesIntro}
          cta={content.cta}
          categories={content.categories}
          videos={content.videos}
        />
        <Footer siteSettings={content.siteSettings} socialLinks={content.socialLinks} />
      </main>
    </>
  );
};

export default PortfolioPage;
