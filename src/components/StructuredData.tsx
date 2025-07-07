
import { Helmet } from 'react-helmet-async';

interface OrganizationSchemaProps {
  name: string;
  description: string;
  url: string;
  logo: string;
  address?: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  contactPoint?: {
    telephone: string;
    contactType: string;
    email: string;
  };
  sameAs?: string[];
}

interface CourseSchemaProps {
  name: string;
  description: string;
  provider: string;
  url: string;
  duration: string;
  price: string;
  skillLevel: string;
  category: string;
}

export const OrganizationSchema = ({
  name = "Codelabs by Hubnex Labs",
  description = "Transform freshers into industry-ready professionals through real projects and expert mentorship",
  url = "https://codelabs.lovable.app",
  logo = "https://codelabs.lovable.app/lovable-uploads/622b6e79-d77c-466c-88ab-056de20ca811.png",
  address = {
    streetAddress: "Tech Park",
    addressLocality: "Bangalore",
    addressRegion: "Karnataka",
    postalCode: "560001",
    addressCountry: "IN"
  },
  contactPoint = {
    telephone: "+91-XXX-XXX-XXXX",
    contactType: "Customer Service",
    email: "admissions@hubnexacademy.com"
  },
  sameAs = [
    "https://www.linkedin.com/company/hubnex-labs",
    "https://twitter.com/hubnexlabs",
    "https://www.instagram.com/hubnexlabs",
    "https://www.youtube.com/channel/hubnexlabs"
  ]
}: OrganizationSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": name,
    "description": description,
    "url": url,
    "logo": logo,
    "address": {
      "@type": "PostalAddress",
      ...address
    },
    "contactPoint": {
      "@type": "ContactPoint",
      ...contactPoint
    },
    "sameAs": sameAs
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

export const CourseSchema = ({
  name,
  description,
  provider = "Codelabs by Hubnex Labs",
  url,
  duration,
  price,
  skillLevel = "Beginner to Advanced",
  category = "Technology"
}: CourseSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": name,
    "description": description,
    "provider": {
      "@type": "Organization",
      "name": provider,
      "url": "https://codelabs.lovable.app"
    },
    "url": url,
    "courseMode": "online",
    "educationalLevel": skillLevel,
    "about": category,
    "timeRequired": duration,
    "offers": {
      "@type": "Offer",
      "price": price,
      "priceCurrency": "INR"
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

export const BreadcrumbSchema = ({ items }: { items: Array<{ name: string; url: string }> }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};
