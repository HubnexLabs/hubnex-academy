
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Users, TrendingUp } from "lucide-react";
import { CareerCounsellingForm } from "./CareerCounsellingForm";

export const HeroSection = () => {
  return (
    <section className="relative py-12 md:py-24 lg:py-32 px-4 overflow-hidden bg-gradient-to-br from-background via-primary/5 to-accent/10">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-neon-purple/10 to-primary-glow/10 hero-glow"></div>
      
      <div className="container mx-auto relative z-10 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8 md:space-y-12 order-1 animate-slide-up">
            <div className="space-y-6 md:space-y-8">
              <Badge className="bg-gradient-to-r from-cyber-green/20 to-cyber-green/30 text-cyber-green hover:from-cyber-green/30 hover:to-cyber-green/40 font-bold text-sm border-0 px-4 py-2">
                🎯 100% Placement Guarantee
              </Badge>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-black leading-tight tracking-tight">
                Become <span className="gradient-text animate-glow">Industry-Ready.</span><br />
                <span className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-muted-foreground">Not Just Certified.</span>
              </h1>
              
              <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground leading-relaxed font-medium">
                Get a <span className="text-primary font-bold">tailored roadmap</span> aligned with your skills and career goals. 
                Work on real client projects, receive expert mentorship, and land your dream job with 
                <span className="text-cyber-green font-bold"> guaranteed placement support.</span>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary via-neon-purple to-primary-glow hover:opacity-90 text-lg md:text-xl px-8 md:px-12 py-4 md:py-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 font-bold w-full sm:w-auto border-0 animate-glow"
                onClick={() => {
                  const form = document.querySelector('#career-counselling-form');
                  if (form) {
                    form.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                🚀 Get Your Roadmap Free
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-primary text-primary hover:bg-primary/10 hover:border-primary-glow text-lg md:text-xl px-8 md:px-12 py-4 md:py-6 font-bold w-full sm:w-auto backdrop-blur-sm"
                onClick={() => {
                  const form = document.querySelector('#career-counselling-form');
                  if (form) {
                    form.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                📞 See Success Stories
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-12 space-y-6 sm:space-y-0 pt-6">
              <div className="flex items-center space-x-4">
                <div className="flex -space-x-3">
                  {[1,2,3,4,5].map((i) => (
                    <div key={i} className="w-10 h-10 md:w-12 md:h-12 rounded-full border-3 border-white overflow-hidden shadow-lg">
                      <img 
                        src={`https://images.unsplash.com/photo-${i === 1 ? '1507003211169-0a1dd7228f2d' : i === 2 ? '1494790108755-2616c18f129f' : i === 3 ? '1507591064344-4c6ce005b128' : i === 4 ? '1519085360753-af0119f7c3b6' : '1573497019940-1c28c88b4f3e'}?w=100&h=100&fit=crop&crop=face`}
                        alt={`Student ${i}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <span className="text-lg md:text-xl font-bold text-foreground">1000+ Alumni Placed</span>
                  <p className="text-sm text-muted-foreground">at top companies</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="flex">
                  {[1,2,3,4,5].map((i) => (
                    <Star key={i} className="w-6 h-6 text-warning-orange fill-current" />
                  ))}
                </div>
                <div>
                  <span className="font-bold text-lg text-foreground">4.9/5</span>
                  <p className="text-sm text-muted-foreground">Mentor Rating</p>
                </div>
              </div>
            </div>

            {/* Mobile Stats Cards */}
            <div className="grid grid-cols-2 gap-6 lg:hidden">
              <div className="modern-card p-6 rounded-2xl">
                <div className="flex items-center space-x-3">
                  <TrendingUp className="w-8 h-8 text-cyber-green" />
                  <div>
                    <p className="font-black text-2xl text-foreground">₹12.85L</p>
                    <p className="text-sm text-muted-foreground font-medium">Avg. Salary</p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-primary to-primary-dark text-white p-6 rounded-2xl shadow-xl">
                <div className="flex items-center space-x-3">
                  <Users className="w-8 h-8" />
                  <div>
                    <p className="font-black text-2xl">500+</p>
                    <p className="text-sm opacity-90">Active Students</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form - Hidden on mobile, shown below content */}
          <div className="hidden lg:flex justify-center lg:justify-end order-2 animate-fade-in">
            <CareerCounsellingForm />
          </div>
        </div>

        {/* Mobile Form - Shown below content on mobile */}
        <div className="lg:hidden mt-12 flex justify-center animate-slide-up">
          <CareerCounsellingForm />
        </div>
      </div>
    </section>
  );
};
