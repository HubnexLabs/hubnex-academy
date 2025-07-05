import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { Database } from "@/integrations/supabase/types";

type LeadInsert = Database['public']['Tables']['leads']['Insert'];

export const CareerCounsellingForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const experienceOptions = [
    { value: "fresher", label: "Fresher (0-6 months)" },
    { value: "junior", label: "Junior (6 months - 2 years)" },
    { value: "mid", label: "Mid-level (2-5 years)" },
    { value: "senior", label: "Senior (5+ years)" },
    { value: "student", label: "Student (Final year/Recent graduate)" }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Insert into the leads table - let the database generate the lead_id
      const { error } = await supabase
        .from('leads')
        .insert([{
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          experience: formData.experience,
          lead_source: 'website' as const,
          status: 'fresh' as const,
          deal_value: 0,
          // Don't include lead_id - let the trigger generate it
        }]);

      if (error) {
        throw error;
      }

      toast({
        title: "Success!",
        description: "Your form has been submitted successfully. Our counsellor will contact you soon.",
        duration: 5000,
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        experience: ''
      });

      // Redirect to home page after 2 seconds
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 2000);

    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error",
        description: "There was an error submitting your form. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card id="career-counselling-form" className="w-full max-w-sm lg:max-w-md bg-white/95 backdrop-blur-sm shadow-2xl border-0 mx-auto">
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
              className="border-gray-300 focus:border-purple-500 text-sm md:text-base h-10 md:h-11"
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
              className="border-gray-300 focus:border-purple-500 text-sm md:text-base h-10 md:h-11"
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
              className="border-gray-300 focus:border-purple-500 text-sm md:text-base h-10 md:h-11"
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
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 md:py-4 rounded-lg shadow-lg transform transition hover:scale-105 text-sm md:text-base"
          >
            {isSubmitting ? 'Submitting...' : 'Book Free Career Counselling'}
          </Button>
        </form>

        <p className="text-xs text-center text-gray-500 mt-3">
          No spam. We respect your privacy.
        </p>
      </CardContent>
    </Card>
  );
};
