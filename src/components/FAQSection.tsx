
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

export const FAQSection = () => {
  const faqs = [
    {
      question: "Is this just another online course?",
      answer: "No! Unlike traditional courses that focus on theory, we immerse you in real client projects. You'll work on actual business problems, not dummy assignments. Our mentors are senior professionals from top companies, not just instructors. We're built by Hubnex Labs, a real IT company, so you get industry insights that EdTech companies simply can't provide."
    },
    {
      question: "Will I get a job after this program?",
      answer: "Yes, we provide 100% placement support until you land your first job. We have partnerships with 1500+ companies and a 98% placement rate. Our alumni work at Google, Amazon, Microsoft, and other top companies. We don't stop supporting you until you're successfully placed - that's our commitment."
    },
    {
      question: "What if I'm not confident in my technical skills?",
      answer: "Perfect! That's exactly who we're designed for. We have no eligibility criteria - whether you're a fresh graduate, final-year student, or career changer, we'll help you succeed. Month 1 focuses on building your foundation through interactive cohorts and peer learning. Our mentors provide personalized guidance throughout your journey."
    },
    {
      question: "How does the payment work?",
      answer: "We offer one simple payment of ₹70,000 (originally ₹149,000 - you save ₹79,000!). You can also earn up to ₹10,000 scholarship through our aptitude exam. We also offer referral rewards worth ₹3,000 total for successful referrals."
    },
    {
      question: "What's included in the personalized roadmap?",
      answer: "You'll get a custom learning path designed specifically for your background and goals, 1-on-1 mentor sessions, real client project experience, comprehensive skill assessments, and dedicated placement support. Everything is tailored to ensure your success."
    },
    {
      question: "Are the certificates industry-recognized?",
      answer: "Yes! Our training certificates are recognized by Google, Amazon, Microsoft, and our 1500+ hiring partners. More importantly, the real project experience and portfolio you build carries significant weight with employers - many of our students get hired based on their project work alone."
    },
    {
      question: "What support do I get after the program?",
      answer: "Lifetime access to our alumni network, continued placement support until you get your first job, access to advanced workshops, and ongoing career guidance. We also provide soft skills training, interview preparation, and direct introductions to our hiring partners."
    }
  ];

  return (
    <section id="faq" className="py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-100">
            Frequently Asked Questions
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Got Questions? We've Got Answers
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to know about our program, process, and promises.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-white rounded-xl shadow-lg border-0 overflow-hidden"
              >
                <AccordionTrigger className="px-8 py-6 text-left hover:no-underline hover:bg-blue-50 transition-colors">
                  <span className="text-lg font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-8 pb-6 pt-0">
                  <p className="text-gray-700 leading-relaxed text-base">
                    {faq.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Still Have Questions?
            </h3>
            <p className="text-gray-600 mb-6">
              Our career counsellors are here to help you make the right decision for your future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 font-semibold">
                Talk to Counsellor
              </button>
              <button className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-all duration-300 font-semibold">
                Book Free Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
