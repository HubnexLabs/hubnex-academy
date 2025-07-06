
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      
      <main>
        <HeroSection />
        <BenefitsSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <ProgramsSection />
        <PricingSection />
        <FAQSection />
        <GuaranteeSection />
        <FinalCTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
