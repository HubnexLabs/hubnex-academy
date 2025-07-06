
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-gray-600 mb-8">Last updated: January 6, 2025</p>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                By accessing and using Codelabs services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Description of Service</h2>
              <p className="text-gray-700 leading-relaxed">
                Codelabs provides online educational services including programming courses, mentorship, project-based learning, and career guidance. We offer various programs designed to help students become industry-ready professionals.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. User Accounts and Registration</h2>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  To access certain features of our service, you must register for an account. You agree to:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Provide accurate, current, and complete information during registration</li>
                  <li>Maintain the security of your password and account</li>
                  <li>Notify us immediately of any unauthorized use of your account</li>
                  <li>Accept responsibility for all activities under your account</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Course Enrollment and Payment</h2>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  When you enroll in a course, you agree to:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Pay the applicable fees as specified at the time of enrollment</li>
                  <li>Complete payment according to the chosen payment plan</li>
                  <li>Understand that course access is contingent on payment completion</li>
                  <li>Follow the course completion timeline and requirements</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. User Conduct</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                You agree not to use the service to:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Violate any applicable laws or regulations</li>
                <li>Share course content without permission</li>
                <li>Engage in any form of harassment or discrimination</li>
                <li>Upload malicious code or harmful content</li>
                <li>Impersonate others or provide false information</li>
                <li>Interfere with the operation of our services</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Intellectual Property Rights</h2>
              <p className="text-gray-700 leading-relaxed">
                All content provided through Codelabs, including courses, materials, videos, and documentation, is protected by intellectual property laws. You may access this content for personal learning purposes only and may not redistribute, modify, or use it for commercial purposes without explicit permission.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Service Availability</h2>
              <p className="text-gray-700 leading-relaxed">
                While we strive to maintain continuous service availability, we do not guarantee uninterrupted access. We reserve the right to modify, suspend, or discontinue any part of our service with or without notice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Limitation of Liability</h2>
              <p className="text-gray-700 leading-relaxed">
                Codelabs shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from your use of our services. Our total liability is limited to the amount you have paid for the specific service in question.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. Termination</h2>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to terminate or suspend your account and access to our services immediately, without prior notice, for conduct that we believe violates these Terms of Service or is harmful to other users, us, or third parties.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">10. Governing Law</h2>
              <p className="text-gray-700 leading-relaxed">
                These Terms of Service are governed by and construed in accordance with the laws of India. Any disputes arising from these terms will be subject to the jurisdiction of courts in Bangalore, India.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">11. Contact Information</h2>
              <p className="text-gray-700 leading-relaxed">
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-700">
                  <strong>Email:</strong> legal@codelabs.com<br />
                  <strong>Address:</strong> Codelabs, Bangalore, India<br />
                  <strong>Phone:</strong> +91 XXX XXX XXXX
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfService;
