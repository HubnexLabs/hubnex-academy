
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Users, Award, TrendingUp } from "lucide-react";
import { CareerCounsellingForm } from "./CareerCounsellingForm";

export const HeroSection = () => {
  return (
    <section className="relative py-20 px-4 overflow-hidden font-inter">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10"></div>
      <div className="container mx-auto relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-1 space-y-8">
              <div className="space-y-6">
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100 font-medium">
                  🎯 100% Placement Support
                </Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight font-poppins">
                  Become <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Industry-Ready.</span><br />
                  Not Just Certified.
                </h1>
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                  Work on real client projects, get mentored by IT leaders, and land your dream job with 100% placement support. Built by a real IT company, not an EdTech.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-semibold"
                >
                  Start Free 1-Week Trial
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 text-lg px-8 py-6 font-semibold"
                >
                  See Success Stories
                </Button>
              </div>

              <div className="flex items-center space-x-8 pt-4">
                <div className="flex items-center space-x-2">
                  <div className="flex -space-x-2">
                    {[1,2,3,4,5].map((i) => (
                      <div key={i} className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full border-2 border-white"></div>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 font-medium">1000+ Alumni Placed</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="font-semibold">4.9/5</span>
                  <span className="text-sm text-gray-600">Mentor Rating</span>
                </div>
              </div>
            </div>

            {/* Center Image */}
            <div className="lg:col-span-1 relative">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80" 
                  alt="Diverse team of young professionals collaborating on tech projects in modern office"
                  className="rounded-2xl shadow-2xl w-full h-[400px] object-cover"
                />
                <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-xl shadow-lg">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-6 h-6 text-green-500" />
                    <div>
                      <p className="font-bold text-gray-900 font-poppins">₹8.5L</p>
                      <p className="text-sm text-gray-600">Avg. Salary</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-4 -left-4 bg-blue-600 text-white p-3 rounded-xl shadow-lg">
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5" />
                    <span className="font-semibold">500+</span>
                  </div>
                  <p className="text-xs">Active Students</p>
                </div>
              </div>
            </div>

            {/* Right Form */}
            <div className="lg:col-span-1 flex justify-center lg:justify-end">
              <CareerCounsellingForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
