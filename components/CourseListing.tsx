"use client";
import { fetchCourseAction } from "@/actions/course.action";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";

function CourseListing({ courses }: any) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {courses &&
        courses.map((course) => {
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
            <Link
              key={_id}
              href={`/courses/${_id}`}
              className="cursor-pointer rounded-lg hover:shadow-md duration-300 hover:shadow-[#5d5d5e]"
            >
              <div className="bg-[#151515] px-4 py-4 h-[450px] flex flex-col gap-2 rounded-lg">
                <Image
                  src={courseThumbnail?.secure_url}
                  width={500}
                  height={500}
                  alt="course-thumbnial "
                  className="w-full h-[210px] object-fit rounded-xl"
                />
                <section className="flex flex-col h-[220px] relative justify-between">
                  <div className="flex flex-col items-start gap-y-2 ">
                    <h1 className="text-lg font-semibold">{title}</h1>
                    <h2 className="text-sm"> {category}</h2>
                    <h4 className="text-lg font-sans font-medium mt-3">
                      Instructor:{" "}
                      <span className="ml-1 "> {instructor.name}</span>
                    </h4>
                  </div>
                  <div className="mt-2 flex justify-between items-baseline">
                    <h3 className="text-sm text-green-500 font-bold ">
                      Rs {pricing}
                    </h3>
                    <Link href={`/courses/${_id}`}>
                      <Button className="h-8 smh-11 font-bold bg-pink-700 text-white hover:bg-pink-600">
                        Check Details
                      </Button>
                    </Link>
                  </div>
                </section>
              </div>
            </Link>
          );
        })}
    </div>
  );
}

export default CourseListing;
