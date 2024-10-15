"use client";
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "./ui/hero-highlight";
import Image from "next/image";

export function HeroHighlightDemo() {
  return (
    <HeroHighlight className="w-full h-full pt-12 ">
      <motion.h1
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: [20, -5, 0],
        }}
        transition={{
          duration: 0.5,
          ease: [0.4, 0.0, 0.2, 1],
        }}
        className="text-4xl lg:text-7xl px-4 font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug mx-auto "
      >
        <Highlight className="text-black dark:text-white">
          Ignite Your <br />
        </Highlight>
        <span className="text-3xl lg:text-7xl">Learning Journey</span>
      </motion.h1>
    </HeroHighlight>
  );
}
