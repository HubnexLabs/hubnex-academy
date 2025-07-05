
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Users, TrendingUp } from "lucide-react";
import { CareerCounsellingForm } from "./CareerCounsellingForm";

export const HeroSection = () => {
  return (
    <section className="relative py-12 md:py-20 px-4 overflow-hidden font-inter">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10"></div>
      <div className="container mx-auto relative z-10 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Content */}
          <div className="space-y-6 md:space-y-8 order-2 lg:order-1">
            <div className="space-y-4 md:space-y-6">
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100 font-medium text-xs md:text-sm">
                🎯 100% Placement Support
              </Badge>
              <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight font-poppins">
                Become <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Industry-Ready.</span><br />
                Not Just Certified.
              </h1>
              <p className="text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed">
                Work on real client projects, get mentored by IT leaders, and land your dream job with 100% placement support. Built by a real IT company, not an EdTech.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-base md:text-lg px-6 md:px-8 py-4 md:py-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-semibold"
              >
                Start Free 1-Week Trial
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 text-base md:text-lg px-6 md:px-8 py-4 md:py-6 font-semibold"
              >
                See Success Stories
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-8 space-y-4 sm:space-y-0 pt-4">
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-2">
                  {[1,2,3,4,5].map((i) => (
                    <div key={i} className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full border-2 border-white"></div>
                  ))}
                </div>
                <span className="text-sm md:text-base text-gray-600 font-medium">1000+ Alumni Placed</span>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 md:w-5 md:h-5 text-yellow-400 fill-current" />
                <span className="font-semibold text-sm md:text-base">4.9/5</span>
                <span className="text-sm md:text-base text-gray-600">Mentor Rating</span>
              </div>
            </div>

            {/* Mobile Stats Cards */}
            <div className="grid grid-cols-2 gap-4 pt-4 lg:hidden">
              <div className="bg-white p-4 rounded-xl shadow-lg border border-blue-100">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="font-bold text-gray-900 font-poppins text-lg">₹8.5L</p>
                    <p className="text-xs text-gray-600">Avg. Salary</p>
                  </div>
                </div>
              </div>
              <div className="bg-blue-600 text-white p-4 rounded-xl shadow-lg">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <div>
                    <p className="font-bold text-lg">500+</p>
                    <p className="text-xs">Active Students</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="flex justify-center lg:justify-end order-1 lg:order-2">
            <CareerCounsellingForm />
          </div>
        </div>
      </div>
    </section>
  );
};
