import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

function CourseDetailsComponent({ course }: any) {
  const {
    _id,
    instructor,
    title,
    welcomeMessage,
    description,
    category,
    pricing,
    courseThumbnail,
  } = course;

  return (
    <main className="flex flex-col gap-y-8 sm:gap-y-8 w-full">
      <section className="w-full mt-4 space-y-8">
        <Link href={`/courses/${_id} `}>
          <h1 className="w-fit text-2xl sm:text-3xl lg:text-4xl font-bold border-b border-b-[#ffffff44] hover:border-b-[#ffffffbc] duration-300">
            {title}
          </h1>
        </Link>
        <div className="space-y-3">
          <h3 className="text-sm sm:text-lg opacity-70 mt-8">
            {welcomeMessage}
          </h3>
          <p className="font-sans opacity-90 font-semibold">{category}</p>
        </div>
      </section>

      <section className="w-full grid md:grid-cols-7 gap-x-5 gap-y-10">
        <div className="w-[80vw] mx-auto md:w-auto md:col-span-2 flex flex-col justify-between p-3 gap-y-4 bg-[#191919] rounded-lg h-[300px] hover:bg-[#101010] duration-300">
          <Image
            src={courseThumbnail?.secure_url}
            width={500}
            height={500}
            alt="course-thumbnial "
            className="w-full h-[210px] object-fit rounded-xl "
          />
          <div className="flex justify-between items-center">
            <p className="text-lg">
              Price:
              <span className="font-bold"> ₹ {pricing}</span>
            </p>
            <Button className="border border-green-500 text-green-500 font-semibold hover:bg-green-700 hover:text-white duration-200 ease-in-out">
              Enroll Now
            </Button>
          </div>
        </div>
        <div className="md:col-span-5 flex flex-col gap-y-5">
          <span className="flex flex-col flex-wrap  gap-x-4 text-lg">
            <span className="font-semibold">Course Instructor</span>
            <p className="font-sans opacity-80">{instructor?.name}</p>
          </span>
          <span className="flex flex-col flex-wrap gap-x-4 text-lg">
            <span className="font-semibold">Course Description</span>
            <p className="font-sans opacity-80 text-justify">{description}</p>
          </span>
        </div>
      </section>
    </main>
  );
}

export default CourseDetailsComponent;
