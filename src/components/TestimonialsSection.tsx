
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

  const companies = [
    "Google", "Amazon", "Microsoft", "Flipkart", "Zomato", "Paytm", 
    "Swiggy", "Uber", "Ola", "BYJU'S", "Unacademy", "PhonePe"
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="success-stories" className="py-20 px-4 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-green-100 text-green-800 hover:bg-green-100">
            Success Stories
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Real Students, Real Success Stories
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how our alumni transformed their careers and landed dream jobs at top companies.
          </p>
        </div>

        {/* Featured Testimonial */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card className="overflow-hidden border-0 shadow-2xl bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardContent className="p-12">
              <div className="grid md:grid-cols-3 gap-8 items-center">
                <div className="text-center">
                  <img 
                    src={testimonials[currentTestimonial].image}
                    alt={testimonials[currentTestimonial].name}
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-bold text-gray-900">{testimonials[currentTestimonial].name}</h3>
                  <p className="text-gray-600">{testimonials[currentTestimonial].role}</p>
                  <Badge className="mt-2 bg-blue-100 text-blue-800 hover:bg-blue-100">
                    {testimonials[currentTestimonial].company}
                  </Badge>
                  <div className="mt-3 text-2xl font-bold text-green-600">
                    {testimonials[currentTestimonial].salary}
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <Quote className="w-12 h-12 text-blue-300 mb-4" />
                  <blockquote className="text-lg text-gray-700 leading-relaxed mb-6">
                    "{testimonials[currentTestimonial].quote}"
                  </blockquote>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                      <span className="ml-2 text-gray-600">5/5 Rating</span>
                    </div>
                    <Badge variant="secondary">
                      {testimonials[currentTestimonial].program}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-center mt-8 space-x-4">
            <button 
              onClick={prevTestimonial}
              className="w-12 h-12 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              ←
            </button>
            <div className="flex space-x-2 items-center">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
            <button 
              onClick={nextTestimonial}
              className="w-12 h-12 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              →
            </button>
          </div>
        </div>

        {/* Company Logos */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">
            Our Alumni Work At
          </h3>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center opacity-60">
            {companies.map((company, index) => (
              <div key={index} className="text-center">
                <div className="bg-gray-100 rounded-lg p-4 hover:bg-gray-200 transition-colors">
                  <span className="font-semibold text-gray-700">{company}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-blue-600">1000+</div>
            <div className="text-gray-600 mt-2">Students Placed</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-green-600">₹8.5L</div>
            <div className="text-gray-600 mt-2">Average Salary</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-purple-600">98%</div>
            <div className="text-gray-600 mt-2">Placement Rate</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-orange-600">4.9/5</div>
            <div className="text-gray-600 mt-2">Student Rating</div>
          </div>
        </div>
      </div>
    </section>
  );
};
