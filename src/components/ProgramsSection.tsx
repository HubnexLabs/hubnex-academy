
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CourseSchema } from "@/components/StructuredData";
import { 
  Code, 
  Palette, 
  Target, 
  Users, 
  BarChart 
} from "lucide-react";

export const ProgramsSection = () => {
  const programs = [
    {
      icon: BarChart,
      title: "Data Analytics",
      duration: "6 Months",
      description: "Transform raw data into actionable insights with Python, SQL, and advanced visualization tools. Master statistical analysis and machine learning.",
      skills: ["Python", "SQL", "Tableau", "Power BI", "Statistical Analysis", "Machine Learning"],
      avgSalary: "₹8-15 LPA",
      badge: "High Demand",
      color: "from-blue-500 to-indigo-600",
      price: "₹70,000"
    },
    {
      icon: Code,
      title: "AIML Engineering",
      duration: "6 Months",
      description: "Build intelligent systems with cutting-edge AI and ML technologies. Work on real-world AI projects from computer vision to NLP.",
      skills: ["Python", "TensorFlow", "PyTorch", "Computer Vision", "NLP", "Deep Learning"],
      avgSalary: "₹10-20 LPA",
      badge: "Future Tech",
      color: "from-purple-500 to-pink-600",
      price: "₹70,000"
    },
    {
      icon: Code,
      title: "Fullstack Engineering",
      duration: "6 Months",
      description: "Master modern web development with MERN stack and cloud technologies. Build scalable applications used by millions.",
      skills: ["React.js", "Node.js", "MongoDB", "Express.js", "AWS", "Docker"],
      avgSalary: "₹7-16 LPA",
      badge: "Most Popular",
      color: "from-green-500 to-teal-600",
      price: "₹70,000"
    },
    {
      icon: Target,
      title: "Product Management",
      duration: "6 Months",
      description: "Drive product strategy and execution at scale. Learn from senior PMs who've built products used by millions.",
      skills: ["Product Strategy", "Analytics", "Roadmapping", "User Research", "A/B Testing"],
      avgSalary: "₹12-25 LPA",
      badge: "Leadership",
      color: "from-orange-500 to-red-600",
      price: "₹70,000"
    }
  ];

  return (
    <>
      {programs.map((program, index) => (
        <CourseSchema
          key={index}
          name={program.title}
          description={program.description}
          provider="Codelabs by Hubnex Labs"
          url={`https://codelabs.lovable.app/#programs`}
          duration={program.duration}
          price={program.price}
          skillLevel="Beginner to Advanced"
          category="Technology"
        />
      ))}
      
      <section id="programs" className="py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto">
          <header className="text-center mb-16">
            <Badge className="mb-4 bg-purple-100 text-purple-800 hover:bg-purple-100">
              Our Programs
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Choose Your Career Path
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Industry-focused programs designed with hiring partners to match exactly what employers need.
            </p>
          </header>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <article key={index} className="relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 group hover:scale-105">
                <Card className="h-full">
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${program.color} opacity-10 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-500`}></div>
                  
                  <CardHeader className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 bg-gradient-to-r ${program.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <program.icon className="w-6 h-6 text-white" />
                      </div>
                      <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                        {program.badge}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900 mb-2">
                      {program.title}
                    </CardTitle>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>⏱️ {program.duration}</span>
                      <span className="font-semibold text-green-600">{program.avgSalary}</span>
                    </div>
                  </CardHeader>

                  <CardContent className="relative z-10">
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {program.description}
                    </p>
                    
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Key Skills You'll Learn:</h4>
                      <div className="flex flex-wrap gap-2">
                        {program.skills.map((skill, skillIndex) => (
                          <Badge key={skillIndex} variant="secondary" className="text-xs bg-gray-100 text-gray-700">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Button 
                        className={`w-full bg-gradient-to-r ${program.color} hover:opacity-90 transition-opacity`}
                        onClick={() => {
                          const form = document.querySelector('#career-counselling-form');
                          if (form) {
                            form.scrollIntoView({ behavior: 'smooth' });
                          }
                        }}
                      >
                        Get Your Roadmap Free
                      </Button>
                      <Button variant="outline" className="w-full border-border">
                        Learn More
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </article>
            ))}
          </div>

          <div className="mt-16 text-center">
            <div className="bg-white rounded-2xl p-8 shadow-lg max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Not Sure Which Program Is Right for You?
              </h3>
              <p className="text-gray-600 mb-6">
                Talk to our career counsellors for personalized guidance based on your background and goals.
              </p>
              <Button 
                className="bg-gradient-to-r from-primary to-primary-glow hover:opacity-90 px-8 py-3"
                onClick={() => {
                  const form = document.querySelector('#career-counselling-form');
                  if (form) {
                    form.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Get Free Career Counselling
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
