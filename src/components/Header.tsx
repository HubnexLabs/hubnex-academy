
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-blue-100 font-inter">
      <div className="container mx-auto px-4 py-3 md:py-4 max-w-7xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-base md:text-lg font-poppins">H</span>
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-bold text-gray-900 font-poppins">Hubnex Academy</h1>
              <p className="text-xs text-gray-600">by Hubnex Labs</p>
            </div>
          </div>
          
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            <a href="#programs" className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-sm xl:text-base">Programs</a>
            <a href="#success-stories" className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-sm xl:text-base">Success Stories</a>
            <a href="#pricing" className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-sm xl:text-base">Pricing</a>
            <a href="#faq" className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-sm xl:text-base">FAQ</a>
          </nav>

          <div className="hidden lg:flex items-center space-x-3 xl:space-x-4">
            <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold text-xs xl:text-sm px-3 xl:px-4 py-2">
              Talk to Counsellor
            </Button>
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 font-semibold text-xs xl:text-sm px-3 xl:px-4 py-2">
              Start Free Trial
            </Button>
          </div>

          <button 
            className="lg:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="w-5 h-5 md:w-6 md:h-6 flex flex-col justify-center items-center">
              <span className={`bg-gray-600 block transition-all duration-300 ease-out h-0.5 w-5 md:w-6 rounded-sm ${isMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`}></span>
              <span className={`bg-gray-600 block transition-all duration-300 ease-out h-0.5 w-5 md:w-6 rounded-sm my-0.5 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
              <span className={`bg-gray-600 block transition-all duration-300 ease-out h-0.5 w-5 md:w-6 rounded-sm ${isMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`}></span>
            </div>
          </button>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
            <nav className="flex flex-col space-y-4">
              <a href="#programs" className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-sm">Programs</a>
              <a href="#success-stories" className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-sm">Success Stories</a>
              <a href="#pricing" className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-sm">Pricing</a>
              <a href="#faq" className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-sm">FAQ</a>
              <div className="flex flex-col space-y-2 pt-4">
                <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold text-sm">
                  Talk to Counsellor
                </Button>
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 font-semibold text-sm">
                  Start Free Trial
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
