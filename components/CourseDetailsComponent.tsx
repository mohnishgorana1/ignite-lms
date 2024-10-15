"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { createEnrollmentAction } from "@/actions/enrollment.action";
import { toast } from "sonner";
import { FiLoader } from "react-icons/fi";

function CourseDetailsComponent({ course, profileInfo }: any) {
  const router = useRouter();
  const [isEnrolling, setIsEnrolling] = useState(false);
  const {
    _id,
    instructor,
    title,
    welcomeMessage,
    description,
    category,
    pricing,
    courseThumbnail,
    enrollments,
  } = course;

  const [isUserAlreadyEnrolled, setIsUserAlreadyEnrolled] = useState(false);

  const enrollUserToCourse = async () => {
    // TODO: add payment gateway route

    // if payment success then enroll user
    setIsEnrolling(true);
    const response = await createEnrollmentAction(
      course?._id,
      profileInfo?._id,
      profileInfo?.userAuthId,
      `/courses/${course?._id}/view-course`,
    );

    if (response?.success === true) {
      toast.success("Enrollement Success");
      router.push(`/courses/${course?._id}/view-course`);
    } else {
      toast.error("Enrollment Failed");
    }

    setIsEnrolling(false);
  };

  useEffect(() => {
    const isEnrolled = enrollments.some(
      (enrollment: any) => enrollment.user.toString() === profileInfo._id.toString()
    );
    setIsUserAlreadyEnrolled(isEnrolled)
  },[course]);

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
          <span className="flex md:flex-col justify-between gap-y-2">
            <p className="font-sans font-semibold brightness-125 text-white ">
              {category}
            </p>
            {instructor._id === profileInfo._id && (
              <Link href={`/courses/${_id}/manage-course`} className="mt-5">
                <Button className="h-8 border border-pink-500 text-pink-500 font-semibold hover:bg-pink-700 hover:text-white duration-200 ease-in-out">
                  Manage Course
                </Button>
              </Link>
            )}
          </span>
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
            {isUserAlreadyEnrolled ? (
              <Link href={`/courses/${_id}/view-course`}>
                <Button className="disabled:cursor-not-allowed min-w-32 border border-green-500 text-green-500 font-semibold hover:bg-green-700 hover:text-white duration-200 ease-in-out">
                  View Course
                </Button>
              </Link>
            ) : (
              <Button
                onClick={enrollUserToCourse}
                disabled={isEnrolling}
                className="disabled:cursor-not-allowed min-w-32 border border-green-500 text-green-500 font-semibold hover:bg-green-700 hover:text-white duration-200 ease-in-out"
              >
                {isEnrolling ? (
                  <FiLoader className="animate-spin" />
                ) : (
                  "Enroll Now"
                )}
              </Button>
            )}
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
