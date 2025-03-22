import React from "react";
import Blogcard from "@/components/global/blogcard";
import AddButton from "@/components/global/addbutton";
import localFont from "next/font/local";
const abc = localFont({
  src: "../../../../public/abc.woff2",
});
export default function page() {
  return (
    <div className=" border h-full w-full px-56">
      <div className=" flex flex-col mt-20  items-center justify-center  w-full">
        <h1 className="text-4xl">Welcome Kartik !</h1>
        <h1 className="text-3xl">
          let's Write something amazing for homo sepians.
        </h1>
      </div>
      <div className="mt-20 flex gap-4 flex-wrap items-center justify-start w-full">
        <AddButton />
        <Blogcard />
        <Blogcard />
        <Blogcard />
      </div>
    </div>
  );
}
