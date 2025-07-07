
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

export const SEO = ({
  title = "Codelabs - Become Industry-Ready, Not Just Certified",
  description = "Transform freshers into industry-ready professionals through real projects and expert mentorship. Join 1000+ alumni with average salary of ₹12.85 LPA.",
  keywords = "coding bootcamp, software development training, full stack development, UI/UX design, product management, data analytics, placement guarantee, industry training",
  image = "/lovable-uploads/622b6e79-d77c-466c-88ab-056de20ca811.png",
  url = "https://codelabs.lovable.app",
  type = "website",
  author = "Hubnex Labs",
  publishedTime,
  modifiedTime
}: SEOProps) => {
  const fullTitle = title.includes("Codelabs") ? title : `${title} | Codelabs`;
  const fullUrl = url.startsWith('http') ? url : `https://codelabs.lovable.app${url}`;
  const fullImage = image.startsWith('http') ? image : `https://codelabs.lovable.app${image}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph Meta Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:image:alt" content={title} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content="Codelabs" />
      <meta property="og:locale" content="en_US" />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
      <meta name="twitter:image:alt" content={title} />
      <meta name="twitter:site" content="@codelabs" />
      <meta name="twitter:creator" content="@hubnexlabs" />

      {/* Mobile Optimization */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#6366f1" />
      <meta name="msapplication-TileColor" content="#6366f1" />

      {/* Performance Hints */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link rel="dns-prefetch" href="https://www.google-analytics.com" />
    </Helmet>
  );
};
