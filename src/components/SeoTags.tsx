import { Helmet } from "react-helmet-async";
import type { PageSeo } from "@/types/content";

interface SeoTagsProps {
  seo: PageSeo;
}

const SeoTags = ({ seo }: SeoTagsProps) => {
  const canonicalUrl = seo.canonical ?? seo.ogUrl;
  const ogTitle = seo.ogTitle ?? seo.title;
  const ogDescription = seo.ogDescription ?? seo.description;

  return (
    <Helmet>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      {seo.keywords ? <meta name="keywords" content={seo.keywords} /> : null}
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:type" content="website" />
      {canonicalUrl ? <meta property="og:url" content={canonicalUrl} /> : null}
      {seo.ogImage ? <meta property="og:image" content={seo.ogImage} /> : null}
      {canonicalUrl ? <link rel="canonical" href={canonicalUrl} /> : null}
      {seo.noindex ? <meta name="robots" content="noindex,nofollow" /> : null}
    </Helmet>
  );
};

export default SeoTags;
