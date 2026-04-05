import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FeaturedFilms from "@/components/home/FeaturedFilms";
import ContactCTA from "@/components/home/ContactCTA";
import HeroSection from "@/components/home/HeroSection";
import IntroSection from "@/components/home/IntroSection";
import PhilosophySection from "@/components/home/PhilosophySection";
import QualitySection from "@/components/home/QualitySection";
import SideNav from "@/components/home/SideNav";
import SeoTags from "@/components/SeoTags";
import Testimonials from "@/components/Testimonials";
import { useHomePageContent } from "@/hooks/useHomePageContent";
import { usePageMeta } from "@/hooks/usePageMeta";

const Index = () => {
  const { data: content } = useHomePageContent();
  const { data: seo } = usePageMeta("home");

  return (
    <>
      <SeoTags seo={seo} />

      <main className="overflow-hidden bg-charcoal">
        <Navbar />
        <SideNav />
        <HeroSection content={content.hero} />
        <IntroSection content={content.intro} />
        <PhilosophySection content={content.philosophy} />
        <QualitySection content={content.quality} />
        <div id="featured">
          <FeaturedFilms intro={content.featuredIntro} films={content.featuredFilms} />
        </div>
        <div id="testimonials">
          <Testimonials intro={content.testimonialsIntro} testimonials={content.testimonials} />
        </div>
        <ContactCTA content={content.contactCta} />
        <Footer siteSettings={content.siteSettings} socialLinks={content.socialLinks} />
      </main>
    </>
  );
};

export default Index;
