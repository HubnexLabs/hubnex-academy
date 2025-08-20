
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
      
      <section id="programs" className="py-20 px-4 bg-gradient-to-br from-background via-primary/3 to-accent/5">
        <div className="container mx-auto">
          <header className="text-center mb-16">
            <Badge className="mb-4 bg-gradient-to-r from-primary/20 to-neon-purple/20 text-primary hover:from-primary/30 hover:to-neon-purple/30 border-0 font-semibold">
              Our Programs
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-display">
              Choose Your <span className="text-luxury">Career Path</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-sans">
              Industry-focused programs designed with hiring partners to match exactly what employers need.
            </p>
          </header>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <article key={index} className="relative overflow-hidden luxury-card rounded-2xl hover:scale-105 transition-all duration-300 group">
                <Card className="h-full border-0 bg-transparent">
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${program.color} opacity-20 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-500`}></div>
                  
                  <CardHeader className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 bg-gradient-to-r ${program.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        <program.icon className="w-6 h-6 text-white" />
                      </div>
                      <Badge className="bg-gradient-to-r from-warning-orange/20 to-warning-orange/30 text-warning-orange hover:from-warning-orange/30 hover:to-warning-orange/40 border-0 font-semibold">
                        {program.badge}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl font-bold text-foreground mb-2 font-display">
                      {program.title}
                    </CardTitle>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground font-sans">
                      <span>⏱️ {program.duration}</span>
                      <span className="font-bold text-cyber-green">{program.avgSalary}</span>
                    </div>
                  </CardHeader>

                  <CardContent className="relative z-10">
                    <p className="text-muted-foreground mb-6 leading-relaxed font-sans">
                      {program.description}
                    </p>
                    
                    <div className="mb-6">
                      <h4 className="font-semibold text-foreground mb-3 font-display">Key Skills You'll Learn:</h4>
                      <div className="flex flex-wrap gap-2">
                        {program.skills.map((skill, skillIndex) => (
                          <Badge key={skillIndex} variant="secondary" className="text-xs bg-primary/10 text-primary border-0 font-medium">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Button 
                        variant="luxury"
                        className="w-full"
                        onClick={() => {
                          const form = document.querySelector('#career-counselling-form');
                          if (form) {
                            form.scrollIntoView({ behavior: 'smooth' });
                          }
                        }}
                      >
                        Get Your Roadmap Free
                      </Button>
                      <Button variant="outline" className="w-full">
                        Learn More
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </article>
            ))}
          </div>

          <div className="mt-16 text-center">
            <div className="luxury-card rounded-2xl p-8 max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold text-foreground mb-4 font-display">
                Not Sure Which Program Is <span className="text-luxury">Right for You?</span>
              </h3>
              <p className="text-muted-foreground mb-6 font-sans">
                Talk to our career counsellors for personalized guidance based on your background and goals.
              </p>
              <Button 
                variant="luxury"
                className="px-8 py-3"
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
