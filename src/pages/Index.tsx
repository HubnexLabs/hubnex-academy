
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
import { Link } from "react-router-dom";
import { GraduationCap, Users } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      
      {/* Login Options Section */}
      <section className="py-8 bg-white/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4">
          <div className="flex justify-center space-x-4">
            <Link to="/student-login">
              <Button className="flex items-center space-x-2" size="lg">
                <GraduationCap className="w-5 h-5" />
                <span>Student Login</span>
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" className="flex items-center space-x-2" size="lg">
                <Users className="w-5 h-5" />
                <span>Staff Login</span>
              </Button>
            </Link>
          </div>
        </div>
      </section>

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
