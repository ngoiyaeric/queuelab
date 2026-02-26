"use client";

import React, { useRef } from "react";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import BackgroundStars from "@/assets/stars.png";
import { motion, useScroll, useTransform } from "framer-motion";

export default function PrivacyPage() {
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
            <h1 className="text-5xl tracking-tighter font-medium text-white">Privacy Policy</h1>
            <p className="text-lg md:text-xl text-white/70 tracking-tight mt-4">
              How we handle your data at QueueCX, Inc.
            </p>
          </div>

          <div className="text-white/80 space-y-10 text-lg leading-relaxed">
            <section>
              <p>
                At QCX, accessible from <a href="https://queue.cx" className="text-white underline underline-offset-4 hover:text-white/80 transition-colors">queue.cx</a>, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by QCX and how we use it.
              </p>
              <p className="mt-4">
                If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us at <a href="mailto:relations@queue.cx" className="text-white underline underline-offset-4 hover:text-white/80 transition-colors">relations@queue.cx</a>.
              </p>
              <p className="mt-4">
                This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in QCX. This policy is not applicable to any information collected offline or via channels other than this website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4 tracking-tight">Consent</h2>
              <p>
                By using our website, you hereby consent to our Privacy Policy and agree to its terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4 tracking-tight">Information we collect</h2>
              <p>
                The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.
              </p>
              <p className="mt-4">
                If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.
              </p>
              <p className="mt-4">
                When you register for an Account, we may ask for your contact information, including items such as name, company name, address, email address, and telephone number.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4 tracking-tight">How we use your information</h2>
              <p>We use the information we collect in various ways, including to:</p>
              <ul className="list-disc pl-6 space-y-3 mt-4 text-white/70">
                <li>Provide, operate, and maintain our website</li>
                <li>Improve, personalize, and expand our website</li>
                <li>Understand and analyze how you use our website</li>
                <li>Develop new products, services, features, and functionality</li>
                <li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes</li>
                <li>Send you emails</li>
                <li>Find and prevent fraud</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4 tracking-tight">Log Files</h2>
              <p>
                QCX follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services&apos; analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users&apos; movement on the website, and gathering demographic information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4 tracking-tight">Cookies and Web Beacons</h2>
              <p>
                Like any other website, QCX uses &apos;cookies&apos;. These cookies are used to store information including visitors&apos; preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users&apos; experience by customizing our web page content based on visitors&apos; browser type and/or other information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4 tracking-tight">Google and X Data</h2>
              <p>
                If you choose to sign in with Google or X, we will receive your basic profile information (name, email, account ID) which we will use to authenticate you when signing in and for contacting you with product updates.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4 tracking-tight">User Profile Data</h2>
              <p>
                You may sign up for QCX using your email and a password. We will retain this information to authenticate you and occasionally contact you with product updates and account changes. You may set a username, display name, and location to display on your profile.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4 tracking-tight">Deleting your data</h2>
              <p>
                To delete your account and associated user data, you may visit our settings page (if logged in) or contact us. Our system will fully delete your account within two weeks of receiving the request.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4 tracking-tight">Third Party Privacy Policies</h2>
              <p>
                QCX&apos;s Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.
              </p>
            </section>

            <section className="border-t border-white/10 pt-10">
              <h2 className="text-2xl font-semibold text-white mb-4 tracking-tight">GDPR Data Protection Rights</h2>
              <p>
                We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:
              </p>
              <ul className="list-disc pl-6 space-y-3 mt-4 text-white/70">
                <li><strong className="text-white">The right to access</strong> – You have the right to request copies of your personal data.</li>
                <li><strong className="text-white">The right to rectification</strong> – You have the right to request that we correct any information you believe is inaccurate.</li>
                <li><strong className="text-white">The right to erasure</strong> – You have the right to request that we erase your personal data, under certain conditions.</li>
                <li><strong className="text-white">The right to restrict processing</strong> – You have the right to request that we restrict the processing of your personal data, under certain conditions.</li>
                <li><strong className="text-white">The right to object to processing</strong> – You have the right to object to our processing of your personal data, under certain conditions.</li>
                <li><strong className="text-white">The right to data portability</strong> – You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.</li>
              </ul>
              <p className="mt-6">
                If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us at <a href="mailto:relations@queue.cx" className="text-white underline underline-offset-4 hover:text-white/80 transition-colors">relations@queue.cx</a>.
              </p>
            </section>

            <section className="border-t border-white/10 pt-10">
              <h2 className="text-2xl font-semibold text-white mb-4 tracking-tight">Children&apos;s Information</h2>
              <p>
                Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.
              </p>
              <p className="mt-4">
                QCX does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.
              </p>
            </section>
          </div>
        </div>
      </motion.section>
      <SiteFooter />
    </React.Fragment>
  );
}
