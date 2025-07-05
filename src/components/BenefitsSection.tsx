
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Briefcase, 
  Star, 
  Target, 
  CreditCard, 
  Award,
  Users
} from "lucide-react";

export const BenefitsSection = () => {
  const benefits = [
    {
      icon: Briefcase,
      title: "Real-World Projects",
      description: "Work on actual client projects, not dummy assignments. Build portfolio with real impact.",
      badge: "Not Simulated"
    },
    {
      icon: Star,
      title: "5-Star Mentors",
      description: "Learn from industry experts rated 5/5 by 1000+ junior engineers. Direct access guaranteed.",
      badge: "Industry Leaders"
    },
    {
      icon: Target,
      title: "100% Placement Support",
      description: "We never give up on our students. Training continues until you land your first job.",
      badge: "Guaranteed"
    },
    {
      icon: CreditCard,
      title: "Flexible Payment",
      description: "Easy EMI options starting ₹11,667/month. Up to ₹10,000 scholarship available.",
      badge: "EMI Available"
    },
    {
      icon: Award,
      title: "Industry Certificates",
      description: "Training certificates recognized by Google, Amazon, Microsoft and 1500+ partners.",
      badge: "Recognized"
    },
    {
      icon: Users,
      title: "1500+ Hiring Partners",
      description: "Direct access to our vast network of hiring partners across top tech companies.",
      badge: "Exclusive Access"
    }
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-100">
            Why Choose Hubnex Academy
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Transform Your Career with Real Experience
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Unlike traditional courses, we immerse you in real projects and industry practices that employers actually value.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <Card key={index} className="relative overflow-hidden group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg hover:scale-105">
              <CardContent className="p-8">
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="text-xs bg-blue-50 text-blue-700">
                    {benefit.badge}
                  </Badge>
                </div>
                <div className="mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <benefit.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              No Eligibility Criteria • Anyone Can Join & Succeed
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              Whether you're a fresh graduate, final-year student, or career changer - if you have the passion, we'll help you succeed.
            </p>
            <div className="flex justify-center items-center space-x-8 text-sm text-gray-600">
              <span>✓ Fresh Graduates Welcome</span>
              <span>✓ No Prior Experience Required</span>
              <span>✓ Career Changers Supported</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
