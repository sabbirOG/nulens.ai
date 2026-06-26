"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="flex flex-col gap-6 animate-fade-up">
      <div className="flex items-center gap-3">
        <Link
          href="/"
          className="p-2 rounded-xl border border-border bg-surface text-muted hover:text-foreground touch-target"
          aria-label="Back to home"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight leading-snug">
            Privacy Policy
          </h1>
          <p className="text-muted mt-0.5 text-xs">
            Last Updated: June 19, 2026
          </p>
        </div>
      </div>

      <div className="card-surface p-6 flex flex-col gap-5">
        <div className="flex items-center gap-2.5 pb-4 border-b border-border">
          <Shield className="w-5 h-5 text-accent" />
          <h2 className="font-semibold text-foreground text-sm">Your privacy is our priority</h2>
        </div>

        <div className="space-y-4 text-xs text-muted leading-relaxed">
          <section>
            <h3 className="font-semibold text-foreground text-sm mb-1.5">1. Information Collection</h3>
            <p>
              NuLens.ai performs local camera analysis and preset meal lookups. We do not require account registration or collect personally identifiable information (PII) to evaluate your plate.
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-foreground text-sm mb-1.5">2. Camera & Image Usage</h3>
            <p>
              When you use the scan feature, the application requests access to your device&apos;s camera. Images captured via the scanner are processed on your device or parsed transiently for food categorization. We do not store or upload your food images to persistent remote servers.
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-foreground text-sm mb-1.5">3. Local Storage</h3>
            <p>
              We use your browser&apos;s local storage (`localStorage`) to remember your selected diet profile (General, Diabetic, Child) and your active scanned plate items. This data stays on your machine and is never shared with third parties. You can clear this data at any time by clicking &quot;Clear Plate&quot; or clearing your browser cookies.
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-foreground text-sm mb-1.5">4. Third-Party Integrations</h3>
            <p>
              This app is built on Next.js. Sample preset images utilize Unsplash for hosting. These external dependencies are subjected to their own terms and privacy rules.
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-foreground text-sm mb-1.5">5. Contact Us</h3>
            <p>
              For any questions regarding this Privacy Policy or local data storage usage, contact us at <span className="font-medium text-foreground">privacy@nulens.ai</span>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
