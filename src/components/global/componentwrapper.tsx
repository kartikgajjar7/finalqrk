import React from "react";

type Props = {
  children: React.ReactNode;
};

export const ComponentWrapper = ({ children }: Props) => {
  return (
    <div className=" h-full bg-[#101011] max-md:mt-16     md:h-[calc(100vh-0px)] min-h-[calc(100vh-84px)] md:overflow-y-scroll">
      {children}
    </div>
  );
};
