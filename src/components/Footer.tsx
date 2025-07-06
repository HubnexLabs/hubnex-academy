
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-16 px-4">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">H</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Hubnex Academy</h3>
                <p className="text-sm text-gray-400">by Hubnex Labs</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Transform freshers into industry-ready professionals through real projects and expert mentorship.
            </p>
            <div className="text-sm text-gray-400">
              <p>Built by a real IT company,</p>
              <p>not an EdTech platform.</p>
            </div>
          </div>

          {/* Programs */}
          <div>
            <h4 className="font-bold text-lg mb-4">Programs</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Fullstack Development</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">UI/UX Design</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Product Management</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Data Analytics</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Talent Acquisition</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold text-lg mb-4">Support</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Career Counselling</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Free Trial</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Scholarship Exam</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">EMI Options</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Placement Support</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-4">Get in Touch</h4>
            <div className="space-y-3 text-gray-300">
              <p className="flex items-center space-x-2">
                <span>📧</span>
                <span>admissions@hubnexacademy.com</span>
              </p>
              <p className="flex items-center space-x-2">
                <span>📞</span>
                <span>+91 XXX XXX XXXX</span>
              </p>
              <p className="flex items-center space-x-2">
                <span>📍</span>
                <span>Bangalore, India</span>
              </p>
            </div>
            
            <div className="mt-6">
              <h5 className="font-semibold text-white mb-3">Follow Us</h5>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <span className="text-sm">Li</span>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <span className="text-sm">Tw</span>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <span className="text-sm">Ig</span>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <span className="text-sm">Yt</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <Separator className="bg-gray-700 mb-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
          <div className="mb-4 md:mb-0">
            <p>&copy; {currentYear} Hubnex Labs. All rights reserved.</p>
          </div>
          <div className="flex space-x-6">
            <Link to="/privacy-policy" className="hover:text-blue-400 transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-blue-400 transition-colors">Terms of Service</Link>
            <Link to="/refund-policy" className="hover:text-blue-400 transition-colors">Refund Policy</Link>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-400">
            <div>🛡️ 100% Secure Payments</div>
            <div>✅ 1000+ Students Placed</div>
            <div>⭐ 4.9/5 Student Rating</div>
            <div>🎯 98% Placement Rate</div>
          </div>
        </div>
      </div>
    </footer>
  );
};
