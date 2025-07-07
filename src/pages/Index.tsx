
import { SEO } from "@/components/SEO";
import { OrganizationSchema, BreadcrumbSchema } from "@/components/StructuredData";
import { HeroSection } from "@/components/HeroSection";
import { BenefitsSection } from "@/components/BenefitsSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { ProgramsSection } from "@/components/ProgramsSection";
import { PricingSection } from "@/components/PricingSection";
import { FAQSection } from "@/components/FAQSection";
import { GuaranteeSection } from "@/components/GuaranteeSection";
import { FinalCTASection } from "@/components/FinalCTASection";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const Index = () => {
  const breadcrumbItems = [
    { name: "Home", url: "https://codelabs.lovable.app/" }
  ];

  return (
    <>
      <SEO 
        title="Codelabs - Become Industry-Ready, Not Just Certified"
        description="Transform freshers into industry-ready professionals through real projects and expert mentorship. Join 1000+ alumni with average salary of ₹12.85 LPA at top companies like Google, Microsoft, Amazon."
        keywords="coding bootcamp, software development training, full stack development, MERN stack, UI/UX design, product management, data analytics, placement guarantee, industry training, tech careers, programming courses"
        url="/"
        type="website"
      />
      <OrganizationSchema />
      <BreadcrumbSchema items={breadcrumbItems} />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Header />
        
        <main role="main">
          <HeroSection />
          <section aria-label="Benefits">
            <BenefitsSection />
          </section>
          <section aria-label="How it works">
            <HowItWorksSection />
          </section>
          <section aria-label="Success stories">
            <TestimonialsSection />
          </section>
          <section aria-label="Programs">
            <ProgramsSection />
          </section>
          <section aria-label="Pricing">
            <PricingSection />
          </section>
          <section aria-label="FAQ">
            <FAQSection />
          </section>
          <section aria-label="Guarantee">
            <GuaranteeSection />
          </section>
          <section aria-label="Call to action">
            <FinalCTASection />
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Index;
