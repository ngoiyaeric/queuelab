"use client";

import React, { useRef } from "react";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import BackgroundStars from "@/assets/stars.png";
import { motion, useScroll, useTransform } from "framer-motion";

export default function TermsPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  const backgroundPositionY = useTransform(scrollYProgress, [0, 1], [-300, 300]);

  return (
    <React.Fragment>
      <SiteHeader />
      <motion.section
        ref={sectionRef}
        animate={{ backgroundPositionX: BackgroundStars.width }}
        transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
        style={{
          backgroundImage: `url(${BackgroundStars.src})`,
          backgroundPositionY,
        }}
        className="relative overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] bg-background"
      >
        <div className={"absolute inset-0 bg-[radial-gradient(75%_75%_at_center_center,rgb(0,0,255,0.2)_15%,rgb(14,0,36,0.3)_78%,transparent)]"} />
        <div className="container py-20 md:py-24 relative max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-5xl tracking-tighter font-medium text-foreground">Terms of Service</h1>
            <p className="text-lg md:text-xl text-muted-foreground tracking-tight mt-4">
              Last Updated: March 10, 2025
            </p>
          </div>

          <div className="text-foreground/80 space-y-10 text-lg leading-relaxed">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4 tracking-tight">Acceptance of Terms</h2>
              <p>
                Welcome to QueueCX (the &quot;Service&quot;). These Terms of Service (these &quot;Terms&quot;) are a legal agreement between you (&quot;you&quot; or &quot;User&quot;) and QueueCX, Inc. (&quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;).
              </p>
              <p className="mt-4">
                By accessing or using the Service, you agree to be bound by these Terms. If you do not agree to these Terms, you may not access or use the Service.
              </p>
              <p className="mt-4">
                If you are using the Service on behalf of an organization (such as your employer), you represent and warrant that you have the authority to bind that organization to these Terms, and &quot;you&quot; and &quot;User&quot; will refer to that organization.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4 tracking-tight">1. Definitions</h2>
              <ul className="list-disc pl-6 space-y-3 mt-4 text-muted-foreground">
                <li><strong className="text-foreground">&quot;Account&quot;</strong> means your registered account for accessing and using the Service.</li>
                <li><strong className="text-foreground">&quot;Content&quot;</strong> means any text, data, information, software, graphics, photographs, videos, audio, or other materials.</li>
                <li><strong className="text-foreground">&quot;Service&quot;</strong> means the QueueCX software-as-a-service platform, including all features, functionality, and content provided by Company at <a href="https://queue.cx" className="text-foreground underline underline-offset-4 hover:text-foreground/80 transition-colors">queue.cx</a> and through mobile applications, APIs, and other interfaces.</li>
                <li><strong className="text-foreground">&quot;User Content&quot;</strong> means any Content that you upload, submit, post, transmit, or otherwise make available through the Service.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4 tracking-tight">2. Eligibility</h2>
              <p>
                You must be at least 13 years old to use the Service. By using the Service, you represent and warrant that you meet this age requirement. You must have the legal capacity to enter into a binding contract. You must comply with all applicable laws and regulations in your use of the Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4 tracking-tight">3. Account Registration and Security</h2>
              <p>
                To access certain features of the Service, you must create an Account. You agree to provide accurate, current, and complete information during registration and to update such information to keep it accurate, current, and complete.
              </p>
              <p className="mt-4">
                You are responsible for maintaining the confidentiality of your Account credentials and for all activities that occur under your Account. You agree to notify us immediately of any unauthorized use of your Account.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4 tracking-tight">4. License and Restrictions</h2>
              <p>
                Subject to your compliance with these Terms, we grant you a limited, non-exclusive, non-transferable, non-sublicensable, revocable license to access and use the Service for your internal business purposes.
              </p>
              <p className="mt-4">
                You may not: copy, modify, or create derivative works of the Service; reverse engineer, decompile, or disassemble the Service; rent, lease, or sell the Service; or use the Service to build a competitive product.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4 tracking-tight">5. User Content</h2>
              <p>
                You retain all ownership rights in your User Content. By uploading User Content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, and distribute your User Content in connection with providing and improving the Service.
              </p>
              <p className="mt-4">
                You are solely responsible for backing up your User Content. We are not responsible for any loss or corruption of User Content.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4 tracking-tight">6. Acceptable Use Policy</h2>
              <p>
                You may not use the Service for any illegal activities, to harass others, to send spam, or to violate the security of the Service. We reserve the right to suspend or terminate Accounts that violate this policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4 tracking-tight">7. Intellectual Property</h2>
              <p>
                The Service and its original content, features, and functionality are and will remain the exclusive property of QueueCX, Inc. and its licensors. Our trademarks may not be used in connection with any product or service without our prior written consent.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4 tracking-tight">8. Termination</h2>
              <p>
                We may terminate or suspend your Account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the Service will immediately cease.
              </p>
            </section>

            <section className="border-t border-white/10 pt-10">
              <h2 className="text-2xl font-semibold text-foreground mb-4 tracking-tight">9. Limitation of Liability</h2>
              <p>
                TO THE FULLEST EXTENT PERMITTED BY LAW, IN NO EVENT SHALL QUEUECX, INC. BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES. OUR TOTAL LIABILITY FOR ANY CLAIMS UNDER THESE TERMS SHALL NOT EXCEED ONE HUNDRED DOLLARS ($100).
              </p>
            </section>

            <section className="border-t border-white/10 pt-10">
              <h2 className="text-2xl font-semibold text-foreground mb-4 tracking-tight">10. Disclaimer of Warranties</h2>
              <p>
                THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT ANY WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. WE DO NOT GUARANTEE THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR SECURE.
              </p>
            </section>

            <section className="border-t border-white/10 pt-10">
              <h2 className="text-2xl font-semibold text-foreground mb-4 tracking-tight">11. Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the State of Delaware, without regard to its conflict of law provisions.
              </p>
            </section>

            <section className="border-t border-white/10 pt-10">
              <h2 className="text-2xl font-semibold text-foreground mb-4 tracking-tight">12. Contact Us</h2>
              <p>
                If you have any questions about these Terms, please contact us at <a href="mailto:relations@queue.cx" className="text-foreground underline underline-offset-4 hover:text-foreground/80 transition-colors">relations@queue.cx</a>.
              </p>
            </section>
          </div>
        </div>
      </motion.section>
      <SiteFooter />
    </React.Fragment>
  );
}
