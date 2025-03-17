import SquaresDemo from "@/components/Squares";
import Star from "@/components/Star";
import { auth } from "../auth";
import Image from "next/image";
import Features from "@/components/Features";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import { Spotlight } from "@/components/ui/spotlight-new";
export default async function Home() {
  console.log("Home");
  const session = await auth();

  if (session?.user) {
    redirect("/home"); // Agar user logged in hai to dashboard pe bhejo
  }
  return (
    <div className="">
      <Spotlight />
      <Navbar />
      <div className="px-12 gap-8 mt-14  text-center flex flex-col items-center justify-center ">
        <Star />
        <SquaresDemo />
        <h1 className="font-bold tracking-tighter sm:text-5xl md:text-xl lg:text-7xl/none max-w-3xl mx-auto bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 via-teal-400 to-violet-500 ">
          Create & Publish Content Cross sifste with Quark
        </h1>
        <h1 className=" text-[rgb(201 203 207] mx-auto max-w-[700px] text-gray-300 md:text-xl lg:text-2xl">
          Collaborate, evolve, endure: The open-source blogging platform where
          community contributions keep your content eternally relevant.
        </h1>

        <div className="w-[50%] flex flex-col items-center gap-3">
          <button className="group relative inline-flex h-12 items-center justify-center overflow-hidden border border-neutral-200 bg-white px-20 font-medium text-black transition-all duration-100 [box-shadow:5px_5px_rgb(82_82_82)] active:translate-x-[3px] active:translate-y-[3px] active:[box-shadow:0px_0px_rgb(82_82_82)]">
            RollOut with Quarkk!
          </button>
        </div>
      </div>
      <Features />
    </div>
  );
}
