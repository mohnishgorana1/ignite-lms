
import {
  fetchCourseModulesAndLecturesAction,
  fetchSingleCourseAction,
} from "@/actions/course.action";
import { fetchProfileAction } from "@/actions/user.action";
import ViewCourseDashboard from "@/components/ViewCourseDashboard";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { useState } from "react";

// enrolledUser, courseCreator(instructor) and admin can access this page
// here they can access modules and lectures
// a module creation , and lecture creation dialog option will available only for courseCreator

async function ViewCourse({ params }: { params: { courseId: string } }) {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-up");
  }
  const profileInfo = await fetchProfileAction(user?.id);
  const { course } = await fetchSingleCourseAction(params?.courseId);


  return (
    <main className="space-y-6">
      <header className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-y-2">
        <Link href={`/courses/${course._id} `}>
          <h1 className="w-fit text-2xl sm:text-3xl font-extrabold font-sans border-b border-b-[#ffffff44] hover:border-b-[#ffffffbc] duration-300">
            {course?.title}
          </h1>
        </Link>
        {profileInfo?._id === course.instructor._id && (
          <Link
            href={`/courses/${course._id}/manage-course`}
            className="text-lg underline text-pink-500 hover:text-pink-600"
          >
            Manage Course
          </Link>
        )}
      </header>

      <section className="">
        <ViewCourseDashboard course={course} profileInfo={profileInfo}/>
      </section>
    </main>
  );
}

export default ViewCourse;
