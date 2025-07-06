
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const RefundPolicy = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Pricing & Refund Policy</h1>
          <p className="text-gray-600 mb-8">Last updated: January 6, 2025</p>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Overview</h2>
              <p className="text-gray-700 leading-relaxed">
                This Pricing & Refund Policy outlines the terms and conditions related to payments, pricing, and refunds for Codelabs courses and services. By enrolling in our programs, you agree to the terms specified in this policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Course Pricing</h2>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  Our course pricing is clearly displayed on our website and includes:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Full course access and materials</li>
                  <li>Live sessions and recorded content</li>
                  <li>Mentor support and guidance</li>
                  <li>Project reviews and feedback</li>
                  <li>Placement assistance (where applicable)</li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  Prices are subject to change without prior notice. However, enrolled students will not be affected by price changes during their course duration.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Payment Terms</h2>
              <div className="space-y-4">
                <h3 className="text-xl font-medium text-gray-800 mb-2">Payment Options</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>One-time full payment at enrollment</li>
                  <li>Installment plans (where available)</li>
                  <li>EMI options through partner financial institutions</li>
                </ul>
                
                <h3 className="text-xl font-medium text-gray-800 mb-2">Payment Methods</h3>
                <p className="text-gray-700 leading-relaxed">
                  We accept payments through credit cards, debit cards, net banking, UPI, and other secure payment gateways. All payments are processed securely through our trusted payment partners.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Refund Policy</h2>
              <div className="space-y-4">
                <h3 className="text-xl font-medium text-gray-800 mb-2">7-Day Money-Back Guarantee</h3>
                <p className="text-gray-700 leading-relaxed">
                  We offer a 7-day money-back guarantee from the date of enrollment. If you are not satisfied with the course within the first 7 days, you can request a full refund, provided:
                </p>
                <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                  <li>The refund request is made within 7 days of enrollment</li>
                  <li>You have not completed more than 20% of the course content</li>
                  <li>You have not downloaded significant course materials</li>
                </ul>

                <h3 className="text-xl font-medium text-gray-800 mb-2 mt-6">Partial Refunds</h3>
                <p className="text-gray-700 leading-relaxed">
                  After the 7-day period, refunds may be considered on a case-by-case basis under exceptional circumstances:
                </p>
                <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                  <li>Medical emergencies with proper documentation</li>
                  <li>Technical issues that prevent course access for extended periods</li>
                  <li>Course cancellation by Codelabs</li>
                </ul>

                <h3 className="text-xl font-medium text-gray-800 mb-2 mt-6">Non-Refundable Situations</h3>
                <p className="text-gray-700 leading-relaxed">
                  Refunds will not be provided in the following cases:
                </p>
                <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                  <li>Completion of more than 50% of the course</li>
                  <li>Violation of terms of service</li>
                  <li>Requests made after 30 days of enrollment</li>
                  <li>Change of mind without valid reason after the guarantee period</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Refund Process</h2>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  To request a refund, please follow these steps:
                </p>
                <ol className="list-decimal list-inside text-gray-700 space-y-2">
                  <li>Contact our support team at refunds@codelabs.com</li>
                  <li>Provide your enrollment details and reason for refund</li>
                  <li>Submit any required documentation</li>
                  <li>Wait for review and approval (typically 3-5 business days)</li>
                  <li>Receive refund within 7-10 business days of approval</li>
                </ol>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. EMI and Installment Refunds</h2>
              <p className="text-gray-700 leading-relaxed">
                For courses purchased through EMI or installment plans, refunds will be processed according to the terms agreed with our financial partners. Outstanding EMI amounts may need to be settled before processing refunds.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Course Transfer Policy</h2>
              <p className="text-gray-700 leading-relaxed">
                In some cases, instead of a refund, we may offer the option to transfer your enrollment to a different course or batch. This is subject to availability and must be requested within 14 days of original enrollment.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Scholarship and Discount Refunds</h2>
              <p className="text-gray-700 leading-relaxed">
                For courses purchased with scholarships or discounts, refunds will be calculated based on the actual amount paid by the student. Scholarship benefits cannot be transferred or refunded separately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. Contact Information</h2>
              <p className="text-gray-700 leading-relaxed">
                For any questions regarding pricing or refund requests, please contact us:
              </p>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-700">
                  <strong>Refunds:</strong> refunds@codelabs.com<br />
                  <strong>Billing:</strong> billing@codelabs.com<br />
                  <strong>Support:</strong> support@codelabs.com<br />
                  <strong>Phone:</strong> +91 XXX XXX XXXX<br />
                  <strong>Address:</strong> Codelabs, Bangalore, India
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

export default RefundPolicy;
