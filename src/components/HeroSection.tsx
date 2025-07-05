
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Users, TrendingUp } from "lucide-react";
import { CareerCounsellingForm } from "./CareerCounsellingForm";

export const HeroSection = () => {
  return (
    <section className="relative py-8 md:py-12 lg:py-20 px-4 overflow-hidden font-inter">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10"></div>
      <div className="container mx-auto relative z-10 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Content */}
          <div className="space-y-6 md:space-y-8 order-1">
            <div className="space-y-4 md:space-y-6">
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100 font-medium text-xs md:text-sm">
                🎯 100% Placement Support
              </Badge>
              <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight font-poppins">
                Become <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Industry-Ready.</span><br />
                Not Just Certified.
              </h1>
              <p className="text-sm md:text-base lg:text-lg text-gray-600 leading-relaxed">
                Work on real client projects, get mentored by IT leaders, and land your dream job with 100% placement support. Built by a real IT company, not an EdTech.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-sm md:text-base lg:text-lg px-4 md:px-6 lg:px-8 py-3 md:py-4 lg:py-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-semibold w-full sm:w-auto"
                onClick={() => window.open('https://forms.gle/AkvpK2buZghx5xK7A', '_blank')}
              >
                Start Free 1-Week Trial
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-purple-600 text-purple-600 hover:bg-purple-50 text-sm md:text-base lg:text-lg px-4 md:px-6 lg:px-8 py-3 md:py-4 lg:py-6 font-semibold w-full sm:w-auto"
                onClick={() => {
                  const form = document.querySelector('#career-counselling-form');
                  if (form) {
                    form.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                See Success Stories
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-8 space-y-4 sm:space-y-0 pt-4">
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-2">
                  {[1,2,3,4,5].map((i) => (
                    <div key={i} className="w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-white overflow-hidden">
                      <img 
                        src={`https://images.unsplash.com/photo-${i === 1 ? '1507003211169-0a1dd7228f2d' : i === 2 ? '1494790108755-2616c18f129f' : i === 3 ? '1507591064344-4c6ce005b128' : i === 4 ? '1519085360753-af0119f7c3b6' : '1573497019940-1c28c88b4f3e'}?w=100&h=100&fit=crop&crop=face`}
                        alt={`Student ${i}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
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
              <div className="bg-white p-4 rounded-xl shadow-lg border border-purple-100">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="font-bold text-gray-900 font-poppins text-lg">₹12.85L</p>
                    <p className="text-xs text-gray-600">Avg. Salary</p>
                  </div>
                </div>
              </div>
              <div className="bg-purple-600 text-white p-4 rounded-xl shadow-lg">
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

          {/* Right Form - Hidden on mobile, shown below content */}
          <div className="hidden lg:flex justify-center lg:justify-end order-2">
            <CareerCounsellingForm />
          </div>
        </div>

        {/* Mobile Form - Shown below content on mobile */}
        <div className="lg:hidden mt-8 flex justify-center">
          <CareerCounsellingForm />
        </div>
      </div>
    </section>
  );
};
