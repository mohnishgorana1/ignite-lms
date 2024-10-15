"use client";
import { cn } from "@/lib/utils";
import { useMotionValue, motion, useMotionTemplate } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const HeroHighlight = ({
  children,
  className,
  containerClassName,
}: {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}) => {
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent<HTMLDivElement>) {
    if (!currentTarget) return;
    let { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }
  return (
    <div
      className={cn(
        "relative h-[32rem] flex items-center bg-white dark:bg-black justify-center w-full group",
        containerClassName
      )}
      onMouseMove={handleMouseMove}
    >
      {/* bg dots */}
      <div className="absolute inset-0 bg-dot-thick-neutral-300 dark:bg-dot-thick-neutral-800  pointer-events-none" />
      <motion.div
        className="pointer-events-none bg-dot-thick-indigo-500 dark:bg-dot-thick-indigo-500   absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          WebkitMaskImage: useMotionTemplate`
            radial-gradient(
              200px circle at ${mouseX}px ${mouseY}px,
              black 0%,
              transparent 100%
            )
          `,
          maskImage: useMotionTemplate`
            radial-gradient(
              200px circle at ${mouseX}px ${mouseY}px,
              black 0%,
              transparent 100%
            )
          `,
        }}
      />

      <div
        className={cn(
          "relative z-20 md:grid md:grid-cols-5 gap-x-12 gap-y-12 items-start justify-between",
          className
        )}
      >
        <section className="sm:col-span-3 flex flex-col gap-y-3 items-start text-start justify-between">
          <p className="opacity-95 text-xl ml-3 font-bold">Join Us</p>
          <div>{children}</div>
          <p className="text-xl opacity-65 text-justify ml-3 my-3 pr-6">
            Discover a powerful, flexible, and intuitive platform designed to
            fuel your growth. Whether you're a student or an instructor, Ignite
            LMS offers all the tools you need to create, explore, and succeed in
            a dynamic learning environment.
          </p>
          <Link
            href={"/courses"}
            className="ml-3 mt-3 px-4 py-2 rounded-none font-semibold bg-gradient-to-br from-purple-500 from-45% to-pink-500 to-90% hover:bg-gradient-to-tl hover:from-purple-700 hover:from-45% hover:to-pink-700 duration-300"
          >
            See Courses
          </Link>
        </section>
        <section className="hidden sm:flex col-span-2 mt-10">
          <Image
            src={"/assets/images/hero-image.jpg"}
            alt="Hero"
            className=" object-contain z-10 rounded-xl opacity-65 hover:opacity-85 duration-300"
            width={800}
            height={800}
          />
        </section>
      </div>
    </div>
  );
};

export const Highlight = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <motion.span
      initial={{
        backgroundSize: "0% 100%",
      }}
      animate={{
        backgroundSize: "100% 100%",
      }}
      transition={{
        duration: 2,
        ease: "linear",
        delay: 0.5,
      }}
      style={{
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left center",
        display: "inline",
      }}
      className={cn(
        `relative inline-block pb-1   px-1 rounded-lg bg-gradient-to-r from-indigo-300 to-purple-300 dark:from-indigo-500 dark:to-purple-500`,
        className
      )}
    >
      {children}
    </motion.span>
  );
};
