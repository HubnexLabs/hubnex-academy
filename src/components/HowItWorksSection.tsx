
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowDown } from "lucide-react";

export const HowItWorksSection = () => {
  const steps = [
    {
      number: "01",
      duration: "Month 1",
      title: "Interactive Cohort",
      description: "Join a fun, interactive cohort for fast-track revision. Build foundation with peer learning and expert guidance.",
      highlights: ["Live Sessions", "Peer Learning", "Foundation Building"]
    },
    {
      number: "02", 
      duration: "Months 2-6",
      title: "Real Project Collaboration",
      description: "Work on real-time, non-billable client projects with expert feedback. Build your portfolio with actual impact.",
      highlights: ["Client Projects", "Expert Feedback", "Portfolio Building"]
    },
    {
      number: "03",
      duration: "Ongoing",
      title: "Shadow Live Projects",
      description: "Shadow live client projects and learn from real scenarios. Understand enterprise-level development practices.",
      highlights: ["Live Projects", "Enterprise Practices", "Real Scenarios"]
    },
    {
      number: "04",
      duration: "Final Phase",
      title: "Career Acceleration",
      description: "Get personalized interview prep, soft skills training, and direct access to 1500+ hiring partners.",
      highlights: ["Interview Prep", "Soft Skills", "Hiring Partners"]
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-indigo-100 text-indigo-800 hover:bg-indigo-100">
            Our Proven Process
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How We Transform Freshers into Industry Professionals
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A structured 6-month journey designed to give you real experience, not just theoretical knowledge.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <Card className="mb-8 overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center">
                        <span className="text-white font-bold text-xl">{step.number}</span>
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-2xl font-bold text-gray-900">{step.title}</h3>
                        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                          {step.duration}
                        </Badge>
                      </div>
                      <p className="text-lg text-gray-600 mb-4 leading-relaxed">
                        {step.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {step.highlights.map((highlight, hIndex) => (
                          <Badge key={hIndex} variant="secondary" className="bg-gray-100 text-gray-700">
                            ✓ {highlight}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {index < steps.length - 1 && (
                <div className="flex justify-center mb-8">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <ArrowDown className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Start Your Transformation?
            </h3>
            <p className="text-gray-600 mb-6">
              Join thousands who've already transformed their careers with real projects and industry mentorship.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 font-semibold">
                Start Free Trial
              </button>
              <button className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-all duration-300 font-semibold">
                Talk to Counsellor
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
