import { fetchSingleCourseAction } from "@/actions/course.action";
import { fetchProfileAction } from "@/actions/user.action";
import Loading from "@/app/Loading";
import CourseManagementComponent from "@/components/CourseManagementComponent";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import React from "react";

// add delete module, lecture and manage this course [courseId] only by illustrator and admin
async function ManageCourseByInstructorPage({
  params,
}: {
  params: { courseId: string };
}) {
  const courseId = params.courseId;
  const fetchedCourse = await fetchSingleCourseAction(courseId);
  console.log("fetched course", fetchedCourse);

  const activeUser = await currentUser();
  const profileInfo = await fetchProfileAction(activeUser?.id);

  if (profileInfo._id !== fetchedCourse?.course?.instructor?._id) {
    return (
      <main className="w-full h-[80vh] flex items-center flex-col">
        <div className="w-full flex flex-col items-center justify-center mt-12 gap-y-5">
          <h1 className="font-bold text-6xl">OOPS!</h1>
          <h2 className="font-bold text-2xl sm:text-4xl max-w-[80vw] sm:max-w-[50vw] text-center">
            ONLY INSTRUCTOR AND ADMIN CAN ACCESS THIS PAGE
          </h2>
        </div>

        <Link
          href={`/courses/${courseId}`}
          className="mt-10 capitalize underline text-red-600 "
        >
          Please go to course details page{" "}
        </Link>
      </main>
    );
  }

  const {
    _id,
    instructor,
    title,
    welcomeMessage,
    description,
    category,
    pricing,
    courseThumbnail,
  } = fetchedCourse.course;

  return (
    <main className="w-full ">
      <section className="w-full mx-auto flex flex-col items-center justify-center gap-y-5">
        {/* <h1 className="text-center font-bold text-3xl sm:text-4xl md:text-5xl">{`Administer Your Course`}</h1> */}
        {/* <h2 className="text-center font-semibold text-sm sm:text-lg md:text-xl max-w-[80vw] sm:max-w-2xl opacity-70">
          {`"Streamline your course management with tools for updating content,
          adjusting settings,from content modules to pricing"`}
        </h2> */}
      </section>
      <section className="mt-8 space-y-4">
        <h1 className="font-light text-3xl text-pink-500">{title}</h1>
        <CourseManagementComponent
          course={JSON.parse(JSON.stringify(fetchedCourse.course))}
        />
      </section>
    </main>
  );
}

export default ManageCourseByInstructorPage;
