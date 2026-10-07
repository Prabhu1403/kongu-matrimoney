"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, Shield, FileText } from "lucide-react";

type ModalType = "terms" | "privacy" | null;

export default function Footer() {
  const [modal, setModal] = useState<ModalType>(null);

  return (
    <>
      <footer className="w-full relative z-10 flex flex-col mt-4 sm:mt-8">
        <div className="relative w-full">
          {/* Top gradient fade */}
          <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-[#f7faf5] to-transparent z-10 pointer-events-none" />
          <Image
            src="/images/fotternew copy.png"
            alt="KONGU Community Platform Footer"
            width={1920}
            height={600}
            className="w-full h-auto object-contain object-bottom block"
            priority
          />
        </div>

        {/* Legal links bar */}
        <div className="bg-[#0f5c35] w-full py-3 px-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-8">
          <p className="text-emerald-200 text-xs font-medium">
            © {new Date().getFullYear()} KONGU Community Platform. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <button
              onClick={() => setModal("terms")}
              className="flex items-center gap-1.5 text-emerald-200 hover:text-white text-xs font-semibold transition-colors underline-offset-2 hover:underline"
            >
              <FileText className="w-3.5 h-3.5" />
              Terms &amp; Conditions
            </button>
            <span className="text-emerald-600 text-xs">|</span>
            <button
              onClick={() => setModal("privacy")}
              className="flex items-center gap-1.5 text-emerald-200 hover:text-white text-xs font-semibold transition-colors underline-offset-2 hover:underline"
            >
              <Shield className="w-3.5 h-3.5" />
              Privacy Policy
            </button>
          </div>
        </div>
      </footer>

      {/* ── Terms & Conditions Modal ── */}
      {modal === "terms" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-[28px] max-w-2xl w-full max-h-[88vh] flex flex-col shadow-2xl border border-slate-100 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-[#0f5c35]" />
                </div>
                <div>
                  <h2 className="text-lg font-extrabold text-slate-800 tracking-tight">Terms &amp; Conditions</h2>
                  <p className="text-[11px] text-slate-400 font-medium">KONGU Community Platform</p>
                </div>
              </div>
              <button
                onClick={() => setModal(null)}
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4 text-slate-600" />
              </button>
            </div>

            {/* Body */}
            <div className="overflow-y-auto px-6 py-5 space-y-5 text-sm text-slate-600 leading-relaxed flex-1">
              <section>
                <h3 className="font-extrabold text-slate-800 text-[15px] mb-2">1. Acceptance of Terms</h3>
                <p>By accessing or using the KONGU Community Platform (&quot;Platform&quot;), you agree to be bound by these Terms &amp; Conditions. If you do not agree to these terms, please do not use the Platform.</p>
              </section>

              <section>
                <h3 className="font-extrabold text-slate-800 text-[15px] mb-2">2. Eligibility</h3>
                <p>The Platform is intended for members of the Kongu community and their immediate family. You must be at least 18 years of age to register and use the matrimony or community features.</p>
              </section>

              <section>
                <h3 className="font-extrabold text-slate-800 text-[15px] mb-2">3. Account Responsibility</h3>
                <p>You are responsible for maintaining the confidentiality of your account credentials. All activities conducted under your account are your sole responsibility. You agree to notify us immediately of any unauthorized use of your account.</p>
              </section>

              <section>
                <h3 className="font-extrabold text-slate-800 text-[15px] mb-2">4. Prohibited Activities</h3>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Providing false or misleading profile information.</li>
                  <li>Harassing, abusing, or threatening other community members.</li>
                  <li>Using the Platform for commercial solicitation without prior consent.</li>
                  <li>Posting offensive, defamatory, or unlawful content.</li>
                  <li>Attempting to hack, scrape, or reverse-engineer any part of the Platform.</li>
                </ul>
              </section>

              <section>
                <h3 className="font-extrabold text-slate-800 text-[15px] mb-2">5. Content Ownership</h3>
                <p>All content you post on the Platform (photos, messages, profile data) remains your property. By posting, you grant KONGU Community Platform a non-exclusive license to display that content within the Platform for its operational purposes.</p>
              </section>

              <section>
                <h3 className="font-extrabold text-slate-800 text-[15px] mb-2">6. Termination</h3>
                <p>We reserve the right to suspend or terminate your account at any time for violation of these Terms, or for any conduct that we determine to be harmful to the community or the Platform.</p>
              </section>

              <section>
                <h3 className="font-extrabold text-slate-800 text-[15px] mb-2">7. Disclaimer</h3>
                <p>The Platform is provided &quot;as is&quot; without warranties of any kind. We do not guarantee the accuracy of member profiles or the suitability of matches. Matrimonial decisions are the sole responsibility of the individuals involved.</p>
              </section>

              <section>
                <h3 className="font-extrabold text-slate-800 text-[15px] mb-2">8. Changes to Terms</h3>
                <p>We may update these Terms from time to time. Continued use of the Platform after changes are posted constitutes your acceptance of the revised Terms.</p>
              </section>

              <section>
                <h3 className="font-extrabold text-slate-800 text-[15px] mb-2">9. Contact</h3>
                <p>For any queries regarding these Terms, please contact us at <span className="text-[#0f5c35] font-semibold">support@kongucommunity.org</span></p>
              </section>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-slate-100 flex justify-end flex-shrink-0">
              <button
                onClick={() => setModal(null)}
                className="bg-[#0f5c35] hover:bg-[#157a47] text-white text-sm font-bold px-6 py-2.5 rounded-xl transition-colors shadow-sm"
              >
                I Understand
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Privacy Policy Modal ── */}
      {modal === "privacy" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-[28px] max-w-2xl w-full max-h-[88vh] flex flex-col shadow-2xl border border-slate-100 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-lg font-extrabold text-slate-800 tracking-tight">Privacy Policy</h2>
                  <p className="text-[11px] text-slate-400 font-medium">KONGU Community Platform</p>
                </div>
              </div>
              <button
                onClick={() => setModal(null)}
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4 text-slate-600" />
              </button>
            </div>

            {/* Body */}
            <div className="overflow-y-auto px-6 py-5 space-y-5 text-sm text-slate-600 leading-relaxed flex-1">
              <section>
                <h3 className="font-extrabold text-slate-800 text-[15px] mb-2">1. Information We Collect</h3>
                <p>We collect information you provide during registration including your name, phone number, email address, date of birth, educational qualifications, occupation, and other profile details. We also collect usage data such as pages visited and features used.</p>
              </section>

              <section>
                <h3 className="font-extrabold text-slate-800 text-[15px] mb-2">2. How We Use Your Information</h3>
                <ul className="list-disc pl-4 space-y-1">
                  <li>To create and manage your community profile.</li>
                  <li>To suggest suitable matrimonial matches within the Kongu community.</li>
                  <li>To send OTPs, notifications, and important updates via SMS or email.</li>
                  <li>To improve Platform features and user experience.</li>
                  <li>To ensure the safety and integrity of our community.</li>
                </ul>
              </section>

              <section>
                <h3 className="font-extrabold text-slate-800 text-[15px] mb-2">3. Information Sharing</h3>
                <p>We do not sell your personal information to third parties. Your profile information is visible to other registered community members within the Platform. We may share data with trusted service providers (SMS, email, cloud storage) solely to operate the Platform.</p>
              </section>

              <section>
                <h3 className="font-extrabold text-slate-800 text-[15px] mb-2">4. Data Security</h3>
                <p>We implement industry-standard security measures including encrypted data storage, secure HTTPS connections, and OTP-based authentication to protect your personal information from unauthorized access.</p>
              </section>

              <section>
                <h3 className="font-extrabold text-slate-800 text-[15px] mb-2">5. Cookies & Local Storage</h3>
                <p>The Platform uses session storage to maintain your login state securely within your browser session. No persistent tracking cookies are set without your knowledge. Clearing your browser session will log you out of the Platform.</p>
              </section>

              <section>
                <h3 className="font-extrabold text-slate-800 text-[15px] mb-2">6. Your Rights</h3>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Access and update your profile information at any time.</li>
                  <li>Request deletion of your account and associated data.</li>
                  <li>Opt-out of non-essential communications.</li>
                  <li>Request a copy of the personal data we hold about you.</li>
                </ul>
              </section>

              <section>
                <h3 className="font-extrabold text-slate-800 text-[15px] mb-2">7. Data Retention</h3>
                <p>We retain your personal data for as long as your account is active. Upon account deletion, your data will be anonymized or removed within 30 days, except where retention is required by law.</p>
              </section>

              <section>
                <h3 className="font-extrabold text-slate-800 text-[15px] mb-2">8. Children&apos;s Privacy</h3>
                <p>The Platform is not intended for individuals under the age of 18. We do not knowingly collect personal information from minors. If you believe a minor has registered, please contact us immediately.</p>
              </section>

              <section>
                <h3 className="font-extrabold text-slate-800 text-[15px] mb-2">9. Policy Updates</h3>
                <p>We may update this Privacy Policy periodically. We will notify registered users of significant changes via SMS or email. Continued use of the Platform constitutes acceptance of the updated policy.</p>
              </section>

              <section>
                <h3 className="font-extrabold text-slate-800 text-[15px] mb-2">10. Contact Us</h3>
                <p>For privacy-related concerns, contact our Data Protection Officer at <span className="text-[#0f5c35] font-semibold">privacy@kongucommunity.org</span></p>
              </section>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-slate-100 flex justify-end flex-shrink-0">
              <button
                onClick={() => setModal(null)}
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-6 py-2.5 rounded-xl transition-colors shadow-sm"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
