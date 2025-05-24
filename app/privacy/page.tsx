export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

          <div className="prose prose-invert max-w-none">
            <p className="mb-6">Last Updated: May 21, 2025</p>

            <h2 className="text-2xl font-bold mt-8 mb-4">1. Introduction</h2>
            <p>
              Welcome to x.ai. We respect your privacy and are committed to protecting your personal data. This privacy
              policy explains how we collect, use, and safeguard your information when you use our website and services.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">2. Information We Collect</h2>
            <p>We collect several types of information from and about users of our website, including:</p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Personal identifiers such as name and email address</li>
              <li>Authentication data</li>
              <li>Payment information</li>
              <li>Usage data including interactions with our AI models</li>
              <li>Technical data such as IP address, browser type, and device information</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">3. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Provide, maintain, and improve our services</li>
              <li>Process payments and manage your account</li>
              <li>Respond to your requests and support needs</li>
              <li>Send you updates, security alerts, and support messages</li>
              <li>Improve our AI models and develop new products</li>
              <li>Protect against fraudulent, unauthorized, or illegal activity</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">4. Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information from unauthorized access,
              alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic
              storage is 100% secure, and we cannot guarantee absolute security.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">5. Your Rights</h2>
            <p>
              Depending on your location, you may have certain rights regarding your personal information, including:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Access to your personal data</li>
              <li>Correction of inaccurate data</li>
              <li>Deletion of your data under certain circumstances</li>
              <li>Restriction or objection to processing</li>
              <li>Data portability</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">6. Changes to This Policy</h2>
            <p>
              We may update our privacy policy from time to time. We will notify you of any changes by posting the new
              privacy policy on this page and updating the "Last Updated" date.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">7. Contact Us</h2>
            <p>
              If you have any questions about this privacy policy or our data practices, please contact us at
              privacy@x.ai.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
