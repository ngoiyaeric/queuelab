"use client";

import { Icon } from "@iconify/react";
import googleCloud from "@iconify/icons-logos/google-cloud";
import microsoft from "@iconify/icons-logos/microsoft";
import aws from "@iconify/icons-logos/aws";
import github from "@iconify/icons-logos/github";
import nvidia from "@iconify/icons-logos/nvidia";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const logos = [googleCloud, microsoft, aws, github, nvidia, googleCloud, microsoft, aws, github, nvidia];

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
    <>
      <section className={"py-20 md:py-24"}>
        <div className={"container"}>
          <div className={"flex flex-col md:flex-row items-center gap-5"}>
            <div className={"flex-none"}>
              <h2 className={""}>Our trusted partners</h2>
            </div>
            <div
              className={
                "flex-1 w-full overflow-hidden border border-red-500"
              }
            >
              <motion.div
                initial={{ translateX: "-50%" }}
                animate={{ translateX: "0" }}
                transition={{
                  repeat: Infinity,
                  duration: isMobile ? 10 : 5,
                  ease: "linear",
                }}
                className={"flex flex-none gap-14 pr-14 w-max bg-blue-900/20"}
              >
                {logos.map((logo, index) => (
                  <div key={index} className="h-8 w-20 bg-white/20 border border-white flex items-center justify-center text-[10px] text-white">
                    Logo {index}
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
