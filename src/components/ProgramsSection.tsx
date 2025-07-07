
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
      icon: Code,
      title: "Fullstack (MERN) Developer",
      duration: "6 Months",
      description: "Master MongoDB, Express.js, React, and Node.js with real project experience. Build scalable web applications.",
      skills: ["React.js", "Node.js", "MongoDB", "Express.js", "JavaScript", "REST APIs"],
      avgSalary: "₹6-12 LPA",
      badge: "Most Popular",
      color: "from-blue-500 to-blue-600",
      price: "₹99,000"
    },
    {
      icon: Palette,
      title: "UI/UX & Product Designer", 
      duration: "6 Months",
      description: "Design user-centered experiences with Figma, conduct user research, and create stunning interfaces.",
      skills: ["Figma", "User Research", "Prototyping", "Design Systems", "Usability Testing"],
      avgSalary: "₹5-10 LPA",
      badge: "Creative",
      color: "from-purple-500 to-purple-600",
      price: "₹89,000"
    },
    {
      icon: Target,
      title: "Product Management",
      duration: "6 Months", 
      description: "Learn product strategy, roadmap planning, and stakeholder management from senior PMs.",
      skills: ["Product Strategy", "Analytics", "Roadmapping", "User Stories", "A/B Testing"],
      avgSalary: "₹8-15 LPA",
      badge: "High Growth",
      color: "from-green-500 to-green-600",
      price: "₹1,09,000"
    },
    {
      icon: Users,
      title: "Talent Acquisition",
      duration: "4 Months",
      description: "Master recruitment strategies, candidate sourcing, and talent pipeline management.",
      skills: ["Sourcing", "Interviewing", "ATS", "Talent Pipeline", "Employer Branding"],
      avgSalary: "₹4-8 LPA", 
      badge: "People-Focused",
      color: "from-orange-500 to-orange-600",
      price: "₹69,000"
    },
    {
      icon: BarChart,
      title: "Data Analytics",
      duration: "5 Months",
      description: "Analyze data with Python, SQL, and visualization tools. Make data-driven business decisions.",
      skills: ["Python", "SQL", "Tableau", "Excel", "Statistical Analysis", "Machine Learning"],
      avgSalary: "₹6-12 LPA",
      badge: "Data-Driven",
      color: "from-indigo-500 to-indigo-600",
      price: "₹94,000"
    }
  ];

  return (
    <>
      {programs.map((program, index) => (
        <CourseSchema
          key={index}
          name={program.title}
          description={program.description}
          url={`https://codelabs.lovable.app/#programs`}
          duration={program.duration}
          price={program.price}
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
                      <Button className={`w-full bg-gradient-to-r ${program.color} hover:opacity-90 transition-opacity`}>
                        Start Free Trial
                      </Button>
                      <Button variant="outline" className="w-full border-gray-300">
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
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-8 py-3">
                Get Free Career Counselling
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
