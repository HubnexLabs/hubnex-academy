
import { Button } from "@/components/ui/button";
import { ArrowUp, Phone, MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";

export const FinalCTASection = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToForm = () => {
    const form = document.querySelector('#career-counselling-form');
    if (form) {
      form.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12 md:py-20 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-indigo-600/20"></div>
      
      <div className="container mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="space-y-6 md:space-y-8">
            <div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4 md:mb-6 leading-tight font-display">
                Your Personalized Career Journey
                <span className="block text-yellow-300">Starts Here</span>
              </h2>
              <p className="text-sm md:text-lg lg:text-xl text-blue-100 leading-relaxed max-w-3xl mx-auto">
                We value your time and money. Our commitment is your success — backed by 100% placement support. 
                Join 1000+ alumni who transformed their careers with personalized learning paths.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center">
              <Button 
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 text-base md:text-lg lg:text-xl px-6 md:px-8 lg:px-12 py-3 md:py-4 lg:py-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 font-bold w-full sm:w-auto"
                onClick={() => {
                  const form = document.querySelector('#career-counselling-form');
                  if (form) {
                    form.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                🚀 Claim Your Custom Journey
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 text-base md:text-lg lg:text-xl px-6 md:px-8 lg:px-12 py-3 md:py-4 lg:py-6 font-bold w-full sm:w-auto"
                onClick={scrollToForm}
              >
                <Phone className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                Talk to Counsellor
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-blue-100">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm md:text-base">Free Personalized Roadmap</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                <span className="text-sm md:text-base">Expert Guidance</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
                <span className="text-sm md:text-base">100% Placement Guarantee</span>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Contact Options */}
        <div className="fixed bottom-6 right-4 md:right-6 z-50 flex flex-col space-y-3">
          <Button
            className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-green-500 hover:bg-green-600 shadow-lg hover:shadow-xl transition-all duration-300 p-0"
            onClick={() => window.open('https://wa.me/916026768474', '_blank')}
          >
            <MessageCircle className="w-5 h-5 md:w-6 md:h-6" />
          </Button>
          
          {showScrollTop && (
            <Button
              onClick={scrollToTop}
              className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 p-0"
            >
              <ArrowUp className="w-5 h-5 md:w-6 md:h-6" />
            </Button>
          )}
        </div>

        {/* Sticky CTA Button for Mobile */}
        <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm p-4 shadow-2xl z-40 md:hidden border-t border-border">
          <Button 
            className="w-full bg-gradient-to-r from-primary via-neon-purple to-primary-glow hover:opacity-90 text-lg py-4 font-bold border-0 animate-glow"
            onClick={scrollToForm}
          >
            🚀 Claim Your Custom Journey
          </Button>
        </div>
      </div>
    </section>
  );
};
