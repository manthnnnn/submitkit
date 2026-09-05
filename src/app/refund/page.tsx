import { CONSTANTS } from '@/lib/constants';

export default function RefundPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl font-display font-bold text-white mb-8">Refund Policy</h1>
      
      <div className="prose prose-invert max-w-none text-slate-300 space-y-6">
        <p className="text-lg">
          At {CONSTANTS.APP_NAME}, we stand by the quality of our 1-click runnable code environments. Because our products are digital goods delivered instantly, our refund policy is strictly defined to prevent abuse while ensuring your satisfaction.
        </p>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
          <h2 className="text-xl font-bold text-white mb-4">24-Hour Code Guarantee</h2>
          <p>
            If you encounter an unresolvable code error that prevents the application from launching using the provided `run.bat` or `run.sh` scripts on a standard environment, we offer an automated refund within 24 hours of purchase.
          </p>
          <h3 className="text-lg font-bold text-white mt-6 mb-2">How to Claim:</h3>
          <ol className="list-decimal pl-5 space-y-2">
            <li>Take a clear screenshot of your terminal showing the specific error output.</li>
            <li>Ensure you are using the documented prerequisite versions (e.g., Python 3.10+, Node 18+).</li>
            <li>Email the screenshot and your Order ID to <a href={`mailto:${CONSTANTS.SUPPORT_EMAIL}`} className="text-brand-400 hover:underline">{CONSTANTS.SUPPORT_EMAIL}</a>.</li>
          </ol>
        </div>

        <h2 className="text-2xl font-bold text-white mt-8 mb-4">Non-Refundable Scenarios</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>"I changed my mind" or "I bought the wrong project by mistake." (Please review the live demo before purchase).</li>
          <li>Inability to explain the code during your academic evaluation.</li>
          <li>Errors caused by your own modifications to the core logic after download.</li>
        </ul>
      </div>
    </div>
  );
}
