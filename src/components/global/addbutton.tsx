"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";

export default function AddButton() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      className="relative w-43 h-43 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black rounded-lg group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileTap={{ scale: 0.95 }}
      aria-label="Add new blog post"
      title="Add new blog post"
    >
      {/* Dashed border container */}
      <motion.div
        className="absolute inset-0 rounded-md border-2 border-dashed border-white/70 group-hover:border-white/90"
        animate={{
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ duration: 0.2 }}
      />

      {/* Plus icon from Lucide */}
      <motion.div
        animate={{
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{ duration: 0.2 }}
        className="text-white/90 group-hover:text-white"
      >
        <Plus className="w-12 h-12" strokeWidth={1.5} />
      </motion.div>

      {/* Optional tooltip */}
      <span className="sr-only">Add new blog post</span>
    </motion.button>
  );
}
