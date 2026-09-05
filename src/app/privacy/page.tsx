import { CONSTANTS } from '@/lib/constants';

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl font-display font-bold text-white mb-8">Privacy Policy</h1>
      
      <div className="prose prose-invert max-w-none text-slate-300 space-y-6">
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Data Collection</h2>
          <p>
            When you purchase a project from {CONSTANTS.APP_NAME}, we collect the minimal information necessary to fulfill your order and provide support. This includes your Name, Email, Phone Number, and optionally your College Name.
          </p>
          <p>
            For security and anti-piracy purposes, our systems automatically log your IP address and User Agent string when you download a purchased bundle.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Payment Processing</h2>
          <p>
            All payments are processed securely through Razorpay. We do not store, process, or have access to your raw credit card data, UPI PINs, or banking passwords. Please review Razorpay's privacy policy for details on how they handle your financial information.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Data Usage</h2>
          <p>
            Your data is used strictly for:
          </p>
          <ul className="list-disc pl-5">
            <li>Delivering the digital products you purchased.</li>
            <li>Providing customer support and processing refunds.</li>
            <li>Injecting your details into the Personalized .docx templates (if purchased).</li>
            <li>Preventing link-sharing and software piracy.</li>
          </ul>
          <p className="mt-4">
            We will never sell your personal data to third parties.
          </p>
        </section>
      </div>
    </div>
  );
}
