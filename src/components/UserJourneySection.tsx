import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  UserCheck, 
  Search, 
  Settings, 
  Route, 
  Video, 
  Calendar,
  ArrowRight
} from "lucide-react";

export const UserJourneySection = () => {
  const steps = [
    {
      icon: UserCheck,
      number: "01",
      title: "Initial Assessment",
      description: "Fill our comprehensive form to help us understand your background, goals, and career aspirations.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Search,
      number: "02", 
      title: "Deep Analysis",
      description: "Our expert counsellors analyze your pain points, skill gaps, and career blockers to create your profile.",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Settings,
      number: "03",
      title: "Customization Form",
      description: "Complete a detailed customization form to personalize your learning experience and career path.",
      color: "from-green-500 to-green-600"
    },
    {
      icon: Route,
      number: "04",
      title: "Personalized Roadmap",
      description: "Our expert team creates a tailored learning roadmap aligned with your skills and career goals.",
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: Video,
      number: "05",
      title: "Mentor Consultation",
      description: "Meet your assigned mentor/instructor in a one-on-one call to discuss and refine your roadmap.",
      color: "from-pink-500 to-pink-600"
    },
    {
      icon: Calendar,
      number: "06",
      title: "Start Your Journey",
      description: "Pick your suitable schedule, make payment, and begin your transformation with expert mentorship.",
      color: "from-indigo-500 to-indigo-600"
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="container mx-auto">
        <header className="text-center mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/10 border-0">
            Your Learning Journey
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 font-display">
            Smooth Path to Success
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Our structured 6-step process ensures you get the most personalized learning experience 
            tailored to your unique goals and background.
          </p>
        </header>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <Card key={index} className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${step.color} opacity-10 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-500`}></div>
                
                <CardContent className="relative z-10 p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className={`w-14 h-14 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <step.icon className="w-7 h-7 text-white" />
                    </div>
                    <div className={`text-3xl font-bold bg-gradient-to-r ${step.color} bg-clip-text text-transparent font-display`}>
                      {step.number}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-foreground mb-4 font-display">
                    {step.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                  
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-20">
                      <ArrowRight className="w-8 h-8 text-muted-foreground/30" />
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <div className="bg-card rounded-3xl p-8 shadow-lg max-w-3xl mx-auto border">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6 font-display">
                Ready to Transform Your Career?
              </h3>
              <p className="text-muted-foreground mb-8 text-lg">
                We value your time and money. Our commitment is your success — backed by 100% placement support.
              </p>
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary to-primary-glow hover:opacity-90 text-lg px-8 py-4 font-semibold"
                onClick={() => {
                  const form = document.querySelector('#career-counselling-form');
                  if (form) {
                    form.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Get Your Roadmap Free
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};