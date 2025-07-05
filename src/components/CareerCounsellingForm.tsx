
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
  };

  return (
    <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm shadow-2xl border-0">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-xl font-bold text-gray-900 font-poppins">
          Book Free Career Counselling
        </CardTitle>
        <p className="text-sm text-gray-600">Get personalized guidance from industry experts</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-gray-700">Name *</Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
              className="border-gray-300 focus:border-blue-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email *</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
              className="border-gray-300 focus:border-blue-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone Number *</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              required
              className="border-gray-300 focus:border-blue-500"
            />
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-700">Experience Level *</Label>
            <RadioGroup
              value={formData.experience}
              onValueChange={(value) => setFormData({...formData, experience: value})}
              className="space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="fresher" id="fresher" />
                <Label htmlFor="fresher" className="text-sm text-gray-600 cursor-pointer">
                  Fresher (0-6 months)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="junior" id="junior" />
                <Label htmlFor="junior" className="text-sm text-gray-600 cursor-pointer">
                  Junior (6 months - 2 years)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="mid" id="mid" />
                <Label htmlFor="mid" className="text-sm text-gray-600 cursor-pointer">
                  Mid-level (2-5 years)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="senior" id="senior" />
                <Label htmlFor="senior" className="text-sm text-gray-600 cursor-pointer">
                  Senior (5+ years)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="student" id="student" />
                <Label htmlFor="student" className="text-sm text-gray-600 cursor-pointer">
                  Student (Final year/Recent graduate)
                </Label>
              </div>
            </RadioGroup>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-lg shadow-lg transform transition hover:scale-105"
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
