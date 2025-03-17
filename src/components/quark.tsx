import React from "react";

import localFont from "next/font/local";
const abc = localFont({
  src: "../../public/atl.woff2",
});
export default function Quark() {
  return (
    <h1
      className={` ${abc.className} font-bold text-[29px] bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text`}
    >
      quark
    </h1>
  );
}
