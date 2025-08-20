import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, Users, Trophy, Target, Zap, CheckCircle2 } from "lucide-react";

export const ModernGuaranteeSection = () => {
  const guarantees = [
    {
      icon: Shield,
      title: "100% Placement Guarantee",
      description: "We don't just promise—we deliver. Get placed or get your money back.",
      highlight: "Zero Risk",
      color: "from-cyber-green to-cyber-green/80"
    },
    {
      icon: Users,
      title: "Personal Mentor Support",
      description: "Dedicated 1-on-1 guidance throughout your entire learning journey.",
      highlight: "Personal Touch",
      color: "from-primary to-primary-dark"
    },
    {
      icon: Trophy,
      title: "Industry Recognition",
      description: "Certificates and projects that actually matter to top employers.",
      highlight: "Real Value",
      color: "from-neon-purple to-primary-glow"
    },
    {
      icon: Target,
      title: "Customized Learning Path",
      description: "No generic courses. Everything tailored to your specific goals and background.",
      highlight: "Perfect Fit",
      color: "from-warning-orange to-warning-orange/80"
    }
  ];

  const successMetrics = [
    { number: "1000+", label: "Alumni Placed", icon: Users },
    { number: "₹12.85L", label: "Average Salary", icon: Trophy },
    { number: "100%", label: "Success Rate", icon: Target },
    { number: "500+", label: "Partner Companies", icon: Shield }
  ];

  return (
    <section className="py-20 md:py-32 px-4 bg-gradient-to-br from-background to-primary/5 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-10 right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-neon-purple/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-20">
          <Badge className="mb-6 bg-gradient-to-r from-cyber-green/20 to-cyber-green/30 text-cyber-green hover:from-cyber-green/30 hover:to-cyber-green/40 font-bold text-lg border-0 px-6 py-3">
            🛡️ Our Commitment
          </Badge>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-6 tracking-tight">
            Success <span className="gradient-text">Guaranteed</span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto font-medium">
            We value your time and money. Your success is our commitment, backed by proven results.
          </p>
        </div>

        {/* Success Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20 max-w-4xl mx-auto">
          {successMetrics.map((metric, index) => (
            <div key={index} className="text-center modern-card p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-r from-primary to-primary-dark rounded-xl mx-auto mb-4 flex items-center justify-center">
                <metric.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-black text-foreground mb-2">{metric.number}</div>
              <div className="text-sm text-muted-foreground font-medium">{metric.label}</div>
            </div>
          ))}
        </div>

        {/* Guarantees Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {guarantees.map((guarantee, index) => (
            <Card key={index} className="border-0 shadow-xl modern-card hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group">
              <CardContent className="p-8">
                <div className="flex items-start space-x-6">
                  <div className={`w-16 h-16 bg-gradient-to-r ${guarantee.color} rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                    <guarantee.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-4">
                      <h3 className="text-xl font-black text-foreground">{guarantee.title}</h3>
                      <Badge className="bg-gradient-to-r from-primary/20 to-primary/30 text-primary border-0 font-bold">
                        {guarantee.highlight}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground font-medium leading-relaxed text-lg">
                      {guarantee.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* What You Get Section */}
        <div className="modern-card rounded-3xl p-12 shadow-2xl max-w-5xl mx-auto border-0">
          <h3 className="text-3xl md:text-4xl font-black text-foreground mb-8 text-center">
            What Makes Us <span className="gradient-text">Different?</span>
          </h3>
          
          <div className="grid md:grid-cols-2 gap-8 mb-10">
            {[
              "Personalized learning roadmap designed for you",
              "Real client projects, not dummy assignments", 
              "1-on-1 mentor sessions with industry experts",
              "Direct placement support with top companies",
              "Comprehensive interview and soft skills training",
              "Lifetime access to our alumni network"
            ].map((feature, index) => (
              <div key={index} className="flex items-center space-x-4">
                <CheckCircle2 className="w-6 h-6 text-cyber-green flex-shrink-0" />
                <span className="text-foreground font-medium text-lg">{feature}</span>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-primary via-neon-purple to-primary-glow hover:opacity-90 text-xl px-12 py-6 font-black border-0 shadow-xl animate-glow"
              onClick={() => {
                const form = document.querySelector('#career-counselling-form');
                if (form) {
                  form.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              🚀 Start Your Transformation
            </Button>
            
            <p className="text-muted-foreground mt-6 font-medium text-lg">
              Join 1000+ successful professionals who transformed their careers with us
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};