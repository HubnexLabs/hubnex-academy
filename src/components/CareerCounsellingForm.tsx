
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

export const CareerCounsellingForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: ''
  });

  const experienceOptions = [
    { value: "fresher", label: "Fresher (0-6 months)" },
    { value: "junior", label: "Junior (6 months - 2 years)" },
    { value: "mid", label: "Mid-level (2-5 years)" },
    { value: "senior", label: "Senior (5+ years)" },
    { value: "student", label: "Student (Final year/Recent graduate)" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
  };

  return (
    <Card className="w-full max-w-sm lg:max-w-md bg-white/95 backdrop-blur-sm shadow-2xl border-0 mx-auto">
      <CardHeader className="text-center pb-4 px-4 md:px-6 pt-4 md:pt-6">
        <CardTitle className="text-lg md:text-xl font-bold text-gray-900 font-poppins">
          Book Free Career Counselling
        </CardTitle>
        <p className="text-xs md:text-sm text-gray-600">Get personalized guidance from industry experts</p>
      </CardHeader>
      <CardContent className="space-y-4 px-4 md:px-6 pb-4 md:pb-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-xs md:text-sm font-medium text-gray-700">Name *</Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
              className="border-gray-300 focus:border-blue-500 text-sm md:text-base h-10 md:h-11"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-xs md:text-sm font-medium text-gray-700">Email *</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
              className="border-gray-300 focus:border-blue-500 text-sm md:text-base h-10 md:h-11"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-xs md:text-sm font-medium text-gray-700">Phone Number *</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              required
              className="border-gray-300 focus:border-blue-500 text-sm md:text-base h-10 md:h-11"
            />
          </div>

          <div className="space-y-3">
            <Label className="text-xs md:text-sm font-medium text-gray-700">Experience Level *</Label>
            <RadioGroup
              value={formData.experience}
              onValueChange={(value) => setFormData({...formData, experience: value})}
              className="space-y-2"
            >
              {experienceOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} id={option.value} className="w-4 h-4" />
                  <Label htmlFor={option.value} className="text-xs md:text-sm text-gray-600 cursor-pointer leading-tight">
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 md:py-4 rounded-lg shadow-lg transform transition hover:scale-105 text-sm md:text-base"
          >
            Book Free Career Counselling
          </Button>
        </form>

        <p className="text-xs text-center text-gray-500 mt-3">
          No spam. We respect your privacy.
        </p>
      </CardContent>
    </Card>
  );
};
