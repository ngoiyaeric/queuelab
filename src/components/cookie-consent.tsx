"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Cookie } from "lucide-react";

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check localStorage on mount
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setIsVisible(false);
  };

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6 pointer-events-none"
        >
          <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-stone-200 bg-stone-50/95 shadow-2xl backdrop-blur-md pointer-events-auto">
            <div className="flex flex-col items-center gap-4 p-6 md:flex-row md:justify-between">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-stone-100 p-2 text-stone-600 shrink-0">
                  <Cookie className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif text-lg font-medium text-stone-900" style={{ fontFamily: 'var(--font-instrument-serif)' }}>
                    Cookie Policy
                  </h3>
                  <p className="text-sm text-stone-600 leading-relaxed max-w-xl">
                    We use cookies to enhance your experience and analyze our traffic.
                    Please choose whether you accept or decline our use of cookies.
                  </p>
                </div>
              </div>
              <div className="flex w-full shrink-0 gap-3 md:w-auto">
                <Button
                  variant="outline"
                  onClick={handleDecline}
                  className="flex-1 border-stone-200 bg-transparent text-stone-600 hover:bg-stone-100 md:flex-none"
                >
                  Decline
                </Button>
                <Button
                  onClick={handleAccept}
                  className="flex-1 bg-stone-900 text-stone-50 hover:bg-stone-800 md:flex-none"
                  data-testid="accept-all-cookie"
                >
                  Accept All
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
