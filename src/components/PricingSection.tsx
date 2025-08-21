
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Gift, Users, Star } from "lucide-react";

export const PricingSection = () => {
  const features = [
    "6-month comprehensive program",
    "Real client project experience", 
    "1-on-1 mentorship sessions",
    "100% placement support",
    "Industry-recognized certificates",
    "Access to 1500+ hiring partners",
    "Soft skills & interview training",
    "Lifetime alumni network access"
  ];

  return (
    <section id="pricing" className="py-20 px-4 bg-gradient-to-br from-background via-primary/5 to-accent/10">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/15 border-primary/20">
            💰 Investment in Your Future
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 font-display">
            Transparent Pricing, <span className="text-luxury">Maximum Value</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-sans">
            One affordable price for life-changing career transformation. No hidden fees, no surprises.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8 items-center">
            
            {/* Main Pricing Card */}
            <div className="lg:col-span-2">
              <Card className="relative overflow-hidden border-0 shadow-2xl luxury-card">
                <div className="absolute top-0 right-0 bg-gradient-to-l from-primary to-primary-glow text-primary-foreground px-8 py-2 rounded-bl-2xl">
                  <span className="font-bold">Most Popular</span>
                </div>
                
                <CardHeader className="text-center pb-8 pt-12">
                  <CardTitle className="text-3xl font-bold text-foreground mb-4 font-display">
                    Complete Program
                  </CardTitle>
                  <div className="space-y-4">
                    <div className="text-lg text-muted-foreground line-through">
                      ₹149,000
                    </div>
                    <div className="text-5xl font-bold text-foreground">
                      ₹70,000
                      <span className="text-lg font-normal text-muted-foreground ml-2">for 6 months</span>
                    </div>
                    <div className="text-primary font-semibold text-lg">
                      💰 Save ₹79,000 with our limited offer
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="px-8 pb-8">
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-cyber-green/20 rounded-full flex items-center justify-center flex-shrink-0">
                          <Check className="w-4 h-4 text-cyber-green" />
                        </div>
                        <span className="text-foreground font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4">
                   <Button 
                     className="w-full text-lg py-6" 
                     variant="luxury"
                     onClick={() => {
                       const form = document.querySelector('#career-counselling-form');
                       if (form) {
                         form.scrollIntoView({ behavior: 'smooth' });
                       }
                     }}
                   >
                     🚀 Unlock Your Personalized Path
                   </Button>
                   <Button variant="outline" className="w-full border-2 border-primary text-primary hover:bg-primary/5 py-3">
                     Apply for Scholarship (Save up to ₹10,000)
                   </Button>
                  </div>

                  <p className="text-center text-sm text-muted-foreground mt-4">
                    🔒 Secure payment • 📞 24/7 support • 💼 100% Job guarantee
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Special Offers Sidebar */}
            <div className="space-y-6">
              
              {/* Scholarship Card */}
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-warning-orange/10 to-warning-orange/20">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-warning-orange to-warning-orange rounded-lg flex items-center justify-center">
                      <Gift className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground">Scholarship</h3>
                      <p className="text-sm text-muted-foreground">Save up to ₹10,000</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Take our aptitude exam and earn scholarship based on your score. No entrance fees!
                  </p>
                  <Button variant="outline" className="w-full text-warning-orange border-warning-orange hover:bg-warning-orange/5">
                    Take Exam
                  </Button>
                </CardContent>
              </Card>

              {/* Referral Card */}
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-cyber-green/10 to-cyber-green/20">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-cyber-green to-cyber-green rounded-lg flex items-center justify-center">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground">Refer & Earn</h3>
                      <p className="text-sm text-muted-foreground">₹3,000 Total Rewards</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Get ₹2,000 cash + ₹1,000 Amazon voucher for each successful referral.
                  </p>
                  <Button variant="outline" className="w-full text-cyber-green border-cyber-green hover:bg-cyber-green/5">
                    Refer Now
                  </Button>
                </CardContent>
              </Card>

              {/* Guarantee Card */}
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-primary/10 to-primary-glow/20">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-primary to-primary-glow rounded-lg flex items-center justify-center">
                      <Star className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground">Our Promise</h3>
                      <p className="text-sm text-muted-foreground">100% Satisfaction</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Try us free for 1 week. Pay only if you're 100% satisfied with the program quality.
                  </p>
                </CardContent>
              </Card>

            </div>
          </div>
        </div>

        {/* Value Prop */}
        <div className="mt-16 text-center">
          <div className="bg-card rounded-3xl p-8 shadow-lg max-w-4xl mx-auto border">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6 font-display">
              Why Choose Our Personalized Approach?
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🎯</span>
                </div>
                <h4 className="font-bold text-foreground mb-2">Tailored Learning</h4>
                <p className="text-sm text-muted-foreground">Custom roadmap based on your unique background and goals</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🤝</span>
                </div>
                <h4 className="font-bold text-foreground mb-2">Expert Mentorship</h4>
                <p className="text-sm text-muted-foreground">1-on-1 guidance from industry professionals</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">💼</span>
                </div>
                <h4 className="font-bold text-foreground mb-2">Guaranteed Results</h4>
                <p className="text-sm text-muted-foreground">100% placement support with our proven track record</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
