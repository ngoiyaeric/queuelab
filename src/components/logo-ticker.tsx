"use client";

import { Logo, logos } from "@honohub/react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

console.log(Object.keys(logos));

export function LogoTicker() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section className={"py-20 md:py-24"}>
      <div className={"container"}>
        <h2 className="text-center text-xl font-semibold text-white mb-8">
          Backed By:
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="flex justify-center items-center">
            <Logo name="google-cloud" size={96} />
          </div>
          <div className="flex justify-center items-center">
            <Logo name="microsoft" size={96} />
          </div>
          <div className="flex justify-center items-center">
            <Logo name="nvidia" size={96} />
          </div>
          <div className="flex justify-center items-center">
            <Logo name="github" size={96} />
          </div>
        </div>
      </div>
    </section>
  );
}
