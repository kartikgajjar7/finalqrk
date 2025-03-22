import React from "react";
import { useTheme } from "next-themes";
import { ShineBorder } from "@/components/ui/shine-border";
import DisplayCards from "./ui/display-cards";
import OrbitingIcons from "./Orbit";
import localFont from "next/font/local";
const abc = localFont({
  src: "../../public/atl.woff2",
});
export default function Features() {
  return (
    <div className=" mt-[200px] px-20 gap-2 font-bold text-4xl  w-full h-[500px] flex flex-col items-start">
      <h1 className={`text-right font-light text-[80px] ${abc.className}`}>
        Features
      </h1>

      <div className="border-t-2  flex flex-row items-center justify-between mb-[00px] border-t-[#2b2b2b] w-full">
        <div className={` pt-[40px] w-[684px]`}>
          <h1
            className={`${abc.className} text-[12px] mb-[10px] font-normal text-[#edffd0]`}
          >
            WEBFLOW DESIGNER APP
          </h1>
          <h1
            className={`${abc.className} font-normal  text-[3rem] mb-[20px] leading-[3.5rem]`}
          >
            All the necessary building blocks of a content distribution system
            and more, in one unified platform
          </h1>
          <div
            className={`${abc.className} font-normal text-[#b1b1b1] mb-[25px] tracking-[0.5px] max-w-[520px] text-[18px] leading-[28px]`}
          >
            Your blog content is seamlessly connected to multiple publishing
            destinations through our integration framework. There are a ton of
            supported platforms to bring all your audiences together in one
            workflow.
            <br />
            <br />
            Our one-click system lets you publish to Dev.to, Hashnode, and
            Blogger simultaneously without the hassle of reformatting or
            multiple logins.
          </div>
        </div>
        <div className="pr-20">
          <OrbitingIcons />
        </div>
      </div>
      <div className="flex  w-full items-center justify-between">
        <div
          className="w-full border-t-2 flex flex-row justify-between items-center mb-[00px] border-t-[#2b2b2b]
"
        >
          <div>
            <DisplayCards />
          </div>
          <div className={` pt-[40px] w-[684px]`}>
            <h1
              className={`${abc.className} text-[12px] mb-[10px] font-normal text-[#edffd0]`}
            >
              OPEN SOURCE CONTENT PLATFORM
            </h1>
            <h1
              className={`${abc.className} font-normal  text-[3rem] mb-[20px] leading-[3.5rem]`}
            >
              All the necessary building blocks of a content distribution system
              and more, in one unified platform
            </h1>
            <div
              className={`${abc.className} font-normal text-[#b1b1b1] mb-[25px] tracking-[0.5px] max-w-[520px] text-[18px] leading-[28px]`}
            >
              Your store data and cart logic is bound to your Webflow elements
              through Shopyflow attributes. There are a ton of them to bring all
              the features of Shopyflow into Webflow.
              <br />
              <br />
              Shopyflow's Webflow App lets you access all your Shopify data and
              functionality as pre-configured components in Webflow designer.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
