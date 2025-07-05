
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

export const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Software Engineer",
      company: "Infosys",
      image: "https://images.unsplash.com/photo-1494790108755-2616c18f129f?w=150&h=150&fit=crop&crop=face",
      content: "The practical approach at Hubnex Academy transformed my career. Working on real client projects gave me the confidence to excel in interviews.",
      rating: 5,
      salary: "₹12.5 LPA"
    },
    {
      name: "Rohit Kumar",
      role: "Full Stack Developer",
      company: "TCS",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      content: "Unlike other EdTech platforms, Hubnex Academy's industry mentorship and real project experience made all the difference in landing my dream job.",
      rating: 5,
      salary: "₹14.2 LPA"
    },
    {
      name: "Anita Patel",
      role: "Data Scientist",
      company: "Wipro",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&h=150&fit=crop&crop=face",
      content: "The placement support team guided me throughout the process. From resume building to interview preparation, they were with me every step.",
      rating: 5,
      salary: "₹15.8 LPA"
    }
  ];

  const companies = [
    { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
    { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" },
    { name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
    { name: "Infosys", logo: "https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg" },
    { name: "TCS", logo: "https://upload.wikimedia.org/wikipedia/commons/b/b1/Tata_Consultancy_Services_Logo.svg" },
    { name: "Wipro", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Wipro_Primary_Logo_Color_RGB.svg" },
    { name: "Cognizant", logo: "https://upload.wikimedia.org/wikipedia/commons/6/6a/Cognizant_logo_2022.svg" },
    { name: "Accenture", logo: "https://upload.wikimedia.org/wikipedia/commons/c/cd/Accenture.svg" }
  ];

  return (
    <section id="success-stories" className="py-12 md:py-20 px-4 bg-white">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 md:mb-6 font-poppins">
            Success Stories That Inspire
          </h2>
          <p className="text-sm md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Real stories from our alumni who transformed their careers and achieved their dream salaries
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-0 shadow-lg">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 md:w-5 md:h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-sm md:text-base text-gray-600 mb-6 leading-relaxed italic">
                  "{testimonial.content}"
                </p>
                
                <div className="flex items-center space-x-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover border-2 border-blue-100"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 text-sm md:text-base">{testimonial.name}</h4>
                    <p className="text-xs md:text-sm text-gray-600">{testimonial.role} at {testimonial.company}</p>
                    <p className="text-xs md:text-sm font-bold text-green-600">{testimonial.salary}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Alumni Network */}
        <div className="text-center mb-8 md:mb-12">
          <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 md:mb-6 font-poppins">
            Our Alumni Network
          </h3>
          <p className="text-sm md:text-lg text-gray-600 mb-8 md:mb-12">
            1000+ alumni placed in top companies with average salary of <span className="font-bold text-green-600">₹12.85 LPA</span>
          </p>
        </div>

        {/* Company Logos */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6 md:gap-8 items-center">
          {companies.map((company, index) => (
            <div key={index} className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <img 
                src={company.logo} 
                alt={company.name}
                className="max-h-8 md:max-h-10 w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-12 md:mt-16">
          <div className="text-center p-6 md:p-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
            <h4 className="text-2xl md:text-3xl lg:text-4xl font-bold text-blue-600 mb-2">1000+</h4>
            <p className="text-sm md:text-base text-gray-600 font-medium">Alumni Placed</p>
          </div>
          <div className="text-center p-6 md:p-8 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
            <h4 className="text-2xl md:text-3xl lg:text-4xl font-bold text-green-600 mb-2">₹12.85L</h4>
            <p className="text-sm md:text-base text-gray-600 font-medium">Average Package</p>
          </div>
          <div className="text-center p-6 md:p-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
            <h4 className="text-2xl md:text-3xl lg:text-4xl font-bold text-purple-600 mb-2">100%</h4>
            <p className="text-sm md:text-base text-gray-600 font-medium">Placement Support</p>
          </div>
        </div>
      </div>
    </section>
  );
};
