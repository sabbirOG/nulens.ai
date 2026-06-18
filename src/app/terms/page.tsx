"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, FileText, AlertCircle } from "lucide-react";

export default function TermsPage() {
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
            Terms of Service
          </h1>
          <p className="text-muted mt-0.5 text-xs">
            Last Updated: June 19, 2026
          </p>
        </div>
      </div>

      {/* Medical Disclaimer Alert */}
      <div className="p-4 rounded-xl border border-amber-100 bg-amber-50 text-amber-800 flex items-start gap-2.5">
        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
        <div className="text-xs">
          <strong>Important Medical Disclaimer:</strong> NuLens.ai provides general nutritional advice and dietary estimates. It is NOT a medical tool and should not replace professional medical advice, diagnosis, or treatment.
        </div>
      </div>

      <div className="card-surface p-6 flex flex-col gap-5">
        <div className="flex items-center gap-2.5 pb-4 border-b border-border">
          <FileText className="w-5 h-5 text-accent" />
          <h2 className="font-semibold text-foreground text-sm">Agreement of terms</h2>
        </div>

        <div className="space-y-4 text-xs text-muted leading-relaxed">
          <section>
            <h3 className="font-semibold text-foreground text-sm mb-1.5">1. Acceptance of Terms</h3>
            <p>
              By accessing and using NuLens.ai, you agree to comply with and be bound by these Terms of Service. If you do not agree, please do not use the application.
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-foreground text-sm mb-1.5">2. App Usage & Scope</h3>
            <p>
              NuLens.ai is designed to analyze typical Bangladeshi meals (e.g. rice, dal, ilish, beef bhuna) to evaluate general macro nutrient balances. The estimates generated (such as calories, carbs, protein, fat, and glycemic load) are database approximations. Actual nutritional content may vary depending on culinary preparation, oil content, and individual ingredients.
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-foreground text-sm mb-1.5">3. Healthcare Consultation</h3>
            <p>
              Always consult a certified nutritionist, dietitian, or qualified healthcare professional before implementing significant changes to your diet, especially if you have chronic health conditions like diabetes, kidney disease, or cardiovascular issues.
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-foreground text-sm mb-1.5">4. User Conduct</h3>
            <p>
              You agree to use this application for personal, non-commercial purposes only. Any reverse-engineering, tampering, or attempting to compromise application code is strictly prohibited.
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-foreground text-sm mb-1.5">5. Modifications</h3>
            <p>
              We reserve the right to modify or replace these terms at any time. Your continued use of the app after modifications constitutes acceptance of the new terms.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
