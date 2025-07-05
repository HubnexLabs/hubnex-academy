
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Quote } from "lucide-react";
import { useState } from "react";

export const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Software Engineer",
      company: "Amazon",
      salary: "₹28 LPA",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&q=80",
      quote: "I landed a ₹28 LPA job at Amazon thanks to Hubnex Academy! The real project experience made all the difference in my interviews. Unlike other courses, here I actually built production-ready applications.",
      rating: 5,
      program: "Fullstack Developer"
    },
    {
      name: "Rahul Patel", 
      role: "Product Manager",
      company: "Microsoft",
      salary: "₹35 LPA",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=400&q=80",
      quote: "The mentorship quality is unmatched. My mentor was a senior PM at Google who helped me understand real product strategy. Within 3 months of graduation, I had multiple offers including Microsoft!",
      rating: 5,
      program: "Product Management"
    },
    {
      name: "Sneha Reddy",
      role: "UI/UX Designer", 
      company: "Flipkart",
      salary: "₹18 LPA",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=400&q=80",
      quote: "Coming from a non-tech background, I was scared. But the supportive community and hands-on projects gave me confidence. Now I'm designing user experiences for millions of Flipkart users!",
      rating: 5,
      program: "UI/UX Design"
    }
  ];

  const companyLogos = [
    { name: "Google", logo: "https://logos-world.net/wp-content/uploads/2020/09/Google-Logo.png" },
    { name: "Amazon", logo: "https://logos-world.net/wp-content/uploads/2020/04/Amazon-Logo.png" },
    { name: "Microsoft", logo: "https://logos-world.net/wp-content/uploads/2020/09/Microsoft-Logo.png" },
    { name: "Flipkart", logo: "https://logos-world.net/wp-content/uploads/2020/11/Flipkart-Logo.png" },
    { name: "Meta", logo: "https://logos-world.net/wp-content/uploads/2021/10/Meta-Logo.png" },
    { name: "Netflix", logo: "https://logos-world.net/wp-content/uploads/2020/04/Netflix-Logo.png" },
    { name: "Swiggy", logo: "https://logos-world.net/wp-content/uploads/2021/03/Swiggy-Logo.png" },
    { name: "Uber", logo: "https://logos-world.net/wp-content/uploads/2020/05/Uber-Logo.png" },
    { name: "Ola", logo: "https://logos-world.net/wp-content/uploads/2021/02/Ola-Logo.png" },
    { name: "Paytm", logo: "https://logos-world.net/wp-content/uploads/2021/03/Paytm-Logo.png" },
    { name: "Zomato", logo: "https://logos-world.net/wp-content/uploads/2021/03/Zomato-Logo.png" },
    { name: "PhonePe", logo: "https://logos-world.net/wp-content/uploads/2021/03/PhonePe-Logo.png" }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="success-stories" className="py-12 md:py-20 px-4 bg-white">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-8 md:mb-16">
          <Badge className="mb-4 bg-green-100 text-green-800 hover:bg-green-100">
            Success Stories
          </Badge>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 font-poppins">
            Real Students, Real Success Stories
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            See how our alumni transformed their careers and landed dream jobs at top companies.
          </p>
        </div>

        {/* Featured Testimonial */}
        <div className="max-w-5xl mx-auto mb-12 md:mb-16">
          <Card className="overflow-hidden border-0 shadow-2xl bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardContent className="p-6 md:p-12">
              <div className="grid md:grid-cols-3 gap-6 md:gap-8 items-center">
                <div className="text-center">
                  <img 
                    src={testimonials[currentTestimonial].image}
                    alt={testimonials[currentTestimonial].name}
                    className="w-24 h-24 md:w-32 md:h-32 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 font-poppins">{testimonials[currentTestimonial].name}</h3>
                  <p className="text-gray-600 text-sm md:text-base">{testimonials[currentTestimonial].role}</p>
                  <Badge className="mt-2 bg-blue-100 text-blue-800 hover:bg-blue-100 text-xs md:text-sm">
                    {testimonials[currentTestimonial].company}
                  </Badge>
                  <div className="mt-3 text-xl md:text-2xl font-bold text-green-600">
                    {testimonials[currentTestimonial].salary}
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <Quote className="w-8 h-8 md:w-12 md:h-12 text-blue-300 mb-4" />
                  <blockquote className="text-base md:text-lg text-gray-700 leading-relaxed mb-6">
                    "{testimonials[currentTestimonial].quote}"
                  </blockquote>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 md:w-5 md:h-5 text-yellow-400 fill-current" />
                      ))}
                      <span className="ml-2 text-gray-600 text-sm md:text-base">5/5 Rating</span>
                    </div>
                    <Badge variant="secondary" className="text-xs md:text-sm">
                      {testimonials[currentTestimonial].program}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-center mt-6 md:mt-8 space-x-4">
            <button 
              onClick={prevTestimonial}
              className="w-10 h-10 md:w-12 md:h-12 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors flex items-center justify-center text-lg md:text-xl"
            >
              ←
            </button>
            <div className="flex space-x-2 items-center">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-colors ${
                    index === currentTestimonial ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
            <button 
              onClick={nextTestimonial}
              className="w-10 h-10 md:w-12 md:h-12 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors flex items-center justify-center text-lg md:text-xl"
            >
              →
            </button>
          </div>
        </div>

        {/* Company Logos */}
        <div className="text-center">
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 md:mb-8 font-poppins">
            Our Alumni Work At
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6 items-center">
            {companyLogos.map((company, index) => (
              <div key={index} className="flex items-center justify-center">
                <div className="bg-white rounded-lg p-3 md:p-4 hover:shadow-lg transition-all duration-300 border border-gray-100 w-full h-16 md:h-20 flex items-center justify-center">
                  <img 
                    src={company.logo} 
                    alt={`${company.name} logo`}
                    className="max-h-8 md:max-h-10 max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
          <div>
            <div className="text-2xl md:text-4xl font-bold text-blue-600 font-poppins">1000+</div>
            <div className="text-gray-600 mt-2 text-sm md:text-base">Students Placed</div>
          </div>
          <div>
            <div className="text-2xl md:text-4xl font-bold text-green-600 font-poppins">₹8.5L</div>
            <div className="text-gray-600 mt-2 text-sm md:text-base">Average Salary</div>
          </div>
          <div>
            <div className="text-2xl md:text-4xl font-bold text-purple-600 font-poppins">98%</div>
            <div className="text-gray-600 mt-2 text-sm md:text-base">Placement Rate</div>
          </div>
          <div>
            <div className="text-2xl md:text-4xl font-bold text-orange-600 font-poppins">4.9/5</div>
            <div className="text-gray-600 mt-2 text-sm md:text-base">Student Rating</div>
          </div>
        </div>
      </div>
    </section>
  );
};
