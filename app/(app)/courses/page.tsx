import { fetchAllCourseAction } from "@/actions/course.action";
import { fetchProfileAction } from "@/actions/user.action";
import CourseListing from "@/components/CourseListing";
import { Button } from "@/components/ui/button";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import React from "react";

// here all courses listing
// admin, instructor, student (all) can see this page

async function CoursesListingPage() {
  const user = await currentUser();

  const profileInfo = await fetchProfileAction(user?.id);

  const courses = await fetchAllCourseAction();
  console.log("c", courses);

  return (
    <main className="w-full my-2 flex flex-col justify-between">
      <header className="flex w-full justify-between">
        <h1 className="text-xl sm:text-3xl self-end">View All Courses</h1>
        {profileInfo && profileInfo.role === "INSTRUCTOR" && (
          <Link href={"/courses/create-course"}>
            <Button className="h-8 sm:h-10 px-2 py-0 sm:py-1 sm:px-4  text-xs sm:text-sm font-semibold border border-transparent hover:bg-transparent hover:border-pink-700 hover:text-pink-700 bg-pink-600">
              Add Course
            </Button>
          </Link>
        )}
      </header>

      {/* course listing */}
      <section className="mt-8 w-full py-4">
        <CourseListing courses = {courses.courseList}/>
      </section>
    </main>
  );
}

export default CoursesListingPage;
