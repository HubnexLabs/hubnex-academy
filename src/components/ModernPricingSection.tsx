import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Gift, Users, Shield, Zap, Trophy } from "lucide-react";

export const ModernPricingSection = () => {
  const features = [
    "6-month comprehensive program",
    "Real client project experience", 
    "1-on-1 mentorship sessions",
    "100% placement guarantee",
    "Industry-recognized certificates",
    "Access to 1500+ hiring partners",
    "Soft skills & interview training",
    "Lifetime alumni network access",
    "Career transition support",
    "Mock interview sessions"
  ];

  return (
    <section id="pricing" className="py-20 md:py-32 px-4 bg-gradient-to-br from-background via-primary/5 to-accent/10 relative overflow-hidden">
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-20">
          <Badge className="mb-6 bg-gradient-to-r from-warning-orange/20 to-warning-orange/30 text-warning-orange hover:from-warning-orange/30 hover:to-warning-orange/40 font-bold text-lg border-0 px-6 py-3">
            💰 Limited Time Offer
          </Badge>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-6 tracking-tight font-display">
            Invest in Your <span className="text-luxury">Future</span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto font-sans">
            Transform your career with our industry-leading program. One simple price, maximum value.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <Card className="luxury-card border-0 rounded-3xl animate-slide-up">
            <CardHeader className="text-center pb-8 pt-16">
              <CardTitle className="text-4xl font-black text-foreground mb-6 font-display">
                Complete Transformation Program
              </CardTitle>
              
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-6">
                  <div className="text-right">
                    <div className="text-3xl text-muted-foreground line-through font-bold">
                      ₹149,000
                    </div>
                    <div className="text-sm text-muted-foreground">Old Price</div>
                  </div>
                  
                  <div className="text-6xl md:text-8xl font-black text-luxury animate-glow font-display">
                    ₹70,000
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-cyber-green/20 to-cyber-green/30 text-cyber-green px-6 py-3 rounded-2xl font-bold text-xl mx-auto inline-block">
                  💸 You Save ₹79,000!
                </div>
              </div>
            </CardHeader>

            <CardContent className="px-8 pb-12">
              <div className="grid md:grid-cols-2 gap-6 mb-10">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-cyber-green to-cyber-green/80 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-5 h-5 text-white font-bold" />
                    </div>
                    <span className="text-foreground font-medium text-lg font-sans">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-6">
                <Button 
                  size="lg" 
                  variant="luxury"
                  className="w-full text-xl py-8 font-black"
                  onClick={() => {
                    const form = document.querySelector('#career-counselling-form');
                    if (form) {
                      form.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  🚀 Unlock Your Personalized Path
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};