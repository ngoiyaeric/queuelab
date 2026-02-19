import React from "react";
import Image from "next/image";
import { Linkedin } from "lucide-react";

const TeamSection = () => {
  return (
    <div className="py-20 md:py-24">
      <div className="container">
        <h2 className="text-3xl tracking-tighter font-medium text-center text-green-400">Meet the Team</h2>
        <div className="mt-12 flex justify-center">
          <div className="flex flex-col items-center text-center max-w-3xl">
            <Image
              src="/eric-ngoiya.png"
              alt="Eric Ngoiya"
              width={150}
              height={150}
              className="rounded-full"
            />
            <h3 className="text-2xl font-medium mt-4 text-white">Eric Ngoiya</h3>
            <p className="text-lg text-white">Chief Executive Officer</p>
            <p className="mt-4 text-white">
              Eric Ngoiya is a Tanzanian graduate scientists and researcher. Eric participated in Genesys GPT-2 hackathons in 2019 and wrote code on the nano satellite cubesat mission at Lassonde School of Engineering for Climate Observations. Eric is lead author of a cited scientific publication Fluidity Index: Next Generation Super-Intelligence Benchmarks research.
            </p>
            <div className="flex items-center space-x-4 mt-4">
              <a href="https://www.linkedin.com/in/ereqdesign" target="_blank" rel="noopener noreferrer" className="text-white hover:text-green-400">
                <Linkedin size={24} />
              </a>
              <a href="https://www.x.com/ereqdesign" target="_blank" rel="noopener noreferrer" className="text-white hover:text-green-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-x"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamSection;
