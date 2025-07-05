
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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

  return (
    <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-indigo-600/20"></div>
      
      <div className="container mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Your Dream Job is Just 
                <span className="block text-yellow-300">One Click Away</span>
              </h2>
              <p className="text-xl text-blue-100 leading-relaxed max-w-3xl mx-auto">
                Join 1000+ successful alumni who transformed their careers with real projects, 
                expert mentorship, and guaranteed placement support. Your transformation starts today.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button 
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 text-xl px-12 py-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 font-bold"
              >
                🚀 Start Free Trial Now
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 text-xl px-12 py-6 font-bold"
              >
                <Phone className="w-5 h-5 mr-2" />
                Talk to Counsellor
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-blue-100">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span>1-Week Free Trial</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                <span>No Payment Required</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
                <span>100% Satisfaction Guaranteed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Contact Options */}
        <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3">
          <Button
            className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 shadow-lg hover:shadow-xl transition-all duration-300 p-0"
            onClick={() => window.open('https://wa.me/your-number', '_blank')}
          >
            <MessageCircle className="w-6 h-6" />
          </Button>
          
          {showScrollTop && (
            <Button
              onClick={scrollToTop}
              className="w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 p-0"
            >
              <ArrowUp className="w-6 h-6" />
            </Button>
          )}
        </div>

        {/* Sticky Trial Button for Mobile */}
        <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-2xl z-40 md:hidden">
          <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-lg py-4 font-bold">
            Start Free Trial
          </Button>
        </div>
      </div>
    </section>
  );
};
