import Image from "next/image";
import SquaresDemo from "@/components/Squares";
import Star from "@/components/Star";
import Navbar from "@/components/Navbar";
import { Spotlight } from "@/components/ui/spotlight-new";
export default function Home() {
  return (
    <div className="">
  
      <Spotlight />
      <Navbar />
      <div className="px-12 gap-8 mt-14  text-center flex flex-col items-center justify-center ">
        <Star />
        <SquaresDemo/>
        <h1 className="font-bold tracking-tighter sm:text-5xl md:text-xl lg:text-7xl/none max-w-3xl mx-auto bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 via-teal-400 to-violet-500 ">
          Create & Publish Content Cross site with ease
        </h1>
        <h1 className=" text-[rgb(201 203 207] mx-auto max-w-[700px] text-gray-300 md:text-xl lg:text-2xl">
          Collaborate, evolve, endure: The open-source blogging platform where
          community contributions keep your content eternally relevant.
        </h1>

        <div className="w-[50%] flex flex-col items-center gap-3">
          <button className="group relative inline-flex h-12 items-center justify-center overflow-hidden border border-neutral-200 bg-white px-20 font-medium text-black transition-all duration-100 [box-shadow:5px_5px_rgb(82_82_82)] active:translate-x-[3px] active:translate-y-[3px] active:[box-shadow:0px_0px_rgb(82_82_82)]">
            RollOut with Quarkk!
          </button>
          <h1 className="text-sm text-center text-gray-300 px-4">
            Say goodbye to outdated content—seamless community-driven updates keep your blogs accurate, relevant, and always up to date.
          </h1>
        </div>



      </div>

    </div>
  );
}
