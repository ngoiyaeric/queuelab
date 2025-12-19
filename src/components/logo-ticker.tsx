"use client"

import GithubLogo from "@/assets/logo-github.png";
import NvidiaLogo from "@/assets/nvidia-transparent.png";
import GoogleLogo from "@/assets/CloudforStartups-3.png";
import MicrosoftStartupLogo from "@/assets/microsoft-for-startups-transparent.png";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

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
          <div className={"flex items-center gap-5"}>
              <div className={"flex-1 md:flex-none"}>
                  <h2 className={""}>Our trusted partners</h2>
              </div>
              <div className={"flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]"}>
                  <motion.div
                      initial={{translateX: '-50%'}}
                      animate={{translateX: '0'}}
                      transition={{
                          repeat: Infinity,
                          duration: isMobile ? 10 : 5,
                          ease: "linear",
                      }}
                      className={"flex flex-none gap-14 pr-14 -translate-x-1/2"}>
                      {[MicrosoftStartupLogo, GithubLogo, NvidiaLogo, GoogleLogo, MicrosoftStartupLogo, GithubLogo, NvidiaLogo, GoogleLogo].map((logo, index) => (
                          <Image src={logo} alt={`partner-logo-${index}`} key={index} className={"h-6 w-auto"}/>
                      ))}
                  </motion.div>
              </div>
          </div>
        </div>
      </section>
    </>
  );
}
