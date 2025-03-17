import React from "react";
import { Github, MessageCircle, FileText } from "lucide-react";
import Image from "next/image";
const OrbitingIcons = () => {
  return (
    <div className="relative scale-80 w-[300px] h-[300px] flex items-center justify-center">
      {/* Center text */}
      <div className="absolute z-10 text-6xl font-bold text-neutral-400 select-none">
        <Image src="/quark.png" width={150} height={150} />
      </div>

      {/* Orbit paths */}
      <div className="absolute w-[250px] h-[250px] rounded-full border border-black-800/30"></div>
      <div className="absolute w-[400px] h-[400px] rounded-full border border-black-800/30"></div>
      <div className="absolute w-[550px] h-[550px] rounded-full border border-black-800/30"></div>

      {/* Inner orbit - WhatsApp */}

      {/* Middle orbit - Notion */}
      <div className="absolute left-1/2 top-1/2 -ml-6 -mt-6 animate-orbit-medium">
        <div className="bg-white/90 p-3 rounded-full shadow-lg transition-transform hover:scale-110">
          <Image src="/dev.png" width={50} height={50} />
        </div>
      </div>

      {/* Outer orbit - Github */}
      <div className="absolute left-1/2 top-1/2 -ml-6 -mt-6 animate-orbit-slow">
        <div className="bg-white/90 p-3 rounded-full shadow-lg transition-transform hover:scale-110">
          <Image src="/download.png" width={50} height={50} />
        </div>
      </div>
    </div>
  );
};

export default OrbitingIcons;
