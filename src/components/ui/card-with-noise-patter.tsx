"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface NoisePatternCardProps {
  children: React.ReactNode;
  className?: string;
  patternClassName?: string;
  overlayClassName?: string;
}

function NoisePatternCard({
  children,
  className,
  patternClassName,
  overlayClassName,
}: NoisePatternCardProps) {
  return (
    <motion.div
      className={cn(
        "  rounded-md overflow-hidden",

        className
      )}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div
        className={cn(
          "size-full w-[300px] h-[365px] bg-repeat bg-[length:500px_500px]",
          "bg-noise",
          patternClassName
        )}
      >
        <div className={cn("", overlayClassName)}>{children}</div>
      </div>
    </motion.div>
  );
}

function NoisePatternCardBody({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(" flex items-center justify-center p-4 md:p-6", className)}
      {...props}
    />
  );
}
export { NoisePatternCardBody };
export default NoisePatternCard;
