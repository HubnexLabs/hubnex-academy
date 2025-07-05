
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Clock, Heart, Award } from "lucide-react";

export const GuaranteeSection = () => {
  const guarantees = [
    {
      icon: Clock,
      title: "1-Week Free Trial",
      description: "Try us completely free for 1 week. No payment required, no hidden commitments.",
      highlight: "Zero Risk"
    },
    {
      icon: Shield,
      title: "100% Satisfaction Promise",
      description: "Pay only if you're completely satisfied with the program quality and mentorship.",
      highlight: "Money Back"
    },
    {
      icon: Heart,
      title: "We Never Give Up",
      description: "Training and placement support continues until you land your first job. Period.",
      highlight: "Lifetime Support"
    },
    {
      icon: Award,
      title: "Quality Guarantee",
      description: "All mentors are 5-star rated industry experts. Real projects, real experience, real results.",
      highlight: "Proven Quality"
    }
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Guarantee to You
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're so confident in our program that we put our promises in writing. Your success is our success.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {guarantees.map((guarantee, index) => (
            <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 group hover:scale-105">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <guarantee.icon className="w-8 h-8 text-white" />
                </div>
                <div className="mb-3 text-sm font-semibold text-blue-600 uppercase tracking-wider">
                  {guarantee.highlight}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {guarantee.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {guarantee.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Guarantee Statement */}
        <div className="max-w-4xl mx-auto">
          <Card className="border-0 shadow-2xl bg-gradient-to-r from-blue-50 to-indigo-50 overflow-hidden">
            <CardContent className="p-12 text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8">
                <Shield className="w-10 h-10 text-white" />
              </div>
              
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                "Try us free for 1 week. Pay only if you're 100% satisfied."
              </h3>
              
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                We believe in our program so much that we let you experience it completely free. 
                Join live sessions, work on real projects, interact with mentors and students. 
                Only pay if you're convinced this is the right path for your career transformation.
              </p>

              <div className="bg-white rounded-xl p-6 mb-8 max-w-2xl mx-auto">
                <h4 className="font-bold text-gray-900 mb-4 text-lg">
                  What happens in your free trial week:
                </h4>
                <div className="grid md:grid-cols-2 gap-4 text-left">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className="text-gray-700">Attend live mentor sessions</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className="text-gray-700">Access real project discussions</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className="text-gray-700">Join student community</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className="text-gray-700">Experience our teaching method</span>
                  </div>
                </div>
              </div>

              <Button 
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-xl px-12 py-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Start Your Free Trial Now
              </Button>
              
              <p className="text-sm text-gray-600 mt-4">
                No credit card required • No hidden fees • Cancel anytime during trial
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
