import { fetchSingleCourseAction } from "@/actions/course.action";
import { fetchProfileAction } from "@/actions/user.action";
import CourseDetailsComponent from "@/components/CourseDetailsComponent";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";

// course details page
// here student can enroll to this course having unique [courseId]

async function CourseDetailsPage({ params }: { params: { courseId: string } }) {
  const courseId = params.courseId;
  const fetchedCourse = await fetchSingleCourseAction(courseId);
  console.log("fetched course", fetchedCourse);

  const activeUser = await currentUser()
  const profileInfo = await fetchProfileAction(activeUser?.id);

  console.log("fetched course details", fetchedCourse.course.enrollments);
  

  if (fetchedCourse.success) {
    return (
      <main className="flex flex-col gap-y-2">
        <CourseDetailsComponent course = {fetchedCourse.course} profileInfo={profileInfo}/>
      </main>
    );
  }
}

export default CourseDetailsPage;
