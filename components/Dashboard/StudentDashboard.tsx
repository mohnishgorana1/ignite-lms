"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { Button } from "../ui/button";
import Image from "next/image";

const x = [
  {
    courseThumbnail: {
      public_id: "IgniteLMS/nbeqik9v2df9qt8icdd1",
      secure_url:
        "https://res.cloudinary.com/dagszmhdo/image/upload/v1728567882/IgniteLMS/nbeqik9v2df9qt8icdd1.webp",
      download_url:
        "https://res-console.cloudinary.com/dagszmhdo/media…mbnails/6890b2c14d051273e877f5be60c29e02/",
    },
    description: "Create a bacdevelopment with NextJS, ",
    pricing: 499,
    title: "Practical Next.js & React - Build a real WebApp with Next.js",
    _id: "6707da4beecc7137be5af067",
  },
];

// can see enrolled courses
function StudentDashboard({ profileInfo, enrolledCourses }: any) {
  useEffect(() => {
    console.log("courses", enrolledCourses);
  }, [enrolledCourses]);
  return (
    <main className="mt-3 space-y-4">
      <section className="space-y-4">
        <h1 className="text-lg sm:text-xl md:text-2xl opacity-85 font-serif">
          Enrolled Courses
        </h1>
      </section>
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {enrolledCourses &&
            enrolledCourses.map((course: any) => {
              const { _id, title, pricing, courseThumbnail, category } = course;

              return (
                <Link
                  key={_id}
                  href={`/courses/${_id}`}
                  className="min-h-[300px] cursor-pointer rounded-lg hover:shadow-md duration-300 hover:shadow-[#5d5d5e] "
                >
                  <div className="bg-[#151515] px-4 py-4 flex flex-col gap-2 rounded-lg">
                    <Image
                      src={courseThumbnail?.secure_url}
                      width={500}
                      height={500}
                      alt="course-thumbnial "
                      className="w-full object-fit rounded-xl"
                    />
                    <section className="flex flex-col relative justify-between gap-y-2">
                      <div className="flex flex-col items-start gap-y-2 ">
                        <h1 className="text-lg font-semibold line-clamp-2">
                          {title}
                        </h1>
                        <h2 className="text-sm"> {category}</h2>
                      </div>
                      <Link href={`/courses/${_id}/view-course`} className="w-full ">
                        <Button className="w-full h-8 sm:h-10 font-bold bg-pink-700 text-white hover:bg-pink-600">
                          View Course
                        </Button>
                      </Link>
                    </section>
                  </div>
                </Link>
              );
            })}
        </div>
      </section>
    </main>
  );
}

export default StudentDashboard;
