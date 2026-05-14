"use client";

import { Icon } from "@iconify/react";
import googleCloud from "@iconify/icons-logos/google-cloud";
import microsoft from "@iconify/icons-logos/microsoft";
import aws from "@iconify/icons-logos/aws";
import github from "@iconify/icons-logos/github";
import nvidia from "@iconify/icons-logos/nvidia";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

const logos = [
  { src: googleCloud, type: "icon" },
  { src: microsoft, type: "icon" },
  { src: aws, type: "icon" },
  { src: github, type: "icon" },
  { src: nvidia, type: "icon" },
  { src: "/assets/logos/mit-logo.png", type: "local" },
  { src: googleCloud, type: "icon" },
  { src: microsoft, type: "icon" },
  { src: aws, type: "icon" },
  { src: github, type: "icon" },
  { src: nvidia, type: "icon" },
  { src: "/assets/logos/mit-logo.png", type: "local" },
];

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
                "flex-1 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]"
              }
            >
              <motion.div
                initial={{ translateX: "-50%" }}
                animate={{ translateX: "0" }}
                transition={{
                  repeat: Infinity,
                  duration: isMobile ? 30 : 20,
                  ease: "linear",
                }}
                className={"flex flex-none gap-14 pr-14 w-max items-center"}
              >
                {logos.map((logo, index) => (
                  logo.type === "icon" ? (
                    <Icon
                      icon={logo.src as any}
                      key={index}
                      height={32}
                      className={"w-auto flex-none"}
                    />
                  ) : (
                    <div key={index} className="flex-none">
                      <Image
                        src={logo.src as string}
                        alt="Partner Logo"
                        height={32}
                        width={100}
                        className={"h-8 w-auto object-contain"}
                      />
                    </div>
                  )
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
